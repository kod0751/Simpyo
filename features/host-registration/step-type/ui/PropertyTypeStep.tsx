import { propertyTypes } from "@/lib/host";

interface PropertyTypeStepProps {
  value: string;
  onChange: (id: string) => void;
}

export function PropertyTypeStep({ value, onChange }: PropertyTypeStepProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {propertyTypes.map((type) => {
        const Icon = type.icon;
        const active = value === type.id;
        return (
          <button
            key={type.id}
            type="button"
            onClick={() => onChange(type.id)}
            className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
              active
                ? "border-brand-900 bg-brand-900 text-white shadow-premium"
                : "border-brand-200 bg-white text-brand-900 hover:border-brand-400"
            }`}
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                active
                  ? "bg-white/15 text-white"
                  : "bg-brand-100 text-brand-700"
              }`}
            >
              <Icon size={22} />
            </span>
            <span>
              <span className="block text-lg font-semibold">{type.label}</span>
              <span
                className={`mt-1 block text-sm ${active ? "text-white/70" : "text-brand-400"}`}
              >
                {type.desc}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
