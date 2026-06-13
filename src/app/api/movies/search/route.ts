import { NextResponse } from 'next/server'
import { searchMovies } from '@/services/tmdb'

const LANG_MAP: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  'pt-BR': 'pt-BR',
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const lang = searchParams.get('lang') ?? 'pt-BR'
  const tmdbLang = LANG_MAP[lang] ?? 'pt-BR'

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] })
  }

  try {
    const results = await searchMovies(query, tmdbLang)
    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 })
  }
}
