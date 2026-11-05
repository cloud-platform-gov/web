import type { Metadata } from "next"
import { SearchXIcon } from "lucide-react"

import { listDepartments, listServices } from "@/lib/api/catalog"
import type { ServiceList } from "@/lib/api/types"
import { CatalogFilters } from "@/components/catalog/catalog-filters"
import { ServiceCard } from "@/components/catalog/service-card"
import { GatewayErrorAlert } from "@/components/app/gateway-error-alert"
import { PageHeader } from "@/components/app/page-header"
import { Pager, queryHref } from "@/components/app/pager"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export const metadata: Metadata = { title: "Catálogo de serviços" }

const PAGE_SIZE = 12

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; department?: string }>
}) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page) || 1)
  const search = params.search?.trim() || undefined
  const department = params.department || undefined

  let result: ServiceList
  let departments: string[]
  try {
    ;[result, departments] = await Promise.all([
      listServices({ page, limit: PAGE_SIZE, search, department }),
      listDepartments(),
    ])
  } catch (error) {
    return (
      <>
        <PageHeader title="Catálogo de serviços" />
        <GatewayErrorAlert error={error} />
      </>
    )
  }

  const { data, meta } = result
  return (
    <>
      <PageHeader
        title="Catálogo de serviços"
        description="Encontre o serviço público que você precisa."
      />
      <CatalogFilters
        search={search}
        department={department}
        departments={departments}
      />
      {data.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchXIcon />
            </EmptyMedia>
            <EmptyTitle>Nenhum serviço encontrado</EmptyTitle>
            <EmptyDescription>
              {search || department
                ? "Tente outros termos de busca ou remova o filtro de órgão."
                : "O catálogo ainda não possui serviços publicados."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
      <Pager
        page={meta.currentPage}
        totalPages={meta.totalPages}
        summary={`${meta.totalItems} ${meta.totalItems === 1 ? "serviço" : "serviços"}`}
        hrefFor={(p) => queryHref("/services", { search, department, page: p })}
      />
    </>
  )
}
