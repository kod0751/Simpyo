"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { DateRange } from "react-day-picker";
import { Flag, Loader2, CheckCircle2 } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
import { useAuthModal } from "@/features/auth/model/useAuthModal";
import { useListingAvailability } from "@/features/booking-listing/model/useListingAvailability";
import { useCreateBooking } from "@/features/booking-listing/model/useCreateBooking";
import { createClient } from "@/lib/supabase/client";

interface BookingSidebarProps {
  listingId: string;
  hostId: string;
  pricePerNight: number;
  maxGuests: number;
}

function toDateKey(date: Date) {
  return date.toISOString().split("T")[0];
}

export function BookingSidebar({
  listingId,
  hostId,
  pricePerNight,
  maxGuests,
}: BookingSidebarProps) {
  const router = useRouter();
  const openAuthModal = useAuthModal((state) => state.open);
  const { data: bookedRanges = [] } = useListingAvailability(listingId);
  const { mutate, isPending, isSuccess, isError, error } = useCreateBooking();

  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);

  const disabledDates = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [
      { before: today },
      ...bookedRanges.map((b) => ({
        from: new Date(b.checkIn),
        to: new Date(new Date(b.checkOut).getTime() - 86400000), // check_out 당일은 다음 게스트 체크인 가능
      })),
    ];
  }, [bookedRanges]);

  const nights =
    range?.from && range?.to
      ? Math.round(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0;
  const totalPrice = nights * pricePerNight;

  async function handleSubmit() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      openAuthModal();
      return;
    }

    if (user.id === hostId) return;
    if (!range?.from || !range?.to || nights === 0) return;

    mutate({
      listingId,
      hostId,
      guestId: user.id,
      checkIn: toDateKey(range.from),
      checkOut: toDateKey(range.to),
      guestsCount: guests,
      totalPrice,
    });
  }

  if (isSuccess) {
    return (
      <div className="relative lg:col-span-4">
        <div className="sticky top-32 rounded-3xl border border-brand-100 bg-white p-8 text-center shadow-premium">
          <CheckCircle2 size={40} className="mx-auto mb-4 text-green-600" />
          <h3 className="mb-2 text-lg font-bold text-brand-900">
            예약이 확정되었어요
          </h3>
          <p className="mb-6 text-sm text-brand-500">
            {range?.from && toDateKey(range.from)} ~{" "}
            {range?.to && toDateKey(range.to)}
          </p>
          <button
            type="button"
            onClick={() => router.push("/mypage")}
            className="w-full cursor-pointer rounded-xl bg-brand-900 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-800"
          >
            내 예약 확인하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative lg:col-span-4">
      <div className="sticky top-32 rounded-3xl border border-brand-100 bg-white/80 p-1.5 shadow-premium backdrop-blur-xl">
        <div className="rounded-[1.125rem] bg-white p-6 md:p-8">
          <div className="mb-6 flex items-end gap-2">
            <span className="text-3xl font-bold text-brand-900">
              ₩{pricePerNight.toLocaleString()}
            </span>
            <span className="pb-1 font-medium text-brand-500">/ 박</span>
          </div>

          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={disabledDates}
            numberOfMonths={1}
            className="mb-6 rounded-2xl border border-brand-200 [--cell-size:--spacing(10)]"
          />

          <div className="mb-6 flex items-center justify-between rounded-2xl border border-brand-200 p-3">
            <span className="text-sm font-medium text-brand-700">인원</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-brand-200 text-brand-600 hover:border-brand-400"
              >
                −
              </button>
              <span className="w-4 text-center text-sm font-semibold text-brand-900">
                {guests}
              </span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-brand-200 text-brand-600 hover:border-brand-400"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!range?.from || !range?.to || isPending}
            className="mb-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-900 py-4 text-lg font-bold text-white transition-all hover:bg-brand-800 disabled:cursor-default disabled:bg-brand-200 disabled:text-brand-400"
          >
            {isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                예약 처리 중...
              </>
            ) : (
              "예약하기"
            )}
          </button>

          {isError && (
            <p className="mb-4 text-center text-sm text-red-600">
              {error.message}
            </p>
          )}

          <div className="mb-2 text-center text-xs font-medium text-brand-500">
            예약 확정 전에는 요금이 청구되지 않습니다.
          </div>

          {nights > 0 && (
            <div className="mt-6 flex items-center justify-between border-t border-brand-200/50 pt-6 text-lg font-bold text-brand-900">
              <span>
                {pricePerNight.toLocaleString()}원 × {nights}박
              </span>
              <span className="text-xl">{totalPrice.toLocaleString()}원</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-brand-500 hover:text-brand-900">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2"
        >
          <Flag size={16} />
          숙소 신고하기
        </button>
      </div>
    </div>
  );
}
