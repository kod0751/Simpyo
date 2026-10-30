"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";
import { useListingFilters, type SortKey } from "../model/useListingFilters";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "추천순" },
  { value: "rating", label: "평점 높은순" },
  { value: "price-asc", label: "낮은 가격순" },
  { value: "price-desc", label: "높은 가격순" },
];

export function SortSelect() {
  const { filters, updateFilters } = useListingFilters();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current =
    SORT_OPTIONS.find((o) => o.value === filters.sort) ?? SORT_OPTIONS[0];

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
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleSelect(value: SortKey) {
    updateFilters({ sort: value });
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex h-12 w-full cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors sm:w-auto ${
          open
            ? "bg-brand-50 text-brand-900"
            : "text-brand-700 hover:bg-brand-50"
        }`}
      >
        <ArrowUpDown size={18} className="text-brand-500" />
        <span className="whitespace-nowrap">{current.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="ml-auto sm:ml-0"
        >
          <ChevronDown size={16} className="text-brand-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="정렬 기준"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top right" }}
            className="absolute top-full right-0 left-0 z-50 mt-3 rounded-2xl border border-brand-100 bg-white p-1.5 shadow-premium sm:left-auto sm:w-48"
          >
            {SORT_OPTIONS.map((option) => {
              const selected = option.value === current.value;

              return (
                <li key={option.value} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-brand-50 ${
                      selected
                        ? "font-semibold text-brand-900"
                        : "text-brand-600"
                    }`}
                  >
                    {option.label}
                    {selected && <Check size={16} className="text-brand-900" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
