'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  SparklesIcon,
  ArrowRightIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'

interface PaymentResult {
  success: boolean
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    remainingReviews: number
    subscriptionStatus: string
  }
  isNewUser: boolean
  reviewsAdded: number
}

function PaymentSuccessContent() {
  const [loading, setLoading] = useState(true)
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null)
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { refreshUser } = useUser()

  useEffect(() => {
    if (sessionId) {
      verifyPayment(sessionId)
    } else {
      setVerificationStatus('error')
      setLoading(false)
    }
  }, [sessionId])

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await fetch('/api/stripe/verify-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setVerificationStatus('success')
        setPaymentResult(data)
        // Refresh the user context with updated data
        await refreshUser()
      } else {
        setVerificationStatus('error')
      }
    } catch (error) {
      console.error('Payment verification failed:', error)
      setVerificationStatus('error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-2xl p-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-6"></div>
            <h1 className="text-2xl font-bold text-white mb-4">Verifying Payment...</h1>
            <p className="text-gray-400">Please wait while we confirm your payment and set up your account.</p>
          </div>
        </div>
      </div>
    )
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-2xl p-12 border border-red-400/30">
            <div className="w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-red-400 text-2xl">⚠️</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Payment Verification Failed</h1>
            <p className="text-gray-400 mb-8">
              We couldn't verify your payment. Please contact support if you were charged.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/checkout" className="btn-primary px-6 py-3 font-semibold">
                Try Again
              </Link>
              <Link href="/" className="btn-secondary px-6 py-3 font-semibold">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isNewUser = paymentResult?.isNewUser ?? false
  const user = paymentResult?.user
  const reviewsAdded = paymentResult?.reviewsAdded ?? 5

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-2xl p-12 border border-green-400/30">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircleIcon className="h-12 w-12 text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {isNewUser ? 'Welcome to Resume Reviewer!' : 'Reviews Added Successfully!'}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {isNewUser 
              ? `Your payment of $4.99 has been processed successfully. Welcome! You now have ${user?.remainingReviews} resume reviews and access to all premium templates.`
              : `Your payment of $4.99 has been processed successfully. We've added ${reviewsAdded} more reviews to your account. You now have ${user?.remainingReviews} reviews remaining.`
            }
          </p>

          {/* What's Included */}
          <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              {isNewUser ? 'What you get:' : 'Added to your account:'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center">
                <SparklesIcon className="h-5 w-5 text-green-400 mr-3" />
                <span className="text-gray-300">{reviewsAdded} AI-powered resume reviews</span>
              </div>
              {isNewUser && (
                <>
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-300">Access to all premium templates</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-300">ATS optimization analysis</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-300">Detailed scoring & recommendations</span>
                  </div>
                </>
              )}
              {!isNewUser && (
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Reviews never expire</span>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Ready to get started?</h3>
            <p className="text-gray-400 mb-6">
              {isNewUser 
                ? 'Your reviews never expire. Use them whenever you need professional feedback on your resume.'
                : `You now have ${user?.remainingReviews} reviews remaining. Use them whenever you need more feedback.`
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/resume-reviewer" 
              className="btn-primary px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-green-400/25 flex items-center justify-center"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              {isNewUser ? 'Start Your First Review' : 'Review Another Resume'}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            {isNewUser && (
              <Link 
                href="/templates" 
                className="btn-secondary px-8 py-4 text-lg font-semibold flex items-center justify-center"
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Browse Templates
              </Link>
            )}
            {!isNewUser && (
              <Link 
                href="/dashboard" 
                className="btn-secondary px-8 py-4 text-lg font-semibold flex items-center justify-center"
              >
                View Dashboard
              </Link>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-500">
              Need help? Contact us at support@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentSuccessLoadingFallback() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-2xl p-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
          <p className="text-gray-400">Please wait while we load your payment confirmation.</p>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessLoadingFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  )
} 