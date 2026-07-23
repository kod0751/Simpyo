import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { LoginModal } from "@/features/auth/ui/LoginModal";

const nanumSquareNeo = localFont({
  src: "../public/fonts/NanumSquareNeo-Variable.ttf",
  variable: "--font-nanum-square-neo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "쉼터",
  description: "숙소 예약 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${nanumSquareNeo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          {children}
          <LoginModal />
        </Providers>
      </body>
    </html>
  );
}
