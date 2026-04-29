import Image from "next/image";
import Link from "next/link";
import type { Pokemon } from "@/types/pokemon";
import { TypeBadge } from "./TypeBadge";
import { formatDexNumber, formatName, getOfficialArtworkUrl } from "@/lib/utils";

type PokemonCardProps = {
  pokemon: Pokemon;
  subtitle?: string;
};

export function PokemonCard({ pokemon, subtitle }: PokemonCardProps) {
  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className="group flex flex-col gap-3 rounded-xl border border-border-subtle bg-bg-surface p-4 transition-colors hover:border-border-accent"
    >
      <div className="flex h-24 items-center justify-center rounded-lg bg-bg-elevated">
        <Image
          src={getOfficialArtworkUrl(pokemon.id)}
          alt={pokemon.name}
          width={88}
          height={88}
          className="object-contain"
        />
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-heading text-sm font-semibold text-text-primary">
          {formatName(pokemon.name)}
        </h3>
        <span className="font-heading text-[10px] text-text-tertiary">
          {formatDexNumber(pokemon.id)}
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        {pokemon.types.map((slot) => (
          <TypeBadge key={slot.slot} type={slot.type.name} />
        ))}
      </div>
      {subtitle ? (
        <p className="font-body text-xs italic text-text-tertiary">{subtitle}</p>
      ) : null}
    </Link>
  );
}
