import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Fetch user's assessment history, ordered by most recent first
    const assessments = await prisma.sQLAssessmentResult.findMany({
      where: {
        userId: userId
      },
      select: {
        id: true,
        score: true,
        timeElapsed: true,
        skillLevel: true,
        categoryBreakdown: true,
        createdAt: true,
        questionsVersion: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10 // Limit to last 10 assessments
    })

    // Calculate improvement trend
    let trend = null
    if (assessments.length >= 2) {
      const latest = assessments[0].score
      const previous = assessments[1].score
      trend = latest - previous
    }

    // Get best score
    const bestScore = assessments.length > 0 ? Math.max(...assessments.map(a => a.score)) : null

    return NextResponse.json({
      success: true,
      assessments,
      summary: {
        totalAttempts: assessments.length,
        latestScore: assessments[0]?.score || null,
        latestSkillLevel: assessments[0]?.skillLevel || null,
        bestScore,
        trend, // positive = improvement, negative = decline
        lastTaken: assessments[0]?.createdAt || null
      }
    })

  } catch (error) {
    console.error('Assessment history error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assessment history' },
      { status: 500 }
    )
  }
} 