export function extractIdFromUrl(url: string): number {
  const segments = url.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  const id = Number(last);
  if (!Number.isFinite(id)) {
    throw new Error(`Cannot extract numeric id from URL: ${url}`);
  }
  return id;
}

export function getOfficialArtworkUrl(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getPokemonSpriteUrl(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function getItemSpriteUrl(name: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`;
}

export function formatDexNumber(id: number): string {
  return `#${String(id).padStart(4, "0")}`;
}

export function formatName(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

export type PageSlice<T> = {
  items: T[];
  page: number;
  pageCount: number;
  total: number;
  perPage: number;
};

export function paginate<T>(items: T[], page: number, perPage: number): PageSlice<T> {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page: safePage,
    pageCount,
    total,
    perPage,
  };
}

export function parsePageParam(
  value: string | string[] | undefined,
  fallback: number = 1,
): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export function parseSearchParam(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? "").trim().toLowerCase();
}
