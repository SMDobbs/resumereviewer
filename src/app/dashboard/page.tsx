'use client'

import { useUser } from '@/lib/context/UserContext'
import { UserIcon, ChartBarIcon, DocumentTextIcon, CloudArrowDownIcon, AcademicCapIcon, SparklesIcon, TrophyIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, loading, logout } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text">{user.firstName}</span>!
              </h1>
              <p className="text-xl text-gray-400">
                Your analytics career journey continues here
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center px-4 py-2 bg-green-400/20 text-green-400 rounded-lg border border-green-400/30">
                <SparklesIcon className="h-5 w-5 mr-2" />
                <span className="font-semibold">Premium Member</span>
              </div>
              <button 
                onClick={logout}
                className="px-4 py-2 border border-red-400 text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <ChartBarIcon className="h-6 w-6 text-green-400 mr-3" />
            Analytics Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* SQL Assessment */}
            <Link href="/tools/skill-assessment" className="glass rounded-xl p-6 card-hover block h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mr-4">
                  <ChartBarIcon className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">SQL Analytics Assessment</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-4">Test your SQL skills with 20 real-world questions and get AI-powered feedback</p>
              <div className="flex items-center text-sm text-green-400">
                <TrophyIcon className="h-4 w-4 mr-1" />
                Track your progress
              </div>
            </Link>

            {/* Resume Reviewer */}
            <Link href="/resume-reviewer" className="glass rounded-xl p-6 card-hover block h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center mr-4">
                  <DocumentTextIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">AI Resume Reviewer</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-4">Get instant feedback on your analytics resume with ATS optimization</p>
              <div className="flex items-center text-sm text-blue-400">
                <SparklesIcon className="h-4 w-4 mr-1" />
                AI-powered analysis
              </div>
            </Link>

            {/* Data Export */}
            <Link href="/tools/data-export" className="glass rounded-xl p-6 card-hover block h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center mr-4">
                  <CloudArrowDownIcon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Data Export & API Access</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-4">Real business datasets for portfolio projects and dashboard building</p>
              <div className="flex items-center text-sm text-purple-400">
                <CloudArrowDownIcon className="h-4 w-4 mr-1" />
                Professional datasets
              </div>
            </Link>
          </div>
        </div>

        {/* Career Resources */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold flex items-center">
              <DocumentTextIcon className="h-6 w-6 text-green-400 mr-3" />
              Career Resources
            </h2>
            <Link href="/resources" className="text-green-400 hover:text-green-300 flex items-center">
              View All Resources <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured Resources */}
            <div className="glass rounded-xl p-6 h-full">
              <h3 className="text-xl font-semibold mb-4">Resume Templates</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Lead Data Analyst Resume</h4>
                    <p className="text-sm text-gray-400">Professional template • PDF format</p>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CloudArrowDownIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">Available</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Entry-Level Analytics Resume</h4>
                    <p className="text-sm text-gray-400">Skills-based format • Career changers</p>
                  </div>
                  <div className="flex items-center text-blue-400">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">Coming Soon</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Analytics Manager Resume</h4>
                    <p className="text-sm text-gray-400">Leadership focus • Director level</p>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">Coming Soon</span>
                  </div>
                </div>
              </div>
              <Link href="/resources" className="btn-primary w-full">
                Browse All Templates
              </Link>
            </div>

            {/* Recent Articles */}
            <div className="glass rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Awesome Analytics Series</h3>
                <Link href="/articles" className="text-green-400 hover:text-green-300 text-sm">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                <article>
                  <Link href="/articles/analytics-portfolio-project-guide">
                    <h4 className="font-medium mb-1 hover:text-green-400 cursor-pointer transition-colors">
                      Three Tips for Landing Your First Analytics Role
                    </h4>
                  </Link>
                  <p className="text-gray-400 text-sm mb-1">
                    Read about the three tips that we suggest that can help you really stand out in landing your first role in Analytics.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    4 min read • 06-07-2025
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        {/* User Info & Coaching */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Profile & Account Info */}
          <div className="glass rounded-xl p-6 h-full">
            <div className="flex items-center mb-6">
              <UserIcon className="h-8 w-8 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold">Profile & Account</h3>
            </div>
            
            {/* Profile Information */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3 text-gray-300">Profile Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Full Name</label>
                  <p className="text-white font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <p className="text-white font-medium">{user.email}</p>
                </div>
                {user.currentRole && (
                  <div>
                    <label className="text-sm text-gray-400">Current Role</label>
                    <p className="text-white font-medium">{user.currentRole}</p>
                  </div>
                )}
                {user.experience !== null && (
                  <div>
                    <label className="text-sm text-gray-400">Experience</label>
                    <p className="text-white font-medium">{user.experience} years</p>
                  </div>
                )}
                {user.industry && (
                  <div>
                    <label className="text-sm text-gray-400">Industry</label>
                    <p className="text-white font-medium">{user.industry}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Account Status */}
            <div className="border-t border-gray-800 pt-6">
              <h4 className="text-lg font-medium mb-3 text-gray-300">Account Status</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Role</label>
                  <p className="text-white font-medium capitalize">{user.role.toLowerCase()}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Membership</label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-400 text-gray-900 border border-green-400">
                    <SparklesIcon className="h-4 w-4 mr-1" />
                    PREMIUM
                  </span>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Member Since</label>
                  <p className="text-white font-medium">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coaching Options */}
          <div className="glass rounded-xl p-6 h-full">
            <div className="flex items-center mb-4">
              <AcademicCapIcon className="h-8 w-8 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold">1-on-1 Coaching</h3>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Get personalized guidance from experienced analysts who've helped hundreds land their first roles.
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-3 bg-blue-400/10 border border-blue-400/20 rounded-lg">
                <h4 className="font-medium text-blue-400">Career Strategy Session</h4>
                <p className="text-sm text-gray-400">60 min • $99.99</p>
              </div>
              <div className="p-3 bg-purple-400/10 border border-purple-400/20 rounded-lg">
                <h4 className="font-medium text-purple-400">Resume & LinkedIn Review</h4>
                <p className="text-sm text-gray-400">30 min • $49.99</p>
              </div>
              <div className="p-3 bg-green-400/10 border border-green-400/20 rounded-lg">
                <h4 className="font-medium text-green-400">Mock Interview Session</h4>
                <p className="text-sm text-gray-400">45 min • $74.99</p>
              </div>
            </div>
            <Link href="/coaching" className="btn-primary w-full">
              Book Coaching Session
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-xl p-6 h-full">
            <div className="flex items-center mb-6">
              <SparklesIcon className="h-8 w-8 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold">Quick Actions</h3>
            </div>
            <div className="space-y-4">
              <Link href="/tools/skill-assessment" className="block p-4 border border-green-400/20 rounded-lg hover:bg-green-400/10 transition-colors">
                <div className="flex items-center mb-2">
                  <ChartBarIcon className="h-5 w-5 text-green-400 mr-3" />
                  <h4 className="font-semibold text-green-400">Take Assessment</h4>
                </div>
                <p className="text-sm text-gray-400">Test your SQL skills</p>
              </Link>
              
              <Link href="/tools" className="block p-4 border border-blue-400/20 rounded-lg hover:bg-blue-400/10 transition-colors">
                <div className="flex items-center mb-2">
                  <SparklesIcon className="h-5 w-5 text-blue-400 mr-3" />
                  <h4 className="font-semibold text-blue-400">Explore Tools</h4>
                </div>
                <p className="text-sm text-gray-400">Browse all analytics tools</p>
              </Link>
              
              <Link href="/resources" className="block p-4 border border-purple-400/20 rounded-lg hover:bg-purple-400/10 transition-colors">
                <div className="flex items-center mb-2">
                  <DocumentTextIcon className="h-5 w-5 text-purple-400 mr-3" />
                  <h4 className="font-semibold text-purple-400">Get Templates</h4>
                </div>
                <p className="text-sm text-gray-400">Download resume templates</p>
              </Link>
              
              <Link href="/articles" className="block p-4 border border-yellow-400/20 rounded-lg hover:bg-yellow-400/10 transition-colors">
                <div className="flex items-center mb-2">
                  <DocumentTextIcon className="h-5 w-5 text-yellow-400 mr-3" />
                  <h4 className="font-semibold text-yellow-400">Read Articles</h4>
                </div>
                <p className="text-sm text-gray-400">Latest analytics insights</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 