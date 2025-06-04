import Link from 'next/link'
import { CheckIcon, UserGroupIcon, BriefcaseIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export default function PricingSection() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get unlimited access to career articles, curated learning roadmaps, downloadable resources, 
            and strategic guidance. Plus optional 1:1 services for personalized career coaching.
          </p>
        </div>

        {/* Main Subscription */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass rounded-xl p-8 relative border-2 border-green-400">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-green-400 to-green-600 text-black px-4 py-1 rounded-full text-sm font-semibold">
                FULL ACCESS
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2">Full Access Pass</h3>
              <div className="text-5xl font-bold mb-2">
                <span className="gradient-text">$29.99</span>
                <span className="text-lg text-gray-400"> one-time</span>
              </div>
              <p className="text-gray-400">Lifetime access to all career guidance, resources, and curated learning paths</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-400">Learning Roadmaps</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Curated course recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Strategic learning sequences</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Book & resource lists</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Skill development priorities</span>
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
                    <span className="text-sm">Real estate analytics guide</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Retail & CPG insights</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Education sector analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">Fortune 100 strategies</span>
                  </li>
                </ul>
              </div>
            </div>

            <Link href="/dashboard" className="btn-primary w-full text-lg py-4 block text-center">
              Get Full Access Now
            </Link>
            <p className="text-center text-sm text-gray-500 mt-3">
              One-time payment • Lifetime access • No recurring charges
            </p>
          </div>
        </div>

        {/* 1:1 Services Add-ons */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">
            <span className="gradient-text">Optional</span> 1:1 Career Services
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Need personalized guidance? Book individual sessions for hands-on help with career strategy and interview preparation.
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
            All 1:1 services include detailed follow-up materials and email support. 
            <span className="text-green-400">Full Access Pass required</span> to book sessions.
          </p>
        </div>
      </div>
    </section>
  )
} 