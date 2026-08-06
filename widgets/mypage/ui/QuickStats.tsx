// TODO: 예약/리뷰/포인트 스키마 도입 전까지 하드코딩 유지
const stats = [
  { label: "예정된 여행", value: "1", unit: "건" },
  { label: "다녀온 숙소", value: "14", unit: "곳" },
  { label: "작성한 리뷰", value: "8", unit: "개" },
  { label: "적립 포인트", value: "45,200", unit: "P" },
];

export function QuickStats() {
  return (
    <section className="border-y border-brand-200/50 bg-white/60 py-8 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 divide-x divide-brand-200/50 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group cursor-pointer rounded-2xl py-2 transition-colors hover:bg-brand-50/50"
            >
              <div className="mb-1 text-xs font-medium tracking-wider text-brand-500 uppercase">
                {stat.label}
              </div>
              <div className="font-satoshi text-3xl font-bold text-brand-900 transition-transform group-hover:scale-105">
                {stat.value}
                <span className="ml-1 font-sans text-lg text-brand-400">
                  {stat.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
