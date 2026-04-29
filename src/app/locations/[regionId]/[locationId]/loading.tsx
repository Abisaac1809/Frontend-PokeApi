export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12">
      <div className="h-12 w-48 animate-pulse rounded-md bg-bg-surface" />
      <div className="h-48 animate-pulse rounded-xl border border-border-subtle bg-bg-surface" />
      <div className="h-48 animate-pulse rounded-xl border border-border-subtle bg-bg-surface" />
    </div>
  );
}
