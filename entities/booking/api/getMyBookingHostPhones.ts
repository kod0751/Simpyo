import { createClient } from "@/lib/supabase/server";

type HostPhoneRow = {
  listing_id: string;
  host_phone: string;
};

/** 내가 예약한 숙소별 호스트 번호. { [listing_id]: host_phone } */
export async function getMyBookingHostPhones(): Promise<
  Record<string, string>
> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_my_booking_host_phones");

  if (error) {
    console.error("getMyBookingHostPhones error:", error);
    return {};
  }

  return Object.fromEntries(
    ((data ?? []) as HostPhoneRow[]).map((row) => [
      row.listing_id,
      row.host_phone,
    ]),
  );
}
