import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  if (pathname === "/limitReached" && pathname !== "/login") {
    return NextResponse.redirect(`${origin}/login`);
  }
}
