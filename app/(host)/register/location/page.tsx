"use client";

import { useRegistrationStore } from "@/features/host-registration/model/useRegistrationStore";
import { LocationStep } from "@/features/host-registration/step-location";

export default function LocationPage() {
  const { form, update } = useRegistrationStore();
  return (
    <LocationStep
      region={form.region}
      address={form.address}
      onRegionChange={(v) => update("region", v)}
      onAddressChange={(v) => update("address", v)}
    />
  );
}
