import type { LucideIcon } from "lucide-react";
import {
  House,
  Building2,
  TreePine,
  WavesLadder,
  Tent,
  Landmark,
  Wifi,
  Car,
  UtensilsCrossed,
  Snowflake,
  Tv,
  WashingMachine,
  Flame,
  Dumbbell,
  Bath,
  PawPrint,
} from "lucide-react";

export type PropertyType = {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
};

export const propertyTypes: PropertyType[] = [
  {
    id: "pool",
    label: "풀빌라",
    desc: "프라이빗 수영장을 갖춘 독채",
    icon: WavesLadder,
  },
  {
    id: "house",
    label: "독채 스테이",
    desc: "통째로 사용하는 단독 공간",
    icon: House,
  },
  { id: "hanok", label: "한옥", desc: "전통의 멋이 담긴 한옥", icon: Landmark },
  {
    id: "forest",
    label: "숲속 스테이",
    desc: "자연에 둘러싸인 휴식처",
    icon: TreePine,
  },
  {
    id: "city",
    label: "도심 스테이",
    desc: "도시 한복판의 감성 공간",
    icon: Building2,
  },
  {
    id: "camping",
    label: "글램핑·캠핑",
    desc: "자연 속 특별한 하룻밤",
    icon: Tent,
  },
];

export const regions = [
  "제주",
  "강원",
  "부산",
  "경기",
  "서울",
  "인천",
  "경상",
  "전라",
  "충청",
] as const;

export type Amenity = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const amenities: Amenity[] = [
  { id: "wifi", label: "무선 인터넷", icon: Wifi },
  { id: "parking", label: "무료 주차", icon: Car },
  { id: "kitchen", label: "주방", icon: UtensilsCrossed },
  { id: "aircon", label: "냉난방", icon: Snowflake },
  { id: "tv", label: "TV", icon: Tv },
  { id: "laundry", label: "세탁기", icon: WashingMachine },
  { id: "bbq", label: "바비큐", icon: Flame },
  { id: "gym", label: "피트니스", icon: Dumbbell },
  { id: "spa", label: "스파·욕조", icon: Bath },
  { id: "pet", label: "반려동물 동반", icon: PawPrint },
];

export type HostFormData = {
  propertyType: string;
  region: string;
  address: string;
  title: string;
  description: string;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  tags: string[];
  photos: File[];
  price: number;
  hostName: string;
  hostPhone: string;
};

export const initialHostForm: HostFormData = {
  propertyType: "",
  region: "",
  address: "",
  title: "",
  description: "",
  maxGuests: 2,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  amenities: [],
  tags: [],
  photos: [],
  price: 150000,
  hostName: "",
  hostPhone: "",
};

export const steps = [
  {
    id: "type",
    title: "어떤 숙소인가요?",
    subtitle: "숙소 유형을 선택해 주세요.",
  },
  {
    id: "location",
    title: "숙소는 어디에 있나요?",
    subtitle: "지역과 주소를 입력해 주세요.",
  },
  {
    id: "basics",
    title: "기본 정보를 알려주세요",
    subtitle: "수용 인원과 공간 구성을 설정합니다.",
  },
  {
    id: "amenities",
    title: "어떤 편의시설이 있나요?",
    subtitle: "게스트에게 제공하는 편의시설을 골라주세요.",
  },
  {
    id: "photos",
    title: "사진을 등록해 주세요",
    subtitle: "숙소를 가장 잘 보여주는 사진을 올려주세요.",
  },
  {
    id: "describe",
    title: "숙소를 소개해 주세요",
    subtitle: "매력적인 제목과 설명을 작성합니다.",
  },
  {
    id: "price",
    title: "요금을 설정해 주세요",
    subtitle: "1박 기준 요금을 입력합니다.",
  },
  {
    id: "host",
    title: "마지막으로 호스트 정보를",
    subtitle: "연락 가능한 정보를 입력해 주세요.",
  },
] as const;

export type StepId = (typeof steps)[number]["id"];

export type Tag = { id: string; label: string };

export const highlightTags: Tag[] = [
  { id: "ocean-view", label: "오션뷰" },
  { id: "forest-view", label: "숲뷰" },
  { id: "lake-view", label: "호수뷰" },
  { id: "pool", label: "수영장" },
  { id: "breakfast", label: "조식 제공" },
  { id: "spa", label: "스파" },
  { id: "parking", label: "주차 무료" },
  { id: "private-house", label: "독채" },
  { id: "deck", label: "데크" },
  { id: "city-view", label: "시티뷰" },
  { id: "fireplace", label: "벽난로" },
  { id: "hanok", label: "한옥 체험" },
];

export const MAX_TAGS = 3;
