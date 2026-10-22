import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBooking,
  CreateBookingParams,
} from "@/entities/booking/api/createBooking";

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
