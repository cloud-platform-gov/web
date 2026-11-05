import type { Metadata } from "next"
import { ClockIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginForm } from "./login-form"

export const metadata: Metadata = { title: "Entrar" }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; expired?: string }>
}) {
  const { next, expired } = await searchParams
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Entrar</CardTitle>
        <CardDescription>
          Acesse sua conta para acompanhar solicitações.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {expired && (
          <Alert>
            <ClockIcon />
            <AlertDescription>
              Sua sessão expirou. Entre novamente.
            </AlertDescription>
          </Alert>
        )}
        <LoginForm next={next} />
      </CardContent>
    </Card>
  )
}
