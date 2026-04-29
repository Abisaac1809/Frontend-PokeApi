import { pokeApiFetch } from './client';
import type {
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
  PokemonType,
  PokemonHabitat,
  PokemonSpawn,
} from '@/types/pokemon';
import type { NamedAPIResource, NamedAPIResourceList } from '@/types/shared';

export async function getPokemonList(): Promise<NamedAPIResource[]> {
  const data = await pokeApiFetch<NamedAPIResourceList>('/pokemon?limit=1302');
  return data.results;
}

export async function getPokemon(id: number | string): Promise<{
  pokemon: Pokemon;
  species: PokemonSpecies;
  evolutionChain: EvolutionChain;
}> {
  const pokemon = await pokeApiFetch<Pokemon>(`/pokemon/${id}`);
  const species = await pokeApiFetch<PokemonSpecies>(pokemon.species.url);
  const evolutionChain = await pokeApiFetch<EvolutionChain>(species.evolution_chain.url);
  return { pokemon, species, evolutionChain };
}

export async function getPokemonsByType(typeName: string): Promise<PokemonType> {
  return pokeApiFetch<PokemonType>(`/type/${typeName}`);
}

export async function getPokemonsByHabitat(habitatName: string): Promise<PokemonHabitat> {
  return pokeApiFetch<PokemonHabitat>(`/pokemon-habitat/${habitatName}`);
}

export async function getAllTypes(): Promise<NamedAPIResource[]> {
  const data = await pokeApiFetch<NamedAPIResourceList>('/type?limit=18');
  return data.results;
}

export async function getAllHabitats(): Promise<NamedAPIResource[]> {
  const data = await pokeApiFetch<NamedAPIResourceList>('/pokemon-habitat?limit=9');
  return data.results;
}

export async function getPokemonEncounters(id: number | string): Promise<PokemonSpawn[]> {
  return pokeApiFetch<PokemonSpawn[]>(`/pokemon/${id}/encounters`);
}
