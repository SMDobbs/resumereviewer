'use client'

import Link from 'next/link'
import { useUser } from '@/lib/context/UserContext'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default function CTASection() {
  const { user } = useUser()
  
  // Get appropriate links based on user authentication
  const getStartLink = () => user ? '/tools' : '/signup'
  const getCoachingLink = () => user ? '/coaching' : '/signup'
  
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Land Your <span className="gradient-text">First Analytics Role</span>?
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          Get the tools, templates, and guidance you need to break into analytics with confidence. 
          Everything designed to help you land your first role.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={getStartLink()} className="btn-primary inline-flex items-center justify-center">
            {user ? 'Access Your Tools' : 'Get Started Today'}
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
          <Link href={getCoachingLink()} className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-green-400 hover:text-green-400 transition-colors">
            {user ? 'Book Coaching Session' : 'Learn More'}
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          One-time payment • $19.99 for lifetime access • Includes SQLPractice.io ($9.99 value)
        </p>
      </div>
    </section>
  )
} 