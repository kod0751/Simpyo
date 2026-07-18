import { createClient } from "@/lib/supabase/server";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { HeroSection } from "@/widgets/hero-section";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div>
          {user ? <p>로그인 성공: {user.email}</p> : <p>로그인 안 됨</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
