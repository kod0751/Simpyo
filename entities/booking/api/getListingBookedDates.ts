import { createClient } from "@/lib/supabase/client";

type BookedRangeRow = {
  check_in: string;
  check_out: string;
};

export async function getListingBookedDates(
  listingId: string,
): Promise<{ checkIn: string; checkOut: string }[]> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_listing_booked_ranges", {
    p_listing_id: listingId,
  });

  if (error) {
    console.error("예약 날짜 조회 실패:", error.message);
    return [];
  }

  return ((data ?? []) as BookedRangeRow[]).map((b) => ({
    checkIn: b.check_in,
    checkOut: b.check_out,
  }));
}
