import { MessageCircleMore } from "lucide-react";

export function SupportCta() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-24 text-center">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-full max-w-3xl -translate-x-1/2 rounded-full bg-brand-800/40 blur-[100px]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4">
        <MessageCircleMore size={48} className="mx-auto mb-6 text-brand-500" />
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance text-white md:text-4xl">
          도움이 필요하신가요?
        </h2>
        <p className="mb-10 text-pretty text-brand-400">
          예약 변경, 환불 규정, 호스트 가이드 등
          <br className="hidden md:block" /> 쉼터 고객센터에서 빠르고 친절하게
          안내해 드립니다.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            className="w-full cursor-pointer rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand-950 transition-all hover:scale-[1.02] hover:bg-brand-50 active:scale-[0.98] sm:w-auto"
          >
            자주 묻는 질문 (FAQ)
          </button>
          <button
            type="button"
            className="w-full cursor-pointer rounded-full border border-brand-700 bg-brand-800 px-8 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:bg-brand-700 active:scale-[0.98] sm:w-auto"
          >
            1:1 문의하기
          </button>
        </div>
      </div>
    </section>
  );
}
