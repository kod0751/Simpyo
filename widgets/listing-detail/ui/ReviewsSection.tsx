import { Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  date: string;
  content: string;
  avatarSeed: string;
}

// 임시 하드코딩 데이터 — 리뷰 스키마 도입 전까지 사용
const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    name: "박도현",
    date: "2024년 4월",
    avatarSeed: "dohyun",
    content:
      "사진보다 실제 공간이 훨씬 아름답습니다. 구석구석 호스트님의 세심한 배려가 느껴졌고, 특히 수영장에서 바라보는 애월 바다의 노을은 평생 잊지 못할 추억이 될 것 같습니다. 웰컴 티도 정말 맛있었어요.",
  },
  {
    id: "2",
    name: "정민준",
    date: "2024년 3월",
    avatarSeed: "minjun",
    content:
      "숙소 청결도가 5성급 호텔 수준입니다. 침구류가 너무 푹신해서 꿀잠 잤네요. 주변 맛집 리스트도 꼼꼼하게 정리해주셔서 여행 내내 편하게 다녔습니다. 부모님 모시고 오기에도 완벽한 곳이에요.",
  },
  {
    id: "3",
    name: "이서진",
    date: "2024년 2월",
    avatarSeed: "seojin",
    content:
      "조용한 곳에서 온전히 쉬고 싶어서 선택했는데 최고의 선택이었습니다. 밤에는 자쿠지에서 별을 보고 아침에는 새소리를 들으며 깼습니다. 다음 제주 여행 때 무조건 다시 올 예정입니다.",
  },
  {
    id: "4",
    name: "강지민",
    date: "2024년 1월",
    avatarSeed: "jimin",
    content:
      "겨울에 방문해서 수영장은 이용 못할 줄 알았는데 미온수 덕분에 따뜻하게 잘 놀았습니다. 난방도 아주 잘 되고 빔프로젝터로 영화 보면서 와인 한잔 하니 천국이 따로 없네요.",
  },
];

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
}

export function ReviewsSection({ rating, reviewCount }: ReviewsSectionProps) {
  return (
    <section className="border-t border-brand-200/50 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center gap-4">
          <Star size={28} className="fill-brand-900 text-brand-900" />
          <h2 className="text-3xl font-bold tracking-tight text-brand-950 md:text-4xl">
            {rating.toFixed(2)}{" "}
            <span className="text-xl font-medium text-brand-500">
              · 후기 {reviewCount}개
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {MOCK_REVIEWS.map((review) => (
            <div key={review.id} className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={`https://i.pravatar.cc/150?u=${review.avatarSeed}`}
                  alt={review.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-brand-900">{review.name}</div>
                  <div className="text-xs font-medium text-brand-500">
                    {review.date}
                  </div>
                </div>
              </div>
              <p className="leading-relaxed font-medium break-keep text-brand-700">
                {review.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button
            type="button"
            className="cursor-pointer rounded-xl border border-brand-900 px-8 py-3 font-bold text-brand-900 transition-all hover:bg-brand-50 active:scale-95"
          >
            후기 {reviewCount}개 모두 보기
          </button>
        </div>
      </div>
    </section>
  );
}
