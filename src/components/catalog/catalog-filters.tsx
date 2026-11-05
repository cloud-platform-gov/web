import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

/** Plain GET form: filters live in the URL, so results are shareable. */
export function CatalogFilters({
  search,
  department,
  departments,
}: {
  search?: string
  department?: string
  departments: string[]
}) {
  return (
    <form method="get" className="flex flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="search"
          type="search"
          placeholder="Buscar por nome ou descrição"
          defaultValue={search}
          className="pl-8"
          aria-label="Buscar serviços"
        />
      </div>
      <NativeSelect
        name="department"
        defaultValue={department ?? ""}
        aria-label="Filtrar por órgão"
        className="sm:w-56"
      >
        <NativeSelectOption value="">Todos os órgãos</NativeSelectOption>
        {departments.map((d) => (
          <NativeSelectOption key={d} value={d}>
            {d}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <Button type="submit" variant="secondary">
        Filtrar
      </Button>
    </form>
  )
}
