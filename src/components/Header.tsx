'use client'

import { FilmStrip, BookOpenText } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

interface HeaderProps {
  filter: 'all' | 'movies' | 'books'
  onFilterChange: (filter: 'all' | 'movies' | 'books') => void
}

export default function Header({ filter, onFilterChange }: HeaderProps) {
  const t = useTranslations('header')

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/50 bg-zinc-50/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
            <FilmStrip size={18} weight="bold" className="text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-zinc-900">
            Cine<em className="not-italic text-emerald-600">Verse</em>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => onFilterChange('all')}
              className={`cursor-pointer rounded-lg px-3 py-1.5 transition-all duration-200 active:scale-[0.96] ${
                filter === 'all'
                  ? 'bg-zinc-900 text-zinc-50'
                  : 'text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-800'
              }`}
            >
              {t('all')}
            </button>
            <button
              onClick={() => onFilterChange('movies')}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all duration-200 active:scale-[0.96] ${
                filter === 'movies'
                  ? 'bg-zinc-900 text-zinc-50'
                  : 'text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-800'
              }`}
            >
              <FilmStrip size={14} />
              {t('movies')}
            </button>
            <button
              onClick={() => onFilterChange('books')}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all duration-200 active:scale-[0.96] ${
                filter === 'books'
                  ? 'bg-zinc-900 text-zinc-50'
                  : 'text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-800'
              }`}
            >
              <BookOpenText size={14} />
              {t('books')}
            </button>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
