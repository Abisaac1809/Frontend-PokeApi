import type { EvolutionChain as EvolutionChainType } from "@/types/pokemon";
import { EvolutionNode } from "./EvolutionNode";

type EvolutionChainProps = {
  chain: EvolutionChainType;
};

export function EvolutionChain({ chain }: EvolutionChainProps) {
  return (
    <section className="rounded-xl border border-border-subtle bg-bg-surface p-6">
      <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-text-secondary">
        Evolución
      </h2>
      <div className="flex flex-wrap items-center gap-4 overflow-x-auto">
        <EvolutionNode node={chain.chain} />
      </div>
    </section>
  );
}
