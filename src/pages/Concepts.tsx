import { Seo } from '@/components/layout/Seo';
import { ConceptGrid } from '@/components/sections/Concepts';
import { CtaBand, PageHero, Scribble } from '@/components/sections/Common';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { visibleConcepts } from '@/content/concepts';
import { useLang, useT } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';
import { breadcrumbJsonLd } from '@/lib/jsonld';

export default function Concepts() {
  const lang = useLang();
  const t = useT();
  const title = t({ de: 'Unsere Foodkonzepte', en: 'Our food concepts' });
  return (
    <>
      <Seo
        route="concepts"
        title={t({ de: 'Foodkonzepte für Streetfood Catering', en: 'Food concepts for street food catering' })}
        description={t({
          de: `${visibleConcepts.length} Foodkonzepte, frei kombinierbar: ${visibleConcepts.map((c) => c.name).join(', ')}. Für Firmenfeiern, Hochzeiten und Festivals.`,
          en: `${visibleConcepts.length} food concepts to mix and match: ${visibleConcepts.map((c) => c.name).join(', ')}. For corporate events, weddings and festivals.`,
        })}
        jsonLd={breadcrumbJsonLd([
          { name: 'HillyBilly Foods', path: pathFor('home', lang) },
          { name: title, path: pathFor('concepts', lang) },
        ])}
      />
      <PageHero
        title={t({ de: 'Eine wachsende Familie an Foodkonzepten', en: 'A growing family of food concepts' })}
        intro={t({
          de: 'Jedes Konzept hat seine eigene Küche und seinen eigenen Look. Buche eins, kombiniere mehrere oder lass dir eine Auswahl empfehlen.',
          en: 'Each concept has its own cuisine and its own look. Book one, combine several or let us recommend a mix.',
        })}
      >
        <div className="mt-8">
          <Breadcrumbs items={[{ name: 'Home', path: pathFor('home', lang) }, { name: title }]} />
        </div>
      </PageHero>

      <section aria-labelledby="all-concepts" className="py-16 md:py-24">
        <div className="container-x">
          <h2 id="all-concepts" className="sr-only">{title}</h2>
          <ConceptGrid />
        </div>
      </section>

      <section aria-labelledby="concept-vs-truck" className="bg-alt py-16 md:py-24">
        <div className="container-x grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="tape mb-4 -rotate-2 text-xl">{t({ de: 'Gut zu wissen', en: 'Good to know' })}</p>
            <h2 id="concept-vs-truck" className="text-display-2">
              {t({ de: 'Konzepte, nicht nur Trucks', en: 'Concepts, not just trucks' })}
            </h2>
            <Scribble className="mt-3" />
          </div>
          <div className="space-y-4 rounded-[var(--radius-card)] border-[3px] border-dashed border-cream/25 bg-navy-2 p-7 text-lg text-mist md:p-9">
            <p>
              {t({
                de: 'Ein Foodkonzept ist eine Küche mit eigener Marke und eigenem Menü. Je nach Event servieren wir es aus einem Foodtruck, einem Verkaufsanhänger oder als Station auf deiner Feier.',
                en: 'A food concept is a cuisine with its own brand and menu. Depending on your event, we serve it from a food truck, a trailer or as a station at your party.',
              })}
            </p>
            <p>
              {t({
                de: 'Darum kannst du im Anfrageformular einfach Küchen auswählen — wir kümmern uns darum, welches Fahrzeug und welcher Aufbau dazu passen.',
                en: 'That’s why the request form just asks which cuisines you’d like — we work out which vehicle and setup fits.',
              })}
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
