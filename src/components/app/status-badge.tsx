import {
  CheckCircle2Icon,
  CircleDashedIcon,
  LoaderIcon,
  XCircleIcon,
} from "lucide-react"

import type { RequestStatus } from "@/lib/api/types"
import { STATUS_LABEL } from "@/lib/format"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const styles: Record<RequestStatus, string> = {
  PENDING: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  IN_PROGRESS: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  COMPLETED: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  CANCELLED: "bg-muted text-muted-foreground",
}

const icons = {
  PENDING: CircleDashedIcon,
  IN_PROGRESS: LoaderIcon,
  COMPLETED: CheckCircle2Icon,
  CANCELLED: XCircleIcon,
} satisfies Record<RequestStatus, unknown>

export function StatusBadge({ status }: { status: RequestStatus }) {
  const Icon = icons[status]
  return (
    <Badge variant="secondary" className={cn(styles[status])}>
      <Icon data-icon="inline-start" />
      {STATUS_LABEL[status]}
    </Badge>
  )
}
