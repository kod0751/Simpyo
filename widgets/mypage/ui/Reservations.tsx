import { ChevronRight, PenLine, ArrowRight } from "lucide-react";

// TODO: 예약(booking) 스키마 도입 전까지 하드코딩 유지
const upcomingBooking = {
  image: "https://picsum.photos/seed/stay-ocean/800/800",
  region: "제주 서귀포",
  name: "스테이 오름, 바다를 품은 집",
  dDay: "D-12",
  bookingNo: "No. 2039481",
  checkIn: { date: "11. 15 (금)", time: "15:00 이후" },
  checkOut: { date: "11. 17 (일)", time: "11:00 이전" },
  hostName: "박도현",
  hostAvatar: "https://i.pravatar.cc/150?u=host-dohyun",
};

export function Reservations() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-brand-950 md:text-4xl">
              나의 예약 상태
            </h2>
            <p className="text-brand-600">
              다가오는 휴식을 미리 확인하고 준비하세요.
            </p>
          </div>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-brand-900 transition-opacity hover:opacity-70"
          >
            전체보기 <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="premium-card-outer lg:col-span-8">
            <div className="premium-card-inner flex h-full flex-col gap-2 p-2 md:flex-row">
              <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] md:aspect-auto md:w-1/2">
                <img
                  src={upcomingBooking.image}
                  alt={upcomingBooking.name}
                  className="h-full w-full object-cover transition-transform duration-[1.5s] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold tracking-widest text-brand-900 uppercase shadow-lg">
                    {upcomingBooking.dDay}
                  </span>
                </div>
                <div className="absolute right-5 bottom-5 left-5 text-white">
                  <div className="mb-1 text-xs font-medium text-white/80">
                    {upcomingBooking.region}
                  </div>
                  <h3 className="text-2xl leading-tight font-bold">
                    {upcomingBooking.name}
                  </h3>
                </div>
              </div>

              <div className="flex w-full flex-col justify-between rounded-[1.5rem] bg-brand-50 p-6 md:w-1/2">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-md bg-brand-200/50 px-3 py-1 text-xs font-semibold text-brand-800">
                      예약 확정
                    </span>
                    <span className="font-satoshi text-sm font-medium text-brand-500">
                      {upcomingBooking.bookingNo}
                    </span>
                  </div>

                  <div className="mb-8 grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-1 text-xs font-medium text-brand-400">
                        체크인
                      </p>
                      <p className="font-satoshi text-lg font-bold text-brand-900">
                        {upcomingBooking.checkIn.date}
                      </p>
                      <p className="text-sm text-brand-600">
                        {upcomingBooking.checkIn.time}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium text-brand-400">
                        체크아웃
                      </p>
                      <p className="font-satoshi text-lg font-bold text-brand-900">
                        {upcomingBooking.checkOut.date}
                      </p>
                      <p className="text-sm text-brand-600">
                        {upcomingBooking.checkOut.time}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-brand-200 pt-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={upcomingBooking.hostAvatar}
                        alt={`${upcomingBooking.hostName} 호스트`}
                        className="h-12 w-12 rounded-full border border-brand-200 object-cover"
                      />
                      <div>
                        <p className="mb-0.5 text-xs text-brand-500">호스트</p>
                        <p className="text-sm font-bold text-brand-900">
                          {upcomingBooking.hostName} 님
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    className="flex-1 cursor-pointer rounded-xl border border-brand-200 bg-white py-3 text-sm font-bold text-brand-900 transition-all hover:bg-brand-50 active:scale-[0.98]"
                  >
                    메시지
                  </button>
                  <button
                    type="button"
                    className="flex-1 cursor-pointer rounded-xl bg-brand-900 py-3 text-sm font-bold text-white shadow-lg shadow-brand-900/10 transition-all hover:bg-brand-800 active:scale-[0.98]"
                  >
                    상세 보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4">
            <div className="premium-card-outer flex-1">
              <div className="premium-card-inner group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden bg-white p-6 transition-colors hover:bg-brand-50">
                <PenLine
                  size={120}
                  className="absolute top-[-20px] right-[-20px] text-brand-900 opacity-5 transition-transform duration-700 group-hover:scale-110"
                />
                <div>
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-md bg-brand-100 px-2.5 py-1 text-[10px] font-bold text-brand-600">
                    리뷰 대기
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-brand-900">
                    북촌 한옥 스튜디오
                  </h3>
                  <p className="text-sm text-brand-500">
                    2023.10.20 - 10.22 다녀옴
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-brand-900">
                  리뷰 작성하고 3,000P 받기
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 transition-colors group-hover:bg-brand-200">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>

            <div className="premium-card-outer flex-1">
              <div className="premium-card-inner group flex h-full cursor-pointer gap-2 bg-white p-2">
                <div className="relative w-1/3 overflow-hidden rounded-xl">
                  <img
                    src="https://picsum.photos/seed/stay-forest/400/400"
                    alt="포레스트 캐빈"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="flex w-2/3 flex-col justify-center p-3">
                  <div className="mb-1 text-[10px] font-bold text-brand-400 uppercase">
                    최근 저장한 숙소
                  </div>
                  <h4 className="mb-1 truncate text-sm font-bold text-brand-900">
                    포레스트 캐빈, 숲 속의 밤
                  </h4>
                  <p className="font-satoshi text-sm font-medium text-brand-600">
                    ₩180,000 / 1박
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
