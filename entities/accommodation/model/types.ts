export type Stay = {
  id: string;
  host_id: string;
  name: string;
  description: string;
  address: string;
  region: string;
  category: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  tags: string[];
  images: string[];
  host_name: string | null;
  host_phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // 아직 DB 스키마에 없는 필드 — 임시 하드코딩, 추후 리뷰/호스트 등급 스키마 연동 시 교체
  rating: number;
  reviews: number;
  superhost: boolean;
};
