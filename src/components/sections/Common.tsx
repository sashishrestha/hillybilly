import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimateIcon } from '@animate-ui/react/icons';
import {
  ArrowRightIcon,
  FlagIcon,
  GiftIcon,
  GraduationCapIcon,
  HeartIcon,
  MessageCircleIcon,
  MusicIcon,
  UsersIcon,
} from '@/components/animate-ui/icons';
import { Button } from '@/components/ui/Button';
import { FaqAccordion } from '@/components/ui/Accordion';
import { occasions, type OccasionIcon } from '@/content/occasions';
import { faq } from '@/content/faq';
import { site } from '@/content/site';
import { useLang, useT, type L } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';
import { cn } from '@/lib/cn';

type IconLike = React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>;

export const occasionIcons = {
  users: UsersIcon,
  heart: HeartIcon,
  gift: GiftIcon,
  music: MusicIcon,
  graduation: GraduationCapIcon,
  flag: FlagIcon,
} as unknown as Record<OccasionIcon, IconLike>;

/** Hand-drawn checkmark: replaces generic icon ticks. */
export function Tick({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={cn('size-6 shrink-0', className)} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 13.5 C 5.5 14.5, 7.5 17, 9 20 C 11.5 12, 16.5 6.5, 21.5 3.5" />
    </svg>
  );
}

/** Short marker scribble used under section titles. */
export function Scribble({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 10" preserveAspectRatio="none" className={cn('h-2 w-24 text-mango', className)}>
      <path d="M2 6 C 20 2, 34 9, 55 5 S 95 2, 118 6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function SectionHead({
  title,
  intro,
  tone = 'light',
  action,
  id,
  kicker,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  tone?: 'light' | 'dark';
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="reveal mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {kicker && <p className="tape mb-4 -rotate-2 text-xl">{kicker}</p>}
        <h2 id={id} className="text-display-3 text-cream">
          {title}
        </h2>
        <Scribble className="mt-4 w-32" />
        {intro && <p className={cn('mt-4 max-w-[58ch] text-lg', tone === 'dark' ? 'text-mist' : 'text-mist')}>{intro}</p>}
      </div>
      {action}
    </div>
  );
}

