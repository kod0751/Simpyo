import { createClient } from "@/lib/supabase/server";
import type { WishlistItem } from "../model/types";

const MOCK_RATING = 4.8;
const MOCK_REVIEWS = 0;
const MOCK_SUPERHOST = false;

export async function getMyWishlists(userId: string): Promise<WishlistItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wishlists")
    .select(
      `
      id, listing_id, created_at,
      listing:listings!inner (*)
    `,
    )
    .eq("user_id", userId)
    .eq("listing.is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getMyWishlists error:", error);
    return [];
  }

  return (data ?? []).map((row) => {
    const l = row.listing as unknown as Record<string, unknown>;

    return {
      id: row.id,
      listing_id: row.listing_id,
      created_at: row.created_at,
      listing: {
        id: l.id as string,
        host_id: l.host_id as string,
        name: l.name as string,
        description: l.description as string,
        address: l.address as string,
        region: l.region as string,
        category: l.category as string,
        price_per_night: l.price_per_night as number,
        max_guests: l.max_guests as number,
        bedrooms: l.bedrooms as number,
        beds: l.beds as number,
        bathrooms: l.bathrooms as number,
        amenities: (l.amenities as string[]) ?? [],
        tags: (l.tags as string[]) ?? [],
        images: (l.images as string[]) ?? [],
        host_name: (l.host_name as string | null) ?? null,
        host_phone: (l.host_phone as string | null) ?? null,
        is_active: l.is_active as boolean,
        created_at: l.created_at as string,
        updated_at: l.updated_at as string,
        rating: MOCK_RATING,
        reviews: MOCK_REVIEWS,
        superhost: MOCK_SUPERHOST,
      },
    };
  });
}
