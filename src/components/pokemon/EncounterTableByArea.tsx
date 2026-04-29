import type { PokemonSpawn } from "@/types/pokemon";
import { formatName } from "@/lib/utils";

type EncounterTableByAreaProps = {
  spawns: PokemonSpawn[];
};

type Row = {
  area: string;
  method: string;
  minLevel: number;
  maxLevel: number;
  chance: number;
};

function flatten(spawns: PokemonSpawn[]): Row[] {
  const rows: Row[] = [];
  for (const spawn of spawns) {
    const versionDetail = spawn.version_details[0];
    if (!versionDetail) continue;
    for (const encounter of versionDetail.encounter_details) {
      rows.push({
        area: formatName(spawn.location_area.name),
        method: formatName(encounter.method.name),
        minLevel: encounter.min_level,
        maxLevel: encounter.max_level,
        chance: encounter.chance,
      });
    }
  }
  return rows;
}

export function EncounterTableByArea({ spawns }: EncounterTableByAreaProps) {
  const rows = flatten(spawns);
  return (
    <section className="rounded-xl border border-border-subtle bg-bg-surface p-6">
      <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-text-secondary">
        Encuentros salvajes
      </h2>
      {rows.length === 0 ? (
        <p className="font-body italic text-text-tertiary">
          No hay encuentros salvajes conocidos para este Pokémon.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle text-text-tertiary">
                <th className="py-2 pr-4 font-heading text-xs uppercase tracking-widest">Zona</th>
                <th className="py-2 pr-4 font-heading text-xs uppercase tracking-widest">Método</th>
                <th className="py-2 pr-4 font-heading text-xs uppercase tracking-widest">Niveles</th>
                <th className="py-2 font-heading text-xs uppercase tracking-widest">Probabilidad</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-b border-border-subtle/50 last:border-b-0">
                  <td className="py-2 pr-4 font-heading text-text-primary">{row.area}</td>
                  <td className="py-2 pr-4 text-text-secondary">{row.method}</td>
                  <td className="py-2 pr-4 text-text-secondary">
                    {row.minLevel}–{row.maxLevel}
                  </td>
                  <td className="py-2 text-accent">{row.chance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
