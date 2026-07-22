import { Footer } from "@/widgets/footer";
import { HeaderWrapper } from "@/widgets/header/ui/HeaderWrapper";
import { HeroSection } from "@/widgets/hero-section";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWrapper />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
