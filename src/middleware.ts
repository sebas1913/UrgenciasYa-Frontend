import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import cookie from 'cookie';

// Middleware file for views authentication and protection. Import 'Cookies' library.

export function middleware(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.auth; 

  // Validations for routes' protection.

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url)); 
  }

  return NextResponse.next();
};

// Protected routes.

export const config = {
  matcher: ['/profile-user/:path*', '/chat/:id*', '/admin/:path*'], 
};
