export type Stay = {
  id: string;
  name: string;
  address: string;
  region: string;
  category: string;
  price_per_night: number;
  images: string[];
  tags: string[];
  // 아직 DB 스키마에 없는 필드 — 임시 하드코딩, 추후 리뷰/호스트 등급 스키마 연동 시 교체
  rating: number;
  reviews: number;
  superhost: boolean;
};
