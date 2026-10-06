import { createClient } from "@/lib/supabase/server";

export async function getMyReviewCount(guestId: string): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("guest_id", guestId);

  if (error) {
    console.error("getMyReviewCount error:", error);
    return 0;
  }

  return count ?? 0;
}
