import Image from "next/image";
import Link from "next/link";
import type { PokemonEncounter } from "@/types/location";
import { extractIdFromUrl, formatName, getPokemonSpriteUrl } from "@/lib/utils";

type Row = {
  pokemonName: string;
  pokemonId: number;
  method: string;
  minLevel: number;
  maxLevel: number;
  chance: number;
};

function flatten(encounters: PokemonEncounter[]): Row[] {
  const rows: Row[] = [];
  for (const encounter of encounters) {
    const detail = encounter.version_details[0];
    if (!detail) continue;
    const id = extractIdFromUrl(encounter.pokemon.url);
    for (const item of detail.encounter_details) {
      rows.push({
        pokemonName: encounter.pokemon.name,
        pokemonId: id,
        method: formatName(item.method.name),
        minLevel: item.min_level,
        maxLevel: item.max_level,
        chance: item.chance,
      });
    }
  }
  return rows;
}

type EncounterTableByPokemonProps = {
  encounters: PokemonEncounter[];
};

export function EncounterTableByPokemon({ encounters }: EncounterTableByPokemonProps) {
  const rows = flatten(encounters);
  if (rows.length === 0) {
    return (
      <p className="font-body italic text-text-tertiary">
        No hay encuentros registrados para esta zona.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border-subtle text-text-tertiary">
            <th className="py-2 pr-4 font-heading text-xs uppercase tracking-widest">Pokémon</th>
            <th className="py-2 pr-4 font-heading text-xs uppercase tracking-widest">Método</th>
            <th className="py-2 pr-4 font-heading text-xs uppercase tracking-widest">Niveles</th>
            <th className="py-2 font-heading text-xs uppercase tracking-widest">Probabilidad</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-border-subtle/50 last:border-b-0">
              <td className="py-2 pr-4">
                <Link
                  href={`/pokemon/${row.pokemonId}`}
                  className="flex items-center gap-3 font-heading text-text-primary transition-colors hover:text-accent"
                >
                  <Image
                    src={getPokemonSpriteUrl(row.pokemonId)}
                    alt={row.pokemonName}
                    width={40}
                    height={40}
                    className="object-contain"
                    unoptimized
                  />
                  {formatName(row.pokemonName)}
                </Link>
              </td>
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
  );
}
