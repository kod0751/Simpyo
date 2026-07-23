import { HeroSection } from "@/widgets/hero-section";
import { Marquee } from "@/widgets/marquee";
import { MyPagePreview } from "@/widgets/mypage-preview";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <Marquee />
        <MyPagePreview />
      </main>
    </div>
  );
}
