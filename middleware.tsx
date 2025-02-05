import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (token || pathname.includes("/api/auth")) {
    return NextResponse.next();
  }

  // TO HANDLE WHEN USER IS NOT LOGGED IN
  // ======================================================
  // if (!token && pathname !== "/login") {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }
}

export const config = {
  matcher: "/",
};
