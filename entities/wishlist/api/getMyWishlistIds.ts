import { createClient } from "@/lib/supabase/server";

export async function getMyWishlistIds(userId: string): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wishlists")
    .select("listing_id")
    .eq("user_id", userId);

  if (error) {
    console.error("getMyWishlistIds error:", error);
    return [];
  }

  return data.map((row) => row.listing_id);
}
