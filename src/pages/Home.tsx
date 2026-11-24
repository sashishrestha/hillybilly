import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Tilt, TiltContent } from '@animate-ui/react/primitives/effects/tilt';
import { AnimateIcon } from '@animate-ui/react/icons';
import { ArrowRightIcon } from '@/components/animate-ui/icons';
import { Seo } from '@/components/layout/Seo';
import { Button } from '@/components/ui/Button';
import { Img } from '@/components/ui/Img';
import { ConceptGrid } from '@/components/sections/Concepts';
import { CtaBand, FaqSection, HowItWorks, OccasionGrid, Scribble, SectionHead, Tick, faqJsonLd } from '@/components/sections/Common';
import { Testimonials } from '@/components/sections/Testimonials';
import { trustFacts } from '@/content/site';
import { media, type MediaKey } from '@/content/media';
import { useLang, useT } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';
import { organizationJsonLd } from '@/lib/jsonld';

/** The hero's "hand of cards": real dishes, dealt onto the table once on load. */
const HAND: { k: MediaKey; label: string; rot: number; x: string; y: string; labelTop?: boolean }[] = [
  { k: 'momoPlate', label: 'Momolaya', rot: -8, x: '0%', y: '6%', labelTop: true },
  { k: 'corndogHero', label: 'Corndogs', rot: 4, x: '31%', y: '0%', labelTop: true },
  { k: 'koreanBowls', label: 'Korean Street Food', rot: 8, x: '63%', y: '8%', labelTop: true },
  { k: 'chaatBowl', label: 'Curry on Wheels', rot: -5, x: '7%', y: '52%' },
  { k: 'waffleSticksCounter', label: 'Waffles', rot: 6, x: '45%', y: '50%' },
];

function HeroHand() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-[1/1] w-full max-w-[34rem]" aria-hidden>
      {HAND.map((c, i) => (
        <motion.div
          key={c.k}
          className="absolute w-[37%]"
          style={{ left: c.x, top: c.y, zIndex: i }}
          initial={reduce ? false : { opacity: 0, y: 120, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: c.rot }}
          transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 0.25 + i * 0.12 }}
        >
          <Tilt maxTilt={8} className="block">
            <TiltContent className="no-touch-hover relative rounded-[1.1rem] bg-cream p-2 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7),6px_6px_0_0_rgba(247,37,133,0.85)] transition-transform hover:z-10 hover:-translate-y-3 hover:scale-105">
              <div className="aspect-[4/4.6] overflow-hidden rounded-[0.8rem]">
                <Img k={c.k} priority decorative />
              </div>
              <span className={`tape absolute left-1/2 -translate-x-1/2 -rotate-2 whitespace-nowrap text-lg ${c.labelTop ? '-top-3' : '-bottom-3'}`}>
                {c.label}
              </span>
            </TiltContent>
          </Tilt>
        </motion.div>
      ))}
    </div>
  );
}

