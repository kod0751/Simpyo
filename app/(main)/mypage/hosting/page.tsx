import { redirect } from "next/navigation";
import { getMyProfile } from "@/entities/profile/api/getMyProfile";
import { getHostBookings } from "@/entities/booking/api/getHostBookings";
import { HostBookingsList } from "@/widgets/mypage/ui/HostBookingsList";

export const metadata = {
  title: "쉼터 | 예약 관리",
};

export default async function HostingPage() {
  const profile = await getMyProfile();

  if (!profile) {
    redirect("/");
  }

  const bookings = await getHostBookings(profile.id);

  return (
    <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
      <h1 className="mb-2 text-3xl font-bold text-brand-900">예약 관리</h1>
      <p className="mb-10 text-brand-500">
        내 숙소에 들어온 예약을 한눈에 확인하세요.
      </p>
      <HostBookingsList bookings={bookings} />
    </main>
  );
}
