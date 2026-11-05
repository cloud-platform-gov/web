import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, Building2Icon, ClockIcon, SendIcon } from "lucide-react"

import { getService } from "@/lib/api/catalog"
import type { ServiceDetail } from "@/lib/api/types"
import { formatDate, formatSla } from "@/lib/format"
import { GatewayError } from "@/lib/gateway"
import { GatewayErrorAlert } from "@/components/app/gateway-error-alert"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = { params: Promise<{ id: string }> }

async function load(id: string): Promise<ServiceDetail> {
  try {
    return await getService(id)
  } catch (error) {
    if (
      error instanceof GatewayError &&
      (error.status === 404 || error.status === 400)
    ) {
      notFound()
    }
    throw error
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  try {
    return { title: (await getService(id)).name }
  } catch {
    return { title: "Serviço" }
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params
  let service: ServiceDetail
  try {
    service = await load(id)
  } catch (error) {
    return <GatewayErrorAlert error={error} />
  }

  return (
    <>
      <Link
        href="/services"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "w-fit",
        })}
      >
        <ArrowLeftIcon data-icon="inline-start" />
        Catálogo
      </Link>
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                <Building2Icon data-icon="inline-start" />
                {service.department}
              </Badge>
              <Badge variant="outline">
                <ClockIcon data-icon="inline-start" />
                Prazo de atendimento: {formatSla(service.slaDays)}
              </Badge>
              {!service.active && <Badge variant="destructive">Inativo</Badge>}
            </div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">
              {service.name}
            </h1>
            <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
              {service.description}
            </p>
          </div>
        </div>

        <aside>
          <Card className="lg:sticky lg:top-20">
            <CardHeader>
              <CardTitle>Solicitar este serviço</CardTitle>
              <CardDescription>
                Abra uma solicitação e acompanhe o andamento pela plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {service.active ? (
                <Link
                  href={`/requests/new?service=${encodeURIComponent(service.code)}`}
                  className={buttonVariants({ size: "lg" })}
                >
                  <SendIcon data-icon="inline-start" />
                  Fazer solicitação
                </Link>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Este serviço está temporariamente indisponível para novas
                  solicitações.
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Código <span className="font-mono">{service.code}</span> ·
                atualizado em {formatDate(service.updatedAt)}
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </>
  )
}
