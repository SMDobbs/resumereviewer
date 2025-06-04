import { NextResponse } from 'next/server'
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

// Get list of available tables/datasets
export async function GET(_request: Request) {
  try {
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

    // Try to connect and get actual table information
    try {
      const pool = new ConnectionPool(azureConfig)
      await pool.connect()

      // Get actual table information for each dataset
      for (const dataset of datasets) {
        try {
          // Get row count from main table
          const countResult = await pool.request()
            .query(`SELECT COUNT(*) as total_rows FROM [${dataset.mainTable}]`)
          
          // Get total columns across all related tables
          const relatedTablesColumns = await Promise.all(
            dataset.relatedTables.map(async (tableName) => {
              try {
                const result = await pool.request()
                  .query(`
                    SELECT COUNT(*) as table_columns
                    FROM INFORMATION_SCHEMA.COLUMNS 
                    WHERE TABLE_NAME = '${tableName}'
                  `)
                return result.recordset[0]?.table_columns || 0
              } catch {
                return 0
              }
            })
          )

          dataset.rows = countResult.recordset[0]?.total_rows || 0
          dataset.columns = relatedTablesColumns.reduce((sum, cols) => sum + cols, 0)
          
          // Rough size estimate based on all related tables
          const avgRowSize = dataset.columns * 50 // Rough estimate
          const approximateSize = Math.round((dataset.rows * avgRowSize) / (1024 * 1024) * 100) / 100
          dataset.size = `${approximateSize} MB`
        } catch (tableError) {
          console.warn(`Could not get info for dataset ${dataset.id}:`, (tableError as Error).message)
        }
      }

      await pool.close()
    } catch (connectionError) {
      console.warn('Could not connect to Azure SQL database:', (connectionError as Error).message)
    }

    return NextResponse.json({
      success: true,
      datasets
    })
  } catch (error) {
    console.error('Error fetching datasets:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch datasets' },
      { status: 500 }
    )
  }
} 