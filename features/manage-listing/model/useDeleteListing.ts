import { useMutation } from "@tanstack/react-query";
import { deleteListing } from "@/entities/accommodation/api/deleteListing";

interface DeleteListingParams {
  id: string;
  images: string[];
}

export function useDeleteListing() {
  return useMutation({
    mutationFn: ({ id, images }: DeleteListingParams) =>
      deleteListing(id, images),
  });
}
