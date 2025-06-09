import { NextResponse } from 'next/server'
import { ConnectionPool } from 'mssql'
import { extractApiKey, validateApiKey } from '@/lib/api-keys'
import { apiGeneralLimiter, createRateLimitHeaders } from '@/lib/rate-limit'

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

// Get list of available tables/datasets
export async function GET(request: Request) {
  try {
    // Check if this is an internal webapp request or external API call
    const userAgent = request.headers.get('user-agent') || ''
    const referer = request.headers.get('referer') || ''
    const isInternalRequest = referer.includes(process.env.NEXT_PUBLIC_BASE_URL || 'localhost') || 
                             userAgent.includes('Next.js') ||
                             request.headers.get('x-forwarded-for') === null // Same-origin request

    // For external API calls, require authentication
    if (!isInternalRequest) {
      const apiKey = extractApiKey(request)
      if (!apiKey) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'API key required for external access. Include your API key in the Authorization header as "Bearer your_api_key" or in the X-API-Key header.',
            hint: 'Generate an API key at /tools/data-export'
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

      // Apply rate limiting for external requests
      const rateLimitResult = await apiGeneralLimiter.checkLimit(apiKey)
      if (!rateLimitResult.allowed) {
        const headers = createRateLimitHeaders(rateLimitResult)
        return NextResponse.json(
          { 
            success: false, 
            error: 'Rate limit exceeded. Please wait before making more requests.',
            retryAfter: rateLimitResult.retryAfter
          },
          { 
            status: 429,
            headers 
          }
        )
      }
    }

    // Organized by prefixes as datamarts and standalone tables
    const datasets = [
      // E-commerce Datamart (5 tables)
      {
        id: 'ecom-datamart',
        name: 'E-commerce Datamart',
        description: 'Complete e-commerce business intelligence datamart with products, customers, orders, and sales analytics. Perfect for retail dashboard projects.',
        category: 'E-commerce & Retail',
        type: 'datamart',
        mainTable: 'ecom_orders',
        relatedTables: ['ecom_product_categories', 'ecom_products', 'ecom_customers', 'ecom_orders', 'ecom_order_items'],
        tableCount: 5,
        rows: 0,
        columns: 0,
        size: '0 MB',
        tags: ['E-commerce', 'Sales', 'Customer Analytics', 'Product Management', 'Retail BI']
      },
      
      // Education Datamart (8 tables)
      {
        id: 'education-datamart',
        name: 'Education Management Datamart',
        description: 'Comprehensive academic datamart covering students, faculty, courses, enrollments, and performance analytics. Ideal for educational institution analytics.',
        category: 'Education & Learning',
        type: 'datamart',
        mainTable: 'education_students',
        relatedTables: ['education_students', 'education_teachers', 'education_courses', 'education_classes', 'education_enrollments', 'education_grades', 'education_departments', 'education_prerequisites'],
        tableCount: 8,
        rows: 0,
        columns: 0,
        size: '0 MB',
        tags: ['Education', 'Academic Performance', 'Student Analytics', 'Learning Management', 'Academic BI']
      },
      
      // Fitness Datamart (3 tables)
      {
        id: 'fitness-datamart',
        name: 'Fitness & Wellness Datamart',
        description: 'Health and fitness tracking datamart with user profiles, activities, and workout analytics for wellness application development.',
        category: 'Health & Fitness',
        type: 'datamart',
        mainTable: 'fitness_users',
        relatedTables: ['fitness_users', 'fitness_activities', 'fitness_workouts'],
        tableCount: 3,
        rows: 0,
        columns: 0,
        size: '0 MB',
        tags: ['Health', 'Fitness', 'Wellness', 'Activity Tracking', 'Health BI']
      },
      
      // Music Datamart (4 tables)
      {
        id: 'music-datamart',
        name: 'Music Streaming Datamart',
        description: 'Music platform analytics datamart with users, artists, songs, and play history for music industry insights and recommendation systems.',
        category: 'Entertainment & Media',
        type: 'datamart',
        mainTable: 'music_plays',
        relatedTables: ['music_users', 'music_artists', 'music_songs', 'music_plays'],
        tableCount: 4,
        rows: 0,
        columns: 0,
        size: '0 MB',
        tags: ['Music Analytics', 'Streaming', 'Entertainment', 'Recommendation Systems', 'Media BI']
      },
      
      // Standalone Tables
      {
        id: 'smart-home-events',
        name: 'Smart Home IoT Events',
        description: 'Internet of Things data from smart home devices and events for IoT analytics and automation insights.',
        category: 'IoT & Smart Devices',
        type: 'table',
        mainTable: 'SmartHomeEvents',
        relatedTables: ['SmartHomeEvents'],
        tableCount: 1,
        rows: 0,
        columns: 0,
        size: '0 MB',
        tags: ['IoT', 'Smart Home', 'Device Analytics', 'Automation', 'Event Tracking']
      },
      
      {
        id: 'box-office-sales',
        name: 'Box Office Sales',
        description: 'Movie box office performance data for entertainment industry analysis and film success prediction models.',
        category: 'Entertainment & Media',
        type: 'table',
        mainTable: 'box_office_sales',
        relatedTables: ['box_office_sales'],
        tableCount: 1,
        rows: 0,
        columns: 0,
        size: '0 MB',
        tags: ['Movies', 'Box Office', 'Entertainment', 'Film Analytics', 'Revenue Analysis']
      },
      
      {
        id: 'video-games',
        name: 'Video Games Analytics',
        description: 'Video game industry data for gaming analytics, performance tracking, and market analysis projects.',
        category: 'Entertainment & Media',
        type: 'table',
        mainTable: 'video_games',
        relatedTables: ['video_games'],
        tableCount: 1,
        rows: 0,
        columns: 0,
        size: '0 MB',
        tags: ['Gaming', 'Video Games', 'Entertainment', 'Market Analysis', 'Game Analytics']
      },
      
      {
        id: 'patient-records',
        name: 'Patient Medical Records',
        description: 'Healthcare patient records for medical analytics, treatment outcomes, and healthcare management insights.',
        category: 'Healthcare',
        type: 'table',
        mainTable: 'patient_records',
        relatedTables: ['patient_records'],
        tableCount: 1,
        rows: 0,
        columns: 0,
        size: '0 MB',
        tags: ['Healthcare', 'Medical Records', 'Patient Analytics', 'Treatment Outcomes', 'Healthcare BI']
      }
    ]

    // Connect to database to get actual row counts and metadata
    // Gracefully handle database connection issues without exposing details
    try {
      const pool = new ConnectionPool(azureConfig)
      await pool.connect()

      // Get row counts for each dataset
      for (const dataset of datasets) {
        try {
          let totalRows = 0
          let totalColumns = 0

          for (const tableName of dataset.relatedTables) {
            try {
              // Get row count
              const countResult = await pool.request()
                .query(`SELECT COUNT(*) as count FROM [${tableName}]`)
              
              const rowCount = countResult.recordset[0]?.count || 0
              totalRows += rowCount

              // Get column count
              const columnsResult = await pool.request()
                .query(`
                  SELECT COUNT(*) as count 
                  FROM INFORMATION_SCHEMA.COLUMNS 
                  WHERE TABLE_NAME = '${tableName}'
                `)
              
              const columnCount = columnsResult.recordset[0]?.count || 0
              totalColumns += columnCount

            } catch (tableError) {
              console.warn(`Could not get metadata for table ${tableName}:`, (tableError as Error).message)
            }
          }

          // Update dataset with actual data
          dataset.rows = totalRows
          dataset.columns = totalColumns
          
          // Calculate approximate size (rough estimate)
          const avgRowSize = (totalColumns || 20) * 50 // Rough estimate
          const approximateSize = Math.round((totalRows * avgRowSize) / (1024 * 1024) * 100) / 100
          dataset.size = `${approximateSize} MB`

        } catch (datasetError) {
          console.warn(`Could not get metadata for dataset ${dataset.id}:`, (datasetError as Error).message)
        }
      }

      await pool.close()

    } catch (dbError) {
      console.warn('Could not connect to database for metadata:', (dbError as Error).message)
      // Continue without metadata - don't block users from seeing datasets
    }
    
    // Prepare response based on request type
    const responseData: any = {
      success: true,
      datasets,
      meta: {
        totalDatasets: datasets.length,
        datamarts: datasets.filter(d => d.type === 'datamart').length,
        tables: datasets.filter(d => d.type === 'table').length
      }
    }

    let responseHeaders = new Headers()

    if (!isInternalRequest) {
      // External API request - include usage and rate limit info
      const apiKey = extractApiKey(request)
      const validatedKey = await validateApiKey(apiKey!)
      const rateLimitResult = await apiGeneralLimiter.checkLimit(apiKey!)
      
      responseData.usage = {
        apiKey: validatedKey!.name,
        requestCount: validatedKey!.usageCount,
        rateLimit: {
          remaining: rateLimitResult.remaining,
          resetTime: rateLimitResult.resetTime
        }
      }
      responseData.note = "External API access requires authentication."
      responseHeaders = createRateLimitHeaders(rateLimitResult)
    } else {
      // Internal webapp request
      responseData.note = "Datasets displayed for browsing. API access requires authentication."
    }

    return NextResponse.json(responseData, { headers: responseHeaders })

  } catch (error) {
    console.error('Error fetching datasets:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch datasets' },
      { status: 500 }
    )
  }
} 