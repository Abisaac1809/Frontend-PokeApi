import Link from "next/link";
import { getItemsByCategory } from "@/lib/items";
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
import { ItemCard } from "@/components/items/ItemCard";

const PER_PAGE = 24;

type ItemCategoryPageProps = {
  params: Promise<{ categoryName: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function ItemCategoryPage({
  params,
  searchParams,
}: ItemCategoryPageProps) {
  const { categoryName } = await params;
  const sp = await searchParams;
  const search = parseSearchParam(sp.search);
  const page = parsePageParam(sp.page);

  const category = await getItemsByCategory(categoryName);
  const filtered =
    search.length > 0
      ? category.items.filter((item) => item.name.includes(search))
      : category.items;
  const slice = paginate(filtered, page, PER_PAGE);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/items"
        className="mb-4 inline-flex font-heading text-sm text-text-tertiary hover:text-text-primary"
      >
        ← Todas las categorías
      </Link>
      <SectionHeader
        title={formatName(category.name)}
        subtitle={`${slice.total} objetos · página ${slice.page} de ${slice.pageCount}`}
        trailing={<SearchBar placeholder="Filtrar objetos..." />}
      />
      {slice.items.length === 0 ? (
        <p className="font-body italic text-text-tertiary">Ningún objeto coincide con tu búsqueda.</p>
      ) : (
        <CardGrid minColWidth="160px">
          {slice.items.map((item) => (
            <ItemCard key={item.name} name={item.name} categoryName={categoryName} />
          ))}
        </CardGrid>
      )}
      <Pagination pageCount={slice.pageCount} currentPage={slice.page} />
    </div>
  );
}
