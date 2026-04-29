import { getPokemon, getPokemonList } from "@/lib/pokemon";
import {
  extractIdFromUrl,
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

type PokemonListPageProps = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function PokemonListPage({ searchParams }: PokemonListPageProps) {
  const params = await searchParams;
  const search = parseSearchParam(params.search);
  const page = parsePageParam(params.page);

  const all = await getPokemonList();
  const filtered = search.length > 0 ? all.filter((p) => p.name.includes(search)) : all;
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
      <SectionHeader
        title="Pokémon"
        subtitle={`${slice.total.toLocaleString()} entradas · página ${slice.page} de ${slice.pageCount}`}
        trailing={<SearchBar placeholder="Buscar Pokémon..." />}
      />
      {visible.length === 0 ? (
        <p className="font-body italic text-text-tertiary">
          Ningún Pokémon coincide con tu búsqueda.
        </p>
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
