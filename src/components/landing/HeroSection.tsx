import Link from 'next/link'
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function HeroSection() {
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
            <Link href="/tools" className="btn-primary inline-flex items-center">
              Start Your Journey
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">500+</div>
              <div className="text-gray-400">People Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">90%</div>
              <div className="text-gray-400">Land Interviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">30 Days</div>
              <div className="text-gray-400">Avg. Time to Offer</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">$65k+</div>
              <div className="text-gray-400">Starting Salaries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 