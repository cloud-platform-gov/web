import Link from "next/link"
import { ShieldAlertIcon } from "lucide-react"

import { GatewayError } from "@/lib/gateway"
import { GatewayErrorAlert } from "@/components/app/gateway-error-alert"
import { buttonVariants } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

/**
 * Admin rights are configured on the catalog service (ADMIN_USER_IDS) and
 * aren't exposed by identity, so they're discovered by attempting the call.
 */
export function AdminErrorState({ error }: { error: unknown }) {
  if (error instanceof GatewayError && error.status === 403) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShieldAlertIcon />
          </EmptyMedia>
          <EmptyTitle>Acesso restrito a administradores</EmptyTitle>
          <EmptyDescription>
            Sua conta não tem permissão para gerenciar o catálogo de serviços.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link
            href="/services"
            className={buttonVariants({ variant: "outline" })}
          >
            Ver catálogo
          </Link>
        </EmptyContent>
      </Empty>
    )
  }
  return <GatewayErrorAlert error={error} />
}
