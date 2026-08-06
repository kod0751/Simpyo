import { createClient } from "@/lib/supabase/server";
import type { Stay } from "../model/types";

const MOCK_RATING = 4.8;
const MOCK_REVIEWS = 0;
const MOCK_SUPERHOST = false;

export async function getMyListings(hostId: string): Promise<Stay[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("host_id", hostId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getMyListings error:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    host_id: row.host_id,
    name: row.name,
    description: row.description,
    address: row.address,
    region: row.region,
    category: row.category,
    price_per_night: row.price_per_night,
    max_guests: row.max_guests,
    bedrooms: row.bedrooms,
    beds: row.beds,
    bathrooms: row.bathrooms,
    amenities: row.amenities ?? [],
    tags: row.tags ?? [],
    images: row.images ?? [],
    host_name: row.host_name,
    host_phone: row.host_phone,
    is_active: row.is_active,
    created_at: row.created_at,
    updated_at: row.updated_at,
    rating: MOCK_RATING,
    reviews: MOCK_REVIEWS,
    superhost: MOCK_SUPERHOST,
  }));
}
