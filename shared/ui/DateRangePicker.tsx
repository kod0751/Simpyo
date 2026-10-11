"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/shared/components/ui/calendar";
import { toDateKey, parseDateKey } from "@/shared/lib/date";

export interface DateRangeValue {
  checkIn: string;
  checkOut: string;
}

interface DateRangePickerProps {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  trigger: ReactNode;
  triggerClassName?: string;
  align?: "left" | "right";
}

export function DateRangePicker({
  value,
  onChange,
  trigger,
  triggerClassName,
  align = "right",
}: DateRangePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange | undefined>();

  const hasValue = !!value.checkIn && !!value.checkOut;
  const canApply =
    !!draft?.from && !!draft?.to && toDateKey(draft.from) < toDateKey(draft.to);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
        hasValue
          ? {
              from: parseDateKey(value.checkIn),
              to: parseDateKey(value.checkOut),
            }
          : undefined,
      );
    }
    setOpen((v) => !v);
  }

  function handleApply() {
    if (!canApply || !draft?.from || !draft?.to) return;
    onChange({ checkIn: toDateKey(draft.from), checkOut: toDateKey(draft.to) });
    setOpen(false);
  }

  function handleClear() {
    onChange({ checkIn: "", checkOut: "" });
    setDraft(undefined);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button type="button" onClick={handleToggle} className={triggerClassName}>
        {trigger}
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 mt-3 w-[22rem] rounded-3xl border border-brand-100 bg-white p-4 shadow-premium ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
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
