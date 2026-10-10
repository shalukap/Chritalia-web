import React, { useEffect, useRef, useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LANGUAGES, useI18n } from '../i18n';

// Compact glass dropdown for the navigation bar.
export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        className="flex items-center gap-1.5 h-10 pl-3 pr-2.5 rounded-full text-sm font-semibold text-navy hover:bg-navy/5 transition-colors"
      >
        <Globe className="w-4 h-4 text-accent-deep" />
        <span className="uppercase">{lang}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <ul
        role="listbox"
        aria-label={t.nav.language}
        className={`absolute right-0 top-full mt-3 w-48 glass-strong rounded-2xl p-1.5 origin-top-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        }`}
      >
        {LANGUAGES.map((l) => (
          <li key={l.code} role="option" aria-selected={l.code === lang}>
            <button
              type="button"
              lang={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                l.code === lang ? 'bg-navy text-white' : 'text-navy hover:bg-navy/5'
              }`}
            >
              <span className={`w-7 text-xs font-bold uppercase ${l.code === lang ? 'text-accent' : 'text-accent-deep'}`}>{l.code}</span>
              <span className="flex-1 text-left font-medium">{l.label}</span>
              {l.code === lang && <Check className="w-4 h-4 text-accent" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Row of pills used inside the mobile menu.
export const LanguagePills: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="radiogroup" aria-label={t.nav.language} className={`flex gap-2 ${className}`}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          role="radio"
          aria-checked={l.code === lang}
          lang={l.code}
          title={l.label}
          onClick={() => setLang(l.code)}
          className={`flex-1 py-3 rounded-full text-sm font-bold uppercase transition-colors ${
            l.code === lang ? 'bg-accent text-navy' : 'glass-dark text-white hover:bg-white/10'
          }`}
        >
          {l.code}
        </button>
      ))}
    </div>
  );
};
