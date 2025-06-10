import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { hashPassword } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName, password, name } = body

    // Determine if this is a signup or existing user adding reviews
    const isSignup = !!(firstName && lastName && password)
    
    let customerEmail, customerName, sessionMetadata = {}

    if (isSignup) {
      // Signup flow - hash password and prepare user creation data
      customerEmail = email
      customerName = `${firstName} ${lastName}`
      const hashedPassword = await hashPassword(password)
      
      sessionMetadata = {
        flow_type: 'signup',
        customer_email: email,
        customer_name: customerName,
        first_name: firstName,
        last_name: lastName,
        password_hash: hashedPassword,
        product_type: 'resume_reviews_5_pack',
        reviews_count: '5',
      }
    } else if (email && name) {
      // Existing user adding more reviews
      customerEmail = email
      customerName = name
      
      sessionMetadata = {
        flow_type: 'add_reviews',
        customer_email: email,
        customer_name: name,
        product_type: 'resume_reviews_5_pack',
        reviews_count: '5',
      }
    } else {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create appropriate product description
    const productDescription = isSignup 
      ? '5 AI-powered resume reviews + premium templates access'
      : '5 additional AI-powered resume reviews'

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Resume Review Pack',
              description: productDescription,
              images: [], // You can add product images here if you have them
            },
            unit_amount: 499, // $4.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/${isSignup ? 'signup' : 'checkout'}?canceled=true`,
      customer_email: customerEmail,
      metadata: sessionMetadata,
      automatic_tax: {
        enabled: true,
      },
    })

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url 
    })

  } catch (error) {
    console.error('Stripe checkout session creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    )
  }
} 