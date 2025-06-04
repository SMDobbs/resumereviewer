'use client'

import Link from 'next/link'
import { SparklesIcon, DocumentTextIcon, ChartBarIcon, LockClosedIcon, CheckIcon, CloudArrowDownIcon, TrophyIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'
import { useState, useEffect, useCallback } from 'react'

interface AssessmentSummary {
  totalAttempts: number
  latestScore: number | null
  latestSkillLevel: string | null
  bestScore: number | null
  trend: number | null
  lastTaken: string | null
}

interface Tool {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
  premium: boolean
  available: boolean
  route: string
  isAssessment?: boolean
}

export default function ToolsPage() {
  const { user } = useUser()
  const [assessmentSummary, setAssessmentSummary] = useState<AssessmentSummary | null>(null)
  const [loadingAssessment, setLoadingAssessment] = useState(false)

  const fetchAssessmentSummary = useCallback(async () => {
    if (!user?.id) return
    
    setLoadingAssessment(true)
    try {
      const response = await fetch(`/api/assessment-history?userId=${user.id}`)
      const data = await response.json()
      
      if (data.success) {
        setAssessmentSummary(data.summary)
      }
    } catch (error) {
      console.error('Failed to fetch assessment summary:', error)
    } finally {
      setLoadingAssessment(false)
    }
  }, [user?.id])

  // Fetch assessment history for the SQL tool
  useEffect(() => {
    if (user?.id) {
      fetchAssessmentSummary()
    }
  }, [user?.id, fetchAssessmentSummary])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const tools: Tool[] = [
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
      id: 2,
      title: "Data Export & API Access",
      description: "Build impressive portfolio projects with real business datasets. Perfect for showcasing your ability to create dashboards and consume APIs.",
      icon: CloudArrowDownIcon,
      features: [
        "Real business datasets",
        "Portfolio project ready",
        "API integration examples", 
        "Dashboard building data",
        "Multiple format options",
        "Complete documentation"
      ],
      premium: true,
      available: true,
      route: "/tools/data-export"
    },
    {
      id: 4,
      title: "SQL Analytics Assessment",
      description: "Take our comprehensive 20-question SQL test designed for aspiring data analysts. Get AI-powered feedback and skill level evaluation.",
      icon: ChartBarIcon,
      features: [
        "20 real-world SQL questions",
        "Mix of multiple choice & hands-on queries",
        "Beginner to advanced difficulty levels",
        "AI-powered personalized feedback",
        "Skill level assessment (Beginner/Intermediate/Advanced)",
        "Career development recommendations"
      ],
      premium: false,
      available: true,
      route: "/tools/skill-assessment",
      isAssessment: true
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-16">
          {tools.map((tool) => {
            const Icon = tool.icon
            
            // Special rendering for SQL Assessment tool
            if (tool.isAssessment) {
              const toolContent = (
                <div key={tool.id} className="glass rounded-xl p-7 relative h-full flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center">
                      <div className="w-11 h-11 bg-green-400/20 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{tool.title}</h3>
                        <span className="text-sm font-bold text-green-400">FREE</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-5 leading-relaxed">{tool.description}</p>

                  {/* Assessment Progress Section */}
                  {user && assessmentSummary && assessmentSummary.totalAttempts > 0 ? (
                    <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-4 mb-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-blue-400 flex items-center">
                          <TrophyIcon className="h-4 w-4 mr-2" />
                          Your Progress
                        </h4>
                        <span className="text-xs text-gray-500">
                          {assessmentSummary.totalAttempts} attempt{assessmentSummary.totalAttempts !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{assessmentSummary.latestScore}%</div>
                          <div className="text-xs text-gray-500">Latest</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-yellow-400">{assessmentSummary.bestScore}%</div>
                          <div className="text-xs text-gray-500">Best</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold flex items-center justify-center ${
                            (assessmentSummary.trend || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {assessmentSummary.trend !== null && (
                              <>
                                {assessmentSummary.trend >= 0 ? (
                                  <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowTrendingDownIcon className="h-3 w-3 mr-1" />
                                )}
                                {assessmentSummary.trend > 0 ? '+' : ''}{assessmentSummary.trend}%
                              </>
                            )}
                            {assessmentSummary.trend === null && <span className="text-gray-400">--</span>}
                          </div>
                          <div className="text-xs text-gray-500">Trend</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          assessmentSummary.latestSkillLevel === 'Advanced' ? 'bg-green-400 text-gray-900' :
                          assessmentSummary.latestSkillLevel === 'Intermediate' ? 'bg-yellow-400 text-gray-900' :
                          'bg-red-400 text-white'
                        }`}>
                          {assessmentSummary.latestSkillLevel}
                        </span>
                        <span className="text-gray-500 text-xs">
                          Last: {formatDate(assessmentSummary.lastTaken!)}
                        </span>
                      </div>
                    </div>
                  ) : user && loadingAssessment ? (
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-5">
                      <div className="flex items-center justify-center py-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-2"></div>
                        <span className="text-gray-400 text-sm">Loading progress...</span>
                      </div>
                    </div>
                  ) : user ? (
                    <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4 mb-5">
                      <div className="text-center">
                        <p className="text-green-400 font-medium text-sm mb-1">Ready to start!</p>
                        <p className="text-gray-400 text-xs">Take your first SQL assessment</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4 mb-5">
                      <div className="text-center">
                        <p className="text-yellow-400 font-medium text-sm mb-1">Sign up to save progress</p>
                        <p className="text-gray-400 text-xs">Track your improvement over time</p>
                      </div>
                    </div>
                  )}

                  {/* Features - Compact but readable */}
                  <div className="flex-1 mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Features included:</h4>
                    <div className="space-y-2">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckIcon className="h-4 w-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button - Fixed at bottom */}
                  <div className="mt-auto">
                    <Link 
                      href={tool.route}
                      className="w-full px-4 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors text-center font-medium"
                    >
                      {user && assessmentSummary && assessmentSummary.totalAttempts > 0 
                        ? "Take Another Assessment" 
                        : "Start Assessment"
                      }
                    </Link>
                  </div>
                </div>
              )

              return toolContent
            }

            // Regular tool rendering for other tools
            const toolContent = (
              <div key={tool.id} className="glass rounded-xl p-7 relative h-full flex flex-col">
                
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-11 h-11 bg-green-400/20 rounded-lg flex items-center justify-center mr-4">
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
                          <span className="text-sm font-bold text-green-400">FREE</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {tool.premium && !hasAccess && (
                    <LockClosedIcon className="h-5 w-5 text-gray-500" />
                  )}
                </div>

                <p className="text-gray-400 mb-5 leading-relaxed">{tool.description}</p>

                {/* Features - Compact but readable */}
                <div className="flex-1 mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">Features included:</h4>
                  <div className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckIcon className="h-4 w-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button - Fixed at bottom */}
                <div className="mt-auto">
                  {tool.premium && !hasAccess ? (
                    <Link 
                      href="/signup"
                      className="w-full px-4 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors text-center font-medium"
                    >
                      Upgrade to Access
                    </Link>
                  ) : tool.available ? (
                    <Link 
                      href={tool.route}
                      className="w-full px-4 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors text-center font-medium"
                    >
                      Launch Tool
                    </Link>
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-800 text-gray-500 rounded-lg text-center cursor-not-allowed font-medium">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            )

            // Always return the tool content directly - no Paywall wrapper
            return toolContent
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