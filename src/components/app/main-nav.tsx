"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const links = [
  { href: "/services", label: "Catálogo", auth: false },
  { href: "/requests", label: "Minhas solicitações", auth: true },
  { href: "/admin/services", label: "Administração", auth: true },
]

export function MainNav({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname()
  return (
    <nav className="flex items-center gap-1 overflow-x-auto text-sm">
      {links
        .filter((link) => signedIn || !link.auth)
        .map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`)
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-xl px-2.5 py-1.5 whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground",
                active && "bg-muted text-foreground"
              )}
            >
              {link.label}
            </Link>
          )
        })}
    </nav>
  )
}
