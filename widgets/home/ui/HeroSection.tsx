import Link from "next/link";
import Image from "next/image";
import { Leaf, Star, ArrowRight } from "lucide-react";
import heroImg from "@/public/img/hero-villa.png";
import { HeroSearch } from "@/features/listing-filter/ui/HeroSearch";
import { getFeaturedListing } from "@/entities/accommodation/api/getFeaturedListing";

export async function HeroSection() {
  const featured = await getFeaturedListing();

  return (
    <section className="relative flex min-h-screen items-center overflow-x-clip pt-32 pb-24">
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
          </div>

          {/* Right visual */}
          <div className="relative lg:col-span-6">
            <div className="animate-float relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-premium">
              {featured?.image ? (
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <Image
                  src={heroImg}
                  alt="쉼터"
                  fill
                  priority
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-brand-900/80 via-brand-900/20 to-transparent" />

              {featured && (
                <Link
                  href={`/listings/${featured.id}`}
                  className="group absolute right-8 bottom-8 left-8 flex items-center justify-between rounded-3xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-xl transition-transform hover:scale-[1.02]"
                >
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                        평점 1위
                      </span>
                      <Star
                        size={14}
                        className="fill-accent-500 text-accent-500"
                      />
                      <span className="font-satoshi font-bold">
                        {featured.rating.toFixed(1)}
                      </span>
                      <span className="font-satoshi text-sm text-white/70">
                        ({featured.review_count})
                      </span>
                    </div>
                    <h3 className="truncate text-lg font-semibold break-keep">
                      {featured.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-white/80">
                      {featured.address}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand-900 transition-transform group-hover:translate-x-1">
                    <ArrowRight size={20} />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
