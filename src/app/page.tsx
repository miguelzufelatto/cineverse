'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { BookOpenText } from '@phosphor-icons/react'
import Header from '@/components/Header'
import SearchForm from '@/components/SearchForm'
import SearchResults from '@/components/SearchResults'
import type { SearchResponse } from '@/lib/types'

export default function Home() {
  const hero = useTranslations('hero')
  const footer = useTranslations('footer')
  const [results, setResults] = useState<SearchResponse | null>(null)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'movies' | 'books'>('all')

  const handleResults = useCallback((data: SearchResponse | null) => {
    setResults(data)
  }, [])

  const handleLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  const handleQuery = useCallback((q: string) => {
    setQuery(q)
  }, [])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-zinc-50 font-sans antialiased">
      <Header filter={filter} onFilterChange={setFilter} />

      <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 py-16">
        <div className="mx-auto mb-12 w-full max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
            <BookOpenText size={24} weight="fill" className="text-emerald-500" />
          </div>
          <h1 className="text-3xl leading-tight tracking-tighter text-zinc-900 sm:text-4xl md:text-5xl">
            {hero('title1')}
            <br />
            <span className="text-emerald-600">{hero('title2')}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[50ch] text-sm leading-relaxed text-zinc-500">
            {hero('subtitle')}
          </p>
        </div>

        <SearchForm
          onResults={handleResults}
          onLoading={handleLoading}
          onQuery={handleQuery}
        />

        <SearchResults data={results} query={query} isLoading={isLoading} filter={filter} />
      </main>

      <footer className="border-t border-zinc-200/50 py-6 text-center text-xs text-zinc-400">
        {footer('text')}
      </footer>
    </div>
  )
}
