import Link from "next/link"
import {
  ArrowRightIcon,
  FileSearchIcon,
  InboxIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { getCurrentUser } from "@/lib/api/identity"
import { listServices } from "@/lib/api/catalog"
import { listRequests } from "@/lib/api/requests"
import {
  REQUEST_STATUSES,
  type RequestList,
  type ServiceList,
} from "@/lib/api/types"
import { formatDateTime, STATUS_LABEL } from "@/lib/format"
import { GatewayErrorAlert } from "@/components/app/gateway-error-alert"
import { StatusBadge } from "@/components/app/status-badge"
import { ServiceCard } from "@/components/catalog/service-card"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"

export default async function HomePage() {
  const user = await getCurrentUser()
  return user ? <Dashboard firstName={user.name.split(" ")[0]} /> : <Landing />
}

async function FeaturedServices() {
  let result: ServiceList
  try {
    result = await listServices({ limit: 3 })
  } catch (error) {
    return <GatewayErrorAlert error={error} />
  }
  if (result.data.length === 0) return null
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold">
          Serviços disponíveis
        </h2>
        <Link
          href="/services"
          className={buttonVariants({ variant: "link", size: "sm" })}
        >
          Ver todos
          <ArrowRightIcon data-icon="inline-end" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}

function Landing() {
  const features = [
    {
      icon: FileSearchIcon,
      title: "Catálogo único",
      text: "Todos os serviços públicos, com prazos e documentos exigidos.",
    },
    {
      icon: InboxIcon,
      title: "Acompanhamento",
      text: "Veja o status de cada solicitação em tempo real.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Acesso seguro",
      text: "Sua sessão é protegida e validada em cada serviço.",
    },
  ]
  return (
    <>
      <section className="flex flex-col items-start gap-6 py-10 sm:py-16">
        <h1 className="max-w-2xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Serviços públicos, sem fila e sem papel.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Encontre o serviço que você precisa, faça sua solicitação online e
          acompanhe cada etapa do atendimento.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/services" className={buttonVariants({ size: "lg" })}>
            Explorar catálogo
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <Link
            href="/register"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Criar conta
          </Link>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 size-5 text-primary-foreground dark:text-primary" />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
      <FeaturedServices />
    </>
  )
}

async function Dashboard({ firstName }: { firstName: string }) {
  let requests: RequestList | null = null
  let requestsError: unknown = null
  try {
    requests = await listRequests({ limit: 100 })
  } catch (error) {
    requestsError = error
  }

  const counts = Object.fromEntries(
    REQUEST_STATUSES.map((s) => [s, 0])
  ) as Record<(typeof REQUEST_STATUSES)[number], number>
  for (const r of requests?.requests ?? []) counts[r.status]++

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Olá, {firstName}
          </h1>
          <p className="text-muted-foreground">
            Este é o resumo das suas solicitações.
          </p>
        </div>
        <Link href="/requests/new" className={buttonVariants()}>
          Nova solicitação
        </Link>
      </div>

      {requestsError ? (
        <GatewayErrorAlert error={requestsError} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {REQUEST_STATUSES.map((status) => (
              <Card key={status} size="sm">
                <CardHeader>
                  <CardDescription>{STATUS_LABEL[status]}</CardDescription>
                  <CardTitle className="text-3xl tabular-nums">
                    {counts[status]}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Solicitações recentes</CardTitle>
              <CardAction>
                <Link
                  href="/requests"
                  className={buttonVariants({ variant: "link", size: "sm" })}
                >
                  Ver todas
                </Link>
              </CardAction>
            </CardHeader>
            <CardContent>
              {requests && requests.requests.length > 0 ? (
                <ItemGroup className="gap-2">
                  {requests.requests.slice(0, 5).map((r) => (
                    <Item
                      key={r.id}
                      variant="outline"
                      render={<Link href={`/requests/${r.id}`} />}
                    >
                      <ItemContent>
                        <ItemTitle>{r.title}</ItemTitle>
                        <ItemDescription>
                          Aberta em {formatDateTime(r.createdAt)}
                        </ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <StatusBadge status={r.status} />
                      </ItemActions>
                    </Item>
                  ))}
                </ItemGroup>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Você ainda não fez nenhuma solicitação.
                </p>
              )}
            </CardContent>
          </Card>
        </>
      )}
      <FeaturedServices />
    </>
  )
}
