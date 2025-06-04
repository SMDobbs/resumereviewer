import { NextRequest, NextResponse } from 'next/server'
import { clearAllAuthCookies } from '../../../../lib/auth'

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ 
    message: 'Logged out successfully',
    timestamp: new Date().toISOString()
  })
  
  // Use the enhanced cookie clearing mechanism
  clearAllAuthCookies(response)
  
  return response
} 