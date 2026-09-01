import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "@/entities/booking/api/createBooking";

interface CreateBookingParams {
  listingId: string;
  hostId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPrice: number;
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateBookingParams) => createBooking(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["booked-dates", variables.listingId],
      });
    },
  });
}
