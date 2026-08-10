import {
  HeroSection,
  Marquee,
  MyPagePreview,
  ReviewSection,
  CTAction,
} from "@/widgets/home";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <Marquee />
        <MyPagePreview />
        <ReviewSection />
        <CTAction />
      </main>
    </div>
  );
}
