"use client";

import { AmenitiesStep, useRegistrationStore } from "@/features/host-registration";


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
