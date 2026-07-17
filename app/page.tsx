import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { HeroSection } from "@/widgets/hero-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
