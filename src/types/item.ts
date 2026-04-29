import type { NamedAPIResource } from './shared';

export type ItemSprites = {
  default: string | null;
};

export type VerboseEffect = {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
};

export type ItemHolderPokemonVersionDetail = {
  rarity: number;
  version: NamedAPIResource;
};

export type ItemHolderPokemon = {
  pokemon: NamedAPIResource;
  version_details: ItemHolderPokemonVersionDetail[];
};

export type Item = {
  id: number;
  name: string;
  cost: number;
  sprites: ItemSprites;
  effect_entries: VerboseEffect[];
  category: NamedAPIResource;
  held_by_pokemon: ItemHolderPokemon[];
};

export type ItemCategory = {
  id: number;
  name: string;
  items: NamedAPIResource[];
  pocket: NamedAPIResource;
};
