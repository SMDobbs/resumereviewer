import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma, connectWithRetry } from '@/lib/prisma'
import { getCurrentUser, createSession, setSessionCookie } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      console.error('Verify session: Session ID is required')
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      console.error('Verify session: Invalid session')
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 400 }
      )
    }

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      console.error('Verify session: Payment not completed, status:', session.payment_status)
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    const customerEmail = session.customer_details?.email || session.metadata?.customer_email
    const flowType = session.metadata?.flow_type

    console.log('Verify session: customerEmail:', customerEmail, 'flowType:', flowType)
    console.log('Verify session: session.metadata:', session.metadata)

    if (!customerEmail) {
      console.error('Verify session: Customer email not found')
      return NextResponse.json(
        { error: 'Customer email not found' },
        { status: 400 }
      )
    }

    let user;
    let isNewUser = false;

    if (flowType === 'signup') {
      // New user signup flow
      const { first_name, last_name, password_hash } = session.metadata!

      if (!password_hash) {
        return NextResponse.json(
          { error: 'User data missing from session' },
          { status: 400 }
        )
      }

      // Check if user already exists
      const existingUser = await connectWithRetry(() => 
        prisma.user.findUnique({
          where: { email: customerEmail.toLowerCase() },
        })
      )

      if (existingUser) {
        // User already exists, just add reviews
        user = await connectWithRetry(() =>
          prisma.user.update({
            where: { id: existingUser.id },
            data: {
              remainingReviews: {
                increment: 5
              },
              subscriptionStatus: 'PREMIUM',
              stripePaymentId: session.payment_intent as string,
              purchaseDate: new Date(),
            },
          })
        )
      } else {
        // Create new user with 5 reviews
        user = await connectWithRetry(() =>
          prisma.user.create({
            data: {
              email: customerEmail.toLowerCase(),
              firstName: first_name,
              lastName: last_name,
              password: password_hash,
              remainingReviews: 5,
              stripeCustomerId: session.customer as string,
              stripePaymentId: session.payment_intent as string,
              subscriptionStatus: 'PREMIUM',
              purchaseDate: new Date(),
            },
          })
        )
        isNewUser = true
      }

      // Create session for the user (new or existing)
      const sessionPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }

      const token = await createSession(sessionPayload)
      const response = NextResponse.json({ 
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          remainingReviews: user.remainingReviews,
          subscriptionStatus: user.subscriptionStatus,
        },
        isNewUser,
        reviewsAdded: 5
      })

      setSessionCookie(response, token)
      return response

    } else {
      // Existing user adding more reviews
      console.log('Verify session: Add reviews flow')
      const currentUser = await getCurrentUser(request)
      console.log('Verify session: currentUser:', currentUser ? 'found' : 'not found')
      
      if (currentUser && currentUser.email.toLowerCase() === customerEmail.toLowerCase()) {
        // Logged-in user adding more reviews
        console.log('Verify session: Updating logged-in user:', currentUser.id)
        user = await connectWithRetry(() =>
          prisma.user.update({
            where: { id: currentUser.id },
            data: {
              remainingReviews: {
                increment: 5
              },
              subscriptionStatus: 'PREMIUM',
              stripePaymentId: session.payment_intent as string,
              purchaseDate: new Date(),
            },
          })
        )
      } else {
        // Check if user exists in database (not logged in)
        console.log('Verify session: Looking for existing user by email:', customerEmail)
        const existingUser = await connectWithRetry(() => 
          prisma.user.findUnique({
            where: { email: customerEmail.toLowerCase() },
          })
        )

        if (existingUser) {
          // Existing user (not logged in) adding reviews
          console.log('Verify session: Found existing user, updating:', existingUser.id)
          user = await connectWithRetry(() =>
            prisma.user.update({
              where: { id: existingUser.id },
              data: {
                remainingReviews: {
                  increment: 5
                },
                subscriptionStatus: 'PREMIUM',
                stripePaymentId: session.payment_intent as string,
                purchaseDate: new Date(),
              },
            })
          )
        } else {
          // User doesn't exist - they need to sign up first
          console.error('Verify session: User not found for email:', customerEmail)
          return NextResponse.json(
            { error: 'Please create an account first before purchasing' },
            { status: 400 }
          )
        }
      }

      return NextResponse.json({ 
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          remainingReviews: user.remainingReviews,
          subscriptionStatus: user.subscriptionStatus,
        },
        isNewUser: false,
        reviewsAdded: 5
      })
    }

  } catch (error) {
    console.error('Session verification failed:', error)
    return NextResponse.json(
      { error: 'Failed to verify session' },
      { status: 500 }
    )
  }
} 