import { getAllHabitats } from "@/lib/pokemon";
import { parseSearchParam } from "@/lib/utils";
import { CardGrid } from "@/components/layout/CardGrid";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SearchBar } from "@/components/controls/SearchBar";
import { HabitatCard } from "@/components/habitat/HabitatCard";

type HabitatPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function HabitatPage({ searchParams }: HabitatPageProps) {
  const params = await searchParams;
  const search = parseSearchParam(params.search);
  const all = await getAllHabitats();
  const visible = search.length > 0 ? all.filter((h) => h.name.includes(search)) : all;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionHeader
        title="Hábitats"
        subtitle="Explora Pokémon por dónde viven"
        trailing={<SearchBar placeholder="Filtrar hábitats..." />}
      />
      {visible.length === 0 ? (
        <p className="font-body italic text-text-tertiary">Ningún hábitat coincide con tu búsqueda.</p>
      ) : (
        <CardGrid minColWidth="220px">
          {visible.map((habitat) => (
            <HabitatCard key={habitat.name} name={habitat.name} />
          ))}
        </CardGrid>
      )}
    </div>
  );
}
