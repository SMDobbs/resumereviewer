'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { refreshUser } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
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

      // Refresh user context to reflect the new session
      await refreshUser()

      // Redirect to dashboard after successful login
      router.push('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    setError('')

    try {
      // Use demo credentials
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'demo@analyticsmentor.com',
          password: 'demo123'
        }),
      })

      const _data = await response.json()

      if (!response.ok) {
        // If demo user doesn't exist, create one
        const registerResponse = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'demo@analyticsmentor.com',
            password: 'demo123',
            firstName: 'Demo',
            lastName: 'User'
          }),
        })

        if (registerResponse.ok) {
          // Try login again after registration
          const loginResponse = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: 'demo@analyticsmentor.com',
              password: 'demo123'
            }),
          })

          const _loginData = await loginResponse.json()
          if (loginResponse.ok) {
            await refreshUser()
            router.push('/dashboard')
            return
          }
        }
        
        throw new Error('Demo login failed')
      }

      // Refresh user context to reflect the new session
      await refreshUser()
      
      // Redirect to dashboard after successful login
      router.push('/dashboard')
    } catch {
      setError('Demo login temporarily unavailable. Please try the skill assessment instead.')
    } finally {
      setLoading(false)
    }
  }

  const handleClearCookies = async () => {
    try {
      // Clear session cookies by calling logout
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      
      // Clear all cookies manually as well
      document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      // Reload the page to reset state
      window.location.reload()
    } catch (error) {
      console.error('Error clearing cookies:', error)
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
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in to continue your analytics journey
          </p>
        </div>
        
        <div className="glass rounded-xl p-8">
          {/* Demo Option */}
          <div className="mb-6 p-4 bg-green-900/20 border border-green-400/20 rounded-lg">
            <p className="text-green-400 text-sm mb-3 text-center">
              👋 Want to try the app first?
            </p>
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-400/20 text-green-400 rounded-lg hover:bg-green-400/30 transition-colors disabled:opacity-50"
            >
              Try Demo Account
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-950 text-gray-400">Or sign in with your account</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/20 border border-red-400/20 text-red-400 px-4 py-3 rounded-lg relative">
                {error}
                {error.includes('Access Denied') && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={handleClearCookies}
                      className="text-xs text-red-300 underline hover:text-red-200"
                    >
                      Having login issues? Clear cookies and try again
                    </button>
                  </div>
                )}
              </div>
            )}

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
                className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
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
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-400 focus:ring-green-400 border-gray-700 rounded bg-gray-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-green-400 hover:text-green-300">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-green-400 hover:text-green-300">
                  Create one here
                </Link>
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Or try our{' '}
                <Link href="/tools/skill-assessment" className="font-medium text-green-400 hover:text-green-300">
                  free skill assessment
                </Link>
              </p>
            </div>

            {/* Troubleshooting section */}
            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500 mb-2">
                Having trouble accessing the app?
              </p>
              <button
                type="button"
                onClick={handleClearCookies}
                className="text-xs text-gray-400 hover:text-gray-300 underline"
              >
                Clear cookies and reset session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 