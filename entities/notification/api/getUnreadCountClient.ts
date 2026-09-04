import { createClient } from "@/lib/supabase/client";

export async function getUnreadCountClient(userId: string): Promise<number> {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) {
    console.error("getUnreadCountClient error:", error);
    return 0;
  }

  return count ?? 0;
}
