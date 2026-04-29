import type { NamedAPIResource, EncounterDetail } from './shared';

export type PokemonEncounterVersionDetail = {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: EncounterDetail[];
};

export type PokemonEncounter = {
  pokemon: NamedAPIResource;
  version_details: PokemonEncounterVersionDetail[];
};

export type LocationArea = {
  id: number;
  name: string;
  game_index: number;
  location: NamedAPIResource;
  pokemon_encounters: PokemonEncounter[];
};

export type Location = {
  id: number;
  name: string;
  region: NamedAPIResource;
  areas: NamedAPIResource[];
};

export type Region = {
  id: number;
  name: string;
  locations: NamedAPIResource[];
  main_generation: NamedAPIResource;
};
