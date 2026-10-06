import { createClient } from "@/lib/supabase/client";
import type { Review } from "../model/types";

interface CreateReviewParams {
  bookingId: string;
  listingId: string;
  guestId: string;
  rating: number;
  content: string;
}

export async function createReview(
  params: CreateReviewParams,
): Promise<Review> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      booking_id: params.bookingId,
      listing_id: params.listingId,
      guest_id: params.guestId,
      rating: params.rating,
      content: params.content,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("이미 이 숙소에 대한 리뷰를 작성하셨어요.");
    }
    if (error.code === "42501") {
      throw new Error("숙박이 완료된 예약에만 리뷰를 작성할 수 있어요.");
    }
    throw new Error(`리뷰 작성에 실패했어요: ${error.message}`);
  }

  return data as Review;
}
