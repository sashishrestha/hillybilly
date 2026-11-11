import { site } from '@/content/site';
import { LANGS, useLang } from '@/lib/i18n';
import { noIndexRoutes, pathFor, type RouteKey, type RouteParams } from '@/lib/routes';

type Props = {
  route: RouteKey;
  params?: RouteParams;
  title: string;
  description: string;
  image?: string;
  jsonLd?: object | object[];
};

const OG_LOCALE = { de: 'de_DE', en: 'en_GB' } as const;

/**
 * Per-page SEO. React 19 hoists <title>, <meta> and <link> into <head>,
 * and the prerender step bakes them into static HTML for every URL.
 */
export function Seo({ route, params = {}, title, description, image, jsonLd }: Props) {
  const lang = useLang();
  const fullTitle = route === 'home' ? title : `${title} | HillyBilly Foods`;
  const url = site.url + pathFor(route, lang, params);
  const ogImage = image ? (image.startsWith('http') ? image : site.url + image) : undefined;
  const noindex = noIndexRoutes.includes(route);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={url} />
      {!noindex &&
        LANGS.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={site.url + pathFor(route, l, params)} />
        ))}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={site.url + pathFor(route, 'de', params)} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="HillyBilly Foods" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
