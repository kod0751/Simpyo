import { Counter } from "@/shared/components/ui/counter";

interface BasicsStepProps {
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  onMaxGuestsChange: (value: number) => void;
  onBedroomsChange: (value: number) => void;
  onBedsChange: (value: number) => void;
  onBathroomsChange: (value: number) => void;
}

export function BasicsStep({
  maxGuests,
  bedrooms,
  beds,
  bathrooms,
  onMaxGuestsChange,
  onBedroomsChange,
  onBedsChange,
  onBathroomsChange,
}: BasicsStepProps) {
  return (
    <div className="rounded-3xl border border-brand-100 bg-white px-6">
      <Counter
        label="최대 게스트"
        value={maxGuests}
        min={1}
        onChange={onMaxGuestsChange}
      />
      <Counter
        label="침실"
        value={bedrooms}
        min={0}
        onChange={onBedroomsChange}
      />
      <Counter label="침대" value={beds} min={1} onChange={onBedsChange} />
      <Counter
        label="욕실"
        value={bathrooms}
        min={1}
        onChange={onBathroomsChange}
      />
    </div>
  );
}
