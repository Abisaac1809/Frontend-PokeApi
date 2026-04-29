import { pokeApiFetch } from './client';
import type { Location, LocationArea, Region } from '@/types/location';

export async function getRegion(nameOrId: string | number): Promise<Region> {
  return pokeApiFetch<Region>(`/region/${nameOrId}`);
}

export async function getLocation(id: number | string): Promise<Location> {
  return pokeApiFetch<Location>(`/location/${id}`);
}

export async function getLocationArea(id: number | string): Promise<LocationArea> {
  return pokeApiFetch<LocationArea>(`/location-area/${id}`);
}
