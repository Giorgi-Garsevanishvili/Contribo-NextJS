import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL("/", request.url));

  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/user", request.nextUrl));
  }
}

//rewrite -- option to keep legacy but serve for different source

// export const config = {
//   matcher: "/user",
// };
