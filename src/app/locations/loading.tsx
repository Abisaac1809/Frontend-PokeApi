import { CardGridSkeleton } from "@/components/feedback/CardGridSkeleton";
import { SectionHeader } from "@/components/layout/SectionHeader";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionHeader title="Regions" subtitle="Loading regions..." />
      <CardGridSkeleton count={9} minColWidth="220px" height="8rem" />
    </div>
  );
}
