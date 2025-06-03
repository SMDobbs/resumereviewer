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
    return payload as SessionPayload
  } catch {
    return null
  }
} 