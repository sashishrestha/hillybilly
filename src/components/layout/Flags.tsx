import { useId } from 'react';
import type { Lang } from '@/lib/i18n';

/**
 * Round SVG flags (emoji flags render as plain letters on Windows, so we draw them).
 * Decorative: the surrounding link carries the accessible name.
 * German for "de", Union Jack for "en".
 */
export function Flag({ lang, className }: { lang: Lang; className?: string }) {
  const id = useId();
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} focusable="false">
      <defs>
        <clipPath id={id}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        {lang === 'de' ? (
          <>
            <rect width="24" height="8" y="0" fill="#000000" />
            <rect width="24" height="8" y="8" fill="#DD0000" />
            <rect width="24" height="8" y="16" fill="#FFCE00" />
          </>
        ) : (
          <>
            <rect width="24" height="24" fill="#012169" />
            <path d="M0 0L24 24M24 0L0 24" stroke="#FFFFFF" strokeWidth="4.5" />
            <path d="M0 0L24 24M24 0L0 24" stroke="#C8102E" strokeWidth="2" />
            <path d="M12 0V24M0 12H24" stroke="#FFFFFF" strokeWidth="7" />
            <path d="M12 0V24M0 12H24" stroke="#C8102E" strokeWidth="4" />
          </>
        )}
      </g>
      <circle cx="12" cy="12" r="11.5" fill="none" stroke="rgba(0,0,0,0.25)" />
    </svg>
  );
}
