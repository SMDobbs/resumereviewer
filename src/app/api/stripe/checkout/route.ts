import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import { hashPassword } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, password } = await request.json()

    if (!email || !firstName || !lastName || !password) {
      return NextResponse.json(
        { error: 'Email, first name, last name, and password are required' },
        { status: 400 }
      )
    }

    // Basic validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Hash the password before storing it in Stripe metadata
    const passwordHash = await hashPassword(password)

    const session = await createCheckoutSession(email, firstName, lastName, passwordHash)

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Checkout session creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
} 