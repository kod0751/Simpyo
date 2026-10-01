"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { StayCard } from "@/entities/accommodation/ui/StayCard";
import type { Stay } from "@/entities/accommodation/model/types";
import type { WishlistItem } from "@/entities/wishlist/model/types";
import { useToggleWishlist } from "@/features/wishlist/model/useToggleWishlist";

interface WishlistGridProps {
  items: WishlistItem[];
  userId: string;
}

export function WishlistGrid({ items, userId }: WishlistGridProps) {
  const { mutate } = useToggleWishlist();
  const [removedIds, setRemovedIds] = useState<Set<string>>(() => new Set());

  const visibleItems = items.filter((item) => !removedIds.has(item.listing_id));

  function handleToggleLike(stay: Stay) {
    setRemovedIds((prev) => new Set(prev).add(stay.id));

    mutate(
      { userId, listingId: stay.id, liked: false },
      {
        onError: () => {
          setRemovedIds((prev) => {
            const next = new Set(prev);
            next.delete(stay.id);
            return next;
          });
        },
      },
    );
  }

  if (visibleItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <Heart size={32} className="text-brand-300" />
        <p className="text-sm font-semibold text-brand-700">
          저장한 숙소가 없어요
        </p>
        <p className="mb-2 text-xs text-brand-400">
          마음에 드는 숙소를 찜해두고 나중에 다시 확인하세요.
        </p>
        <Link
          href="/listings"
          className="rounded-lg bg-brand-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-800"
        >
          숙소 둘러보기
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {visibleItems.map((item) => (
        <StayCard
          key={item.id}
          stay={item.listing}
          liked
          onToggleLike={handleToggleLike}
        />
      ))}
    </div>
  );
}
