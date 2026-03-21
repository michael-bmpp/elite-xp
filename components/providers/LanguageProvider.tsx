'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Lang = 'de' | 'en'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (de: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'de',
  setLang: () => {},
  t: (de) => de,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('de')

  const t = useCallback(
    (de: string, en: string) => (lang === 'de' ? de : en),
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
