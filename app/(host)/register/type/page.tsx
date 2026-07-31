"use client";

import { useRegistrationStore } from "@/features/host-registration/model/useRegistrationStore";
import { PropertyTypeStep } from "@/features/host-registration/step-type";

export default function TypePage() {
  const { form, update } = useRegistrationStore();

  return (
    <PropertyTypeStep
      value={form.propertyType}
      onChange={(id) => update("propertyType", id)}
    />
  );
}