/** Faint comic-print dot texture; place inside a `relative overflow-hidden` section. */
export function Halftone({ className }: { className?: string }) {
  const mask = 'linear-gradient(105deg, #000, transparent 55%)';
  return (
    <div
      aria-hidden
      className={cn('halftone pointer-events-none absolute inset-0 text-cream opacity-[0.07]', className)}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}

/** Page header for inner pages. */
export function PageHero({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="theme-dark relative overflow-hidden bg-navy text-cream">
      <div
        aria-hidden
        className="halftone pointer-events-none absolute inset-0 text-cream opacity-[0.07]"
        style={{ maskImage: 'linear-gradient(105deg, #000, transparent 55%)', WebkitMaskImage: 'linear-gradient(105deg, #000, transparent 55%)' }}
      />
      <div className="container-x relative pb-14 pt-12 md:pb-20 md:pt-16">
        <h1 className="max-w-4xl text-display-1">{title}</h1>
        {intro && <p className="mt-5 max-w-[60ch] text-lg text-mist md:text-xl">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function OccasionGrid({ tone = 'dark' }: { tone?: 'light' | 'dark' }) {
  const lang = useLang();
  const t = useT();
  const dark = tone === 'dark';
  return (
    <ul className="reveal-group grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {occasions.map((o, idx) => {
        const Icon = occasionIcons[o.icon];
        return (
          <li key={o.id}>
            <AnimateIcon animateOnHover asChild>
              <Link
                to={pathFor('occasion', lang, { occasion: o.id })}
                className={cn(
                  'group flex h-full items-start gap-5 rounded-[var(--radius-card)] p-6 transition-[background-color,box-shadow,translate] duration-300 hover:-translate-y-1 active:translate-y-0',
                  dark ? 'bg-navy-2 text-cream hover:bg-navy-3' : 'bg-navy-2 text-cream ring-1 ring-cream/10 hover:ring-pink',
                )}
              >
                <span className={cn('grid size-14 shrink-0 place-items-center rounded-2xl bg-mango text-navy shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[var(--ease-spring)] group-hover:rotate-0 group-hover:scale-110', idx % 2 ? 'rotate-3' : '-rotate-3')}>
                  <Icon size={28} aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="display text-[1.75rem]">{t(o.title)}</span>
                  <span className={cn('mt-1', dark ? 'text-mist' : 'text-mist')}>{t(o.short)}</span>
                  <span className={cn('mt-3 inline-flex items-center gap-1.5 font-bold group-hover:underline', dark ? 'text-mango' : 'text-pink')}>
                    {t({ de: 'Mehr erfahren', en: 'Learn more' })}
                    <ArrowRightIcon size={16} aria-hidden />
                  </span>
                </span>
              </Link>
            </AnimateIcon>
          </li>
        );
      })}
    </ul>
  );
}

export const steps = [
  {
    title: { de: 'Erzähl uns von deinem Event', en: 'Tell us about your event' },
    text: { de: 'Datum, Ort, Gästezahl und welche Küchen dich reizen — das dauert etwa zwei Minuten.', en: 'Date, location, guest count and which cuisines you fancy — it takes about two minutes.' },
  },
  {
    title: { de: 'Wir schlagen Menü und Preis vor', en: 'We suggest a menu and quote' },
    text: { de: 'Mit klarer Preisgrundlage, Strom- und Platzbedarf. Unverbindlich.', en: 'With a clear price basis, plus power and space needs. No obligation.' },
  },
  {
    title: { de: 'Wir kommen, kochen und servieren', en: 'We arrive, cook and serve' },
    text: { de: 'Aufbau, frisches Kochen vor Ort, Ausgabe und Abbau übernehmen wir.', en: 'We handle setup, cooking fresh on site, serving and clearing up.' },
  },
];

export function HowItWorks() {
  const lang = useLang();
  const t = useT();
  return (
    <section aria-labelledby="how-heading" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHead id="how-heading" kicker={t({ de: 'In 3 Schritten', en: '3 easy steps' })} title={t({ de: 'So einfach geht’s', en: 'How it works' })} />
        <ol className="reveal-group grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={i} className="group relative rounded-[var(--radius-card)] bg-navy-2 p-7 pt-9 ring-1 ring-cream/10 transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:ring-pink">
              <span aria-hidden className="absolute -top-5 left-6 grid size-12 -rotate-6 place-items-center rounded-xl bg-mango font-brush text-3xl leading-none text-navy shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[var(--ease-spring)] group-hover:rotate-3 group-hover:scale-110">
                {i + 1}
              </span>
              <h3 className="text-2xl md:text-[1.7rem]">{t(s.title)}</h3>
              <p className="mt-3 max-w-[38ch] text-mist">{t(s.text)}</p>
            </li>
          ))}
        </ol>
        <div className="reveal mt-12">
          <Button asChild size="lg">
            <Link to={pathFor('request', lang)}>{t({ de: 'Angebot anfragen', en: 'Get a catering quote' })}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const lang = useLang();
  const t = useT();
  return (
    <section aria-labelledby="faq-heading" className={cn('py-20 md:py-28', tone === 'dark' && 'theme-dark bg-navy')}>
      <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <p className="tape -rotate-2 text-xl">{t({ de: 'FAQ', en: 'FAQ' })}</p>
          <h2 id="faq-heading" className="mt-5 text-display-2 text-cream">
            {t({ de: 'Häufige Fragen', en: 'Questions people ask' })}
          </h2>
          <Scribble className="mt-3" />
          <p className="mt-5 max-w-[34ch] text-mist">
            {t({
              de: 'Kurz und ehrlich beantwortet. Die Antwort fehlt? Schreib uns, wir melden uns schnell.',
              en: 'Short, honest answers. Can’t find yours? Message us and we’ll get back quickly.',
            })}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <AnimateIcon animateOnHover asChild>
              <Button asChild variant="outline" size="md">
                <a href={`https://wa.me/${site.whatsapp}`} rel="noopener">
                  <MessageCircleIcon size={20} aria-hidden /> WhatsApp
                </a>
              </Button>
            </AnimateIcon>
            <Button asChild variant="ghost" className="self-start py-2 sm:self-center">
              <Link to={pathFor('request', lang)}>{t({ de: 'Oder Angebot anfragen', en: 'Or request a quote' })}</Link>
            </Button>
          </div>
        </div>
        <FaqAccordion tone={tone} items={faq.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
      </div>
    </section>
  );
}
export function faqJsonLd(lang: 'de' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q[lang],
      acceptedAnswer: { '@type': 'Answer', text: f.a[lang] },
    })),
  };
}

