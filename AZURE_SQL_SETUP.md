# Azure SQL Database Setup for Data Export Tool

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Azure SQL Database Configuration
AZURE_SQL_SERVER="sqlcamp.database.windows.net"
AZURE_SQL_DATABASE="camp_sql_data"
AZURE_SQL_USERNAME="sd3166"
AZURE_SQL_PASSWORD="your_actual_password_here"
```

## For Vercel Deployment

In your Vercel dashboard, add these environment variables:

```bash
AZURE_SQL_SERVER=sqlcamp.database.windows.net
AZURE_SQL_DATABASE=camp_sql_data
AZURE_SQL_USERNAME=sd3166
AZURE_SQL_PASSWORD=your_actual_password_here
```

## Connection String Details

Your original connection string:
```
Driver={ODBC Driver 18 for SQL Server};Server=tcp:sqlcamp.database.windows.net,1433;Database=camp_sql_data;Uid=sd3166;Pwd={your_password_here};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;
```

Parsed into environment variables:
- **Server**: `sqlcamp.database.windows.net` (port 1433 is default)
- **Database**: `camp_sql_data`
- **Username**: `sd3166`
- **Password**: Replace `{your_password_here}` with your actual password

## Database Tables & Business Domains

The data export tool organizes your tables into logical business datasets:

### 1. **E-commerce Analytics** (`ecommerce-analytics`)
- `ecom_products` - Product catalog
- `ecom_customers` - Customer information  
- `ecom_orders` - Order transactions
- `ecom_order_items` - Order line items
- `ecom_product_categories` - Product categories

### 2. **Education Management** (`education-management`)
- `education_students` - Student records
- `education_teachers` - Teacher information
- `education_courses` - Course catalog
- `education_classes` - Class schedules
- `education_enrollments` - Student enrollments
- `education_grades` - Academic grades
- `education_departments` - Academic departments
- `education_prerequisites` - Course prerequisites

### 3. **Fitness & Health** (`fitness-health`)
- `fitness_users` - User profiles
- `fitness_activities` - Activity types
- `fitness_workouts` - Workout sessions
- `patient_records` - Patient health data

### 4. **Entertainment & Media** (`entertainment-media`)
- `music_users` - Music platform users
- `music_artists` - Artist information
- `music_songs` - Song catalog
- `music_plays` - Play history
- `box_office_sales` - Movie box office data
- `video_games` - Gaming data

### 5. **Smart Home IoT** (`smart-home-iot`)
- `SmartHomeEvents` - IoT device events and data

## API Usage Examples

### Download Specific Tables
```bash
# Download e-commerce orders
GET /api/datasets/ecommerce-analytics/download?format=csv&table=ecom_orders

# Download student data
GET /api/datasets/education-management/download?format=csv&table=education_students
```

### Query with Filters
```bash
# Query fitness workouts
POST /api/datasets/fitness-health/query
{
  "table": "fitness_workouts",
  "filters": {"workout_type": "cardio"},
  "limit": 500
}

# Query music plays by genre
POST /api/datasets/entertainment-media/query
{
  "table": "music_plays", 
  "filters": {"genre": "pop"},
  "orderBy": "play_count DESC"
}
```

## Testing the Connection

1. Start your development server: `npm run dev`
2. Navigate to `/tools/data-export`
3. The page will automatically try to connect to your Azure SQL database
4. If successful, you'll see your actual table data with row counts and column information
5. If there's an error, check the browser console and server logs for connection details

## API Endpoints

Once configured, the following endpoints will be available:

- `GET /api/datasets` - List all business domain datasets
- `GET /api/datasets/{id}` - Get dataset metadata with all related tables
- `GET /api/datasets/{id}/download?format=csv&table=table_name` - Download specific table
- `POST /api/datasets/{id}/query` - Query with filters and table selection

## Customization

If you want to modify the dataset groupings or add/remove tables:

1. Update the dataset configurations in:
   - `src/app/api/datasets/route.ts` - Main dataset definitions
   - `src/app/api/datasets/[id]/download/route.ts` - Download route table mapping
   - `src/app/api/datasets/[id]/query/route.ts` - Query route table mapping
   - `src/app/api/datasets/[id]/route.ts` - Metadata route table mapping

2. The system automatically detects tables and provides metadata, so adding new tables is straightforward.

## Security Notes

- Ensure your Azure SQL Server firewall allows connections from your application
- Use strong passwords and consider using Azure Active Directory authentication
- Never commit your actual credentials to version control
- Consider using Azure Key Vault for production deployments
- For Vercel, you may need to configure firewall rules to allow their IP ranges 