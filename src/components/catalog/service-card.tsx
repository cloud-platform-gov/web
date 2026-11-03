import Link from "next/link"
import { Building2Icon, ClockIcon } from "lucide-react"

import type { ServiceSummary } from "@/lib/api/types"
import { formatSla } from "@/lib/format"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ServiceCard({ service }: { service: ServiceSummary }) {
  return (
    <Link
      href={`/services/${service.code}`}
      className="group rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
    >
      <Card className="h-full transition-colors group-hover:bg-muted/40">
        <CardHeader>
          <CardTitle className="leading-snug">{service.name}</CardTitle>
          <CardDescription className="flex items-center gap-1.5">
            <Building2Icon className="size-3.5" />
            {service.department}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto gap-2">
          <Badge variant="outline">
            <ClockIcon data-icon="inline-start" />
            Prazo {formatSla(service.slaDays)}
          </Badge>
          {!service.active && <Badge variant="destructive">Inativo</Badge>}
        </CardFooter>
      </Card>
    </Link>
  )
}
