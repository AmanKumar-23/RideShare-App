import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Instead of looking for cookies, we'll check the Authorization header
  // But since we can't access localStorage in middleware, we'll need to modify our approach
  
  // For protected routes, we'll redirect to login if there's no token in localStorage
  // This will be handled by the client-side AuthContext instead
  
  // We'll keep this simple and just let the client-side handle auth
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/rides/:path*',
    '/profile/:path*',
    '/login',
    '/register'
  ]
};