"use client";

import {
  HostInfoStep,
  useRegistrationStore,
} from "@/features/host-registration";

export default function HostPage() {
  const { form, update } = useRegistrationStore();

  return (
    <HostInfoStep
      hostName={form.hostName}
      hostPhone={form.hostPhone}
      onHostNameChange={(v) => update("hostName", v)}
      onHostPhoneChange={(v) => update("hostPhone", v)}
    />
  );
}