/** Guest-count presets for the quick start. `value` is the estimate handed to the form. */
const guestPresets: { value: string; label: L }[] = [
  { value: '30', label: { de: 'bis 50', en: 'up to 50' } },
  { value: '100', label: { de: '50–150', en: '50–150' } },
  { value: '250', label: { de: '150–400', en: '150–400' } },
  { value: '500', label: { de: '400+', en: '400+' } },
];

/** Chip classes for a visually hidden radio + label pair. */
const chipCls =
  'flex h-full cursor-pointer select-none items-center gap-2.5 rounded-xl bg-cream/10 px-3.5 py-3 font-bold text-cream ring-1 ring-cream/15 transition-[background-color,box-shadow,transform,color] duration-200 hover:-translate-y-0.5 hover:bg-cream/15 peer-checked:-rotate-1 peer-checked:bg-mango peer-checked:text-navy peer-checked:shadow-[3px_3px_0_0_rgba(0,0,0,0.4)] peer-checked:ring-0 peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-mango';

/**
 * Closing call to action with a two-question quick start (occasion + guests).
 * Picks are passed to the request form as ?event=…&guests=… so nothing has to be typed twice.
 * Native radios: keyboard (arrow keys) and screen readers work out of the box.
 */
export function CtaBand() {
  const lang = useLang();
  const t = useT();
  const [event, setEvent] = useState('');
  const [guests, setGuests] = useState('');

  const occ = occasions.find((o) => o.formValue === event);
  const preset = guestPresets.find((g) => g.value === guests);
  const query = new URLSearchParams({ ...(event && { event }), ...(guests && { guests }) }).toString();
  const href = pathFor('request', lang) + (query ? `?${query}` : '');
  const picked = Boolean(occ || preset);

  const summary = occ && preset
    ? t({ de: `${t(occ.title)} mit ${t(preset.label)} Gästen. Klingt lecker!`, en: `${t(occ.title)} with ${t(preset.label)} guests. Sounds tasty!` })
    : occ
      ? t({ de: `${t(occ.title)}. Super Wahl!`, en: `${t(occ.title)}. Great choice!` })
      : preset
        ? t({ de: `${t(preset.label)} Gäste. Machen wir!`, en: `${t(preset.label)} guests. We can do that!` })
        : t({ de: 'Tipp an, was passt. Dauert 5 Sekunden.', en: 'Tap what fits. Takes 5 seconds.' });

  return (
    <section aria-labelledby="cta-heading" className="theme-dark relative overflow-hidden bg-teal text-ink">
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 text-white opacity-[0.1]" style={{ maskImage: 'linear-gradient(255deg, #000, transparent 60%)', WebkitMaskImage: 'linear-gradient(255deg, #000, transparent 60%)' }} />
      <div className="reveal container-x relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <p className="tape -rotate-2 text-xl">{t({ de: 'Los geht’s', en: 'Let’s go' })}</p>
          <h2 id="cta-heading" className="mt-5 text-display-3">
            {t({ de: 'Du planst ein Event?', en: 'Planning an event?' })}
          </h2>
          <svg aria-hidden viewBox="0 0 120 10" preserveAspectRatio="none" className="mt-4 h-2 w-32 text-mango">
            <path d="M2 6 C 20 2, 34 9, 55 5 S 95 2, 118 6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <p className="mt-5 max-w-[46ch] text-lg font-medium">
            {t({
              de: 'Erzähl uns davon. Wir melden uns mit einem Menüvorschlag und einem klaren Angebot.',
              en: 'Tell us about it. We’ll come back with a menu suggestion and a clear quote.',
            })}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-semibold">
            {[
              { de: 'Antwort meist in 24 Std.', en: 'Reply usually within 24 hrs' },
              { de: 'Unverbindlich', en: 'No obligation' },
            ].map((p) => (
              <li key={p.en} className="inline-flex items-center gap-2">
                <Tick className="size-5 text-alt bg-mango rounded-full p-1" />
                {t(p)}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-medium">
            {t({ de: 'Erst probieren? ', en: 'Want to taste first? ' })}
            <Link to={pathFor('locations', lang)} className="font-bold underline decoration-mango decoration-2 underline-offset-4 transition-colors hover:text-mango">
              {t({ de: 'Hier findest du unsere Trucks', en: 'Find our trucks' })}
            </Link>
          </p>
        </div>

        {/* Quick start card */}
        <div className="relative rotate-1 rounded-[1.6rem] bg-navy p-6 text-cream shadow-[10px_10px_0_0_rgba(16,27,51,0.55)] transition-transform duration-500 hover:rotate-0 md:p-8">
          <span aria-hidden className="tape absolute -top-4 right-6 rotate-3 text-lg">{t({ de: 'Schnellstart', en: 'Quick start' })}</span>

          <fieldset>
            <legend className="font-brush text-2xl text-mango">{t({ de: '1. Was feierst du?', en: '1. What’s the occasion?' })}</legend>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {occasions.map((o) => {
                const Icon = occasionIcons[o.icon];
                return (
                  <label key={o.id} className="block">
                    <input
                      type="radio"
                      name="cta-event"
                      value={o.formValue}
                      checked={event === o.formValue}
                      onChange={() => setEvent(o.formValue)}
                      className="peer sr-only"
                    />
                    <span className={chipCls}>
                      <Icon size={20} aria-hidden />
                      <span className="text-[0.95rem] leading-tight">{t(o.title).split(' & ')[0]}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="font-brush text-2xl text-mango">{t({ de: '2. Wie viele Gäste?', en: '2. How many guests?' })}</legend>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {guestPresets.map((g) => (
                <label key={g.value} className="block">
                  <input
                    type="radio"
                    name="cta-guests"
                    value={g.value}
                    checked={guests === g.value}
                    onChange={() => setGuests(g.value)}
                    className="peer sr-only"
                  />
                  <span className={cn(chipCls, 'justify-center')}>{t(g.label)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <p key={summary} aria-live="polite" className="animate-fade-up mt-6 min-h-8 -rotate-1 font-brush text-2xl text-cream">
            {summary}
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <AnimateIcon animateOnHover asChild>
              <Button asChild variant="onDark" size="lg" className="sm:flex-1">
                <Link to={href}>
                  {picked ? t({ de: 'Weiter zum Angebot', en: 'Continue to my quote' }) : t({ de: 'Angebot anfragen', en: 'Get a catering quote' })}
                  <ArrowRightIcon size={20} aria-hidden />
                </Link>
              </Button>
            </AnimateIcon>
            <AnimateIcon animateOnHover asChild>
              <Button asChild variant="outlineOnDark" size="lg">
                <a href={`https://wa.me/${site.whatsapp}`} rel="noopener">
                  <MessageCircleIcon size={20} aria-hidden /> WhatsApp
                </a>
              </Button>
            </AnimateIcon>
          </div>
        </div>
      </div>
    </section>
  );
}