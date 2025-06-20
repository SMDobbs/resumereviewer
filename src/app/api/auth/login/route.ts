import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { verifyPassword, createSession, setSessionCookie } from '../../../../lib/auth'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      const response = NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
      
      // Add cache control headers
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')
      
      return response
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      const response = NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      )
      
      // Add cache control headers
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')
      
      return response
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      const response = NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      )
      
      // Add cache control headers
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')
      
      return response
    }

    // Create session
    const sessionPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }

    const sessionToken = await createSession(sessionPayload)
    
    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user
    
    const response = NextResponse.json({ user: userWithoutPassword })
    
    // Set session cookie with enhanced security
    setSessionCookie(response, sessionToken)

    return response
  } catch (error) {
    console.error('Login error:', error)
    const response = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
    
    // Add cache control headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  }
} 