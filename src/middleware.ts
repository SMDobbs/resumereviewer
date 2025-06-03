import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './lib/auth'

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
  
  if (sessionCookie) {
    try {
      const session = await verifySession(sessionCookie)
      isAuthenticated = !!session
    } catch {
      // JWT verification failed, user is not authenticated
      isAuthenticated = false
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
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Redirect to dashboard if trying to access auth routes while authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 