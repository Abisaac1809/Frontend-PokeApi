import Image from "next/image";
import Link from "next/link";
import { formatName, getItemSpriteUrl } from "@/lib/utils";

type ItemCardProps = {
  name: string;
  categoryName: string;
};

export function ItemCard({ name, categoryName }: ItemCardProps) {
  return (
    <Link
      href={`/items/${categoryName}/${name}`}
      className="flex flex-col items-center gap-3 rounded-xl border border-border-subtle bg-bg-surface p-4 transition-colors hover:border-border-accent"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-bg-elevated">
        <Image
          src={getItemSpriteUrl(name)}
          alt={name}
          width={48}
          height={48}
          className="object-contain"
          unoptimized
        />
      </div>
      <h3 className="text-center font-heading text-sm font-medium text-text-primary">
        {formatName(name)}
      </h3>
    </Link>
  );
}
