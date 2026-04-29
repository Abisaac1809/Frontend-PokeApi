import { getRegion } from "@/lib/locations";
import type { Region } from "@/types/location";
import { CardGrid } from "@/components/layout/CardGrid";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { RegionCard } from "@/components/locations/RegionCard";

const REGION_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default async function LocationsPage() {
  const settled = await Promise.allSettled(REGION_IDS.map((id) => getRegion(id)));
  const regions: Region[] = settled.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : [],
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionHeader
        title="Regiones"
        subtitle="Explora el mundo Pokémon, región por región"
      />
      <CardGrid minColWidth="220px">
        {regions.map((region) => (
          <RegionCard key={region.id} region={region} />
        ))}
      </CardGrid>
    </div>
  );
}
