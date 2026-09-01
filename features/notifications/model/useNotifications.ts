import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  markAsRead,
  markAllAsRead,
} from "@/entities/notification/api/markAsRead";

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllAsRead(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
