import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from './prisma'

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

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export async function createSession(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
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

export async function getCurrentUser(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value
  
  if (!sessionCookie) {
    return null
  }

  const session = await verifySession(sessionCookie)
  if (!session) {
    return null
  }

  // Get user from database
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      subscriptionStatus: true,
      currentRole: true,
      experience: true,
      industry: true,
      goals: true,
      createdAt: true
    }
  })

  return user
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
}

export function deleteSessionCookie(response: NextResponse) {
  response.cookies.delete('session')
} 