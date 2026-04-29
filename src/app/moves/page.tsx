import { getAllTypes } from "@/lib/pokemon";
import { parseSearchParam } from "@/lib/utils";
import { CardGrid } from "@/components/layout/CardGrid";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SearchBar } from "@/components/controls/SearchBar";
import { TypeCard } from "@/components/types/TypeCard";

type MovesPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function MovesPage({ searchParams }: MovesPageProps) {
  const params = await searchParams;
  const search = parseSearchParam(params.search);
  const all = await getAllTypes();
  const visible = search.length > 0 ? all.filter((t) => t.name.includes(search)) : all;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionHeader
        title="Movimientos"
        subtitle="Filtra movimientos por tipo elemental"
        trailing={<SearchBar placeholder="Filtrar tipos..." />}
      />
      {visible.length === 0 ? (
        <p className="font-body italic text-text-tertiary">Ningún tipo coincide con tu búsqueda.</p>
      ) : (
        <CardGrid minColWidth="160px">
          {visible.map((type) => (
            <TypeCard key={type.name} name={type.name} hrefBase="/moves" />
          ))}
        </CardGrid>
      )}
    </div>
  );
}
