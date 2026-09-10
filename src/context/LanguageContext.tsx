import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'

export type Lang = 'ar' | 'fr'

type LanguageContextValue = {
  lang: Lang
  isRtl: boolean
  setLang: (lang: Lang) => void
  toggle: () => void
  t: <T extends { ar: string; fr: string }>(pair: T) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

/**
 * Bilingual (AR/FR) provider with document `dir` / `lang` sync.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar')

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
  }, [])

  const toggle = useCallback(() => {
    setLangState((prev) => (prev === 'ar' ? 'fr' : 'ar'))
  }, [])

  const t = useCallback(
    <T extends { ar: string; fr: string }>(pair: T) => pair[lang],
    [lang],
  )

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <LanguageContext.Provider
      value={{ lang, isRtl: lang === 'ar', setLang, toggle, t }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
