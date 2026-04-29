import { getAllItemCategories } from "@/lib/items";
import { paginate, parsePageParam, parseSearchParam } from "@/lib/utils";
import { CardGrid } from "@/components/layout/CardGrid";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SearchBar } from "@/components/controls/SearchBar";
import { Pagination } from "@/components/controls/Pagination";
import { ItemCategoryCard } from "@/components/items/ItemCategoryCard";

const PER_PAGE = 24;

type ItemsPageProps = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function ItemsPage({ searchParams }: ItemsPageProps) {
  const params = await searchParams;
  const search = parseSearchParam(params.search);
  const page = parsePageParam(params.page);
  const all = await getAllItemCategories();
  const filtered = search.length > 0 ? all.filter((c) => c.name.includes(search)) : all;
  const slice = paginate(filtered, page, PER_PAGE);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionHeader
        title="Objetos"
        subtitle={`${slice.total} categorías · página ${slice.page} de ${slice.pageCount}`}
        trailing={<SearchBar placeholder="Filtrar categorías..." />}
      />
      {slice.items.length === 0 ? (
        <p className="font-body italic text-text-tertiary">Ninguna categoría coincide con tu búsqueda.</p>
      ) : (
        <CardGrid minColWidth="200px">
          {slice.items.map((category) => (
            <ItemCategoryCard key={category.name} name={category.name} />
          ))}
        </CardGrid>
      )}
      <Pagination pageCount={slice.pageCount} currentPage={slice.page} />
    </div>
  );
}
