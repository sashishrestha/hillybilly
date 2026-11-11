import { Link, useLocation } from 'react-router-dom';
import { CircleCheckIcon, InfoIcon } from '@/components/animate-ui/icons';
import { Seo } from '@/components/layout/Seo';
import { Button } from '@/components/ui/Button';
import { Halftone, Scribble, steps } from '@/components/sections/Common';
import { useLang, useT } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';

export default function Sent() {
  const lang = useLang();
  const t = useT();
  const state = (useLocation().state ?? {}) as { demo?: boolean; name?: string };
  return (
    <>
      <Seo route="sent" title={t({ de: 'Anfrage gesendet', en: 'Request sent' })} description={t({ de: 'Danke für deine Catering-Anfrage.', en: 'Thanks for your catering request.' })} />
      <section className="theme-dark relative overflow-hidden bg-navy text-cream">
        <Halftone />
        <div className="container-x relative py-16 md:py-24">
          <CircleCheckIcon size={64} animate className="text-mango" aria-hidden />
          <h1 className="mt-6 text-display-1">
            {state.name ? t({ de: `Danke, ${state.name}!`, en: `Thanks, ${state.name}!` }) : t({ de: 'Danke!', en: 'Thank you!' })}
          </h1>
          <p className="mt-5 max-w-[56ch] text-xl text-mist">
            {t({
              de: 'Deine Anfrage ist angekommen. Du bekommst gleich eine Bestätigung per E-Mail — schau auch im Spam-Ordner nach.',
              en: 'Your request has arrived. You’ll get a confirmation email shortly — check your spam folder too.',
            })}
          </p>
          {state.demo && (
            <p className="mt-6 flex max-w-2xl gap-2 rounded-2xl bg-mango p-4 font-semibold text-navy">
              <InfoIcon size={20} className="mt-0.5 shrink-0" aria-hidden />
              Demo mode: no form endpoint is configured (VITE_FORM_ENDPOINT), so nothing was sent.
            </p>
          )}
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="container-x">
          <p className="tape mb-4 -rotate-2 text-xl">{t({ de: 'Und jetzt?', en: 'So what now?' })}</p>
          <h2 className="text-display-2">{t({ de: 'Wie es weitergeht', en: 'What happens next' })}</h2>
          <Scribble className="mt-3" />
          <ol className="mt-8 grid gap-8 md:grid-cols-2">
            {steps.slice(1).map((s, i) => (
              <li key={i} className="rounded-[var(--radius-card)] bg-navy-2 p-7 ring-1 ring-cream/10">
                <span aria-hidden className="block -rotate-3 font-brush text-7xl leading-none text-pink">{i + 2}</span>
                <h3 className="mt-2 text-3xl">{t(s.title)}</h3>
                <p className="mt-2 text-mist">{t(s.text)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild><Link to={pathFor('concepts', lang)}>{t({ de: 'Konzepte ansehen', en: 'Browse concepts' })}</Link></Button>
            <Button asChild variant="outline"><Link to={pathFor('home', lang)}>{t({ de: 'Zur Startseite', en: 'Back to home' })}</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
