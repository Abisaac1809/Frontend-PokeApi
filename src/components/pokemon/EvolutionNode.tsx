import Image from "next/image";
import Link from "next/link";
import type { ChainLink, EvolutionDetail } from "@/types/pokemon";
import { extractIdFromUrl, formatName, getOfficialArtworkUrl } from "@/lib/utils";

function describeTrigger(detail: EvolutionDetail | undefined): string {
  if (!detail) return "";
  if (detail.min_level) return `Lv. ${detail.min_level}`;
  if (detail.item) return `Use ${formatName(detail.item.name)}`;
  if (detail.held_item) return `Hold ${formatName(detail.held_item.name)}`;
  if (detail.min_happiness !== null) return `Happiness ≥ ${detail.min_happiness}`;
  if (detail.trigger?.name === "trade") return "Trade";
  if (detail.trigger?.name) return formatName(detail.trigger.name);
  return "Special";
}

type EvolutionNodeProps = {
  node: ChainLink;
  trigger?: string;
};

export function EvolutionNode({ node, trigger }: EvolutionNodeProps) {
  const id = extractIdFromUrl(node.species.url);
  return (
    <div className="flex items-center gap-4">
      {trigger ? (
        <span className="font-heading text-xs uppercase tracking-widest text-text-tertiary">
          → {trigger}
        </span>
      ) : null}
      <Link
        href={`/pokemon/${id}`}
        className="flex flex-col items-center gap-2 rounded-xl border border-border-subtle bg-bg-elevated p-3 transition-colors hover:border-border-accent"
      >
        <Image
          src={getOfficialArtworkUrl(id)}
          alt={node.species.name}
          width={72}
          height={72}
          className="object-contain"
        />
        <span className="font-heading text-xs font-medium text-text-primary">
          {formatName(node.species.name)}
        </span>
      </Link>
      {node.evolves_to.map((next) => (
        <EvolutionNode
          key={next.species.name}
          node={next}
          trigger={describeTrigger(next.evolution_details[0])}
        />
      ))}
    </div>
  );
}
