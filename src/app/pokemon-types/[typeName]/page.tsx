import Link from "next/link";
import { getPokemon, getPokemonsByType } from "@/lib/pokemon";
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
import { TypeBadge } from "@/components/pokemon/TypeBadge";

const PER_PAGE = 20;

type TypeDetailPageProps = {
  params: Promise<{ typeName: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function TypeDetailPage({
  params,
  searchParams,
}: TypeDetailPageProps) {
  const { typeName } = await params;
  const sp = await searchParams;
  const search = parseSearchParam(sp.search);
  const page = parsePageParam(sp.page);

  const data = await getPokemonsByType(typeName);
  const filtered =
    search.length > 0
      ? data.pokemon.filter((entry) => entry.pokemon.name.includes(search))
      : data.pokemon;
  const slice = paginate(filtered, page, PER_PAGE);
  const visible = await Promise.all(
    slice.items.map(async (entry) => {
      const id = extractIdFromUrl(entry.pokemon.url);
      const profile = await getPokemon(id);
      return profile.pokemon;
    }),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/pokemon-types"
        className="mb-4 inline-flex font-heading text-sm text-text-tertiary hover:text-text-primary"
      >
        ← Todos los tipos
      </Link>
      <SectionHeader
        title={`${formatName(typeName)} Pokémon`}
        subtitle={`${slice.total} entradas · página ${slice.page} de ${slice.pageCount}`}
        trailing={
          <div className="flex items-center gap-3">
            <TypeBadge type={typeName} size="md" />
            <SearchBar placeholder="Filtrar por nombre..." />
          </div>
        }
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
