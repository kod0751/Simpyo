import { KakaoMap } from "./KakaoMap";

interface LocationSectionProps {
  region: string;
  address: string;
}

export function LocationSection({ address }: LocationSectionProps) {
  return (
    <section className="border-t border-brand-200/50 bg-brand-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-brand-900">호스팅 지역</h2>
        <p className="mb-8 font-medium text-brand-600">{address}</p>

        <KakaoMap address={`${address}`} />

        <p className="mt-4 text-sm font-medium text-brand-400">
          정확한 위치는 예약 완료 후 제공됩니다.
        </p>
      </div>
    </section>
  );
}
