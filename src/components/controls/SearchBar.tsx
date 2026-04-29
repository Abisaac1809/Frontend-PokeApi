"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchBarProps = {
  placeholder?: string;
  paramKey?: string;
};

export function SearchBar({
  placeholder = "Search...",
  paramKey = "search",
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initial = searchParams.get(paramKey) ?? "";
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const current = searchParams.get(paramKey) ?? "";
    if (value === current) return;
    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value.trim().length > 0) {
        params.set(paramKey, value.trim());
      } else {
        params.delete(paramKey);
      }
      params.delete("page");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }, 300);
    return () => clearTimeout(handle);
  }, [value, paramKey, pathname, router, searchParams]);

  return (
    <input
      type="search"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder={placeholder}
      className="w-full max-w-xs rounded-md border border-border-default bg-bg-elevated px-3 py-2 font-heading text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none"
    />
  );
}
