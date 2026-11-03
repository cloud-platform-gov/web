import { cache } from "react"

import { GatewayError, gatewayFetch, getSessionToken } from "@/lib/gateway"
import type { LoginResponse, User } from "@/lib/api/types"

export function register(input: {
  name: string
  email: string
  password: string
}) {
  return gatewayFetch<{ user: User }>("/identity/register", {
    method: "POST",
    body: input,
  })
}

export function login(input: { email: string; password: string }) {
  return gatewayFetch<LoginResponse>("/identity/login", {
    method: "POST",
    body: input,
  })
}

export function logout() {
  return gatewayFetch<void>("/identity/logout", {
    method: "POST",
    auth: true,
    redirectOnUnauthorized: false,
  })
}

/**
 * The signed-in user, or null when there is no (valid) session.
 * Deduplicated per request so layout and pages can both call it.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  if (!(await getSessionToken())) return null
  try {
    const { user } = await gatewayFetch<{ user: User }>("/identity/me", {
      auth: true,
      redirectOnUnauthorized: false,
    })
    return user
  } catch (error) {
    if (error instanceof GatewayError && error.status === 401) return null
    throw error
  }
})
