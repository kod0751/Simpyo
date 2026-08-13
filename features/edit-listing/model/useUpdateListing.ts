import { useMutation } from "@tanstack/react-query";
import { updateListing } from "@/entities/accommodation/api/updateListing";
import type { EditFormData } from "./useEditListingForm";

interface UpdateListingMutationParams {
  id: string;
  hostId: string;
  form: EditFormData;
  originalImages: string[];
}

export function useUpdateListing() {
  return useMutation({
    mutationFn: (params: UpdateListingMutationParams) => updateListing(params),
  });
}
