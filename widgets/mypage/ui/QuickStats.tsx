import Link from "next/link";
import type { BookingWithListing } from "@/entities/booking/model/types";

interface QuickStatsProps {
  bookings: BookingWithListing[];
  wishlistCount: number;
  reviewCount: number;
}

export function QuickStats({
  bookings,
  wishlistCount,
  reviewCount,
}: QuickStatsProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activeBookings = bookings.filter((b) => b.status !== "cancelled");

  const upcomingCount = activeBookings.filter(
    (b) => new Date(b.check_out) >= today,
  ).length;

  const visitedListingIds = new Set(
    activeBookings
      .filter((b) => new Date(b.check_out) < today)
      .map((b) => b.listing_id),
  );

  const stats = [
    {
      label: "예정된 여행",
      value: upcomingCount,
      unit: "건",
      href: "/mypage/bookings",
    },
    {
      label: "다녀온 숙소",
      value: visitedListingIds.size,
      unit: "곳",
      href: "/mypage/bookings",
    },
    { label: "작성한 리뷰", value: reviewCount, unit: "개", href: null },
    {
      label: "찜한 숙소",
      value: wishlistCount,
      unit: "곳",
      href: "/mypage/wishlists",
    },
  ];

  return (
    <section className="border-y border-brand-200/50 bg-white/60 py-8 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 divide-x divide-brand-200/50 text-center md:grid-cols-4">
          {stats.map((stat) => {
            const content = (
              <>
                <div className="mb-1 text-xs font-medium tracking-wider text-brand-500 uppercase">
                  {stat.label}
                </div>
                <div className="font-satoshi text-3xl font-bold text-brand-900 transition-transform group-hover:scale-105">
                  {stat.value.toLocaleString()}
                  <span className="ml-1 font-sans text-lg text-brand-400">
                    {stat.unit}
                  </span>
                </div>
              </>
            );

            return stat.href ? (
              <Link
                key={stat.label}
                href={stat.href}
                className="group cursor-pointer rounded-2xl py-2 transition-colors hover:bg-brand-50/50"
              >
                {content}
              </Link>
            ) : (
              <div key={stat.label} className="group rounded-2xl py-2">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
