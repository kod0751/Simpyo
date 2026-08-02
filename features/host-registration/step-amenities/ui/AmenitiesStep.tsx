import { amenities, highlightTags, MAX_TAGS } from "@/lib/host";

interface AmenitiesStepProps {
  selectedAmenities: string[];
  selectedTags: string[];
  onToggleAmenity: (id: string) => void;
  onToggleTag: (id: string) => void;
}

export function AmenitiesStep({
  selectedAmenities,
  selectedTags,
  onToggleAmenity,
  onToggleTag,
}: AmenitiesStepProps) {
  const tagLimitReached = selectedTags.length >= MAX_TAGS;

  return (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 text-base font-semibold text-brand-900">
          편의시설
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {amenities.map((amenity) => {
            const Icon = amenity.icon;
            const active = selectedAmenities.includes(amenity.id);
            return (
              <button
                key={amenity.id}
                type="button"
                onClick={() => onToggleAmenity(amenity.id)}
                className={`flex flex-col items-start gap-3 rounded-2xl border p-5 text-left cursor-pointer transition-all ${
                  active
                    ? "border-brand-900 bg-brand-50 shadow-sm"
                    : "border-brand-200 bg-white hover:border-brand-400"
                }`}
              >
                <Icon
                  size={24}
                  className={active ? "text-brand-900" : "text-brand-500"}
                />
                <span
                  className={`text-sm font-medium ${active ? "text-brand-900" : "text-brand-600"}`}
                >
                  {amenity.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-base font-semibold text-brand-900">
            이 숙소만의 특징
          </h3>
          <span className="text-sm text-brand-400">
            {selectedTags.length}/{MAX_TAGS}개 선택
          </span>
        </div>
        <p className="mb-4 text-sm text-brand-400">
          검색 결과 카드에 뱃지로 표시돼요. 가장 매력적인 특징을 골라주세요.
        </p>
        <div className="flex flex-wrap gap-2.5">
          {highlightTags.map((tag) => {
            const active = selectedTags.includes(tag.id);
            const disabled = !active && tagLimitReached;
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => onToggleTag(tag.id)}
                disabled={disabled}
                className={`rounded-full border px-4 py-2 text-sm font-medium cursor-pointer transition-all disabled:cursor-default ${
                  active
                    ? "border-brand-900 bg-brand-900 text-white"
                    : disabled
                      ? "border-brand-100 bg-brand-50 text-brand-300"
                      : "border-brand-200 bg-white text-brand-600 hover:border-brand-400"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
