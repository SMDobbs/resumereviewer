'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'

function CheckoutContent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const cancelled = searchParams.get('cancelled')
  const { user } = useUser()

  const isExistingUser = !!user

  const handlePurchase = async () => {
    setLoading(true)
    setError('')

    try {
      // For existing users, just use their info
      const purchaseData = isExistingUser ? {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`
      } : null

      if (!isExistingUser) {
        // Redirect new users to signup
        window.location.href = '/signup'
        return
      }

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-400/20 border border-green-400/30 rounded-full mb-6">
            <CurrencyDollarIcon className="h-4 w-4 text-green-400 mr-2" />
            <span className="text-sm font-medium text-green-400">
              {isExistingUser ? 'Add More Reviews' : 'Get Started'}
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            {isExistingUser ? 'Need More Reviews?' : 'Perfect Your Resume'}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {isExistingUser 
              ? 'Get 5 more AI-powered resume reviews for just $4.99. Your reviews never expire!'
              : 'Get professional AI-powered feedback on your resume and access to premium templates.'
            }
          </p>
        </div>

        {/* Cancelled Notice */}
        {cancelled && (
          <div className="bg-yellow-900/20 border border-yellow-400/30 text-yellow-300 px-4 py-3 rounded-xl text-center text-sm mb-8 max-w-2xl mx-auto">
            Payment cancelled. No worries, you can try again anytime.
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Pricing Card */}
          <div className="glass rounded-3xl p-8 border-2 border-green-400/30 bg-gradient-to-br from-green-400/5 to-emerald-400/5 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="px-6 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 rounded-full font-semibold text-sm">
                BEST VALUE
              </div>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-white mb-4">
                <span className="text-green-400">$4.99</span>
              </div>
              <div className="text-xl text-gray-400 mb-6">
                {isExistingUser ? '5 More Reviews' : 'Complete Resume Package'}
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircleIcon className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                <span className="text-gray-300 text-lg">5 AI-powered resume reviews</span>
              </div>
              {!isExistingUser && (
                <>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Access to all premium templates</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">ATS optimization analysis</span>
                  </div>
                </>
              )}
              <div className="flex items-center">
                <CheckCircleIcon className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                <span className="text-gray-300 text-lg">Detailed scoring & feedback</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                <span className="text-gray-300 text-lg">Reviews never expire</span>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-900/20 border border-red-400/30 text-red-300 px-4 py-3 rounded-xl text-sm mb-6">
                {error}
              </div>
            )}

            {isExistingUser ? (
              <button
                onClick={handlePurchase}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-green-400/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Add 5 More Reviews - $4.99
                    <ArrowRightIcon className="ml-3 h-6 w-6" />
                  </div>
                )}
              </button>
            ) : (
              <Link 
                href="/signup"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-green-400/25 transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                Get Started - $4.99
                <ArrowRightIcon className="ml-3 h-6 w-6" />
              </Link>
            )}
            
            <p className="text-gray-500 mt-6 text-center text-lg">
              One-time payment • {isExistingUser ? 'Add to your existing account' : 'Includes everything you need'}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                {isExistingUser ? 'Keep Improving' : 'Why Choose Our AI?'}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {isExistingUser 
                  ? "Each review provides new insights as you refine your resume. Our AI adapts to different roles and gives you specific, actionable feedback every time."
                  : "Our AI is built specifically for modern job markets with advanced technology to help you stand out from the competition."
                }
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <SparklesIcon className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Analysis</h3>
                  <p className="text-gray-400">Advanced AI analyzes your resume against industry standards and job requirements</p>
                </div>
              </div>

              {!isExistingUser && (
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <DocumentTextIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Professional Templates</h3>
                    <p className="text-gray-400">ATS-friendly templates designed by career experts and used by successful candidates</p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <CheckCircleIcon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">ATS Optimization</h3>
                  <p className="text-gray-400">Ensure your resume passes applicant tracking systems with smart keyword optimization</p>
                </div>
              </div>
            </div>

            {isExistingUser && (
              <div className="glass rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Current Account Status</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Reviews Remaining:</span>
                  <span className="text-2xl font-bold text-green-400">{user.remainingReviews}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-6">
            {isExistingUser 
              ? 'Need help? Contact us at support@analyticsresumereview.com'
              : 'Want to see how it works first?'
            }
          </p>
          {!isExistingUser && (
            <Link 
              href="/resume-reviewer" 
              className="text-green-400 hover:text-green-300 font-medium"
            >
              Preview the tool
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function CheckoutLoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading checkout...</p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  )
} 