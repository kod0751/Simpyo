import { ArrowRight, HousePlus, Phone } from "lucide-react";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-brand-50 py-32">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[80px]" />

      <div className="reveal active relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-6 text-5xl leading-[1.2] font-bold tracking-tight break-keep text-brand-950 md:text-6xl">
          지금 바로 당신만의
          <br />
          휴식처를 찾아보세요
        </h2>
        <p className="mb-12 text-xl break-keep text-brand-600">
          앱 다운로드부터 첫 예약까지, 3분이면 충분합니다.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full bg-brand-900 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-brand-900/10 transition-all hover:bg-brand-800 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            숙소 탐색하기
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <ArrowRight size={16} />
            </div>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-brand-200 bg-white px-10 py-5 text-lg font-bold text-brand-900 transition-all hover:border-brand-300 hover:bg-brand-50 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            <HousePlus size={20} />
            호스트 지원하기
          </button>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-brand-500">
          <Phone size={16} />
          고객센터 1588-0000 (연중무휴 09:00 - 18:00)
        </p>
      </div>
    </section>
  );
}
