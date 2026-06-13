const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_IMG = 'https://image.tmdb.org/t/p'

function getHeaders() {
  return { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
}

interface TMDBMovie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface TmdbSearchResult {
  id: number
  title: string
  overview: string
  posterUrl: string | null
  backdropUrl: string | null
  releaseDate: string
  voteAverage: number
  genreIds: number[]
}

export async function searchMovies(query: string, language = 'pt-BR'): Promise<TmdbSearchResult[]> {
  const url = `${TMDB_BASE}/search/movie?query=${encodeURIComponent(query)}&language=${language}&page=1&include_adult=false`
  const res = await fetch(url, { headers: getHeaders(), next: { revalidate: 60 } })

  if (!res.ok) {
    throw new Error(`TMDB search failed: ${res.status}`)
  }

  const data = (await res.json()) as { results: TMDBMovie[] }

  return data.results.slice(0, 12).map((m) => ({
    id: m.id,
    title: m.title,
    overview: m.overview,
    posterUrl: m.poster_path ? `${TMDB_IMG}/w500${m.poster_path}` : null,
    backdropUrl: m.backdrop_path ? `${TMDB_IMG}/w1280${m.backdrop_path}` : null,
    releaseDate: m.release_date,
    voteAverage: m.vote_average,
    genreIds: m.genre_ids,
  }))
}

interface Provider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

interface FlatrateProvider extends Provider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface WatchProviders {
  link: string
  flatrate: FlatrateProvider[]
  rent: Provider[]
  buy: Provider[]
}

export async function getMovieProviders(movieId: number): Promise<WatchProviders | null> {
  const url = `${TMDB_BASE}/movie/${movieId}/watch/providers`
  const res = await fetch(url, { headers: getHeaders(), next: { revalidate: 3600 } })

  if (!res.ok) {
    throw new Error(`TMDB providers failed: ${res.status}`)
  }

  const data = (await res.json()) as { results?: Record<string, WatchProviders> }
  const br = data.results?.BR

  if (!br) return null

  return {
    link: br.link,
    flatrate: br.flatrate ?? [],
    rent: br.rent ?? [],
    buy: br.buy ?? [],
  }
}
