import { NextRequest, NextResponse } from 'next/server'
import { deleteSessionCookie, clearAllAuthCookies } from '../../../../lib/auth'

export const runtime = 'nodejs'

export async function GET(_request: NextRequest) {
  const response = NextResponse.json({ 
    message: 'Cookies cleared successfully',
    redirect: '/'
  })
  
  // Clear the session cookie
  deleteSessionCookie(response)
  
  return response
}

export async function POST() {
  try {
    const response = NextResponse.json({ 
      success: true, 
      message: 'Session cleared successfully' 
    })
    
    // Clear all authentication cookies
    clearAllAuthCookies(response)
    
    return response
  } catch (error) {
    console.error('Error clearing session:', error)
    
    const response = NextResponse.json({ 
      success: false, 
      error: 'Failed to clear session' 
    }, { status: 500 })
    
    // Still try to clear cookies even on error
    clearAllAuthCookies(response)
    
    return response
  }
} 