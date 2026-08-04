import type { Stay } from "@/entities/accommodation/model/types";
import { Award } from "lucide-react";

interface DetailInfoProps {
  listing: Stay;
}

export function DetailInfo({ listing }: DetailInfoProps) {
  return (
    <section className="border-b border-brand-200/50 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-brand-900">
            프라이빗 독채 전체
          </h2>
          <div className="flex flex-wrap gap-4 font-medium text-brand-600">
            <span>최대 인원 {listing.max_guests}명</span>
            <span>·</span>
            <span>침실 {listing.bedrooms}개</span>
            <span>·</span>
            <span>침대 {listing.beds}개</span>
            <span>·</span>
            <span>욕실 {listing.bathrooms}개</span>
          </div>
        </div>
      </div>

      {listing.host_name && (
        <div className="mb-8 rounded-3xl border border-brand-100 bg-brand-50/50 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-900 text-white">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-bold text-brand-900">
                {listing.superhost ? "슈퍼호스트" : "호스트"}{" "}
                {listing.host_name}님이 호스팅하는 숙소입니다
              </h3>
              {listing.superhost && (
                <p className="mt-1 text-sm break-keep text-brand-500">
                  슈퍼호스트는 풍부한 경험과 높은 평점을 자랑하며 게스트가
                  쾌적하게 머무를 수 있도록 최선을 다합니다.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="leading-relaxed font-medium break-keep whitespace-pre-line text-brand-700">
        {listing.description}
      </div>
    </section>
  );
}
