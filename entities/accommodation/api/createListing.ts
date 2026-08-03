import { createClient } from "@/lib/supabase/client";
import { amenities, highlightTags, type HostFormData } from "@/lib/host";
import type { Stay } from "../model/types";

const BUCKET_NAME = "listing-images";

export async function uploadListingImages(
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

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    uploadedUrls.push(publicUrlData.publicUrl);
  }

  return uploadedUrls;
}

export async function createListing(
  form: HostFormData,
  hostId: string,
): Promise<Stay> {
  const supabase = createClient();

  const imageUrls = await uploadListingImages(form.photos, hostId);

  const amenityLabels = form.amenities.map(
    (id) => amenities.find((a) => a.id === id)?.label ?? id,
  );
  const tagLabels = form.tags.map(
    (id) => highlightTags.find((t) => t.id === id)?.label ?? id,
  );

  const { data, error } = await supabase
    .from("listings")
    .insert({
      host_id: hostId,
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
      images: imageUrls,
      host_name: form.hostName,
      host_phone: form.hostPhone,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`숙소 등록 실패: ${error.message}`);
  }

  return data as Stay;
}
