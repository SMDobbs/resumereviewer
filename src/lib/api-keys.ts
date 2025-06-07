import { randomBytes } from 'crypto'
import { prisma } from '@/lib/prisma'

export interface ApiKeyData {
  id: string
  key: string
  name: string
  userId: string
  createdAt: Date
  lastUsed?: Date
  isActive: boolean
  usageCount: number
}

// Generate a secure API key
export function generateApiKey(): string {
  const prefix = 'ah_' // analyst hub prefix
  const keyPart = randomBytes(32).toString('hex')
  return `${prefix}${keyPart}`
}

// Create and store a new API key for a user
export async function createApiKey(userId: string, name?: string): Promise<ApiKeyData> {
  const key = generateApiKey()
  
  const apiKey = await prisma.apiKey.create({
    data: {
      key,
      name: name || `API Key ${new Date().toLocaleDateString()}`,
      userId,
      usageCount: 0,
      isActive: true
    }
  })
  
  return {
    id: apiKey.id,
    key: apiKey.key,
    name: apiKey.name,
    userId: apiKey.userId,
    createdAt: apiKey.createdAt,
    lastUsed: apiKey.lastUsed || undefined,
    isActive: apiKey.isActive,
    usageCount: apiKey.usageCount
  }
}

// Validate an API key and update usage statistics
export async function validateApiKey(key: string): Promise<ApiKeyData | null> {
  if (!key || !key.startsWith('ah_')) {
    return null
  }
  
  try {
    const apiKey = await prisma.apiKey.findFirst({
      where: {
        key,
        isActive: true
      }
    })
    
    if (!apiKey) {
      return null
    }
    
    // Update last used timestamp and usage count
    const updatedKey = await prisma.apiKey.update({
      where: { id: apiKey.id },
      data: {
        lastUsed: new Date(),
        usageCount: { increment: 1 }
      }
    })
    
    return {
      id: updatedKey.id,
      key: updatedKey.key,
      name: updatedKey.name,
      userId: updatedKey.userId,
      createdAt: updatedKey.createdAt,
      lastUsed: updatedKey.lastUsed || undefined,
      isActive: updatedKey.isActive,
      usageCount: updatedKey.usageCount
    }
  } catch (error) {
    console.error('Error validating API key:', error)
    return null
  }
}

// Get API key from request headers
export function extractApiKey(request: Request): string | null {
  // Check Authorization header (Bearer token)
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  // Check X-API-Key header
  const apiKeyHeader = request.headers.get('x-api-key')
  if (apiKeyHeader) {
    return apiKeyHeader
  }
  
  // Check query parameter (less secure, but convenient for testing)
  const url = new URL(request.url)
  const apiKeyParam = url.searchParams.get('api_key')
  if (apiKeyParam) {
    return apiKeyParam
  }
  
  return null
}

// Revoke an API key
export async function revokeApiKey(keyId: string, userId: string): Promise<boolean> {
  try {
    const updatedKey = await prisma.apiKey.updateMany({
      where: {
        id: keyId,
        userId: userId // Ensure users can only revoke their own keys
      },
      data: {
        isActive: false
      }
    })
    
    return updatedKey.count > 0
  } catch (error) {
    console.error('Error revoking API key:', error)
    return false
  }
}

// Get all API keys for a user
export async function getUserApiKeys(userId: string): Promise<ApiKeyData[]> {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        userId,
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return apiKeys.map(key => ({
      id: key.id,
      key: key.key,
      name: key.name,
      userId: key.userId,
      createdAt: key.createdAt,
      lastUsed: key.lastUsed || undefined,
      isActive: key.isActive,
      usageCount: key.usageCount
    }))
  } catch (error) {
    console.error('Error fetching user API keys:', error)
    return []
  }
}

// Helper to get API key stats
export async function getApiKeyStats(key: string): Promise<{
  usageCount: number
  lastUsed?: Date
  createdAt: Date
} | null> {
  try {
    const apiKey = await prisma.apiKey.findFirst({
      where: { key, isActive: true },
      select: {
        usageCount: true,
        lastUsed: true,
        createdAt: true
      }
    })
    
    if (!apiKey) {
      return null
    }
    
    return {
      usageCount: apiKey.usageCount,
      lastUsed: apiKey.lastUsed || undefined,
      createdAt: apiKey.createdAt
    }
  } catch (error) {
    console.error('Error fetching API key stats:', error)
    return null
  }
} 