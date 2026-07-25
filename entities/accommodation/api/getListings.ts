import type { SortKey } from "@/features/listing-filter/model/useListingFilters";
import { stays } from "@/lib/stays";

interface GetListingsParams {
  query?: string;
  category?: string;
  sort?: SortKey;
}

export function getListings({
  query = "",
  category = "all",
  sort = "recommended",
}: GetListingsParams) {
  const list = stays.filter((stay) => {
    const matchesCategory = category === "all" || stay.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      stay.name.toLowerCase().includes(q) ||
      stay.location.toLowerCase().includes(q) ||
      stay.region.toLowerCase().includes(q) ||
      stay.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return [...list].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });
}
