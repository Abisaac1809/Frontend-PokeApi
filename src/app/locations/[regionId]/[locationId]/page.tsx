import Link from "next/link";
import { getLocation, getLocationArea } from "@/lib/locations";
import { extractIdFromUrl, formatName } from "@/lib/utils";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { LocationAreaPanel } from "@/components/locations/LocationAreaPanel";

type LocationDetailPageProps = {
  params: Promise<{ regionId: string; locationId: string }>;
};

export default async function LocationDetailPage({
  params,
}: LocationDetailPageProps) {
  const { regionId, locationId } = await params;
  const location = await getLocation(locationId);
  const areas = await Promise.all(
    location.areas.map((area) => getLocationArea(extractIdFromUrl(area.url))),
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12">
      <Link
        href={`/locations/${regionId}`}
        className="inline-flex font-heading text-sm text-text-tertiary hover:text-text-primary"
      >
        ← {formatName(location.region.name)}
      </Link>
      <SectionHeader
        title={formatName(location.name)}
        subtitle={`${formatName(location.region.name)} · ${areas.length} ${
          areas.length === 1 ? "zona" : "zonas"
        }`}
      />
      {areas.length === 0 ? (
        <p className="font-body italic text-text-tertiary">
          No hay zonas registradas para esta ubicación.
        </p>
      ) : (
        areas.map((area) => <LocationAreaPanel key={area.id} area={area} />)
      )}
    </div>
  );
}
