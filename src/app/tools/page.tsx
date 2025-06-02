import Link from 'next/link'
import { ArrowLeftIcon, SparklesIcon, UserGroupIcon, DocumentTextIcon, ChartBarIcon, LockClosedIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function ToolsPage() {
  const tools = [
    {
      id: 1,
      title: "AI Resume Reviewer",
      description: "Get instant, expert feedback on your analytics resume with our AI-powered tool trained on successful resumes.",
      icon: DocumentTextIcon,
      price: "$19/month",
      features: [
        "ATS optimization check",
        "Industry-specific feedback",
        "Skills gap analysis",
        "Instant improvement suggestions",
        "Before/after comparison"
      ],
      popular: false,
      available: true
    },
    {
      id: 2,
      title: "AI Mock Interviewer",
      description: "Practice analytics interviews with realistic questions and get detailed feedback on your responses.",
      icon: UserGroupIcon,
      price: "$29/month",
      features: [
        "Real interview questions from top companies",
        "Behavioral and technical scenarios",
        "Voice response analysis",
        "Improvement recommendations",
        "Progress tracking"
      ],
      popular: true,
      available: true
    },
    {
      id: 3,
      title: "LinkedIn Profile Optimizer",
      description: "Optimize your LinkedIn profile to get noticed by recruiters in the analytics field.",
      icon: SparklesIcon,
      price: "$15/month",
      features: [
        "Keyword optimization",
        "Profile completeness check",
        "Industry benchmarking",
        "Headline suggestions",
        "Network growth tips"
      ],
      popular: false,
      available: true
    },
    {
      id: 4,
      title: "Interactive Skill Assessment",
      description: "Comprehensive skills evaluation to identify your strengths and areas for improvement.",
      icon: ChartBarIcon,
      price: "Free",
      features: [
        "SQL proficiency test",
        "Excel/Spreadsheet skills",
        "Data visualization knowledge",
        "Business acumen assessment",
        "Personalized learning path"
      ],
      popular: false,
      available: true
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

  return (
    <div className="min-h-screen bg-gray-950 py-8">
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

        {/* Free Tool Highlight */}
        <div className="mb-12 p-6 glass rounded-xl bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-400/20">
          <div className="flex items-center mb-4">
            <ChartBarIcon className="h-8 w-8 text-green-400 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-green-400">Start Free</h3>
              <p className="text-gray-400">Take our skill assessment to identify your strengths</p>
            </div>
          </div>
          <Link href="/tools/skill-assessment" className="btn-primary inline-flex items-center">
            Take Free Assessment
            <ArrowLeftIcon className="ml-2 h-4 w-4 rotate-180" />
          </Link>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <div key={tool.id} className={`glass rounded-xl p-8 relative ${tool.popular ? 'ring-2 ring-green-400' : ''}`}>
                {tool.popular && (
                  <div className="absolute -top-3 right-6 bg-green-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{tool.title}</h3>
                      <div className="flex items-center">
                        {tool.price === "Free" ? (
                          <span className="text-lg font-bold text-green-400">FREE</span>
                        ) : (
                          <span className="text-lg font-bold text-green-400">{tool.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
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
                  <Link 
                    href={`/tools/${tool.id}`}
                    className={tool.popular ? "btn-primary w-full text-center" : "w-full px-4 py-2 border border-green-400 text-green-400 rounded-lg hover:bg-green-400/10 transition-colors text-center"}
                  >
                    {tool.price === "Free" ? "Start Free" : "Start Trial"}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* All Tools Bundle */}
        <div className="glass rounded-xl p-8 bg-gradient-to-br from-green-900/20 to-green-800/20 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">Complete Tools Bundle</h3>
            <p className="text-xl text-gray-400">Get access to all premium tools and save 40%</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">4</div>
              <p className="text-gray-400">Premium Tools</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$39</div>
              <p className="text-gray-400"><span className="line-through text-gray-500">$63</span> per month</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">7 days</div>
              <p className="text-gray-400">Free trial</p>
            </div>
          </div>

          <div className="text-center">
            <button className="btn-primary text-lg px-8 py-3">
              Start Free Trial
            </button>
            <p className="text-sm text-gray-500 mt-2">Cancel anytime • No commitment</p>
          </div>
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