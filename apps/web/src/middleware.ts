import { NextResponse } from "next/server";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { UserResponseDto } from "@icat/contracts";
import { auth } from "@icat/lib/auth/auth";

const UserProtectedRoutes = [NavigationUrls.PROFILE, NavigationUrls.BOOKINGS, NavigationUrls.CHECKOUT];
const AdminProtectedRoutes = ["/dashboard"];
const ProtectedRoutes = [...UserProtectedRoutes, ...AdminProtectedRoutes];

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;

  const sessionUser = req.auth?.user as UserResponseDto;
  const isAdmin = sessionUser?.role === "admin";

  const isProtected = ProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !req.auth) {
    const signinUrl = new URL(NavigationUrls.SIGNIN, origin);
    signinUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signinUrl);
  }

  const isAdminProtectedRoute = AdminProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && isAdminProtectedRoute && !isAdmin) {
    const dashboardUrl = new URL(NavigationUrls.HOME, origin);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/dashboard/:path*",
    "/bookings/:path*",
    "/profile",
    "/checkout",
  ],

  runtime: "nodejs",
};
