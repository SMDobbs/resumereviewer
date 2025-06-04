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

interface DatasetInfo {
  name: string
  description: string
  category: string
  type: 'datamart' | 'table'
  mainTable: string
  relatedTables: string[]
  tableCount: number
  tags: string[]
}

// Map dataset IDs to table names and metadata
const datasetInfo: Record<string, DatasetInfo> = {
  'ecom-datamart': {
    name: 'E-commerce Datamart',
    description: 'Complete e-commerce business intelligence datamart with products, customers, orders, and sales analytics. Perfect for retail dashboard projects.',
    category: 'E-commerce & Retail',
    type: 'datamart',
    mainTable: 'ecom_orders',
    relatedTables: ['ecom_product_categories', 'ecom_products', 'ecom_customers', 'ecom_orders', 'ecom_order_items'],
    tableCount: 5,
    tags: ['E-commerce', 'Sales', 'Customer Analytics', 'Product Management', 'Retail BI']
  },
  'education-datamart': {
    name: 'Education Management Datamart',
    description: 'Comprehensive academic datamart covering students, faculty, courses, enrollments, and performance analytics. Ideal for educational institution analytics.',
    category: 'Education & Learning',
    type: 'datamart',
    mainTable: 'education_students',
    relatedTables: ['education_students', 'education_teachers', 'education_courses', 'education_classes', 'education_enrollments', 'education_grades', 'education_departments', 'education_prerequisites'],
    tableCount: 8,
    tags: ['Education', 'Academic Performance', 'Student Analytics', 'Learning Management', 'Academic BI']
  },
  'fitness-datamart': {
    name: 'Fitness & Wellness Datamart',
    description: 'Health and fitness tracking datamart with user profiles, activities, and workout analytics for wellness application development.',
    category: 'Health & Fitness',
    type: 'datamart',
    mainTable: 'fitness_users',
    relatedTables: ['fitness_users', 'fitness_activities', 'fitness_workouts'],
    tableCount: 3,
    tags: ['Health', 'Fitness', 'Wellness', 'Activity Tracking', 'Health BI']
  },
  'music-datamart': {
    name: 'Music Streaming Datamart',
    description: 'Music platform analytics datamart with users, artists, songs, and play history for music industry insights and recommendation systems.',
    category: 'Entertainment & Media',
    type: 'datamart',
    mainTable: 'music_plays',
    relatedTables: ['music_users', 'music_artists', 'music_songs', 'music_plays'],
    tableCount: 4,
    tags: ['Music Analytics', 'Streaming', 'Entertainment', 'Recommendation Systems', 'Media BI']
  },
  'smart-home-events': {
    name: 'Smart Home IoT Events',
    description: 'Internet of Things data from smart home devices and events for IoT analytics and automation insights.',
    category: 'IoT & Smart Devices',
    type: 'table',
    mainTable: 'SmartHomeEvents',
    relatedTables: ['SmartHomeEvents'],
    tableCount: 1,
    tags: ['IoT', 'Smart Home', 'Device Analytics', 'Automation', 'Event Tracking']
  },
  'box-office-sales': {
    name: 'Box Office Sales',
    description: 'Movie box office performance data for entertainment industry analysis and film success prediction models.',
    category: 'Entertainment & Media',
    type: 'table',
    mainTable: 'box_office_sales',
    relatedTables: ['box_office_sales'],
    tableCount: 1,
    tags: ['Movies', 'Box Office', 'Entertainment', 'Film Analytics', 'Revenue Analysis']
  },
  'video-games': {
    name: 'Video Games Analytics',
    description: 'Video game industry data for gaming analytics, performance tracking, and market analysis projects.',
    category: 'Entertainment & Media',
    type: 'table',
    mainTable: 'video_games',
    relatedTables: ['video_games'],
    tableCount: 1,
    tags: ['Gaming', 'Video Games', 'Entertainment', 'Market Analysis', 'Game Analytics']
  },
  'patient-records': {
    name: 'Patient Medical Records',
    description: 'Healthcare patient records for medical analytics, treatment outcomes, and healthcare management insights.',
    category: 'Healthcare',
    type: 'table',
    mainTable: 'patient_records',
    relatedTables: ['patient_records'],
    tableCount: 1,
    tags: ['Healthcare', 'Medical Records', 'Patient Analytics', 'Treatment Outcomes', 'Healthcare BI']
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Get dataset info
    const dataset = datasetInfo[id]
    if (!dataset) {
      return NextResponse.json(
        { success: false, error: 'Dataset not found' },
        { status: 404 }
      )
    }

    // Connect to Azure SQL Database to get actual metadata
    const pool = new ConnectionPool(azureConfig)
    await pool.connect()

    // Get metadata for all related tables
    const tableMetadata = await Promise.all(
      dataset.relatedTables.map(async (tableName: string) => {
        try {
          // Get row count
          const countResult = await pool.request()
            .query(`SELECT COUNT(*) as total_rows FROM [${tableName}]`)
          
          // Get column information
          const columnsResult = await pool.request()
            .query(`
              SELECT 
                COLUMN_NAME,
                DATA_TYPE,
                IS_NULLABLE,
                CHARACTER_MAXIMUM_LENGTH
              FROM INFORMATION_SCHEMA.COLUMNS 
              WHERE TABLE_NAME = '${tableName}'
              ORDER BY ORDINAL_POSITION
            `)

          // Get sample data for preview
          const sampleResult = await pool.request()
            .query(`SELECT TOP 3 * FROM [${tableName}]`)

          const totalRows = countResult.recordset[0]?.total_rows || 0
          const columns = columnsResult.recordset
          const sampleData = sampleResult.recordset

          return {
            tableName,
            rows: totalRows,
            columns: columns.length,
            columnInfo: columns,
            preview: sampleData.length > 0 ? Object.keys(sampleData[0]) : [],
            sampleData: sampleData
          }
        } catch (tableError) {
          console.warn(`Could not get metadata for table ${tableName}:`, (tableError as Error).message)
          return {
            tableName,
            rows: 0,
            columns: 0,
            columnInfo: [],
            preview: [],
            sampleData: [],
            error: (tableError as Error).message
          }
        }
      })
    )

    await pool.close()

    // Calculate totals across all tables
    const totalRows = tableMetadata.reduce((sum, table) => sum + table.rows, 0)
    const totalColumns = tableMetadata.reduce((sum, table) => sum + table.columns, 0)

    // Calculate approximate size (rough estimate)
    const avgRowSize = totalColumns * 50 // Rough estimate
    const approximateSize = Math.round((totalRows * avgRowSize) / (1024 * 1024) * 100) / 100

    return NextResponse.json({
      success: true,
      dataset: {
        id,
        ...dataset,
        rows: totalRows,
        columns: totalColumns,
        size: `${approximateSize} MB`,
        tableCount: dataset.relatedTables.length,
        tableMetadata: tableMetadata,
        mainTablePreview: tableMetadata.find(t => t.tableName === dataset.mainTable)?.preview || [],
        usage: {
          type: dataset.type,
          mainTable: dataset.mainTable,
          description: dataset.type === 'datamart' 
            ? `This is a ${dataset.tableCount}-table datamart. Use the main table for primary queries, or specify 'table' parameter to query specific tables. Download as Excel (.xlsx) to get all tables as separate sheets.`
            : "This is a standalone table dataset.",
          examples: dataset.type === 'datamart' ? [
            `GET /api/datasets/${id}/download - Downloads main table (${dataset.mainTable}) as CSV`,
            `GET /api/datasets/${id}/download?format=xlsx - Downloads entire datamart as Excel with ${dataset.tableCount} sheets`,
            `GET /api/datasets/${id}/download?table=${dataset.relatedTables[1] || dataset.relatedTables[0]} - Downloads specific table as CSV`,
            `POST /api/datasets/${id}/query - Queries main table`,
            `POST /api/datasets/${id}/query with {"table": "${dataset.relatedTables[1] || dataset.relatedTables[0]}"} - Queries specific table`
          ] : [
            `GET /api/datasets/${id}/download?format=csv - Downloads table as CSV`,
            `GET /api/datasets/${id}/download?format=json - Downloads table as JSON`,
            `POST /api/datasets/${id}/query - Queries table with filters`
          ]
        }
      }
    })

  } catch (error) {
    console.error('Error fetching dataset metadata:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dataset metadata', details: (error as Error).message },
      { status: 500 }
    )
  }
} 