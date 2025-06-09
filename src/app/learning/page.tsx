'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpenIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function LearningPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to resources page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/resources')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-950 py-12 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-2xl p-8 lg:p-12">
          <BookOpenIcon className="h-16 w-16 text-green-400 mx-auto mb-6" />
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Learning Paths <span className="gradient-text">Discontinued</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            We've streamlined our focus to provide you with the most valuable career resources. 
            Our learning paths section has been discontinued to concentrate on practical tools, 
            templates, and career guidance that make an immediate impact.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center text-gray-300">
              <ArrowRightIcon className="h-5 w-5 text-green-400 mr-3" />
              <span>Downloadable resume templates</span>
            </div>
            <div className="flex items-center justify-center text-gray-300">
              <ArrowRightIcon className="h-5 w-5 text-green-400 mr-3" />
              <span>Career strategy articles</span>
            </div>
            <div className="flex items-center justify-center text-gray-300">
              <ArrowRightIcon className="h-5 w-5 text-green-400 mr-3" />
              <span>Industry insights and guides</span>
            </div>
            <div className="flex items-center justify-center text-gray-300">
              <ArrowRightIcon className="h-5 w-5 text-green-400 mr-3" />
              <span>One-on-one coaching sessions</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/resources')}
              className="btn-primary"
            >
              Browse Resources
            </button>
            <button 
              onClick={() => router.push('/articles')}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-green-400 hover:text-green-400 transition-colors"
            >
              Read Articles
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Redirecting to resources in 3 seconds...
          </p>
        </div>
      </div>
    </div>
  )
} 