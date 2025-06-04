'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'

function SignupSuccessContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string>('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { refreshUser } = useUser()

  const verifySession = useCallback(async (sessionId: string) => {
    try {
      const response = await fetch('/api/stripe/verify-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify payment')
      }

      // Refresh user context
      await refreshUser()
      setStatus('success')

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)

    } catch (error) {
      console.error('Session verification failed:', error)
      setError(error instanceof Error ? error.message : 'Something went wrong')
      setStatus('error')
    }
  }, [refreshUser, router])

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (!sessionId) {
      setError('No session ID found. Please try signing up again.')
      setStatus('error')
      return
    }

    verifySession(sessionId)
  }, [searchParams, verifySession])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2">
              Processing Payment...
            </h2>
            <p className="text-gray-400">
              Please wait while we set up your account
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon className="h-10 w-10 text-red-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-400 mb-6">
              {error}
            </p>
            <div className="space-y-3">
              <Link
                href="/signup"
                className="btn-primary w-full text-center inline-block py-3"
              >
                Try Again
              </Link>
              <Link
                href="/login"
                className="block text-gray-400 hover:text-green-400 transition-colors"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="h-10 w-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">
            Welcome to Dobbs Analytics Coaching!
          </h2>
          <p className="text-gray-400">
            Your premium account is ready
          </p>
        </div>

        <div className="glass rounded-xl p-8">
          <div className="space-y-6">
            <div className="bg-green-900/20 border border-green-400/20 rounded-lg p-4">
              <h4 className="font-medium text-green-300 mb-2">✅ Account Created Successfully!</h4>
              <ul className="text-sm text-green-200 space-y-1">
                <li>• Premium access activated</li>
                <li>• All tools and features unlocked</li>
                <li>• You're now logged in</li>
                <li>• Your account is ready to use</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-400/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-300 mb-2">🚀 What's Next?</h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Explore premium tools and calculators</li>
                <li>• Book your first coaching session</li>
                <li>• Access in-depth career guides</li>
                <li>• Take advantage of priority support</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">
                Redirecting to your dashboard in a few seconds...
              </p>
              <Link
                href="/dashboard"
                className="btn-primary w-full text-center inline-block py-3"
              >
                Go to Dashboard Now
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Questions? We're here to help!
          </p>
          <Link
            href="/support"
            className="text-green-400 hover:text-green-300 font-medium text-sm"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SignupSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2">
              Loading...
            </h2>
            <p className="text-gray-400">
              Please wait while we load your page
            </p>
          </div>
        </div>
      </div>
    }>
      <SignupSuccessContent />
    </Suspense>
  )
} 