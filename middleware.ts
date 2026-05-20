import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin auth
  if (pathname.startsWith("/admin")) {
    const isLogin = pathname === "/admin/login";
    const session = request.cookies.get("admin_session")?.value;

    if (!isLogin && session !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (isLogin && session === "authenticated") {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.url)
      );
    }

    return NextResponse.next();
  }

  // Skip APIs
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};