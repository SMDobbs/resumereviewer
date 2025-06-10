import React from 'react'
import Link from 'next/link'
import { EnvelopeIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Logo variant="footer" showText={true} size="md" />
            <p className="mt-4 text-gray-400 text-lg max-w-md">
              AI-powered resume optimization to help you land your dream analytics role. 
              Professional templates and expert feedback in seconds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/resume-reviewer" 
                  className="text-gray-400 hover:text-green-400 transition-colors flex items-center"
                >
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  AI Resume Reviewer
                </Link>
              </li>
              <li>
                <Link 
                  href="/templates" 
                  className="text-gray-400 hover:text-green-400 transition-colors flex items-center"
                >
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  Resume Templates
                </Link>
              </li>
              <li>
                <Link 
                  href="/checkout" 
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <div className="space-y-3">
              <a 
                href="mailto:support@analyticsresumereview.com"
                className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
              >
                <EnvelopeIcon className="h-4 w-4 mr-2 group-hover:text-green-400" />
                support@analyticsresumereview.com
              </a>
              <p className="text-sm text-gray-500">
                Get help with your resume review, templates, or account questions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 Analytics Resume Review. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link 
                href="/privacy" 
                className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 