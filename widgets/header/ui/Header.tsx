import Link from "next/link";
import { Globe, Menu, UserCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function Header() {
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

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden gap-2 text-muted-foreground sm:flex"
          >
            <Globe className="size-4" />
            한국어
          </Button>
          <div className="flex items-center gap-2 rounded-full border border-border py-1 pl-3 pr-1 shadow-sm">
            <Menu className="size-4 text-muted-foreground" />
            <UserCircle className="size-7 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
