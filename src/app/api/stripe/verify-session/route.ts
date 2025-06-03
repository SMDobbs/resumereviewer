import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma, connectWithRetry } from '@/lib/prisma'
import { createSession, setSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 400 }
      )
    }

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    const { email, firstName, lastName, passwordHash } = session.metadata!

    if (!passwordHash) {
      return NextResponse.json(
        { error: 'Password not found in session' },
        { status: 400 }
      )
    }

    // Check if user already exists with retry logic
    const existingUser = await connectWithRetry(() => 
      prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      })
    )

    if (existingUser) {
      // User already exists, just log them in
      const sessionPayload = {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }

      const token = await createSession(sessionPayload)
      const response = NextResponse.json({ 
        user: {
          id: existingUser.id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          role: existingUser.role,
          subscriptionStatus: existingUser.subscriptionStatus,
          currentRole: existingUser.currentRole,
          experience: existingUser.experience,
          industry: existingUser.industry,
          goals: existingUser.goals,
          createdAt: existingUser.createdAt,
        }
      })

      setSessionCookie(response, token)
      return response
    }

    // Create new user with premium status using the hashed password from metadata with retry logic
    const user = await connectWithRetry(() =>
      prisma.user.create({
        data: {
          email: email.toLowerCase(),
          firstName,
          lastName,
          password: passwordHash, // Use the hashed password from Stripe metadata
          stripeCustomerId: session.customer as string,
          stripePaymentId: session.payment_intent as string, // Store payment intent instead of subscription
          subscriptionStatus: 'PREMIUM',
          purchaseDate: new Date(), // Record when they bought access
        },
      })
    )

    // Create session for the new user
    const sessionPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }

    const token = await createSession(sessionPayload)
    const response = NextResponse.json({ 
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        subscriptionStatus: user.subscriptionStatus,
        currentRole: user.currentRole,
        experience: user.experience,
        industry: user.industry,
        goals: user.goals,
        createdAt: user.createdAt,
      }
    })

    setSessionCookie(response, token)
    return response

  } catch (error) {
    console.error('Session verification failed:', error)
    return NextResponse.json(
      { error: 'Failed to verify session' },
      { status: 500 }
    )
  }
} 