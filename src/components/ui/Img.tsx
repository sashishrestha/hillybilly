import { media, type MediaKey } from '@/content/media';
import { useT } from '@/lib/i18n';
import { cn } from '@/lib/cn';

type Props = {
  k: MediaKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
  decorative?: boolean;
};

/** Every photo goes through here: intrinsic size (no layout shift), lazy loading, translated alt text. */
export function Img({ k, className, priority, decorative }: Props) {
  const t = useT();
  const m = media[k];
  return (
    <img
      src={m.src}
      width={m.w}
      height={m.h}
      alt={decorative ? '' : t(m.alt)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={cn('img-fade block h-full w-full object-cover', className)}
    />
  );
}
