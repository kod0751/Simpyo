import { redirect } from "next/navigation";
import { getMyProfile } from "@/entities/profile/api/getMyProfile";
import { getMyBookings } from "@/entities/booking/api/getMyBookings";
import { BookingsList } from "@/widgets/mypage/ui/BookingsList";

export const metadata = {
  title: "쉼터 | 내 예약",
};

export default async function MyBookingsPage() {
  const profile = await getMyProfile();

  if (!profile) {
    redirect("/");
  }

  const bookings = await getMyBookings(profile.id);

  return (
    <main className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <h1 className="mb-2 text-3xl font-bold text-brand-900">내 예약</h1>
      <p className="mb-10 text-brand-500">
        지금까지의 예약 내역을 한눈에 확인하세요.
      </p>
      <BookingsList bookings={bookings} />
    </main>
  );
}
