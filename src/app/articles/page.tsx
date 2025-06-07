'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeftIcon, ChartBarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline'

export default function ArticlesPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setMessage('Please enter your email address')
      setMessageType('error')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(),
          source: 'articles_page'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setMessageType('success')
        setEmail('') // Clear form on success
      } else {
        setMessage(data.error || 'Failed to subscribe')
        setMessageType('error')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setMessage('Failed to subscribe. Please try again.')
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const articles = [
    {
      id: 1,
      title: "How Target Uses Analytics to Predict Customer Behavior",
      excerpt: "Discover the fascinating analytics behind Target's customer prediction models and how they revolutionized retail analytics.",
      category: "Retail Analytics",
      readTime: "8 min read",
      date: "2 days ago",
      premium: false
    },
    {
      id: 2,
      title: "5 SQL Skills That Got Me Hired at a Fortune 500",
      excerpt: "The specific SQL techniques that made me stand out in technical interviews and helped me land my dream role.",
      category: "Career Tips",
      readTime: "6 min read",
      date: "5 days ago",
      premium: false
    }
  ]

  const categories = ["All", "Career Tips", "Tech Analytics", "Retail Analytics", "Portfolio", "Career Journey"]

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Awesome Analytics</span> Series
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Weekly articles showcasing brilliant analytics solutions from top companies, career insights, 
            and practical tips for landing your first analytics role.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "All" 
                  ? "bg-green-400 text-gray-900" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {articles.map((article) => (
            <article key={article.id} className="glass rounded-xl p-6 card-hover">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-400/20 text-green-400">
                  <TagIcon className="h-3 w-3 mr-1" />
                  {article.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  {article.readTime}
                </span>
              </div>
              
              <h2 className="text-xl font-semibold mb-3 hover:text-green-400 transition-colors cursor-pointer">
                {article.title}
              </h2>
              
              <p className="text-gray-400 mb-4">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{article.date}</span>
                <Link href={`/articles/${article.id}`} className="text-green-400 hover:text-green-300 text-sm inline-flex items-center">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 glass rounded-xl p-8 text-center">
          <ChartBarIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Never Miss an Article</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Get weekly insights on analytics solutions from top companies and career tips delivered to your inbox.
          </p>
          
          {message && (
            <div className={`mb-4 p-3 rounded-lg ${
              messageType === 'success' 
                ? 'bg-green-400/20 text-green-400 border border-green-400/30' 
                : 'bg-red-400/20 text-red-400 border border-red-400/30'
            }`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-400 text-white disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 