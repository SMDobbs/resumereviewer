import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './lib/auth-edge'

// Public routes that don't require authentication
const publicRoutes = [
  '/', // Landing page
  '/login',
  '/signup',
  '/articles', // Learning articles are public
]

// API routes that should be accessible
const publicApiRoutes = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
  '/api/auth/clear',
  '/api/auth/clear-cookies'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow public API routes
  if (publicApiRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }
  
  // Allow public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route))) {
    return NextResponse.next()
  }
  
  // Check if user is authenticated
  const sessionCookie = request.cookies.get('session')?.value
  let isAuthenticated = false
  
  if (sessionCookie) {
    try {
      const session = await verifySession(sessionCookie)
      isAuthenticated = !!session
    } catch (error) {
      console.warn('Session verification failed:', error)
      isAuthenticated = false
    }
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
} 