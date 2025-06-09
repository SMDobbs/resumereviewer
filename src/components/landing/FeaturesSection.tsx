'use client'

import Link from 'next/link'
import { useUser } from '@/lib/context/UserContext'
import { ArrowRightIcon, SparklesIcon, BookOpenIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function FeaturesSection() {
  const { user } = useUser()
  
  // Function to get appropriate link for premium features
  const getPremiumLink = (defaultPath: string) => {
    return user ? defaultPath : '/signup'
  }
  
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Complete <span className="gradient-text">Analytics Career Toolkit</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to go from aspiring analyst to landing your first role. 
            Premium tools, expert guides, and direct coaching to accelerate your journey.
          </p>
        </div>

        {/* Main Offerings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* Premium Tools */}
          <div className="glass rounded-xl p-8">
            <div className="w-14 h-14 bg-purple-400/20 rounded-lg flex items-center justify-center mb-6">
              <SparklesIcon className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Premium Tools</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">AI Resume Reviewer</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">LinkedIn Profile Optimizer</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Interactive Skill Assessment</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">AI Mock Interviewer</span>
              </li>
            </ul>
            <Link href={getPremiumLink('/tools')} className="btn-primary inline-flex items-center w-full justify-center">
              {user ? 'Access Premium Tools' : 'Get Started Now'}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* SQL Practice Platform */}
          <div className="glass rounded-xl p-8 border-2 border-green-400/30">
            <div className="w-14 h-14 bg-green-400/20 rounded-lg flex items-center justify-center mb-6">
              <ChartBarIcon className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">SQL Practice Platform</h3>
            <div className="flex items-center mb-4">
              <span className="text-sm bg-green-400/20 text-green-400 px-3 py-1 rounded-full">
                FREE with Premium ($9.99 value)
              </span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Interactive SQL practice questions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Real database playgrounds</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Portfolio builder tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Progress tracking</span>
              </li>
            </ul>
            <Link href={getPremiumLink('https://sqlpractice.io')} className="btn-primary inline-flex items-center w-full justify-center">
              {user ? 'Access SQL Practice' : 'Get Started Now'}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Premium Guides */}
          <div className="glass rounded-xl p-8">
            <div className="w-14 h-14 bg-blue-400/20 rounded-lg flex items-center justify-center mb-6">
              <BookOpenIcon className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Premium Guides</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Landing Your First Role</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">SQL & Python Mastery</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Best Visualization Tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Building Your Portfolio</span>
              </li>
            </ul>
            <Link href={getPremiumLink('/guides')} className="btn-primary inline-flex items-center w-full justify-center">
              {user ? 'Get Premium Guides' : 'Get Started Now'}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* 1-on-1 Coaching */}
          <div className="glass rounded-xl p-8">
            <div className="w-14 h-14 bg-green-400/20 rounded-lg flex items-center justify-center mb-6">
              <UserGroupIcon className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">1-on-1 Coaching</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Mock Interviews</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Career Path Planning</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Live Resume Reviews</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">✓</span>
                <span className="text-gray-300">Personalized Guidance</span>
              </li>
            </ul>
            <Link href={getPremiumLink('/coaching')} className="btn-primary inline-flex items-center w-full justify-center">
              {user ? 'Book Coaching Session' : 'Get Started Now'}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        
      </div>
    </section>
  )
} 