import { CardGridSkeleton } from "@/components/feedback/CardGridSkeleton";
import { SectionHeader } from "@/components/layout/SectionHeader";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionHeader title="Habitat" subtitle="Loading Pokémon..." />
      <CardGridSkeleton count={20} height="14rem" />
    </div>
  );
}
