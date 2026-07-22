import { Footer } from "@/widgets/footer/ui/Footer";
import { HeaderWrapper } from "@/widgets/header/ui/HeaderWrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderWrapper />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
