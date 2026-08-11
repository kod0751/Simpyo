import { Suspense } from "react";
import { getListings } from "@/entities/accommodation/api/getListings";
import { SearchInput } from "@/features/listing-filter/ui/SearchInput";
import { SortSelect } from "@/features/listing-filter/ui/SortSelect";
import { CategoryFilter } from "@/features/listing-filter/ui/CategoryFilter";
import type { SortKey } from "@/features/listing-filter/model/useListingFilters";
import { MapPin } from "lucide-react";
import { ListingGrid } from "@/widgets/listing-list";

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}

export default async function ListingsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const results = await getListings({
    query: params.q,
    category: params.category,
    sort: params.sort as SortKey,
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-widest text-brand-700 uppercase">
          <MapPin size={14} className="text-accent-500" />
          전체 숙소
        </div>
        <h1 className="text-4xl font-bold tracking-tight break-keep text-brand-950 md:text-5xl">
          당신을 위한 완벽한 쉼터를 찾아보세요
        </h1>
      </div>

      <Suspense
        fallback={<div className="mb-8 h-17 rounded-[2rem] bg-brand-50" />}
      >
        <div className="sticky top-24 z-30 mb-8 flex flex-col gap-3 rounded-[2rem] border border-brand-100 bg-white/90 p-3 shadow-premium backdrop-blur-xl sm:flex-row sm:items-center">
          <SearchInput />
          <div className="hidden h-10 w-px bg-brand-100 sm:block" />
          <SortSelect />
        </div>
        <CategoryFilter />
      </Suspense>

      <Suspense fallback={null}>
        <ListingGrid listings={results} />
      </Suspense>
    </div>
  );
}
