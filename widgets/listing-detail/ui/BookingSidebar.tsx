import { Flag } from "lucide-react";

interface BookingSidebarProps {
  pricePerNight: number;
}

export function BookingSidebar({ pricePerNight }: BookingSidebarProps) {
  return (
    <div className="relative lg:col-span-4">
      <div className="sticky top-32 rounded-3xl border border-brand-100 bg-white/80 p-1.5 shadow-premium backdrop-blur-xl">
        <div className="rounded-[1.125rem)] bg-white p-6 md:p-8">
          {/* 가격 */}
          <div className="mb-6 flex items-end gap-2">
            <span className="text-3xl font-bold text-brand-900">
              ₩{pricePerNight.toLocaleString()}
            </span>
            <span className="pb-1 font-medium text-brand-500">/ 박</span>
          </div>

          {/* 날짜/인원 선택 (정적) */}
          <div className="mb-6 overflow-hidden rounded-2xl border border-brand-200 bg-white">
            <div className="grid grid-cols-2 border-b border-brand-200">
              <div className="p-3">
                <label className="mb-1 block text-[10px] font-bold tracking-wider text-brand-900 uppercase">
                  체크인
                </label>
                <div className="text-sm font-medium text-brand-400">
                  날짜 선택
                </div>
              </div>
              <div className="border-l border-brand-200 p-3">
                <label className="mb-1 block text-[10px] font-bold tracking-wider text-brand-900 uppercase">
                  체크아웃
                </label>
                <div className="text-sm font-medium text-brand-400">
                  날짜 선택
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3">
              <div>
                <label className="mb-1 block text-[10px] font-bold tracking-wider text-brand-900 uppercase">
                  인원
                </label>
                <div className="text-sm font-medium text-brand-400">
                  게스트 추가
                </div>
              </div>
            </div>
          </div>

          {/* 예약 버튼 — 기능 준비 전이라 비활성화 */}
          <button
            type="button"
            disabled
            className="mb-4 w-full cursor-default rounded-xl bg-brand-200 py-4 text-lg font-bold text-brand-400"
          >
            예약 기능 준비 중이에요
          </button>
          <div className="mb-2 text-center text-xs font-medium text-brand-500">
            곧 예약 기능을 만나보실 수 있어요
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-brand-500 transition-colors hover:text-brand-900">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2"
        >
          <Flag size={16} />
          숙소 신고하기
        </button>
      </div>
    </div>
  );
}
