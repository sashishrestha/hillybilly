import { Seo } from '@/components/layout/Seo';
import { Img } from '@/components/ui/Img';
import { CtaBand, Halftone, PageHero, Scribble } from '@/components/sections/Common';
import { media } from '@/content/media';
import { useT } from '@/lib/i18n';

export default function About() {
  const t = useT();
  return (
    <>
      <Seo
        route="about"
        title={t({ de: 'Über uns – das Team hinter HillyBilly Foods', en: 'About us – the team behind HillyBilly Foods' })}
        description={t({
          de: 'Wie aus einem pinken Corndog-Truck eine wachsende Familie an Foodkonzepten wurde — und wer dahintersteht.',
          en: 'How a pink corndog truck grew into a family of food concepts — and the people behind it.',
        })}
        image={media.corndogsTeamFour.src}
      />
      <PageHero
        title={t({ de: 'Gutes Essen bringt Menschen zusammen', en: 'Good food brings people together' })}
        intro={t({
          de: 'Hinter HillyBilly Foods steht ein Team, das Streetfood liebt — und Menschen, die gern gemeinsam essen.',
          en: 'Behind HillyBilly Foods is a team that loves street food — and people who love eating together.',
        })}
      />
      <section aria-labelledby="story-heading" className="py-16 md:py-24">
        {/* COPY: replace with the approved company story from HillyBilly (brief §09). */}
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="tape mb-4 -rotate-2 text-xl">{t({ de: 'Unsere Geschichte', en: 'Our story' })}</p>
            <h2 id="story-heading" className="text-display-2">{t({ de: 'Angefangen mit einem pinken Truck', en: 'It started with a pink truck' })}</h2>
            <Scribble className="mt-3" />
            <div className="mt-6 space-y-4 text-lg text-mist">
              <p>
                {t({
                  de: 'HillyBilly begann mit Korean Corndogs aus einem knallpinken Foodtruck — serviert von einem Team im Fifties-Diner-Look. Die Gäste kamen wegen des Trucks und blieben wegen des Essens.',
                  en: 'HillyBilly began with Korean corndogs from a bright pink food truck, served by a team in 1950s diner style. Guests came for the truck and stayed for the food.',
                })}
              </p>
              <p>
                {t({
                  de: 'Heute gehören nepalesische Momos von Momolaya, indisch-pakistanische Küche von Curry on Wheels, Waffeln am Stiel und weitere Konzepte zur Familie. Jedes mit eigener Küche, alle mit derselben Haltung: frisch kochen, herzlich servieren.',
                  en: 'Today the family includes Nepali momos from Momolaya, Indian and Pakistani food from Curry on Wheels, waffles on a stick and more. Each has its own kitchen; all share the same approach: cook fresh, serve with heart.',
                })}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[4/5] -rotate-2 overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[8px_8px_0_0_rgba(247,37,133,0.9)] transition-transform duration-500 hover:rotate-0"><Img k="waffleStickServer" /></div>
            <div className="mt-10 aspect-[4/5] rotate-2 overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[8px_8px_0_0_rgba(255,190,11,0.9)] transition-transform duration-500 hover:rotate-0"><Img k="momolayaChef" /></div>
          </div>
        </div>
      </section>
      <section aria-labelledby="teams-heading" className="theme-dark relative overflow-hidden bg-navy py-16 text-cream md:py-24">
        <Halftone />
        <div className="container-x relative">
          <p className="tape mb-4 -rotate-2 text-xl">{t({ de: 'Die Crew', en: 'The crew' })}</p>
          <h2 id="teams-heading" className="text-display-2">{t({ de: 'Unsere Teams', en: 'Our teams' })}</h2>
          <Scribble className="mt-3" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <figure className="-rotate-1 transition-transform duration-500 hover:rotate-0">
              <div className="overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[8px_8px_0_0_rgba(0,0,0,0.4)]"><Img k="corndogsTeamFour" className="aspect-[16/9]" /></div>
              <figcaption className="mt-4 font-brush text-2xl text-mango">HillyBilly Corndogs</figcaption>
            </figure>
            <figure className="rotate-1 transition-transform duration-500 hover:rotate-0">
              <div className="overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[8px_8px_0_0_rgba(0,0,0,0.4)]"><Img k="curryTeam" className="aspect-[16/9]" /></div>
              <figcaption className="mt-4 font-brush text-2xl text-mango">Curry on Wheels</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
