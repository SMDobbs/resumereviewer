# Vercel Deployment Guide - Azure SQL Integration

## Environment Variables for Vercel

Add these environment variables in your Vercel dashboard:

### Required Variables:
```
AZURE_SQL_SERVER=sqlcamp.database.windows.net
AZURE_SQL_DATABASE=camp_sql_data
AZURE_SQL_USERNAME=sd3166
AZURE_SQL_PASSWORD=your_actual_password_here
```

### Steps to Add Environment Variables:

1. **Go to Vercel Dashboard**
   - Navigate to your project
   - Click on "Settings" tab
   - Click on "Environment Variables" in the sidebar

2. **Add Each Variable**
   - Name: `AZURE_SQL_SERVER`
   - Value: `sqlcamp.database.windows.net`
   - Environments: ✅ Production ✅ Preview ✅ Development

   - Name: `AZURE_SQL_DATABASE`
   - Value: `camp_sql_data`
   - Environments: ✅ Production ✅ Preview ✅ Development

   - Name: `AZURE_SQL_USERNAME`
   - Value: `sd3166`
   - Environments: ✅ Production ✅ Preview ✅ Development

   - Name: `AZURE_SQL_PASSWORD`
   - Value: `your_actual_password_here`
   - Environments: ✅ Production ✅ Preview ✅ Development

## Azure SQL Server Firewall Configuration

Since Vercel uses dynamic IP addresses, you need to configure your Azure SQL Server firewall:

### Option 1: Allow All Azure Services (Recommended for development)
1. Go to Azure Portal → SQL Server → Networking
2. Set "Allow Azure services and resources to access this server" to **Yes**

### Option 2: Specific IP Ranges (More secure)
1. Find Vercel's IP ranges in their documentation
2. Add specific IP ranges to your firewall rules

### Option 3: Temporary Open Access (Not recommended for production)
1. Add firewall rule: Start IP: `0.0.0.0`, End IP: `255.255.255.255`
2. **⚠️ Only use for testing - remove before production**

## Local Development Setup

Create a `.env.local` file in your project root:

```bash
# Azure SQL Database Configuration
AZURE_SQL_SERVER=sqlcamp.database.windows.net
AZURE_SQL_DATABASE=camp_sql_data
AZURE_SQL_USERNAME=sd3166
AZURE_SQL_PASSWORD=your_actual_password_here

# Your other existing environment variables...
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Deployment Checklist

- [ ] Environment variables added to Vercel
- [ ] Azure SQL Server firewall configured
- [ ] Local `.env.local` file created
- [ ] Test connection locally with `npm run dev`
- [ ] Deploy to Vercel
- [ ] Test API endpoints in production

## Testing API Endpoints

After deployment, test these endpoints:

1. **List Datasets:** `GET https://your-app.vercel.app/api/datasets`
2. **Get Dataset:** `GET https://your-app.vercel.app/api/datasets/sales-data`
3. **Download CSV:** `GET https://your-app.vercel.app/api/datasets/sales-data/download?format=csv`

## Connection Security Features

Your connection includes these security features:
- ✅ SSL Encryption (`encrypt: true`)
- ✅ Certificate Validation (`trustServerCertificate: false`)
- ✅ Connection Timeout (30 seconds)
- ✅ Request Timeout (30 seconds)

## Troubleshooting

### Common Issues:

1. **"Cannot connect to server"**
   - Check firewall settings in Azure
   - Verify environment variables are set correctly

2. **"Login failed for user"**
   - Double-check username and password
   - Ensure user has access to the database

3. **"Table doesn't exist"**
   - Update table names in API routes if your tables have different names
   - Check the `datasetTableMap` in each API route

### Debug Steps:
1. Check Vercel function logs
2. Verify environment variables in Vercel dashboard
3. Test connection locally first
4. Check Azure SQL Server activity logs 