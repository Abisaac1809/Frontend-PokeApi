"use client";

import { ErrorState } from "@/components/feedback/ErrorState";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <ErrorState error={error} reset={reset} />
    </div>
  );
}
