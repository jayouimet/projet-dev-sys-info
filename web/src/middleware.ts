import { jwtDecode } from 'jwt-decode';
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;

  // if the JWT can't be validated because it has been tampered with, getToken will return null
  const token = await getToken({
    req,
    secret,
    raw: true,
  });

  const adminRoutes = [
    '/dashboard',
    '/users',
    '/pumps',
    '/tanks',
    '/transactions',
    '/pump',
    '/api/set_password',
  ]

  const clerkRoutes = [
    '/dashboard',
    '/users',
    '/pumps',
    '/tanks',
    '/transactions',
    '/pump',
  ];

  const userRoutes = [
    '/pump',
  ];

  if (token) {
    // if we have a token here, it is verified, we can now decode it using edge runtime compatible jwt-decode module.
    const decodedJwt = jwtDecode<any>(token);
    // TODO more condition based on roles from decodedJwt
    if (!decodedJwt.role) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    let allowedRoutes: Array<string> = [];
    if (decodedJwt.role === 'admin') {
      allowedRoutes = adminRoutes;
    } else if (decodedJwt.role === 'clerk') {
      allowedRoutes = clerkRoutes;
    } else if (decodedJwt.role === 'user') {
      allowedRoutes = userRoutes;
    }

    if (!allowedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
      if (decodedJwt.role === 'user') {
        return NextResponse.redirect(new URL('/pump', req.url));
      }
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  } else {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/pumps/:path*',
    '/pump/:path*',
    '/tanks/:path*',
    '/transactions/:path*',
    '/api/set_password/:path*',
  ],
};
