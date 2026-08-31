import { createClient } from "@/lib/supabase/client";
import type { Booking } from "../model/types";

interface CreateBookingParams {
  listingId: string;
  hostId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPrice: number;
}

export async function createBooking(
  params: CreateBookingParams,
): Promise<Booking> {
  const supabase = createClient();

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      listing_id: params.listingId,
      guest_id: params.guestId,
      check_in: params.checkIn,
      check_out: params.checkOut,
      guests_count: params.guestsCount,
      total_price: params.totalPrice,
      status: "confirmed",
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23P01") {
      throw new Error(
        "선택하신 날짜는 이미 예약되었어요. 다른 날짜를 선택해 주세요.",
      );
    }
    throw new Error(`예약에 실패했어요: ${error.message}`);
  }

  const { error: notificationError } = await supabase
    .from("notifications")
    .insert({
      user_id: params.hostId,
      type: "booking_created",
      booking_id: booking.id,
      message: `${params.checkIn} ~ ${params.checkOut} 새로운 예약이 들어왔어요.`,
    });

  if (notificationError) {
    console.error("알림 생성 실패:", notificationError.message);
  }

  return booking as Booking;
}
