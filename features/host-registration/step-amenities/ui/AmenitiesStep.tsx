import { amenities } from "@/lib/host";

interface AmenitiesStepProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export function AmenitiesStep({ selected, onToggle }: AmenitiesStepProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {amenities.map((amenity) => {
        const Icon = amenity.icon;
        const active = selected.includes(amenity.id);
        return (
          <button
            key={amenity.id}
            type="button"
            onClick={() => onToggle(amenity.id)}
            className={`flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all ${
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
  );
}
