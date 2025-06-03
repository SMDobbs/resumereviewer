import { NextRequest, NextResponse } from 'next/server'
import { deleteSessionCookie } from '../../../../lib/auth'

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ 
    message: 'Cookies cleared successfully',
    redirect: '/'
  })
  
  // Clear the session cookie
  deleteSessionCookie(response)
  
  return response
}

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ 
    message: 'Cookies cleared successfully' 
  })
  
  // Clear the session cookie
  deleteSessionCookie(response)
  
  return response
} 