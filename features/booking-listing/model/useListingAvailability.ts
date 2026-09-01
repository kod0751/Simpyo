import { useQuery } from "@tanstack/react-query";
import { getListingBookedDates } from "@/entities/booking/api/getListingBookedDates";

export function useListingAvailability(listingId: string) {
  return useQuery({
    queryKey: ["booked-dates", listingId],
    queryFn: () => getListingBookedDates(listingId),
  });
}
