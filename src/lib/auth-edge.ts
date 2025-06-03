import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
)

export interface SessionPayload {
  userId: string
  email: string
  role: string
  expiresAt: Date
  [key: string]: string | Date | number | boolean
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
    
    // Check if token is expired
    if (sessionPayload.expiresAt && new Date(sessionPayload.expiresAt) < new Date()) {
      return null
    }
    
    return sessionPayload
  } catch {
    return null
  }
} 