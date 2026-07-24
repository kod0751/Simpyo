export type Stay = {
  id: string;
  name: string;
  location: string;
  region: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
  superhost: boolean;
};

export const stays: Stay[] = [
  {
    id: "goyo",
    name: "스테이 고요, 프라이빗 풀빌라",
    location: "제주 서귀포시",
    region: "제주",
    category: "pool",
    price: 420000,
    rating: 4.9,
    reviews: 1284,
    image: "/img/hero-villa.png",
    tags: ["프라이빗 풀", "오션뷰", "반려동물"],
    superhost: true,
  },
  {
    id: "ocean",
    name: "바다를 품은 오션 스테이",
    location: "강원 강릉시",
    region: "강원",
    category: "ocean",
    price: 280000,
    rating: 4.8,
    reviews: 947,
    image: "/img/stay-ocean.png",
    tags: ["오션뷰", "통창", "조식 제공"],
    superhost: true,
  },
  {
    id: "hanok",
    name: "고즈넉한 한옥, 마루",
    location: "전북 전주시",
    region: "전북",
    category: "hanok",
    price: 190000,
    rating: 4.9,
    reviews: 612,
    image: "/img/stay-hanok.png",
    tags: ["한옥", "중정", "차 세트"],
    superhost: false,
  },
  {
    id: "forest",
    name: "숲속의 미니멀 캐빈",
    location: "경기 가평군",
    region: "경기",
    category: "forest",
    price: 230000,
    rating: 4.7,
    reviews: 438,
    image: "/img/stay-forest.png",
    tags: ["숲뷰", "벽난로", "독채"],
    superhost: false,
  },
  {
    id: "cityloft",
    name: "도심 속 감성 시티 로프트",
    location: "서울 성동구",
    region: "서울",
    category: "city",
    price: 175000,
    rating: 4.6,
    reviews: 823,
    image: "/img/stay-cityloft.png",
    tags: ["도심", "시티뷰", "역세권"],
    superhost: false,
  },
  {
    id: "lake",
    name: "물 위에 뜬 레이크 하우스",
    location: "충북 청주시",
    region: "충북",
    category: "lake",
    price: 310000,
    rating: 4.9,
    reviews: 556,
    image: "/img/stay-lake.png",
    tags: ["호수뷰", "데크", "독채"],
    superhost: true,
  },
  {
    id: "jeju-resort",
    name: "제주 프리미엄 리조트",
    location: "제주 제주시",
    region: "제주",
    category: "ocean",
    price: 260000,
    rating: 4.7,
    reviews: 1102,
    image: "/img/hotel-jeju.png",
    tags: ["오션뷰", "수영장", "조식 제공"],
    superhost: true,
  },
  {
    id: "gangneung-hotel",
    name: "강릉 씨사이드 호텔",
    location: "강원 강릉시",
    region: "강원",
    category: "ocean",
    price: 210000,
    rating: 4.5,
    reviews: 689,
    image: "/img/hotel-gangneung.png",
    tags: ["오션뷰", "스파", "주차 무료"],
    superhost: false,
  },
];
