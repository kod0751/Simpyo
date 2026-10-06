import { notFound, redirect } from "next/navigation";
import { getMyProfile } from "@/entities/profile/api/getMyProfile";
import { getReviewableBookings } from "@/entities/review/api/getReviewableBookings";
import { ReviewForm } from "@/features/write-review/ui/ReviewForm";

interface PageProps {
  params: Promise<{ bookingId: string }>;
}

export const metadata = {
  title: "쉼터 | 리뷰 작성",
};

export default async function WriteReviewPage({ params }: PageProps) {
  const { bookingId } = await params;

  const profile = await getMyProfile();

  if (!profile) {
    redirect("/");
  }

  const reviewable = await getReviewableBookings(profile.id);
  const booking = reviewable.find((b) => b.id === bookingId);

  if (!booking) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <h1 className="mb-2 text-3xl font-bold text-brand-900">리뷰 작성</h1>
      <p className="mb-10 text-brand-500">다녀온 숙소의 경험을 들려주세요.</p>
      <ReviewForm booking={booking} guestId={profile.id} />
    </main>
  );
}
