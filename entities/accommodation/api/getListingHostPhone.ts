import { createClient } from "@/lib/supabase/server";

export async function getListingHostPhone(
  listingId: string,
): Promise<string | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_listing_host_phone", {
    p_listing_id: listingId,
  });

  if (error) {
    console.error("getListingHostPhone error:", error);
    return null;
  }

  return data as string | null;
}
