"use client";

import { useRegistrationStore } from "@/features/host-registration/model/useRegistrationStore";
import { PhotosStep } from "@/features/host-registration/step-photos";

export default function PhotosPage() {
  const { form, update } = useRegistrationStore();

  return (
    <PhotosStep
      photos={form.photos}
      onChange={(files) => update("photos", files)}
    />
  );
}
