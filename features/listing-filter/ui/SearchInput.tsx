"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useListingFilters } from "../model/useListingFilters";

export function SearchInput() {
  const { filters, updateFilters } = useListingFilters();
  const [localQuery, setLocalQuery] = useState(filters.query);
  const [prevFiltersQuery, setPrevFiltersQuery] = useState(filters.query);

  if (filters.query !== prevFiltersQuery) {
    setPrevFiltersQuery(filters.query);
    setLocalQuery(filters.query);
  }

  useEffect(() => {
    if (localQuery === filters.query) return;

    const timeout = setTimeout(() => {
      updateFilters({ query: localQuery });
    }, 400);

    return () => clearTimeout(timeout);
  }, [localQuery, filters.query, updateFilters]);

  return (
    <div className="flex flex-1 items-center gap-3 rounded-2xl px-5 py-3 transition-colors focus-within:bg-brand-50">
      <Search size={20} className="shrink-0 text-brand-500" />
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="지역, 숙소명, 테마 검색"
        className="w-full border-none bg-transparent text-base font-medium text-brand-900 outline-none placeholder:text-brand-300"
      />
    </div>
  );
}
