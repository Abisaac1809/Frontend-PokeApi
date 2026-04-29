import type { Move } from "@/types/move";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { formatName } from "@/lib/utils";

const DAMAGE_CLASS_TINT: Record<string, string> = {
  physical: "text-orange-300",
  special: "text-sky-300",
  status: "text-text-tertiary",
};

type MoveCardProps = {
  move: Move;
};

export function MoveCard({ move }: MoveCardProps) {
  const tint = DAMAGE_CLASS_TINT[move.damage_class.name] ?? "text-text-secondary";
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border-subtle bg-bg-surface p-4">
      <header className="flex items-center justify-between gap-2">
        <h3 className="font-heading text-base font-semibold text-text-primary">
          {formatName(move.name)}
        </h3>
        <TypeBadge type={move.type.name} />
      </header>
      <p className={`font-heading text-xs uppercase tracking-widest ${tint}`}>
        {formatName(move.damage_class.name)}
      </p>
      <dl className="grid grid-cols-3 gap-2 border-t border-border-subtle pt-3 text-center">
        <Stat label="Poder" value={move.power} />
        <Stat label="Prec." value={move.accuracy !== null ? `${move.accuracy}%` : null} />
        <Stat label="PP" value={move.pp} />
      </dl>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: number | string | null }) {
  return (
    <div>
      <dt className="font-heading text-[10px] uppercase tracking-widest text-text-tertiary">
        {label}
      </dt>
      <dd className="mt-1 font-heading text-sm font-semibold text-text-primary">
        {value ?? "—"}
      </dd>
    </div>
  );
}
