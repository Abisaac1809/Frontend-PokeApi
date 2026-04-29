import Image from "next/image";
import type { Pokemon, PokemonSpecies } from "@/types/pokemon";
import { TypeBadge } from "./TypeBadge";
import { formatDexNumber, formatName, getOfficialArtworkUrl } from "@/lib/utils";

type PokemonHeroProps = {
  pokemon: Pokemon;
  species: PokemonSpecies;
};

export function PokemonHero({ pokemon, species }: PokemonHeroProps) {
  return (
    <section className="grid gap-8 rounded-xl border border-border-subtle bg-bg-surface p-8 md:grid-cols-[auto_1fr] md:items-center">
      <div className="flex h-72 w-72 items-center justify-center rounded-xl bg-bg-elevated">
        <Image
          src={getOfficialArtworkUrl(pokemon.id)}
          alt={pokemon.name}
          width={256}
          height={256}
          priority
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-4">
        <span className="font-heading text-sm uppercase tracking-widest text-text-tertiary">
          {formatDexNumber(pokemon.id)}
        </span>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-text-primary">
          {formatName(pokemon.name)}
        </h1>
        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((slot) => (
            <TypeBadge key={slot.slot} type={slot.type.name} size="md" />
          ))}
        </div>
        <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
          <Field label="Hábitat" value={species.habitat ? formatName(species.habitat.name) : "—"} />
          <Field
            label="Habilidades"
            value={pokemon.abilities.map((a) => formatName(a.ability.name)).join(", ")}
          />
          <Field
            label="Grupos huevo"
            value={species.egg_groups.map((g) => formatName(g.name)).join(", ") || "—"}
          />
        </dl>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-heading text-xs uppercase tracking-widest text-text-tertiary">
        {label}
      </dt>
      <dd className="mt-1 font-heading text-sm font-medium text-text-primary">{value}</dd>
    </div>
  );
}
