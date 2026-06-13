'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FilmStrip, BookOpenText } from '@phosphor-icons/react'
import type { SearchResponse } from '@/lib/types'
import MovieCard from './MovieCard'
import BookCard from './BookCard'

interface SearchResultsProps {
  data: SearchResponse | null
  query: string
  isLoading: boolean
  filter: 'all' | 'movies' | 'books'
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
  },
}

export default function SearchResults({ data, query, isLoading, filter }: SearchResultsProps) {
  const t = useTranslations('results')

  if (isLoading) {
    return (
      <div className="mt-16 space-y-10">
        <div className="space-y-4">
          <div className="h-5 w-24 animate-pulse rounded-full bg-zinc-200" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-zinc-200/60 bg-white">
                <div className="aspect-[2/3] animate-pulse bg-zinc-100" />
                <div className="space-y-2 p-4">
                  <div className="h-3 w-3/4 animate-pulse rounded-full bg-zinc-200" />
                  <div className="h-2.5 w-1/2 animate-pulse rounded-full bg-zinc-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-5 w-20 animate-pulse rounded-full bg-zinc-200" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border border-zinc-200/60 bg-white p-4">
                <div className="h-28 w-20 animate-pulse rounded-lg bg-zinc-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 animate-pulse rounded-full bg-zinc-200" />
                  <div className="h-2.5 w-1/3 animate-pulse rounded-full bg-zinc-100" />
                  <div className="h-2 w-full animate-pulse rounded-full bg-zinc-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!data || (!data.movies.length && !data.books.length)) {
    if (query) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-24 flex flex-col items-center gap-4 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100">
            <BookOpenText size={28} className="text-zinc-300" />
          </div>
          <p className="text-sm text-zinc-500">
            {t('empty.title')} <span className="font-medium text-zinc-700">&ldquo;{query}&rdquo;</span>
          </p>
          <p className="text-xs text-zinc-400">{t('empty.hint')}</p>
        </motion.div>
      )
    }
    return null
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={query}
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-16 space-y-12"
      >
        {filter !== 'books' && data.movies.length > 0 && (
          <section>
            <div className="mb-5 flex items-center gap-2">
              <FilmStrip size={16} weight="fill" className="text-emerald-500" />
              <h2 className="text-sm font-semibold tracking-tight text-zinc-800">
                {t('movies')}
              </h2>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500">
                {data.movies.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {data.movies.map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} index={i} />
              ))}
            </div>
          </section>
        )}

        {filter !== 'movies' && data.books.length > 0 && (
          <section>
            <div className="mb-5 flex items-center gap-2">
              <BookOpenText size={16} weight="fill" className="text-emerald-500" />
              <h2 className="text-sm font-semibold tracking-tight text-zinc-800">
                {t('books')}
              </h2>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500">
                {data.books.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {data.books.map((book, i) => (
                <BookCard key={book.id} book={book} index={i} />
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
