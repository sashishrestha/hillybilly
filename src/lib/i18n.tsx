import { createContext, useContext, type ReactNode } from 'react';

export type Lang = 'de' | 'en';
export const LANGS: Lang[] = ['de', 'en'];
export const DEFAULT_LANG: Lang = 'de';

/** A value in both site languages. The type makes a missing translation a build error. */
export type L<T = string> = { de: T; en: T };

const LangContext = createContext<Lang>(DEFAULT_LANG);

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** `const t = useT(); t({ de: 'Hallo', en: 'Hello' })` */
export function useT() {
  const lang = useLang();
  return <T,>(value: L<T>) => value[lang];
}
