import { notFound, redirect } from "next/navigation";
import { getListingById } from "@/entities/accommodation/api/getListingById";
import { createClient } from "@/lib/supabase/server";
import { EditListingForm } from "@/features/edit-listing/ui/EditListingForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditListingPage({ params }: PageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

  if (listing.host_id !== user.id) {
    redirect("/mypage");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <h1 className="mb-2 text-3xl font-bold text-brand-900">숙소 정보 수정</h1>
      <p className="mb-10 text-brand-500">
        필요한 부분만 골라서 수정할 수 있어요.
      </p>
      <EditListingForm listing={listing} />
    </main>
  );
}
