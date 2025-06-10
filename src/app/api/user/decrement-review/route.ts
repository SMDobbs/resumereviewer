import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Update the user's remaining reviews count
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        remainingReviews: {
          decrement: 1
        }
      },
      select: {
        id: true,
        remainingReviews: true
      }
    })

    return NextResponse.json({
      success: true,
      remainingReviews: updatedUser.remainingReviews
    })

  } catch (error) {
    console.error('Decrement review error:', error)
    return NextResponse.json(
      { error: 'Failed to update review count' },
      { status: 500 }
    )
  }
} 