import { AlertTriangleIcon, ServerCrashIcon } from "lucide-react"

import { GatewayError } from "@/lib/gateway"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/** Renders an error thrown by gatewayFetch inside a Server Component. */
export function GatewayErrorAlert({ error }: { error: unknown }) {
  if (!(error instanceof GatewayError)) throw error
  const Icon = error.isUnavailable ? ServerCrashIcon : AlertTriangleIcon
  return (
    <Alert variant="destructive">
      <Icon />
      <AlertTitle>
        {error.isUnavailable
          ? "Serviço indisponível"
          : "Não foi possível carregar"}
      </AlertTitle>
      <AlertDescription>
        {error.message}
        {error.requestId && (
          <span className="block text-xs opacity-70">
            ID da requisição: {error.requestId}
          </span>
        )}
      </AlertDescription>
    </Alert>
  )
}
