"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { UserDropdown } from "./Userdropdown";
import { useAuthModal } from "@/features/auth/model/useAuthModal";
import type { User } from "@supabase/supabase-js";

type HeaderProps = {
  user: User | null;
};

export function Header({ user }: HeaderProps) {
  const open = useAuthModal((state) => state.open);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold tracking-tight text-primary">
            Simpyo
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            숙소 둘러보기
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            체험
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            호스트 되기
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Bell />
              <UserDropdown user={user} />
            </>
          ) : (
            <Button onClick={open} className="rounded-full">
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
