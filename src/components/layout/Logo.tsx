import { cn } from '@/lib/cn';

/** Intrinsic size of public/images/HillyBilly CornDogs-01.avif (keeps layout stable while it loads). */
const LOGO = { src: '/images/logo.png', w: 744, h: 474 };

/**
 * HillyBilly logo. The artwork has a transparent background, so it reads on both the
 * dark and light themes. Set the rendered size through `className` (height classes, e.g. `h-12`).
 * Decorative: the surrounding link carries the accessible name.
 */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <img
      src={LOGO.src}
      width={LOGO.w}
      height={LOGO.h}
      alt=""
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      draggable={false}
      className={cn(
        'block h-12 w-auto select-none transition-transform duration-300 ease-[var(--ease-spring)] group-hover/logo:-rotate-3 group-hover/logo:scale-105',
        className,
      )}
    />
  );
}
