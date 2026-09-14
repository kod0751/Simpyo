import { createClient } from "@/lib/supabase/client";
import type { Notification } from "../model/types";

export async function getMyNotificationsClient(
  userId: string,
): Promise<Notification[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("notifications")
    .select("*, booking:bookings(listing_id)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("getMyNotificationsClient error:", error);
    return [];
  }

  return data.map((n) => ({
    id: n.id,
    user_id: n.user_id,
    type: n.type,
    booking_id: n.booking_id,
    message: n.message,
    is_read: n.is_read,
    created_at: n.created_at,
    listing_id: n.booking?.listing_id ?? null,
  }));
}
