import Link from "next/link";
import type { NamedAPIResource } from "@/types/shared";
import { extractIdFromUrl, formatName } from "@/lib/utils";

type LocationCardProps = {
  regionId: number | string;
  location: NamedAPIResource;
};

export function LocationCard({ regionId, location }: LocationCardProps) {
  const locationId = extractIdFromUrl(location.url);
  return (
    <Link
      href={`/locations/${regionId}/${locationId}`}
      className="flex h-24 items-center justify-between rounded-xl border border-border-subtle bg-bg-surface p-5 transition-colors hover:border-border-accent"
    >
      <h3 className="font-heading text-base font-semibold text-text-primary">
        {formatName(location.name)}
      </h3>
      <span className="font-heading text-text-tertiary">→</span>
    </Link>
  );
}
