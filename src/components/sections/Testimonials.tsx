import { approvedTestimonials } from '@/content/testimonials';
import { useT } from '@/lib/i18n';

/** Renders nothing until at least one review with written permission exists. */
export function Testimonials() {
  const t = useT();
  const items = approvedTestimonials();
  if (!items.length) return null;
  return (
    <ul className="mt-12 grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.name}>
          <figure className="relative h-full rounded-[var(--radius-card)] bg-navy-2 p-7 pt-12 odd:-rotate-1 even:rotate-1 transition-transform duration-300 hover:rotate-0">
            <span aria-hidden className="absolute left-6 top-1 font-brush text-7xl leading-none text-pink">“</span>
            <blockquote className="text-xl font-semibold text-cream">{t(item.quote)}</blockquote>
            <figcaption className="mt-5 font-brush text-2xl text-mango">
              {item.name}
              <span className="ml-2 font-sans text-base font-normal text-mist">· {t(item.event)}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