function Hero() {
  const lang = useLang();
  const t = useT();
  const delay = (n: number) => ({ animationDelay: `${n * 90}ms` });
  return (
    <section aria-labelledby="hero-heading" className="theme-dark relative overflow-hidden bg-navy text-cream">
      {/* Comic-print halftone, very faint: a nod to the cartoon logo, not a "glow" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(var(--color-cream) 1.2px, transparent 1.4px)',
          backgroundSize: '18px 18px',
          maskImage: 'linear-gradient(105deg, #000 0%, transparent 55%)',
          WebkitMaskImage: 'linear-gradient(105deg, #000 0%, transparent 55%)',
        }}
      />

      <div className="container-x relative grid items-center gap-12 pb-20 pt-10 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-28">
        <div>
          <p className="tape animate-pop -rotate-2 text-xl md:text-2xl">{t({ de: 'Streetfood & Catering', en: 'Street food & catering' })}</p>

          <h1
            id="hero-heading"
            className="animate-fade-up mt-6 text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[1] tracking-tight"
            style={delay(1)}
          >
            {t({ de: 'Eine Marke.', en: 'One brand.' })}
            <br />
            {t({ de: 'Unendlich viele Aromen.', en: 'Endless flavours.' })}
            <br />
            <span className="relative inline-block text-pink">
              {t({ de: 'Jeder Anlass.', en: 'Every occasion.' })}
              {/* Hand-drawn marker underline */}
              <svg
                aria-hidden
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-2.5 w-full text-turq"
              >
                <path
                  d="M3 9 C 40 3, 70 12, 110 7 S 190 3, 225 8 S 275 11, 297 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength="1"
                  className="[stroke-dasharray:1] [stroke-dashoffset:1] motion-safe:animate-[draw_700ms_700ms_ease-out_forwards] motion-reduce:[stroke-dashoffset:0]"
                />
              </svg>
            </span>
          </h1>

          <p className="animate-fade-up mt-7 max-w-[50ch] text-base text-mist md:text-lg" style={delay(2)}>
            {t({
              de: 'Von Corndogs und Himalaya-Momos bis zu indischen Currys, amerikanischen Klassikern und süßen Desserts. Viele Foodkonzepte, ein erfahrener Catering-Partner.',
              en: 'From Corndogs and Himalayan momos to Indian curries, American classics and sweet desserts. Many food concepts, one experienced catering partner.',
            })}
          </p>

          <div className="animate-fade-up mt-8 flex flex-col gap-4 sm:flex-row" style={delay(3)}>
            <AnimateIcon animateOnHover asChild>
              <Button asChild variant="onDark" size="lg">
                <Link to={pathFor('request', lang)}>
                  {t({ de: 'Catering-Angebot anfragen', en: 'Get a catering quote' })}
                  <ArrowRightIcon size={20} aria-hidden />
                </Link>
              </Button>
            </AnimateIcon>
            <Button asChild variant="outlineTurq" size="lg">
              <Link to={pathFor('concepts', lang)}>{t({ de: 'Foodkonzepte entdecken', en: 'Explore our food concepts' })}</Link>
            </Button>
          </div>

          {/* One human note instead of a feature checklist */}
          <p
            className="animate-fade-up mt-9 flex items-center gap-3 font-brush text-2xl text-mango md:text-[1.7rem]"
            style={delay(4)}
          >
            <svg aria-hidden viewBox="0 0 48 32" className="h-7 w-10 shrink-0 -rotate-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 22 C 12 6, 28 4, 40 14" />
              <path d="M38 3 L40 14 L29 14" />
            </svg>
            <span className="-rotate-1">{t({ de: 'Alles frisch gekocht, direkt vor deinen Gästen!', en: 'Everything cooked fresh, right in front of your guests!' })}</span>
          </p>
        </div>
        <HeroHand />
      </div>
    </section>
  );
}
function TrustStrip() {
  const t = useT();
  return (
    <section aria-label={t({ de: 'Warum HillyBilly', en: 'Why HillyBilly' })} className="border-b-2 border-cream/10 bg-alt">
      <ul className="reveal-group container-x grid gap-x-8 gap-y-6 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:[&>li+li]:border-l-2 lg:[&>li+li]:border-dashed lg:[&>li+li]:border-cream/20 lg:[&>li+li]:pl-8">
        {trustFacts.map((f) => (
          <li key={f.title.en} className="flex gap-3">
            <Tick className="mt-1 text-pink" />
            <span>
              <strong className="block font-brush text-2xl font-normal leading-tight">{t(f.title)}</strong>
              <span className="text-mist">{t(f.text)}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WhyUs() {
  const t = useT();
  const points = [
    { de: 'Frisch zubereitet — vor Ort, vor deinen Gästen.', en: 'Freshly prepared — on site, in front of your guests.' },
    { de: 'Flexible Menüs, kombinierbar über alle Konzepte.', en: 'Flexible menus you can mix across every concept.' },
    { de: 'Viele Küchen: koreanisch, nepalesisch, indisch, amerikanisch, süß.', en: 'Many cuisines: Korean, Nepali, Indian, American and sweet.' },
    { de: 'Ein Ansprechpartner für das ganze Catering.', en: 'One contact for your whole catering.' },
    { de: 'Ein Team, das Events kennt — von der Hochzeit bis zum Stadtfest.', en: 'A team that knows events — from weddings to town fairs.' },
  ];
  return (
    <section aria-labelledby="why-heading" className="py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal space-y-6">
          <figure className="relative -rotate-1 transition-transform duration-500 hover:rotate-0">
            <div className="overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[8px_8px_0_0_rgba(247,37,133,0.9)]">
              <Img k="corndogsTeamFour" className="aspect-[16/10]" />
            </div>
            <figcaption className="tape absolute -bottom-4 right-6 rotate-2 text-xl">
              {t({ de: 'Gutes Essen bringt Menschen zusammen', en: 'Good food brings people together' })}
            </figcaption>
          </figure>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <figure className="rotate-1 transition-transform duration-500 hover:rotate-0">
              <div className="overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[6px_6px_0_0_rgba(255,190,11,0.9)]">
                <Img k="momolayaTrailer" className="aspect-[4/3]" />
              </div>
              <figcaption className="mt-3 font-brush text-xl text-mango">Momolaya</figcaption>
            </figure>
            <figure className="-rotate-1 transition-transform duration-500 hover:rotate-0">
              <div className="overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[6px_6px_0_0_rgba(22,191,168,0.9)]">
                <Img k="curryTeamCart" className="aspect-[4/3]" />
              </div>
              <figcaption className="mt-3 font-brush text-xl text-mango">Curry on Wheels</figcaption>
            </figure>
          </div>
        </div>
        <div>
          <p className="tape mb-4 -rotate-2 text-xl">{t({ de: 'Warum wir', en: 'Why us' })}</p>
          <h2 id="why-heading" className="text-display-2">
            {t({ de: 'Ein Partner für dein ganzes Catering', en: 'One partner for all your catering needs' })}
          </h2>
          <Scribble className="mt-3" />
          <ul className="reveal-group mt-8 divide-y-2 divide-dashed divide-cream/15">
            {points.map((p) => (
              <li key={p.en} className="flex gap-3 py-3.5 text-lg first:pt-0">
                <Tick className="mt-1 text-pink" />
                {t(p)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function RealEvents() {
  const lang = useLang();
  const t = useT();
  const shots: MediaKey[] = ['corndogsTeamTruck', 'momolayaChef', 'curryTeam', 'waffleSticksCounter', 'momolayaTrailer', 'curryTeamCart'];
  return (
    <section aria-labelledby="real-heading" className="theme-dark bg-navy py-20 text-cream md:py-28">
      <div className="container-x">
        <SectionHead
          id="real-heading"
          tone="dark"
          kicker={t({ de: 'Echt & ehrlich', en: 'The real deal' })}
          title={t({ de: 'Echte Events. Echte Menschen.', en: 'Real events. Real people.' })}
          intro={t({
            de: 'Keine Stockfotos: unser Team, unsere Trucks und unser Essen — so, wie deine Gäste es erleben.',
            en: 'No stock photos: our team, our trucks and our food — exactly as your guests will see them.',
          })}
          action={
            <Button asChild variant="outlineOnDark">
              <Link to={pathFor('gallery', lang)}>{t({ de: 'Zur Galerie', en: 'See the gallery' })}</Link>
            </Button>
          }
        />
        <ul className="reveal-group grid auto-rows-[11rem] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4">
          {shots.map((k, i) => (
            <li
              key={k}
              className={
                'group overflow-hidden rounded-[var(--radius-card)] transition-transform duration-300 ease-[var(--ease-spring)] hover:z-10 hover:rotate-0 hover:scale-[1.03] md:even:rotate-1 md:odd:-rotate-1 ' +
                (i === 0 ? 'col-span-2 row-span-2' : i === 2 || i >= 4 ? 'col-span-2' : '')
              }
            >
              <Img k={k} className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" />
            </li>
          ))}
        </ul>
        <Testimonials />
      </div>
    </section>
  );
}

export default function Home() {
  const lang = useLang();
  const t = useT();
  return (
    <>
      <Seo
        route="home"
        title={t({
          de: 'HillyBilly Foods – Streetfood Catering & Foodtrucks für Events',
          en: 'HillyBilly Foods – Street Food Catering & Food Trucks for Events',
        })}
        description={t({
          de: 'Foodtruck Catering für Firmenfeiern, Hochzeiten, Festivals und private Feiern: Corndogs, Momos, Currys, Waffeln und mehr — frisch vor Ort. Jetzt Angebot anfragen.',
          en: 'Food truck catering for corporate events, weddings, festivals and private parties: Corndogs, momos, curries, waffles and more — cooked fresh on site. Request a quote.',
        })}
        image={media.corndogsTeamTruck.src}
        jsonLd={[organizationJsonLd(lang), faqJsonLd(lang)]}
      />
      <Hero />
      <TrustStrip />

      <section aria-labelledby="concepts-heading" className="py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            id="concepts-heading"
            kicker={t({ de: 'Das schmeckt', en: 'Tasty stuff' })}
            title={t({ de: 'Unsere Foodkonzepte', en: 'Explore our food concepts' })}
            intro={t({
              de: 'Eine wachsende Familie an Foodkonzepten. Such dir deine Favoriten aus — oder wir stellen das passende Menü für dein Event zusammen.',
              en: 'A growing family of food concepts. Pick your favourites — or let us put together the perfect menu for your event.',
            })}
            action={
              <Button asChild variant="outline">
                <Link to={pathFor('concepts', lang)}>{t({ de: 'Alle Konzepte', en: 'All concepts' })}</Link>
              </Button>
            }
          />
          <ConceptGrid />
        </div>
      </section>

      <section aria-labelledby="occasions-heading" className="theme-dark bg-navy py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            id="occasions-heading"
            tone="dark"
            kicker={t({ de: 'Für jeden Anlass', en: 'Any occasion' })}
            title={t({ de: 'Catering für jeden Anlass', en: 'Catering for every occasion' })}
            intro={t({
              de: 'Vom Firmen-Lunch bis zur Hochzeit: Wähle deinen Anlass und sieh, wie wir ihn umsetzen.',
              en: 'From company lunches to weddings: pick your occasion and see how we do it.',
            })}
          />
          <OccasionGrid />
        </div>
      </section>

      <WhyUs />
      <RealEvents />
      <HowItWorks />
      <FaqSection />
      <CtaBand />
    </>
  );
}
