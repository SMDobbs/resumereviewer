'use client'

import Link from 'next/link'
import { SparklesIcon, DocumentTextIcon, ChartBarIcon, LockClosedIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'
import Paywall from '@/components/Paywall'

export default function ToolsPage() {
  const { user } = useUser()

  const tools = [
    {
      id: 1,
      title: "AI Resume Reviewer",
      description: "Get instant, expert feedback on your analytics resume with our AI-powered tool trained on successful resumes.",
      icon: DocumentTextIcon,
      features: [
        "ATS optimization check",
        "Industry-specific feedback",
        "Skills gap analysis",
        "Instant improvement suggestions",
        "Before/after comparison"
      ],
      premium: false,
      available: true,
      route: "/resume-reviewer"
    },
    {
      id: 3,
      title: "LinkedIn Profile Optimizer",
      description: "Optimize your LinkedIn profile to get noticed by recruiters in the analytics field.",
      icon: SparklesIcon,
      features: [
        "Keyword optimization",
        "Profile completeness check",
        "Industry benchmarking",
        "Headline suggestions",
        "Network growth tips"
      ],
      premium: true,
      available: false,
      route: "/tools/linkedin-optimizer"
    },
    {
      id: 4,
      title: "Interactive Skill Assessment",
      description: "Comprehensive skills evaluation to identify your strengths and areas for improvement.",
      icon: ChartBarIcon,
      features: [
        "SQL proficiency test",
        "Excel/Spreadsheet skills",
        "Data visualization knowledge",
        "Business acumen assessment",
        "Personalized learning path"
      ],
      premium: false,
      available: true,
      route: "/tools/skill-assessment"
    }
  ]

  const comingSoonTools = [
    {
      title: "Portfolio Generator",
      description: "Automatically generate impressive analytics portfolios from your projects",
      expectedLaunch: "Q2 2024"
    },
    {
      title: "Salary Negotiation Assistant",
      description: "Get personalized salary negotiation strategies based on market data",
      expectedLaunch: "Q3 2024"
    }
  ]

  const hasAccess = user?.subscriptionStatus === 'PREMIUM'

  return (
    <div className="min-h-screen bg-gray-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Premium <span className="gradient-text">Analytics Tools</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            AI-powered tools designed specifically for landing your first analytics role. 
            Get the edge you need to stand out from other candidates.
          </p>
        </div>

        

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {tools.map((tool) => {
            const Icon = tool.icon
            const toolContent = (
              <div key={tool.id} className="glass rounded-xl p-8 relative">
                
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{tool.title}</h3>
                      <div className="flex items-center">
                        {tool.premium ? (
                          <div className="flex items-center">
                            <SparklesIcon className="h-4 w-4 text-green-400 mr-1" />
                            <span className="text-sm font-medium text-green-400">Premium</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-green-400">FREE</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {tool.premium && !hasAccess && (
                    <LockClosedIcon className="h-5 w-5 text-gray-500" />
                  )}
                </div>

                <p className="text-gray-400 mb-6">{tool.description}</p>

                <div className="mb-8">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">Features included:</h4>
                  <ul className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  {tool.premium && !hasAccess ? (
                    <Link 
                      href="/signup"
                      className="w-full px-4 py-2 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors text-center"
                    >
                      Upgrade to Access
                    </Link>
                  ) : tool.available ? (
                    <Link 
                      href={tool.route}
                      className="w-full px-4 py-2 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors text-center"
                    >
                      {tool.premium ? "Launch Tool" : "Launch Tool"}
                    </Link>
                  ) : (
                    <div className="w-full px-4 py-2 bg-gray-800 text-gray-500 rounded-lg text-center cursor-not-allowed">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            )

            // Don't wrap free tools in paywall
            if (!tool.premium) {
              return toolContent
            }

            // Wrap premium tools in paywall
            return (
              <Paywall
                key={tool.id}
                title={`${tool.title} - Premium Tool`}
                description={tool.description}
                feature={`Access ${tool.title} and all premium analytics tools`}
              >
                {toolContent}
              </Paywall>
            )
          })}
        </div>

        

        {/* Coming Soon */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comingSoonTools.map((tool, index) => (
              <div key={index} className="glass rounded-xl p-6 opacity-75">
                <div className="flex items-center mb-4">
                  <LockClosedIcon className="h-6 w-6 text-gray-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-400">{tool.title}</h3>
                </div>
                <p className="text-gray-500 mb-4">{tool.description}</p>
                <div className="text-sm text-gray-600">Expected: {tool.expectedLaunch}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 