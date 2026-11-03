"use client"

import { useActionState, useEffect, useRef } from "react"

import {
  updateRequestStatusAction,
  type StatusActionState,
} from "@/app/actions/requests"
import type { RequestStatus } from "@/lib/api/types"
import {
  ALLOWED_TRANSITIONS,
  STATUS_LABEL,
  TRANSITION_LABEL,
} from "@/lib/format"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"

export function StatusActions({
  id,
  status,
}: {
  id: string
  status: RequestStatus
}) {
  const [state, action, pending] = useActionState<StatusActionState, FormData>(
    updateRequestStatusAction,
    { ok: false }
  )
  const last = useRef(state)

  useEffect(() => {
    if (state === last.current) return
    last.current = state
    if (state.ok && state.status) {
      toast.add({
        type: "success",
        title: `Status atualizado para “${STATUS_LABEL[state.status]}”.`,
      })
    } else if (state.message) {
      toast.add({
        type: "error",
        title: "Não foi possível atualizar",
        description: state.message,
      })
    }
  }, [state])

  const transitions = ALLOWED_TRANSITIONS[status]
  if (transitions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Esta solicitação foi finalizada e não pode mais ser alterada.
      </p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {transitions
        .filter((next) => next !== "CANCELLED")
        .map((next) => (
          <form key={next} action={action}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="status" value={next} />
            <Button type="submit" disabled={pending}>
              {pending && <Spinner />}
              {TRANSITION_LABEL[next]}
            </Button>
          </form>
        ))}
      {transitions.includes("CANCELLED") && (
        <AlertDialog>
          <AlertDialogTrigger
            render={<Button variant="destructive" disabled={pending} />}
          >
            {TRANSITION_LABEL.CANCELLED}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancelar esta solicitação?</AlertDialogTitle>
              <AlertDialogDescription>
                Uma solicitação cancelada não pode ser reaberta.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Voltar</AlertDialogCancel>
              <form action={action}>
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="status" value="CANCELLED" />
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={pending}
                  className="w-full"
                >
                  Sim, cancelar
                </Button>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
