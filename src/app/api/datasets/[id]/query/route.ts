import { NextRequest, NextResponse } from 'next/server'
import { ConnectionPool } from 'mssql'

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
    const body = await request.json()
    const { 
      filters = {}, 
      limit = 1000, 
      offset = 0, 
      orderBy, 
      groupBy,
      table // Allow specifying which table to query
    } = body
    
    // Get dataset info
    const datasetInfo = datasetTableMap[id]
    if (!datasetInfo) {
      return NextResponse.json(
        { success: false, error: 'Dataset not found' },
        { status: 404 }
      )
    }

    // Determine which table to query
    let tableName: string
    if (table && datasetInfo.relatedTables.includes(table)) {
      tableName = table
    } else {
      tableName = datasetInfo.mainTable
    }

    // Connect to Azure SQL Database
    const pool = new ConnectionPool(azureConfig)
    await pool.connect()

    // Build query dynamically with SQL injection protection
    let query = `SELECT TOP ${limit} * FROM [${tableName}]`
    const conditions: string[] = []
    
    // Add filters with basic SQL injection protection
    Object.entries(filters).forEach(([column, value]) => {
      // Basic column name validation (only allow alphanumeric and underscore)
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(column)) {
        throw new Error(`Invalid column name: ${column}`)
      }
      
      if (typeof value === 'string') {
        // Escape single quotes in string values
        const escapedValue = value.replace(/'/g, "''")
        conditions.push(`[${column}] LIKE '%${escapedValue}%'`)
      } else if (typeof value === 'number') {
        conditions.push(`[${column}] = ${value}`)
      } else if (Array.isArray(value)) {
        const values = value.map(v => {
          if (typeof v === 'string') {
            return `'${v.replace(/'/g, "''")}'`
          }
          return v
        }).join(',')
        conditions.push(`[${column}] IN (${values})`)
      }
    })

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

    return NextResponse.json({
      success: true,
      dataset: id,
      type: datasetInfo.type,
      tableName,
      availableTables: datasetInfo.relatedTables,
      query: query,
      count: data.length,
      data,
      note: datasetInfo.type === 'datamart' 
        ? (table ? `Queried specific table: ${tableName} from ${datasetInfo.relatedTables.length}-table datamart` : `Queried main table: ${tableName} from ${datasetInfo.relatedTables.length}-table datamart. Use 'table' parameter to query other tables.`)
        : `Queried standalone table: ${tableName}`
    })

  } catch (error) {
    console.error('Error querying dataset:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to query dataset', details: (error as Error).message },
      { status: 500 }
    )
  }
} 