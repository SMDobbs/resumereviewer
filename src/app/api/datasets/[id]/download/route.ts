import { NextRequest, NextResponse } from 'next/server'
import { ConnectionPool } from 'mssql'
import * as XLSX from 'xlsx'
import { extractApiKey, validateApiKey } from '@/lib/api-keys'
import { getClientIP, downloadLimiter, downloadBurstLimiter, apiGeneralLimiter, createRateLimitHeaders } from '@/lib/rate-limit'

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const limit = parseInt(searchParams.get('limit') || '1000')
    const table = searchParams.get('table') // Allow specifying a specific table
    
    // Get dataset info
    const datasetInfo = datasetTableMap[id]
    if (!datasetInfo) {
      return NextResponse.json(
        { success: false, error: 'Dataset not found' },
        { status: 404 }
      )
    }

    // Check if this is an API request (has API key) or direct download
    const apiKey = extractApiKey(request)
    const clientIP = getClientIP(request)
    
    if (apiKey) {
      // API-based download - validate API key and use API rate limits
      const validatedKey = validateApiKey(apiKey)
      if (!validatedKey) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid or inactive API key. Please check your API key or generate a new one.' 
          },
          { status: 401 }
        )
      }

      // Apply API rate limiting (more generous)
      const rateLimitResult = await apiGeneralLimiter.checkLimit(apiKey)
      if (!rateLimitResult.allowed) {
        const headers = createRateLimitHeaders(rateLimitResult)
        return NextResponse.json(
          { 
            success: false, 
            error: 'API rate limit exceeded. Please wait before making more requests.',
            retryAfter: rateLimitResult.retryAfter,
            limits: {
              type: 'api',
              maxRequests: 1000,
              windowMs: 3600000 // 1 hour
            }
          },
          { 
            status: 429,
            headers 
          }
        )
      }
    } else {
      // Direct download - apply strict download rate limits
      // Check both burst and hourly limits
      const burstLimitResult = await downloadBurstLimiter.checkLimit(clientIP)
      const hourlyLimitResult = await downloadLimiter.checkLimit(clientIP)
      
      if (!burstLimitResult.allowed) {
        const headers = createRateLimitHeaders(burstLimitResult)
        return NextResponse.json(
          { 
            success: false, 
            error: 'Download rate limit exceeded. You can only download 3 files every 15 minutes. Please wait or use the API for more frequent access.',
            retryAfter: burstLimitResult.retryAfter,
            limits: {
              type: 'download_burst',
              maxRequests: 3,
              windowMs: 900000, // 15 minutes
              remaining: burstLimitResult.remaining
            },
            suggestion: 'For frequent data access, generate an API key which has higher rate limits.'
          },
          { 
            status: 429,
            headers 
          }
        )
      }
      
      if (!hourlyLimitResult.allowed) {
        const headers = createRateLimitHeaders(hourlyLimitResult)
        return NextResponse.json(
          { 
            success: false, 
            error: 'Daily download limit exceeded. You can only download 10 files per hour. Please wait or use the API for more frequent access.',
            retryAfter: hourlyLimitResult.retryAfter,
            limits: {
              type: 'download_hourly',
              maxRequests: 10,
              windowMs: 3600000, // 1 hour
              remaining: hourlyLimitResult.remaining
            },
            suggestion: 'For frequent data access, generate an API key which has higher rate limits.'
          },
          { 
            status: 429,
            headers 
          }
        )
      }
    }

    // Connect to Azure SQL Database
    const pool = new ConnectionPool(azureConfig)
    await pool.connect()

    // Handle Excel export for datamarts
    if (format === 'xlsx' && datasetInfo.type === 'datamart') {
      const workbook = XLSX.utils.book_new()
      
      // Add each table as a separate sheet
      for (const tableName of datasetInfo.relatedTables) {
        try {
          const result = await pool.request()
            .query(`SELECT TOP ${limit} * FROM [${tableName}]`)
          
          const data = result.recordset
          
          if (data.length > 0) {
            // Create worksheet from data
            const worksheet = XLSX.utils.json_to_sheet(data)
            
            // Clean sheet name (Excel has restrictions)
            const sheetName = tableName.replace(/[\\\/\?\*\[\]]/g, '_').substring(0, 31)
            
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
          }
        } catch (tableError) {
          console.warn(`Could not export table ${tableName}:`, (tableError as Error).message)
        }
      }
      
      await pool.close()
      
      // Generate Excel buffer
      const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
      
      const headers = new Headers({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${id}-datamart.xlsx"`
      })

      // Add rate limit headers
      if (apiKey) {
        const rateLimitResult = await apiGeneralLimiter.checkLimit(apiKey)
        const rateLimitHeaders = createRateLimitHeaders(rateLimitResult)
        rateLimitHeaders.forEach((value, key) => {
          headers.set(key, value)
        })
      }
      
      return new NextResponse(excelBuffer, { headers })
    }
    
    // Handle single table download (CSV or JSON)
    let tableName: string
    if (table && datasetInfo.relatedTables.includes(table)) {
      tableName = table
    } else {
      tableName = datasetInfo.mainTable
    }

    // Query the data with limit
    const result = await pool.request()
      .query(`SELECT TOP ${limit} * FROM [${tableName}]`)

    await pool.close()

    const data = result.recordset

    // Return data in requested format
    if (format === 'csv') {
      // Convert to CSV
      if (data.length === 0) {
        const headers = new Headers({
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${id}-${tableName}.csv"`
        })

        return new NextResponse('No data available', { headers })
      }

      const headers = Object.keys(data[0]).join(',')
      const rows = data.map(row => 
        Object.values(row).map(value => {
          if (value === null || value === undefined) {
            return ''
          }
          const stringValue = String(value)
          // Escape CSV values that contain commas, quotes, or newlines
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        }).join(',')
      )
      
      const csv = [headers, ...rows].join('\n')
      
      const responseHeaders = new Headers({
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${id}-${tableName}.csv"`
      })

      // Add rate limit headers
      if (apiKey) {
        const rateLimitResult = await apiGeneralLimiter.checkLimit(apiKey)
        const rateLimitHeaders = createRateLimitHeaders(rateLimitResult)
        rateLimitHeaders.forEach((value, key) => {
          responseHeaders.set(key, value)
        })
      }
      
      return new NextResponse(csv, { headers: responseHeaders })
    }

    // Default to JSON
    const responseData = {
      success: true,
      dataset: id,
      type: datasetInfo.type,
      tableName,
      availableTables: datasetInfo.relatedTables,
      count: data.length,
      data,
      note: datasetInfo.type === 'datamart' 
        ? (table ? `Data from specific table: ${tableName}. Use format=xlsx to download entire datamart as Excel with multiple sheets.` : `Data from main table: ${tableName}. Use ?table=<table_name> for specific tables or format=xlsx for entire datamart.`)
        : `Data from table: ${tableName}`,
      rateLimit: apiKey ? {
        type: 'api',
        remaining: (await apiGeneralLimiter.checkLimit(apiKey)).remaining
      } : {
        type: 'download',
        burstRemaining: (await downloadBurstLimiter.checkLimit(clientIP)).remaining,
        hourlyRemaining: (await downloadLimiter.checkLimit(clientIP)).remaining
      }
    }

    // Add rate limit headers for JSON responses
    let responseHeaders = new Headers()
    if (apiKey) {
      const rateLimitResult = await apiGeneralLimiter.checkLimit(apiKey)
      responseHeaders = createRateLimitHeaders(rateLimitResult)
    }

    return NextResponse.json(responseData, { headers: responseHeaders })

  } catch (error) {
    console.error('Error downloading dataset:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to download dataset', details: (error as Error).message },
      { status: 500 }
    )
  }
} 