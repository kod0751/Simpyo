"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  CalendarDays,
  Heart,
  CalendarCheck,
  PlusCircle,
  LogOut,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type UserDropdownProps = {
  user: User;
};

const MENU_GROUPS = [
  {
    title: "여행",
    items: [
      { label: "예약 내역", href: "/mypage/bookings", icon: CalendarDays },
      { label: "저장한 숙소", href: "/mypage/wishlists", icon: Heart },
    ],
  },
  {
    title: "호스팅",
    items: [
      { label: "예약 관리", href: "/mypage/hosting", icon: CalendarCheck },
      { label: "숙소 등록", href: "/register/type", icon: PlusCircle },
    ],
  },
];

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName =
    user.user_metadata?.name ??
    user.user_metadata?.full_name ??
    user.email?.split("@")[0] ??
    "사용자";

  const avatar = user.user_metadata?.avatar_url ?? user.user_metadata?.picture;

  function close() {
    setIsOpen(false);
    setHoveredHref(null);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogout = async () => {
    close();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const avatarImage = (size: number) =>
    avatar ? (
      <Image
        src={avatar}
        alt={displayName}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    ) : (
      <div
        className="flex items-center justify-center rounded-full bg-brand-100 font-bold text-brand-500"
        style={{ width: size, height: size }}
      >
        {displayName.charAt(0)}
      </div>
    );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 트리거 */}
      <button
        type="button"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`flex cursor-pointer items-center gap-2 rounded-full border py-1 pr-3 pl-1 transition-all ${
          isOpen
            ? "border-brand-300 bg-brand-50"
            : "border-brand-200 bg-white hover:border-brand-300 hover:shadow-sm"
        }`}
      >
        {avatarImage(32)}
        <span className="hidden max-w-24 truncate text-sm font-semibold text-brand-900 md:block">
          {displayName}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="h-4 w-4 text-brand-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top right" }}
            className="premium-card-outer absolute top-full right-0 z-50 mt-3 w-72 shadow-xl shadow-brand-900/5"
          >
            <div className="premium-card-inner p-2">
              {/* 프로필 */}
              <Link
                href="/mypage"
                onClick={close}
                onMouseEnter={() => setHoveredHref(null)}
                className="group flex items-center gap-3 rounded-xl bg-brand-50/70 p-3 transition-colors hover:bg-brand-100/70"
              >
                {avatarImage(44)}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-brand-900">
                    {displayName}
                  </p>
                  <p className="truncate text-xs text-brand-400">
                    {user.email}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-brand-300 transition-transform group-hover:translate-x-0.5" />
              </Link>

              {/* 메뉴 그룹 */}
              <div onMouseLeave={() => setHoveredHref(null)}>
                {MENU_GROUPS.map((group) => (
                  <div key={group.title} className="mt-3">
                    <p className="mb-1 px-3 text-[10px] font-bold tracking-widest text-brand-400 uppercase">
                      {group.title}
                    </p>

                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isHovered = hoveredHref === item.href;

                      return (
                        <div key={item.href} className="relative">
                          {isHovered && (
                            <motion.div
                              layoutId="dropdown-hover"
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 35,
                              }}
                              className="absolute inset-0 rounded-xl bg-brand-50"
                            />
                          )}

                          <Link
                            href={item.href}
                            role="menuitem"
                            onClick={close}
                            onMouseEnter={() => setHoveredHref(item.href)}
                            className="relative flex items-center gap-3 rounded-xl px-2 py-2"
                          >
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                                isHovered
                                  ? "bg-white text-brand-900 shadow-sm"
                                  : "bg-brand-100 text-brand-600"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="flex-1 text-sm font-medium text-brand-800">
                              {item.label}
                            </span>
                            <ChevronRight
                              className={`h-4 w-4 transition-all ${
                                isHovered
                                  ? "translate-x-0 text-brand-400 opacity-100"
                                  : "-translate-x-1 opacity-0"
                              }`}
                            />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* 로그아웃 */}
              <div className="mt-2 border-t border-brand-100 pt-2">
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  onMouseEnter={() => setHoveredHref(null)}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-brand-500 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  로그아웃
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
