import { createClient } from "@/lib/supabase/client";

interface CancelBookingParams {
  bookingId: string;
  hostId: string;
  listingName: string;
}

export async function cancelBooking({
  bookingId,
  hostId,
  listingName,
}: CancelBookingParams): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId);

  if (error) {
    throw new Error(`예약 취소에 실패했어요: ${error.message}`);
  }

  const { error: notificationError } = await supabase
    .from("notifications")
    .insert({
      user_id: hostId,
      type: "booking_cancelled",
      booking_id: bookingId,
      message: `'${listingName}' 예약이 취소되었어요.`,
    });

  if (notificationError) {
    console.error("취소 알림 생성 실패:", notificationError.message);
  }
}
