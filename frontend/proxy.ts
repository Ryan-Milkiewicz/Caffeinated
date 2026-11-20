import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = ".AspNetCore.Identity.Application";

export function proxy(req: NextRequest) {
  if (!req.cookies.has(AUTH_COOKIE)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/feed/:path*",
    "/discover/:path*",
    "/cafes/:path*",
    "/coffees/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
  ],
};
