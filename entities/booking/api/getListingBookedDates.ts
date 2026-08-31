import { createClient } from "@/lib/supabase/client";

export async function getListingBookedDates(
  listingId: string,
): Promise<{ checkIn: string; checkOut: string }[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("check_in, check_out")
    .eq("listing_id", listingId)
    .neq("status", "cancelled")
    .gte("check_out", new Date().toISOString().split("T")[0]);

  if (error) {
    console.error("예약 날짜 조회 실패:", error.message);
    return [];
  }

  return data.map((b) => ({ checkIn: b.check_in, checkOut: b.check_out }));
}
