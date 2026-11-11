import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { visibleConcepts } from '@/content/concepts';
import { occasions } from '@/content/occasions';
import { site } from '@/content/site';
import { useLang, useT } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';
import { CameraIcon, MailIcon, MessageCircleIcon, PhoneIcon } from '@/components/animate-ui/icons';

export function Footer() {
  const lang = useLang();
  const t = useT();
  const linkCls = 'text-mist hover:text-cream transition-colors';

  return (
    <footer className="theme-dark bg-navy text-cream" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Link to={pathFor('home', lang)} className="group/logo inline-block" aria-label="HillyBilly Foods – Home">
            <Logo className="h-28" />
          </Link>
          <p className="mt-5 text-mist">
            {t({
              de: 'Streetfood, Catering und Foodkonzepte für Events jeder Größe.',
              en: 'Street food, catering and food concepts for events of every size.',
            })}
          </p>
          <p className="mt-2 text-mist">{t(site.serviceArea)}</p>
          <ul className="mt-6 space-y-2">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className={`${linkCls} inline-flex items-center gap-2`}>
                <PhoneIcon size={18} aria-hidden /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} className={`${linkCls} inline-flex items-center gap-2`} rel="noopener">
                <MessageCircleIcon size={18} aria-hidden /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`${linkCls} inline-flex items-center gap-2`}>
                <MailIcon size={18} aria-hidden /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.social.instagram} className={`${linkCls} inline-flex items-center gap-2`} rel="noopener">
                <CameraIcon size={18} aria-hidden /> Instagram
              </a>
            </li>
          </ul>
        </div>

        <nav aria-labelledby="f-concepts">
          <h3 id="f-concepts" className="font-brush text-2xl font-normal text-mango">{t({ de: 'Foodkonzepte', en: 'Food concepts' })}</h3>
          <ul className="mt-4 space-y-2">
            {visibleConcepts.map((c) => (
              <li key={c.slug}>
                <Link to={pathFor('concept', lang, { slug: c.slug })} className={linkCls}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="f-catering">
          <h3 id="f-catering" className="font-brush text-2xl font-normal text-mango">{t({ de: 'Catering & Events', en: 'Catering & events' })}</h3>
          <ul className="mt-4 space-y-2">
            {occasions.map((o) => (
              <li key={o.id}>
                <Link to={pathFor('occasion', lang, { occasion: o.id })} className={linkCls}>{t(o.title)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="f-more">
          <h3 id="f-more" className="font-brush text-2xl font-normal text-mango">HillyBilly Foods</h3>
          <ul className="mt-4 space-y-2">
            <li><Link to={pathFor('about', lang)} className={linkCls}>{t({ de: 'Über uns', en: 'About us' })}</Link></li>
            <li><Link to={pathFor('gallery', lang)} className={linkCls}>{t({ de: 'Galerie', en: 'Gallery' })}</Link></li>
            <li><Link to={pathFor('locations', lang)} className={linkCls}>{t({ de: 'Standorte & Termine', en: 'Locations & dates' })}</Link></li>
            <li><Link to={pathFor('contact', lang)} className={linkCls}>{t({ de: 'Kontakt & Partnerschaften', en: 'Contact & partnerships' })}</Link></li>
            <li><Link to={pathFor('request', lang)} className={linkCls}>{t({ de: 'Catering anfragen', en: 'Request catering' })}</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col gap-3 py-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
            <span className="ml-3 font-brush text-lg text-mango">{t({ de: 'Gutes Essen bringt Menschen zusammen.', en: 'Good food brings people together.' })}</span>
          </p>
          <ul className="flex gap-5">
            <li><Link to={pathFor('imprint', lang)} className="hover:text-cream">{t({ de: 'Impressum', en: 'Legal notice' })}</Link></li>
            <li><Link to={pathFor('privacy', lang)} className="hover:text-cream">{t({ de: 'Datenschutz', en: 'Privacy policy' })}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
