import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

/** Prev/next pager that preserves the current query string. */
export function Pager({
  page,
  totalPages,
  hrefFor,
  summary,
}: {
  page: number
  totalPages: number
  hrefFor: (page: number) => string
  summary?: React.ReactNode
}) {
  if (totalPages <= 1 && !summary) return null
  const prevDisabled = page <= 1
  const nextDisabled = page >= totalPages
  return (
    <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
      <span>{summary}</span>
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <Link
            href={hrefFor(page - 1)}
            aria-disabled={prevDisabled}
            tabIndex={prevDisabled ? -1 : undefined}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              prevDisabled && "pointer-events-none opacity-50"
            )}
          >
            <ChevronLeftIcon data-icon="inline-start" />
            Anterior
          </Link>
          <span className="tabular-nums">
            {page} / {totalPages}
          </span>
          <Link
            href={hrefFor(page + 1)}
            aria-disabled={nextDisabled}
            tabIndex={nextDisabled ? -1 : undefined}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              nextDisabled && "pointer-events-none opacity-50"
            )}
          >
            Próxima
            <ChevronRightIcon data-icon="inline-end" />
          </Link>
        </div>
      )}
    </div>
  )
}

export function queryHref(
  pathname: string,
  params: Record<string, string | number | undefined>
) {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value))
  }
  const qs = search.toString()
  return qs ? `${pathname}?${qs}` : pathname
}
