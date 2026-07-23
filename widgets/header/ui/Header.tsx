"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, House, Menu, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { UserDropdown } from "./Userdropdown";
import { useAuthModal } from "@/features/auth/model/useAuthModal";
import type { User } from "@supabase/supabase-js";

type HeaderProps = {
  user: User | null;
};

const navLinks = [
  { label: "숙소 둘러보기", href: "/" },
  { label: "체험", href: "/" },
  { label: "호스트 되기", href: "/" },
];

export function Header({ user }: HeaderProps) {
  const open = useAuthModal((state) => state.open);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105">
              <House size={22} />
            </div>
            <span className="font-sans text-2xl font-bold tracking-tight text-primary">
              쉼터
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group/link relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover/link:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden items-center gap-3 sm:flex">
                <Bell className="text-muted-foreground" />
                <UserDropdown user={user} />
              </div>
            ) : (
              <div className="hidden sm:block">
                <Button
                  onClick={open}
                  className="rounded-full px-6 py-2.5 text-sm font-medium shadow-none transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  로그인
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted md:hidden"
              aria-label="메뉴 열기"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="flex flex-col gap-1 border-t border-border py-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-3 px-2 pt-2">
              {user ? (
                <>
                  <Bell className="text-muted-foreground" />
                  <UserDropdown user={user} />
                </>
              ) : (
                <Button onClick={open} className="w-full rounded-full">
                  로그인
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
