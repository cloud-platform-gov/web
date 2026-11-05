import Link from "next/link"
import { LandmarkIcon } from "lucide-react"

import { getCurrentUser } from "@/lib/api/identity"
import { getSessionToken } from "@/lib/gateway"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/app/main-nav"
import { ThemeToggle } from "@/components/app/theme-toggle"
import { UserMenu } from "@/components/app/user-menu"

export async function AppHeader() {
  const [user, token] = await Promise.all([getCurrentUser(), getSessionToken()])
  // A cookie the gateway rejects must be cleared before /login is reachable.
  const loginHref = token && !user ? "/auth/expired" : "/login"

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading font-semibold"
        >
          <span className="flex size-7 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <LandmarkIcon className="size-4" />
          </span>
          <span className="hidden sm:inline">Gov Cloud</span>
        </Link>
        <MainNav signedIn={Boolean(user)} />
        <div className="ms-auto flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <UserMenu name={user.name} email={user.email} />
          ) : (
            <>
              <Link
                href={loginHref}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Entrar
              </Link>
              <Link href="/register" className={buttonVariants({ size: "sm" })}>
                Criar conta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
