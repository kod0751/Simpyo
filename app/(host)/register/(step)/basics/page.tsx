"use client";

import { BasicsStep, useRegistrationStore } from "@/features/host-registration";

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
