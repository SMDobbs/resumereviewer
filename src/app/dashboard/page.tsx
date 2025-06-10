'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  DocumentTextIcon, 
  SparklesIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline'

interface UserData {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  remainingReviews: number
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/dashboard')
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login')
          return
        }
        throw new Error('Failed to fetch user data')
      }
      const data = await response.json()
      setUserData(data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Unable to load dashboard</p>
          <Link
            href="/login"
            className="text-green-400 hover:text-green-300 font-medium"
          >
            Sign in again
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back{userData.firstName ? `, ${userData.firstName}` : ''}!
          </h1>
          <p className="text-gray-400 text-lg">Ready to improve your resume?</p>
        </div>

        {/* Reviews Status */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 border border-gray-700/50 bg-gradient-to-r from-green-500/10 to-green-600/5">
            <SparklesIcon className="h-5 w-5 text-green-400" />
            <span className="text-gray-400">You have</span>
            <span className="text-2xl font-bold text-green-400">{userData.remainingReviews}</span>
            <span className="text-gray-400">
              review{userData.remainingReviews !== 1 ? 's' : ''} remaining
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">What would you like to do?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/resume-reviewer"
              className="group relative overflow-hidden glass rounded-xl p-8 border border-gray-700/50 hover:border-green-400/50 transition-all duration-300 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-green-400/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-400/20 transition-colors">
                  <DocumentTextIcon className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Resume Reviewer</h3>
                <p className="text-gray-400 text-sm mb-6">
                  {userData.remainingReviews > 0 
                    ? 'Get AI-powered feedback and detailed analysis of your resume' 
                    : 'Preview our comprehensive review tool'}
                </p>
                <div className="inline-flex items-center text-green-400 font-medium group-hover:text-green-300">
                  {userData.remainingReviews > 0 ? 'Start Review →' : 'Preview Tool →'}
                </div>
                {userData.remainingReviews > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-900">{userData.remainingReviews}</span>
                  </div>
                )}
              </div>
            </Link>

            <Link
              href="/templates"
              className="group relative overflow-hidden glass rounded-xl p-8 border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-blue-400/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-400/20 transition-colors">
                  <SparklesIcon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Resume Templates</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Browse our collection of professional, ATS-friendly resume templates
                </p>
                <div className="inline-flex items-center text-blue-400 font-medium group-hover:text-blue-300">
                  Browse Templates →
                </div>
              </div>
            </Link>

            <Link
              href="/checkout"
              className="group relative overflow-hidden glass rounded-xl p-8 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-300 text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-purple-400/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-400/20 transition-colors">
                  <ShoppingCartIcon className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Get More Reviews</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Purchase additional review credits to keep improving your resume
                </p>
                <div className="inline-flex items-center text-purple-400 font-medium group-hover:text-purple-300">
                  View Plans →
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        {userData.remainingReviews > 0 && (
          <div className="text-center">
            <div className="glass rounded-xl p-6 border border-gray-700/50 bg-gradient-to-r from-green-500/5 to-blue-500/5">
              <p className="text-gray-300 mb-4">
                Ready to take your resume to the next level?
              </p>
              <Link
                href="/resume-reviewer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-400/25 transition-all duration-200"
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Start Your Review Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 