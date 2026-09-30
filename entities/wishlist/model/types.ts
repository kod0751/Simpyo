export type WishlistItem = {
  id: string;
  listing_id: string;
  created_at: string;
  listing: {
    id: string;
    name: string;
    images: string[];
    address: string;
    region: string;
    price_per_night: number;
  };
};
