"use client"

import Link from "next/link"
import { useActionState } from "react"

import { registerAction } from "@/app/actions/auth"
import { initialActionState } from "@/lib/action-state"
import { FormMessage } from "@/components/app/form-message"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

export function RegisterForm() {
  const [state, action, pending] = useActionState(
    registerAction,
    initialActionState
  )
  const errors = state.fieldErrors ?? {}

  return (
    <form action={action} className="flex flex-col gap-6">
      <FormMessage message={state.message} />
      <FieldGroup>
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="name">Nome completo</FieldLabel>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            defaultValue={state.values?.name}
            aria-invalid={Boolean(errors.name)}
          />
          <FieldError>{errors.name}</FieldError>
        </Field>
        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
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
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={128}
            aria-invalid={Boolean(errors.password)}
          />
          <FieldDescription>Mínimo de 8 caracteres.</FieldDescription>
          <FieldError>{errors.password}</FieldError>
        </Field>
        <Field data-invalid={Boolean(errors.confirmPassword)}>
          <FieldLabel htmlFor="confirmPassword">Confirmar senha</FieldLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={128}
            aria-invalid={Boolean(errors.confirmPassword)}
          />
          <FieldError>{errors.confirmPassword}</FieldError>
        </Field>
      </FieldGroup>
      <Button type="submit" size="lg" disabled={pending}>
        {pending && <Spinner />}
        Criar conta
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Já tem conta?{" "}
        <Link
          href="/login"
          className="text-foreground underline underline-offset-4"
        >
          Entrar
        </Link>
      </p>
    </form>
  )
}
