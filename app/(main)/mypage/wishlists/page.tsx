import { redirect } from "next/navigation";
import { getMyProfile } from "@/entities/profile/api/getMyProfile";
import { getMyWishlists } from "@/entities/wishlist/api/getMyWishlists";
import { WishlistGrid } from "@/widgets/mypage/ui/WishlistGrid";

export const metadata = {
  title: "쉼터 | 저장한 숙소",
};

export default async function WishlistsPage() {
  const profile = await getMyProfile();

  if (!profile) {
    redirect("/");
  }

  const wishlists = await getMyWishlists(profile.id);

  return (
    <main className="mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-brand-900">저장한 숙소</h1>
      <p className="mb-10 text-brand-500">
        마음에 들어 찜해둔 숙소를 모아봤어요.
      </p>
      <WishlistGrid items={wishlists} userId={profile.id} />
    </main>
  );
}
