import { Leaf, Calendar, Search, Star, Heart } from "lucide-react";
import avatarImg from "@/public/img/avatar-1.png";
import avatarImg2 from "@/public/img/avatar-2.png";
import avatarImg3 from "@/public/img/avatar-3.png";
import heroImg from "@/public/img/hero-villa.png";
import Image from "next/image";
import { HeroSearch } from "@/features/listing-filter/ui/HeroSearch";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-24">
      {/* Abstract warm background shape */}
      <div className="pointer-events-none absolute top-0 right-0 h-200 w-200 -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-100 opacity-60 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* Left content */}
          <div className="reveal active z-10 flex flex-col justify-center lg:col-span-6">
            <div className="mb-8 inline-flex w-max items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-widest text-brand-700 uppercase shadow-sm">
              <Leaf size={14} className="text-accent-500" />
              당신만의 완벽한 휴식처
            </div>

            <h1 className="mb-6 text-5xl leading-[1.1] font-bold tracking-tight break-keep text-brand-950 md:text-6xl lg:text-[4.5rem]">
              일상에서 벗어나
              <br />
              <span className="text-brand-600">온전한 쉼</span>을 만나다
            </h1>

            <p className="mb-12 max-w-xl text-lg leading-relaxed break-keep text-brand-600 md:text-xl">
              주말의 짧은 여행부터 긴 휴가까지. 엄선된 감성 숙소와 프라이빗
              스테이에서 당신만의 평온한 시간을 경험하세요.
            </p>

            <HeroSearch />

            <div className="mt-10 flex items-center gap-4 text-sm text-brand-500">
              <div className="flex -space-x-3">
                <Image
                  src={avatarImg}
                  alt="여행자"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <Image
                  src={avatarImg2}
                  alt="여행자"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <Image
                  src={avatarImg3}
                  alt="여행자"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
              </div>
              <span className="break-keep">
                올해{" "}
                <span className="font-satoshi font-bold text-brand-900">
                  47,200+
                </span>
                명의 여행자가 쉼터와 함께했습니다.
              </span>
            </div>
          </div>

          {/* Right visual */}
          <div className="reveal delay-200 active relative lg:col-span-6">
            <div className="animate-float relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-premium">
              <Image
                src={heroImg}
                alt="프리미엄 프라이빗 풀빌라"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-900/80 via-brand-900/20 to-transparent" />

              {/* Floating info card */}
              <div className="absolute right-8 bottom-8 left-8 flex cursor-pointer items-center justify-between rounded-3xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-xl transition-transform hover:scale-[1.02]">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Star
                      size={16}
                      className="fill-accent-500 text-accent-500"
                    />
                    <span className="font-satoshi font-bold">4.9</span>
                    <span className="font-satoshi text-sm text-white/70">
                      (1,284)
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold break-keep">
                    스테이 고요, 프라이빗 풀빌라
                  </h3>
                  <p className="mt-0.5 text-sm text-white/80">제주 서귀포시</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-900">
                  <Heart size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
