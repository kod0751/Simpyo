import { useMutation } from "@tanstack/react-query";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/entities/wishlist/api/toggleWishlist";

interface ToggleWishlistParams {
  userId: string;
  listingId: string;
  liked: boolean;
}

export function useToggleWishlist() {
  return useMutation({
    mutationFn: ({ userId, listingId, liked }: ToggleWishlistParams) =>
      liked
        ? addToWishlist(userId, listingId)
        : removeFromWishlist(userId, listingId),
  });
}
