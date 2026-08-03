import Link from "next/link";
import { House, PartyPopper } from "lucide-react";

interface RegistrationSuccessProps {
  title: string;
}

export function RegistrationSuccess({ title }: RegistrationSuccessProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-900 text-white">
        <PartyPopper size={34} />
      </div>
      <h1 className="mt-8 font-satoshi text-3xl font-bold tracking-tight text-brand-900 text-balance sm:text-4xl">
        숙소 등록이 접수되었어요
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-brand-500 break-keep">
        <span className="font-semibold text-brand-800">
          {title || "새로운 숙소"}
        </span>
        가 성공적으로 접수되었습니다. 담당 매니저의 검토 후 24시간 이내에
        연락드릴게요.
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
