'use client'

import { useUser } from '@/lib/context/UserContext'
import { LockClosedIcon, SparklesIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface PaywallProps {
  children: React.ReactNode
  title?: string
  description?: string
  feature?: string
}

export default function Paywall({ 
  children, 
  title = "Premium Feature", 
  description = "This feature requires payment to access.",
  feature 
}: PaywallProps) {
  const { user, loading } = useUser()

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    )
  }

  // If user is not logged in, show sign up prompt
  if (!user) {
    return (
      <div className="glass rounded-xl p-8 text-center border border-gray-700/50">
        <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <LockClosedIcon className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-200 mb-2">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <CurrencyDollarIcon className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-2xl font-bold text-green-400">$4.99</span>
          </div>
          <div className="text-sm text-gray-300 mb-3">Get access to:</div>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✓ 5 AI resume reviews</li>
            <li>✓ All premium resume templates</li>
            <li>✓ ATS optimization analysis</li>
            <li>✓ Detailed scoring & recommendations</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="btn-primary px-6 py-3 font-semibold shadow-lg hover:shadow-green-400/25"
          >
            Sign Up & Pay $4.99
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 text-gray-300 hover:text-green-400 transition-colors font-medium"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    )
  }

  // If user has remaining reviews or premium access, show the content
  if ((user.remainingReviews && user.remainingReviews > 0) || user.subscriptionStatus === 'PREMIUM') {
    return (
      <div>
        {/* Show remaining reviews counter */}
        {user.remainingReviews !== undefined && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-400/20 border border-green-400/30 rounded-full">
              <SparklesIcon className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-400">
                {user.remainingReviews} reviews remaining
              </span>
            </div>
          </div>
        )}
        {children}
      </div>
    )
  }

  // If user is logged in but has no remaining reviews
  return (
    <div className="glass rounded-xl p-8 text-center border border-gray-700/50">
      <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CurrencyDollarIcon className="h-8 w-8 text-yellow-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-200 mb-2">No Reviews Remaining</h3>
      <p className="text-gray-400 mb-4">You've used all your resume reviews. Get 5 more for just $4.99!</p>
      {feature && (
        <p className="text-sm text-green-400 mb-6">✨ {feature}</p>
      )}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center mb-2">
          <CurrencyDollarIcon className="h-5 w-5 text-green-400 mr-2" />
          <span className="text-2xl font-bold text-green-400">$4.99</span>
        </div>
        <div className="text-sm text-gray-300 mb-3">Get 5 more reviews + templates:</div>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>✓ 5 additional AI resume reviews</li>
          <li>✓ Continued access to all templates</li>
          <li>✓ ATS optimization analysis</li>
          <li>✓ Detailed scoring & recommendations</li>
        </ul>
      </div>
      <button
        className="btn-primary px-6 py-3 font-semibold shadow-lg hover:shadow-green-400/25 inline-flex items-center"
        onClick={() => {
          // This would trigger the payment flow
          window.location.href = '/checkout'
        }}
      >
        <SparklesIcon className="h-5 w-5 mr-2" />
        Get 5 More Reviews
      </button>
      <p className="text-xs text-gray-500 mt-4">
        One-time payment • No subscription • Pay as you go
      </p>
    </div>
  )
}

// Convenience component for protecting entire pages
export function PagePaywall({ children, ...props }: PaywallProps) {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Paywall {...props}>
          {children}
        </Paywall>
      </div>
    </div>
  )
} 