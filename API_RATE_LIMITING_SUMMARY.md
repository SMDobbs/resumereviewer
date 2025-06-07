# API Key Authentication & Rate Limiting System

## Overview
Implemented a comprehensive API key authentication and rate limiting system for the AnalystHub data export platform to prevent abuse while enabling legitimate dashboard and analytics use cases.

## Features Implemented

### 1. API Key Management
- **Generation**: POST `/api/api-keys` - Generate new API keys with rate limiting
- **Validation**: Secure API key validation with `ah_` prefix
- **Storage**: In-memory storage (easily extendable to database)
- **Tracking**: Usage count and last used timestamps

### 2. Rate Limiting

#### Without API Key (Direct Downloads)
- **Burst Limit**: 3 downloads every 15 minutes per IP
- **Hourly Limit**: 10 downloads per hour per IP
- **No API Access**: Cannot use query endpoints
- **Purpose**: Prevent download spam while allowing basic usage

#### With API Key (Programmatic Access)
- **General API**: 1,000 requests per hour per API key
- **Query API**: 500 queries per hour per API key
- **Downloads**: Included in general API limits
- **Purpose**: Support dashboard applications and analytics tools

### 3. Authentication Requirements

#### API Key Required:
- `GET /api/datasets` - List datasets
- `GET /api/datasets/{id}` - Get dataset metadata  
- `POST /api/datasets/{id}/query` - Query datasets

#### API Key Optional (but recommended):
- `GET /api/datasets/{id}/download` - Download datasets
  - Without key: Strict IP-based rate limits
  - With key: Higher API-based rate limits

### 4. Frontend Features
- **API Key Generation**: One-click generation with local storage
- **Download Protection**: Visual feedback and rate limit handling
- **Error Handling**: Clear messages for rate limits and auth errors
- **Usage Tracking**: Shows remaining rate limits

## Technical Implementation

### Rate Limiting
```typescript
// Different rate limits for different use cases
const RATE_LIMITS = {
  API_GENERAL: { windowMs: 3600000, maxRequests: 1000 },    // 1000/hour
  API_QUERY: { windowMs: 3600000, maxRequests: 500 },       // 500/hour
  DOWNLOAD: { windowMs: 3600000, maxRequests: 10 },         // 10/hour
  DOWNLOAD_PER_USER: { windowMs: 900000, maxRequests: 3 }   // 3/15min
}
```

### API Key Format
```
ah_6e84079ee053a4ede9513d30824a45bbb26b630cc3bc1f1aa504f85c53d5b3e3
└─┬─┘└─────────────────────64-character hex string──────────────────────┘
  └── "analyst hub" prefix
```

### Authentication Methods
1. **Authorization Header**: `Authorization: Bearer your_api_key`
2. **X-API-Key Header**: `X-API-Key: your_api_key`
3. **Query Parameter**: `?api_key=your_api_key` (less secure, for testing)

## Rate Limit Response Headers
```http
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1749307647
Retry-After: 3600
```

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "error": "API key required. Include your API key in the Authorization header...",
  "hint": "Generate an API key at /tools/data-export"
}
```

### 429 Rate Limited
```json
{
  "success": false,
  "error": "Rate limit exceeded. Please wait before making more requests.",
  "retryAfter": 3600,
  "limits": {
    "type": "api",
    "maxRequests": 1000,
    "windowMs": 3600000,
    "remaining": 0
  }
}
```

## Benefits

### For Users:
- **Free Tier**: Basic downloads for personal projects
- **API Tier**: Higher limits for dashboard applications
- **Clear Guidance**: Error messages explain how to upgrade

### For Platform:
- **Abuse Prevention**: Multiple layers of rate limiting
- **Resource Protection**: Database and bandwidth protection
- **Usage Analytics**: Track API key usage patterns
- **Scalable**: Easy to adjust limits based on usage

### For Employers/Recruiters:
- **Professional APIs**: Demonstrates real-world API design
- **Authentication**: Shows security best practices
- **Rate Limiting**: Enterprise-grade traffic management
- **Documentation**: Clear API documentation and examples

## Usage Examples

### Python Dashboard
```python
import requests
headers = {"Authorization": "Bearer your_api_key"}

# High-frequency updates for live dashboard
for _ in range(100):
    data = requests.get("/api/datasets/ecom-datamart/query", 
                       json={"limit": 10}, headers=headers)
    # Process data...
```

### Power BI Connection
```
Data Source: Web
URL: https://analysthub.com/api/datasets/ecom-datamart/download?format=csv
Headers: Authorization: Bearer your_api_key
```

## Future Enhancements
- Database storage for API keys
- User accounts and key management
- Usage analytics dashboard
- Redis for distributed rate limiting
- Webhook notifications for limits
- Premium tiers with higher limits 