'use client'

import Link from 'next/link'
import { useUser } from '@/lib/context/UserContext'
import { CheckIcon, UserGroupIcon, BriefcaseIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export default function PricingSection() {
  const { user } = useUser()
  
  // Main CTA should go to signup for non-users, dashboard for existing users
  const getMainCTALink = () => {
    return user ? '/dashboard' : '/signup'
  }
  
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get lifetime access to career articles, industry insights, downloadable templates, 
            strategic guidance, <span className="text-green-400 font-semibold">PLUS free access to our entire SQLPractice.io platform</span> (normally $9.99). 
            Two platforms, one low price.
          </p>
        </div>

        {/* One-Time Payment */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass rounded-xl p-8 relative border-2 border-green-400">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-green-400 to-green-600 text-black px-4 py-1 rounded-full text-sm font-semibold">
                ONE-TIME PAYMENT
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2">Full Access Pass</h3>
              <div className="text-5xl font-bold mb-2">
                <span className="gradient-text">$19.99</span>
                <span className="text-lg text-gray-400"> one-time</span>
              </div>
              <p className="text-gray-400 mb-4">Lifetime access to all career resources and strategic guidance</p>
              
              {/* Value Highlight */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-400/20 to-blue-400/20 border border-green-400/30 rounded-full">
                <span className="text-sm font-bold text-green-400">✨ INCLUDES SQLPractice.io ($9.99 value) - Total Value: $29.98</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-400">Career Articles</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Breaking into analytics guides</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Career transition strategies</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Salary negotiation tactics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Advancement frameworks</span>
                  </li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  INCLUDED FREE!
                </div>
                <h4 className="text-lg font-semibold mb-4 text-green-400">SQL Practice Platform</h4>
                <div className="mb-3 p-2 bg-green-400/10 border border-green-400/20 rounded-lg">
                  <div className="text-xs text-green-400 font-semibold">✨ BONUS: SQLPractice.io Access</div>
                  <div className="text-xs text-gray-400">Normally $9.99/month - Yours FREE</div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Full platform access (no extra cost)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">50+ interactive SQL challenges</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Real database playgrounds</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Portfolio builder & progress tracking</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-400">Resume & Templates</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Professional resume templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Cover letter guides</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Portfolio project templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Interview prep materials</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-400">Industry Insights</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Market trend analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Skill demand forecasting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Company culture insights</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Industry-specific strategies</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-400">Expert Support</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Direct messaging access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Quick career questions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Personalized guidance</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Industry-specific insights</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Value Summary */}
            <div className="mb-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600">
              <h5 className="font-semibold text-white mb-3 text-center">What You Get for $19.99:</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-green-400 font-medium">✓ AnalystHub Premium</div>
                  <div className="text-gray-300 ml-4">• Career articles & guides</div>
                  <div className="text-gray-300 ml-4">• Resume templates</div>
                  <div className="text-gray-300 ml-4">• AI tools & support</div>
                </div>
                <div className="space-y-1">
                  <div className="text-blue-400 font-medium">✓ SQLPractice.io Access</div>
                  <div className="text-gray-300 ml-4">• 50+ SQL challenges</div>
                  <div className="text-gray-300 ml-4">• Database playground</div>
                  <div className="text-gray-300 ml-4">• Portfolio builder</div>
                </div>
              </div>
              <div className="border-t border-gray-600 mt-3 pt-3 text-center">
                <span className="text-gray-400 text-sm">Regular Price: <span className="line-through">$29.98</span></span>
                <span className="text-green-400 font-bold text-lg ml-2">Your Price: $19.99</span>
              </div>
            </div>

            <Link href={getMainCTALink()} className="btn-primary w-full text-lg py-4 block text-center">
              {user ? 'Access Your Dashboard' : 'Get Full Access Now'}
            </Link>
            <p className="text-center text-sm text-gray-500 mt-3">
              One-time payment • Lifetime access • No recurring charges
            </p>
          </div>
        </div>

        {/* Premium 1:1 Services Add-ons */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">
            <span className="gradient-text">Premium</span> 1:1 Career Services
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Need intensive, personalized guidance? Book individual deep-dive sessions for comprehensive career strategy and interview preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="glass rounded-xl p-6 text-center border border-gray-700">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="h-8 w-8 text-green-400" />
            </div>
            <h4 className="text-xl font-bold mb-2">Mock Interview Session</h4>
            <div className="text-3xl font-bold mb-4">
              <span className="gradient-text">$74.99</span>
              <span className="text-sm text-gray-400 block">45 minutes</span>
            </div>

            <ul className="space-y-3 mb-6 text-left">
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Realistic interview simulation</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Technical & behavioral questions</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Detailed feedback report</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Recording of session</span>
              </li>
            </ul>

            <button className="w-full py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors">
              Book Mock Interview
            </button>
          </div>

          <div className="glass rounded-xl p-6 text-center border border-gray-700">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BriefcaseIcon className="h-8 w-8 text-green-400" />
            </div>
            <h4 className="text-xl font-bold mb-2">Career Strategy Session</h4>
            <div className="text-3xl font-bold mb-4">
              <span className="gradient-text">$99.99</span>
              <span className="text-sm text-gray-400 block">60 minutes</span>
            </div>

            <ul className="space-y-3 mb-6 text-left">
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Personalized strategy session</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Skills gap analysis</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Career roadmap development</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">30-day action plan</span>
              </li>
            </ul>

            <button className="w-full py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors">
              Book Strategy Session
            </button>
          </div>

          <div className="glass rounded-xl p-6 text-center border border-gray-700">
            <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentTextIcon className="h-8 w-8 text-green-400" />
            </div>
            <h4 className="text-xl font-bold mb-2">Resume & LinkedIn Review</h4>
            <div className="text-3xl font-bold mb-4">
              <span className="gradient-text">$49.99</span>
              <span className="text-sm text-gray-400 block">30 minutes</span>
            </div>

            <ul className="space-y-3 mb-6 text-left">
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Line-by-line resume review</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">LinkedIn optimization</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">Keyword recommendations</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm">ATS optimization tips</span>
              </li>
            </ul>

            <button className="w-full py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors">
              Book Resume Review
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            All premium 1:1 services include detailed follow-up materials and extended support. 
            <span className="text-green-400">Full Access Pass required</span> to book sessions.
          </p>
        </div>
      </div>
    </section>
  )
} 