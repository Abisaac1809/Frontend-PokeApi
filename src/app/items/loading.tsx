import { CardGridSkeleton } from "@/components/feedback/CardGridSkeleton";
import { SectionHeader } from "@/components/layout/SectionHeader";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionHeader title="Items" subtitle="Loading categories..." />
      <CardGridSkeleton count={24} minColWidth="200px" height="7rem" />
    </div>
  );
}
