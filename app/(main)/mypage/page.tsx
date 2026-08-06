import { redirect } from "next/navigation";
import { getMyProfile } from "@/entities/profile/api/getMyProfile";
import { getMyListings } from "@/entities/accommodation/api/getMyListings";
import { ProfileHeader } from "@/widgets/mypage/ui/ProfileHeader";
import { QuickStats } from "@/widgets/mypage/ui/QuickStats";
import { Reservations } from "@/widgets/mypage/ui/Reservations";
import { Schedule } from "@/widgets/mypage/ui/Schedule";
import { HostDashboard } from "@/widgets/mypage/ui/HostDashboard";
import { SupportCta } from "@/widgets/mypage/ui/SupportCta";

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

  const listings = await getMyListings(profile.id);

  return (
    <main className="min-h-screen bg-brand-50 text-brand-900">
      <ProfileHeader profile={profile} />
      <QuickStats />
      <Reservations />
      <Schedule />
      <HostDashboard listings={listings} />
      <SupportCta />
    </main>
  );
}
