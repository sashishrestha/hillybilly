import { Link, useParams } from 'react-router-dom';
import { AnimateIcon } from '@animate-ui/react/icons';
import { ArrowRightIcon } from '@/components/animate-ui/icons';
import { Seo } from '@/components/layout/Seo';
import { Button } from '@/components/ui/Button';
import { Img } from '@/components/ui/Img';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ConceptGrid } from '@/components/sections/Concepts';
import { CtaBand, Halftone, HowItWorks, SectionHead, Tick } from '@/components/sections/Common';
import { getOccasionBySlug } from '@/content/occasions';
import { media } from '@/content/media';
import { useLang, useT } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import NotFound from './NotFound';

export default function Occasion() {
  const { occasion: slug = '' } = useParams();
  const lang = useLang();
  const t = useT();
  const o = getOccasionBySlug(slug);
  if (!o) return <NotFound />;

  return (
    <>
      <Seo
        route="occasion"
        params={{ occasion: o.id }}
        title={t(o.seoTitle)}
        description={t(o.seoDescription)}
        image={o.image ? media[o.image].src : undefined}
        jsonLd={breadcrumbJsonLd([
          { name: 'HillyBilly Foods', path: pathFor('home', lang) },
          { name: 'Catering & Events', path: pathFor('catering', lang) },
          { name: t(o.title), path: pathFor('occasion', lang, { occasion: o.id }) },
        ])}
      />
      <section className="theme-dark relative overflow-hidden bg-navy text-cream">
        <Halftone />
        <div className="container-x relative grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1.2fr_1fr] lg:pb-24">
          <div>
            <Breadcrumbs
              items={[
                { name: 'Home', path: pathFor('home', lang) },
                { name: 'Catering & Events', path: pathFor('catering', lang) },
                { name: t(o.title) },
              ]}
            />
            <h1 className="mt-6 text-display-1">{t(o.seoTitle)}</h1>
            <p className="mt-6 max-w-[56ch] text-lg text-mist md:text-xl">{t(o.intro)}</p>
            <ul className="mt-7 space-y-3">
              {o.points.map((p) => (
                <li key={p.en} className="flex gap-3 text-lg">
                  <Tick className="mt-1 text-mango" />
                  {t(p)}
                </li>
              ))}
            </ul>
            <AnimateIcon animateOnHover asChild>
              <Button asChild variant="onDark" size="lg" className="mt-9">
                <Link to={`${pathFor('request', lang)}?event=${o.formValue}`}>
                  {t({ de: 'Angebot für dieses Event anfragen', en: 'Get a quote for this event' })}
                  <ArrowRightIcon size={20} aria-hidden />
                </Link>
              </Button>
            </AnimateIcon>
          </div>
          {o.image && (
            <div className="rotate-2 overflow-hidden rounded-[1.4rem] border-[8px] border-[#fff7ec] shadow-[10px_10px_0_0_rgba(247,37,133,0.9)] transition-transform duration-500 hover:rotate-0">
              <Img k={o.image} priority className="aspect-[4/5]" />
            </div>
          )}
        </div>
      </section>
      <section aria-labelledby="pick-heading" className="py-16 md:py-24">
        <div className="container-x">
          <SectionHead
            id="pick-heading"
            kicker={t({ de: 'Dein Menü', en: 'Your menu' })}
            title={t({ de: 'Konzepte für dein Event', en: 'Concepts for your event' })}
            intro={t({ de: 'Wähle eines oder kombiniere mehrere.', en: 'Choose one or combine several.' })}
          />
          <ConceptGrid />
        </div>
      </section>
      <div className="bg-alt"><HowItWorks /></div>
      <CtaBand />
    </>
  );
}
