'use client'

import { useUser } from '@/lib/context/UserContext'
import { LockClosedIcon, SparklesIcon } from '@heroicons/react/24/outline'
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
  description = "This feature is available for premium members only.",
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
        <p className="text-sm text-gray-500 mb-6">Sign up to unlock premium features and accelerate your analytics career.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="btn-primary px-6 py-3 font-semibold shadow-lg hover:shadow-green-400/25"
          >
            Get Premium Access
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 text-gray-300 hover:text-green-400 transition-colors font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  // If user has premium access, show the content
  if (user.subscriptionStatus === 'PREMIUM') {
    return <>{children}</>
  }

  // If user is logged in but doesn't have premium access
  return (
    <div className="glass rounded-xl p-8 text-center border border-gray-700/50">
      <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <SparklesIcon className="h-8 w-8 text-green-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-200 mb-2">Upgrade to Premium</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      {feature && (
        <p className="text-sm text-green-400 mb-6">✨ {feature}</p>
      )}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-300 mb-2">Premium includes:</div>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>✓ All premium tools and calculators</li>
          <li>✓ In-depth career guides</li>
          <li>✓ 1-on-1 coaching sessions</li>
          <li>✓ Priority support</li>
        </ul>
      </div>
      <Link
        href="/signup"
        className="btn-primary px-6 py-3 font-semibold shadow-lg hover:shadow-green-400/25 inline-flex items-center"
      >
        <SparklesIcon className="h-5 w-5 mr-2" />
        Get Premium Access
      </Link>
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