import { useEffect, useState } from 'react';
import { useT } from '@/lib/i18n';
import { RoundTip, SettingRow, roundBtnCls } from './RoundButton';
import { cn } from '@/lib/cn';

type Theme = 'light' | 'dark';

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/**
 * Light / dark button: one click flips it. It shows the current theme (sun or moon) and turns over. The first paint is set by an inline script in index.html (no flash).
 */
export function ThemeToggle({ variant = 'compact', className }: { variant?: 'compact' | 'row'; className?: string }) {
  const t = useT();
  // 'dark' matches the prerendered HTML; synced to the real value after mount.
  const [theme, setTheme] = useState<Theme>('dark');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    // Animate only after the first sync so a returning light-mode visitor doesn't see a slide on load.
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const flip = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    root.classList.add('theme-switching');
    root.dataset.theme = next;
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', next === 'light' ? '#fff7ec' : '#0a1122');
    try {
      localStorage.setItem('hb-theme', next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    setTheme(next);
    window.setTimeout(() => root.classList.remove('theme-switching'), 350);
  };

  const dark = theme === 'dark';
  const label = dark
    ? t({ de: 'Zum hellen Design wechseln', en: 'Switch to light theme' })
    : t({ de: 'Zum dunklen Design wechseln', en: 'Switch to dark theme' });

  const control = (
    <button type="button" onClick={flip} aria-label={label} title={label} className={cn(roundBtnCls, className)}>
      <span key={theme} className={ready ? 'animate-flip grid place-items-center' : 'grid place-items-center'}>
        {dark ? <MoonIcon /> : <SunIcon />}
      </span>
      <RoundTip>{dark ? t({ de: 'Hell', en: 'Light' }) : t({ de: 'Dunkel', en: 'Dark' })}</RoundTip>
    </button>
  );
  if (variant === 'row') {
    return (
      <SettingRow
        caption={dark ? t({ de: 'Dunkles Design', en: 'Dark theme' }) : t({ de: 'Helles Design', en: 'Light theme' })}
        hint={dark ? t({ de: 'Tippen für Hell', en: 'Tap for light' }) : t({ de: 'Tippen für Dunkel', en: 'Tap for dark' })}
      >
        {control}
      </SettingRow>
    );
  }
  return control;
}