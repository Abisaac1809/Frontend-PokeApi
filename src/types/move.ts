import type { NamedAPIResource } from './shared';

export type MoveVerboseEffect = {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
};

export type Move = {
  id: number;
  name: string;
  type: NamedAPIResource;
  power: number | null;
  accuracy: number | null;
  pp: number | null;
  damage_class: NamedAPIResource;
  effect_entries: MoveVerboseEffect[];
};

export type MoveType = {
  id: number;
  name: string;
  moves: NamedAPIResource[];
};
