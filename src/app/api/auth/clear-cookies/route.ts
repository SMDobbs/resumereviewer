import { NextRequest, NextResponse } from 'next/server'
import { clearAllAuthCookies } from '../../../../lib/auth'

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ 
    message: 'All authentication cookies and cache cleared successfully',
    timestamp: new Date().toISOString(),
    action: 'cookies_cleared'
  })
  
  // Clear all authentication cookies and cache
  clearAllAuthCookies(response)
  
  return response
}

// Also allow GET requests for easier testing
export async function GET(_request: NextRequest) {
  const response = NextResponse.json({ 
    message: 'All authentication cookies and cache cleared successfully',
    timestamp: new Date().toISOString(),
    action: 'cookies_cleared'
  })
  
  // Clear all authentication cookies and cache
  clearAllAuthCookies(response)
  
  return response
} 