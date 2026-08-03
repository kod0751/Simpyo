import type { SortKey } from "@/features/listing-filter/model/useListingFilters";
import { Stay } from "../model/types";
import { createClient } from "@/lib/supabase/server";

interface GetListingsParams {
  query?: string;
  category?: string;
  sort?: SortKey;
}

// 임시 하드코딩 값 (리뷰/평점 스키마 도입 전까지)
const MOCK_RATING = 4.8;
const MOCK_REVIEWS = 0;
const MOCK_SUPERHOST = false;

export async function getListings({
  query = "",
  category = "all",
  sort = "recommended",
}: GetListingsParams): Promise<Stay[]> {
  const supabase = await createClient();

  let q = supabase.from("listings").select("*").eq("is_active", true);

  if (category !== "all") {
    q = q.eq("category", category);
  }

  const trimmed = query.trim();
  if (trimmed) {
    q = q.or(
      `name.ilike.%${trimmed}%,address.ilike.%${trimmed}%,region.ilike.%${trimmed}%`,
    );
  }

  if (sort === "price-asc") {
    q = q.order("price_per_night", { ascending: true });
  } else if (sort === "price-desc") {
    q = q.order("price_per_night", { ascending: false });
  } else {
    q = q.order("created_at", { ascending: false });
  }

  const { data, error } = await q;

  if (error) {
    console.error("getListings error:", error);
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
