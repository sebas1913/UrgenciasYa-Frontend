// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import cookie from 'cookie';

export function middleware(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const token = cookies.auth; // Obtener el token de las cookies

  // Si la ruta es protegida y no hay token, redirige a la página de login (en este caso, la home con el modal)
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirige a la home para abrir el modal de login
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/profile-user/:path*', '/chat/:id*', '/admin/:path*'], 
};
