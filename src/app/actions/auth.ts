"use server"

import { redirect } from "next/navigation"

import { errorState, formValues } from "@/lib/action-errors"
import type { ActionState } from "@/lib/action-state"
import * as identity from "@/lib/api/identity"
import { GatewayError } from "@/lib/gateway"
import { clearSession, safeNext, setSession } from "@/lib/session"

export async function loginAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const values = formValues(formData, ["email"])
  try {
    const { accessToken, expiresIn } = await identity.login({
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
    })
    await setSession(accessToken, expiresIn)
  } catch (error) {
    return errorState(error, values)
  }
  redirect(safeNext(formData.get("next")))
}

export async function registerAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const values = formValues(formData, ["name", "email"])
  const password = String(formData.get("password") ?? "")
  const confirm = String(formData.get("confirmPassword") ?? "")
  if (password !== confirm) {
    return {
      ok: false,
      fieldErrors: { confirmPassword: "As senhas não conferem." },
      values,
    }
  }
  const email = values.email.trim()
  try {
    await identity.register({ name: values.name.trim(), email, password })
    const { accessToken, expiresIn } = await identity.login({ email, password })
    await setSession(accessToken, expiresIn)
  } catch (error) {
    return errorState(error, values)
  }
  redirect("/")
}

export async function logoutAction() {
  try {
    await identity.logout()
  } catch (error) {
    // Logout is client-side only on the identity service; an expired token
    // or an unreachable gateway must not keep the user signed in.
    if (!(error instanceof GatewayError)) throw error
  }
  await clearSession()
  redirect("/login")
}
