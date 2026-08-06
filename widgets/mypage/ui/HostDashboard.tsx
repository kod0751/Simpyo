import Link from "next/link";
import {
  KeyRound,
  HousePlus,
  Wallet,
  TrendingUp,
  Star,
  Images,
} from "lucide-react";
import type { Stay } from "@/entities/accommodation/model/types";

interface HostDashboardProps {
  listings: Stay[];
}

export function HostDashboard({ listings }: HostDashboardProps) {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-900/10 bg-brand-900/5 px-3 py-1.5 text-xs font-semibold text-brand-800">
              <KeyRound size={14} className="text-brand-500" />
              호스트 모드
            </div>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-brand-950 md:text-4xl">
              숙소 관리
            </h2>
            <p className="text-brand-600">
              운영 중인 공간의 상태와 수익을 관리하세요.
            </p>
          </div>
          <Link
            href="/register/type"
            className="flex items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-900/10 transition-all hover:bg-brand-800 active:scale-[0.98]"
          >
            <HousePlus size={18} />
            새로운 숙소 등록
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* TODO: 예약/결제 스키마 도입 전까지 수익 정보는 하드코딩 유지 */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div className="premium-card-outer flex-1">
              <div
                className="premium-card-inner flex h-full flex-col justify-between p-8 text-white"
                style={{ backgroundColor: "var(--color-brand-900)" }}
              >
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-300">
                      11월 예상 수익
                    </span>
                    <Wallet size={24} className="text-brand-400" />
                  </div>
                  <div className="font-satoshi mb-2 text-4xl font-bold md:text-5xl">
                    ₩3,420,000
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 font-bold text-white">
                      <TrendingUp size={14} /> +12%
                    </span>
                    <span className="text-brand-400">지난달 대비</span>
                  </div>
                </div>

                <div className="mt-12 space-y-4">
                  <div className="flex items-end justify-between border-b border-white/10 pb-3">
                    <span className="text-sm text-brand-300">
                      운영 중인 숙소
                    </span>
                    <span className="font-satoshi text-xl font-bold">
                      {listings.filter((l) => l.is_active).length}
                      <span className="ml-1 font-sans text-sm font-normal text-brand-400">
                        개
                      </span>
                    </span>
                  </div>
                  <div className="flex items-end justify-between border-b border-white/10 pb-3">
                    <span className="text-sm text-brand-300">
                      등록한 숙소 전체
                    </span>
                    <span className="font-satoshi text-xl font-bold">
                      {listings.length}
                      <span className="ml-1 font-sans text-sm font-normal text-brand-400">
                        개
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="premium-card-outer h-full">
              <div className="premium-card-inner h-full bg-brand-50 p-2">
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-brand-900">
                      운영 중인 스테이
                    </h3>
                  </div>

                  {listings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-brand-200 py-16 text-center">
                      <Images size={28} className="mb-3 text-brand-300" />
                      <p className="mb-1 text-sm font-semibold text-brand-700">
                        아직 등록한 숙소가 없어요
                      </p>
                      <p className="mb-6 text-xs text-brand-400">
                        첫 숙소를 등록하고 호스트가 되어보세요.
                      </p>
                      <Link
                        href="/register/type"
                        className="rounded-lg bg-brand-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-800"
                      >
                        숙소 등록하기
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {listings.map((listing) => (
                        <Link
                          key={listing.id}
                          href={`/listings/${listing.id}`}
                          className="group flex cursor-pointer flex-col items-center gap-4 rounded-xl border border-brand-200 p-4 transition-colors hover:border-brand-400 sm:flex-row"
                        >
                          {listing.images[0] ? (
                            <img
                              src={listing.images[0]}
                              alt={listing.name}
                              className="h-24 w-full rounded-lg object-cover sm:w-24"
                            />
                          ) : (
                            <div className="flex h-24 w-full items-center justify-center rounded-lg bg-brand-100 text-brand-400 sm:w-24">
                              <Images size={28} />
                            </div>
                          )}
                          <div className="w-full flex-1">
                            <div className="mb-1 flex items-start justify-between gap-2">
                              <h4 className="font-bold text-brand-900 transition-colors group-hover:text-brand-600">
                                {listing.name}
                              </h4>
                              {listing.is_active ? (
                                <span className="shrink-0 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700">
                                  운영중
                                </span>
                              ) : (
                                <span className="shrink-0 rounded-full border border-brand-200 bg-brand-100 px-2.5 py-1 text-[10px] font-bold text-brand-500">
                                  비활성
                                </span>
                              )}
                            </div>
                            <p className="mb-3 text-xs text-brand-500">
                              {listing.region} · 최대 {listing.max_guests}인
                            </p>
                            <div className="flex gap-4 text-sm font-medium">
                              <div className="flex flex-col">
                                <span className="text-[10px] text-brand-400 uppercase">
                                  1박 요금
                                </span>
                                <span className="text-brand-900">
                                  {listing.price_per_night.toLocaleString()}원
                                </span>
                              </div>
                              <div className="w-px bg-brand-200" />
                              <div className="flex flex-col">
                                <span className="text-[10px] text-brand-400 uppercase">
                                  평점
                                </span>
                                <span className="flex items-center gap-1 text-brand-900">
                                  <Star
                                    size={12}
                                    className="fill-brand-900 text-brand-900"
                                  />{" "}
                                  {listing.rating.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="w-full sm:w-auto sm:border-l sm:border-brand-200 sm:pl-4">
                            <span className="block w-full rounded-lg bg-brand-100 px-4 py-2 text-center text-xs font-bold text-brand-900 sm:w-auto">
                              관리하기
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
