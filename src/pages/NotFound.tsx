import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { Halftone } from '@/components/sections/Common';
import { useLang, useT } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';

export default function NotFound() {
  const lang = useLang();
  const t = useT();
  return (
    <section className="theme-dark relative overflow-hidden bg-navy text-cream">
      <title>404 | HillyBilly Foods</title>
      <meta name="robots" content="noindex" />
      <Halftone />
      <div className="container-x relative grid items-center gap-10 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr]">
        <div>
        <p className="tape -rotate-2 text-2xl">404</p>
        <h1 className="mt-6 text-display-1">{t({ de: 'Diese Seite gibt es nicht', en: 'This page doesn’t exist' })}</h1>
        <p className="mt-5 max-w-[50ch] text-lg text-mist">
          {t({
            de: 'Vielleicht wurde sie verschoben. Hier geht’s zu unseren Foodkonzepten oder direkt zur Catering-Anfrage.',
            en: 'It may have moved. Head to our food concepts or go straight to the catering request.',
          })}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="onDark" size="lg"><Link to={pathFor('request', lang)}>{t({ de: 'Catering anfragen', en: 'Request catering' })}</Link></Button>
          <Button asChild variant="outlineOnDark" size="lg"><Link to={pathFor('concepts', lang)}>{t({ de: 'Foodkonzepte', en: 'Food concepts' })}</Link></Button>
        </div>
        </div>
        <div aria-hidden className="hidden justify-center lg:flex">
          <Logo className="animate-wobble h-64 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" />
        </div>
      </div>
    </section>
  );
}
