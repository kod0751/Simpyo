"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import Image from "next/image";
import { Stay } from "../model/types";

export function StayCard({ stay }: { stay: Stay }) {
  const [liked, setLiked] = useState(false);

  function handleLikeClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLiked((v) => !v);
  }

  return (
    <Link href={`/listings/${stay.id}`} className="group flex flex-col">
      <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-premium">
        <Image
          src={stay.images[0] || "/placeholder.svg"}
          alt={stay.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {stay.superhost && (
          <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-900 backdrop-blur-sm">
            슈퍼호스트
          </span>
        )}
        <button
          type="button"
          onClick={handleLikeClick}
          aria-label={liked ? "관심 숙소 해제" : "관심 숙소 추가"}
          aria-pressed={liked}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-brand-900 backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
        >
          <Heart
            size={20}
            className={liked ? "fill-accent-500 text-accent-500" : ""}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-semibold break-keep text-brand-950">
            {stay.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1 text-sm">
            <Star size={14} className="fill-accent-500 text-accent-500" />
            <span className="font-satoshi font-bold text-brand-900">
              {stay.rating}
            </span>
            <span className="font-satoshi text-brand-400">
              ({stay.reviews.toLocaleString()})
            </span>
          </div>
        </div>
        <p className="text-sm text-brand-500">{stay.address}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {stay.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="font-satoshi text-lg font-bold text-brand-950">
            {stay.price_per_night.toLocaleString()}원
          </span>
          <span className="text-sm text-brand-400">/ 박</span>
        </div>
      </div>
    </Link>
  );
}
