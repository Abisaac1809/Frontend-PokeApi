import Link from "next/link";
import { CardGrid } from "@/components/layout/CardGrid";

const SECTIONS = [
  {
    href: "/pokemon",
    title: "Pokémon",
    blurb: "Explora todos los Pokémon por nombre y sprite.",
  },
  {
    href: "/pokemon-types",
    title: "Tipos",
    blurb: "Explora Pokémon agrupados por tipo elemental.",
  },
  {
    href: "/habitat",
    title: "Hábitats",
    blurb: "Descubre dónde vive cada especie.",
  },
  {
    href: "/items",
    title: "Objetos",
    blurb: "Poké Balls, bayas, piedras evolutivas y mucho más.",
  },
  {
    href: "/moves",
    title: "Movimientos",
    blurb: "Filtra movimientos de combate por tipo, poder y precisión.",
  },
  {
    href: "/locations",
    title: "Ubicaciones",
    blurb: "Rutas, pueblos y encuentros salvajes por región.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <h1 className="font-heading text-5xl font-bold tracking-tight text-text-primary">
          Pokédex <span className="text-accent">Explorer</span>
        </h1>
        <p className="mt-3 max-w-xl font-body text-lg text-text-secondary">
          Una Pokédex moderna impulsada por la PokéAPI. Explora Pokémon, tipos,
          hábitats, objetos, movimientos y ubicaciones de todas las regiones.
        </p>
      </header>
      <CardGrid minColWidth="240px">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex flex-col gap-3 rounded-xl border border-border-subtle bg-bg-surface p-6 transition-colors hover:border-border-accent"
          >
            <h2 className="font-heading text-xl font-semibold text-text-primary">
              {section.title}
            </h2>
            <p className="font-body text-sm leading-relaxed text-text-secondary">
              {section.blurb}
            </p>
            <span className="mt-2 font-heading text-xs uppercase tracking-widest text-accent">
              Explorar →
            </span>
          </Link>
        ))}
      </CardGrid>
    </div>
  );
}
