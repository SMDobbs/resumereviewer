'use client'

import Link from 'next/link'
import { useUser } from '@/lib/context/UserContext'
import { 
  ChartBarIcon, 
  SparklesIcon, 
  CodeBracketIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon,
  DocumentTextIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

export default function SQLPracticeShowcase() {
  const { user } = useUser()
  
  const getActionLink = () => {
    return user ? 'https://sqlpractice.io' : '/signup'
  }
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400/20 to-green-400/20 border border-blue-400/30 rounded-full">
                <SparklesIcon className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-sm font-semibold text-blue-400 tracking-wide">BONUS PLATFORM INCLUDED</span>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-black leading-tight">
                <span className="block text-white">Master SQL with</span>
                <span className="block gradient-text">SQLPractice.io</span>
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Get free access to our dedicated SQL practice platform - normally $9.99, 
                included FREE with your AnalystHub premium membership.
              </p>
            </div>

            {/* Simple Value Highlight */}
            <div className="p-6 glass rounded-2xl border border-green-400/20 text-center">
              <div className="text-lg text-gray-300 mb-2">Get Both Platforms</div>
              <div className="text-4xl font-bold text-green-400 mb-2">$19.99</div>
              <div className="text-sm text-gray-400 mb-3">One-time payment • Lifetime access</div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-400/20 text-blue-400 rounded-full text-sm font-semibold">
                + SQLPractice.io FREE (normally $9.99)
              </div>
            </div>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
                  <PlayIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Interactive Practice</div>
                  <div className="text-sm text-gray-400">Real SQL challenges</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center">
                  <BeakerIcon className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Database Playground</div>
                  <div className="text-sm text-gray-400">Safe practice environment</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                <div className="w-10 h-10 bg-purple-400/20 rounded-lg flex items-center justify-center">
                  <DocumentTextIcon className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Portfolio Builder</div>
                  <div className="text-sm text-gray-400">Showcase your SQL skills</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                <div className="w-10 h-10 bg-orange-400/20 rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Progress Tracking</div>
                  <div className="text-sm text-gray-400">Monitor your improvement</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={getActionLink()}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/25"
              >
                <span className="relative z-10 flex items-center">
                  {user ? 'Practice SQL Now' : 'Get Premium Access'}
                  <ArrowRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <div className="flex items-center text-sm text-gray-400">
                <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                <span>
                  {user ? 'Premium member - access included' : 'Both platforms for one low price'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Visual Demo */}
          <div className="relative">
            <div className="relative max-w-lg mx-auto">
              {/* Main Platform Preview */}
              <div className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="glass rounded-2xl p-6 shadow-2xl border border-gray-700/50">
                  {/* Platform Header */}
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-500 rounded-xl flex items-center justify-center mr-4">
                      <CodeBracketIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">sqlpractice.io</div>
                      <div className="text-sm text-gray-400">SQL Practice Platform</div>
                    </div>
                  </div>
                  
                  {/* Simulated Code Editor */}
                  <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-gray-700">
                    <div className="text-xs text-gray-500 mb-2">Challenge: Find top customers</div>
                    <div className="font-mono text-sm">
                      <div className="text-blue-400">SELECT</div>
                      <div className="text-gray-300 ml-2">customer_name,</div>
                      <div className="text-gray-300 ml-2">SUM(order_total)</div>
                      <div className="text-blue-400">FROM</div>
                      <div className="text-gray-300 ml-2">customers c</div>
                      <div className="text-blue-400">JOIN</div>
                      <div className="text-gray-300 ml-2">orders o...</div>
                    </div>
                  </div>
                  
                  {/* Progress Status */}
                  <div className="flex items-center justify-between p-4 bg-blue-400/10 border border-blue-400/20 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-blue-400 font-medium text-sm">Practice in Progress</span>
                    </div>
                    <div className="text-blue-400 font-bold text-lg">47/100</div>
                  </div>
                </div>
              </div>

              {/* Floating Feature Cards */}
              <div className="absolute -top-6 -right-8 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="glass rounded-xl p-4 border border-green-400/30 bg-green-400/5">
                  <div className="text-green-400 font-semibold text-sm">Portfolio Ready</div>
                  <div className="text-white font-bold text-2xl">✓</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-6 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="glass rounded-xl p-4 border border-purple-400/30 bg-purple-400/5">
                  <div className="text-purple-400 font-semibold text-sm">Questions</div>
                  <div className="text-white font-bold text-2xl">50+</div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-green-400/10 rounded-3xl blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 