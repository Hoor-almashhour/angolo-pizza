import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};