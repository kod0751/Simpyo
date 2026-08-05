import { notFound } from "next/navigation";
import { getListingById } from "@/entities/accommodation/api/getListingById";
import { DetailHeader } from "@/widgets/listing-detail/ui/DetailHeader";
import { DetailGallery } from "@/widgets/listing-detail/ui/DetailGallery";
import { DetailInfo } from "@/widgets/listing-detail/ui/DetailInfo";
import { AmenitiesSection } from "@/widgets/listing-detail/ui/AmenitiesSection";
import { BookingSidebar } from "@/widgets/listing-detail/ui/BookingSidebar";
import { ReviewsSection } from "@/widgets/listing-detail/ui/ReviewsSection";
import { LocationSection } from "@/widgets/listing-detail/ui/LocationSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

  return (
    <>
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DetailHeader listing={listing} />
          <DetailGallery images={listing.images} name={listing.name} />

          <div className="relative grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <DetailInfo listing={listing} />
              <AmenitiesSection amenities={listing.amenities} />
            </div>

            <BookingSidebar pricePerNight={listing.price_per_night} />
          </div>
        </div>
      </main>

      <ReviewsSection rating={listing.rating} reviewCount={listing.reviews} />
      <LocationSection region={listing.region} address={listing.address} />
    </>
  );
}
