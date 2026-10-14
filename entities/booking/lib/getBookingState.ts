import type { Booking } from "../model/types";

export type BookingState = "upcoming" | "completed" | "cancelled";

export function getBookingState(
  booking: Pick<Booking, "status" | "check_out">,
): BookingState {
  if (booking.status === "cancelled") return "cancelled";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(booking.check_out) >= today ? "upcoming" : "completed";
}
