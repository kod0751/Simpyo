"use client";

import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
import { toDateKey, parseDateKey } from "@/shared/lib/date";
import { useListingFilters } from "../model/useListingFilters";

function formatShort(key: string) {
  const date = parseDateKey(key);
  return `${date.getMonth() + 1}.${date.getDate()}`;
}

export function DateRangeFilter() {
  const { filters, updateFilters } = useListingFilters();
  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange | undefined>();

  const hasDates = !!filters.checkIn && !!filters.checkOut;
  const label = hasDates
    ? `${formatShort(filters.checkIn)} - ${formatShort(filters.checkOut)}`
    : "날짜 추가";

  const canApply =
    !!draft?.from && !!draft?.to && toDateKey(draft.from) < toDateKey(draft.to);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function handleToggle() {
    if (!open) {
      setDraft(
        hasDates
          ? {
              from: parseDateKey(filters.checkIn),
              to: parseDateKey(filters.checkOut),
            }
          : undefined,
      );
    }
    setOpen((v) => !v);
  }

  function handleApply() {
    if (!canApply || !draft?.from || !draft?.to) return;
    updateFilters({
      checkIn: toDateKey(draft.from),
      checkOut: toDateKey(draft.to),
    });
    setOpen(false);
  }

  function handleClear() {
    updateFilters({ checkIn: "", checkOut: "" });
    setDraft(undefined);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className={`flex h-12 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors hover:bg-brand-50 ${
          hasDates ? "text-brand-900" : "text-brand-500"
        }`}
      >
        <CalendarDays size={18} />
        {label}
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-3 w-88 rounded-3xl border border-brand-100 bg-white p-4 shadow-premium">
          <Calendar
            mode="range"
            selected={draft}
            onSelect={setDraft}
            disabled={{ before: today }}
            numberOfMonths={1}
            className="w-full [--cell-size:--spacing(10)]"
          />

          <div className="mt-4 flex items-center justify-between border-t border-brand-100 pt-4">
            <button
              type="button"
              onClick={handleClear}
              className="cursor-pointer text-sm font-semibold text-brand-500 underline underline-offset-4 hover:text-brand-900"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!canApply}
              className="cursor-pointer rounded-full bg-brand-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-default disabled:bg-brand-200 disabled:text-brand-400"
            >
              적용
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
