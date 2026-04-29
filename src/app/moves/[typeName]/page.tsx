import Link from "next/link";
import { getMove, getMovesByType } from "@/lib/moves";
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
import { MoveCard } from "@/components/moves/MoveCard";
import { TypeBadge } from "@/components/pokemon/TypeBadge";

const PER_PAGE = 12;

type MoveTypePageProps = {
  params: Promise<{ typeName: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function MoveTypePage({
  params,
  searchParams,
}: MoveTypePageProps) {
  const { typeName } = await params;
  const sp = await searchParams;
  const search = parseSearchParam(sp.search);
  const page = parsePageParam(sp.page);

  const data = await getMovesByType(typeName);
  const filtered =
    search.length > 0 ? data.moves.filter((m) => m.name.includes(search)) : data.moves;
  const slice = paginate(filtered, page, PER_PAGE);
  const visible = await Promise.all(
    slice.items.map((entry) => getMove(extractIdFromUrl(entry.url))),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/moves"
        className="mb-4 inline-flex font-heading text-sm text-text-tertiary hover:text-text-primary"
      >
        ← Todos los tipos de movimiento
      </Link>
      <SectionHeader
        title={`Movimientos ${formatName(typeName)}`}
        subtitle={`${slice.total} movimientos · página ${slice.page} de ${slice.pageCount}`}
        trailing={
          <div className="flex items-center gap-3">
            <TypeBadge type={typeName} size="md" />
            <SearchBar placeholder="Filtrar movimientos..." />
          </div>
        }
      />
      {visible.length === 0 ? (
        <p className="font-body italic text-text-tertiary">Ningún movimiento coincide con tu búsqueda.</p>
      ) : (
        <CardGrid minColWidth="220px">
          {visible.map((move) => (
            <MoveCard key={move.id} move={move} />
          ))}
        </CardGrid>
      )}
      <Pagination pageCount={slice.pageCount} currentPage={slice.page} />
    </div>
  );
}
