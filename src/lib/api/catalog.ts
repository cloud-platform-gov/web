import { gatewayFetch } from "@/lib/gateway"
import type {
  ServiceDetail,
  ServiceInput,
  ServiceList,
  ServiceSummary,
} from "@/lib/api/types"

export function listServices(params: {
  page?: number
  limit?: number
  department?: string
  search?: string
  includeInactive?: boolean
}) {
  return gatewayFetch<ServiceList>("/services", {
    query: {
      page: params.page,
      limit: params.limit,
      department: params.department,
      search: params.search,
      include_inactive: params.includeInactive ? "true" : undefined,
    },
    auth: params.includeInactive ? true : "optional",
  })
}

/** Distinct departments, used to populate the catalog filter. */
export async function listDepartments() {
  const { data } = await listServices({ limit: 100 })
  return [...new Set(data.map((s: ServiceSummary) => s.department))].sort(
    (a, b) => a.localeCompare(b, "pt-BR")
  )
}

export function getService(idOrCode: string) {
  return gatewayFetch<ServiceDetail>(
    `/services/${encodeURIComponent(idOrCode)}`,
    { auth: "optional" }
  )
}

export function createService(input: ServiceInput) {
  return gatewayFetch<ServiceDetail>("/services", {
    method: "POST",
    body: input,
    auth: true,
  })
}

export function updateService(id: string, input: ServiceInput) {
  return gatewayFetch<ServiceDetail>(`/services/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: input,
    auth: true,
  })
}

export function setServiceStatus(id: string, active: boolean) {
  return gatewayFetch<
    Pick<ServiceDetail, "id" | "code" | "active" | "updatedAt">
  >(`/services/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    body: { active },
    auth: true,
  })
}
