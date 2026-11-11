// Renders every route to static HTML so search engines and link previews
// get real content, titles and hreflang tags without running JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, urls, siteUrl } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);

// React 19 renders <title>/<meta>/<link> where they appear; move them into <head>.
const HOIST = /<(title)\b[^>]*>[\s\S]*?<\/title>|<(meta|link)\b[^>]*\/?>/g;

async function page(url) {
  let body = await render(url);
  const head = [];
  body = body.replace(HOIST, (tag) => {
    head.push(tag.replace(/^<(\w+)/, '<$1 data-prerender'));
    return '';
  });
  const lang = url.startsWith('/en') ? 'en' : 'de';
  return template
    .replace('<html lang="de">', `<html lang="${lang}">`)
    .replace('<!--head-->', head.join('\n    '))
    .replace('<!--app-->', body);
}

const list = urls();
for (const { path: url } of list) {
  const file = path.join(dist, url, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, await page(url));
}
// Root: German homepage (its canonical points at /de) + 404 page for the host.
fs.writeFileSync(path.join(dist, 'index.html'), await page('/de'));
fs.writeFileSync(path.join(dist, '404.html'), await page('/de/404'));

// Sitemap with hreflang pairs
const pairs = [];
for (let i = 0; i < list.length; i += 2) pairs.push([list[i], list[i + 1]]); // urls() emits de,en per page
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...pairs
    .filter(([de]) => de.key !== 'sent')
    .flatMap(([de, en]) =>
      [de, en].map(
        (u) => `  <url><loc>${siteUrl}${u.path}</loc>` +
          `<xhtml:link rel="alternate" hreflang="de" href="${siteUrl}${de.path}"/>` +
          `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${en.path}"/>` +
          `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${de.path}"/></url>`,
      ),
    ),
  '</urlset>',
].join('\n');
fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml);
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${list.length} pages + sitemap.xml`);
