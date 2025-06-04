import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '../../../../lib/auth'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user) {
      const response = NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
      
      // Add cache control headers to prevent caching of auth failures
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')
      
      return response
    }

    const response = NextResponse.json({ user })
    
    // Add cache control headers to prevent caching of user data
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Get user error:', error)
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