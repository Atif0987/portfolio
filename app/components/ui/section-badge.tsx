import { Badge } from "@/components/ui/badge";

interface SectionBadgeProps {
  text: string;
}

export default function SectionBadge({
  text,
}: SectionBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="rounded-full px-4 py-1 text-sm"
    >
      {text}
    </Badge>
  );
}