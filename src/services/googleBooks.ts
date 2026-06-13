const BOOKS_BASE = 'https://www.googleapis.com/books/v1/volumes'

interface VolumeInfo {
  title?: string
  authors?: string[]
  description?: string
  imageLinks?: { thumbnail?: string }
  publishedDate?: string
  pageCount?: number
  categories?: string[]
}

interface BookItem {
  id: string
  volumeInfo: VolumeInfo
}

export interface BookSearchResult {
  id: string
  title: string
  authors: string[]
  description: string
  thumbnail: string | null
  publishedDate: string
  pageCount: number
  categories: string[]
}

export async function searchBooks(query: string, langRestrict = 'pt'): Promise<BookSearchResult[]> {
  const url = `${BOOKS_BASE}?q=${encodeURIComponent(query)}&maxResults=12&langRestrict=${langRestrict}`
  const res = await fetch(url, { next: { revalidate: 60 } })

  if (!res.ok) {
    throw new Error(`Google Books search failed: ${res.status}`)
  }

  const data = (await res.json()) as { items?: BookItem[] }

  if (!data.items) return []

  return data.items.slice(0, 12).map((b) => {
    const v = b.volumeInfo
    return {
      id: b.id,
      title: v.title ?? 'Untitled',
      authors: v.authors ?? [],
      description: v.description ?? '',
      thumbnail: v.imageLinks?.thumbnail?.replace('http://', 'https://') ?? null,
      publishedDate: v.publishedDate ?? '',
      pageCount: v.pageCount ?? 0,
      categories: v.categories ?? [],
    }
  })
}
