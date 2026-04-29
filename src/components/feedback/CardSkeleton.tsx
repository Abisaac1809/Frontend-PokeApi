type CardSkeletonProps = {
  height?: string;
};

export function CardSkeleton({ height = "11rem" }: CardSkeletonProps) {
  return (
    <div
      className="animate-pulse rounded-xl border border-border-subtle bg-bg-surface"
      style={{ height }}
    />
  );
}
