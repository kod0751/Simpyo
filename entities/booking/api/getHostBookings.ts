import { createClient } from "@/lib/supabase/server";
import type { HostBooking } from "../model/types";

export async function getHostBookings(hostId: string): Promise<HostBooking[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id, listing_id, guest_id, check_in, check_out, guests_count, total_price, status, created_at, updated_at,
      listing:listings!inner (id, name, images, host_id),
      guest:profiles!bookings_guest_id_fkey (id, name, avatar_url)
    `,
    )
    .eq("listing.host_id", hostId)
    .order("check_in", { ascending: true });

  if (error) {
    console.error("getHostBookings error:", error);
    return [];
  }

  return (data ?? []) as unknown as HostBooking[];
}
