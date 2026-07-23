import { HeroSection } from "@/widgets/hero-section";
import { Marquee } from "@/widgets/marquee";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <Marquee />
      </main>
    </div>
  );
}
