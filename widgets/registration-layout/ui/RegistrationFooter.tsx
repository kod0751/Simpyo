import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface RegistrationFooterProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function RegistrationFooter({
  isFirstStep,
  isLastStep,
  canProceed,
  onBack,
  onNext,
}: RegistrationFooterProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 border-t border-brand-100 bg-brand-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <button
          type="button"
          onClick={onBack}
          disabled={isFirstStep}
          className="flex items-center gap-1 text-sm font-semibold text-brand-500 transition-colors hover:text-brand-900 disabled:invisible"
        >
          <ChevronLeft size={18} />
          이전
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center gap-2 rounded-full bg-brand-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isLastStep ? "숙소 등록하기" : "다음"}
          {isLastStep ? <Check size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  );
}
