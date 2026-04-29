import { CardGridSkeleton } from "@/components/feedback/CardGridSkeleton";
import { SectionHeader } from "@/components/layout/SectionHeader";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionHeader title="Moves" subtitle="Loading moves..." />
      <CardGridSkeleton count={12} minColWidth="220px" height="11rem" />
    </div>
  );
}
