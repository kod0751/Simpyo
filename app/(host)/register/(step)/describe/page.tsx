"use client";

import {
  DescribeStep,
  useRegistrationStore,
} from "@/features/host-registration";

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
