import { createClient } from "@/lib/supabase/client";

export async function markAsRead(notificationId: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId);

  if (error) {
    throw new Error(`알림 읽음 처리 실패: ${error.message}`);
  }
}

export async function markAllAsRead(userId: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) {
    throw new Error(`전체 읽음 처리 실패: ${error.message}`);
  }
}
