import Link from "next/link";
import { getRegion } from "@/lib/locations";
import {
  formatName,
  paginate,
  parsePageParam,
  parseSearchParam,
} from "@/lib/utils";
import { CardGrid } from "@/components/layout/CardGrid";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SearchBar } from "@/components/controls/SearchBar";
import { Pagination } from "@/components/controls/Pagination";
import { LocationCard } from "@/components/locations/LocationCard";

const PER_PAGE = 24;

type RegionDetailPageProps = {
  params: Promise<{ regionId: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function RegionDetailPage({
  params,
  searchParams,
}: RegionDetailPageProps) {
  const { regionId } = await params;
  const sp = await searchParams;
  const search = parseSearchParam(sp.search);
  const page = parsePageParam(sp.page);

  const region = await getRegion(regionId);
  const filtered =
    search.length > 0
      ? region.locations.filter((loc) => loc.name.includes(search))
      : region.locations;
  const slice = paginate(filtered, page, PER_PAGE);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/locations"
        className="mb-4 inline-flex font-heading text-sm text-text-tertiary hover:text-text-primary"
      >
        ← Todas las regiones
      </Link>
      <SectionHeader
        title={formatName(region.name)}
        subtitle={`${slice.total} ubicaciones · página ${slice.page} de ${slice.pageCount}`}
        trailing={<SearchBar placeholder="Filtrar ubicaciones..." />}
      />
      {slice.items.length === 0 ? (
        <p className="font-body italic text-text-tertiary">
          Ninguna ubicación coincide con tu búsqueda.
        </p>
      ) : (
        <CardGrid minColWidth="240px">
          {slice.items.map((location) => (
            <LocationCard
              key={location.name}
              regionId={region.id}
              location={location}
            />
          ))}
        </CardGrid>
      )}
      <Pagination pageCount={slice.pageCount} currentPage={slice.page} />
    </div>
  );
}
