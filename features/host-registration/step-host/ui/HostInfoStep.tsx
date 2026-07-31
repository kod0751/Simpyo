interface HostInfoStepProps {
  hostName: string;
  hostPhone: string;
  onHostNameChange: (name: string) => void;
  onHostPhoneChange: (phone: string) => void;
}

export function HostInfoStep({
  hostName,
  hostPhone,
  onHostNameChange,
  onHostPhoneChange,
}: HostInfoStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <label
          htmlFor="hostName"
          className="mb-3 block text-sm font-semibold text-brand-700"
        >
          호스트 이름
        </label>
        <input
          id="hostName"
          type="text"
          value={hostName}
          onChange={(e) => onHostNameChange(e.target.value)}
          placeholder="실명을 입력해 주세요"
          className="w-full rounded-2xl border border-brand-200 bg-white px-5 py-4 text-base text-brand-900 outline-none transition-colors placeholder:text-brand-300 focus:border-brand-900"
        />
      </div>
      <div>
        <label
          htmlFor="hostPhone"
          className="mb-3 block text-sm font-semibold text-brand-700"
        >
          연락처
        </label>
        <input
          id="hostPhone"
          type="tel"
          value={hostPhone}
          onChange={(e) => onHostPhoneChange(e.target.value)}
          placeholder="010-0000-0000"
          className="w-full rounded-2xl border border-brand-200 bg-white px-5 py-4 text-base text-brand-900 outline-none transition-colors placeholder:text-brand-300 focus:border-brand-900"
        />
      </div>
      <div className="rounded-2xl bg-brand-100 p-5 text-sm leading-relaxed text-brand-600">
        등록 완료 후 담당 매니저가 검토를 거쳐 연락드립니다. 입력하신 정보는
        심사 목적으로만 사용됩니다.
      </div>
    </div>
  );
}
