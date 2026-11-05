import type { Metadata } from "next"

import { ServiceForm } from "@/components/admin/service-form"
import { PageHeader } from "@/components/app/page-header"

export const metadata: Metadata = { title: "Novo serviço" }

export default function NewServicePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <PageHeader
        title="Novo serviço"
        description="Publique um novo serviço no catálogo."
      />
      <ServiceForm />
    </div>
  )
}
