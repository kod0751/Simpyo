import { CalendarPlus, CalendarDays, MapPin, Star } from "lucide-react";

// TODO: 예약(booking) 스키마 도입 전까지 하드코딩 유지
const scheduleItems = [
  {
    id: "1",
    month: "Nov 2023",
    status: "upcoming" as const,
    dateRange: "11월 15일 (금) - 11월 17일 (일)",
    name: "스테이 오름, 바다를 품은 집",
    location: "제주특별자치도 서귀포시 안덕면",
  },
  {
    id: "2",
    month: "Oct 2023",
    status: "completed" as const,
    name: "북촌 한옥 스튜디오",
    dateRange: "10월 20일 - 10월 22일",
    hasReceipt: true,
  },
  {
    id: "3",
    month: "Jul 2023",
    status: "completed" as const,
    name: "해운대 오션 풀빌라",
    dateRange: "7월 12일 - 7월 15일",
    myRating: 5.0,
  },
];

export function Schedule() {
  return (
    <section className="border-t border-brand-200/50 bg-brand-100/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-brand-950 md:text-4xl">
              나의 일정
            </h2>
            <p className="text-brand-600">
              올해 계획된 여행 일정을 한눈에 확인하세요.
            </p>
          </div>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-900 shadow-sm transition-all hover:bg-brand-50 active:scale-95"
          >
            <CalendarPlus size={18} />
            새로운 일정 등록
          </button>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="premium-card-outer">
            <div className="premium-card-inner bg-white p-8 md:p-12">
              <div className="relative space-y-12 border-l border-brand-200 pb-4 pl-6">
                {scheduleItems.map((item) => {
                  const isUpcoming = item.status === "upcoming";
                  return (
                    <div key={item.id} className="group relative">
                      <div
                        className={`timeline-dot top-1.5 transition-all duration-300 group-hover:scale-150 ${
                          isUpcoming
                            ? "group-hover:bg-brand-500"
                            : "border-brand-50 bg-brand-300"
                        }`}
                      />
                      <div
                        className={`flex flex-col justify-between gap-4 sm:flex-row sm:items-start ${
                          isUpcoming
                            ? ""
                            : "opacity-70 transition-opacity hover:opacity-100"
                        }`}
                      >
                        <div className="w-full pt-1 sm:w-1/4">
                          <span className="font-satoshi mb-1 block text-xl font-bold text-brand-400">
                            {item.month}
                          </span>
                          {isUpcoming ? (
                            <span className="rounded-md bg-brand-100 px-2 py-1 text-xs font-semibold text-brand-500">
                              예정됨
                            </span>
                          ) : (
                            <span className="rounded-md border border-brand-200 bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-400">
                              완료됨
                            </span>
                          )}
                        </div>

                        {isUpcoming ? (
                          <div className="w-full rounded-2xl border border-brand-200/50 bg-brand-50 p-5 transition-all hover:border-brand-300 hover:shadow-md sm:w-3/4">
                            <div className="mb-3 flex items-center gap-3 text-sm font-medium text-brand-500">
                              <CalendarDays
                                size={18}
                                className="text-brand-400"
                              />
                              {item.dateRange}
                            </div>
                            <h4 className="mb-2 text-lg font-bold text-brand-900">
                              {item.name}
                            </h4>
                            <p className="flex items-center gap-1.5 text-sm text-brand-600">
                              <MapPin size={16} className="text-brand-400" />
                              {item.location}
                            </p>
                          </div>
                        ) : (
                          <div className="w-full rounded-2xl border border-brand-200 bg-white p-5 transition-all hover:border-brand-300 sm:w-3/4">
                            <div className="mb-2 flex items-center justify-between">
                              <h4 className="text-base font-bold text-brand-900 line-through decoration-brand-300">
                                {item.name}
                              </h4>
                              {item.hasReceipt && (
                                <button
                                  type="button"
                                  className="cursor-pointer text-xs font-semibold text-brand-900 underline underline-offset-4"
                                >
                                  영수증 보기
                                </button>
                              )}
                              {item.myRating && (
                                <span className="flex items-center gap-1 text-xs font-bold text-brand-500">
                                  <Star
                                    size={12}
                                    className="fill-brand-900 text-brand-900"
                                  />{" "}
                                  내가 남긴 별점 {item.myRating.toFixed(1)}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-brand-500">
                              {item.dateRange}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  className="cursor-pointer text-sm font-semibold text-brand-500 transition-colors hover:text-brand-900"
                >
                  이전 일정 더보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
