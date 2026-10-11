"use client";

import { CalendarDays } from "lucide-react";
import { DateRangePicker } from "@/shared/ui/DateRangePicker";
import { formatRangeLabel } from "@/shared/lib/date";
import { useListingFilters } from "../model/useListingFilters";

export function DateRangeFilter() {
  const { filters, updateFilters } = useListingFilters();

  const hasDates = !!filters.checkIn && !!filters.checkOut;
  const label = hasDates
    ? formatRangeLabel(filters.checkIn, filters.checkOut)
    : "날짜 추가";

  return (
    <DateRangePicker
      value={{ checkIn: filters.checkIn, checkOut: filters.checkOut }}
      onChange={updateFilters}
      align="right"
      triggerClassName={`flex h-12 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors hover:bg-brand-50 ${
        hasDates ? "text-brand-900" : "text-brand-500"
      }`}
      trigger={
        <>
          <CalendarDays size={18} />
          {label}
        </>
      }
    />
  );
}
