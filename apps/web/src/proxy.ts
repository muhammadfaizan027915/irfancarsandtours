import { NextResponse } from "next/server";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { UserResponseDto } from "@icat/contracts";
import { auth } from "@icat/lib/auth/auth";

const UserProtectedRoutes = [
  NavigationUrls.PROFILE,
  NavigationUrls.BOOKINGS,
  NavigationUrls.CHECKOUT,
];
const AdminProtectedRoutes = ["/dashboard"];

export const proxy = auth((req) => {
  const { pathname, origin } = req.nextUrl;

  const sessionUser = req.auth?.user as UserResponseDto;
  const isAdmin = sessionUser?.role === "admin";

  const isUserProtectedRoute = UserProtectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isUserProtectedRoute && !req.auth) {
    const signinUrl = new URL(NavigationUrls.SIGNIN, origin);
    signinUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signinUrl);
  }

  const isAdminProtectedRoute = AdminProtectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isAdminProtectedRoute && (!req.auth || !isAdmin)) {
    return NextResponse.rewrite(new URL("/404", req.url));
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
};
