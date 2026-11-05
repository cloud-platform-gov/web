"use client"

import Link from "next/link"
import { useActionState } from "react"

import { loginAction } from "@/app/actions/auth"
import { initialActionState } from "@/lib/action-state"
import { FormMessage } from "@/components/app/form-message"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(
    loginAction,
    initialActionState
  )
  const errors = state.fieldErrors ?? {}

  return (
    <form action={action} className="flex flex-col gap-6">
      <input type="hidden" name="next" value={next ?? "/"} />
      <FormMessage message={state.message} />
      <FieldGroup>
        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            aria-invalid={Boolean(errors.email)}
          />
          <FieldError>{errors.email}</FieldError>
        </Field>
        <Field data-invalid={Boolean(errors.password)}>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={128}
            aria-invalid={Boolean(errors.password)}
          />
          <FieldError>{errors.password}</FieldError>
        </Field>
      </FieldGroup>
      <Button type="submit" size="lg" disabled={pending}>
        {pending && <Spinner />}
        Entrar
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Ainda não tem conta?{" "}
        <Link
          href="/register"
          className="text-foreground underline underline-offset-4"
        >
          Criar conta
        </Link>
      </p>
    </form>
  )
}
