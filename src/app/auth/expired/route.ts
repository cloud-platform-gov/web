import { NextResponse, type NextRequest } from "next/server"

import { SESSION_COOKIE } from "@/lib/gateway"

/** Clears a session the gateway rejected (expired JWT) and returns to login. */
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL("/login?expired=1", request.url)
  )
  response.cookies.delete({ name: SESSION_COOKIE, path: "/" })
  return response
}
