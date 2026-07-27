"use client";

import { Frown } from "lucide-react";
import { useListingFilters } from "@/features/listing-filter/model/useListingFilters";
import { StayCard } from "@/entities/accommodation/ui/StayCard";
import { Stay } from "@/entities/accommodation/model/types";

interface ListingGridProps {
  listings: Stay[];
}

export function ListingGrid({ listings }: ListingGridProps) {
  const { updateFilters } = useListingFilters();

  return (
    <>
      <p className="mb-6 text-sm text-brand-500">
        총{" "}
        <span className="font-satoshi font-bold text-brand-900">
          {listings.length}
        </span>
        개의 숙소
      </p>

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-500">
            <Frown size={28} />
          </div>
          <h2 className="mb-2 text-lg font-semibold text-brand-900">
            검색 결과가 없어요
          </h2>
          <p className="max-w-sm break-keep text-sm text-brand-500">
            다른 지역이나 테마로 검색해 보세요. 조건을 바꾸면 더 많은 쉼터를
            만날 수 있어요.
          </p>
          <button
            type="button"
            onClick={() => updateFilters({ query: "", category: "all" })}
            className="mt-6 rounded-full bg-brand-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-800"
          >
            전체 숙소 보기
          </button>
        </div>
      )}
    </>
  );
}
