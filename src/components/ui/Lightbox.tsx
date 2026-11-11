import { useCallback, useEffect, useRef, useState } from 'react';
import { media, type MediaKey } from '@/content/media';
import { useT } from '@/lib/i18n';
import { Img } from '@/components/ui/Img';
import { cn } from '@/lib/cn';

/**
 * Photo grid with a keyboard-friendly lightbox built on the native <dialog>
 * (focus trap, Esc to close and focus return come for free).
 * Arrow keys / buttons move between photos.
 */
export function LightboxGrid({ items, className }: { items: MediaKey[]; className?: string }) {
  const t = useT();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number, el: HTMLElement) => {
    triggerRef.current = el;
    setIndex(i);
  };

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
  }, [index]);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, step]);

  const current = index === null ? null : media[items[index]];

  return (
    <>
      <ul className={className}>
        {items.map((k, i) => (
          <li key={k} className="group break-inside-avoid overflow-hidden rounded-[var(--radius-card)]">
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              aria-label={t({ de: 'Foto vergrößern: ', en: 'Enlarge photo: ' }) + t(media[k].alt)}
              className="block w-full cursor-zoom-in"
            >
              <Img k={k} className="h-auto transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={t({ de: 'Fotoansicht', en: 'Photo viewer' })}
        onClose={() => {
          setIndex(null);
          triggerRef.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="theme-dark m-auto max-h-[100dvh] w-full max-w-none bg-transparent p-0 text-cream backdrop:bg-ink/90 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="animate-fade-in relative mx-auto flex h-[100dvh] max-w-6xl flex-col items-center justify-center gap-4 p-4 md:p-8" onClick={(e) => e.target === e.currentTarget && close()}>
            <img
              key={items[index!]}
              src={current.src}
              alt={t(current.alt)}
              className="animate-pop max-h-[78dvh] w-auto max-w-full rounded-[var(--radius-card)] object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            />
            <p className="text-center text-mist" aria-live="polite">
              {t(current.alt)} <span className="ml-2 font-brush text-lg text-mango">{(index ?? 0) + 1} / {items.length}</span>
            </p>
            <button type="button" onClick={close} aria-label={t({ de: 'Schließen', en: 'Close' })} className={btn('right-4 top-4')}>
              <span aria-hidden className="text-2xl leading-none">×</span>
            </button>
            <button type="button" onClick={() => step(-1)} aria-label={t({ de: 'Vorheriges Foto', en: 'Previous photo' })} className={btn('left-3 top-1/2 -translate-y-1/2')}>
              <span aria-hidden className="text-2xl leading-none">‹</span>
            </button>
            <button type="button" onClick={() => step(1)} aria-label={t({ de: 'Nächstes Foto', en: 'Next photo' })} className={btn('right-3 top-1/2 -translate-y-1/2')}>
              <span aria-hidden className="text-2xl leading-none">›</span>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}

const btn = (pos: string) =>
  cn(
    'absolute grid size-12 place-items-center rounded-full bg-cream/15 text-cream transition-[background-color,transform] hover:bg-cream/30 active:scale-90',
    pos,
  );
