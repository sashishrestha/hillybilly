import { Link } from 'react-router-dom';
import { AnimateIcon } from '@animate-ui/react/icons';
import { ArrowRightIcon, MailIcon, MessageCircleIcon, PhoneIcon, SparklesIcon, UsersIcon } from '@/components/animate-ui/icons';
import { Seo } from '@/components/layout/Seo';
import { Button } from '@/components/ui/Button';
import { Halftone, PageHero, Scribble } from '@/components/sections/Common';
import { site } from '@/content/site';
import { useLang, useT } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';

export default function Contact() {
  const lang = useLang();
  const t = useT();
  const partner = encodeURIComponent(t({ de: 'Partnerschaft mit HillyBilly Foods', en: 'Partnership with HillyBilly Foods' }));
  const channels = [
    { icon: PhoneIcon, label: t({ de: 'Anrufen', en: 'Call' }), value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
    { icon: MessageCircleIcon, label: 'WhatsApp', value: t({ de: 'Nachricht schreiben', en: 'Send a message' }), href: `https://wa.me/${site.whatsapp}` },
    { icon: MailIcon, label: t({ de: 'E-Mail', en: 'Email' }), value: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <>
      <Seo
        route="contact"
        title={t({ de: 'Kontakt & Partnerschaften', en: 'Contact & partnerships' })}
        description={t({
          de: 'Kontakt zu HillyBilly Foods: Catering-Anfragen, Veranstalter, Kooperationen und neue Foodkonzepte.',
          en: 'Contact HillyBilly Foods: catering requests, event organisers, partnerships and new food concepts.',
        })}
      />
      <PageHero
        title={t({ de: 'Sprich mit uns', en: 'Talk to us' })}
        intro={t({
          de: 'Für Catering geht es am schnellsten über das Anfrageformular. Für alles andere erreichst du uns hier.',
          en: 'For catering, the request form is fastest. For everything else, here’s how to reach us.',
        })}
      >
        <Button asChild variant="onDark" size="lg" className="mt-8">
          <Link to={pathFor('request', lang)}>{t({ de: 'Catering anfragen', en: 'Request catering' })}</Link>
        </Button>
      </PageHero>
      <section aria-labelledby="channels-heading" className="py-16 md:py-24">
        <div className="container-x">
          <h2 id="channels-heading" className="sr-only">{t({ de: 'Kontaktwege', en: 'Ways to reach us' })}</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {channels.map(({ icon: Icon, label, value, href }, i) => (
              <li key={label}>
                <AnimateIcon animateOnHover asChild>
                  <a href={href} rel="noopener" className="group flex h-full flex-col gap-4 rounded-[var(--radius-card)] bg-navy-2 p-7 ring-1 ring-cream/10 transition-[box-shadow,translate] duration-300 hover:-translate-y-1.5 hover:ring-pink">
                    <span className={`grid size-14 place-items-center rounded-2xl bg-mango text-navy shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[var(--ease-spring)] group-hover:rotate-0 group-hover:scale-110 ${i % 2 ? 'rotate-3' : '-rotate-3'}`}>
                      <Icon size={28} aria-hidden />
                    </span>
                    <span className="display text-3xl">{label}</span>
                    <span className="break-all text-mist">{value}</span>
                    <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-2 font-bold text-pink opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
                      <ArrowRightIcon size={18} />
                    </span>
                  </a>
                </AnimateIcon>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="partner-heading" className="theme-dark relative overflow-hidden bg-navy py-16 text-cream md:py-24">
        <Halftone />
        <div className="container-x relative grid gap-10 md:grid-cols-2">
          <div>
            <p className="tape mb-4 -rotate-2 text-xl">{t({ de: 'Gemeinsam wachsen', en: 'Grow with us' })}</p>
            <h2 id="partner-heading" className="text-display-2">{t({ de: 'Partnerschaften', en: 'Partnerships' })}</h2>
            <Scribble className="mt-3" />
            <p className="mt-5 max-w-[50ch] text-lg text-mist">
              {t({
                de: 'HillyBilly Foods wächst. Wir freuen uns über Nachrichten von Veranstaltern, Locations, Unternehmen mit festen Standorten und Menschen mit eigenem Foodkonzept.',
                en: 'HillyBilly Foods is growing. We’d love to hear from organisers, venues, companies with regular sites and people with a food concept of their own.',
              })}
            </p>
          </div>
          <ul className="space-y-4">
            {[
              { icon: UsersIcon, title: { de: 'Veranstalter & Locations', en: 'Organisers & venues' }, text: { de: 'Mehrere Stände aus einer Hand für dein Festival oder deinen Markt.', en: 'Several stands from one company for your festival or market.' } },
              { icon: SparklesIcon, title: { de: 'Neue Foodkonzepte', en: 'New food concepts' }, text: { de: 'Du hast eine Küche, die zu uns passt? Erzähl uns davon.', en: 'Got a cuisine that fits our family? Tell us about it.' } },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title.en} className="group flex gap-4 rounded-[var(--radius-card)] bg-navy-2 p-6 ring-1 ring-cream/10 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:ring-mango">
                <span className="grid size-12 shrink-0 -rotate-3 place-items-center rounded-xl bg-mango text-navy shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[var(--ease-spring)] group-hover:rotate-3">
                  <Icon size={26} aria-hidden />
                </span>
                <div>
                  <h3 className="text-2xl">{t(title)}</h3>
                  <p className="mt-1 text-mist">{t(text)}</p>
                </div>
              </li>
            ))}
            <li>
              <Button asChild variant="onDark">
                <a href={`mailto:${site.email}?subject=${partner}`}>{t({ de: 'Partnerschaft anfragen', en: 'Ask about partnering' })}</a>
              </Button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
