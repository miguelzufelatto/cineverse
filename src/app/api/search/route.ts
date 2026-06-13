import { NextResponse } from 'next/server'
import type { SearchResponse, MovieResult, BookResult } from '@/lib/types'

const TMDB_BASE = 'https://api.themoviedb.org/3'
const BOOKS_BASE = 'https://www.googleapis.com/books/v1/volumes'

const LANG_MAP: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  'pt-BR': 'pt-BR',
}

const BOOKS_LANG_MAP: Record<string, string> = {
  en: 'en',
  es: 'es',
  'pt-BR': 'pt',
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const lang = searchParams.get('lang') ?? 'en'
  const tmdbLang = LANG_MAP[lang] ?? 'en-US'
  const booksLang = BOOKS_LANG_MAP[lang] ?? 'en'

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ movies: [], books: [] } satisfies SearchResponse)
  }

  const tmdbKey = process.env.TMDB_API_KEY

  try {
    const [moviesRes, booksRes] = await Promise.allSettled([
      tmdbKey
        ? fetch(
            `${TMDB_BASE}/search/movie?query=${encodeURIComponent(query)}&language=${tmdbLang}&page=1&include_adult=false`,
            { headers: { Authorization: `Bearer ${tmdbKey}` }, next: { revalidate: 60 } }
          ).then((r) => r.json() as Promise<{ results: MovieResult[] }>)
        : Promise.resolve({ results: [] }),
      fetch(
        `${BOOKS_BASE}?q=${encodeURIComponent(query)}&maxResults=12&langRestrict=${booksLang}`,
        { next: { revalidate: 60 } }
      ).then((r) => r.json() as Promise<{ items?: { id: string; volumeInfo: Record<string, unknown> }[] }>),
    ])

    const movies =
      moviesRes.status === 'fulfilled'
        ? moviesRes.value.results.slice(0, 8).map((m) => ({
            ...m,
            poster_path: m.poster_path
              ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
              : null,
            backdrop_path: m.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}`
              : null,
          }))
        : []

    const books =
      booksRes.status === 'fulfilled' && booksRes.value.items
        ? booksRes.value.items.slice(0, 8).map((b) => {
            const v = b.volumeInfo
            return {
              id: b.id,
              title: (v.title as string) ?? 'Untitled',
              authors: (v.authors as string[]) ?? [],
              description: (v.description as string) ?? '',
              thumbnail: (v.imageLinks as { thumbnail?: string })?.thumbnail?.replace(
                'http://',
                'https://'
              ) ?? null,
              publishedDate: (v.publishedDate as string) ?? '',
              pageCount: (v.pageCount as number) ?? 0,
              categories: (v.categories as string[]) ?? [],
            } satisfies BookResult
          })
        : []

    return NextResponse.json({ movies, books } satisfies SearchResponse)
  } catch {
    return NextResponse.json({ movies: [], books: [] } satisfies SearchResponse)
  }
}
