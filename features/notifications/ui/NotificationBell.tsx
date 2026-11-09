"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, CalendarCheck, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Notification } from "@/entities/notification/model/types";
import { getUnreadCountClient } from "@/entities/notification/api/getUnreadCountClient";
import { getMyNotificationsClient } from "@/entities/notification/api/getMyNotificationsClient";
import {
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
} from "../model/useNotifications";
import { BottomSheet } from "@/shared/ui/BottomSheet";

interface NotificationBellProps {
  userId: string;
  buttonClassName?: string;
  variant?: "dropdown" | "sheet";
  onNavigate?: () => void;
}

function timeAgo(dateStr: string) {
  const diffMin = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 60000,
  );
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  return `${Math.floor(diffHour / 24)}일 전`;
}

function getNotificationHref(n: Notification): string | null {
  switch (n.type) {
    case "booking_created":
    case "booking_cancelled":
      return "/mypage/hosting";
    default:
      return n.listing_id ? `/listings/${n.listing_id}` : null;
  }
}

const DEFAULT_BUTTON_CLASS =
  "relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-brand-200 bg-white text-brand-900 shadow-sm transition-all hover:scale-105 hover:bg-brand-50 active:scale-95";

export function NotificationBell({
  userId,
  buttonClassName,
  variant = "dropdown",
  onNavigate,
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSheet = variant === "sheet";

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

  function close() {
    setOpen(false);
  }

  function handleItemClick(n: Notification) {
    if (!n.is_read) markRead(n.id);
    close();
    onNavigate?.();
  }

  // 드롭다운: 바깥 클릭 · ESC로 닫기 (시트는 BottomSheet가 처리)
  useEffect(() => {
    if (!open || isSheet) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isSheet]);

  const panel = (
    <NotificationPanel
      notifications={notifications}
      unreadCount={unreadCount}
      onMarkAllRead={() => markAllRead()}
      onItemClick={handleItemClick}
      onMarkRead={(id) => markRead(id)}
      onDelete={(id) => deleteOne(id)}
      large={isSheet}
    />
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="알림"
        aria-expanded={open}
        aria-haspopup={isSheet ? "dialog" : "true"}
        onClick={() => setOpen((v) => !v)}
        className={buttonClassName ?? DEFAULT_BUTTON_CLASS}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full border-2 border-white bg-red-500" />
        )}
      </button>

      {/* 데스크톱: 드롭다운 */}
      {!isSheet && open && (
        <div className="absolute top-14 right-0 z-50 w-80 rounded-2xl border border-brand-100 bg-white p-2 shadow-premium">
          {panel}
        </div>
      )}

      {/* 모바일: 바텀 시트 */}
      {isSheet && (
        <BottomSheet open={open} onClose={close} ariaLabel="알림">
          {panel}
        </BottomSheet>
      )}
    </div>
  );
}

interface NotificationPanelProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAllRead: () => void;
  onItemClick: (n: Notification) => void;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  large?: boolean;
}

function NotificationPanel({
  notifications,
  unreadCount,
  onMarkAllRead,
  onItemClick,
  onMarkRead,
  onDelete,
  large = false,
}: NotificationPanelProps) {
  return (
    <>
      <div
        className={`flex items-center justify-between ${large ? "pb-3" : "px-3 py-2"}`}
      >
        <span
          className={`font-bold text-brand-900 ${large ? "text-lg" : "text-sm"}`}
        >
          알림
        </span>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
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
        <div
          className={`space-y-1.5 ${large ? "" : "max-h-80 overflow-y-auto p-1"}`}
        >
          {notifications.map((n) => {
            const href = getNotificationHref(n);
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
            const itemClass = `flex flex-1 cursor-pointer flex-col gap-1 px-3 text-left ${large ? "py-3" : "py-2.5"}`;

            return (
              <div
                key={n.id}
                className={`group relative flex items-start rounded-xl transition-colors hover:bg-brand-50 active:bg-brand-50 ${
                  n.is_read ? "" : "bg-brand-50/60"
                }`}
              >
                {href ? (
                  <Link
                    href={href}
                    onClick={() => onItemClick(n)}
                    className={itemClass}
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => !n.is_read && onMarkRead(n.id)}
                    className={itemClass}
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
                    onDelete(n.id);
                  }}
                  className={`mt-2 mr-2 flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-brand-300 transition-opacity hover:bg-brand-100 hover:text-brand-600 ${
                    large ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
