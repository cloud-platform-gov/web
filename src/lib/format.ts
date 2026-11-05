import type { MimeType, RequestStatus } from "@/lib/api/types"

/** Mirrors request-service/src/modules/requests/status.ts */
export const ALLOWED_TRANSITIONS: Record<RequestStatus, RequestStatus[]> = {
  PENDING: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
}

export const STATUS_LABEL: Record<RequestStatus, string> = {
  PENDING: "Pendente",
  IN_PROGRESS: "Em andamento",
  COMPLETED: "Concluída",
  CANCELLED: "Cancelada",
}

export const TRANSITION_LABEL: Record<RequestStatus, string> = {
  PENDING: "Reabrir",
  IN_PROGRESS: "Iniciar atendimento",
  COMPLETED: "Marcar como concluída",
  CANCELLED: "Cancelar solicitação",
}

export const MIME_LABEL: Record<MimeType, string> = {
  "application/pdf": "PDF",
  "image/jpeg": "JPEG",
  "image/png": "PNG",
}

const dateTime = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
})
const dateOnly = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" })

export function formatDateTime(iso: string) {
  return dateTime.format(new Date(iso))
}

export function formatDate(iso: string) {
  return dateOnly.format(new Date(iso))
}

export function formatSla(days: number) {
  return days === 1 ? "1 dia" : `${days} dias`
}
