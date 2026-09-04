import { createClient } from "@/lib/supabase/server";
import type { BookingWithListing } from "../model/types";

export async function getMyBookings(
  guestId: string,
): Promise<BookingWithListing[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
    id, listing_id, guest_id, check_in, check_out, guests_count, total_price, status, created_at, updated_at,
    listing:listings (id, name, images, address, region, host_name)
  `,
    )
    .eq("guest_id", guestId)
    .order("check_in", { ascending: true });

  if (error) {
    console.error("getMyBookings error:", error);
    return [];
  }

  return (data ?? []) as unknown as BookingWithListing[];
}
