"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Users, CalendarX } from "lucide-react";
import type { HostBooking } from "@/entities/booking/model/types";
import {
  getBookingState,
  type BookingState,
} from "@/entities/booking/lib/getBookingState";

interface HostBookingsListProps {
  bookings: HostBooking[];
}

type FilterTab = "all" | BookingState;

const TABS: { key: FilterTab; label: string }[] = [
  { key: "upcoming", label: "예정" },
  { key: "completed", label: "완료" },
  { key: "cancelled", label: "취소됨" },
  { key: "all", label: "전체" },
];

const STATE_BADGE: Record<BookingState, { label: string; className: string }> =
  {
    upcoming: { label: "예정", className: "bg-brand-100 text-brand-600" },
    completed: {
      label: "완료",
      className: "border border-brand-200 bg-brand-50 text-brand-400",
    },
    cancelled: {
      label: "취소됨",
      className: "border border-red-200 bg-red-50 text-red-500",
    },
  };

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function countNights(checkIn: string, checkOut: string) {
  return Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24),
  );
}

export function HostBookingsList({ bookings }: HostBookingsListProps) {
  const [tab, setTab] = useState<FilterTab>("upcoming");
  const [listingId, setListingId] = useState<string>("all");

  const withState = useMemo(
    () => bookings.map((b) => ({ booking: b, state: getBookingState(b) })),
    [bookings],
  );

  const listingOptions = useMemo(() => {
    const map = new Map<string, string>();
    bookings.forEach((b) => map.set(b.listing.id, b.listing.name));
    return Array.from(map, ([id, name]) => ({ id, name }));
  }, [bookings]);

  const byListing =
    listingId === "all"
      ? withState
      : withState.filter((b) => b.booking.listing_id === listingId);

  const counts = {
    all: byListing.length,
    upcoming: byListing.filter((b) => b.state === "upcoming").length,
    completed: byListing.filter((b) => b.state === "completed").length,
    cancelled: byListing.filter((b) => b.state === "cancelled").length,
  };

  const filtered =
    tab === "all" ? byListing : byListing.filter((b) => b.state === tab);

  const sorted = [...filtered].sort((a, b) => {
    const diff =
      new Date(a.booking.check_in).getTime() -
      new Date(b.booking.check_in).getTime();
    return tab === "upcoming" ? diff : -diff;
  });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-brand-200/50 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`cursor-pointer border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === t.key
                  ? "border-brand-900 text-brand-900"
                  : "border-transparent text-brand-400 hover:text-brand-700"
              }`}
            >
              {t.label}
              <span className="font-satoshi ml-1.5 text-xs text-brand-400">
                {counts[t.key]}
              </span>
            </button>
          ))}
        </div>

        {listingOptions.length > 1 && (
          <select
            value={listingId}
            onChange={(e) => setListingId(e.target.value)}
            className="mb-2 cursor-pointer rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-700 outline-none focus:border-brand-900"
          >
            <option value="all">모든 숙소</option>
            {listingOptions.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <CalendarX size={32} className="text-brand-300" />
          <p className="text-sm font-semibold text-brand-700">
            해당하는 예약이 없어요
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map(({ booking, state }) => {
            const badge = STATE_BADGE[state];
            const nights = countNights(booking.check_in, booking.check_out);

            return (
              <div
                key={booking.id}
                className="flex flex-col gap-4 rounded-2xl border border-brand-200/50 bg-white p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3 sm:w-48 sm:shrink-0">
                  {booking.guest.avatar_url ? (
                    <img
                      src={booking.guest.avatar_url}
                      alt={booking.guest.name ?? "게스트"}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-500">
                      {(booking.guest.name ?? "게").charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-bold text-brand-900">
                      {booking.guest.name ?? "게스트"}
                    </p>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-1.5 text-sm text-brand-600">
                  <Link
                    href={`/listings/${booking.listing_id}`}
                    className="font-semibold text-brand-900 hover:underline"
                  >
                    {booking.listing.name}
                  </Link>
                  <p className="flex items-center gap-1.5">
                    <CalendarDays size={14} className="text-brand-400" />
                    {formatDate(booking.check_in)} -{" "}
                    {formatDate(booking.check_out)} · {nights}박
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users size={14} className="text-brand-400" />
                    게스트 {booking.guests_count}명
                  </p>
                </div>

                <div className="text-right sm:shrink-0">
                  <p
                    className={`font-satoshi text-lg font-bold ${
                      state === "cancelled"
                        ? "text-brand-300 line-through"
                        : "text-brand-900"
                    }`}
                  >
                    {booking.total_price.toLocaleString()}원
                  </p>
                  <p className="text-xs text-brand-400">
                    예약일 {formatDate(booking.created_at)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
