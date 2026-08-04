import Link from "next/link";
import { House, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-brand-500">
        <SearchX size={34} />
      </div>
      <h1 className="mt-8 font-satoshi text-3xl font-bold tracking-tight text-brand-900 text-balance sm:text-4xl">
        페이지를 찾을 수 없어요
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-brand-500 break-keep">
        요청하신 페이지가 삭제되었거나, 잘못된 주소로 접근하셨어요.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-full bg-brand-900 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          <House size={18} />
          홈으로 돌아가기
        </Link>
        <Link
          href="/listings"
          className="flex items-center justify-center rounded-full border border-brand-200 bg-white px-8 py-3.5 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-400"
        >
          다른 숙소 둘러보기
        </Link>
      </div>
    </div>
  );
}
