"use client";

import type React from "react";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchBar() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    //TODO: 검색 동작
    console.log("search:", { destination, checkIn, checkOut, guests });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-2 rounded-3xl border border-border bg-card p-2 shadow-lg md:flex-row md:items-center md:gap-0 md:rounded-full"
    >
      <label className="flex flex-1 flex-col px-5 py-2 md:border-r md:border-border">
        <span className="text-xs font-semibold text-foreground">여행지</span>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="어디로 떠나시나요?"
          className="bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </label>
      <label className="flex flex-col px-5 py-2 md:border-r md:border-border">
        <span className="text-xs font-semibold text-foreground">체크인</span>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="bg-transparent text-sm text-foreground outline-none"
        />
      </label>
      <label className="flex flex-col px-5 py-2 md:border-r md:border-border">
        <span className="text-xs font-semibold text-foreground">체크아웃</span>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="bg-transparent text-sm text-foreground outline-none"
        />
      </label>
      <div className="flex items-center gap-2 px-3">
        <label className="flex flex-1 flex-col px-2 py-2">
          <span className="text-xs font-semibold text-foreground">인원</span>
          <input
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="게스트 추가"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
        <button
          type="submit"
          aria-label="검색"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Search className="size-5" />
        </button>
      </div>
    </form>
  );
}
