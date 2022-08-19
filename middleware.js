import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { limitReached } = req;
  console.log(limitReached);
}
