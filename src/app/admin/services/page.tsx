import type { Metadata } from "next"
import Link from "next/link"
import { PencilIcon, PlusIcon } from "lucide-react"

import { listServices } from "@/lib/api/catalog"
import type { ServiceList } from "@/lib/api/types"
import { formatSla } from "@/lib/format"
import { AdminErrorState } from "@/components/admin/admin-guard"
import { StatusToggle } from "@/components/admin/status-toggle"
import { PageHeader } from "@/components/app/page-header"
import { Pager, queryHref } from "@/components/app/pager"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = { title: "Administração do catálogo" }

const PAGE_SIZE = 20

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const page = Math.max(1, Number((await searchParams).page) || 1)

  let result: ServiceList
  try {
    result = await listServices({
      page,
      limit: PAGE_SIZE,
      includeInactive: true,
    })
  } catch (error) {
    return (
      <>
        <PageHeader title="Administração do catálogo" />
        <AdminErrorState error={error} />
      </>
    )
  }

  const { data, meta } = result
  return (
    <>
      <PageHeader
        title="Administração do catálogo"
        description="Cadastre, edite e publique serviços, incluindo os inativos."
        actions={
          <Link href="/admin/services/new" className={buttonVariants()}>
            <PlusIcon data-icon="inline-start" />
            Novo serviço
          </Link>
        }
      />
      <Card className="py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="ps-4">Serviço</TableHead>
              <TableHead className="hidden md:table-cell">Órgão</TableHead>
              <TableHead className="hidden sm:table-cell">Prazo</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead className="pe-4 text-right">
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  Nenhum serviço cadastrado.
                </TableCell>
              </TableRow>
            )}
            {data.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="ps-4">
                  <Link
                    href={`/services/${service.code}`}
                    className="font-medium hover:underline"
                  >
                    {service.name}
                  </Link>
                  <div className="font-mono text-xs text-muted-foreground">
                    {service.code}
                  </div>
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {service.department}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {formatSla(service.slaDays)}
                </TableCell>
                <TableCell>
                  <StatusToggle
                    id={service.id}
                    active={service.active}
                    name={service.name}
                  />
                </TableCell>
                <TableCell className="pe-4 text-right">
                  <Link
                    href={`/admin/services/${service.id}/edit`}
                    aria-label={`Editar ${service.name}`}
                    className={buttonVariants({
                      variant: "ghost",
                      size: "icon-sm",
                    })}
                  >
                    <PencilIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Pager
        page={meta.currentPage}
        totalPages={meta.totalPages}
        summary={`${meta.totalItems} ${meta.totalItems === 1 ? "serviço" : "serviços"}`}
        hrefFor={(p) => queryHref("/admin/services", { page: p })}
      />
    </>
  )
}
