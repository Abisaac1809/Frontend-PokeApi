export default function Loading() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
      <div className="h-44 animate-pulse rounded-xl border border-border-subtle bg-bg-surface" />
      <div className="h-32 animate-pulse rounded-xl border border-border-subtle bg-bg-surface" />
      <div className="h-40 animate-pulse rounded-xl border border-border-subtle bg-bg-surface" />
    </div>
  );
}
