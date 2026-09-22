import { redirect } from "next/navigation";
import { getMyProfile } from "@/entities/profile/api/getMyProfile";
import { getMyListings } from "@/entities/accommodation/api/getMyListings";
import { getMyBookings } from "@/entities/booking/api/getMyBookings";
import {
  ProfileHeader,
  QuickStats,
  Reservations,
  Schedule,
  HostDashboard,
  SupportCta,
} from "@/widgets/mypage";
import { getHostRevenue } from "@/entities/booking/api/getHostRevenue";

export const metadata = {
  title: "쉼터 | 마이페이지",
  description:
    "예약 내역, 일정 관리, 숙소 관리까지 나의 쉼을 한곳에서 관리하세요.",
};

export default async function MyPage() {
  const profile = await getMyProfile();

  if (!profile) {
    redirect("/");
  }

  const now = new Date();
  const [listings, bookings, revenue] = await Promise.all([
    getMyListings(profile.id),
    getMyBookings(profile.id),
    getHostRevenue(profile.id, now.getFullYear(), now.getMonth() + 1),
  ]);
  return (
    <main className="min-h-screen bg-brand-50 text-brand-900">
      <ProfileHeader profile={profile} />
      <QuickStats />
      <Reservations bookings={bookings} />
      <Schedule bookings={bookings} />
      <HostDashboard listings={listings} revenue={revenue} />
      <SupportCta />
    </main>
  );
}
