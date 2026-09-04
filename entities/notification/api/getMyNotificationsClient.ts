import { createClient } from "@/lib/supabase/client";
import type { Notification } from "../model/types";

export async function getMyNotificationsClient(
  userId: string,
): Promise<Notification[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("getMyNotificationsClient error:", error);
    return [];
  }

  return data as Notification[];
}
