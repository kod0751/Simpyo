import { Stay } from "@/entities/accommodation/model/types";

export type WishlistItem = {
  id: string;
  listing_id: string;
  created_at: string;
  listing: Stay;
};
