import { HeroSection } from "@/widgets/hero-section";
import { Marquee } from "@/widgets/marquee";
import { MyPagePreview } from "@/widgets/mypage-preview";
import { ReviewSection } from "@/widgets/review-section";
import { CallToAction } from "@/widgets/cta-section";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <Marquee />
        <MyPagePreview />
        <ReviewSection />
        <CallToAction />
      </main>
    </div>
  );
}
