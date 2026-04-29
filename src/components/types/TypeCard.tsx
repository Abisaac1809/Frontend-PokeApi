import Link from "next/link";
import { TypeBadge } from "@/components/pokemon/TypeBadge";

type TypeCardProps = {
  name: string;
  hrefBase: string;
};

export function TypeCard({ name, hrefBase }: TypeCardProps) {
  return (
    <Link
      href={`${hrefBase}/${name}`}
      className="flex h-32 items-center justify-center rounded-xl border border-border-subtle bg-bg-surface p-6 transition-colors hover:border-border-accent"
    >
      <TypeBadge type={name} size="md" />
    </Link>
  );
}
