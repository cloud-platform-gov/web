import * as React from "react"

import { cn } from "@/lib/utils"

function Section({
  id,
  title,
  description,
  className,
  children,
}: {
  id: string
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="flex scroll-mt-20 flex-col gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div
        className={cn("grid gap-4 md:grid-cols-2 xl:grid-cols-3", className)}
      >
        {children}
      </div>
    </section>
  )
}

function Demo({
  name,
  className,
  children,
}: {
  name: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      data-demo={name}
      className={cn(
        "flex min-w-0 flex-col gap-3 rounded-3xl border bg-card p-5 text-card-foreground",
        className
      )}
    >
      <div className="font-mono text-xs text-muted-foreground">{name}</div>
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-3">
        {children}
      </div>
    </div>
  )
}

export { Section, Demo }
