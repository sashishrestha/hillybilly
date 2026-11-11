import type { ReactNode } from 'react';

/** A round header button: shows the current flag/icon and flips it on click. */
export const roundBtnCls =
  'group/rb relative grid size-11 shrink-0 place-items-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/20 transition-[background-color,box-shadow,transform] duration-200 hover:bg-cream/20 hover:ring-mango active:scale-90';

/** Hover / keyboard-focus label that says what a click will do. Decorative: the button has aria-label/title. */
export function RoundTip({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg bg-cream px-2.5 py-1 text-sm font-bold text-navy opacity-0 shadow-[2px_2px_0_0_rgba(0,0,0,0.35)] transition-[opacity,transform] duration-200 group-hover/rb:translate-y-0 group-hover/rb:opacity-100 group-focus-visible/rb:translate-y-0 group-focus-visible/rb:opacity-100 max-lg:hidden"
    >
      {children}
    </span>
  );
}

/** Mobile-menu row: current value as text on the left, the round button on the right. */
export function SettingRow({ caption, hint, children }: { caption: string; hint: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-cream/10 p-3 pl-5 ring-1 ring-cream/10">
      <span>
        <span className="block text-lg font-bold leading-tight">{caption}</span>
        <span className="block text-sm text-mist">{hint}</span>
      </span>
      {children}
    </div>
  );
}