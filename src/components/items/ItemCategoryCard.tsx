import Link from "next/link";
import { formatName } from "@/lib/utils";

type ItemCategoryCardProps = {
  name: string;
};

export function ItemCategoryCard({ name }: ItemCategoryCardProps) {
  return (
    <Link
      href={`/items/${name}`}
      className="flex h-28 flex-col justify-between rounded-xl border border-border-subtle bg-bg-surface p-5 transition-colors hover:border-border-accent"
    >
      <span className="font-heading text-xs uppercase tracking-widest text-text-tertiary">
        Categoría
      </span>
      <h3 className="font-heading text-base font-semibold text-text-primary">
        {formatName(name)}
      </h3>
    </Link>
  );
}
