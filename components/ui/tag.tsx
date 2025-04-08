import { cn } from "@/lib/utils"
import { Badge } from "./badge"

interface Props {
  name: string
  className?: string
}

export default function Tag({ name, className }: Props) {
  // Convert the note name to a URL-friendly slug
  const slug = name.toLowerCase().replace(/\s+/g, "-")

  return (
    <Badge
      className={cn(
        "",
        className,
      )}
    >
      {name}
    </Badge>
  )
}
