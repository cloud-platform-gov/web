import type { ActionState } from "@/lib/action-state"
import { GatewayError } from "@/lib/gateway"

/** Turns a GatewayError into form state; anything else (incl. redirects) is rethrown. */
export function errorState(
  error: unknown,
  values?: Record<string, string>
): ActionState {
  if (error instanceof GatewayError) {
    return {
      ok: false,
      message: error.message,
      fieldErrors: error.fieldErrors,
      values,
    }
  }
  throw error
}

export function formValues(formData: FormData, keys: string[]) {
  return Object.fromEntries(
    keys.map((key) => [key, String(formData.get(key) ?? "")])
  )
}
