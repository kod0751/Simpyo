"use client";

import { useRegistrationStore } from "@/features/host-registration/model/useRegistrationStore";
import { HostInfoStep } from "@/features/host-registration/step-host";

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
