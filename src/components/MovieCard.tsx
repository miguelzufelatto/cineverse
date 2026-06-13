'use client'

import { motion } from 'framer-motion'
import { Star, CalendarBlank, FilmStrip } from '@phosphor-icons/react'
import type { MovieResult } from '@/lib/types'

function ratingColor(vote: number): string {
  if (vote >= 7) return 'text-emerald-500'
  if (vote >= 5) return 'text-amber-500'
  return 'text-zinc-400'
}

export default function MovieCard({
  movie,
  index,
}: {
  movie: MovieResult
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.12)]"
    >
      <div className="aspect-[2/3] overflow-hidden bg-zinc-100">
        {movie.poster_path ? (
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100">
            <FilmStrip size={32} className="text-zinc-300" />
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold leading-snug text-zinc-900">
          {movie.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          {movie.release_date && (
            <span className="flex items-center gap-1">
              <CalendarBlank size={12} />
              {movie.release_date.slice(0, 4)}
            </span>
          )}
          <span className={`flex items-center gap-1 font-medium ${ratingColor(movie.vote_average)}`}>
            <Star size={12} weight="fill" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
        {movie.overview && (
          <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500">
            {movie.overview}
          </p>
        )}
      </div>
    </motion.div>
  )
}
