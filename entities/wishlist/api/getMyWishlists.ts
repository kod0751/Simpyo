import { createClient } from "@/lib/supabase/server";
import type { WishlistItem } from "../model/types";

export async function getMyWishlists(userId: string): Promise<WishlistItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wishlists")
    .select(
      `
      id, listing_id, created_at,
      listing:listings!inner (id, name, images, address, region, price_per_night)
    `,
    )
    .eq("user_id", userId)
    .eq("listing.is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getMyWishlists error:", error);
    return [];
  }

  return (data ?? []) as unknown as WishlistItem[];
}
