import { visibleConcepts, type Concept } from '@/content/concepts';
import { occasions } from '@/content/occasions';
import { site } from '@/content/site';
import type { Lang } from './i18n';
import { pathFor } from './routes';

export function organizationJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${site.url}/#business`,
    name: site.name,
    url: site.url + pathFor('home', lang),
    telephone: site.phone,
    email: site.email,
    areaServed: site.serviceArea[lang],
    servesCuisine: visibleConcepts.map((c) => c.cuisine[lang]),
    sameAs: [site.social.instagram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'de' ? 'Catering' : 'Catering',
      itemListElement: occasions.map((o) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: o.title[lang], url: site.url + pathFor('occasion', lang, { occasion: o.id }) },
      })),
    },
  };
}

export function conceptJsonLd(c: Concept, lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${c.name} – ${c.cuisine[lang]}`,
    url: site.url + pathFor('concept', lang, { slug: c.slug }),
    provider: { '@id': `${site.url}/#business` },
    hasMenuItem: c.dishes.map((d) => ({
      '@type': 'MenuItem',
      name: d.name[lang],
      description: d.description[lang],
      ...(d.diet?.includes('vegetarian') ? { suitableForDiet: 'https://schema.org/VegetarianDiet' } : {}),
      ...(d.diet?.includes('vegan') ? { suitableForDiet: 'https://schema.org/VeganDiet' } : {}),
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: site.url + it.path,
    })),
  };
}
