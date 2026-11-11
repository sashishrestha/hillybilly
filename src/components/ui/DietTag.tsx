import type { Diet } from '@/content/concepts';
import { useT } from '@/lib/i18n';
import { FlameIcon, LeafIcon } from '@/components/animate-ui/icons';

const labels: Record<Diet, { de: string; en: string }> = {
  vegetarian: { de: 'Vegetarisch', en: 'Vegetarian' },
  vegan: { de: 'Vegan', en: 'Vegan' },
  halal: { de: 'Halal', en: 'Halal' },
  glutenFree: { de: 'Glutenfrei', en: 'Gluten-free' },
  spicy: { de: 'Scharf', en: 'Spicy' },
};

export function DietTag({ diet }: { diet: Diet }) {
  const t = useT();
  const spicy = diet === 'spicy';
  return (
    <span
      className={
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-semibold ' +
        (spicy ? 'bg-pink/15 text-pink' : 'bg-teal/15 text-teal')
      }
    >
      {spicy ? <FlameIcon size={14} aria-hidden /> : <LeafIcon size={14} aria-hidden />}
      {t(labels[diet])}
    </span>
  );
}
