"use client";

import { PhotosStep, useRegistrationStore } from "@/features/host-registration";

export default function PhotosPage() {
  const { form, update } = useRegistrationStore();

  return (
    <PhotosStep
      photos={form.photos}
      onChange={(files) => update("photos", files)}
    />
  );
}
