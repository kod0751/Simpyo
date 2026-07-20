"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  CalendarDays,
  House,
  PlusCircle,
  LogOut,
  User2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

type UserDropdownProps = {
  user: User;
};

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName =
    user.user_metadata?.name ??
    user.user_metadata?.full_name ??
    user.email?.split("@")[0] ??
    "사용자";

  const avatar = user.user_metadata?.avatar_url ?? user.user_metadata?.picture;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/");
    router.refresh();
  };

  const menuItems = [
    {
      label: "마이페이지",
      href: "/mypage",
      icon: User2,
    },
    {
      label: "예약 내역",
      href: "/bookings",
      icon: CalendarDays,
    },
    {
      label: "내 숙소",
      href: "/host",
      icon: House,
    },
    {
      label: "숙소 등록",
      href: "/host/new",
      icon: PlusCircle,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full px-2 py-1 transition-colors hover:bg-accent"
      >
        {avatar ? (
          <Image
            src={avatar}
            alt={displayName}
            width={36}
            height={36}
            className="rounded-full border"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted">
            <User2 className="h-5 w-5 text-muted-foreground" />
          </div>
        )}

        <span className="hidden text-sm font-medium md:block">
          {displayName}
        </span>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.96,
            }}
            transition={{
              duration: 0.15,
            }}
            className="absolute right-0 mt-3 w-56 rounded-xl border bg-background p-2 shadow-xl"
          >
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="relative">
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="dropdown-hover"
                      className="absolute inset-0 rounded-lg bg-accent"
                    />
                  )}

                  <button
                    onClick={() => {
                      router.push(item.href);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className="relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                </div>
              );
            })}

            <div className="my-2 border-t" />

            <button
              onClick={handleLogout}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                "text-red-500 hover:bg-red-50",
              )}
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
