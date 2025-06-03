import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export const runtime = 'nodejs'

export async function GET() {
  try {
    // Get all users (for debugging purposes)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        subscriptionStatus: true,
        createdAt: true
      }
    })

    return NextResponse.json({ 
      success: true, 
      userCount: users.length,
      users: users
    })
  } catch (error) {
    console.error('Debug users error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
} 