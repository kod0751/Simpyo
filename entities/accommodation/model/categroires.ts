export interface Category {
  id: string;
  label: string;
}

export const categories = [
  { id: "all", label: "전체" },
  { id: "pool", label: "풀빌라" },
  { id: "ocean", label: "오션뷰" },
  { id: "hanok", label: "한옥" },
  { id: "forest", label: "숲속" },
  { id: "city", label: "도심" },
  { id: "lake", label: "호수뷰" },
] as const;
