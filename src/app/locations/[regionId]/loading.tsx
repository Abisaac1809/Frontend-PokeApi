import { CardGridSkeleton } from "@/components/feedback/CardGridSkeleton";
import { SectionHeader } from "@/components/layout/SectionHeader";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionHeader title="Region" subtitle="Loading locations..." />
      <CardGridSkeleton count={24} minColWidth="240px" height="6rem" />
    </div>
  );
}
