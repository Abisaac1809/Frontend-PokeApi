import type { PokemonStat } from "@/types/pokemon";
import { StatBar } from "./StatBar";

const STAT_LABELS: Record<string, string> = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Atq. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidad",
};

const STAT_ORDER = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];

type StatListProps = {
  stats: PokemonStat[];
};

export function StatList({ stats }: StatListProps) {
  const byName = new Map(stats.map((s) => [s.stat.name, s.base_stat]));
  return (
    <section className="rounded-xl border border-border-subtle bg-bg-surface p-6">
      <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-text-secondary">
        Estadísticas base
      </h2>
      <div className="flex flex-col gap-3">
        {STAT_ORDER.map((key) => (
          <StatBar key={key} label={STAT_LABELS[key]} value={byName.get(key) ?? 0} />
        ))}
      </div>
    </section>
  );
}
