import type { FlavorTextEntry } from "@/types/pokemon";

type FlavorTextProps = {
  entries: FlavorTextEntry[];
};

function pickEnglish(entries: FlavorTextEntry[]): string {
  const english = entries.find((entry) => entry.language.name === "en");
  if (!english) return "";
  return english.flavor_text.replace(/[\f\n\r]+/g, " ").trim();
}

export function FlavorText({ entries }: FlavorTextProps) {
  const text = pickEnglish(entries);
  if (!text) return null;
  return (
    <section className="rounded-xl border border-border-subtle bg-bg-surface p-6">
      <p className="font-body text-base leading-loose text-text-secondary">{text}</p>
    </section>
  );
}
