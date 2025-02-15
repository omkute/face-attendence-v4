import { NextResponse } from 'next/server'

// Add the paths that don't need authentication
const publicPaths = ['/login', '/register', '/']

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  // Allow public paths
  if (publicPaths.includes(path)) {
    return NextResponse.next()
  }

  // Redirect to login if no token is present
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Continue with the request if token exists
  return NextResponse.next()
}

// Add the paths that should be protected by the middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    // Add more protected routes here
  ]
}