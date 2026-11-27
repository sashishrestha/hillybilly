import { Link, useParams } from 'react-router-dom';
import { AnimateIcon } from '@animate-ui/react/icons';
import { ArrowRightIcon, CameraIcon, PlugZapIcon } from '@/components/animate-ui/icons';
import { Seo } from '@/components/layout/Seo';
import { Button } from '@/components/ui/Button';
import { Img } from '@/components/ui/Img';
import { DietTag } from '@/components/ui/DietTag';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ConceptCard } from '@/components/sections/Concepts';
import { CtaBand, Halftone, Scribble, SectionHead, Tick } from '@/components/sections/Common';
import { getConcept, visibleConcepts } from '@/content/concepts';
import { media } from '@/content/media';
import { useLang, useT } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';
import { breadcrumbJsonLd, conceptJsonLd } from '@/lib/jsonld';
import NotFound from './NotFound';

export default function ConceptDetail() {
  const { slug = '' } = useParams();
  const lang = useLang();
  const t = useT();
  const c = getConcept(slug);
  if (!c) return <NotFound />;

  const related = visibleConcepts.filter((x) => x.slug !== c.slug).slice(0, 3);
  const overview = t({ de: 'Foodkonzepte', en: 'Food concepts' });
  const requestHref = `${pathFor('request', lang)}?concept=${c.slug}`;

  return (
    <>
      <Seo
        route="concept"
        params={{ slug: c.slug }}
        title={`${c.name} – ${t(c.cuisine)} ${t({ de: 'Catering', en: 'catering' })}`}
        description={`${t(c.tagline)}. ${t(c.pitch).split('\n\n')[0].slice(0, 110)}…`}
        image={c.image ? media[c.image].src : undefined}
        jsonLd={[
          conceptJsonLd(c, lang),
          breadcrumbJsonLd([
            { name: 'HillyBilly Foods', path: pathFor('home', lang) },
            { name: overview, path: pathFor('concepts', lang) },
            { name: c.name, path: pathFor('concept', lang, { slug: c.slug }) },
          ]),
        ]}
      />

      <section className="theme-dark relative overflow-hidden bg-navy text-cream">
        <Halftone />
        <div className="relative h-2" style={{ background: c.accent }} />
        <div className="container-x relative grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1.2fr_1fr] lg:pb-24">
          <div>
            <Breadcrumbs
              items={[
                { name: 'Home', path: pathFor('home', lang) },
                { name: overview, path: pathFor('concepts', lang) },
                { name: c.name },
              ]}
            />
            <p className="inline-block -rotate-2 rounded-full px-4 py-1 font-bold shadow-[3px_3px_0_0_rgba(0,0,0,0.35)]" style={{ background: c.accent, color: c.onAccent }}>
              {t(c.cuisine)}
            </p>
            <h1 className="mt-5 text-display-1">{c.name}</h1>
            <p className="mt-4 text-2xl font-semibold text-cream">{t(c.tagline)}</p>
            {t(c.pitch).split('\n\n').map((para) => (
              <p key={para} className="mt-5 max-w-[58ch] text-lg text-mist">{para}</p>
            ))}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <AnimateIcon animateOnHover asChild>
                <Button asChild variant="onDark" size="lg">
                  <Link to={requestHref}>
                    {t({ de: 'Dieses Konzept buchen', en: 'Book this concept' })}
                    <ArrowRightIcon size={20} aria-hidden />
                  </Link>
                </Button>
              </AnimateIcon>
              {c.instagram && (
                <Button asChild variant="outlineOnDark" size="lg">
                  <a href={c.instagram} target="_blank" rel="noopener noreferrer">
                    <CameraIcon size={20} aria-hidden /> Instagram
                  </a>
                </Button>
              )}
            </div>
          </div>
          <div className="relative">
            {c.image ? (
              <div className="mx-auto max-w-md rotate-2 rounded-[1.4rem] bg-[#fff7ec] p-2.5 shadow-[10px_10px_0_0_rgba(0,0,0,0.45)] transition-transform duration-500 hover:rotate-0">
                <div className="aspect-[4/5] overflow-hidden rounded-[1rem]">
                  <Img k={c.image} priority />
                </div>
              </div>
            ) : (
              <div className="mx-auto grid aspect-[4/5] max-w-md place-items-center rounded-[1.4rem] p-8 text-center" style={{ background: c.accent, color: c.onAccent }}>
                <p className="display text-6xl">{t(c.cuisine)}</p>
              </div>
            )}
            {c.logo && (
              <div className="absolute -bottom-6 -left-2 size-28 overflow-hidden rounded-full bg-white p-1 shadow-lg md:size-36">
                <Img k={c.logo} className="rounded-full object-contain" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="menu-heading" className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="tape mb-4 -rotate-2 text-xl">{t({ de: 'Speisekarte', en: 'The menu' })}</p>
            <h2 id="menu-heading" className="text-display-2">{t(c.menuHeading ?? { de: 'Menü-Highlights', en: 'Menu highlights' })}</h2>
            <Scribble className="mt-3" />
            <ul className="reveal-group mt-8 flex flex-col gap-3">
              {c.dishes.map((d) => (
                <li key={d.name.en} className="flex flex-col gap-2 rounded-[var(--radius-card)] border-l-[6px] bg-navy-2 p-5 ring-1 ring-cream/10 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:ring-cream/30 sm:flex-row sm:items-center sm:justify-between sm:gap-6" style={{ borderLeftColor: c.accent }}>
                  <div>
                    <h3 className="text-2xl">{t(d.name)}</h3>
                    <p className="mt-1 text-mist">{t(d.description)}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {d.diet?.map((x) => <DietTag key={x} diet={x} />)}
                    {d.price && <span className="rounded-full bg-mango px-3 py-0.5 font-bold text-navy">{d.price}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside aria-label={t({ de: 'Service-Details', en: 'Service details' })} className="space-y-6 self-start rounded-[var(--radius-card)] bg-navy-2 p-7 ring-1 ring-cream/10 lg:sticky lg:top-28 [&>div+div]:border-t-2 [&>div+div]:border-dashed [&>div+div]:border-cream/20 [&>div+div]:pt-6 [&_h2]:font-brush [&_h2]:text-[1.7rem] [&_h2]:font-normal [&_h2]:text-pink">
            <div>
              <h2 className="text-2xl">{t({ de: 'So servieren wir', en: 'How we serve' })}</h2>
              <ul className="mt-2 space-y-1.5 text-mist">{c.formats.map((f) => <li key={f.en} className="flex gap-2"><Tick className="mt-0.5 size-5 text-turq" />{t(f)}</li>)}</ul>
            </div>
            <div>
              <h2 className="text-2xl">{t({ de: 'Ideal für', en: 'Great for' })}</h2>
              <ul className="mt-2 space-y-1.5 text-mist">{c.goodFor.map((f) => <li key={f.en} className="flex gap-2"><Tick className="mt-0.5 size-5 text-turq" />{t(f)}</li>)}</ul>
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-2xl">
                <PlugZapIcon size={22} aria-hidden /> {t({ de: 'Strom', en: 'Power' })}
              </h2>
              <p className="mt-2 text-mist">{t(c.power.note)}</p>
            </div>
            <div>
              <h2 className="text-2xl">{t({ de: 'Allergene', en: 'Allergens' })}</h2>
              <p className="mt-2 text-mist">{t(c.allergens)}</p>
            </div>
          </aside>
        </div>
      </section>

      {c.process && (
        <section aria-labelledby="process-heading" className="bg-alt py-16 md:py-24">
          <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[1.4rem] bg-[#fff7ec] p-2.5 shadow-[10px_10px_0_0_rgba(0,0,0,0.25)]">
              <Img k={c.process.image} className="rounded-[1rem] !h-auto" />
            </div>
            <div>
              <h2 id="process-heading" className="text-display-2">{t(c.process.heading)}</h2>
              <Scribble className="mt-3" />
              <p className="mt-4 text-lg">{t(c.process.intro)}</p>
              <ol className="mt-8 flex flex-col gap-5">
                {c.process.steps.map((s) => (
                  <li key={s.title.en} className="rounded-[var(--radius-card)] border-l-[6px] bg-navy-2 p-5 text-cream ring-1 ring-cream/10" style={{ borderLeftColor: c.accent }}>
                    <h3 className="text-2xl">{t(s.title)}</h3>
                    <ul className="mt-2 space-y-1.5 text-mist">
                      {s.items.map((i) => (
                        <li key={i.name.en} className="flex gap-2">
                          <Tick className="mt-0.5 size-5 shrink-0 text-turq" />
                          <span><strong className="text-cream">{t(i.name)}</strong>{i.description && <> – {t(i.description)}</>}</span>
                        </li>
                      ))}
                    </ul>
                    {s.note && <p className="mt-3 text-sm text-mist">{t(s.note)}</p>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}      {c.story && (
        <section aria-labelledby="story-heading" className="theme-dark relative overflow-hidden bg-navy py-16 text-cream md:py-24">
          <Halftone />
          <div className="container-x relative max-w-4xl">
            <h2 id="story-heading" className="text-display-2">{t(c.story.heading)}</h2>
            <Scribble className="mt-3" />
            <p className="mt-5 font-brush text-3xl text-mango">{t(c.story.tagline)}</p>
            <div className="mt-6 space-y-4 text-lg text-mist">
              {c.story.paragraphs.map((para) => <p key={para.en}>{t(para)}</p>)}
            </div>
            <p className="mt-8 text-2xl font-bold">{t(c.story.closing)}</p>
          </div>
        </section>
      )}
      {c.gallery.length > 0 && (
        <section aria-labelledby="gallery-heading" className="py-16 md:pb-24">
          <div className="container-x">
            <h2 id="gallery-heading" className="mb-8 text-4xl md:text-5xl">{t({ de: 'Unterwegs mit', en: 'Out and about with' })} {c.name}</h2>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {c.gallery.map((k) => (
                <li key={k} className="group aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] transition-transform duration-300 ease-[var(--ease-spring)] hover:z-10 hover:rotate-0 hover:scale-[1.03] md:even:rotate-1 md:odd:-rotate-1">
                  <Img k={k} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="pairs-heading" className="bg-alt py-16 md:py-24">
        <div className="container-x">
          <SectionHead
            id="pairs-heading"
            kicker={t({ de: 'Kombinieren', en: 'Mix & match' })}
            title={t({ de: 'Passt gut zusammen mit', en: 'Pairs well with' })}
            intro={t({
              de: 'Mehrere Konzepte auf einem Event? Kein Problem — eine Anfrage, ein Angebot.',
              en: 'Several concepts at one event? No problem — one request, one quote.',
            })}
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="flex [&>a]:flex-1">
                <ConceptCard concept={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
