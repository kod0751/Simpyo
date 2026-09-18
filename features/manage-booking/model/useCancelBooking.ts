import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBooking } from "@/entities/booking/api/cancelBooking";

interface CancelBookingMutationParams {
  bookingId: string;
  hostId: string;
  listingName: string;
  listingId: string;
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CancelBookingMutationParams) => cancelBooking(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["booked-dates", variables.listingId],
      });
    },
  });
}
