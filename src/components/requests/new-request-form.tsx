"use client"

import Link from "next/link"
import { useActionState } from "react"

import { createRequestAction } from "@/app/actions/requests"
import { initialActionState } from "@/lib/action-state"
import { FormMessage } from "@/components/app/form-message"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

export function NewRequestForm({
  defaultTitle,
  defaultDescription,
}: {
  defaultTitle?: string
  defaultDescription?: string
}) {
  const [state, action, pending] = useActionState(
    createRequestAction,
    initialActionState
  )
  const errors = state.fieldErrors ?? {}

  return (
    <form action={action} className="flex flex-col gap-6">
      <FormMessage message={state.message} />
      <FieldGroup>
        <Field data-invalid={Boolean(errors.title)}>
          <FieldLabel htmlFor="title">Título</FieldLabel>
          <Input
            id="title"
            name="title"
            required
            maxLength={200}
            defaultValue={state.values?.title ?? defaultTitle}
            aria-invalid={Boolean(errors.title)}
          />
          <FieldError>{errors.title}</FieldError>
        </Field>
        <Field data-invalid={Boolean(errors.description)}>
          <FieldLabel htmlFor="description">Descrição</FieldLabel>
          <Textarea
            id="description"
            name="description"
            rows={6}
            maxLength={2000}
            defaultValue={state.values?.description ?? defaultDescription}
            aria-invalid={Boolean(errors.description)}
          />
          <FieldDescription>Opcional. Até 2000 caracteres.</FieldDescription>
          <FieldError>{errors.description}</FieldError>
        </Field>
      </FieldGroup>
      <div className="flex justify-end gap-2">
        <Link
          href="/requests"
          className={buttonVariants({ variant: "outline" })}
        >
          Cancelar
        </Link>
        <Button type="submit" disabled={pending}>
          {pending && <Spinner />}
          Enviar solicitação
        </Button>
      </div>
    </form>
  )
}
