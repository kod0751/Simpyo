"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
}

export function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const [hovered, setHovered] = useState(0);

  const displayed = hovered || value;

  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((score) => (
        <button
          key={score}
          type="button"
          onClick={() => onChange(score)}
          onMouseEnter={() => setHovered(score)}
          aria-label={`${score}점`}
          className="cursor-pointer p-1 transition-transform hover:scale-110"
        >
          <Star
            size={28}
            className={
              score <= displayed
                ? "fill-accent-500 text-accent-500"
                : "fill-brand-100 text-brand-200"
            }
          />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm font-semibold text-brand-700">
          {value}점
        </span>
      )}
    </div>
  );
}
