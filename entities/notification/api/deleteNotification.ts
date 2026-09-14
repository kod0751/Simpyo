import { createClient } from "@/lib/supabase/client";

export async function deleteNotification(
  notificationId: string,
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notificationId);

  if (error) {
    throw new Error(`알림 삭제 실패: ${error.message}`);
  }
}
