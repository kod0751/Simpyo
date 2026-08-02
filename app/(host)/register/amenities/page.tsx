"use client";

import { useRegistrationStore } from "@/features/host-registration/model/useRegistrationStore";
import { AmenitiesStep } from "@/features/host-registration/step-amenities/ui/AmenitiesStep";

export default function AmenitiesPage() {
  const { form, toggleAmenity, toggleTag } = useRegistrationStore();

  return (
    <AmenitiesStep
      selectedAmenities={form.amenities}
      selectedTags={form.tags}
      onToggleAmenity={toggleAmenity}
      onToggleTag={toggleTag}
    />
  );
}
