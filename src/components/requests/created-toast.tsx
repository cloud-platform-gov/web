"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

import { toast } from "@/components/ui/toast"

/** One-shot toast after creating a request, then strips the flag from the URL. */
export function CreatedToast({ notified }: { notified: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const shown = useRef(false)

  useEffect(() => {
    if (shown.current) return
    shown.current = true
    toast.add({
      type: "success",
      title: "Solicitação enviada",
      description: notified
        ? "Uma notificação por e-mail foi disparada."
        : "Não foi possível disparar a notificação por e-mail agora.",
    })
    router.replace(pathname, { scroll: false })
  }, [notified, pathname, router])

  return null
}
