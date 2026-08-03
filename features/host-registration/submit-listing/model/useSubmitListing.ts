import { useMutation } from "@tanstack/react-query";
import { createListing } from "@/entities/accommodation/api/createListing";
import type { HostFormData } from "@/lib/host";

interface SubmitListingParams {
  form: HostFormData;
  hostId: string;
}

export function useSubmitListing() {
  return useMutation({
    mutationFn: ({ form, hostId }: SubmitListingParams) =>
      createListing(form, hostId),
  });
}
