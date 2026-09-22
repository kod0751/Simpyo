import { createClient } from "@/lib/supabase/server";

export interface MonthlyRevenue {
  totalRevenue: number;
  bookingCount: number;
}

export async function getHostRevenue(
  hostId: string,
  year: number,
  month: number,
): Promise<MonthlyRevenue> {
  const supabase = await createClient();

  const monthStart = `${year}-${String(month).padStart(2, "0")}-01`;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextMonthYear = month === 12 ? year + 1 : year;
  const monthEnd = `${nextMonthYear}-${String(nextMonth).padStart(2, "0")}-01`;

  const { data, error } = await supabase
    .from("bookings")
    .select("total_price, listing:listings!inner(host_id)")
    .eq("listing.host_id", hostId)
    .neq("status", "cancelled")
    .gte("check_in", monthStart)
    .lt("check_in", monthEnd);

  if (error) {
    console.error("getHostRevenue error:", error);
    return { totalRevenue: 0, bookingCount: 0 };
  }

  return {
    totalRevenue: data.reduce((sum, b) => sum + b.total_price, 0),
    bookingCount: data.length,
  };
}
