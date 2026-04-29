export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
      <div className="h-72 animate-pulse rounded-xl border border-border-subtle bg-bg-surface" />
      <div className="h-32 animate-pulse rounded-xl border border-border-subtle bg-bg-surface" />
      <div className="h-56 animate-pulse rounded-xl border border-border-subtle bg-bg-surface" />
      <div className="h-40 animate-pulse rounded-xl border border-border-subtle bg-bg-surface" />
    </div>
  );
}
