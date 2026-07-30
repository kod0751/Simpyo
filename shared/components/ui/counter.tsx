interface CounterProps {
  label: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
}

export function Counter({ label, value, min, onChange }: CounterProps) {
  return (
    <div className="flex items-center justify-between border-b border-brand-100 py-6 last:border-b-0">
      <span className="text-base font-medium text-brand-900">{label}</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-200 text-brand-600 transition-colors hover:border-brand-400 disabled:opacity-30"
        >
          −
        </button>
        <span className="w-6 text-center text-base font-semibold text-brand-900">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-200 text-brand-600 transition-colors hover:border-brand-400"
        >
          +
        </button>
      </div>
    </div>
  );
}
