"use client"

import { useActionState, useEffect, useRef } from "react"

import { toggleServiceStatusAction } from "@/app/actions/catalog"
import { initialActionState } from "@/lib/action-state"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/toast"

export function StatusToggle({
  id,
  active,
  name,
}: {
  id: string
  active: boolean
  name: string
}) {
  const [state, action, pending] = useActionState(
    toggleServiceStatusAction,
    initialActionState
  )
  const formRef = useRef<HTMLFormElement>(null)
  const last = useRef(state)

  useEffect(() => {
    if (state === last.current) return
    last.current = state
    if (state.message) {
      toast.add({ type: state.ok ? "success" : "error", title: state.message })
    }
  }, [state])

  return (
    <form ref={formRef} action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="active" value={String(!active)} />
      <Switch
        checked={active}
        disabled={pending}
        aria-label={`${active ? "Desativar" : "Ativar"} ${name}`}
        onCheckedChange={() => formRef.current?.requestSubmit()}
      />
    </form>
  )
}
