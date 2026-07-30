interface DescribeStepProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

export function DescribeStep({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: DescribeStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <label
          htmlFor="title"
          className="mb-3 block text-sm font-semibold text-brand-700"
        >
          숙소 제목
        </label>
        <input
          id="title"
          type="text"
          maxLength={40}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="예) 오션뷰가 아름다운 감성 풀빌라"
          className="w-full rounded-2xl border border-brand-200 bg-white px-5 py-4 text-base text-brand-900 outline-none transition-colors placeholder:text-brand-300 focus:border-brand-900"
        />
        <p className="mt-2 text-right text-xs text-brand-300">
          {title.length}/40
        </p>
      </div>
      <div>
        <label
          htmlFor="description"
          className="mb-3 block text-sm font-semibold text-brand-700"
        >
          숙소 소개
        </label>
        <textarea
          id="description"
          rows={6}
          maxLength={500}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="공간의 분위기, 주변 환경, 게스트가 누릴 수 있는 특별한 경험을 자유롭게 소개해 주세요."
          className="w-full resize-none rounded-2xl border border-brand-200 bg-white px-5 py-4 text-base leading-relaxed text-brand-900 outline-none transition-colors placeholder:text-brand-300 focus:border-brand-900"
        />
        <p className="mt-2 text-right text-xs text-brand-300">
          {description.length}/500
        </p>
      </div>
    </div>
  );
}
