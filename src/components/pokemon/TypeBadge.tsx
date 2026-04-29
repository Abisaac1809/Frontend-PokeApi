import { getTypeColor } from "@/lib/type-colors";
import { formatName } from "@/lib/utils";

type TypeBadgeProps = {
  type: string;
  size?: "sm" | "md";
};

export function TypeBadge({ type, size = "sm" }: TypeBadgeProps) {
  const color = getTypeColor(type);
  const padding = size === "md" ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs";
  return (
    <span
      className={`inline-flex items-center rounded-full font-heading font-semibold uppercase tracking-wider ${padding}`}
      style={{ backgroundColor: color.bg, color: color.text }}
    >
      {formatName(type)}
    </span>
  );
}
