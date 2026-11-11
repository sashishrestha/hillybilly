import { Link } from 'react-router-dom';
import { Seo } from '@/components/layout/Seo';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CtaBand, FaqSection, HowItWorks, OccasionGrid, PageHero, SectionHead, faqJsonLd } from '@/components/sections/Common';
import { useLang, useT } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';

export default function Catering() {
  const lang = useLang();
  const t = useT();
  return (
    <>
      <Seo
        route="catering"
        title={t({ de: 'Streetfood Catering & Foodtruck mieten', en: 'Street food catering & food truck hire' })}
        description={t({
          de: 'Foodtruck Catering für Firmenfeiern, Hochzeiten, private Feiern, Festivals, Schulen und US-Base-Events. Mehrere Küchen, ein Ansprechpartner.',
          en: 'Food truck catering for corporate events, weddings, private parties, festivals, schools and US base events. Several cuisines, one contact.',
        })}
        jsonLd={faqJsonLd(lang)}
      />
      <PageHero
        title={t({ de: 'Catering, das kommt und frisch kocht', en: 'Catering that shows up and cooks' })}
        intro={t({
          de: 'Von kleinen privaten Feiern bis zu großen Firmenevents: Wir bringen Truck oder Anhänger, kochen vor Ort und servieren deinen Gästen frisches Streetfood.',
          en: 'From small private parties to large company events: we bring a truck or trailer, cook on site and serve your guests fresh street food.',
        })}
      >
        <div className="mt-8 flex flex-col gap-6">
          <Button asChild variant="onDark" size="lg" className="self-start">
            <Link to={pathFor('request', lang)}>{t({ de: 'Catering anfragen', en: 'Request catering' })}</Link>
          </Button>
          <Breadcrumbs items={[{ name: 'Home', path: pathFor('home', lang) }, { name: 'Catering & Events' }]} />
        </div>
      </PageHero>
      <section aria-labelledby="occ-heading" className="py-16 md:py-24">
        <div className="container-x">
          <SectionHead id="occ-heading" kicker={t({ de: 'Für dich', en: 'For you' })} title={t({ de: 'Wähle deinen Anlass', en: 'Choose your occasion' })} />
          <OccasionGrid tone="light" />
        </div>
      </section>
      <div className="bg-alt"><HowItWorks /></div>
      <FaqSection />
      <CtaBand />
    </>
  );
}
