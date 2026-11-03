import { gatewayFetch } from "@/lib/gateway"
import type {
  RequestList,
  RequestStatus,
  ServiceRequest,
} from "@/lib/api/types"

export function listRequests(params: { limit?: number; offset?: number } = {}) {
  return gatewayFetch<RequestList>("/requests", {
    query: { limit: params.limit, offset: params.offset },
    auth: true,
  })
}

export function getRequest(id: string) {
  return gatewayFetch<{ request: ServiceRequest }>(
    `/requests/${encodeURIComponent(id)}`,
    { auth: true }
  )
}

export function createRequest(input: {
  title: string
  description?: string | null
}) {
  return gatewayFetch<{ request: ServiceRequest; eventPublished: boolean }>(
    "/requests",
    { method: "POST", body: input, auth: true }
  )
}

export function updateRequestStatus(id: string, status: RequestStatus) {
  return gatewayFetch<{ request: ServiceRequest }>(
    `/requests/${encodeURIComponent(id)}/status`,
    { method: "PATCH", body: { status }, auth: true }
  )
}
