import Link from 'next/link'
import { ChartBarIcon, BookOpenIcon, SparklesIcon, UserGroupIcon, DocumentTextIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const user = {
    firstName: "Demo User",
    email: "demo@analyticsmentor.com"
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user.firstName || 'Future Analyst'}</span>!
          </h1>
          <p className="text-gray-400">
            Your journey to landing your first analytics role starts here. Let's get you interview-ready!
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mr-4">
                <DocumentTextIcon className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">3/10</div>
                <div className="text-gray-400 text-sm">Articles Read</div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center mr-4">
                <SparklesIcon className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-gray-400 text-sm">Tools Used</div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center mr-4">
                <BookOpenIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">1</div>
                <div className="text-gray-400 text-sm">Guides Completed</div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-4">
                <UserGroupIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-gray-400 text-sm">Coaching Sessions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Premium Tools */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Get Interview-Ready with Premium Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/tools/resume-reviewer" className="group block">
                  <div className="glass rounded-lg p-4 card-hover">
                    <div className="w-10 h-10 bg-purple-400/20 rounded-lg flex items-center justify-center mb-3">
                      <SparklesIcon className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-green-400 transition-colors">
                      AI Resume Reviewer
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Get instant feedback on your analytics resume
                    </p>
                    <span className="text-green-400 text-sm">Use Now →</span>
                  </div>
                </Link>

                <Link href="/tools/mock-interview" className="group block">
                  <div className="glass rounded-lg p-4 card-hover">
                    <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center mb-3">
                      <UserGroupIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-green-400 transition-colors">
                      AI Mock Interviewer
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Practice with real analytics interview questions
                    </p>
                    <span className="text-green-400 text-sm">Practice Now →</span>
                  </div>
                </Link>

                <Link href="/tools/linkedin-optimizer" className="group block">
                  <div className="glass rounded-lg p-4 card-hover">
                    <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center mb-3">
                      <DocumentTextIcon className="h-5 w-5 text-yellow-400" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-green-400 transition-colors">
                      LinkedIn Optimizer
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Optimize your profile for recruiter searches
                    </p>
                    <span className="text-green-400 text-sm">Optimize Now →</span>
                  </div>
                </Link>

                <Link href="/tools/skill-assessment" className="group block">
                  <div className="glass rounded-lg p-4 card-hover">
                    <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center mb-3">
                      <ChartBarIcon className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-green-400 transition-colors">
                      Skill Assessment
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Identify gaps and get a personalized learning path
                    </p>
                    <span className="text-green-400 text-sm">Take Quiz →</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Latest Articles */}
            <div className="glass rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Latest from Awesome Analytics Series</h2>
                <Link href="/articles" className="text-green-400 hover:text-green-300 text-sm">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                <article className="border-b border-gray-800 pb-4">
                  <h3 className="font-semibold mb-2 hover:text-green-400 cursor-pointer">
                    How Target Uses Analytics to Predict Customer Behavior
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Discover the fascinating analytics behind Target's customer prediction models...
                  </p>
                  <span className="text-xs text-gray-500">Published 2 days ago</span>
                </article>

                <article className="border-b border-gray-800 pb-4">
                  <h3 className="font-semibold mb-2 hover:text-green-400 cursor-pointer">
                    5 SQL Skills That Got Me Hired at a Fortune 500
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    The specific SQL techniques that made me stand out in technical interviews...
                  </p>
                  <span className="text-xs text-gray-500">Published 5 days ago</span>
                </article>

                <article>
                  <h3 className="font-semibold mb-2 hover:text-green-400 cursor-pointer">
                    Building Your First Analytics Portfolio Project
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Step-by-step guide to creating a portfolio that gets you noticed...
                  </p>
                  <span className="text-xs text-gray-500">Published 1 week ago</span>
                </article>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Your Roadmap */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Your Roadmap</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 font-bold mr-3">1.</span>
                  <div>
                    <p className="font-medium">Complete Skill Assessment</p>
                    <p className="text-gray-400 text-sm">Know where you stand</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 font-bold mr-3">2.</span>
                  <div>
                    <p className="font-medium text-gray-500">Review Your Resume</p>
                    <p className="text-gray-500 text-sm">Get AI-powered feedback</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 font-bold mr-3">3.</span>
                  <div>
                    <p className="font-medium text-gray-500">Practice Interviews</p>
                    <p className="text-gray-500 text-sm">Build confidence</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 font-bold mr-3">4.</span>
                  <div>
                    <p className="font-medium text-gray-500">Book Coaching</p>
                    <p className="text-gray-500 text-sm">Get personalized guidance</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Book Coaching CTA */}
            <div className="glass rounded-xl p-6 bg-gradient-to-br from-green-900/20 to-green-800/20">
              <h3 className="text-lg font-semibold mb-2">Ready for 1-on-1 Guidance?</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get personalized coaching from experienced analysts who've been where you are.
              </p>
              <Link href="/coaching" className="btn-primary inline-flex items-center w-full justify-center">
                Book Coaching Session
                <UserGroupIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Free Resources */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Free Resources</h3>
              <div className="space-y-2">
                <Link href="/resources/resume-templates" className="block text-green-400 hover:text-green-300 text-sm">
                  → Resume Templates
                </Link>
                <Link href="/resources/blog-templates" className="block text-green-400 hover:text-green-300 text-sm">
                  → Analytics Blog Templates
                </Link>
                <Link href="/guides/sql-basics" className="block text-green-400 hover:text-green-300 text-sm">
                  → SQL Learning Guide (Free)
                </Link>
                <Link href="/articles/interview-tips" className="block text-green-400 hover:text-green-300 text-sm">
                  → Interview Tips Article
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  You read "SQL Skills That Matter"
                </div>
                <div className="flex items-center text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  You used the Resume Reviewer
                </div>
                <div className="flex items-center text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  You downloaded SQL Guide
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 