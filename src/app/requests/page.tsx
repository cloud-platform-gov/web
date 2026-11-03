import type { Metadata } from "next"
import Link from "next/link"
import { InboxIcon, PlusIcon } from "lucide-react"

import { listRequests } from "@/lib/api/requests"
import type { RequestList } from "@/lib/api/types"
import { formatDateTime } from "@/lib/format"
import { GatewayErrorAlert } from "@/components/app/gateway-error-alert"
import { PageHeader } from "@/components/app/page-header"
import { Pager, queryHref } from "@/components/app/pager"
import { StatusBadge } from "@/components/app/status-badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = { title: "Minhas solicitações" }

const PAGE_SIZE = 20

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const page = Math.max(1, Number((await searchParams).page) || 1)
  const newButton = (
    <Link href="/requests/new" className={buttonVariants()}>
      <PlusIcon data-icon="inline-start" />
      Nova solicitação
    </Link>
  )

  let result: RequestList
  try {
    result = await listRequests({
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    })
  } catch (error) {
    return (
      <>
        <PageHeader title="Minhas solicitações" actions={newButton} />
        <GatewayErrorAlert error={error} />
      </>
    )
  }

  const { requests, pagination } = result
  const totalPages = Math.max(1, Math.ceil(pagination.total / PAGE_SIZE))

  return (
    <>
      <PageHeader
        title="Minhas solicitações"
        description="Acompanhe o andamento de tudo o que você solicitou."
        actions={newButton}
      />
      {requests.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <InboxIcon />
            </EmptyMedia>
            <EmptyTitle>Nenhuma solicitação ainda</EmptyTitle>
            <EmptyDescription>
              Escolha um serviço no catálogo ou abra uma solicitação
              diretamente.
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
      ) : (
        <Card className="py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="ps-4">Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Aberta em
                </TableHead>
                <TableHead className="hidden pe-4 md:table-cell">
                  Atualizada em
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} className="relative">
                  <TableCell className="ps-4 font-medium">
                    <Link
                      href={`/requests/${request.id}`}
                      className="block max-w-[14rem] truncate after:absolute after:inset-0 hover:underline sm:max-w-sm lg:max-w-md"
                    >
                      {request.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={request.status} />
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {formatDateTime(request.createdAt)}
                  </TableCell>
                  <TableCell className="hidden pe-4 text-muted-foreground md:table-cell">
                    {formatDateTime(request.updatedAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      <Pager
        page={page}
        totalPages={totalPages}
        summary={
          pagination.total > 0 &&
          `${pagination.total} ${pagination.total === 1 ? "solicitação" : "solicitações"}`
        }
        hrefFor={(p) => queryHref("/requests", { page: p })}
      />
    </>
  )
}
