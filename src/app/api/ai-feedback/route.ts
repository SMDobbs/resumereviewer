import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' 
      }, { status: 500 })
    }

    const systemPrompt = `You are an expert SQL mentor for data analysts. Provide concise, actionable feedback.

CRITICAL: Keep response under 300 words. Use this EXACT format:

**Assessment Summary**
[2 sentences max - current skill level and key strength/weakness]

**Priority Focus Areas**
• [Area 1]: [Why it matters for analysts - 1 sentence]
• [Area 2]: [Why it matters for analysts - 1 sentence]  
• [Area 3]: [Why it matters for analysts - 1 sentence]

**Next Steps**
• [Immediate action 1]
• [Immediate action 2]
• [Immediate action 3]

**Skill Level: [Beginner/Intermediate/Advanced]**
[1 sentence explaining what this means for job readiness]

Keep it concise, actionable, and encouraging. Focus on analytics roles, not database administration.`

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 400
      })

      const feedback = completion.choices[0].message.content

      if (!feedback) {
        return NextResponse.json({ error: 'No feedback generated' }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        feedback: feedback.trim()
      })

    } catch (openaiError: unknown) {
      console.error('OpenAI API error:', openaiError)

      const error = openaiError as { status?: number }

      if (error.status === 429) {
        return NextResponse.json({ 
          error: 'OpenAI API quota exceeded. Please check your billing or try again later.' 
        }, { status: 429 })
      }

      if (error.status === 401) {
        return NextResponse.json({ 
          error: 'Invalid OpenAI API key. Please check your API key configuration.' 
        }, { status: 401 })
      }

      return NextResponse.json({ 
        error: 'AI feedback generation failed. Please try again later.' 
      }, { status: 500 })
    }

  } catch (error) {
    console.error('AI feedback error:', error)
    return NextResponse.json(
      { error: 'Failed to generate feedback. Please try again.' },
      { status: 500 }
    )
  }
} 