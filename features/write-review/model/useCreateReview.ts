import { useMutation } from "@tanstack/react-query";
import { createReview } from "@/entities/review/api/createReview";

interface CreateReviewParams {
  bookingId: string;
  listingId: string;
  guestId: string;
  rating: number;
  content: string;
}

export function useCreateReview() {
  return useMutation({
    mutationFn: (params: CreateReviewParams) => createReview(params),
  });
}
