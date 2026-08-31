import { createClient } from "@/lib/supabase/server";
import type { Notification } from "../model/types";

export async function getMyNotifications(
  userId: string,
): Promise<Notification[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("getMyNotifications error:", error);
    return [];
  }

  return data as Notification[];
}
