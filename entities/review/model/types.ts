export type Review = {
  id: string;
  booking_id: string;
  listing_id: string;
  guest_id: string;
  rating: number;
  content: string;
  created_at: string;
  updated_at: string;
};

export type ReviewableBooking = {
  id: string;
  listing_id: string;
  check_in: string;
  check_out: string;
  listing: {
    id: string;
    name: string;
    images: string[];
    region: string;
  };
};

export type ReviewWithGuest = Review & {
  guest: {
    id: string;
    name: string | null;
    avatar_url: string | null;
  };
};
