'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, BookOpenIcon, DocumentTextIcon, FolderIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false) // Demo state - replace with real auth
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const publicNavItems = [
    { href: '/', label: 'Home' },
    { 
      label: 'Learn',
      isDropdown: true,
      dropdownItems: [
        { href: '/articles', label: 'Articles', icon: DocumentTextIcon, description: 'Weekly analytics insights' },
        { href: '/guides', label: 'Premium Guides', icon: BookOpenIcon, description: 'In-depth career guides' },
        { href: '/resources', label: 'Free Resources', icon: FolderIcon, description: 'Templates & tools' },
      ]
    },
    { href: '/tools', label: 'Tools', icon: SparklesIcon },
    { href: '/coaching', label: 'Coaching', icon: UserGroupIcon },
  ]

  const protectedNavItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { 
      label: 'Learn',
      isDropdown: true,
      dropdownItems: [
        { href: '/articles', label: 'Articles', icon: DocumentTextIcon, description: 'Weekly analytics insights' },
        { href: '/guides', label: 'Premium Guides', icon: BookOpenIcon, description: 'In-depth career guides' },
        { href: '/resources', label: 'Free Resources', icon: FolderIcon, description: 'Templates & tools' },
      ]
    },
    { href: '/tools', label: 'Tools', icon: SparklesIcon },
    { href: '/coaching', label: 'Coaching', icon: UserGroupIcon },
  ]

  const navItems = isSignedIn ? protectedNavItems : publicNavItems

  const isActive = (href: string) => pathname === href

  const handleSignIn = () => {
    setIsSignedIn(true)
    // In a real app, this would redirect to login page or open modal
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
    // In a real app, this would clear session and redirect
  }

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-400/25 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span className="font-bold text-xl gradient-text">Analytics Mentor</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label || item.href} className="relative">
                {item.isDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => toggleDropdown(item.label)}
                    onMouseLeave={closeDropdown}
                  >
                    <button
                      className="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-300 hover:text-green-400 hover:bg-green-400/5"
                    >
                      {item.label}
                      <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-64 glass rounded-xl border border-gray-700/50 shadow-xl">
                        <div className="p-2">
                          {item.dropdownItems?.map((dropdownItem) => {
                            const Icon = dropdownItem.icon
                            return (
                              <Link
                                key={dropdownItem.href}
                                href={dropdownItem.href}
                                className="flex items-start p-3 rounded-lg hover:bg-green-400/5 transition-colors group"
                                onClick={closeDropdown}
                              >
                                <Icon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-gray-200 group-hover:text-green-400 transition-colors">
                                    {dropdownItem.label}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {dropdownItem.description}
                                  </div>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href!)
                        ? 'text-green-400 bg-green-400/10 shadow-sm'
                        : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-6">
              {!isSignedIn ? (
                <>
                  <button 
                    onClick={handleSignIn}
                    className="px-4 py-2 text-gray-300 hover:text-green-400 transition-colors text-sm font-medium"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={handleSignIn}
                    className="btn-primary px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-green-400/25"
                  >
                    Get Started
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="w-9 h-9 bg-green-400/20 rounded-full flex items-center justify-center ring-2 ring-green-400/20">
                    <span className="text-green-400 text-sm font-medium">U</span>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-red-400 transition-colors text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Auth Buttons */}
            {!isSignedIn ? (
              <button 
                onClick={handleSignIn}
                className="text-green-400 text-sm font-medium"
              >
                Sign In
              </button>
            ) : (
              <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-sm font-medium">U</span>
              </div>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400 transition-colors"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-4 pb-6 space-y-2 border-t border-gray-800/50 mt-2">
              {navItems.map((item) => (
                <div key={item.label || item.href}>
                  {item.isDropdown ? (
                    <div>
                      <div className="px-3 py-2 text-sm font-medium text-gray-400 uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="ml-4 space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => {
                          const Icon = dropdownItem.icon
                          return (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-green-400 hover:bg-green-400/5 transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <Icon className="h-5 w-5 mr-3 text-green-400" />
                              {dropdownItem.label}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive(item.href!)
                          ? 'text-green-400 bg-green-400/10'
                          : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Sign Up Button */}
              {!isSignedIn && (
                <button 
                  onClick={() => {
                    handleSignIn()
                    setIsOpen(false)
                  }}
                  className="w-full mt-6 btn-primary py-3 text-center font-semibold"
                >
                  Get Started
                </button>
              )}
              
              {isSignedIn && (
                <button 
                  onClick={() => {
                    handleSignOut()
                    setIsOpen(false)
                  }}
                  className="w-full mt-6 text-red-400 py-3 text-center font-medium"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation 