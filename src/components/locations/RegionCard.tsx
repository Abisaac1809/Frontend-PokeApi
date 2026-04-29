import Link from "next/link";
import type { Region } from "@/types/location";
import { formatName } from "@/lib/utils";

type RegionCardProps = {
  region: Region;
};

export function RegionCard({ region }: RegionCardProps) {
  return (
    <Link
      href={`/locations/${region.id}`}
      className="flex h-32 flex-col justify-between rounded-xl border border-border-subtle bg-bg-surface p-5 transition-colors hover:border-border-accent"
    >
      <span className="font-heading text-xs uppercase tracking-widest text-text-tertiary">
        {region.main_generation ? formatName(region.main_generation.name) : "Región"}
      </span>
      <h3 className="font-heading text-xl font-bold tracking-tight text-text-primary">
        {formatName(region.name)}
      </h3>
      <span className="font-heading text-xs text-text-secondary">
        {region.locations.length} ubicaciones
      </span>
    </Link>
  );
}
