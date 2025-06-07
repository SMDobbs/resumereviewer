'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, BookOpenIcon, DocumentTextIcon, FolderIcon, SparklesIcon, UserGroupIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'
import Logo from './Logo'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, logout } = useUser()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll function for landing page sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Check if we're on the landing page
  const isLandingPage = pathname === '/'

  // Navigation items for landing page (public)
  const landingNavItems = [
    { scrollTo: 'home', label: 'Home' },
    { scrollTo: 'about', label: 'About' },
    { scrollTo: 'features', label: 'Features' },
    { scrollTo: 'pricing', label: 'Pricing' },
    { scrollTo: 'team', label: 'Team' },
  ]

  // Navigation items for authenticated users
  const authenticatedNavItems = [
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

  const navItems = isLandingPage ? landingNavItems : authenticatedNavItems

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
    }, 100)
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

  // Dynamic navbar classes and styles based on scroll position
  const navbarStyle = isScrolled 
    ? {} 
    : { 
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid transparent'
      }

  const navbarClasses = isScrolled 
    ? "fixed top-0 left-0 right-0 z-50 glass-nav border-b border-gray-800/50 transition-all duration-300"
    : "fixed top-0 left-0 right-0 z-50 transition-all duration-300"

  return (
    <nav className={navbarClasses} style={navbarStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo variant="navbar" showText={true} size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={item.label || index} className="relative">
                {'isDropdown' in item && item.isDropdown ? (
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
                    {activeDropdown === item.label && 'dropdownItems' in item && (
                      <div className="absolute top-full left-0 w-64 glass rounded-xl border border-gray-700/50 shadow-xl">
                        <div className="p-2">
                          {item.dropdownItems?.map((dropdownItem: { href: string; label: string; icon: React.ComponentType<{ className?: string }>; description: string }) => {
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
                ) : 'scrollTo' in item ? (
                  <button
                    onClick={() => scrollToSection(item.scrollTo)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-300 hover:text-green-400 hover:bg-green-400/5"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href!)
                        ? 'text-green-400 bg-green-400/10'
                        : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Auth Buttons / User Menu */}
            <div className="flex items-center space-x-3 ml-6">
              {isLandingPage ? (
                // Landing page - show login/signup buttons
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
              ) : loading ? (
                <div className="w-9 h-9 bg-gray-800 animate-pulse rounded-full"></div>
              ) : user ? (
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
              ) : null}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Auth Buttons / User Avatar */}
            {isLandingPage ? (
              <button 
                onClick={handleSignIn}
                className="text-green-400 text-sm font-medium"
              >
                Sign In
              </button>
            ) : loading ? (
              <div className="w-8 h-8 bg-gray-800 animate-pulse rounded-full"></div>
            ) : user ? (
              <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-sm font-medium">{getUserInitials()}</span>
              </div>
            ) : null}
            
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
              {navItems.map((item, index) => (
                <div key={item.label || index}>
                  {'isDropdown' in item && item.isDropdown ? (
                    <div>
                      <div className="px-3 py-2 text-sm font-medium text-gray-400 uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="ml-4 space-y-1">
                        {'dropdownItems' in item && item.dropdownItems?.map((dropdownItem: { href: string; label: string; icon: React.ComponentType<{ className?: string }>; description: string }) => {
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
                  ) : 'scrollTo' in item ? (
                    <button
                      onClick={() => {
                        scrollToSection(item.scrollTo)
                        setIsOpen(false)
                      }}
                      className="block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors text-gray-300 hover:text-green-400 hover:bg-green-400/5"
                    >
                      {item.label}
                    </button>
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
              {isLandingPage ? (
                <div className="mt-6 pt-4 border-t border-gray-800/50">
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
                </div>
              ) : user && (
                <div className="mt-6 pt-4 border-t border-gray-800/50">
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