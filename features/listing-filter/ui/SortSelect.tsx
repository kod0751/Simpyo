"use client";

import { SlidersHorizontal } from "lucide-react";
import { useListingFilters, type SortKey } from "../model/useListingFilters";

const sortOptions: { id: SortKey; label: string }[] = [
  { id: "recommended", label: "추천순" },
  { id: "rating", label: "평점 높은순" },
  { id: "price-asc", label: "낮은 가격순" },
  { id: "price-desc", label: "높은 가격순" },
];

export function SortSelect() {
  const { filters, updateFilters } = useListingFilters();
  return (
    <div className="flex items-center gap-2 px-2 sm:px-5">
      <SlidersHorizontal size={16} className="shrink-0 text-brand-500" />
      <label htmlFor="sort" className="sr-only">
        정렬 기준
      </label>
      <select
        id="sort"
        value={filters.sort}
        onChange={(e) => updateFilters({ sort: e.target.value as SortKey })}
        className="cursor-pointer border-none bg-transparent text-sm font-semibold text-brand-800 outline-none"
      >
        {sortOptions.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
