import { MessageCircleMore, Mail } from "lucide-react";

const SUPPORT_EMAIL = "kod07510@gmail.com";

export function SupportCta() {
  const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("[쉼터] 1:1 문의")}`;

  return (
    <section className="relative overflow-hidden bg-brand-950 py-24 text-center">
      <div className="pointer-events-none absolute top-0 left-1/2 h-100 w-full max-w-3xl -translate-x-1/2 rounded-full bg-brand-800/40 blur-[100px]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4">
        <MessageCircleMore size={48} className="mx-auto mb-6 text-brand-500" />
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-balance text-white md:text-4xl">
          도움이 필요하신가요?
        </h2>
        <p className="mb-10 text-pretty text-brand-400">
          예약 변경, 환불 규정, 호스트 가이드 등
          <br className="hidden md:block" /> 궁금한 점을 메일로 보내주시면
          빠르게 안내해 드립니다.
        </p>
        <a
          href={mailtoHref}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand-950 transition-all hover:scale-[1.02] hover:bg-brand-50 active:scale-[0.98]"
        >
          <Mail size={16} />
          1:1 문의하기
        </a>
      </div>
    </section>
  );
}
