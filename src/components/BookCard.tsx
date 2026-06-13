'use client'

import { motion } from 'framer-motion'
import { BookOpenText, User, FileText } from '@phosphor-icons/react'
import type { BookResult } from '@/lib/types'

export default function BookCard({
  book,
  index,
}: {
  book: BookResult
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex gap-4 rounded-2xl border border-zinc-200/60 bg-white p-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.12)]"
    >
      <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100">
            <BookOpenText size={24} className="text-zinc-300" />
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-900">
          {book.title}
        </h3>
        {book.authors.length > 0 && (
          <span className="flex items-center gap-1 text-xs text-emerald-600">
            <User size={11} weight="fill" />
            {book.authors[0]}
          </span>
        )}
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          {book.publishedDate && (
            <span>{book.publishedDate.slice(0, 4)}</span>
          )}
          {book.pageCount > 0 && (
            <span className="flex items-center gap-1">
              <FileText size={11} />
              {book.pageCount} pp
            </span>
          )}
        </div>
        {book.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500">
            {book.description.replace(/<[^>]*>/g, '').slice(0, 160)}
          </p>
        )}
      </div>
    </motion.div>
  )
}
