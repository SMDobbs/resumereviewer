'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { ArrowRightOnRectangleIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useUser } from '@/lib/context/UserContext'
import Logo from './Logo'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, logout } = useUser()

  // Prevent hydration mismatch by only showing auth-dependent content after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Simple navigation items - Home is always present
  const navItems = [
    { href: '/', label: 'Home' }, // Always show Home - behavior handled by homepage logic
    { href: '/resume-reviewer', label: 'AI Reviewer', icon: SparklesIcon },
    { href: '/templates', label: 'Templates', icon: DocumentTextIcon },
  ]

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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-green-400 bg-green-400/10'
                    : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                {item.label}
              </Link>
            ))}

            {/* Auth Buttons / User Info */}
            <div className="flex items-center space-x-3 ml-6">
              {!mounted || loading ? (
                <div className="w-9 h-9 bg-gray-800 animate-pulse rounded-full"></div>
              ) : user ? (
                <div className="flex items-center space-x-4">
                  {/* Reviews Counter */}
                  {user.remainingReviews !== undefined && (
                    <div className="px-3 py-1 bg-green-400/20 border border-green-400/30 rounded-full">
                      <span className="text-sm font-medium text-green-400">
                        {user.remainingReviews} reviews left
                      </span>
                    </div>
                  )}
                  
                  {/* User Avatar and Info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-green-400/20 rounded-full flex items-center justify-center ring-2 ring-green-400/20">
                      <span className="text-green-400 text-sm font-medium">{getUserInitials()}</span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-200">{user.firstName}</div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      title="Sign Out"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                // Show login/signup buttons only if user is not logged in
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
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile User Info */}
            {!mounted || loading ? (
              <div className="w-8 h-8 bg-gray-800 animate-pulse rounded-full"></div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                {user.remainingReviews !== undefined && (
                  <div className="px-2 py-1 bg-green-400/20 border border-green-400/30 rounded-full">
                    <span className="text-xs font-medium text-green-400">
                      {user.remainingReviews}
                    </span>
                  </div>
                )}
                <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-sm font-medium">{getUserInitials()}</span>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleSignIn}
                className="text-green-400 text-sm font-medium"
              >
                Sign In
              </button>
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
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-green-400 bg-green-400/10'
                      : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              {!mounted || loading ? (
                <div className="mt-6 pt-4 border-t border-gray-800/50">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-800 rounded w-24 mb-2"></div>
                    <div className="h-8 bg-gray-800 rounded"></div>
                  </div>
                </div>
              ) : user ? (
                <div className="mt-6 pt-4 border-t border-gray-800/50">
                  <div className="space-y-3">
                    <div className="px-3 py-2 text-sm text-gray-400">
                      Signed in as <span className="text-green-400">{user.firstName}</span>
                    </div>
                    {user.remainingReviews !== undefined && (
                      <div className="px-3 py-2">
                        <div className="inline-flex items-center px-3 py-1 bg-green-400/20 border border-green-400/30 rounded-full">
                          <span className="text-sm font-medium text-green-400">
                            {user.remainingReviews} reviews remaining
                          </span>
                        </div>
                      </div>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center px-3 py-2 rounded-lg text-red-400 hover:bg-red-400/5 transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation 