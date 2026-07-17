import { SearchBar } from "@/shared/components/search-bar";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-130 w-full md:h-150">
        <Image
          src="/img/hero.png"
          alt="산과 어우러진 감성 숙소의 따뜻한 저녁 풍경"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="mb-10 max-w-2xl text-center">
          <h1 className="text-balance font-serif text-4xl font-bold leading-tight text-background md:text-6xl">
            당신만의 특별한 머무름
          </h1>
          <p className="mt-4 text-pretty text-base text-background/90 md:text-lg">
            전국의 감성 숙소를 한 곳에서. 오늘, 마음에 드는 공간을 예약해보세요.
          </p>
        </div>
        <div className="w-full">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
