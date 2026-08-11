"use client";

import {
  PropertyTypeStep,
  useRegistrationStore,
} from "@/features/host-registration";

export default function TypePage() {
  const { form, update } = useRegistrationStore();

  return (
    <PropertyTypeStep
      value={form.propertyType}
      onChange={(id) => update("propertyType", id)}
    />
  );
}
