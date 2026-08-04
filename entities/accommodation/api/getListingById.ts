import { createClient } from "@/lib/supabase/server";
import type { Stay } from "../model/types";

// 임시 하드코딩 값 (리뷰/평점 스키마 도입 전까지)
const MOCK_RATING = 4.8;
const MOCK_REVIEWS = 0;
const MOCK_SUPERHOST = false;

export async function getListingById(id: string): Promise<Stay | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("getListingById error:", error);
    return null;
  }

  return {
    id: data.id,
    host_id: data.host_id,
    name: data.name,
    description: data.description,
    address: data.address,
    region: data.region,
    category: data.category,
    price_per_night: data.price_per_night,
    max_guests: data.max_guests,
    bedrooms: data.bedrooms,
    beds: data.beds,
    bathrooms: data.bathrooms,
    amenities: data.amenities ?? [],
    tags: data.tags ?? [],
    images: data.images ?? [],
    host_name: data.host_name,
    host_phone: data.host_phone,
    is_active: data.is_active,
    created_at: data.created_at,
    updated_at: data.updated_at,
    rating: MOCK_RATING,
    reviews: MOCK_REVIEWS,
    superhost: MOCK_SUPERHOST,
  };
}
