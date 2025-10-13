import { NextResponse } from "next/server";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar";
import { auth } from "@icat/lib/auth/auth";

const ProtectedRoutes = ["/dashboard", "/profile", "/bookings"];

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;

  const isProtected = ProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !req.auth) {
    const signinUrl = new URL(NavigationUrls.SIGNIN, origin);
    signinUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signinUrl);
  }

  if (isProtected && req.auth?.user.role === "admin") {
    const dashboardUrl = new URL(DashboardNavigationUrls.BOOKINGS, origin);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/dashboard/:path*",
    "/profile/:path*",
    "/bookings/:path*",
  ],
};
