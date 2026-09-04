import { CalendarPlus, CalendarDays, MapPin, CalendarX } from "lucide-react";
import type { BookingWithListing } from "@/entities/booking/model/types";

interface ScheduleProps {
  bookings: BookingWithListing[];
}

function formatMonthYear(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatDateRange(checkIn: string, checkOut: string) {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  return `${inDate.getMonth() + 1}월 ${inDate.getDate()}일 - ${outDate.getMonth() + 1}월 ${outDate.getDate()}일`;
}

export function Schedule({ bookings }: ScheduleProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sorted = [...bookings].sort(
    (a, b) => new Date(b.check_in).getTime() - new Date(a.check_in).getTime(),
  );

  return (
    <section className="border-t border-brand-200/50 bg-brand-100/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-brand-950 md:text-4xl">
              나의 일정
            </h2>
            <p className="text-brand-600">
              예약된 여행 일정을 한눈에 확인하세요.
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
              {sorted.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <CalendarX size={32} className="text-brand-300" />
                  <p className="text-sm font-semibold text-brand-700">
                    등록된 일정이 없어요
                  </p>
                </div>
              ) : (
                <div className="relative space-y-12 border-l border-brand-200 pb-4 pl-6">
                  {sorted.map((booking) => {
                    const isUpcoming = new Date(booking.check_out) >= today;
                    return (
                      <div key={booking.id} className="group relative">
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
                              {formatMonthYear(booking.check_in)}
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
                                {formatDateRange(
                                  booking.check_in,
                                  booking.check_out,
                                )}
                              </div>
                              <h4 className="mb-2 text-lg font-bold text-brand-900">
                                {booking.listing.name}
                              </h4>
                              <p className="flex items-center gap-1.5 text-sm text-brand-600">
                                <MapPin size={16} className="text-brand-400" />
                                {booking.listing.region} ·{" "}
                                {booking.listing.address}
                              </p>
                            </div>
                          ) : (
                            <div className="w-full rounded-2xl border border-brand-200 bg-white p-5 transition-all hover:border-brand-300 sm:w-3/4">
                              <h4 className="mb-2 text-base font-bold text-brand-900 line-through decoration-brand-300">
                                {booking.listing.name}
                              </h4>
                              <p className="text-sm text-brand-500">
                                {formatDateRange(
                                  booking.check_in,
                                  booking.check_out,
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
