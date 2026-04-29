import Link from "next/link";
import { formatName } from "@/lib/utils";

const HABITAT_TINTS: Record<string, string> = {
  cave: "from-stone-800 to-stone-950",
  forest: "from-emerald-900 to-emerald-950",
  grassland: "from-lime-800 to-emerald-950",
  mountain: "from-zinc-700 to-zinc-950",
  rare: "from-fuchsia-900 to-purple-950",
  "rough-terrain": "from-amber-900 to-stone-950",
  sea: "from-sky-900 to-blue-950",
  urban: "from-slate-700 to-slate-950",
  "waters-edge": "from-cyan-900 to-blue-950",
};

type HabitatCardProps = {
  name: string;
};

export function HabitatCard({ name }: HabitatCardProps) {
  const tint = HABITAT_TINTS[name] ?? "from-bg-elevated to-bg-surface";
  return (
    <Link
      href={`/habitat/${name}`}
      className={`flex h-32 items-end rounded-xl border border-border-subtle bg-gradient-to-br p-5 transition-colors hover:border-border-accent ${tint}`}
    >
      <h3 className="font-heading text-lg font-semibold tracking-tight text-text-primary">
        {formatName(name)}
      </h3>
    </Link>
  );
}
