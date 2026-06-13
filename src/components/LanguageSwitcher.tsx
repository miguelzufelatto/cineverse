'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Translate } from '@phosphor-icons/react'

const langs = ['en', 'es', 'pt-BR'] as const

export default function LanguageSwitcher() {
  const locale = useLocale()
  const t = useTranslations('lang')
  const [open, setOpen] = useState(false)

  function switchLang(l: string) {
    document.cookie = `locale=${l}; path=/; max-age=31536000`
    window.location.reload()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-zinc-500 transition-all duration-200 hover:bg-zinc-200/60 hover:text-zinc-800 active:scale-[0.96]"
      >
        <Translate size={14} />
        <span className="font-medium uppercase">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 overflow-hidden rounded-xl border border-zinc-200/60 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => switchLang(l)}
              className={`flex w-full cursor-pointer items-center gap-2 px-3.5 py-2.5 text-left text-xs transition-colors duration-150 ${
                locale === l
                  ? 'bg-emerald-50 font-medium text-emerald-700'
                  : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {t(l)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
