'use client'

import Link from 'next/link'
import { ArrowLeftIcon, ClockIcon, TagIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline'

export default function AnalyticsRoleTipsArticle() {
  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/articles" className="inline-flex items-center text-green-400 hover:text-green-300 mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Articles
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-400/20 text-green-400">
              <TagIcon className="h-3 w-3 mr-1" />
              Career Tips
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <ClockIcon className="h-3 w-3 mr-1" />
              4 min read
            </span>
            <span className="text-sm text-gray-500">06-07-2025</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Three Tips for Landing Your First Analytics Role
          </h1>
          
          <p className="text-xl text-gray-400 mb-6 leading-relaxed">
            Read about the three tips that we suggest that can help you really stand out in landing your first role in Analytics.
          </p>
          
          <div className="flex items-center justify-between border-b border-gray-800 pb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-900 font-bold text-sm">SD</span>
              </div>
              <div>
                <p className="font-medium text-white">Spencer Dobbs, Founder</p>
                <p className="text-sm text-gray-500">Published today</p>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg prose-invert max-w-none">
          <div className="text-gray-300 leading-relaxed">
            
            <p className="text-gray-300 mb-6 leading-relaxed">Breaking into analytics can feel overwhelming when you're competing against candidates with years of experience. But here's the reality: hiring managers are often more interested in potential and demonstrated skills than lengthy work histories.</p>

            <p className="text-gray-300 mb-8 leading-relaxed">After helping hundreds of aspiring analysts land their first roles, we've identified three strategies that consistently help candidates stand out from the crowd. These tips work whether you're transitioning from another field or fresh out of school.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Tip 1: Create a Comprehensive Skills Section on Your Resume</h2>

            <p className="text-gray-300 mb-4 leading-relaxed">When you don't have extensive analytics experience to showcase, your skills section becomes your best friend. This is where you can demonstrate that you're developing the technical foundation needed for the role.</p>

            <div className="bg-green-950/30 border border-green-400/30 rounded-lg p-6 mb-6">
              <h3 className="text-green-400 font-semibold mb-3">📋 Essential Skills to Highlight:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Data Manipulation</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• SQL (PostgreSQL, MySQL)</li>
                    <li>• Python (pandas, numpy)</li>
                    <li>• R (dplyr, tidyverse)</li>
                    <li>• Excel (pivot tables, VBA)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Visualization</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Tableau</li>
                    <li>• Power BI</li>
                    <li>• Looker/Looker Studio</li>
                    <li>• Python (matplotlib, seaborn)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Additional Tools</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Google Analytics</li>
                    <li>• AWS/GCP basics</li>
                    <li>• Git version control</li>
                    <li>• Statistical analysis</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">Be expansive here since this helps prove you're developing the required skills. Even if you've only used a tool for personal projects or online courses, include it. Hiring managers understand that entry-level candidates won't have commercial experience with everything.</p>

            <div className="bg-yellow-950/30 border border-yellow-400/30 rounded-lg p-4 mb-6">
              <p className="text-yellow-200"><strong>💡 Pro Tip:</strong> Organize your skills by proficiency level (Expert, Intermediate, Beginner) or by category (Programming, Visualization, Analysis). This shows self-awareness and helps hiring managers quickly identify your strongest areas.</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Tip 2: Build a Portfolio That Showcases Advanced Concepts</h2>

            <p className="text-gray-300 mb-4 leading-relaxed">A strong portfolio is your secret weapon for standing out without deep prior experience. It's tangible proof that you can do the work, not just talk about it.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-green-400">Portfolio Options That Impress:</h3>

            <div className="space-y-6 mb-8">
              <div className="bg-blue-950/30 border-l-4 border-blue-400 p-4">
                <h4 className="text-blue-400 font-semibold mb-2">📊 Analytics Dashboards</h4>
                <p className="text-gray-300 text-sm mb-2">Create interactive dashboards using real datasets. Show end-to-end analysis from data cleaning to insights.</p>
                <p className="text-gray-300 text-sm"><strong>Tools:</strong> Tableau Public, Power BI, or custom web dashboards</p>
              </div>

              <div className="bg-purple-950/30 border-l-4 border-purple-400 p-4">
                <h4 className="text-purple-400 font-semibold mb-2">📝 Analytics Blog</h4>
                <p className="text-gray-300 text-sm mb-2">Write about your analysis projects, methodology, and insights. This shows communication skills alongside technical ability.</p>
                <p className="text-gray-300 text-sm"><strong>Platforms:</strong> Medium, LinkedIn, or your own website</p>
              </div>

              <div className="bg-green-950/30 border-l-4 border-green-400 p-4">
                <h4 className="text-green-400 font-semibold mb-2">🌐 Full Analytics Website</h4>
                <p className="text-gray-300 text-sm mb-2">Build analytics tools and dashboards on your own website. This demonstrates diverse technical skills beyond traditional analytics.</p>
                <p className="text-gray-300 text-sm"><strong>Stack:</strong> React with Vercel deployment makes this surprisingly easy and really helps you stand out</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-green-400">Focus on Advanced Concepts</h3>

            <p className="text-gray-300 mb-4 leading-relaxed">Don't just show basic charts and simple statistics. Demonstrate that you understand sophisticated analytical thinking:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">📈 Statistical Analysis</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• A/B testing and hypothesis testing</li>
                  <li>• Customer segmentation using RFM</li>
                  <li>• Time series forecasting</li>
                  <li>• Cohort analysis</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">🎯 Business Applications</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Churn prediction models</li>
                  <li>• Marketing attribution analysis</li>
                  <li>• Operational efficiency studies</li>
                  <li>• Financial forecasting</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Tip 3: Network Strategically with Industry Professionals</h2>

            <p className="text-gray-300 mb-4 leading-relaxed">This might be the most uncomfortable tip, but it's often the most effective. Direct outreach to people in analytics roles can provide invaluable insights and sometimes lead to opportunities.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-green-400">Who to Reach Out To:</h3>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">🎯 Current Analytics Professionals</h4>
                <p className="text-gray-300 text-sm mb-2">People currently doing the job you want. They understand day-to-day realities and skill requirements.</p>
                <p className="text-gray-300 text-sm"><strong>Find them:</strong> LinkedIn, local analytics meetups, industry conferences</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-2">👥 Hiring Managers and Recruiters</h4>
                <p className="text-gray-300 text-sm mb-2">They know exactly what they're looking for and what makes candidates stand out.</p>
                <p className="text-gray-300 text-sm"><strong>Approach:</strong> Be genuinely curious about their perspective, not just asking for jobs</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-purple-400 font-semibold mb-2">🌱 Recent Career Changers</h4>
                <p className="text-gray-300 text-sm mb-2">People who recently transitioned into analytics can offer specific, actionable advice.</p>
                <p className="text-gray-300 text-sm"><strong>Value:</strong> They remember exactly what worked (and what didn't) in their job search</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-green-400">What to Ask:</h3>

            <div className="bg-indigo-950/30 border border-indigo-400/30 rounded-lg p-6 mb-6">
              <h4 className="text-indigo-400 font-semibold mb-3">💬 Conversation Starters That Work:</h4>
              <ul className="text-gray-300 space-y-2">
                <li>• "What skills are most important for someone just starting out?"</li>
                <li>• "What's one thing you wish you had known before entering analytics?"</li>
                <li>• "Are there any specific tools or technologies I should prioritize learning?"</li>
                <li>• "What does a typical day look like in your role?"</li>
                <li>• "What makes a candidate's portfolio stand out to you?"</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-green-400">How to Make the Connection:</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-white font-semibold mb-3">🔗 LinkedIn Outreach</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Personalize every message</li>
                  <li>• Mention something specific from their profile</li>
                  <li>• Ask for advice, not favors</li>
                  <li>• Keep initial messages brief</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">🤝 In-Person Events</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Local analytics meetups</li>
                  <li>• Data science conferences</li>
                  <li>• Industry networking events</li>
                  <li>• University alumni networks</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Putting It All Together</h2>

            <p className="text-gray-300 mb-4 leading-relaxed">These three strategies work best when used together. A comprehensive skills section gets you past initial screenings, a strong portfolio demonstrates your capabilities, and strategic networking provides insights that help you tailor your approach.</p>

            <div className="bg-gradient-to-r from-green-900 to-blue-900 p-6 rounded-lg mb-6">
              <h3 className="text-green-400 font-semibold mb-4">🎯 Your 30-Day Action Plan:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Week 1-2: Resume & Skills</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Audit your current technical skills</li>
                    <li>• Restructure your resume skills section</li>
                    <li>• Identify 2-3 skills to develop further</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Week 3-4: Portfolio Development</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Choose your portfolio format</li>
                    <li>• Start your first project</li>
                    <li>• Set up your online presence</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Ongoing: Networking</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Reach out to 2-3 people per week</li>
                    <li>• Attend one networking event monthly</li>
                    <li>• Follow up on conversations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Monthly Review</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Update portfolio with new projects</li>
                    <li>• Refine resume based on feedback</li>
                    <li>• Expand professional network</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Remember: Progress Over Perfection</h2>

            <p className="text-gray-300 mb-4 leading-relaxed">Don't wait until everything is perfect to start applying. These strategies are about demonstrating growth and potential, not achieving expertise overnight. Hiring managers want to see that you're proactive about learning and genuinely interested in analytics work.</p>

            <p className="text-gray-300 mb-6 leading-relaxed">The analytics field is growing rapidly, and companies need people who can grow with them. By showing strong fundamentals, practical skills, and genuine engagement with the community, you'll position yourself as exactly the type of candidate they're looking for.</p>

            <div className="bg-green-950/30 border border-green-400/30 rounded-lg p-4 mb-6">
              <p className="text-green-200">Your first analytics role is out there. These three strategies will help you find it faster and with more confidence. Start with whichever tip feels most achievable right now, and build momentum from there.</p>
            </div>

          </div>
        </article>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Was this helpful?</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-400/20 text-green-400 rounded text-sm hover:bg-green-400/30 transition-colors">
                  👍 Yes
                </button>
                <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded text-sm hover:bg-gray-700 transition-colors">
                  👎 No
                </button>
              </div>
            </div>
            
            <Link href="/articles" className="text-green-400 hover:text-green-300 text-sm">
              Read More Articles →
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
} 