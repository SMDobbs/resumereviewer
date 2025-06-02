import Link from 'next/link'
import { ArrowLeftIcon, BookOpenIcon, LockClosedIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function GuidesPage() {
  const guides = [
    {
      id: 1,
      title: "Complete Guide to Landing Your First Analytics Role",
      description: "Everything you need to know about breaking into analytics, from skills to networking to interview prep.",
      price: "$47",
      topics: [
        "Building the right skill foundation",
        "Creating a standout resume",
        "Networking strategies that work",
        "Interview preparation framework",
        "Salary negotiation tactics"
      ],
      pageCount: 85,
      isPremium: true
    },
    {
      id: 2,
      title: "SQL Mastery for Analytics Interviews",
      description: "Master the SQL skills that actually matter in interviews with real questions from top companies.",
      price: "$37",
      topics: [
        "Essential SQL concepts",
        "Window functions mastery",
        "Query optimization",
        "Real interview questions",
        "Practice problems with solutions"
      ],
      pageCount: 120,
      isPremium: true
    },
    {
      id: 3,
      title: "Python for Analytics: Zero to Interview Ready",
      description: "Learn Python specifically for analytics roles with practical examples and interview prep.",
      price: "$37",
      topics: [
        "Python basics for analysts",
        "Pandas and data manipulation",
        "Data visualization",
        "Statistical analysis",
        "Interview coding challenges"
      ],
      pageCount: 95,
      isPremium: true
    },
    {
      id: 4,
      title: "Best Visualization Tools for Analysts",
      description: "Comprehensive comparison of BI tools and when to use each one in your career.",
      price: "$27",
      topics: [
        "Tableau vs Power BI vs Looker",
        "When to use each tool",
        "Building impressive dashboards",
        "Tool-specific tips",
        "Free alternatives"
      ],
      pageCount: 65,
      isPremium: true
    },
    {
      id: 5,
      title: "Building Your Analytics Portfolio",
      description: "Create a portfolio that gets you noticed and showcases your analytics skills effectively.",
      price: "$0",
      topics: [
        "Choosing the right projects",
        "Project presentation tips",
        "GitHub best practices",
        "Creating a blog",
        "Portfolio examples"
      ],
      pageCount: 45,
      isPremium: false
    },
    {
      id: 6,
      title: "Interview Success Framework",
      description: "Proven strategies for acing analytics interviews from behavioral to technical rounds.",
      price: "$47",
      topics: [
        "Types of analytics interviews",
        "Behavioral question framework",
        "Technical preparation",
        "Case study approach",
        "Follow-up strategies"
      ],
      pageCount: 75,
      isPremium: true
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-green-400 mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            Premium <span className="gradient-text">Analytics Guides</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            In-depth guides written by experienced analysts to help you land your first role and accelerate your career.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <div key={guide.id} className="glass rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{guide.title}</h2>
                  <p className="text-gray-400 mb-4">{guide.description}</p>
                </div>
                {guide.isPremium && (
                  <LockClosedIcon className="h-5 w-5 text-yellow-400 flex-shrink-0 ml-4" />
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  {guide.topics.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    <BookOpenIcon className="h-4 w-4 inline mr-1" />
                    {guide.pageCount} pages
                  </span>
                  {guide.isPremium ? (
                    <span className="text-2xl font-bold text-green-400">{guide.price}</span>
                  ) : (
                    <span className="text-xl font-bold text-green-400">FREE</span>
                  )}
                </div>
                <Link 
                  href={`/guides/${guide.id}`} 
                  className={guide.isPremium ? "btn-primary" : "btn-secondary"}
                >
                  {guide.isPremium ? "Get Access" : "Download Free"}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bundle Offer */}
        <div className="mt-16 glass rounded-xl p-8 bg-gradient-to-br from-green-900/20 to-green-800/20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">Complete Guide Bundle</h3>
            <p className="text-xl text-gray-400">Get all premium guides and save 40%</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">6</div>
              <p className="text-gray-400">Premium Guides</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
              <p className="text-gray-400">Pages of Content</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$127</div>
              <p className="text-gray-400"><span className="line-through text-gray-500">$212</span> Total Value</p>
            </div>
          </div>

          <div className="text-center">
            <button className="btn-primary text-lg px-8 py-3">
              Get Complete Bundle
            </button>
            <p className="text-sm text-gray-500 mt-2">Instant download • Lifetime access</p>
          </div>
        </div>
      </div>
    </div>
  )
} 