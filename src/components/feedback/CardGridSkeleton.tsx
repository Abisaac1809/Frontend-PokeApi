import { CardGrid } from "@/components/layout/CardGrid";
import { CardSkeleton } from "./CardSkeleton";

type CardGridSkeletonProps = {
  count?: number;
  minColWidth?: string;
  height?: string;
};

export function CardGridSkeleton({
  count = 12,
  minColWidth,
  height,
}: CardGridSkeletonProps) {
  return (
    <CardGrid minColWidth={minColWidth}>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} height={height} />
      ))}
    </CardGrid>
  );
}
