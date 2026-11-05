export type User = {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export type LoginResponse = {
  accessToken: string
  tokenType: "Bearer"
  expiresIn: number
}

export const MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const
export type MimeType = (typeof MIME_TYPES)[number]

export type Requirement = {
  name: string
  description?: string
  required: boolean
  acceptedMimeTypes: MimeType[]
  maxSizeBytes: number
}

export type ServiceSummary = {
  id: string
  code: string
  name: string
  department: string
  slaDays: number
  active: boolean
  createdAt: string
}

export type ServiceDetail = ServiceSummary & {
  description: string
  requirements: Requirement[]
  updatedAt: string
}

export type ServiceInput = {
  code?: string
  name: string
  description: string
  department: string
  slaDays: number
  requirements: Requirement[]
}

export type ServiceList = {
  data: ServiceSummary[]
  meta: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}

export const REQUEST_STATUSES = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const
export type RequestStatus = (typeof REQUEST_STATUSES)[number]

export type ServiceRequest = {
  id: string
  userId: string
  title: string
  description: string | null
  status: RequestStatus
  createdAt: string
  updatedAt: string
}

export type RequestList = {
  requests: ServiceRequest[]
  pagination: { limit: number; offset: number; total: number }
}
