import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { LangProvider, LANGS, type Lang } from '@/lib/i18n';
import { routes, type RouteKey } from '@/lib/routes';
import Home from '@/pages/Home';
const Concepts = lazy(() => import('@/pages/Concepts'));
const ConceptDetail = lazy(() => import('@/pages/ConceptDetail'));
const Catering = lazy(() => import('@/pages/Catering'));
const Occasion = lazy(() => import('@/pages/Occasion'));
const Locations = lazy(() => import('@/pages/Locations'));
const About = lazy(() => import('@/pages/About'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Request = lazy(() => import('@/pages/Request'));
const Sent = lazy(() => import('@/pages/Sent'));
const Contact = lazy(() => import('@/pages/Contact'));
import NotFound from '@/pages/NotFound';
const Imprint = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Imprint })));
const Privacy = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Privacy })));

const pages: Record<RouteKey, React.ComponentType> = {
  home: Home,
  concepts: Concepts,
  concept: ConceptDetail,
  catering: Catering,
  occasion: Occasion,
  locations: Locations,
  about: About,
  gallery: Gallery,
  request: Request,
  sent: Sent,
  contact: Contact,
  imprint: Imprint,
  privacy: Privacy,
};

function LangShell({ lang }: { lang: Lang }) {
  return (
    <LangProvider lang={lang}>
      <Layout>
        <Suspense fallback={<div aria-hidden className="animate-fade-in min-h-[70vh] bg-ink" style={{ animationDelay: '150ms' }} />}>
          <Outlet />
        </Suspense>
      </Layout>
    </LangProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/de" replace />} />
      {LANGS.map((lang) => (
        <Route key={lang} path={`/${lang}`} element={<LangShell lang={lang} />}>
          {(Object.keys(pages) as RouteKey[]).map((key) => {
            const Page = pages[key];
            const p = routes[key][lang];
            return p ? <Route key={key} path={p} element={<Page />} /> : <Route key={key} index element={<Page />} />;
          })}
          <Route path="*" element={<NotFound />} />
        </Route>
      ))}
      <Route path="*" element={<LangShell lang="de" />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
