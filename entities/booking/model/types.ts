export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type Booking = {
  id: string;
  listing_id: string;
  guest_id: string;
  check_in: string;
  check_out: string;
  guests_count: number;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
};

export type BookingWithListing = Booking & {
  listing: {
    id: string;
    name: string;
    images: string[];
    address: string;
    region: string;
    host_name: string | null;
  };
};
