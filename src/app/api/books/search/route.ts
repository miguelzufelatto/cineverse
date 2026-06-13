import { NextResponse } from 'next/server'
import { searchBooks } from '@/services/googleBooks'

const LANG_MAP: Record<string, string> = {
  en: 'en',
  es: 'es',
  'pt-BR': 'pt',
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const lang = searchParams.get('lang') ?? 'pt-BR'
  const booksLang = LANG_MAP[lang] ?? 'pt'

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] })
  }

  try {
    const results = await searchBooks(query, booksLang)
    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 })
  }
}
