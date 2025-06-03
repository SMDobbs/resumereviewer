# Stripe Integration Setup Guide (One-Time Payment)

## Overview
This application requires users to complete a **one-time payment** before creating an account. Users choose their password during signup, and their account is created with lifetime premium access after successful payment.

## Environment Variables Required

Add these environment variables to your `.env` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
STRIPE_PRICE_ID=price_... # Price ID for your one-time payment product

# Application URLs
NEXT_PUBLIC_URL=http://localhost:3000 # Your app URL (production: https://yourdomain.com)

# JWT Secret (if not already set)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## Stripe Dashboard Setup

### 1. Create a One-Time Payment Product
1. Go to Stripe Dashboard > Products
2. Create a new product (e.g., "Analytics Mentor Premium - Lifetime Access")
3. **Set it as a ONE-TIME payment** (not recurring!)
4. Set price: $97 (or your desired amount)
5. Copy the Price ID to `STRIPE_PRICE_ID`

### 2. No Webhook Required! 
This simplified approach doesn't need webhooks - accounts are created when users return from successful payment.

## How It Works

### User Flow
1. User visits `/signup`
2. Enters name, email, **and password**
3. Redirected to Stripe Checkout for **one-time payment**
4. After successful payment:
   - User redirected to `/signup/success?session_id=...`
   - System verifies payment with Stripe
   - User account created with their **chosen password**
   - User gets **lifetime premium access**
   - User automatically logged in
   - Redirected to dashboard

### Account Creation
- Accounts are created when user returns from successful payment
- Users choose their own password during signup (no temporary passwords!)
- Users get **PREMIUM** status with **lifetime access**
- Payment intent stored for record-keeping

### Protected Content
- Tools (except skill assessment)
- Coaching sessions
- Premium guides
- Dashboard features

### Free Content
- Articles
- Free resources
- Skill assessment tool

## Testing

### Test Mode
Use Stripe test keys and test card numbers:
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any valid ZIP

### Local Testing
1. Set up your `.env` with test keys
2. Run `npm run dev`
3. Go to `/signup` and test the flow
4. Use test card numbers for payment
5. Complete flow should work end-to-end

## Advantages of One-Time Payment Model

✅ **Simple Business Model**
- No subscription management complexity
- No recurring billing issues
- No cancellation headaches
- Higher customer lifetime value

✅ **Better User Experience**
- Pay once, own forever
- No subscription anxiety
- Clear value proposition
- No surprise charges

✅ **Technical Simplicity**
- No webhook complexity needed
- No subscription lifecycle management
- Easier to implement and maintain

## Security Features

1. **Payment verification**: Session is verified with Stripe before account creation
2. **No bypass possible**: Users can't create accounts without valid payment
3. **Password security**: Users choose their own secure passwords
4. **Stripe PCI compliance**: No sensitive card data touches your server
5. **Session storage**: Password temporarily stored in browser only during payment flow

## Troubleshooting

### Common Issues
1. **"No session ID found"**: User didn't complete payment or URL was modified
2. **"Password not found"**: User's browser cleared session storage or they opened in different tab
3. **"Payment not completed"**: Payment failed or was cancelled
4. **Environment variables**: Make sure `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` are set
5. **Wrong product type**: Make sure you created a ONE-TIME payment, not recurring

### Testing Tips
- Always use test mode keys for development
- Check browser console for any errors
- Verify the success URL includes `?session_id=` parameter
- **Important**: Make sure your Stripe product is set to **one-time payment**, not recurring
- Test in same browser tab to preserve session storage

## Deployment Notes

### Environment Variables for Production
```bash
STRIPE_SECRET_KEY=sk_live_... # Live secret key
STRIPE_PRICE_ID=price_... # Live price ID for one-time payment
NEXT_PUBLIC_URL=https://yourdomain.com # Your production URL
JWT_SECRET=your-super-secure-production-jwt-key
```

### Security Considerations
- Use strong JWT secrets in production
- Enable HTTPS for production (required by Stripe)
- Consider adding rate limiting for signup attempts
- Monitor Stripe Dashboard for failed payments

## Next Steps

1. **Set up Stripe account** and get test keys
2. **Create ONE-TIME payment product** and copy the price ID
3. **Add environment variables** to your `.env` file
4. **Test the complete flow** with test card numbers
5. **Deploy and switch to live keys** when ready to go live!

This approach gives you a production-ready one-time payment system with lifetime access. Perfect for selling premium tools and content! 🚀 