import { CheckIcon, XIcon } from "lucide-react"

import type { RequestStatus } from "@/lib/api/types"
import { STATUS_LABEL } from "@/lib/format"
import { cn } from "@/lib/utils"

const FLOW: RequestStatus[] = ["PENDING", "IN_PROGRESS", "COMPLETED"]

/** Happy-path progress; a cancelled request shows where it stopped. */
export function StatusTimeline({ status }: { status: RequestStatus }) {
  const cancelled = status === "CANCELLED"
  const current = cancelled ? -1 : FLOW.indexOf(status)
  const steps = cancelled ? [...FLOW.slice(0, 1), "CANCELLED" as const] : FLOW

  return (
    <ol className="flex flex-col gap-3">
      {steps.map((step, index) => {
        const done = cancelled ? true : index <= current
        const isCancel = step === "CANCELLED"
        return (
          <li key={step} className="flex items-center gap-3 text-sm">
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full border",
                done &&
                  !isCancel &&
                  "border-primary bg-primary text-primary-foreground",
                isCancel &&
                  "border-destructive bg-destructive/10 text-destructive"
              )}
            >
              {isCancel ? (
                <XIcon className="size-3.5" />
              ) : (
                done && <CheckIcon className="size-3.5" />
              )}
            </span>
            <span className={cn(!done && "text-muted-foreground")}>
              {STATUS_LABEL[step]}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
