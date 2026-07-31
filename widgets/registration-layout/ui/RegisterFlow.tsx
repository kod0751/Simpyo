"use client";

import { usePathname, useRouter } from "next/navigation";
import { useRegistrationStore } from "@/features/host-registration/model/useRegistrationStore";
import { canProceed } from "@/features/host-registration/model/canProceed";
import { RegistrationProgress } from "./RegistrationProgress";
import { RegistrationFooter } from "./RegistrationFooter";
import { steps } from "@/lib/host";

export function RegisterFlow({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { form } = useRegistrationStore();

  const currentIndex = steps.findIndex((s) => pathname.endsWith(s.id));
  const step = steps[currentIndex];

  function goNext() {
    if (currentIndex < steps.length - 1) {
      router.push(`/register/${steps[currentIndex + 1].id}`);
    } else {
      router.push("/register/complete");
    }
  }

  function goBack() {
    if (currentIndex > 0) {
      router.push(`/register/${steps[currentIndex - 1].id}`);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 pb-40 pt-8">
      <RegistrationProgress
        title={step.title}
        subtitle={step.subtitle}
        currentStep={currentIndex}
        totalSteps={steps.length}
      />
      <div className="flex-1 w-full">{children}</div>
      <RegistrationFooter
        isFirstStep={currentIndex === 0}
        isLastStep={currentIndex === steps.length - 1}
        canProceed={canProceed(step.id, form)}
        onBack={goBack}
        onNext={goNext}
      />
    </div>
  );
}
