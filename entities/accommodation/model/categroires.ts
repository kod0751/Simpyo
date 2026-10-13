import { propertyTypes } from "@/lib/host";

export type Category = {
  id: string;
  label: string;
};

export const categories: Category[] = [
  { id: "all", label: "전체" },
  ...propertyTypes.map(({ id, label }) => ({ id, label })),
];
