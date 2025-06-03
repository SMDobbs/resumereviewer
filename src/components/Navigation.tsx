'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, BookOpenIcon, DocumentTextIcon, FolderIcon, SparklesIcon, UserGroupIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, logout } = useUser()

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

  const navItems = user ? protectedNavItems : publicNavItems

  const isActive = (href: string) => pathname === href

  const handleSignIn = () => {
    router.push('/login')
  }

  const handleSignUp = () => {
    router.push('/signup')
  }

  const handleSignOut = async () => {
    try {
      await logout()
      setIsOpen(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 100) // Small delay to prevent flickering
  }

  const closeDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(null)
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.firstName) return 'U'
    return user.firstName.charAt(0).toUpperCase() + (user.lastName?.charAt(0).toUpperCase() || '')
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
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-300 hover:text-green-400 hover:bg-green-400/5"
                    >
                      {item.label}
                      <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 w-64 glass rounded-xl border border-gray-700/50 shadow-xl">
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
              {loading ? (
                <div className="w-9 h-9 bg-gray-800 animate-pulse rounded-full"></div>
              ) : !user ? (
                <>
                  <button 
                    onClick={handleSignIn}
                    className="px-4 py-2 text-gray-300 hover:text-green-400 transition-colors text-sm font-medium"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={handleSignUp}
                    className="btn-primary px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-green-400/25"
                  >
                    Get Started
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  {/* User Dropdown */}
                  <div 
                    className="relative"
                    onMouseEnter={() => handleMouseEnter('user')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-400/5 transition-colors">
                      <div className="w-9 h-9 bg-green-400/20 rounded-full flex items-center justify-center ring-2 ring-green-400/20">
                        <span className="text-green-400 text-sm font-medium">{getUserInitials()}</span>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-200">{user.firstName}</div>
                        <div className="text-xs text-gray-400 capitalize">
                          {user.subscriptionStatus === 'PREMIUM' ? (
                            <span className="text-green-400">Premium</span>
                          ) : (
                            user.subscriptionStatus.toLowerCase()
                          )}
                        </div>
                      </div>
                      <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User Dropdown Menu */}
                    {activeDropdown === 'user' && (
                      <div className="absolute top-full right-0 w-56 glass rounded-xl border border-gray-700/50 shadow-xl">
                        <div className="p-2">
                          <div className="px-3 py-2 border-b border-gray-700/50 mb-2">
                            <div className="font-medium text-gray-200">{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                          </div>
                          <Link
                            href="/dashboard"
                            className="flex items-center p-3 rounded-lg hover:bg-green-400/5 transition-colors group"
                            onClick={closeDropdown}
                          >
                            <UserIcon className="h-5 w-5 text-green-400 mr-3" />
                            <span className="text-gray-200 group-hover:text-green-400">Dashboard</span>
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center p-3 rounded-lg hover:bg-red-400/5 transition-colors group"
                          >
                            <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-400 mr-3" />
                            <span className="text-red-400">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Auth Buttons */}
            {loading ? (
              <div className="w-8 h-8 bg-gray-800 animate-pulse rounded-full"></div>
            ) : !user ? (
              <button 
                onClick={handleSignIn}
                className="text-green-400 text-sm font-medium"
              >
                Sign In
              </button>
            ) : (
              <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-sm font-medium">{getUserInitials()}</span>
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
              
              {/* Mobile Auth Section */}
              {!loading && (
                <div className="mt-6 pt-4 border-t border-gray-800/50">
                  {!user ? (
                    <div className="space-y-3">
                      <button 
                        onClick={() => {
                          handleSignIn()
                          setIsOpen(false)
                        }}
                        className="w-full px-3 py-2 text-left rounded-lg text-gray-300 hover:text-green-400 hover:bg-green-400/5 transition-colors"
                      >
                        Sign In
                      </button>
                      <button 
                        onClick={() => {
                          handleSignUp()
                          setIsOpen(false)
                        }}
                        className="w-full btn-primary py-3 text-center font-semibold"
                      >
                        Get Started
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="px-3 py-2 text-sm text-gray-400">
                        Signed in as <span className="text-green-400">{user.firstName}</span>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-green-400 hover:bg-green-400/5 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <UserIcon className="h-5 w-5 mr-3 text-green-400" />
                        Dashboard
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/5 transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation 