import { createClient } from "@/lib/supabase/server";
import type { ReviewableBooking } from "../model/types";

export async function getReviewableBookings(
  guestId: string,
): Promise<ReviewableBooking[]> {
  const supabase = await createClient();

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id, listing_id, check_in, check_out,
      listing:listings!inner (id, name, images, region),
      review:reviews (id)
    `,
    )
    .eq("guest_id", guestId)
    .neq("status", "cancelled")
    .lt("check_out", today)
    .order("check_out", { ascending: false });

  if (error) {
    console.error("getReviewableBookings error:", error);
    return [];
  }

  return (data ?? [])
    .filter((row) => {
      const reviews = row.review as unknown as { id: string }[] | null;
      return !reviews || reviews.length === 0;
    })
    .map((row) => {
      const l = row.listing as unknown as Record<string, unknown>;

      return {
        id: row.id,
        listing_id: row.listing_id,
        check_in: row.check_in,
        check_out: row.check_out,
        listing: {
          id: l.id as string,
          name: l.name as string,
          images: (l.images as string[]) ?? [],
          region: l.region as string,
        },
      };
    });
}
