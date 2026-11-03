"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { errorState } from "@/lib/action-errors"
import type { ActionState } from "@/lib/action-state"
import * as catalog from "@/lib/api/catalog"
import type { ServiceInput } from "@/lib/api/types"

/**
 * The service form posts its data as a single JSON field because the
 * requirements list is dynamic.
 */
function parseInput(formData: FormData): ServiceInput {
  return JSON.parse(String(formData.get("payload") ?? "{}")) as ServiceInput
}

export async function createServiceAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await catalog.createService(parseInput(formData))
  } catch (error) {
    return errorState(error)
  }
  revalidatePath("/services")
  revalidatePath("/admin/services")
  redirect("/admin/services?saved=1")
}

export async function updateServiceAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "")
  try {
    await catalog.updateService(id, parseInput(formData))
  } catch (error) {
    return errorState(error)
  }
  revalidatePath("/services")
  revalidatePath("/admin/services")
  redirect("/admin/services?saved=1")
}

export async function toggleServiceStatusAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "")
  const active = formData.get("active") === "true"
  try {
    await catalog.setServiceStatus(id, active)
  } catch (error) {
    return errorState(error)
  }
  revalidatePath("/services")
  revalidatePath("/admin/services")
  return {
    ok: true,
    message: active ? "Serviço ativado." : "Serviço desativado.",
  }
}
