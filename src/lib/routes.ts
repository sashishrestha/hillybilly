import { matchPath } from 'react-router-dom';
import type { L, Lang } from './i18n';
import { LANGS } from './i18n';
import { getOccasionById, getOccasionBySlug, occasions } from '@/content/occasions';
import { visibleConcepts } from '@/content/concepts';

/** Localised URL slugs. German is primary; both languages get real, indexable URLs. */
export const routes = {
  home: { de: '', en: '' },
  concepts: { de: 'foodkonzepte', en: 'food-concepts' },
  concept: { de: 'foodkonzepte/:slug', en: 'food-concepts/:slug' },
  catering: { de: 'catering', en: 'catering' },
  occasion: { de: 'catering/:occasion', en: 'catering/:occasion' },
  locations: { de: 'standorte', en: 'locations' },
  about: { de: 'ueber-uns', en: 'about-us' },
  gallery: { de: 'galerie', en: 'gallery' },
  request: { de: 'catering-anfragen', en: 'request-catering' },
  sent: { de: 'anfrage-gesendet', en: 'request-sent' },
  contact: { de: 'kontakt', en: 'contact' },
  imprint: { de: 'impressum', en: 'legal-notice' },
  privacy: { de: 'datenschutz', en: 'privacy-policy' },
} satisfies Record<string, L>;

export type RouteKey = keyof typeof routes;
/** Params always use language-neutral ids (concept slug, occasion id). */
export type RouteParams = { slug?: string; occasion?: string };

export function pathFor(key: RouteKey, lang: Lang, params: RouteParams = {}) {
  let p = routes[key][lang];
  if (params.slug) p = p.replace(':slug', params.slug);
  if (params.occasion) {
    const occ = getOccasionById(params.occasion);
    p = p.replace(':occasion', occ ? occ.slug[lang] : params.occasion);
  }
  return `/${lang}${p ? `/${p}` : ''}`;
}

/** Works out which page a URL is, so the language switch can jump to the same page. */
export function resolvePath(pathname: string): { lang: Lang; key: RouteKey; params: RouteParams } | null {
  for (const lang of LANGS) {
    for (const key of Object.keys(routes) as RouteKey[]) {
      const pattern = `/${lang}${routes[key][lang] ? `/${routes[key][lang]}` : ''}`;
      const m = matchPath({ path: pattern, end: true }, pathname);
      if (!m) continue;
      const params: RouteParams = {};
      if (m.params.slug) params.slug = m.params.slug;
      if (m.params.occasion) {
        const occ = getOccasionBySlug(m.params.occasion);
        if (!occ) continue;
        params.occasion = occ.id;
      }
      return { lang, key, params };
    }
  }
  return null;
}

/** Every indexable URL — used for the sitemap and prerendering. */
export function allPaths(): { key: RouteKey; params: RouteParams }[] {
  const out: { key: RouteKey; params: RouteParams }[] = [];
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (key === 'concept') visibleConcepts.forEach((c) => out.push({ key, params: { slug: c.slug } }));
    else if (key === 'occasion') occasions.forEach((o) => out.push({ key, params: { occasion: o.id } }));
    else out.push({ key, params: {} });
  }
  return out;
}

export const noIndexRoutes: RouteKey[] = ['sent'];
