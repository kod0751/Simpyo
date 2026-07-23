import { Droplets, PawPrint } from "lucide-react";

function MarqueeItems() {
  return (
    <div className="flex animate-marquee items-center gap-16 px-8">
      <span className="font-satoshi text-2xl font-black tracking-tighter text-brand-200">
        PRIVATE STAY
      </span>
      <span className="flex items-center gap-2 text-2xl font-bold tracking-tight text-brand-200">
        <Droplets size={24} /> 오션뷰 풀빌라
      </span>
      <span className="font-satoshi text-2xl font-bold text-brand-200 italic">
        Healing &amp; Nature
      </span>
      <span className="text-2xl font-bold tracking-widest text-brand-200">
        감성 한옥 스테이
      </span>
      <span className="font-satoshi text-2xl font-extrabold text-brand-200">
        FAMILY TRIP
      </span>
      <span className="flex items-center gap-2 text-2xl font-bold text-brand-200">
        <PawPrint size={24} /> 반려견 동반
      </span>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="reveal active overflow-hidden border-y border-brand-100 bg-white py-12">
      <div className="mx-auto mb-6 max-w-7xl px-4">
        <p className="text-center text-sm font-semibold tracking-[0.2em] text-brand-400 uppercase">
          테마별로 만나는 완벽한 휴식
        </p>
      </div>
      <div className="relative flex whitespace-nowrap">
        {/* Duplicated for a seamless loop */}
        <MarqueeItems />
        <MarqueeItems />
      </div>
    </section>
  );
}
