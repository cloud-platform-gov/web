import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { getRequest } from "@/lib/api/requests"
import type { ServiceRequest } from "@/lib/api/types"
import { formatDateTime } from "@/lib/format"
import { GatewayError } from "@/lib/gateway"
import { GatewayErrorAlert } from "@/components/app/gateway-error-alert"
import { StatusBadge } from "@/components/app/status-badge"
import { CreatedToast } from "@/components/requests/created-toast"
import { StatusActions } from "@/components/requests/status-actions"
import { StatusTimeline } from "@/components/requests/status-timeline"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = { title: "Solicitação" }

export default async function RequestDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ created?: string; notified?: string }>
}) {
  const [{ id }, { created, notified }] = await Promise.all([
    params,
    searchParams,
  ])

  let request: ServiceRequest
  try {
    ;({ request } = await getRequest(id))
  } catch (error) {
    if (
      error instanceof GatewayError &&
      (error.status === 404 || error.status === 400)
    ) {
      notFound()
    }
    return <GatewayErrorAlert error={error} />
  }

  return (
    <>
      {created && <CreatedToast notified={Boolean(notified)} />}
      <Link
        href="/requests"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "w-fit",
        })}
      >
        <ArrowLeftIcon data-icon="inline-start" />
        Minhas solicitações
      </Link>
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Card>
          <CardHeader className="gap-3">
            <StatusBadge status={request.status} />
            <CardTitle className="text-2xl leading-tight">
              {request.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
              {request.description || "Sem descrição."}
            </p>
            <dl className="grid gap-4 border-t pt-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">Protocolo</dt>
                <dd className="font-mono text-xs break-all">{request.id}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Aberta em</dt>
                <dd>{formatDateTime(request.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Última atualização</dt>
                <dd>{formatDateTime(request.updatedAt)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Andamento</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <StatusTimeline status={request.status} />
              <StatusActions id={request.id} status={request.status} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
