import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '../../../../lib/auth'
import { verifySession } from '../../../../lib/auth'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    // Get all cookies
    const allCookies = request.cookies.getAll()
    const sessionCookie = request.cookies.get('session')?.value
    
    // Try to get current user
    const user = await getCurrentUser(request)
    
    // Try to verify session manually
    let sessionValid = false
    let sessionData = null
    if (sessionCookie) {
      try {
        sessionData = await verifySession(sessionCookie)
        sessionValid = !!sessionData
      } catch {
        sessionValid = false
      }
    }
    
    const debugInfo = {
      timestamp: new Date().toISOString(),
      hasSessionCookie: !!sessionCookie,
      sessionCookieLength: sessionCookie?.length || 0,
      sessionValid,
      hasUser: !!user,
      allCookies: allCookies.map(cookie => ({
        name: cookie.name,
        hasValue: !!cookie.value,
        valueLength: cookie.value?.length || 0
      })),
      userAgent: request.headers.get('user-agent'),
      sessionData: sessionData ? {
        userId: sessionData.userId,
        email: sessionData.email,
        role: sessionData.role,
        expiresAt: sessionData.expiresAt
      } : null,
      user: user ? {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        role: user.role,
        subscriptionStatus: user.subscriptionStatus
      } : null
    }
    
    const response = NextResponse.json({ debug: debugInfo })
    
    // Add cache control headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch {
    return NextResponse.json(
      { success: false, error: 'Database connection failed' },
      { status: 500 }
    )
  }
} 