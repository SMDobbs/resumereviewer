'use client'

import { useState } from 'react'
import { 
  DocumentTextIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  CheckCircleIcon,
  LockClosedIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'
import Link from 'next/link'

interface Template {
  id: string
  name: string
  category: string
  description: string
  preview: string
  tags: string[]
  featured: boolean
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const { user } = useUser()

  // Check if user can use the feature
  const canUseFeature = user && (user.remainingReviews === undefined || user.remainingReviews > 0 || user.subscriptionStatus === 'PREMIUM')
  const needsPayment = !user

  const templates: Template[] = [
    {
      id: 'senior-lead-analyst',
      name: 'Lead Data Analyst',
      category: 'analytics',
      description: 'Professional template designed for senior analytics leadership roles with proven results and strategic impact',
      preview: '/resume_senior.pdf',
      tags: ['Senior', 'Leadership', 'Analytics', 'ATS-Friendly'],
      featured: true
    },
    {
      id: 'modern-analyst',
      name: 'Modern Data Analyst',
      category: 'analytics',
      description: 'Clean, modern design perfect for data analysts and business intelligence roles',
      preview: '/templates/modern-analyst-preview.jpg',
      tags: ['ATS-Friendly', 'Modern', 'Analytics', 'Coming Soon'],
      featured: true
    },
    {
      id: 'executive-analyst',
      name: 'Executive Professional',  
      category: 'analytics',
      description: 'Professional template for senior positions and leadership roles',
      preview: '/templates/executive-analyst-preview.jpg',
      tags: ['Executive', 'Leadership', 'Professional', 'Coming Soon'],
      featured: true
    },
  ]

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'analytics', name: 'Analytics', count: templates.filter(t => t.category === 'analytics').length },
    { id: 'technical', name: 'Technical', count: templates.filter(t => t.category === 'technical').length },
    { id: 'general', name: 'General', count: templates.filter(t => t.category === 'general').length }
  ]

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  const handleDownload = (template: Template) => {
    if (!canUseFeature) {
      // Show authentication/payment modal
      return
    }
    
    // Handle actual file download
    if (template.id === 'senior-lead-analyst') {
      // Create a link to download resume_senior.pdf
      const link = document.createElement('a')
      link.href = '/resume_senior.pdf'
      link.download = 'Lead_Data_Analyst_Resume_Template.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // For other templates, show placeholder for now
      alert(`${template.name} template is coming soon!`)
    }
  }

  const handlePreview = (template: Template) => {
    if (!canUseFeature) {
      // Show authentication/payment modal
      return
    }
    setSelectedTemplate(template)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative pb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-transparent to-green-400/5"></div>
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-400/20 border border-green-400/30 rounded-full mb-6">
              <DocumentTextIcon className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-400">Professional Templates</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              Resume Templates
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Choose from our collection of professionally designed, ATS-optimized resume templates. 
              Each template is crafted to help you stand out while passing through applicant tracking systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/resume-reviewer" 
                className="btn-secondary px-6 py-3 font-semibold flex items-center"
              >
                <SparklesIcon className="h-5 w-5 mr-2" />
                Review Resume First
              </Link>
              {needsPayment && (
                <Link href="/checkout" className="inline-flex items-center px-4 py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full hover:bg-yellow-400/30 transition-colors">
                  <LockClosedIcon className="h-4 w-4 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-yellow-400">
                    $4.99 for templates access
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>


        {/* Category Filter */}
        <div className="mt-8 mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-green-400 text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* All Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => {
            const isComingSoon = template.tags.includes('Coming Soon')
            const isDisabled = needsPayment || isComingSoon
            
            return (
              <div key={template.id} className={`glass rounded-2xl overflow-hidden card-hover flex flex-col h-full ${isDisabled ? 'opacity-60' : ''}`}>
                <div className="relative h-48 bg-gray-800 flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    <DocumentTextIcon className="h-16 w-16" />
                  </div>
                  {template.featured && !isComingSoon && (
                    <div className="absolute top-3 right-3">
                      <div className="inline-flex items-center px-2 py-1 bg-green-400/20 border border-green-400/30 rounded-full">
                        <span className="text-xs font-medium text-green-400">Featured</span>
                      </div>
                    </div>
                  )}
                  {isComingSoon && (
                    <div className="absolute top-3 right-3">
                      <div className="inline-flex items-center px-2 py-1 bg-orange-400/20 border border-orange-400/30 rounded-full">
                        <span className="text-xs font-medium text-orange-400">Coming Soon</span>
                      </div>
                    </div>
                  )}
                  {needsPayment && !isComingSoon && (
                    <div className="absolute top-3 left-3">
                      <div className="w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
                        <LockClosedIcon className="h-3 w-3 text-yellow-400" />
                      </div>
                    </div>
                  )}
                </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{template.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{template.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {template.tags.filter(tag => tag !== 'Coming Soon').map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handlePreview(template)}
                    disabled={isDisabled}
                    className="flex-1 btn-secondary py-3 px-4 text-sm font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    {isComingSoon ? (
                      <>
                        <span className="text-orange-400 mr-2">🔜</span>
                        Preview
                      </>
                    ) : needsPayment ? (
                      <>
                        <LockClosedIcon className="h-4 w-4 mr-2" />
                        Preview
                      </>
                    ) : (
                      <>
                        <EyeIcon className="h-4 w-4 mr-2" />
                        Preview
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDownload(template)}
                    disabled={isDisabled}
                    className="flex-1 btn-primary py-3 px-4 text-sm font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  >
                    {isComingSoon ? (
                      <>
                        <span className="text-orange-400 mr-2">🔜</span>
                        Download
                      </>
                    ) : needsPayment ? (
                      <>
                        <LockClosedIcon className="h-4 w-4 mr-2" />
                        Download
                      </>
                    ) : (
                      <>
                        <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                        Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            )
          })}
        </div>

        {/* Template Guidelines */}
        <div className="mt-20">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Template Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-4">Customization Tips</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    Tailor content to match the job description
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    Use consistent formatting throughout
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    Include relevant keywords from industry
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    Keep to 1-2 pages maximum
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-4">ATS Optimization</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    All templates are ATS-friendly
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    Standard fonts and formatting used
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    Clear section headers and structure
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    Machine-readable format preserved
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Simple CTA for Non-Users */}
        {needsPayment && (
          <div className="mt-16 text-center">
            <Link 
              href="/checkout" 
              className="inline-flex items-center px-6 py-3 bg-green-400/20 border border-green-400/30 rounded-full hover:bg-green-400/30 transition-colors"
            >
              <CurrencyDollarIcon className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-green-400 font-medium">Get access for $4.99</span>
            </Link>
          </div>
        )}

        {/* Preview Modal */}
        {selectedTemplate && canUseFeature && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
            <div className="glass rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{selectedTemplate.name}</h3>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-gray-400 hover:text-white transition-colors text-2xl"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                {selectedTemplate.id === 'senior-lead-analyst' ? (
                  <>
                    <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden m-6">
                      <iframe
                        src="/resume_senior.pdf"
                        className="w-full h-full"
                        title="Resume Preview"
                      />
                    </div>
                    <div className="p-6 pt-0 flex gap-4 flex-wrap">
                      <button
                        onClick={() => window.open('/resume_senior.pdf', '_blank')}
                        className="btn-secondary px-6 py-3 font-semibold flex items-center"
                      >
                        <EyeIcon className="h-5 w-5 mr-2" />
                        View Full Screen
                      </button>
                      <button
                        onClick={() => handleDownload(selectedTemplate)}
                        className="btn-primary px-6 py-3 font-semibold flex items-center"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                        Download Template
                      </button>
                      <button
                        onClick={() => setSelectedTemplate(null)}
                        className="btn-secondary px-6 py-3 font-semibold"
                      >
                        Close Preview
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center m-6">
                      <div className="text-center">
                        <DocumentTextIcon className="h-24 w-24 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">Template preview would display here</p>
                        <p className="text-sm text-gray-500 mt-2">Full preview available after download</p>
                      </div>
                    </div>
                    <div className="p-6 pt-0 flex gap-4">
                      <button
                        onClick={() => handleDownload(selectedTemplate)}
                        className="btn-primary px-6 py-3 font-semibold flex items-center"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                        Download Template
                      </button>
                      <button
                        onClick={() => setSelectedTemplate(null)}
                        className="btn-secondary px-6 py-3 font-semibold"
                      >
                        Close Preview
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 