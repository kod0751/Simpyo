import { createClient } from "@/lib/supabase/server";
import { LISTING_PUBLIC_COLUMNS } from "./listingColumns";

export type FeaturedListing = {
  id: string;
  name: string;
  region: string;
  address: string;
  rating: number;
  review_count: number;
  image: string | null;
};

/** 메인 히어로에 보여줄 숙소 — 평점이 가장 높고, 같으면 리뷰가 많은 숙소 */
export async function getFeaturedListing(): Promise<FeaturedListing | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select(LISTING_PUBLIC_COLUMNS)
    .eq("is_active", true)
    .gt("review_count", 0)
    .order("rating", { ascending: false })
    .order("review_count", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as unknown as Record<string, unknown>;

  return {
    id: row.id as string,
    name: row.name as string,
    region: row.region as string,
    address: row.address as string,
    rating: Number(row.rating),
    review_count: row.review_count as number,
    image: (row.images as string[])?.[0] ?? null,
  };
}
