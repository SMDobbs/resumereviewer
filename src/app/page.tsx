'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  CurrencyDollarIcon,
  CloudArrowUpIcon,
  ChartBarIcon,
  LightBulbIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'

export default function Home() {
  const { user, loading } = useUser()
  const router = useRouter()

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render landing page if user is authenticated (will redirect)
  if (user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: SparklesIcon,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your resume against industry standards and job requirements",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: DocumentTextIcon,
      title: "Professional Templates",
      description: "ATS-friendly templates designed by career experts and used by successful candidates",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: CheckCircleIcon,
      title: "ATS Optimization",
      description: "Ensure your resume passes applicant tracking systems with smart keyword optimization",
      color: "from-purple-400 to-pink-500"
    }
  ]

  const reviewSteps = [
    {
      step: "Upload",
      icon: CloudArrowUpIcon,
      description: "Drag & drop your resume",
      detail: "Supports PDF, DOCX, DOC, TXT"
    },
    {
      step: "Analyze", 
      icon: ChartBarIcon,
      description: "AI analyzes in seconds",
      detail: "Content, formatting, keywords, ATS compliance"
    },
    {
      step: "Improve",
      icon: LightBulbIcon, 
      description: "Get actionable feedback",
      detail: "Specific recommendations with priority scores"
    }
  ]

  const sampleScores = [
    { category: "Content Quality", score: 8.5, color: "bg-green-400" },
    { category: "Formatting", score: 7.2, color: "bg-yellow-400" },
    { category: "ATS Compatibility", score: 9.1, color: "bg-green-400" },
    { category: "Keywords", score: 6.8, color: "bg-orange-400" }
  ]

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <div className="relative pt-32 pb-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-green-950/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-green-400/30 rounded-full mb-8 backdrop-blur-sm">
              <SparklesIcon className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-400">AI-Powered Resume Optimization</span>
            </div>
            
            <h1 className="text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-green-400 bg-clip-text text-transparent">
                Perfect Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Resume
              </span>
            </h1>
            
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
              Get professional AI-powered feedback on your resume in seconds. 
              <span className="text-green-400 font-semibold">Land your dream job</span> with expert optimization and premium templates.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link 
                href="/checkout" 
                className="group relative px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-green-400/25 transition-all duration-300 hover:scale-105 flex items-center"
              >
                Get Started - $4.99
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/resume-reviewer" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center"
              >
                See How It Works
                <DocumentTextIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Pricing Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl">
              <CurrencyDollarIcon className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-gray-300">
                <strong className="text-green-400">$4.99</strong> for 5 reviews + all templates
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Review Tool Showcase */}
      <div className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-green-400/20 border border-green-400/30 rounded-full mb-6">
              <ChartBarIcon className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-400">See What You Get</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              AI Resume Reviewer
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional AI analysis that gives you detailed feedback to help you stand out and get hired
            </p>
          </div>

          {/* Process Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {reviewSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="glass rounded-3xl p-8 card-hover text-center h-full">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-10 w-10 text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{index + 1}</div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{step.description}</h3>
                  <p className="text-gray-400 text-lg">{step.detail}</p>
                </div>
                {/* Connection Line */}
                {index < reviewSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-400/50 to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          {/* Mock Results Dashboard */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Detailed Analysis Results</h3>
                <p className="text-gray-400 text-lg mb-8">
                  Get comprehensive feedback with specific scores, actionable recommendations, and ATS optimization tips.
                </p>
                
                {/* Sample Score Breakdown */}
                <div className="space-y-6">
                  {sampleScores.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-300 font-medium">{item.category}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-700 rounded-full h-2 mr-4">
                          <div 
                            className={`h-2 rounded-full ${item.color} transition-all duration-1000`}
                            style={{ width: `${item.score * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-bold text-lg w-8">{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                {/* Mock Interface */}
                <div className="glass rounded-2xl p-6 border border-gray-600/50">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-semibold text-white">Overall Score</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-green-400 mb-2">8.1</div>
                    <p className="text-gray-400">Above Average</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                      <div className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-green-400 font-medium">Strong technical skills section</p>
                          <p className="text-gray-400 text-sm">Good use of relevant keywords</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                      <div className="flex items-start">
                        <LightBulbIcon className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-yellow-400 font-medium">Add quantified achievements</p>
                          <p className="text-gray-400 text-sm">Include specific metrics and results</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Features Grid */}
      <div className="py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Why Choose Our AI?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built specifically for modern job markets with advanced AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="glass rounded-3xl p-8 card-hover text-center h-full overflow-hidden">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Pricing Section */}
      <div className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-400/20 border border-green-400/30 rounded-full mb-8">
            <CurrencyDollarIcon className="h-4 w-4 text-green-400 mr-2" />
            <span className="text-sm font-medium text-green-400">Simple Pricing</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            One Price. Full Access.
          </h2>
          <p className="text-xl text-gray-400 mb-16">
            Pay once, get everything you need to succeed.
          </p>

          <div className="relative">
            <div className="glass rounded-3xl p-12 border-2 border-green-400/30 bg-gradient-to-br from-green-400/5 to-emerald-400/5">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="px-6 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 rounded-full font-semibold text-sm">
                  BEST VALUE
                </div>
              </div>
              
              <div className="text-7xl font-bold text-white mb-4">
                <span className="text-green-400">$4.99</span>
              </div>
              <div className="text-xl text-gray-400 mb-12">Everything you need to succeed</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
                {[
                  "5 AI-powered resume reviews",
                  "Access to all premium templates", 
                  "Detailed scoring & analysis",
                  "ATS optimization recommendations",
                  "Keyword optimization guidance",
                  "Industry-specific feedback"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/checkout" 
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 rounded-2xl font-bold text-xl shadow-xl hover:shadow-green-400/25 transition-all duration-300 hover:scale-105"
              >
                Purchase Now - $4.99
                <ArrowRightIcon className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <p className="text-gray-500 mt-6 text-lg">
                Reviews never expire • Pay again when you need more
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern CTA Section */}
      <div className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-transparent to-green-400/5"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
            Ready to <span className="text-green-400">Transform</span> Your Resume?
          </h2>
          <p className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Join thousands of professionals who've improved their resumes and landed better jobs
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/checkout" 
              className="group px-10 py-5 bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 rounded-2xl font-bold text-xl shadow-xl hover:shadow-green-400/25 transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              Get Started - $4.99
              <ArrowRightIcon className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/templates" 
              className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            >
              View Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
