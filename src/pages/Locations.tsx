import { Link } from 'react-router-dom';
import { CameraIcon, MapPinIcon } from '@/components/animate-ui/icons';
import { Seo } from '@/components/layout/Seo';
import { Button } from '@/components/ui/Button';
import { CtaBand, PageHero, Scribble } from '@/components/sections/Common';
import { getConcept, visibleConcepts } from '@/content/concepts';
import { upcomingDates } from '@/content/locations';
import { site } from '@/content/site';
import { useLang, useT } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';

export default function Locations() {
  const lang = useLang();
  const t = useT();
  const dates = upcomingDates();
  const fmt = new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'long' });
  const instagrams = visibleConcepts.filter((c) => c.instagram);

  return (
    <>
      <Seo
        route="locations"
        title={t({ de: 'Standorte & Termine unserer Foodtrucks', en: 'Food truck locations & dates' })}
        description={t({
          de: 'Wo du HillyBilly Corndogs, Momolaya, Curry on Wheels und unsere anderen Foodtrucks als Nächstes findest.',
          en: 'Where to find HillyBilly Corndogs, Momolaya, Curry on Wheels and our other food trucks next.',
        })}
      />
      <PageHero
        title={t({ de: 'Wo du uns findest', en: 'Where to find us' })}
        intro={t({
          de: 'Unsere öffentlichen Termine auf Märkten, Festen und Events. Für private Buchungen kommen wir zu dir.',
          en: 'Our public dates at markets, fairs and events. For private bookings, we come to you.',
        })}
      />
      <section aria-labelledby="dates-heading" className="py-16 md:py-24">
        <div className="container-x">
          <p className="tape mb-4 -rotate-2 text-xl">{t({ de: 'Komm vorbei', en: 'Come say hi' })}</p>
          <h2 id="dates-heading" className="text-display-2">{t({ de: 'Nächste Termine', en: 'Coming up' })}</h2>
          <Scribble className="mt-3" />
          {dates.length ? (
            <ul className="mt-10 divide-y-2 divide-cream/10 border-y-2 border-cream/10">
              {dates.map((d) => {
                const c = getConcept(d.concept);
                return (
                  <li key={d.date + d.concept} className="grid gap-3 py-6 md:grid-cols-[14rem_1fr_auto] md:items-center">
                    <p className="flex items-center gap-4">
                      <time dateTime={d.date} className="flex items-center gap-4">
                        <span aria-hidden className="grid w-16 shrink-0 -rotate-2 place-items-center rounded-xl bg-mango py-1.5 text-navy shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]">
                          <span className="font-brush text-3xl leading-none">{new Date(d.date).getDate()}</span>
                          <span className="text-xs font-bold uppercase tracking-wider">{new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', { month: 'short' }).format(new Date(d.date))}</span>
                        </span>
                        <span className="text-lg font-bold">{fmt.format(new Date(d.date))}</span>
                      </time>
                    </p>
                    <div>
                      <p className="text-2xl font-extrabold" style={{ fontStretch: '75%' }}>{c?.name}</p>
                      <p className="flex items-center gap-1.5 text-mist">
                        <MapPinIcon size={16} aria-hidden /> {t(d.place)}, {d.city}{d.time ? ` · ${d.time}` : ''}
                      </p>
                    </div>
                    {d.mapUrl && <a href={d.mapUrl} rel="noopener" className="font-bold underline underline-offset-4">{t({ de: 'Route', en: 'Directions' })}</a>}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-10 max-w-2xl rounded-[var(--radius-card)] border-[3px] border-dashed border-cream/25 bg-navy-2 p-8">
              <p className="mb-3 -rotate-1 font-brush text-3xl text-mango">{t({ de: 'Die Trucks machen gerade Pause ...', en: 'The trucks are taking a breather ...' })}</p>
              <p className="text-xl font-semibold">
                {t({
                  de: 'Gerade stehen keine öffentlichen Termine fest. Neue Termine kündigen wir zuerst auf Instagram an.',
                  en: 'No public dates are confirmed right now. We announce new dates on Instagram first.',
                })}
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
                <li>
                  <Button asChild variant="navy" size="sm">
                    <a href={site.social.instagram} rel="noopener"><CameraIcon size={18} aria-hidden /> HillyBilly Corndogs</a>
                  </Button>
                </li>
                {instagrams.filter((c) => c.instagram !== site.social.instagram).map((c) => (
                  <li key={c.slug}>
                    <Button asChild variant="outline" size="sm">
                      <a href={c.instagram} rel="noopener"><CameraIcon size={18} aria-hidden /> {c.name}</a>
                    </Button>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-mist">
                {t({ de: 'Lieber direkt zu dir? ', en: 'Rather have us come to you? ' })}
                <Link to={pathFor('request', lang)} className="font-bold text-pink underline underline-offset-4">
                  {t({ de: 'Catering anfragen', en: 'Request catering' })}
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
