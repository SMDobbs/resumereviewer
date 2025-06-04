/**
 * Session utility functions for handling authentication issues
 * These functions help clear cookies, cache, and reset user sessions
 */

/**
 * Comprehensive function to clear all authentication-related data
 * This should resolve most cookie/cache related login issues
 */
export async function clearAuthenticationData(): Promise<boolean> {
  try {
    // 1. Call the server-side clear cookies endpoint
    const response = await fetch('/api/auth/clear-cookies', {
      method: 'POST',
    })
    
    if (!response.ok) {
      console.warn('Server-side cookie clearing failed, continuing with client-side clearing')
    }
    
    // 2. Clear all cookies manually (comprehensive approach)
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Clear cookies with different domain/path combinations
    const cookiesToClear = ['session', '__Secure-session', '__Host-session']
    const domains = ['', '.localhost', window.location.hostname]
    const paths = ['/', '/api', '/auth']
    
    cookiesToClear.forEach(cookieName => {
      domains.forEach(domain => {
        paths.forEach(path => {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; ${domain ? `domain=${domain};` : ''}`
        })
      })
    })
    
    // 3. Clear localStorage and sessionStorage
    try {
      localStorage.clear()
      sessionStorage.clear()
    } catch (e) {
      console.warn('Could not clear storage:', e)
    }
    
    // 4. Clear service worker caches
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
      } catch (e) {
        console.warn('Could not clear caches:', e)
      }
    }
    
    // 5. Clear any IndexedDB data (if your app uses it)
    if ('indexedDB' in window) {
      try {
        // This is a basic approach - you might need to customize based on your DB names
        const databases = ['auth', 'session', 'user-data']
        databases.forEach(dbName => {
          const deleteReq = indexedDB.deleteDatabase(dbName)
          deleteReq.onerror = () => console.warn(`Could not delete ${dbName} database`)
        })
      } catch (e) {
        console.warn('Could not clear IndexedDB:', e)
      }
    }
    
    return true
  } catch (error) {
    console.error('Error clearing authentication data:', error)
    return false
  }
}

/**
 * Check if the current session appears to be in a problematic state
 */
export function detectSessionIssues(): {
  hasStaleSession: boolean
  hasMultipleCookies: boolean
  issues: string[]
} {
  const issues: string[] = []
  let hasStaleSession = false
  let hasMultipleCookies = false
  
  try {
    // Check for multiple session cookies
    const cookies = document.cookie.split(';')
    const sessionCookies = cookies.filter(cookie => 
      cookie.trim().startsWith('session=') || 
      cookie.trim().startsWith('__Secure-session=') ||
      cookie.trim().startsWith('__Host-session=')
    )
    
    if (sessionCookies.length > 1) {
      hasMultipleCookies = true
      issues.push('Multiple session cookies detected')
    }
    
    // Check for stale localStorage data
    try {
      const userData = localStorage.getItem('user')
      const userContext = localStorage.getItem('user-context')
      if (userData || userContext) {
        hasStaleSession = true
        issues.push('Stale user data in localStorage')
      }
    } catch (e) {
      // localStorage not available or accessible
    }
    
    // Check for inconsistent session state
    const hasSessionCookie = sessionCookies.length > 0
    const hasLocalUserData = localStorage.getItem('user') !== null
    
    if (hasSessionCookie && !hasLocalUserData) {
      issues.push('Session cookie exists but no user data')
    } else if (!hasSessionCookie && hasLocalUserData) {
      issues.push('User data exists but no session cookie')
    }
    
  } catch (error) {
    console.warn('Error detecting session issues:', error)
    issues.push('Could not analyze session state')
  }
  
  return {
    hasStaleSession,
    hasMultipleCookies,
    issues
  }
}

/**
 * Force a clean authentication state
 * This is the nuclear option for when everything else fails
 */
export async function forceCleanAuthState(): Promise<void> {
  await clearAuthenticationData()
  
  // Additional cleanup for Next.js specific items
  try {
    // Clear Next.js router cache if possible
    if ('router' in window && typeof (window as any).router?.reload === 'function') {
      (window as any).router.reload()
    } else {
      // Fallback to full page reload
      window.location.reload()
    }
  } catch (e) {
    console.warn('Could not reload router, falling back to page reload')
    window.location.reload()
  }
}

/**
 * Get a user-friendly error message based on common authentication issues
 */
export function getAuthErrorMessage(errorMessage: string): {
  message: string
  canClearCookies: boolean
  shouldShowHelp: boolean
} {
  const lowerError = errorMessage.toLowerCase()
  
  if (lowerError.includes('access denied') || lowerError.includes('unauthorized')) {
    return {
      message: 'Access denied. Your session may have expired or become corrupted.',
      canClearCookies: true,
      shouldShowHelp: true
    }
  }
  
  if (lowerError.includes('invalid') && (lowerError.includes('token') || lowerError.includes('session'))) {
    return {
      message: 'Your session is invalid. This usually happens when authentication data becomes corrupted.',
      canClearCookies: true,
      shouldShowHelp: true
    }
  }
  
  if (lowerError.includes('expired')) {
    return {
      message: 'Your session has expired. Please log in again.',
      canClearCookies: true,
      shouldShowHelp: false
    }
  }
  
  if (lowerError.includes('network') || lowerError.includes('fetch')) {
    return {
      message: 'Network error occurred. Please check your connection and try again.',
      canClearCookies: false,
      shouldShowHelp: false
    }
  }
  
  // Default case
  return {
    message: errorMessage,
    canClearCookies: true,
    shouldShowHelp: true
  }
} 