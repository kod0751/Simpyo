import { House, Camera, Hash } from "lucide-react";
import Link from "next/link";

const columns = [
  {
    title: "서비스",
    links: ["테마별 숙소 찾기", "이달의 추천 스테이", "호스트 등록 안내"],
  },
  {
    title: "고객지원",
    links: ["공지사항", "자주 묻는 질문", "1:1 채팅 문의"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="group mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-900 text-white transition-transform group-hover:scale-105">
                <House size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-brand-900">
                쉼터
              </span>
            </Link>
            <p className="text-sm leading-relaxed break-keep text-brand-500">
              당신을 위한 온전한 휴식,
              <br />
              프리미엄 감성 숙소 예약 플랫폼
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 font-bold text-brand-900">{col.title}</h4>
              <ul className="space-y-3 text-sm text-brand-500">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="/"
                      className="transition-colors hover:text-brand-900"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-5 font-bold text-brand-900">소셜 미디어</h4>
            <div className="flex gap-4">
              <Link
                href="/"
                aria-label="인스타그램"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-brand-600 transition-colors hover:bg-brand-900 hover:text-white"
              >
                <Camera size={20} />
              </Link>
              <Link
                href="/"
                aria-label="스레드"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-brand-600 transition-colors hover:bg-brand-900 hover:text-white"
              >
                <Hash size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-brand-100 pt-8 md:flex-row">
          <p className="font-satoshi text-sm text-brand-400">
            © 2026 Shelter Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-brand-500">
            <Link href="/" className="transition-colors hover:text-brand-900">
              이용약관
            </Link>
            <Link
              href="/"
              className="font-bold transition-colors hover:text-brand-900"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
