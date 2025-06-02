import Link from 'next/link'
import { ArrowRightIcon, DocumentTextIcon, SparklesIcon, BookOpenIcon, UserGroupIcon, ChartBarIcon, BriefcaseIcon } from '@heroicons/react/24/outline'

export default function FeaturesSection() {
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
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
            <Link href="/tools" className="btn-primary inline-flex items-center w-full justify-center">
              Access Premium Tools
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
            <Link href="/guides" className="btn-primary inline-flex items-center w-full justify-center">
              Get Premium Guides
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
            <Link href="/coaching" className="btn-primary inline-flex items-center w-full justify-center">
              Book Coaching Session
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Free Resources */}
        <div className="border-t border-gray-800 pt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Free Resources to Get Started</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Awesome Analytics Series */}
            <div className="glass rounded-xl p-6 card-hover">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-4">
                <ChartBarIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Awesome Analytics Series</h4>
              <p className="text-gray-400 mb-4 text-sm">
                Weekly articles showcasing brilliant analytics solutions from top companies
              </p>
              <Link href="/articles" className="text-green-400 hover:text-green-300 text-sm inline-flex items-center">
                Read Articles
                <ArrowRightIcon className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* Resume Templates */}
            <div className="glass rounded-xl p-6 card-hover">
              <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mb-4">
                <DocumentTextIcon className="h-6 w-6 text-green-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Resume Templates</h4>
              <p className="text-gray-400 mb-4 text-sm">
                Professional templates designed specifically for analytics roles
              </p>
              <Link href="/resources" className="text-green-400 hover:text-green-300 text-sm inline-flex items-center">
                Get Templates
                <ArrowRightIcon className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* Blog Templates */}
            <div className="glass rounded-xl p-6 card-hover">
              <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center mb-4">
                <BriefcaseIcon className="h-6 w-6 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Analytics Blog Templates</h4>
              <p className="text-gray-400 mb-4 text-sm">
                Start showcasing your work with professional blog templates
              </p>
              <Link href="/resources" className="text-green-400 hover:text-green-300 text-sm inline-flex items-center">
                Download Free
                <ArrowRightIcon className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 