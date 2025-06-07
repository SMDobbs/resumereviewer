import { NextRequest, NextResponse } from 'next/server'
import { ConnectionPool } from 'mssql'
import { extractApiKey, validateApiKey } from '@/lib/api-keys'
import { apiQueryLimiter, createRateLimitHeaders } from '@/lib/rate-limit'

// Azure SQL connection configuration
const azureConfig = {
  server: process.env.AZURE_SQL_SERVER || 'sqlcamp.database.windows.net',
  database: process.env.AZURE_SQL_DATABASE || 'camp_sql_data',
  user: process.env.AZURE_SQL_USERNAME || 'sd3166',
  password: process.env.AZURE_SQL_PASSWORD || 'EnjoyTheView543@',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
}

// Map dataset IDs to their table structures
const datasetTableMap: Record<string, { type: 'datamart' | 'table'; mainTable: string; relatedTables: string[] }> = {
  // Datamarts
  'ecom-datamart': {
    type: 'datamart',
    mainTable: 'ecom_orders',
    relatedTables: ['ecom_product_categories', 'ecom_products', 'ecom_customers', 'ecom_orders', 'ecom_order_items']
  },
  'education-datamart': {
    type: 'datamart',
    mainTable: 'education_students',
    relatedTables: ['education_students', 'education_teachers', 'education_courses', 'education_classes', 'education_enrollments', 'education_grades', 'education_departments', 'education_prerequisites']
  },
  'fitness-datamart': {
    type: 'datamart',
    mainTable: 'fitness_users',
    relatedTables: ['fitness_users', 'fitness_activities', 'fitness_workouts']
  },
  'music-datamart': {
    type: 'datamart',
    mainTable: 'music_plays',
    relatedTables: ['music_users', 'music_artists', 'music_songs', 'music_plays']
  },
  
  // Standalone Tables
  'smart-home-events': {
    type: 'table',
    mainTable: 'SmartHomeEvents',
    relatedTables: ['SmartHomeEvents']
  },
  'box-office-sales': {
    type: 'table',
    mainTable: 'box_office_sales',
    relatedTables: ['box_office_sales']
  },
  'video-games': {
    type: 'table',
    mainTable: 'video_games',
    relatedTables: ['video_games']
  },
  'patient-records': {
    type: 'table',
    mainTable: 'patient_records',
    relatedTables: ['patient_records']
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Extract and validate API key - queries REQUIRE API keys
    const apiKey = extractApiKey(request)
    if (!apiKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'API key required for querying datasets. Include your API key in the Authorization header as "Bearer your_api_key" or in the X-API-Key header.',
          hint: 'Generate an API key at /tools/data-export by clicking "Generate API Key"'
        },
        { status: 401 }
      )
    }

    const validatedKey = await validateApiKey(apiKey)
    if (!validatedKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid or inactive API key. Please check your API key or generate a new one.' 
        },
        { status: 401 }
      )
    }

    // Apply query-specific rate limiting
    const rateLimitResult = await apiQueryLimiter.checkLimit(apiKey)
    if (!rateLimitResult.allowed) {
      const headers = createRateLimitHeaders(rateLimitResult)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Query rate limit exceeded. Please wait before making more queries.',
          retryAfter: rateLimitResult.retryAfter,
          limits: {
            type: 'api_query',
            maxRequests: 500,
            windowMs: 3600000, // 1 hour
            remaining: rateLimitResult.remaining
          }
        },
        { 
          status: 429,
          headers 
        }
      )
    }
    
    // Get dataset info
    const datasetInfo = datasetTableMap[id]
    if (!datasetInfo) {
      return NextResponse.json(
        { success: false, error: 'Dataset not found' },
        { status: 404 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { 
      table, 
      filters = {}, 
      orderBy, 
      groupBy, 
      limit = 1000, 
      offset = 0 
    } = body

    // Validate limit to prevent abuse
    if (limit > 10000) {
      return NextResponse.json(
        { success: false, error: 'Limit cannot exceed 10,000 rows per query' },
        { status: 400 }
      )
    }

    // Determine which table to query
    let tableName: string
    if (table && datasetInfo.relatedTables.includes(table)) {
      tableName = table
    } else if (table) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Table '${table}' not found in dataset '${id}'. Available tables: ${datasetInfo.relatedTables.join(', ')}` 
        },
        { status: 400 }
      )
    } else {
      tableName = datasetInfo.mainTable
    }

    // Connect to Azure SQL Database
    const pool = new ConnectionPool(azureConfig)
    await pool.connect()

    // Build the query dynamically
    let query = `SELECT TOP ${limit} * FROM [${tableName}]`
    const conditions: string[] = []

    // Add filters
    for (const [key, value] of Object.entries(filters)) {
      // Validate column name to prevent SQL injection
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
        throw new Error(`Invalid column name: ${key}`)
      }

      if (value !== null && value !== undefined) {
        if (typeof value === 'string') {
          // Escape single quotes in string values
          const escapedValue = value.replace(/'/g, "''")
          conditions.push(`[${key}] = '${escapedValue}'`)
        } else if (typeof value === 'number') {
          conditions.push(`[${key}] = ${value}`)
        } else if (typeof value === 'boolean') {
          conditions.push(`[${key}] = ${value ? 1 : 0}`)
        } else if (Array.isArray(value)) {
          // Handle IN clause for arrays
          const arrayValues = value.map(v => {
            if (typeof v === 'string') {
              return `'${v.replace(/'/g, "''")}'`
            }
            return v
          }).join(', ')
          conditions.push(`[${key}] IN (${arrayValues})`)
        }
      }
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`
    }

    if (groupBy) {
      // Validate groupBy column name
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(groupBy)) {
        throw new Error(`Invalid groupBy column: ${groupBy}`)
      }
      query += ` GROUP BY [${groupBy}]`
    }

    if (orderBy) {
      // Validate orderBy column name
      const orderByParts = orderBy.split(' ')
      const columnName = orderByParts[0]
      const direction = orderByParts[1]?.toUpperCase()
      
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(columnName)) {
        throw new Error(`Invalid orderBy column: ${columnName}`)
      }
      
      if (direction && !['ASC', 'DESC'].includes(direction)) {
        throw new Error(`Invalid sort direction: ${direction}`)
      }
      
      query += ` ORDER BY [${columnName}]${direction ? ` ${direction}` : ''}`
    }

    if (offset > 0) {
      query += ` OFFSET ${offset} ROWS`
    }

    console.log('Executing query:', query)

    // Execute query
    const result = await pool.request().query(query)
    await pool.close()

    const data = result.recordset

    // Add rate limit headers to response
    const headers = createRateLimitHeaders(rateLimitResult)

    return NextResponse.json({
      success: true,
      dataset: id,
      type: datasetInfo.type,
      tableName,
      availableTables: datasetInfo.relatedTables,
      query: query,
      count: data.length,
      data,
      usage: {
        apiKey: validatedKey.name,
        requestCount: validatedKey.usageCount,
        queryRateLimit: {
          remaining: rateLimitResult.remaining,
          resetTime: rateLimitResult.resetTime
        }
      },
      note: datasetInfo.type === 'datamart' 
        ? (table ? `Queried specific table: ${tableName} from ${datasetInfo.relatedTables.length}-table datamart` : `Queried main table: ${tableName} from ${datasetInfo.relatedTables.length}-table datamart. Use 'table' parameter to query other tables.`)
        : `Queried standalone table: ${tableName}`
    }, { headers })

  } catch (error) {
    console.error('Error querying dataset:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to query dataset', details: (error as Error).message },
      { status: 500 }
    )
  }
} 