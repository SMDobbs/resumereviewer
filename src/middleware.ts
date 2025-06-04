import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './lib/auth-edge'

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/tools/1', // Individual premium tools require auth
  '/tools/2',
  '/tools/3', 
  '/tools/4',
  '/resources',
  '/learning',
  '/industry'
]

// Routes that should redirect to dashboard if user is already authenticated
const authRoutes = [
  '/login',
  '/signup'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get session from cookies - use JWT verification only (no DB queries in middleware)
  const sessionCookie = request.cookies.get('session')?.value
  let isAuthenticated = false
  let sessionError = false
  
  if (sessionCookie) {
    try {
      const session = await verifySession(sessionCookie)
      isAuthenticated = !!session
    } catch (error) {
      // JWT verification failed, user is not authenticated
      console.warn('Session verification failed in middleware:', error)
      isAuthenticated = false
      sessionError = true
    }
  }
  
  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Check if this is an auth route (login/signup)
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Redirect to login if trying to access protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    
    // If there was a session error, add a query parameter to indicate cookie clearing might help
    if (sessionError) {
      loginUrl.searchParams.set('error', 'session_invalid')
    }
    
    const response = NextResponse.redirect(loginUrl)
    
    // Add cache control headers to prevent caching of redirect responses
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  }
  
  // Redirect to dashboard if trying to access auth routes while authenticated
  if (isAuthRoute && isAuthenticated) {
    const response = NextResponse.redirect(new URL('/dashboard', request.url))
    
    // Add cache control headers
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  }
  
  // For all other requests, add cache control headers if they involve authentication
  const response = NextResponse.next()
  
  // Add cache control headers for authenticated routes or auth-related pages
  if (isProtectedRoute || isAuthRoute || sessionCookie) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }
  
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 