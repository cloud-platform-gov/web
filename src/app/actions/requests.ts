"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { errorState, formValues } from "@/lib/action-errors"
import type { ActionState } from "@/lib/action-state"
import * as requests from "@/lib/api/requests"
import { REQUEST_STATUSES, type RequestStatus } from "@/lib/api/types"

export async function createRequestAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const values = formValues(formData, ["title", "description"])
  let id: string
  let notified: boolean
  try {
    const result = await requests.createRequest({
      title: values.title.trim(),
      description: values.description.trim() || null,
    })
    id = result.request.id
    notified = result.eventPublished
  } catch (error) {
    return errorState(error, values)
  }
  revalidatePath("/requests")
  redirect(`/requests/${id}?created=1${notified ? "&notified=1" : ""}`)
}

export type StatusActionState = ActionState & { status?: RequestStatus }

export async function updateRequestStatusAction(
  _prev: StatusActionState,
  formData: FormData
): Promise<StatusActionState> {
  const id = String(formData.get("id") ?? "")
  const status = String(formData.get("status") ?? "") as RequestStatus
  if (!REQUEST_STATUSES.includes(status)) {
    return { ok: false, message: "Status inválido." }
  }
  try {
    await requests.updateRequestStatus(id, status)
  } catch (error) {
    return errorState(error)
  }
  revalidatePath("/requests")
  revalidatePath(`/requests/${id}`)
  return { ok: true, status }
}
