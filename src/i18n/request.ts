import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

const locales = ['en', 'es', 'pt-BR']

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const raw = cookieStore.get('locale')?.value
  const locale = raw && locales.includes(raw) ? raw : 'en'

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
