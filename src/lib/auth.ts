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
  iat?: number
  exp?: number
  [key: string]: string | Date | number | boolean | undefined
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export async function createSession(payload: SessionPayload) {
  const now = Math.floor(Date.now() / 1000)
  const expirationTime = now + (7 * 24 * 60 * 60) // 7 days in seconds
  
  return await new SignJWT({
    ...payload,
    expiresAt: new Date(expirationTime * 1000).toISOString()
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setExpirationTime(expirationTime)
    .sign(secret)
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
    console.error('JWT verification failed:', error)
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

  try {
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
        remainingReviews: true,
        currentRole: true,
        experience: true,
        industry: true,
        goals: true,
        createdAt: true
      }
    })

    return user
  } catch (error) {
    console.error('Database error in getCurrentUser:', error)
    return null
  }
}

export function setSessionCookie(response: NextResponse, token: string) {
  const isProduction = process.env.NODE_ENV === 'production'
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  }
  
  response.cookies.set('session', token, cookieOptions)
  
  // Add cache control headers to prevent caching of authenticated responses
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
}

export function deleteSessionCookie(response: NextResponse) {
  // Clear the session cookie with multiple strategies to ensure it's removed
  response.cookies.delete('session')
  
  // Set an expired cookie as well (belt and suspenders approach)
  response.cookies.set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    expires: new Date(0),
    path: '/'
  })
  
  // Add cache control headers
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
}

// New utility function to clear all auth-related cookies and cache
export function clearAllAuthCookies(response: NextResponse) {
  const cookiesToClear = ['session', '__Secure-session', '__Host-session']
  
  cookiesToClear.forEach(cookieName => {
    // Clear with different path and domain combinations
    response.cookies.set(cookieName, '', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 0,
      expires: new Date(0),
      path: '/'
    })
    
    response.cookies.set(cookieName, '', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 0,
      expires: new Date(0),
      path: '/'
    })
  })
  
  // Add comprehensive cache control headers
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  response.headers.set('Clear-Site-Data', '"cache", "cookies", "storage"')
} 