import { NextResponse } from 'next/server'
import { getMovieProviders } from '@/services/tmdb'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const movieId = parseInt(id, 10)

  if (isNaN(movieId)) {
    return NextResponse.json({ error: 'Invalid movie ID' }, { status: 400 })
  }

  try {
    const providers = await getMovieProviders(movieId)
    return NextResponse.json({ providers })
  } catch {
    return NextResponse.json({ providers: null }, { status: 500 })
  }
}
