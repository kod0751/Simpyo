export type NotificationType = "booking_created" | "booking_cancelled";

export type Notification = {
  id: string;
  user_id: string;
  type: NotificationType;
  booking_id: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};
