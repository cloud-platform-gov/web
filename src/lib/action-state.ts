// Shared by Server Actions and the client forms that render their result,
// so this module must stay free of server-only imports.

export type ActionState = {
  ok: boolean
  message?: string
  fieldErrors?: Record<string, string>
  /** Echo of submitted values so forms can be re-filled after an error. */
  values?: Record<string, string>
}

export const initialActionState: ActionState = { ok: false }
