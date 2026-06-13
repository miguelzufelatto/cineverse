export interface MovieResult {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface BookResult {
  id: string
  title: string
  authors: string[]
  description: string
  thumbnail: string | null
  publishedDate: string
  pageCount: number
  categories: string[]
}

export interface SearchResponse {
  movies: MovieResult[]
  books: BookResult[]
}
