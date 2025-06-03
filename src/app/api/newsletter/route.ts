import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source } = subscribeSchema.parse(body)

    // Check if email already exists
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email }
    })

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return NextResponse.json(
          { error: 'Email is already subscribed to our newsletter' },
          { status: 409 }
        )
      } else {
        // Reactivate existing subscription
        await prisma.newsletter.update({
          where: { email },
          data: { isActive: true, source }
        })
        return NextResponse.json({ 
          message: 'Successfully resubscribed to newsletter!' 
        })
      }
    }

    // Create new subscription
    await prisma.newsletter.create({
      data: {
        email,
        source: source || 'articles_page'
      }
    })

    return NextResponse.json({ 
      message: 'Successfully subscribed to newsletter!' 
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const { email: validEmail } = subscribeSchema.parse({ email })

    // Deactivate subscription instead of deleting
    const updated = await prisma.newsletter.update({
      where: { email: validEmail },
      data: { isActive: false }
    })

    if (!updated) {
      return NextResponse.json(
        { error: 'Email not found in newsletter subscriptions' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      message: 'Successfully unsubscribed from newsletter' 
    })

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    )
  }
} 