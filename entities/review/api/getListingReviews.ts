import { createClient } from "@/lib/supabase/server";
import type { ReviewWithGuest } from "../model/types";

export async function getListingReviews(
  listingId: string,
): Promise<ReviewWithGuest[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      id, booking_id, listing_id, guest_id, rating, content, created_at, updated_at,
      guest:profiles!inner (id, name, avatar_url)
    `,
    )
    .eq("listing_id", listingId)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("getListingReviews error:", error);
    return [];
  }

  return (data ?? []) as unknown as ReviewWithGuest[];
}
