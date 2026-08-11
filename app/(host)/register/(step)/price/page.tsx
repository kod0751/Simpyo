"use client";

import { PriceStep, useRegistrationStore } from "@/features/host-registration";

export default function PricePage() {
  const { form, update } = useRegistrationStore();

  return <PriceStep price={form.price} onChange={(v) => update("price", v)} />;
}
