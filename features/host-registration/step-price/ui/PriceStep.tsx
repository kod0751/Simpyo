const suggestedPrices = [100000, 150000, 250000, 400000];

interface PriceStepProps {
  price: number;
  onChange: (price: number) => void;
}

export function PriceStep({ price, onChange }: PriceStepProps) {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-brand-100 bg-white p-8 text-center">
        <p className="text-sm font-medium text-brand-400">1박 요금</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-3xl font-semibold text-brand-400">₩</span>
          <input
            type="number"
            min={0}
            step={10000}
            value={price}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-52 border-none bg-transparent text-center font-satoshi text-5xl font-bold text-brand-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <p className="mt-4 text-sm text-brand-400">
          게스트 결제 금액 약 {Math.round(price * 1.1).toLocaleString()}원
          (수수료 포함)
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {suggestedPrices.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className="rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-medium text-brand-600 transition-colors hover:border-brand-400"
          >
            {p.toLocaleString()}원
          </button>
        ))}
      </div>
    </div>
  );
}
