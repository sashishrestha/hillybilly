import { Link } from 'react-router-dom';
import { AnimateIcon } from '@animate-ui/react/icons';
import { ArrowRightIcon, LeafIcon, SparklesIcon } from '@/components/animate-ui/icons';
import { Img } from '@/components/ui/Img';
import { visibleConcepts, type Concept } from '@/content/concepts';
import { useLang, useT } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';
import { cn } from '@/lib/cn';

const hasVeg = (c: Concept) => c.dishes.some((d) => d.diet?.includes('vegetarian') || d.diet?.includes('vegan'));

export function ConceptCard({ concept, headingLevel = 3 }: { concept: Concept; headingLevel?: 2 | 3 }) {
  const lang = useLang();
  const t = useT();
  const H = headingLevel === 2 ? 'h2' : 'h3';
  const href = pathFor('concept', lang, { slug: concept.slug });

  // Photo-less concepts get a typographic "menu board" card instead of a stock photo.
  if (!concept.image) {
    return (
      <AnimateIcon animateOnHover asChild>
        <Link
          to={href}
          className="group relative flex min-h-[26rem] flex-col overflow-hidden rounded-[var(--radius-card)] p-6 transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_rgba(16,27,51,0.45)] active:translate-y-0"
          style={{ background: concept.accent, color: concept.onAccent }}
        >
          {concept.status === 'new' && (
            <span className="tape absolute right-4 top-4 rotate-3 text-xl">{t({ de: 'Neu', en: 'New' })}</span>
          )}
          <ul aria-hidden className="mt-10 space-y-1 opacity-90">
            {concept.dishes.map((d) => (
              <li key={d.name.en} className="display text-4xl leading-[0.95] sm:text-[2.6rem]">
                {t(d.name)}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <H className="text-[2rem]">{concept.name}</H>
            <p className="mt-2 font-medium opacity-90">{t(concept.tagline)}</p>
            <span className="mt-4 inline-flex items-center gap-2 font-bold underline decoration-2 underline-offset-4">
              {t({ de: 'Zum Konzept', en: 'View concept' })}
              <ArrowRightIcon size={18} aria-hidden />
            </span>
          </div>
        </Link>
      </AnimateIcon>
    );
  }

  return (
    <AnimateIcon animateOnHover asChild>
      <Link
        to={href}
        className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-navy-2 shadow-[0_1px_0_0_rgba(16,27,51,0.08)] ring-1 ring-cream/5 transition-[box-shadow,translate] duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_rgba(16,27,51,0.45)] active:translate-y-0"
      >
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[4/5]">
          <Img k={concept.image} className="transition-transform duration-500 group-hover:scale-[1.04]" />
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-bold"
            style={{ background: concept.accent, color: concept.onAccent }}
          >
            {t(concept.cuisine)}
          </span>
        </div>
        <div className="flex flex-1 flex-col border-t-[6px] p-5" style={{ borderColor: concept.accent }}>
          <H className="text-[1.85rem]">{concept.name}</H>
          <p className="mt-2 text-mist">{t(concept.tagline)}</p>
          {hasVeg(concept) && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-turq">
              <LeafIcon size={16} aria-hidden />
              {t({ de: 'Vegetarische Gerichte', en: 'Vegetarian dishes' })}
            </p>
          )}
          <span className="mt-auto inline-flex items-center gap-2 pt-5 font-bold text-cream">
            {t({ de: 'Menü ansehen', en: 'Explore menu' })}
            <ArrowRightIcon size={18} aria-hidden />
          </span>
        </div>
      </Link>
    </AnimateIcon>
  );
}

/** The always-last card: keeps the grid open-ended so the brand never reads as a fixed fleet. */
export function MoreComingCard() {
  const lang = useLang();
  const t = useT();
  return (
    <AnimateIcon animateOnHover asChild>
      <Link
        to={pathFor('contact', lang)}
        className="group flex min-h-[26rem] flex-col justify-between rounded-[var(--radius-card)] border-[3px] border-dashed border-cream/25 p-6 transition-[background-color,border-color,translate] duration-300 hover:-translate-y-1.5 hover:border-pink hover:bg-navy-2 active:translate-y-0"
      >
        <SparklesIcon size={40} className="text-pink transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" aria-hidden />
        <div>
          <h3 className="text-[2rem]">{t({ de: 'Mehr kommt bald', en: 'More coming soon' })}</h3>
          <p className="mt-2 text-mist">
            {t({
              de: 'Unsere Familie an Foodkonzepten wächst. Du hast ein Konzept oder suchst eine bestimmte Küche? Sprich uns an.',
              en: 'Our family of food concepts keeps growing. Got a concept, or looking for a particular cuisine? Talk to us.',
            })}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 font-bold">
            {t({ de: 'Partner werden', en: 'Partner with us' })}
            <ArrowRightIcon size={18} aria-hidden />
          </span>
        </div>
      </Link>
    </AnimateIcon>
  );
}

export function ConceptGrid({ limit, className }: { limit?: number; className?: string }) {
  const list = limit ? visibleConcepts.slice(0, limit) : visibleConcepts;
  return (
    <ul className={cn('reveal-group grid gap-5 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {list.map((c) => (
        <li key={c.slug} className="flex">
          <div className="flex w-full flex-col [&>a]:flex-1">
            <ConceptCard concept={c} />
          </div>
        </li>
      ))}
      <li className="flex [&>a]:flex-1">
        <MoreComingCard />
      </li>
    </ul>
  );
}
