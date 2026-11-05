import Link from "next/link"
import { FileQuestionIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileQuestionIcon />
        </EmptyMedia>
        <EmptyTitle>Página não encontrada</EmptyTitle>
        <EmptyDescription>
          O conteúdo que você procura não existe ou foi removido.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Voltar ao início
        </Link>
      </EmptyContent>
    </Empty>
  )
}
