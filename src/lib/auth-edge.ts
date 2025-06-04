import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
)

export interface SessionPayload {
  userId: string
  email: string
  role: string
  expiresAt: Date | string
  iat?: number
  exp?: number
  [key: string]: string | Date | number | boolean | undefined
}

export async function verifySession(session: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ['HS256']
    })
    
    // Validate that required fields exist
    const sessionPayload = payload as SessionPayload
    if (!sessionPayload.userId || !sessionPayload.email) {
      return null
    }
    
    // Check custom expiration time as well as JWT exp
    if (sessionPayload.expiresAt) {
      const expirationDate = typeof sessionPayload.expiresAt === 'string' 
        ? new Date(sessionPayload.expiresAt) 
        : sessionPayload.expiresAt
      
      if (expirationDate < new Date()) {
        return null
      }
    }
    
    return sessionPayload
  } catch (error) {
    // Log error details for debugging but don't expose them
    console.error('JWT verification failed in middleware:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      hasSession: !!session,
      sessionLength: session?.length || 0
    })
    return null
  }
} 