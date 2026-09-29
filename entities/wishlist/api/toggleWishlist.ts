import { createClient } from "@/lib/supabase/client";

export async function addToWishlist(
  userId: string,
  listingId: string,
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("wishlists")
    .insert({ user_id: userId, listing_id: listingId });

  // 23505 = unique 위반: 이미 찜한 상태이므로 목표 상태(찜됨)와 같아 성공으로 취급
  if (error && error.code !== "23505") {
    throw new Error(`찜하기 실패: ${error.message}`);
  }
}

export async function removeFromWishlist(
  userId: string,
  listingId: string,
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("wishlists")
    .delete()
    .eq("user_id", userId)
    .eq("listing_id", listingId);

  if (error) {
    throw new Error(`찜 해제 실패: ${error.message}`);
  }
}
