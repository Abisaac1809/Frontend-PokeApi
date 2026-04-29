import { pokeApiFetch } from './client';
import type { Item, ItemCategory } from '@/types/item';
import type { NamedAPIResource, NamedAPIResourceList } from '@/types/shared';

export async function getItemsByCategory(categoryName: string): Promise<ItemCategory> {
  return pokeApiFetch<ItemCategory>(`/item-category/${categoryName}`);
}

export async function getItem(id: number | string): Promise<Item> {
  return pokeApiFetch<Item>(`/item/${id}`);
}

export async function getAllItemCategories(): Promise<NamedAPIResource[]> {
  const data = await pokeApiFetch<NamedAPIResourceList>('/item-category?limit=50');
  return data.results;
}
