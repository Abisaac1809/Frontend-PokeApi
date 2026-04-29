"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  pageCount: number;
  currentPage: number;
  siblingCount?: number;
};

function buildPages(current: number, total: number, siblings: number): (number | "ellipsis")[] {
  if (total <= 1) return [1];
  const pages = new Set<number>([1, total, current]);
  for (let offset = 1; offset <= siblings; offset++) {
    if (current - offset >= 1) pages.add(current - offset);
    if (current + offset <= total) pages.add(current + offset);
  }
  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];
  sorted.forEach((value, index) => {
    if (index > 0 && value - sorted[index - 1] > 1) result.push("ellipsis");
    result.push(value);
  });
  return result;
}

export function Pagination({ pageCount, currentPage, siblingCount = 1 }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlPage = Math.max(1, Math.min(pageCount, Number(searchParams.get("page") ?? 1)));

  useEffect(() => {
    if (urlPage === currentPage) return;
    const params = new URLSearchParams(searchParams);
    if (currentPage <= 1) params.delete("page");
    else params.set("page", String(currentPage));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [currentPage, urlPage, pathname, router, searchParams]);

  if (pageCount <= 1) return null;

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page <= 1) params.delete("page");
    else params.set("page", String(page));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const pages = buildPages(currentPage, pageCount, siblingCount);

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => goTo(currentPage - 1)}
        className="cursor-pointer rounded-md border border-border-default bg-bg-elevated px-3 py-1.5 font-heading text-sm text-text-primary transition-colors hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-40"
      >
        Anterior
      </button>
      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span key={`e-${index}`} className="px-2 text-text-tertiary">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => goTo(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`min-w-[2.25rem] cursor-pointer rounded-md border px-3 py-1.5 font-heading text-sm transition-colors ${page === currentPage
              ? "border-accent bg-accent text-text-primary"
              : "border-border-default bg-bg-elevated text-text-secondary hover:border-border-strong hover:text-text-primary"
              }`}
          >
            {page}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={currentPage === pageCount}
        onClick={() => goTo(currentPage + 1)}
        className="cursor-pointer rounded-md border border-border-default bg-bg-elevated px-3 py-1.5 font-heading text-sm text-text-primary transition-colors hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-40"
      >
        Siguiente
      </button>
    </nav>
  );
}
