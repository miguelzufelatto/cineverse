'use client'

import { useState, useCallback } from 'react'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'
import { MagnifyingGlass, Spinner } from '@phosphor-icons/react'
import type { SearchResponse } from '@/lib/types'

interface SearchFormProps {
  onResults: (data: SearchResponse | null) => void
  onLoading: (loading: boolean) => void
  onQuery: (query: string) => void
}

export default function SearchForm({ onResults, onLoading, onQuery }: SearchFormProps) {
  const t = useTranslations('search')
  const locale = useLocale()
  const [input, setInput] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = useCallback(
    async (q: string) => {
      const trimmed = q.trim()
      if (!trimmed) return

      setIsSearching(true)
      onLoading(true)
      onQuery(trimmed)

      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}&lang=${locale}`)
        if (!res.ok) throw new Error('Search failed')
        const data: SearchResponse = await res.json()
        onResults(data)
      } catch {
        onResults(null)
      } finally {
        setIsSearching(false)
        onLoading(false)
      }
    },
    [onResults, onLoading, onQuery, locale]
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSearch(input)
      }}
      className="relative mx-auto w-full max-w-2xl"
    >
      <div className="relative flex items-center">
        <MagnifyingGlass
          size={18}
          className="pointer-events-none absolute left-4 text-zinc-400"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('placeholder')}
          className="h-13 w-full rounded-2xl border border-zinc-200/70 bg-white pl-11 pr-13 text-sm text-zinc-900 placeholder-zinc-400 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] outline-none transition-all duration-300 focus:border-emerald-400/50 focus:shadow-[0_4px_24px_-8px_rgba(5,150,105,0.15)]"
        />
        <button
          type="submit"
          disabled={isSearching || !input.trim()}
          className="absolute right-1.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-emerald-600 text-white transition-all duration-200 hover:bg-emerald-700 active:scale-[0.95] disabled:opacity-40 disabled:active:scale-100"
        >
          {isSearching ? (
            <Spinner size={16} className="animate-spin" />
          ) : (
            <MagnifyingGlass size={16} weight="bold" />
          )}
        </button>
      </div>
    </form>
  )
}
