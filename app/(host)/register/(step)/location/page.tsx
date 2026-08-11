"use client";

import {
  LocationStep,
  useRegistrationStore,
} from "@/features/host-registration";

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
