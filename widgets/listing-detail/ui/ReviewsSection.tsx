import { Star } from "lucide-react";
import type { ReviewWithGuest } from "@/entities/review/model/types";

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  reviews: ReviewWithGuest[];
}

function formatReviewDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

export function ReviewsSection({
  rating,
  reviewCount,
  reviews,
}: ReviewsSectionProps) {
  return (
    <section className="border-t border-brand-200/50 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center gap-4">
          <Star size={28} className="fill-brand-900 text-brand-900" />
          <h2 className="text-3xl font-bold tracking-tight text-brand-950 md:text-4xl">
            {reviewCount > 0 ? rating.toFixed(2) : "아직 후기가 없어요"}
            {reviewCount > 0 && (
              <span className="text-xl font-medium text-brand-500">
                {" "}
                · 후기 {reviewCount}개
              </span>
            )}
          </h2>
        </div>

        {reviews.length === 0 ? (
          <p className="text-brand-500">
            이 숙소에 머무신 후 첫 번째 후기를 남겨주세요.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {reviews.map((review) => (
              <div key={review.id} className="space-y-4">
                <div className="flex items-center gap-4">
                  {review.guest.avatar_url ? (
                    <img
                      src={review.guest.avatar_url}
                      alt={review.guest.name ?? "게스트"}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-500">
                      {(review.guest.name ?? "게").charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-brand-900">
                      {review.guest.name ?? "게스트"}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <Star
                            key={score}
                            size={12}
                            className={
                              score <= review.rating
                                ? "fill-accent-500 text-accent-500"
                                : "fill-brand-100 text-brand-200"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-brand-500">
                        {formatReviewDate(review.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="leading-relaxed font-medium break-keep whitespace-pre-line text-brand-700">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
