'use client'

import Link from 'next/link'
import { useUser } from '@/lib/context/UserContext'
import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function PricingSection() {
  const { user } = useUser()
  
  // Main CTA should go to signup for non-users, dashboard for existing users
  const getMainCTALink = () => {
    return user ? '/dashboard' : '/signup'
  }
  
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get lifetime access to everything you need to land your first analytics role. 
            <span className="text-green-400 font-semibold"> Plus free access to SQLPractice.io</span> (normally $9.99).
          </p>
        </div>

        {/* Main Pricing Card */}
        <div className="glass rounded-2xl p-8 relative border-2 border-green-400 mb-12">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-black px-6 py-2 rounded-full font-bold">
              ONE-TIME PAYMENT
            </span>
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">AnalystHub Premium</h3>
            <div className="text-6xl font-bold mb-4">
              <span className="gradient-text">$19.99</span>
            </div>
            <p className="text-gray-400 text-lg mb-6">Lifetime access • No recurring charges</p>
            
            {/* Value Highlight */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-400/20 to-blue-400/20 border border-green-400/30 rounded-full mb-8">
              <SparklesIcon className="h-5 w-5 text-green-400 mr-2" />
              <span className="font-bold text-green-400">INCLUDES SQLPractice.io FREE ($9.99 value)</span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">🎯 AnalystHub Premium</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>AI Resume Reviewer with instant feedback</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Data Export & API tools for portfolio projects</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Interactive SQL skill assessment</span>
                </li>
                                 <li className="flex items-start">
                   <CheckIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                   <span>Learning articles (added regularly) & templates</span>
                 </li>
                 <li className="flex items-start">
                   <CheckIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                   <span>Career guides (coming soon)</span>
                 </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Industry insights & trend analysis</span>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                BONUS!
              </div>
                             <h4 className="text-lg font-semibold mb-4 text-blue-400">💻 SQLPractice.io Access</h4>
               <div className="p-3 bg-blue-400/10 border border-blue-400/20 rounded-lg mb-4">
                 <div className="text-sm text-blue-400 font-semibold">Normally $9.99 - Yours FREE</div>
                 <div className="text-xs text-gray-400">Included with your premium membership</div>
               </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>50+ interactive SQL challenges</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Real database playgrounds</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Portfolio builder tools</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Progress tracking & certificates</span>
                </li>
              </ul>
            </div>
          </div>

          

          <Link href={getMainCTALink()} className="btn-primary w-full text-lg py-4 block text-center mb-4">
            {user ? 'Access Your Dashboard' : 'Get Started Now - $19.99'}
          </Link>
          
                     <p className="text-center text-sm text-gray-500">
             ✓ One-time payment ✓ Lifetime access ✓ No hidden fees
           </p>
        </div>

        {/* Simple 1:1 Services Mention */}
        <div className="text-center glass rounded-xl p-6">
          <h3 className="text-xl font-bold mb-2">Need Personal Coaching?</h3>
          <p className="text-gray-400 mb-4">
            1:1 mock interviews, resume reviews, and career strategy sessions available as add-ons.
          </p>
          <Link href="/coaching" className="text-green-400 hover:text-green-300 font-medium">
            Learn More About Coaching →
          </Link>
        </div>
      </div>
    </section>
  )
} 