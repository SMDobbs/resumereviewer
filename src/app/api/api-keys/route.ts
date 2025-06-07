import { NextRequest, NextResponse } from 'next/server'
import { createApiKey, getUserApiKeys } from '@/lib/api-keys'
import { getClientIP, downloadBurstLimiter, createRateLimitHeaders } from '@/lib/rate-limit'
import { getCurrentUser } from '@/lib/auth'

// Generate a new API key
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser(request)
    if (!user?.id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication required. Please log in to generate an API key.',
          hint: 'API keys are associated with your account for security and usage tracking.'
        },
        { status: 401 }
      )
    }

    // Rate limit API key generation to prevent abuse
    const clientIP = getClientIP(request)
    const rateLimitResult = await downloadBurstLimiter.checkLimit(clientIP)
    
    if (!rateLimitResult.allowed) {
      const headers = createRateLimitHeaders(rateLimitResult)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded. Please wait before generating another API key.',
          retryAfter: rateLimitResult.retryAfter
        },
        { 
          status: 429,
          headers 
        }
      )
    }

    const body = await request.json().catch(() => ({}))
    const { name } = body

    // Generate new API key for the authenticated user
    const apiKey = await createApiKey(user.id, name)

    // Don't return the full key data, just what the user needs
    return NextResponse.json({
      success: true,
      apiKey: {
        id: apiKey.id,
        key: apiKey.key,
        name: apiKey.name,
        createdAt: apiKey.createdAt
      },
      message: 'API key generated successfully. Please store this key securely as it cannot be retrieved again.',
      usage: {
        rateLimit: {
          remaining: rateLimitResult.remaining
        }
      }
    })

  } catch (error) {
    console.error('Error generating API key:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate API key' },
      { status: 500 }
    )
  }
}

// Get user's API keys
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await getCurrentUser(request)
    if (!user?.id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication required to view API keys.' 
        },
        { status: 401 }
      )
    }

    // Get user's API keys
    const apiKeys = await getUserApiKeys(user.id)
    
    // Only return safe information, not the actual keys
    const safeKeysInfo = apiKeys.map(key => ({
      id: key.id,
      name: key.name,
      createdAt: key.createdAt,
      lastUsed: key.lastUsed,
      usageCount: key.usageCount,
      isActive: key.isActive,
      keyPreview: `${key.key.substring(0, 10)}...` // Only show first 10 chars
    }))

    return NextResponse.json({
      success: true,
      apiKeys: safeKeysInfo,
      total: apiKeys.length
    })

  } catch (error) {
    console.error('Error fetching API keys:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch API keys' },
      { status: 500 }
    )
  }
} 