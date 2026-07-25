// features/listing-filter/ui/CategoryFilter.tsx
"use client";

import { categories } from "@/entities/accommodation/model/categroires";
import { useListingFilters } from "../model/useListingFilters";

export function CategoryFilter() {
  const { filters, updateFilters } = useListingFilters();

  return (
    <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
      {categories.map((cat) => {
        const active = filters.category === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => updateFilters({ category: cat.id })}
            aria-pressed={active}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
              active
                ? "border-brand-900 bg-brand-900 text-white shadow-lg shadow-brand-900/20"
                : "border-brand-200 bg-white text-brand-600 hover:border-brand-300 hover:text-brand-900"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
