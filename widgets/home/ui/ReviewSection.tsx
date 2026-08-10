import { Star, StarHalf, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

type Review = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  half?: boolean;
  delay: string;
};

const reviews: Review[] = [
  {
    quote:
      '"오랜만의 가족 여행이었는데, 사진과 똑같이 깨끗하고 감성적인 숙소 덕분에 부모님도 너무 좋아하셨어요. 완벽한 휴가를 보냈습니다."',
    name: "하윤서",
    role: "가족 여행객",
    avatar: "/img/avatar-1.png",
    delay: "delay-100",
  },
  {
    quote:
      '"호스트로 활동한 지 6개월 차입니다. 앱 하나로 예약 현황과 정산을 직관적으로 볼 수 있어서 직장 다니며 운영하기에 무리가 없네요."',
    name: "박도현",
    role: "스테이 호스트",
    avatar: "/img/avatar-2.png",
    delay: "delay-200",
  },
  {
    quote:
      '"강아지와 함께 갈 수 있는 프라이빗한 숙소를 찾기 힘들었는데, 쉼터의 상세 필터 덕분에 잔디 마당이 있는 마음에 쏙 드는 곳을 발견했어요."',
    name: "최시우",
    role: "반려인, 커플 여행객",
    avatar: "/img/avatar-3.png",
    half: true,
    delay: "delay-300",
  },
];

export function ReviewSection() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-brand-900 py-32 text-white"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #E4E2DA 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal active mb-16 items-end justify-between md:flex">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-4xl leading-[1.2] font-bold break-keep md:text-5xl">
              쉼터를 경험한
              <br />
              여행자들의 이야기
            </h2>
            <p className="text-lg break-keep text-brand-300">
              가족 여행부터 혼자만의 힐링 여행까지. 실제 이용 고객들이 남긴
              생생한 후기를 확인하세요.
            </p>
          </div>
          <div className="mt-8 flex gap-3 md:mt-0">
            <button
              type="button"
              aria-label="이전 후기"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-white/10 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="다음 후기"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-900 transition-all hover:scale-105 active:scale-95"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className={`reveal ${review.delay} active rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors hover:bg-white/10`}
            >
              <div className="mb-6 flex gap-1 text-accent-500">
                {Array.from({ length: review.half ? 4 : 5 }).map((_, i) => (
                  <Star key={i} size={18} className="fill-accent-500" />
                ))}
                {review.half && (
                  <StarHalf size={18} className="fill-accent-500" />
                )}
              </div>
              <p className="mb-8 text-lg leading-relaxed break-keep text-brand-50">
                {review.quote}
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-white/20 object-cover"
                />
                <div>
                  <div className="font-bold">{review.name}</div>
                  <div className="mt-0.5 text-sm text-brand-400">
                    {review.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
