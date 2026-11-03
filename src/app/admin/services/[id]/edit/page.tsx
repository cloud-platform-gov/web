import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getService } from "@/lib/api/catalog"
import type { ServiceDetail } from "@/lib/api/types"
import { GatewayError } from "@/lib/gateway"
import { ServiceForm } from "@/components/admin/service-form"
import { GatewayErrorAlert } from "@/components/app/gateway-error-alert"
import { PageHeader } from "@/components/app/page-header"

export const metadata: Metadata = { title: "Editar serviço" }

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let service: ServiceDetail
  try {
    service = await getService(id)
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
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <PageHeader title="Editar serviço" description={service.name} />
      <ServiceForm service={service} />
    </div>
  )
}
