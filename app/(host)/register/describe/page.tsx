"use client";

import { useRegistrationStore } from "@/features/host-registration/model/useRegistrationStore";
import { DescribeStep } from "@/features/host-registration/step-describe";
export default function DescribePage() {
  const { form, update } = useRegistrationStore();

  return (
    <DescribeStep
      title={form.title}
      description={form.description}
      onTitleChange={(v) => update("title", v)}
      onDescriptionChange={(v) => update("description", v)}
    />
  );
}
