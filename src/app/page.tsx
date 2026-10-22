import { ActionsSection } from "@/components/showcase/actions"
import { ChatSection } from "@/components/showcase/chat"
import { DisplaySection } from "@/components/showcase/display"
import { FormsSection } from "@/components/showcase/forms"
import { NavigationSection } from "@/components/showcase/navigation"
import { OverlaysSection } from "@/components/showcase/overlays"
import { Kbd } from "@/components/ui/kbd"

const sections = [
  { id: "actions", label: "Actions" },
  { id: "forms", label: "Forms" },
  { id: "overlays", label: "Overlays" },
  { id: "navigation", label: "Navigation" },
  { id: "display", label: "Data display" },
  { id: "chat", label: "Chat & AI" },
]

export default function Page() {
  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
          <span className="font-heading font-semibold">Component showcase</span>
          <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="hover:text-foreground"
              >
                {section.label}
              </a>
            ))}
          </nav>
          <span className="ms-auto hidden text-xs text-muted-foreground sm:block">
            Press <Kbd>d</Kbd> to toggle dark mode
          </span>
        </div>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-8 sm:px-6">
        <div>
          <h1 className="font-heading text-3xl font-semibold">shadcn/ui</h1>
          <p className="text-muted-foreground">
            Every component installed in this project, rendered live.
          </p>
        </div>
        <ActionsSection />
        <FormsSection />
        <OverlaysSection />
        <NavigationSection />
        <DisplaySection />
        <ChatSection />
      </main>
    </div>
  )
}
