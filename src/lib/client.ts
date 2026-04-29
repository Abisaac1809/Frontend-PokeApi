type FetchInit = {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

const BASE_URL = 'https://pokeapi.co/api/v2';
const DEFAULT_REVALIDATE = 86400;

export async function pokeApiFetch<T>(pathOrUrl: string, options?: FetchInit): Promise<T> {
  const url = pathOrUrl.startsWith('http') ? pathOrUrl : `${BASE_URL}${pathOrUrl}`;
  const next = { revalidate: DEFAULT_REVALIDATE, ...options?.next };
  const res = await fetch(url, { next });
  if (!res.ok) {
    throw new Error(`PokeAPI ${res.status} ${res.statusText} — ${url}`);
  }
  return res.json() as Promise<T>;
}
