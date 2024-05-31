import { authHandler } from "@/auth";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const session = await authHandler();

  if (session && session.user) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/player", "/team"],
};
