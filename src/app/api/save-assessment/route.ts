import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      score,
      timeElapsed,
      skillLevel,
      categoryBreakdown,
      answers,
      aiFeedback
    } = await request.json()

    // Validate required fields
    if (score === undefined || timeElapsed === undefined || !skillLevel) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Save the assessment result
    const result = await prisma.sQLAssessmentResult.create({
      data: {
        userId: userId || null, // Allow anonymous users
        score: parseInt(score),
        timeElapsed: parseInt(timeElapsed),
        skillLevel,
        categoryBreakdown,
        answers,
        aiFeedback,
        questionsVersion: 'v1'
      }
    })

    return NextResponse.json({
      success: true,
      resultId: result.id
    })

  } catch (error) {
    console.error('Save assessment error:', error)
    return NextResponse.json(
      { error: 'Failed to save assessment results' },
      { status: 500 }
    )
  }
} 