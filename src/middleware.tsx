import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const protectedUrl = ["/CreateUser", "/ClientMember", "/Member"];

const authMiddleware = withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;

    if (
      protectedUrl.some((url) => pathname.startsWith(url)) &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export function middleware(req: NextRequestWithAuth, event: any) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/user", req.url));
  } else if (!protectedUrl.some((url) => pathname.startsWith(url))) {
    return NextResponse.next();
  }

  return authMiddleware(req, event);
}

// Apply middleware to all routes
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
