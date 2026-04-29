export type NamedAPIResource = {
  name: string;
  url: string;
};

export type APIResource = {
  url: string;
};

export type NamedAPIResourceList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
};

export type EncounterDetail = {
  min_level: number;
  max_level: number;
  chance: number;
  method: NamedAPIResource;
  condition_values: NamedAPIResource[];
};
