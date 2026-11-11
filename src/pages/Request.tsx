import { Seo } from '@/components/layout/Seo';
import { Halftone } from '@/components/sections/Common';
import { CateringForm } from '@/form/CateringForm';
import { site } from '@/content/site';
import { useT } from '@/lib/i18n';

export default function Request() {
  const t = useT();
  return (
    <>
      <Seo
        route="request"
        title={t({ de: 'Catering anfragen – unverbindliches Angebot', en: 'Request catering – free, no-obligation quote' })}
        description={t({
          de: 'In 4 kurzen Schritten zum Catering-Angebot: Event, Gäste, Wunschküchen und Kontakt. Unverbindlich.',
          en: 'Get a catering quote in 4 short steps: event, guests, cuisines and contact. No obligation.',
        })}
      />
      <section className="theme-dark relative overflow-hidden bg-navy text-cream">
        <Halftone />
        <div className="container-x relative pb-12 pt-10 md:pb-16 md:pt-14">
          <p className="tape animate-pop -rotate-2 text-xl">{t({ de: 'Dauert nur 2 Minuten', en: 'Takes just 2 minutes' })}</p>
          <h1 className="mt-5 text-display-1">{t({ de: 'Catering anfragen', en: 'Request catering' })}</h1>
          <p className="mt-4 max-w-[56ch] text-lg text-mist">
            {t({
              de: `Vier kurze Schritte, etwa zwei Minuten. Unverbindlich — verbindlich wird es erst, wenn du unser Angebot annimmst. Fragen? Ruf an: ${site.phone}`,
              en: `Four short steps, about two minutes. No obligation — nothing is binding until you accept our quote. Questions? Call ${site.phone}`,
            })}
          </p>
        </div>
      </section>
      <section className="py-12 md:py-20">
        <div className="container-x">
          <CateringForm />
        </div>
      </section>
    </>
  );
}
