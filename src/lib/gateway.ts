import { cookies } from "next/headers"
import { redirect } from "next/navigation"

/**
 * Server-side client for the cloud-platform-gov API gateway.
 *
 * The gateway has no CORS support and every service authenticates with a
 * bearer JWT, so all traffic goes through the Next.js server: the token lives
 * in an httpOnly cookie and is attached here, never exposed to the browser.
 */

export const SESSION_COOKIE = "session"

const GATEWAY_URL = (
  process.env.API_GATEWAY_URL ?? "http://localhost:3000"
).replace(/\/+$/, "")

const API_PREFIX = "/api/v1"

export type FieldErrors = Record<string, string>

export class GatewayError extends Error {
  readonly status: number
  readonly code: string
  readonly fieldErrors: FieldErrors
  readonly requestId?: string

  constructor(
    status: number,
    code: string,
    message: string,
    fieldErrors: FieldErrors = {},
    requestId?: string
  ) {
    super(message)
    this.name = "GatewayError"
    this.status = status
    this.code = code
    this.fieldErrors = fieldErrors
    this.requestId = requestId
  }

  /** The gateway or an upstream service is unreachable / not configured. */
  get isUnavailable() {
    return this.status === 502 || this.status === 503 || this.status === 504
  }
}

type ErrorDetail = {
  field?: string
  path?: string | (string | number)[]
  message?: string
}

type ErrorBody = {
  error?: {
    code?: string
    message?: string
    requestId?: string
    details?: ErrorDetail[]
  }
}

function toFieldErrors(details: ErrorDetail[] | undefined): FieldErrors {
  const result: FieldErrors = {}
  for (const detail of details ?? []) {
    const rawKey = detail.field ?? detail.path
    const key = Array.isArray(rawKey) ? rawKey.join(".") : rawKey
    if (key && detail.message && !result[key]) {
      result[key] = detail.message
    }
  }
  return result
}

export type GatewayRequest = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: unknown
  query?: Record<string, string | number | boolean | undefined | null>
  /** Attach the session token. `"optional"` attaches it only if present. */
  auth?: boolean | "optional"
  /**
   * When an authenticated call returns 401 the session is expired. By default
   * the user is sent to /login; set to false to handle the error yourself.
   */
  redirectOnUnauthorized?: boolean
}

export async function getSessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value
}

export async function gatewayFetch<T>(
  path: string,
  {
    method = "GET",
    body,
    query,
    auth = false,
    redirectOnUnauthorized = true,
  }: GatewayRequest = {}
): Promise<T> {
  const url = new URL(`${GATEWAY_URL}${API_PREFIX}${path}`)
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value))
    }
  }

  const headers: Record<string, string> = { Accept: "application/json" }
  if (body !== undefined) {
    headers["Content-Type"] = "application/json"
  }

  const token = auth ? await getSessionToken() : undefined
  if (auth === true && !token) {
    redirect("/login")
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let response: Response
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    })
  } catch {
    throw new GatewayError(
      503,
      "GATEWAY_UNREACHABLE",
      "Não foi possível conectar ao API Gateway."
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()
  let data: unknown = undefined
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = undefined
    }
  }

  if (!response.ok) {
    const err = (data as ErrorBody | undefined)?.error
    if (response.status === 401 && token && redirectOnUnauthorized) {
      // Cookies can't be modified while rendering, so a route handler clears
      // the stale session before landing on the login page.
      redirect("/auth/expired")
    }
    // Details without a field (e.g. catalog domain errors) are surfaced in
    // the message so the user still sees what was rejected.
    const loose = (err?.details ?? [])
      .filter((d) => !d.field && !d.path && d.message)
      .map((d) => d.message)
    const message = err?.message ?? defaultMessage(response.status)
    throw new GatewayError(
      response.status,
      err?.code ?? `HTTP_${response.status}`,
      loose.length ? `${message} ${loose.join(" ")}` : message,
      toFieldErrors(err?.details),
      err?.requestId ?? response.headers.get("x-request-id") ?? undefined
    )
  }

  return data as T
}

function defaultMessage(status: number) {
  if (status === 429) return "Muitas requisições. Tente novamente em instantes."
  if (status >= 500) return "Serviço temporariamente indisponível."
  return "Não foi possível concluir a operação."
}
