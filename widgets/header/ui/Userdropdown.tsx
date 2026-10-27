"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
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
  variant?: "dropdown" | "sheet";
  onNavigate?: () => void;
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

const EASE = [0.16, 1, 0.3, 1] as const;

// 서버에선 false, 브라우저에선 true
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function UserDropdown({
  user,
  variant = "dropdown",
  onNavigate,
}: UserDropdownProps) {
  const router = useRouter();
  const supabase = createClient();
  const isClient = useIsClient();

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isSheet = variant === "sheet";

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

  function handleNavigate() {
    close();
    onNavigate?.();
  }

  async function handleLogout() {
    handleNavigate();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  // 드롭다운: 바깥 클릭 시 닫기
  useEffect(() => {
    if (!isOpen || isSheet) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isSheet]);

  // 시트: 열려 있는 동안 배경 스크롤 막기 + ESC로 닫기
  useEffect(() => {
    if (!isOpen || !isSheet) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isSheet]);

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

  const menuBody = (
    <MenuBody
      displayName={displayName}
      email={user.email}
      avatar={avatarImage(44)}
      hoveredHref={isSheet ? null : hoveredHref}
      onHover={isSheet ? undefined : setHoveredHref}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      large={isSheet}
    />
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        aria-expanded={isOpen}
        aria-haspopup={isSheet ? "dialog" : "menu"}
        className={`flex cursor-pointer items-center gap-2 rounded-full border py-1 pr-3 pl-1 transition-all ${
          isOpen
            ? "border-brand-300 bg-brand-50"
            : "border-brand-200 bg-white hover:border-brand-300 hover:shadow-sm"
        }`}
      >
        {avatarImage(32)}
        <span className="max-w-24 truncate text-sm font-semibold text-brand-900 md:block">
          {displayName}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="h-4 w-4 text-brand-400" />
        </motion.div>
      </button>

      {/* 데스크톱: 드롭다운 */}
      {!isSheet && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: EASE }}
              style={{ transformOrigin: "top right" }}
              className="premium-card-outer absolute top-full right-0 z-50 mt-3 w-72 shadow-xl shadow-brand-900/5"
            >
              <div className="premium-card-inner p-2">{menuBody}</div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* 모바일: 바텀 시트 */}
      {isSheet &&
        isClient &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={close}
                  className="fixed inset-0 z-60 bg-brand-950/40 backdrop-blur-sm"
                />
                <motion.div
                  key="sheet"
                  role="dialog"
                  aria-modal="true"
                  aria-label="계정 메뉴"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 32, stiffness: 320 }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={{ top: 0, bottom: 0.5 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.y > 100 || info.velocity.y > 500) close();
                  }}
                  className="fixed inset-x-0 bottom-0 z-61 rounded-t-3xl bg-white px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl"
                >
                  <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-brand-200" />
                  {menuBody}
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

type MenuBodyProps = {
  displayName: string;
  email?: string;
  avatar: React.ReactNode;
  hoveredHref: string | null;
  onHover?: (href: string | null) => void;
  onNavigate: () => void;
  onLogout: () => void;
  large?: boolean;
};

function MenuBody({
  displayName,
  email,
  avatar,
  hoveredHref,
  onHover,
  onNavigate,
  onLogout,
  large = false,
}: MenuBodyProps) {
  const itemPadding = large ? "py-3" : "py-2";

  return (
    <>
      <Link
        href="/mypage"
        onClick={onNavigate}
        onMouseEnter={() => onHover?.(null)}
        className="group flex items-center gap-3 rounded-xl bg-brand-50/70 p-3 transition-colors hover:bg-brand-100/70 active:bg-brand-100"
      >
        {avatar}
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-brand-900">{displayName}</p>
          <p className="truncate text-xs text-brand-400">{email}</p>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-brand-300 transition-transform group-hover:translate-x-0.5" />
      </Link>

      <div onMouseLeave={() => onHover?.(null)}>
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
                    onClick={onNavigate}
                    onMouseEnter={() => onHover?.(item.href)}
                    className={`relative flex items-center gap-3 rounded-xl px-2 ${itemPadding} active:bg-brand-50`}
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
                        isHovered || large
                          ? "translate-x-0 text-brand-300 opacity-100"
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

      <div className="mt-2 border-t border-brand-100 pt-2">
        <button
          type="button"
          role="menuitem"
          onClick={onLogout}
          onMouseEnter={() => onHover?.(null)}
          className={`flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 ${itemPadding} text-sm font-medium text-brand-500 transition-colors hover:bg-red-50 hover:text-red-600 active:bg-red-50`}
        >
          <LogOut className="h-4 w-4" />
          로그아웃
        </button>
      </div>
    </>
  );
}
