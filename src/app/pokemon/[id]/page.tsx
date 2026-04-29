import { getPokemon, getPokemonEncounters } from "@/lib/pokemon";
import { PokemonHero } from "@/components/pokemon/PokemonHero";
import { FlavorText } from "@/components/pokemon/FlavorText";
import { StatList } from "@/components/pokemon/StatList";
import { EvolutionChain } from "@/components/pokemon/EvolutionChain";
import { EncounterTableByArea } from "@/components/pokemon/EncounterTableByArea";

type PokemonDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { id } = await params;
  const [profile, encounters] = await Promise.all([
    getPokemon(id),
    getPokemonEncounters(id),
  ]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
      <PokemonHero pokemon={profile.pokemon} species={profile.species} />
      <FlavorText entries={profile.species.flavor_text_entries} />
      <StatList stats={profile.pokemon.stats} />
      <EvolutionChain chain={profile.evolutionChain} />
      <EncounterTableByArea spawns={encounters} />
    </div>
  );
}
