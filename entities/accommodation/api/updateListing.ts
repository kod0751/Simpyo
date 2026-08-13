import { createClient } from "@/lib/supabase/client";
import { amenities, highlightTags, type Tag } from "@/lib/host";
import type { EditFormData } from "@/features/edit-listing/model/useEditListingForm";
import type { Stay } from "../model/types";

const BUCKET_NAME = "listing-images";

function extractStoragePath(imageUrl: string): string | null {
  const marker = `/${BUCKET_NAME}/`;
  const index = imageUrl.indexOf(marker);
  if (index === -1) return null;
  return imageUrl.slice(index + marker.length);
}

async function uploadNewPhotos(
  photos: File[],
  hostId: string,
): Promise<string[]> {
  const supabase = createClient();
  const uploadedUrls: string[] = [];

  for (const photo of photos) {
    const fileExt = photo.name.split(".").pop();
    const fileName = `${hostId}/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, photo);
    if (uploadError) {
      throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
}

async function removeDeletedImages(removedUrls: string[]) {
  if (removedUrls.length === 0) return;

  const supabase = createClient();
  const paths = removedUrls
    .map(extractStoragePath)
    .filter((p): p is string => p !== null);

  if (paths.length > 0) {
    const { error } = await supabase.storage.from(BUCKET_NAME).remove(paths);
    if (error) {
      console.error("삭제된 이미지 정리 중 일부 실패:", error.message);
    }
  }
}

interface UpdateListingParams {
  id: string;
  hostId: string;
  form: EditFormData;
  originalImages: string[];
}

export async function updateListing({
  id,
  hostId,
  form,
  originalImages,
}: UpdateListingParams): Promise<Stay> {
  const supabase = createClient();

  const newImageUrls = await uploadNewPhotos(form.newPhotos, hostId);
  const finalImages = [...form.existingImages, ...newImageUrls];

  const removedImages = originalImages.filter(
    (url) => !form.existingImages.includes(url),
  );
  await removeDeletedImages(removedImages);

  const amenityLabels = form.amenities.map(
    (id) => amenities.find((a) => a.id === id)?.label ?? id,
  );
  const tagLabels = form.tags.map(
    (id) => (highlightTags as Tag[]).find((t) => t.id === id)?.label ?? id,
  );

  const { data, error } = await supabase
    .from("listings")
    .update({
      name: form.title,
      description: form.description,
      address: form.address,
      region: form.region,
      category: form.propertyType,
      price_per_night: form.price,
      max_guests: form.maxGuests,
      bedrooms: form.bedrooms,
      beds: form.beds,
      bathrooms: form.bathrooms,
      amenities: amenityLabels,
      tags: tagLabels,
      images: finalImages,
      host_name: form.hostName,
      host_phone: form.hostPhone,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`숙소 수정 실패: ${error.message}`);
  }

  return data as Stay;
}
