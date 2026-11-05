import { AlertCircleIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"

export function FormMessage({ message }: { message?: string }) {
  if (!message) return null
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
