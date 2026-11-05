import { cookies } from "next/headers"

import { SESSION_COOKIE } from "@/lib/gateway"

/** Only callable from Server Actions and Route Handlers. */
export async function setSession(token: string, expiresInSeconds: number) {
  ;(await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: expiresInSeconds,
  })
}

export async function clearSession() {
  ;(await cookies()).delete({ name: SESSION_COOKIE, path: "/" })
}

/** Only allow same-site relative redirects after login. */
export function safeNext(next: FormDataEntryValue | string | null | undefined) {
  const value = typeof next === "string" ? next : ""
  return value.startsWith("/") && !value.startsWith("//") ? value : "/"
}
