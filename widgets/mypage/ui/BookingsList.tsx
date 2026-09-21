"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, CalendarX } from "lucide-react";
import type { BookingWithListing } from "@/entities/booking/model/types";
import { isCancellable } from "@/entities/booking/lib/isCancellable";
import { CancelBookingButton } from "@/features/manage-booking/ui/CancelBookingButton";

interface BookingsListProps {
  bookings: BookingWithListing[];
}

type FilterTab = "all" | "upcoming" | "completed" | "cancelled";

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "upcoming", label: "예정" },
  { key: "completed", label: "완료" },
  { key: "cancelled", label: "취소됨" },
];

function getBookingState(booking: BookingWithListing, today: Date): FilterTab {
  if (booking.status === "cancelled") return "cancelled";
  if (new Date(booking.check_out) >= today) return "upcoming";
  return "completed";
}

function formatDateRange(checkIn: string, checkOut: string) {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  return `${inDate.getMonth() + 1}월 ${inDate.getDate()}일 - ${outDate.getMonth() + 1}월 ${outDate.getDate()}일`;
}

export function BookingsList({ bookings }: BookingsListProps) {
  const [tab, setTab] = useState<FilterTab>("all");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const withState = bookings.map((b) => ({
    booking: b,
    state: getBookingState(b, today),
  }));
  const filtered =
    tab === "all" ? withState : withState.filter((b) => b.state === tab);

  const sorted = [...filtered].sort(
    (a, b) =>
      new Date(b.booking.check_in).getTime() -
      new Date(a.booking.check_in).getTime(),
  );

  return (
    <div>
      <div className="mb-8 flex gap-2 border-b border-brand-200/50">
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
          </button>
        ))}
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
          {sorted.map(({ booking, state }) => (
            <div
              key={booking.id}
              className="flex flex-col gap-4 rounded-2xl border border-brand-200/50 bg-white p-4 transition-colors hover:border-brand-300 sm:flex-row sm:items-center"
            >
              <img
                src={booking.listing.images[0] ?? "/placeholder.svg"}
                alt={booking.listing.name}
                className="h-28 w-full rounded-xl object-cover sm:h-20 sm:w-28"
              />

              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-bold text-brand-900">
                    {booking.listing.name}
                  </h3>
                  {state === "cancelled" && (
                    <span className="rounded-md border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500">
                      취소됨
                    </span>
                  )}
                  {state === "upcoming" && (
                    <span className="rounded-md bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-500">
                      예정됨
                    </span>
                  )}
                  {state === "completed" && (
                    <span className="rounded-md border border-brand-200 bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-400">
                      완료됨
                    </span>
                  )}
                </div>
                <p className="mb-1 flex items-center gap-1.5 text-sm text-brand-500">
                  <CalendarDays size={14} />
                  {formatDateRange(booking.check_in, booking.check_out)} ·
                  게스트 {booking.guests_count}명
                </p>
                <p className="flex items-center gap-1.5 text-sm text-brand-500">
                  <MapPin size={14} />
                  {booking.listing.region} · {booking.listing.address}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="font-satoshi font-bold text-brand-900">
                  {booking.total_price.toLocaleString()}원
                </span>
                <div className="flex gap-2">
                  <Link
                    href={`/listings/${booking.listing_id}`}
                    className="rounded-lg border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                  >
                    숙소 보기
                  </Link>
                  {state === "upcoming" && isCancellable(booking.check_in) && (
                    <CancelBookingButton
                      bookingId={booking.id}
                      hostId={booking.listing.host_id}
                      listingId={booking.listing_id}
                      listingName={booking.listing.name}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
