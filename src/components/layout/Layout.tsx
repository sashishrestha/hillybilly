import { useEffect, useRef, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Header, requestLabel } from './Header';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { Button } from '@/components/ui/Button';
import { useLang, useT } from '@/lib/i18n';
import { pathFor, resolvePath } from '@/lib/routes';

/** Mobile-only sticky CTA so the main conversion is always one tap away. */
function StickyCta() {
  const lang = useLang();
  const t = useT();
  const { pathname } = useLocation();
  const key = resolvePath(pathname)?.key;
  if (key === 'request' || key === 'sent') return null;
  return (
    <div className="animate-fade-up fixed inset-x-0 bottom-0 z-30 border-t border-cream/10 bg-ink/95 p-3 backdrop-blur sm:hidden">
      <Button asChild size="md" className="w-full">
        <Link to={pathFor('request', lang)}>{t(requestLabel)}</Link>
      </Button>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const lang = useLang();
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const mainRef = useRef<HTMLElement>(null);
  const first = useRef(true);

  useEffect(() => {
    // 'instant' overrides the smooth scroll-behavior set in CSS for in-page anchors.
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
    // Move focus to <main> on client-side navigation so keyboard/screen-reader users land on the new content.
    if (first.current) {
      first.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        key={pathname}
        className="animate-page-in outline-none focus-visible:shadow-none focus-visible:outline-none"
      >
        {children}
      </main>
      <Footer />
      <div aria-hidden className="h-[4.75rem] bg-navy sm:hidden" />
      <StickyCta />
      <BackToTop />
    </MotionConfig>
  );
}
