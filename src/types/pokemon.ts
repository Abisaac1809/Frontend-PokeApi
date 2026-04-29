import type { NamedAPIResource, EncounterDetail } from './shared';

export type PokemonSprites = {
  front_default: string | null;
  front_shiny: string | null;
  other: {
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

export type PokemonTypeSlot = {
  slot: number;
  type: NamedAPIResource;
};

export type PokemonAbility = {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
};

export type PokemonHeldItemVersion = {
  rarity: number;
  version: NamedAPIResource;
};

export type PokemonHeldItem = {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
};

export type Pokemon = {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  held_items: PokemonHeldItem[];
  species: NamedAPIResource;
};

export type FlavorTextEntry = {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
};

export type PokemonSpecies = {
  id: number;
  name: string;
  habitat: NamedAPIResource | null;
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: { url: string };
  gender_rate: number;
  egg_groups: NamedAPIResource[];
};

export type EvolutionDetail = {
  min_level: number | null;
  trigger: NamedAPIResource;
  item: NamedAPIResource | null;
  held_item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  time_of_day: string;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  turn_upside_down: boolean;
  gender: number | null;
  relative_physical_stats: number | null;
  trade_species: NamedAPIResource | null;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
};

export type ChainLink = {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
};

export type EvolutionChain = {
  id: number;
  chain: ChainLink;
};

export type TypePokemonEntry = {
  pokemon: NamedAPIResource;
  slot: number;
};

export type PokemonType = {
  id: number;
  name: string;
  pokemon: TypePokemonEntry[];
  moves: NamedAPIResource[];
};

export type PokemonHabitat = {
  id: number;
  name: string;
  pokemon_species: NamedAPIResource[];
};

export type PokemonSpawnVersionDetail = {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: EncounterDetail[];
};

export type PokemonSpawn = {
  location_area: NamedAPIResource;
  version_details: PokemonSpawnVersionDetail[];
};
