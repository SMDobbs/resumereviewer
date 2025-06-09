'use client'

import Link from 'next/link'
import { useUser } from '@/lib/context/UserContext'
import { 
  DocumentTextIcon, 
  SparklesIcon, 
  CheckCircleIcon, 
  ClockIcon,
  ChartBarIcon,
  EyeIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline'

export default function ResumeToolShowcase() {
  const { user, loading } = useUser()
  
  // Determine button text and link based on user state
  const getButtonConfig = () => {
    if (loading) {
      return { text: 'Loading...', href: '#', disabled: true }
    }
    
    if (!user) {
      return { text: 'Get Started Free', href: '/signup', disabled: false }
    }
    
    if (user.subscriptionStatus === 'PREMIUM') {
      return { text: 'Analyze My Resume', href: '/resume-reviewer', disabled: false }
    }
    
    return { text: 'Upgrade to Premium', href: '/dashboard', disabled: false }
  }
  
  const buttonConfig = getButtonConfig()
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-blue-400/20 border border-green-400/30 rounded-full">
                <SparklesIcon className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-sm font-semibold text-green-400 tracking-wide">AUTOMATED ANALYSIS</span>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-black leading-tight">
                <span className="block text-white">Perfect Your</span>
                <span className="block gradient-text">Resume in Seconds</span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Our advanced AI analyzes your resume against industry standards, 
                giving you instant feedback on content, formatting, and ATS optimization.
              </p>
            </div>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center">
                  <ClockIcon className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">30-Second Analysis</div>
                  <div className="text-sm text-gray-400">Instant detailed feedback</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
                  <EyeIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">ATS Optimization</div>
                  <div className="text-sm text-gray-400">Beat the robot filters</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                <div className="w-10 h-10 bg-purple-400/20 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Detailed Scoring</div>
                  <div className="text-sm text-gray-400">Know exactly what to fix</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                <div className="w-10 h-10 bg-orange-400/20 rounded-lg flex items-center justify-center">
                  <StarIcon className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Analytics Focus</div>
                  <div className="text-sm text-gray-400">Industry-specific insights</div>
                </div>
              </div>
            </div>

                        {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={buttonConfig.href}
                className={`group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-400 to-green-500 text-gray-900 font-bold rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/25 ${
                  buttonConfig.disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={buttonConfig.disabled ? (e) => e.preventDefault() : undefined}
              >
                <span className="relative z-10 flex items-center">
                  {buttonConfig.text}
                  {!buttonConfig.disabled && (
                    <ArrowRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <div className="flex items-center text-sm text-gray-400">
                <SparklesIcon className="h-4 w-4 text-green-400 mr-2" />
                <span>
                  {!user 
                    ? 'Start with $19.99 one-time payment' 
                    : user.subscriptionStatus === 'PREMIUM' 
                      ? 'Premium feature • Ready to use'
                      : 'Premium feature • Upgrade required'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Demo Visual */}
          <div className="relative">
            {/* Main Demo Container */}
            <div className="relative max-w-lg mx-auto">
              {/* Floating Resume Preview */}
              <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="glass rounded-2xl p-6 shadow-2xl border border-gray-700/50">
                  {/* Resume Header */}
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                      <DocumentTextIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">resume.pdf</div>
                      <div className="text-sm text-gray-400">2 pages • Analytics Resume</div>
                    </div>
                  </div>
                  
                  {/* Simulated Content Lines */}
                  <div className="space-y-3 mb-6">
                    <div className="h-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full w-4/5"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full w-3/5"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full w-5/6"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full w-2/3"></div>
                  </div>
                  
                  {/* Analysis Status */}
                  <div className="flex items-center justify-between p-4 bg-green-400/10 border border-green-400/20 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-green-400 font-medium text-sm">Analysis Complete</span>
                    </div>
                    <div className="text-green-400 font-bold text-lg">8.5/10</div>
                  </div>
                </div>
              </div>

              {/* Floating Score Cards */}
              <div className="absolute -top-6 -left-8 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="glass rounded-xl p-4 border border-blue-400/30 bg-blue-400/5">
                  <div className="text-blue-400 font-semibold text-sm">ATS Score</div>
                  <div className="text-white font-bold text-2xl">92%</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-6 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="glass rounded-xl p-4 border border-purple-400/30 bg-purple-400/5">
                  <div className="text-purple-400 font-semibold text-sm">Analytics Skills</div>
                  <div className="text-white font-bold text-2xl">9.1/10</div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-transparent to-blue-400/10 rounded-3xl blur-2xl -z-10"></div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 gap-4 mt-12 max-w-lg mx-auto">
              <div className="text-center p-4 glass rounded-xl">
                <div className="text-3xl font-bold text-green-400 mb-2">30s</div>
                <div className="text-lg font-semibold text-white mb-1">Lightning Fast Analysis</div>
                <div className="text-sm text-gray-400">Get comprehensive feedback in seconds, not hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="text-center p-8 glass rounded-2xl card-hover">
            <div className="w-16 h-16 bg-green-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Analysis</h3>
            <p className="text-gray-400">Our AI understands what analytics hiring managers actually look for in resumes.</p>
          </div>
          
          <div className="text-center p-8 glass rounded-2xl card-hover">
            <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Actionable Feedback</h3>
            <p className="text-gray-400">Get specific, implementable suggestions to improve your resume immediately.</p>
          </div>
          
          <div className="text-center p-8 glass rounded-2xl card-hover">
            <div className="w-16 h-16 bg-purple-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Industry Standards</h3>
            <p className="text-gray-400">Benchmarked against successful analytics professionals and industry best practices.</p>
          </div>
        </div>
      </div>
    </section>
  )
} 