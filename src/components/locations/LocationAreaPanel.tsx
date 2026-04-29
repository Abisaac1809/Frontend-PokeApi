import type { LocationArea } from "@/types/location";
import { formatName } from "@/lib/utils";
import { EncounterTableByPokemon } from "./EncounterTableByPokemon";

type LocationAreaPanelProps = {
  area: LocationArea;
};

export function LocationAreaPanel({ area }: LocationAreaPanelProps) {
  return (
    <section className="rounded-xl border border-border-subtle bg-bg-surface p-6">
      <h2 className="mb-4 font-heading text-lg font-semibold text-text-primary">
        {formatName(area.name)}
      </h2>
      <EncounterTableByPokemon encounters={area.pokemon_encounters} />
    </section>
  );
}
