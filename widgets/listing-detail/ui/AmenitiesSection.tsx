import { amenities as amenityDefinitions } from "@/lib/host";
import { CircleCheck } from "lucide-react";

interface AmenitiesSectionProps {
  amenities: string[];
}

export function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  if (amenities.length === 0) return null;

  return (
    <section className="border-b border-brand-200/50 py-12">
      <h2 className="mb-8 text-2xl font-bold text-brand-900">숙소 편의시설</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
        {amenities.map((label) => {
          const definition = amenityDefinitions.find((a) => a.label === label);
          const Icon = definition?.icon ?? CircleCheck;

          return (
            <div
              key={label}
              className="flex items-center gap-4 font-medium text-brand-700"
            >
              <Icon size={24} className="text-brand-400" />
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
