import { NextRequest, NextResponse } from 'next/server'
import { deleteSessionCookie } from '../../../../lib/auth'

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out successfully' })
  deleteSessionCookie(response)
  return response
} 