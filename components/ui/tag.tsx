import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface Props {
  name: string;
  className?: string;
}

export default function Tag({ name, className }: Props) {
  return <Badge className={cn("", className)}>{name}</Badge>;
}
