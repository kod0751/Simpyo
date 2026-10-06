"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { ReviewableBooking } from "@/entities/review/model/types";
import { StarRatingInput } from "./StarRatingInput";
import { useCreateReview } from "../model/useCreateReview";

interface ReviewFormProps {
  booking: ReviewableBooking;
  guestId: string;
}

const MIN_CONTENT_LENGTH = 10;
const MAX_CONTENT_LENGTH = 500;

export function ReviewForm({ booking, guestId }: ReviewFormProps) {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useCreateReview();

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const trimmedLength = content.trim().length;
  const canSubmit = rating > 0 && trimmedLength >= MIN_CONTENT_LENGTH;

  function handleSubmit() {
    if (!canSubmit) return;

    mutate(
      {
        bookingId: booking.id,
        listingId: booking.listing_id,
        guestId,
        rating,
        content: content.trim(),
      },
      {
        onSuccess: () => {
          router.refresh();
          router.push(`/listings/${booking.listing_id}`);
        },
      },
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50/50 p-4">
        <img
          src={booking.listing.images[0] ?? "/placeholder.svg"}
          alt={booking.listing.name}
          className="h-16 w-16 rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-brand-900">{booking.listing.name}</h2>
          <p className="text-sm text-brand-500">
            {booking.listing.region} · {booking.check_in} ~ {booking.check_out}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-bold text-brand-900">
          숙소는 어떠셨나요?
        </h3>
        <StarRatingInput value={rating} onChange={setRating} />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-bold text-brand-900">
          후기를 남겨주세요
        </h3>
        <textarea
          rows={8}
          maxLength={MAX_CONTENT_LENGTH}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="숙소의 분위기, 청결도, 호스트의 배려 등 다음 게스트에게 도움이 될 경험을 자유롭게 들려주세요."
          className="w-full resize-none rounded-2xl border border-brand-200 bg-white px-5 py-4 text-base leading-relaxed text-brand-900 outline-none transition-colors placeholder:text-brand-300 focus:border-brand-900"
        />
        <div className="mt-2 flex items-center justify-between text-xs">
          <span
            className={
              trimmedLength < MIN_CONTENT_LENGTH
                ? "text-brand-400"
                : "text-transparent"
            }
          >
            최소 {MIN_CONTENT_LENGTH}자 이상 작성해 주세요
          </span>
          <span className="text-brand-300">
            {content.length}/{MAX_CONTENT_LENGTH}
          </span>
        </div>
      </div>

      {isError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error.message}
        </p>
      )}

      <div className="flex items-center justify-end gap-3 border-t border-brand-100 pt-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer rounded-full border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-400"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit || isPending}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-brand-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-default disabled:bg-brand-200 disabled:text-brand-400"
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              등록 중...
            </>
          ) : (
            "리뷰 등록"
          )}
        </button>
      </div>
    </div>
  );
}
