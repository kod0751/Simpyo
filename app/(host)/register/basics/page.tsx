"use client";

import { useRegistrationStore } from "@/features/host-registration/model/useRegistrationStore";
import { BasicsStep } from "@/features/host-registration/step-basics";

export default function BasicsPage() {
  const { form, update } = useRegistrationStore();

  return (
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
  );
}
