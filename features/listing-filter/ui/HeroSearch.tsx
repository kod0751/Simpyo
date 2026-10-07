"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Search } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch() {
    const trimmed = query.trim();
    router.push(
      trimmed ? `/listings?q=${encodeURIComponent(trimmed)}` : "/listings",
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-3 rounded-[2rem] border border-brand-100 bg-white p-3 shadow-premium transition-all hover:shadow-2xl hover:shadow-brand-900/5 sm:flex-row">
      <div className="group w-full flex-1 cursor-text rounded-2xl border border-transparent px-5 py-3 transition-colors hover:bg-brand-50 focus-within:border-brand-200">
        <label
          htmlFor="hero-search"
          className="mb-1 block text-xs font-semibold text-brand-400"
        >
          어디로 떠날까요?
        </label>
        <input
          id="hero-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="지역, 숙소명 검색"
          className="w-full border-none bg-transparent text-lg font-medium text-brand-900 outline-none placeholder:text-brand-300"
        />
      </div>

      <div className="hidden h-12 w-px bg-brand-100 sm:block" />

      {/* Step 4에서 캘린더 연결 예정 */}
      <div className="flex w-full flex-1 items-center gap-3 rounded-2xl px-5 py-3">
        <Calendar size={20} className="text-brand-500" />
        <div>
          <div className="mb-1 text-xs font-semibold text-brand-400">일정</div>
          <div className="font-medium text-brand-300">날짜 추가</div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        aria-label="검색"
        className="flex h-16 w-full cursor-pointer items-center justify-center rounded-[1.25rem] bg-brand-900 text-white shadow-lg shadow-brand-900/20 transition-all hover:scale-105 hover:bg-brand-800 active:scale-95 sm:w-16"
      >
        <Search size={24} />
      </button>
    </div>
  );
}
