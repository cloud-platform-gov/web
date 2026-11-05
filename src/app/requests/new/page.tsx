import type { Metadata } from "next"
import { InfoIcon } from "lucide-react"

import { getService } from "@/lib/api/catalog"
import type { ServiceDetail } from "@/lib/api/types"
import { NewRequestForm } from "@/components/requests/new-request-form"
import { PageHeader } from "@/components/app/page-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = { title: "Nova solicitação" }

export default async function NewRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>
}) {
  const { service: serviceCode } = await searchParams
  let service: ServiceDetail | undefined
  if (serviceCode) {
    // Pre-fill only; a missing or unavailable service just means a blank form.
    service = await getService(serviceCode).catch(() => undefined)
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <PageHeader
        title="Nova solicitação"
        description="Descreva o que você precisa. Você receberá atualizações sobre o andamento."
      />
      {service && (
        <Alert>
          <InfoIcon />
          <AlertDescription>
            Solicitação referente ao serviço <strong>{service.name}</strong> (
            {service.department}).
          </AlertDescription>
        </Alert>
      )}
      <Card>
        <CardContent>
          <NewRequestForm
            defaultTitle={service?.name}
            defaultDescription={
              service
                ? `Serviço: ${service.name} (${service.code})\nÓrgão: ${service.department}\n\n`
                : undefined
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
