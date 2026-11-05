import { NextResponse, type NextRequest } from "next/server"

// Optimistic check only: the services validate the JWT on every call.
const SESSION_COOKIE = "session"
const PROTECTED = ["/requests", "/admin"]
const GUEST_ONLY = ["/login", "/register"]

function matches(pathname: string, prefixes: string[]) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const hasSession = request.cookies.has(SESSION_COOKIE)

  if (!hasSession && matches(pathname, PROTECTED)) {
    const url = new URL("/login", request.url)
    url.searchParams.set("next", `${pathname}${search}`)
    return NextResponse.redirect(url)
  }

  if (hasSession && matches(pathname, GUEST_ONLY)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/requests/:path*", "/admin/:path*", "/login", "/register"],
}
