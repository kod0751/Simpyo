"use client";

import { useCallback, useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

export interface ListingFilters {
  query: string;
  category: string;
  sort: SortKey;
}

const DEFAULTS: ListingFilters = {
  query: "",
  category: "all",
  sort: "recommended",
};

export function useListingFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters: ListingFilters = useMemo(
    () => ({
      query: searchParams.get("q") ?? DEFAULTS.query,
      category: searchParams.get("category") ?? DEFAULTS.category,
      sort: (searchParams.get("sort") as SortKey) ?? DEFAULTS.sort,
    }),
    [searchParams],
  );

  const updateFilters = useCallback(
    (partial: Partial<ListingFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(partial).forEach(([key, value]) => {
        const paramKey = key === "query" ? "q" : key;
        const defaultValue = DEFAULTS[key as keyof ListingFilters];
        if (!value || value === defaultValue) {
          params.delete(paramKey);
        } else {
          params.set(paramKey, value as string);
        }
      });

      params.delete("page"); // 필터 바뀌면 페이지 1로 리셋

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  return { filters, updateFilters, isPending };
}
