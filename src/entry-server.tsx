import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { allPaths, pathFor } from './lib/routes';
import { LANGS } from './lib/i18n';
import { site } from './content/site';

/** Waits for lazy pages to resolve, so the HTML contains the full page. */
export async function render(url: string) {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html;
}

export function urls() {
  return allPaths().flatMap(({ key, params }) => LANGS.map((l) => ({ key, path: pathFor(key, l, params) })));
}

export const siteUrl = site.url;
