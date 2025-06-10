'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SparklesIcon, EyeIcon, EyeSlashIcon, DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const cancelled = searchParams.get('cancelled')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Basic validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-400/25">
            <DocumentTextIcon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Perfect Your Resume
          </h2>
          <p className="text-gray-400 text-lg">
            Get AI-powered feedback and professional templates
          </p>
        </div>

        {/* Cancelled Notice */}
        {cancelled && (
          <div className="bg-yellow-900/20 border border-yellow-400/30 text-yellow-300 px-4 py-3 rounded-xl text-center text-sm">
            Payment cancelled. No worries, you can try again anytime.
          </div>
        )}

        {/* Main Form Card */}
        <div className="glass rounded-2xl p-8 shadow-xl border border-gray-700/50">
          {/* Pricing Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-green-400/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Resume Tools
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              $4.99<span className="text-xl text-gray-400 font-normal"> one-time</span>
            </div>
            <p className="text-gray-400 text-sm">Pay once • Use 5 times • Never expires</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/20 border border-red-400/30 text-red-300 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                  placeholder="John"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-green-400/25 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Get Resume Tools - $4.99'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-green-400 hover:text-green-300">terms of service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-green-400 hover:text-green-300">privacy policy</Link>.
            </p>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-700/50">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-green-400 hover:text-green-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* What You Get */}
        <div className="glass rounded-xl p-6 border border-gray-700/50">
          <p className="text-sm font-medium text-gray-300 mb-4 text-center">What you get for $4.99:</p>
          <div className="space-y-3">
            {[
              "5 AI-powered resume reviews",
              "Access to all premium templates",
              "ATS optimization analysis",
              "Detailed scoring & feedback",
              "Keyword recommendations"
            ].map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-400">
                <CheckCircleIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Preview Link */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Want to see how it works first?{' '}
            <Link href="/resume-reviewer" className="text-green-400 hover:text-green-300 font-medium">
              Preview the tool
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 