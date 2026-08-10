import {
  CircleUser,
  CalendarDays,
  TrendingUp,
  Settings,
  Ellipsis,
  House,
} from "lucide-react";
import Image from "next/image";
import avatarImg from "@/public/img/avatar-1.png";

const bullets = [
  {
    icon: CalendarDays,
    title: "한눈에 보는 여행 일정",
    desc: "다가오는 여행의 체크인 정보, 영수증, 이전 숙박 기록을 언제든 쉽게 확인할 수 있습니다.",
  },
  {
    icon: TrendingUp,
    title: "나의 숙소 호스팅 실적",
    desc: "호스트라면 클릭 한 번으로 예약률, 정산 내역, 게스트 리뷰를 체계적으로 관리하세요.",
  },
  {
    icon: Settings,
    title: "취향 맞춤 프로필 설정",
    desc: "찜한 숙소 리스트, 결제 수단, 선호하는 여행 스타일을 프로필에 안전하게 저장합니다.",
  },
];

export function MyPagePreview() {
  return (
    <section id="mypage" className="overflow-hidden bg-white py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Text content */}
          <div className="reveal active order-2 lg:order-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-semibold tracking-widest text-brand-800 uppercase">
              <CircleUser size={14} />
              스마트 대시보드
            </div>
            <h2 className="mb-6 text-4xl leading-[1.2] font-bold break-keep text-brand-950 md:text-5xl">
              여행 준비부터 호스팅까지,
              <br />
              간편한 통합 관리
            </h2>
            <p className="mb-8 text-lg leading-relaxed break-keep text-brand-600">
              나의 여행 기록을 모아보고, 호스트 모드로 전환해 내 숙소의 예약
              현황을 확인하세요. 하나의 프로필에서 모든 것이 매끄럽게
              연결됩니다.
            </p>

            <ul className="space-y-6">
              {bullets.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-brand-700">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-brand-900">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed break-keep text-brand-600">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual cascade */}
          <div className="reveal delay-200 active relative order-1 flex h-125 items-center justify-center lg:order-2">
            <div className="absolute h-112.5 w-112.5 rounded-full bg-brand-50 opacity-60" />

            {/* Back card */}
            <div className="absolute w-[320px] -translate-x-12 -translate-y-8 rotate-[-4deg] rounded-3xl border border-brand-100 bg-white p-6 opacity-70 shadow-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-brand-100" />
                <div>
                  <div className="mb-2 h-3 w-24 rounded-md bg-brand-200" />
                  <div className="h-2 w-16 rounded-md bg-brand-100" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-14 w-full rounded-xl bg-brand-50" />
                <div className="h-14 w-full rounded-xl bg-brand-50" />
              </div>
            </div>

            {/* Front card */}
            <div className="absolute z-10 w-85 translate-x-4 translate-y-4 rounded-3xl border border-brand-100 bg-white p-7 shadow-premium transition-transform duration-500 hover:scale-[1.02]">
              <div className="mb-6 flex items-center justify-between border-b border-brand-100 pb-5">
                <div className="flex items-center gap-3">
                  <Image
                    src={avatarImg}
                    alt="프로필"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <h3 className="text-lg font-bold text-brand-900">
                    지윤님의 여행
                  </h3>
                </div>
                <Ellipsis size={20} className="text-brand-400" />
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-brand-100/50 bg-brand-50 p-4">
                  <div className="mb-1 text-xs font-semibold text-brand-600">
                    다가오는 여행
                  </div>
                  <div className="font-satoshi text-2xl font-bold text-brand-900">
                    1건
                  </div>
                </div>
                <div className="rounded-2xl border border-brand-100 bg-white p-4">
                  <div className="mb-1 text-xs font-semibold text-brand-400">
                    작성 가능한 후기
                  </div>
                  <div className="font-satoshi text-2xl font-bold text-brand-900">
                    2건
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="group flex cursor-pointer items-center justify-between rounded-2xl border border-brand-100 p-3.5 transition-colors hover:border-brand-300">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-900 group-hover:text-white">
                      <House size={22} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-brand-900">
                        스테이 아일랜드
                      </div>
                      <div className="mt-0.5 font-satoshi text-[11px] text-brand-500">
                        10.24 - 10.26
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-brand-100 px-2.5 py-1.5 text-[10px] font-bold text-brand-800">
                    예약확정
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
