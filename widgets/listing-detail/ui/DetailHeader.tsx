import type { Stay } from '@/entities/accommodation/model/types'
import { Star, MapPin } from 'lucide-react'

interface DetailHeaderProps {
  listing: Stay
}

export function DetailHeader({ listing }: DetailHeaderProps) {
  return (
    <header className="mb-8">
      {listing.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h1 className="mb-4 text-3xl leading-snug font-bold tracking-tight text-brand-950 break-keep md:text-5xl">
        {listing.name}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-brand-600">
        <div className="flex items-center gap-1">
          <Star size={16} className="fill-brand-900 text-brand-900" />
          <span className="font-display font-bold text-brand-900">{listing.rating.toFixed(2)}</span>
          <span>(후기 {listing.reviews}개)</span>
        </div>
        <span>·</span>
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-brand-400" />
          <span>{listing.region} {listing.address}</span>
        </div>
      </div>
    </header>
  )
}