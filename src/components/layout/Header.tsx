import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Drawer } from '@animate-ui/react/primitives/radix-ui/drawer';
import { DialogDescription, DialogTitle } from '@animate-ui/react/primitives/radix-ui/dialog';
import { AnimateIcon } from '@animate-ui/react/icons';
import { ArrowRightIcon, MenuIcon, XIcon, PhoneIcon } from '@/components/animate-ui/icons';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Flag } from './Flags';
import { RoundTip, SettingRow, roundBtnCls } from './RoundButton';
import { site } from '@/content/site';
import { LANGS, useLang, useT, type Lang } from '@/lib/i18n';
import { pathFor, resolvePath, type RouteKey } from '@/lib/routes';
import { cn } from '@/lib/cn';

const NAV: { key: RouteKey; label: { de: string; en: string } }[] = [
  { key: 'concepts', label: { de: 'Foodkonzepte', en: 'Food concepts' } },
  { key: 'catering', label: { de: 'Catering & Events', en: 'Catering & events' } },
  { key: 'locations', label: { de: 'Standorte', en: 'Locations' } },
  { key: 'about', label: { de: 'Über uns', en: 'About us' } },
  { key: 'contact', label: { de: 'Kontakt', en: 'Contact' } },
];

export const requestLabel = { de: 'Catering anfragen', en: 'Request catering' };

const LANG_NAME: Record<Lang, string> = { de: 'Deutsch', en: 'English' };

/**
 * Language button: one click flips to the other language. It shows the flag of the current
 * language, and a hover label names the one you'll get. It stays a real link (crawlable hreflang, works without JS).
 */
function LangSwitch({ variant = 'compact', onChoose }: { variant?: 'compact' | 'row'; onChoose?: () => void }) {
  const lang = useLang();
  const { pathname } = useLocation();
  const current = resolvePath(pathname);
  const target = (l: Lang) => (current ? pathFor(current.key, l, current.params) : pathFor('home', l));
  const other = LANGS.find((l) => l !== lang) ?? lang;
  const label = lang === 'de' ? `Switch to ${LANG_NAME[other]}` : `Zu ${LANG_NAME[other]} wechseln`;

  const control = (
    <Link
      to={target(other)}
      hrefLang={other}
      lang={other}
      title={label}
      aria-label={label}
      onClick={() => onChoose?.()}
      className={roundBtnCls}
    >
      <Flag key={lang} lang={lang} className="animate-flip size-7" />
      <RoundTip>{LANG_NAME[other]}</RoundTip>
    </Link>
  );

  if (variant === 'row') {
    return (
      <SettingRow caption={LANG_NAME[lang]} hint={lang === 'de' ? 'Tippen für English' : 'Tap for Deutsch'}>
        {control}
      </SettingRow>
    );
  }
  return control;
}
export function Header() {
  const lang = useLang();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'theme-dark sticky top-0 z-40 border-b-[3px] border-pink bg-navy/95 text-cream backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-navy/85',
        scrolled && 'shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)]',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-mango focus:px-4 focus:py-2 focus:text-navy"
      >
        {t({ de: 'Zum Inhalt springen', en: 'Skip to content' })}
      </a>
      <div className="container-x flex h-[4.25rem] items-center gap-6 lg:h-20">
        <Link to={pathFor('home', lang)} className="group/logo block shrink-0" aria-label="HillyBilly Foods – Home">
          <Logo priority className="h-[3.25rem] lg:h-16" />
        </Link>

        <nav aria-label={t({ de: 'Hauptnavigation', en: 'Main navigation' })} className="ml-8 hidden xl:block">
          <ul className="flex items-center gap-1 rounded-full bg-cream/5 p-1 ring-1 ring-cream/10">
            {NAV.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={pathFor(item.key, lang)}
                  className={({ isActive }) =>
                    cn(
                      'block whitespace-nowrap rounded-full px-4 py-2 text-[0.95rem] font-bold transition-[background-color,color,box-shadow] duration-200',
                      isActive
                        ? 'bg-mango text-navy shadow-[2px_2px_0_0_rgba(0,0,0,0.35)]'
                        : 'text-cream/85 hover:bg-cream/10 hover:text-cream',
                    )
                  }
                >
                  {t(item.label)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LangSwitch />
            </div>
            <ThemeToggle />
          </div>
          <AnimateIcon animateOnHover asChild>
            <Button asChild variant="onDark" size="sm" className="hidden sm:inline-flex lg:h-12 lg:px-5 lg:text-[1.0625rem]">
              <Link to={pathFor('request', lang)}>
                {t(requestLabel)}
                <ArrowRightIcon size={18} aria-hidden />
              </Link>
            </Button>
          </AnimateIcon>

          <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
            <Drawer.Trigger
              className="grid size-11 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20 active:scale-95 xl:hidden"
              aria-label={t({ de: 'Menü öffnen', en: 'Open menu' })}
            >
              <MenuIcon size={22} aria-hidden />
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-50 bg-navy/60" />
              <Drawer.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(24rem,88vw)] flex-col bg-navy p-6 text-cream outline-none theme-dark">
                <div className="flex items-center justify-between">
                  <DialogTitle className="tape -rotate-2 text-xl font-normal">{t({ de: 'Menü', en: 'Menu' })}</DialogTitle>
                  <DialogDescription className="sr-only">{t({ de: 'Navigation und Kontakt', en: 'Navigation and contact' })}</DialogDescription>
                  <Drawer.Close
                    className="grid size-11 place-items-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20 active:scale-95"
                    aria-label={t({ de: 'Menü schließen', en: 'Close menu' })}
                  >
                    <XIcon size={22} aria-hidden />
                  </Drawer.Close>
                </div>
                <nav aria-label={t({ de: 'Hauptnavigation', en: 'Main navigation' })} className="mt-8">
                  <ul className="flex flex-col">
                    {NAV.map((item, i) => (
                      <li key={item.key} className="animate-fade-up" style={{ animationDelay: `${120 + i * 60}ms` }}>
                        <NavLink
                          to={pathFor(item.key, lang)}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            cn('flex items-center gap-3 border-b border-cream/10 py-4 text-3xl font-extrabold transition-[color,padding] duration-200 hover:pl-2 hover:text-mango', isActive && 'text-mango before:size-2.5 before:rounded-full before:bg-mango')
                          }
                          style={{ fontStretch: '75%' }}
                        >
                          {t(item.label)}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-auto flex flex-col gap-4 pt-8">
                  <Button asChild variant="onDark" size="lg">
                    <Link to={pathFor('request', lang)} onClick={() => setOpen(false)}>
                      {t(requestLabel)}
                    </Link>
                  </Button>
                  <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 font-semibold text-mist">
                    <PhoneIcon size={18} aria-hidden /> {site.phone}
                  </a>
                  <LangSwitch variant="row" onChoose={() => setOpen(false)} />
                  <ThemeToggle variant="row" />
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
}
