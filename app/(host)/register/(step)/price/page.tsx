"use client";

import { useRegistrationStore } from "@/features/host-registration/model/useRegistrationStore";
import { PriceStep } from "@/features/host-registration/step-price";

export default function PricePage() {
  const { form, update } = useRegistrationStore();

  return <PriceStep price={form.price} onChange={(v) => update("price", v)} />;
}
