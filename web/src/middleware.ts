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
    '/users',
    '/pumps',
    '/tanks',
    '/transactions',
    '/api/set_password',
  ]

  const clerkRoutes = [
    '/users',
    '/pumps',
    '/tanks',
    '/transactions',
  ];

  if (token) {
    // if we have a token here, it is verified, we can now decode it using edge runtime compatible jwt-decode module.
    const decodedJwt = jwtDecode<any>(token);
    // TODO more condition based on roles from decodedJwt
    if (!decodedJwt.role) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (
      (adminRoutes.some((adminroute) => req.nextUrl.pathname.startsWith(adminroute)) &&
        (decodedJwt.role !== 'admin')) &&
      (clerkRoutes.some((clerkroute) => req.nextUrl.pathname.startsWith(clerkroute)) &&
        (decodedJwt.role !== 'clerk'))
    ) {
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
    '/tanks/:path*',
    '/transactions/:path*',
    '/api/set_password/:path*',
  ],
};
