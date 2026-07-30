import { regions } from "@/lib/host";

interface LocationStepProps {
  region: string;
  address: string;
  onRegionChange: (region: string) => void;
  onAddressChange: (address: string) => void;
}

export function LocationStep({
  region,
  address,
  onRegionChange,
  onAddressChange,
}: LocationStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <label className="mb-3 block text-sm font-semibold text-brand-700">
          지역
        </label>
        <div className="flex flex-wrap gap-2.5">
          {regions.map((r) => {
            const active = region === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => onRegionChange(r)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "border-brand-900 bg-brand-900 text-white"
                    : "border-brand-200 bg-white text-brand-600 hover:border-brand-400"
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <label
          htmlFor="address"
          className="mb-3 block text-sm font-semibold text-brand-700"
        >
          상세 주소
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="예) 서귀포시 안덕면 산방로 123"
          className="w-full rounded-2xl border border-brand-200 bg-white px-5 py-4 text-base text-brand-900 outline-none transition-colors placeholder:text-brand-300 focus:border-brand-900"
        />
      </div>
    </div>
  );
}
