import type { L } from '@/lib/i18n';

/**
 * BUSINESS DETAILS
 * Lines marked VERIFY were read off photos of the trucks or taken from the brief.
 * Confirm each one with HillyBilly before launch (see README → Launch checklist).
 */
export const site = {
  name: 'HillyBilly Foods',
  legalName: 'HillyBilly Foods', // VERIFY: exact company name for Impressum
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://www.hillybillyfoods.de', // VERIFY: final domain
  phone: '+49 1578 5088103', // VERIFY: from the Corndogs truck
  whatsapp: '4915785088103', // VERIFY: WhatsApp Business number, digits only
  email: 'info@hillybillycorndogs.com', // VERIFY: partly visible on the truck — confirm the catering inbox
  serviceArea: {
    de: 'Baden-Württemberg und Umgebung',
    en: 'Baden-Württemberg and surrounding regions',
  } satisfies L, // VERIFY
  social: {
    instagram: 'https://www.instagram.com/hillybillycorndogs/',
  },
};

/**
 * Trust facts shown under the hero. Only add numbers HillyBilly can back up
 * (years trading, events served, reply time). Nothing here is a statistic yet on purpose.
 */
export const trustFacts: { title: L; text: L }[] = [
  {
    title: { de: 'Mehrere Küchen, eine Buchung', en: 'Several cuisines, one booking' },
    text: { de: 'Kombiniere Konzepte ganz nach deinen Gästen.', en: 'Combine concepts to suit your guests.' },
  },
  {
    title: { de: 'Frisch vor Ort gekocht', en: 'Cooked fresh on site' },
    text: { de: 'Nichts vorgekocht und warmgehalten.', en: 'Nothing pre-cooked and kept warm.' },
  },
  {
    title: { de: 'Hochzeit bis Firmenfest', en: 'Weddings to company parties' },
    text: { de: 'Auch Geburtstage, Jubiläen und Festivals.', en: 'Plus birthdays, anniversaries and festivals.' },
  },
  {
    title: { de: 'Ein Ansprechpartner', en: 'One person to talk to' },
    text: { de: 'Von der Anfrage bis zum letzten Teller.', en: 'From first request to the last plate.' },
  },
];
