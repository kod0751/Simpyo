interface RegistrationProgressProps {
  title: string;
  subtitle: string;
  currentStep: number;
  totalSteps: number;
}

export function RegistrationProgress({
  title,
  subtitle,
  currentStep,
  totalSteps,
}: RegistrationProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <>
      <div className="mb-12">
        <div className="mb-3 flex items-center justify-between text-sm font-medium text-brand-400">
          <span>
            {currentStep + 1} / {totalSteps} 단계
          </span>
          <span>{Math.round(progress)}% 완료</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-100">
          <div
            className="h-full rounded-full bg-brand-900 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <header className="mb-10">
        <h1 className="font-satoshi text-3xl font-bold tracking-tight text-brand-900 text-balance sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-lg text-brand-500">{subtitle}</p>
      </header>
    </>
  );
}
