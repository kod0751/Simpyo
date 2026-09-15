"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, CalendarCheck, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUnreadCountClient } from "@/entities/notification/api/getUnreadCountClient";
import { getMyNotificationsClient } from "@/entities/notification/api/getMyNotificationsClient";
import {
  useDeleteNotification,
  useMarkAllAsRead,
  useMarkAsRead,
} from "../model/useNotifications";

interface NotificationBellProps {
  userId: string;
  buttonClassName?: string;
}

function timeAgo(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  return `${Math.floor(diffHour / 24)}일 전`;
}

export function NotificationBell({
  userId,
  buttonClassName,
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["notifications", "unread-count", userId],
    queryFn: () => getUnreadCountClient(userId),
    refetchInterval: 60000,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getMyNotificationsClient(userId),
    enabled: open,
  });

  const { mutate: markRead } = useMarkAsRead();
  const { mutate: markAllRead } = useMarkAllAsRead(userId);
  const { mutate: deleteOne } = useDeleteNotification();

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="알림"
        onClick={() => setOpen((v) => !v)}
        className={
          buttonClassName ??
          "relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-brand-200 bg-white text-brand-900 shadow-sm transition-all hover:scale-105 hover:bg-brand-50 active:scale-95"
        }
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full border-2 border-white bg-red-500" />
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-14 right-0 z-50 w-80 rounded-2xl border border-brand-100 bg-white p-2 shadow-premium">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-bold text-brand-900">알림</span>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => markAllRead()}
                  className="cursor-pointer text-xs font-semibold text-brand-500 hover:text-brand-900"
                >
                  모두 읽음
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center">
                <CalendarCheck size={22} className="text-brand-300" />
                <p className="text-xs text-brand-400">새 알림이 없어요</p>
              </div>
            ) : (
              <div className="max-h-80 space-y-1.5 overflow-y-auto p-1">
                {notifications.map((n) => {
                  const content = (
                    <>
                      <div className="flex items-center gap-2">
                        {!n.is_read && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                        )}
                        <p className="text-sm font-medium text-brand-800">
                          {n.message}
                        </p>
                      </div>
                      <span className="text-xs text-brand-400">
                        {timeAgo(n.created_at)}
                      </span>
                    </>
                  );

                  return (
                    <div
                      key={n.id}
                      className={`group relative flex items-start rounded-xl transition-colors hover:bg-brand-50 ${
                        n.is_read ? "" : "bg-brand-50/60"
                      }`}
                    >
                      {n.listing_id ? (
                        <Link
                          href={`/listings/${n.listing_id}`}
                          onClick={() => {
                            if (!n.is_read) markRead(n.id);
                            setOpen(false);
                          }}
                          className="flex flex-1 cursor-pointer flex-col gap-1 px-3 py-2.5 text-left"
                        >
                          {content}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => !n.is_read && markRead(n.id)}
                          className="flex flex-1 cursor-pointer flex-col gap-1 px-3 py-2.5 text-left"
                        >
                          {content}
                        </button>
                      )}

                      <button
                        type="button"
                        aria-label="알림 삭제"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteOne(n.id);
                        }}
                        className="mt-2 mr-2 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-brand-300 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-brand-100 hover:text-brand-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
