import { useEffect, useState } from 'react';
import { useT } from '@/lib/i18n';
import { cn } from '@/lib/cn';

/** Appears after scrolling a screen or so; sits above the mobile sticky CTA. */
export function BackToTop() {
  const t = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.getElementById('main')?.focus({ preventScroll: true });
      }}
      aria-label={t({ de: 'Nach oben', en: 'Back to top' })}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={cn(
        'fixed bottom-24 right-4 z-30 grid size-12 place-items-center rounded-full bg-pink text-white shadow-[0_5px_0_0_#6e0a3a] transition-[opacity,transform] duration-300 ease-[var(--ease-spring)] hover:-translate-y-1 active:translate-y-0.5 sm:bottom-6 sm:right-6',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}