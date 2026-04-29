import Link from "next/link";
import { getPokemon, getPokemonsByHabitat } from "@/lib/pokemon";
import {
  extractIdFromUrl,
  formatName,
  paginate,
  parsePageParam,
  parseSearchParam,
} from "@/lib/utils";
import { CardGrid } from "@/components/layout/CardGrid";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SearchBar } from "@/components/controls/SearchBar";
import { Pagination } from "@/components/controls/Pagination";
import { PokemonCard } from "@/components/pokemon/PokemonCard";

const PER_PAGE = 20;

type HabitatDetailPageProps = {
  params: Promise<{ habitatName: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function HabitatDetailPage({
  params,
  searchParams,
}: HabitatDetailPageProps) {
  const { habitatName } = await params;
  const sp = await searchParams;
  const search = parseSearchParam(sp.search);
  const page = parsePageParam(sp.page);

  const data = await getPokemonsByHabitat(habitatName);
  const filtered =
    search.length > 0
      ? data.pokemon_species.filter((s) => s.name.includes(search))
      : data.pokemon_species;
  const slice = paginate(filtered, page, PER_PAGE);
  const visible = await Promise.all(
    slice.items.map(async (entry) => {
      const id = extractIdFromUrl(entry.url);
      const profile = await getPokemon(id);
      return profile.pokemon;
    }),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/habitat"
        className="mb-4 inline-flex font-heading text-sm text-text-tertiary hover:text-text-primary"
      >
        ← Todos los hábitats
      </Link>
      <SectionHeader
        title={`Hábitat ${formatName(habitatName)}`}
        subtitle={`${slice.total} especies · página ${slice.page} de ${slice.pageCount}`}
        trailing={<SearchBar placeholder="Filtrar por nombre..." />}
      />
      {visible.length === 0 ? (
        <p className="font-body italic text-text-tertiary">Ningún Pokémon coincide con tu búsqueda.</p>
      ) : (
        <CardGrid>
          {visible.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </CardGrid>
      )}
      <Pagination pageCount={slice.pageCount} currentPage={slice.page} />
    </div>
  );
}
