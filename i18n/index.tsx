import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en, { Dict } from './en';
import it from './it';
import de from './de';
import fr from './fr';

export type Lang = 'en' | 'it' | 'de' | 'fr';

export const LANGUAGES: { code: Lang; label: string; locale: string }[] = [
  { code: 'en', label: 'English', locale: 'en-GB' },
  { code: 'it', label: 'Italiano', locale: 'it-IT' },
  { code: 'de', label: 'Deutsch', locale: 'de-DE' },
  { code: 'fr', label: 'Français', locale: 'fr-FR' },
];

const DICTS: Record<Lang, Dict> = { en, it, de, fr };
const STORAGE_KEY = 'chritalia-lang';

/** A ?lang= link first, then the saved choice, then the browser's preferred languages, then English. */
function detectLanguage(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')?.toLowerCase();
  if (fromUrl && fromUrl in DICTS) return fromUrl as Lang;
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && saved in DICTS) return saved;
  } catch {
    /* storage unavailable */
  }
  for (const pref of navigator.languages ?? [navigator.language]) {
    const code = pref.slice(0, 2).toLowerCase() as Lang;
    if (code in DICTS) return code;
  }
  return 'en';
}

interface I18nValue {
  lang: Lang;
  locale: string;
  t: Dict;
  setLang: (lang: Lang) => void;
  /** True for a moment while the page cross-fades to the new language. */
  switching: boolean;
}

const I18nContext = createContext<I18nValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(detectLanguage);
  const [switching, setSwitching] = useState(false);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable */
      }
      setSwitching(true);
      window.setTimeout(() => {
        setLangState(next);
        setSwitching(false);
      }, 180);
    },
    [lang]
  );

  const t = DICTS[lang];
  const locale = LANGUAGES.find((l) => l.code === lang)!.locale;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, locale, t, setLang, switching }), [lang, locale, t, setLang, switching]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>');
  return ctx;
}
