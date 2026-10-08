import { createClient } from '@/lib/supabase/server'

export async function getUnavailableListingIds(
  checkIn: string,
  checkOut: string,
): Promise<string[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_unavailable_listing_ids', {
    p_check_in: checkIn,
    p_check_out: checkOut,
  })

  if (error) {
    console.error('getUnavailableListingIds error:', error)
    return []
  }

  return (data ?? []) as string[]
}