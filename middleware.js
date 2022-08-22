import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //Token exists if user is logged in
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  });

  const { pathname, origin } = req.nextUrl;
  if (pathname.startsWith("/_next")) return NextResponse.next();

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname !== "/login")
      if (pathname !== "/successLogout")
        return NextResponse.redirect(`${origin}/login`);
      else return NextResponse.next();
  }
}
