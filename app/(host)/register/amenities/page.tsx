"use client";

import { useRegistrationStore } from "@/features/host-registration/model/useRegistrationStore";
import { AmenitiesStep } from "@/features/host-registration/step-amenities";

export default function AmenitiesPage() {
  const { form, toggleAmenity } = useRegistrationStore();

  return <AmenitiesStep selected={form.amenities} onToggle={toggleAmenity} />;
}
