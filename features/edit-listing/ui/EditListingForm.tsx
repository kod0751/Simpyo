"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import type { Stay } from "@/entities/accommodation/model/types";
import { useEditListingForm } from "../model/useEditListingForm";
import { useUpdateListing } from "../model/useUpdateListing";
import { EditPhotosSection } from "./EditPhotosSection";
import {
  AmenitiesStep,
  BasicsStep,
  DescribeStep,
  HostInfoStep,
  LocationStep,
  PriceStep,
  PropertyTypeStep,
} from "@/features/host-registration";

interface EditListingFormProps {
  listing: Stay;
}

export function EditListingForm({ listing }: EditListingFormProps) {
  const router = useRouter();
  const {
    form,
    update,
    toggleAmenity,
    toggleTag,
    removeExistingImage,
    addNewPhotos,
    removeNewPhoto,
  } = useEditListingForm(listing);
  const { mutate, isPending, isError, error } = useUpdateListing();

  function handleSubmit() {
    mutate(
      {
        id: listing.id,
        hostId: listing.host_id,
        form,
        originalImages: listing.images,
      },
      {
        onSuccess: () => {
          router.refresh();
          router.push("/mypage");
        },
      },
    );
  }

  return (
    <div className="space-y-14">
      <section>
        <h2 className="mb-4 text-lg font-bold text-brand-900">숙소 유형</h2>
        <PropertyTypeStep
          value={form.propertyType}
          onChange={(id) => update("propertyType", id)}
        />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-brand-900">위치</h2>
        <LocationStep
          region={form.region}
          address={form.address}
          onRegionChange={(v) => update("region", v)}
          onAddressChange={(v) => update("address", v)}
        />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-brand-900">기본 정보</h2>
        <BasicsStep
          maxGuests={form.maxGuests}
          bedrooms={form.bedrooms}
          beds={form.beds}
          bathrooms={form.bathrooms}
          onMaxGuestsChange={(v) => update("maxGuests", v)}
          onBedroomsChange={(v) => update("bedrooms", v)}
          onBedsChange={(v) => update("beds", v)}
          onBathroomsChange={(v) => update("bathrooms", v)}
        />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-brand-900">
          편의시설 및 특징
        </h2>
        <AmenitiesStep
          selectedAmenities={form.amenities}
          selectedTags={form.tags}
          onToggleAmenity={toggleAmenity}
          onToggleTag={toggleTag}
        />
      </section>

      <EditPhotosSection
        existingImages={form.existingImages}
        newPhotos={form.newPhotos}
        onRemoveExisting={removeExistingImage}
        onAddNew={addNewPhotos}
        onRemoveNew={removeNewPhoto}
      />

      <section>
        <h2 className="mb-4 text-lg font-bold text-brand-900">숙소 소개</h2>
        <DescribeStep
          title={form.title}
          description={form.description}
          onTitleChange={(v) => update("title", v)}
          onDescriptionChange={(v) => update("description", v)}
        />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-brand-900">요금</h2>
        <PriceStep price={form.price} onChange={(v) => update("price", v)} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-brand-900">호스트 정보</h2>
        <HostInfoStep
          hostName={form.hostName}
          hostPhone={form.hostPhone}
          onHostNameChange={(v) => update("hostName", v)}
          onHostPhoneChange={(v) => update("hostPhone", v)}
        />
      </section>

      {isError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          저장에 실패했어요: {error.message}
        </p>
      )}

      <div className="flex items-center justify-end gap-3 border-t border-brand-100 pt-8">
        <Link
          href="/mypage"
          className="rounded-full border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-400"
        >
          취소
        </Link>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-brand-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-default disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              저장 중...
            </>
          ) : (
            "변경사항 저장"
          )}
        </button>
      </div>
    </div>
  );
}
