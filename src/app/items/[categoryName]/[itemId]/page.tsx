import Image from "next/image";
import Link from "next/link";
import { getItem } from "@/lib/items";
import {
  extractIdFromUrl,
  formatName,
  getItemSpriteUrl,
  getPokemonSpriteUrl,
} from "@/lib/utils";

type ItemDetailPageProps = {
  params: Promise<{ categoryName: string; itemId: string }>;
};

function pickEnglishEffect(entries: { effect: string; short_effect: string; language: { name: string } }[]) {
  const en = entries.find((e) => e.language.name === "en");
  return en ?? null;
}

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const { categoryName, itemId } = await params;
  const item = await getItem(itemId);
  const effect = pickEnglishEffect(item.effect_entries);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href={`/items/${categoryName}`}
        className="mb-4 inline-flex font-heading text-sm text-text-tertiary hover:text-text-primary"
      >
        ← {formatName(categoryName)}
      </Link>
      <section className="grid gap-8 rounded-xl border border-border-subtle bg-bg-surface p-8 md:grid-cols-[auto_1fr]">
        <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-bg-elevated">
          <Image
            src={getItemSpriteUrl(item.name)}
            alt={item.name}
            width={96}
            height={96}
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-heading text-xs uppercase tracking-widest text-text-tertiary">
            {formatName(item.category.name)}
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-text-primary">
            {formatName(item.name)}
          </h1>
          <p className="font-heading text-sm text-text-secondary">
            Costo: <span className="text-text-primary">₽{item.cost.toLocaleString()}</span>
          </p>
          {effect ? (
            <p className="font-body text-base leading-loose text-text-secondary">
              {effect.short_effect.length > 0 ? effect.short_effect : effect.effect}
            </p>
          ) : null}
        </div>
      </section>

      {effect && effect.effect.length > 0 && effect.effect !== effect.short_effect ? (
        <section className="mt-6 rounded-xl border border-border-subtle bg-bg-surface p-6">
          <h2 className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-text-secondary">
            Efecto completo
          </h2>
          <p className="whitespace-pre-line font-body text-base leading-loose text-text-secondary">
            {effect.effect}
          </p>
        </section>
      ) : null}

      <section className="mt-6 rounded-xl border border-border-subtle bg-bg-surface p-6">
        <h2 className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-text-secondary">
          Sostenido por
        </h2>
        {item.held_by_pokemon.length === 0 ? (
          <p className="font-body italic text-text-tertiary">
            No se conocen Pokémon que sostengan este objeto en estado salvaje.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {item.held_by_pokemon.map((holder) => {
              const id = extractIdFromUrl(holder.pokemon.url);
              const rarity = holder.version_details[0]?.rarity ?? 0;
              return (
                <li key={holder.pokemon.name}>
                  <Link
                    href={`/pokemon/${id}`}
                    className="flex items-center gap-3 rounded-lg border border-border-subtle bg-bg-elevated p-3 transition-colors hover:border-border-accent"
                  >
                    <Image
                      src={getPokemonSpriteUrl(id)}
                      alt={holder.pokemon.name}
                      width={40}
                      height={40}
                      className="object-contain"
                      unoptimized
                    />
                    <div className="flex flex-1 items-baseline justify-between">
                      <span className="font-heading text-sm font-medium text-text-primary">
                        {formatName(holder.pokemon.name)}
                      </span>
                      <span className="font-heading text-xs text-accent">{rarity}%</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
