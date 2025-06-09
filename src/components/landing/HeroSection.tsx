'use client'

import Link from 'next/link'
import { useUser } from '@/lib/context/UserContext'
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function HeroSection() {
  const { user } = useUser()
  
  // Determine where to send users based on auth state
  const getStartLink = () => {
    return user ? '/tools' : '/signup'
  }
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-green-950 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-from)_0%,_transparent_50%)] from-green-400/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Land Your First{' '}
            <span className="gradient-text">Analytics Role</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Whether starting your career or transitioning from another field, get the confidence, 
            tools, and guidance you need to break into analytics and land your first role.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href={getStartLink()} className="btn-primary inline-flex items-center">
              {user ? 'Start Your Journey' : 'Get Started Today'}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/articles" className="px-6 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors">
              Read Success Stories
            </Link>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center">
              <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-gray-300">Expert Resume Reviews</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-gray-300">AI Mock Interviews</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-gray-300">1-on-1 Coaching</span>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="text-center">
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From resume optimization to SQL practice and interview preparation - everything you need to land your first analytics role with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 