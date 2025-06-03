import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
})

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID

export const createCheckoutSession = async (
  email: string,
  firstName: string,
  lastName: string,
  passwordHash: string
) => {
  if (!STRIPE_PRICE_ID) {
    throw new Error('STRIPE_PRICE_ID is not defined in environment variables')
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/signup?cancelled=true`,
    customer_email: email,
    metadata: {
      firstName,
      lastName,
      email,
      passwordHash,
    },
  })

  return session
} 