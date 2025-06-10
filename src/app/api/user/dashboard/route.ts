import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user data with resume reviews and remaining reviews
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        remainingReviews: true,
        resumeReviews: {
          select: {
            id: true,
            fileName: true,
            overallScore: true,
            createdAt: true,
            processingStatus: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error('Dashboard API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 