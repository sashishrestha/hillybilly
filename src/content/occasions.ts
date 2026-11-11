import type { L } from '@/lib/i18n';
import type { MediaKey } from './media';

export type OccasionIcon = 'users' | 'heart' | 'gift' | 'music' | 'graduation' | 'flag';

export type Occasion = {
  id: string;
  /** Form value sent with a catering request */
  formValue: 'corporate' | 'wedding' | 'private' | 'festival' | 'school' | 'usBase';
  slug: L;
  title: L;
  short: L;
  intro: L;
  points: L[];
  icon: OccasionIcon;
  image?: MediaKey;
  seoTitle: L;
  seoDescription: L;
};

/** Catering occasions — each gets a landing page at /de/catering/<slug> and /en/catering/<slug>. */
export const occasions: Occasion[] = [
  {
    id: 'corporate',
    formValue: 'corporate',
    slug: { de: 'firmenfeier-catering', en: 'corporate-catering' },
    title: { de: 'Firmenfeiern & Business-Events', en: 'Corporate events' },
    short: { de: 'Sommerfest, Mitarbeiter-Lunch, Messe, Jubiläum', en: 'Summer parties, staff lunches, trade fairs, anniversaries' },
    intro: {
      de: 'Mach dein nächstes Firmenevent zu etwas, worüber das Team noch lange spricht — mit frisch zubereitetem Streetfood, flexiblen Menüs und einem Service, der zu euch passt.',
      en: 'Make your next company event one the team keeps talking about — with freshly prepared street food, flexible menus and a service format that fits your team.',
    },
    points: [
      { de: 'Mehrere Küchen an einem Ort — für unterschiedliche Geschmäcker und Ernährungsweisen', en: 'Several cuisines in one place — for different tastes and diets' },
      { de: 'Abrechnung als Gesamtpaket oder pro Gast', en: 'Billed as one package or per guest' },
      { de: 'Eine Ansprechperson für alle Konzepte', en: 'One contact person for every concept' },
    ],
    icon: 'users',
    image: 'curryTeam',
    seoTitle: { de: 'Firmenfeier Catering mit Foodtrucks', en: 'Corporate catering with food trucks' },
    seoDescription: {
      de: 'Streetfood Catering für Firmenfeiern, Sommerfeste und Mitarbeiter-Events: Corndogs, Momos, Currys und mehr — frisch vor Ort zubereitet.',
      en: 'Street food catering for company parties, summer events and staff days: corndogs, momos, curries and more — cooked fresh on site.',
    },
  },
  {
    id: 'wedding',
    formValue: 'wedding',
    slug: { de: 'hochzeit-foodtruck', en: 'wedding-food-truck' },
    title: { de: 'Hochzeiten', en: 'Weddings' },
    short: { de: 'Mitternachtssnack, Dessert-Station, Hauptgang', en: 'Late-night snack, dessert station, main course' },
    intro: {
      de: 'Ein Foodtruck auf der Hochzeit sorgt für entspannte Stimmung. Ob als Hauptgang, Mitternachtssnack oder Waffel-Station zum Kaffee — wir planen es mit euch.',
      en: 'A food truck at your wedding keeps the mood relaxed. Main course, late-night snack or a waffle station with the coffee — we plan it with you.',
    },
    points: [
      { de: 'Kombinierbare Konzepte für internationale Gäste', en: 'Mix-and-match concepts for international guests' },
      { de: 'Vegetarische Optionen in mehreren Konzepten', en: 'Vegetarian options across several concepts' },
      { de: 'Abstimmung mit Location und Hochzeitsplanung', en: 'We coordinate with your venue and planner' },
    ],
    icon: 'heart',
    image: 'waffleSticksCounter',
    seoTitle: { de: 'Foodtruck für die Hochzeit', en: 'Wedding food truck catering' },
    seoDescription: {
      de: 'Foodtruck Catering für eure Hochzeit: als Hauptgang, Mitternachtssnack oder süße Waffel-Station. Jetzt unverbindlich anfragen.',
      en: 'Food truck catering for your wedding: as a main course, late-night snack or sweet waffle station. Request a free quote.',
    },
  },
  {
    id: 'private',
    formValue: 'private',
    slug: { de: 'private-feier-catering', en: 'private-party-catering' },
    title: { de: 'Private Feiern', en: 'Private parties' },
    short: { de: 'Geburtstag, Jubiläum, Gartenparty', en: 'Birthdays, anniversaries, garden parties' },
    intro: {
      de: 'Geburtstag, Jubiläum oder Gartenparty: Wir kommen mit Truck oder Anhänger zu dir und kochen frisch vor Ort — du kümmerst dich um deine Gäste.',
      en: 'Birthday, anniversary or garden party: we come to you with a truck or trailer and cook fresh on site — you look after your guests.',
    },
    points: [
      { de: 'Auch für kleinere Gästezahlen anfragen', en: 'Smaller guest numbers welcome — just ask' },
      { de: 'Wir klären Stellfläche und Strom vorab mit dir', en: 'We check space and power with you beforehand' },
      { de: 'Süßes für Kinder mit HillyBilly Waffles', en: 'Sweet treats for kids with HillyBilly Waffles' },
    ],
    icon: 'gift',
    image: 'waffleStickServer',
    seoTitle: { de: 'Foodtruck für Geburtstag & private Feier', en: 'Food truck for birthdays & private parties' },
    seoDescription: {
      de: 'Foodtruck mieten für Geburtstag, Jubiläum oder Gartenparty — frisches Streetfood direkt vor Ort.',
      en: 'Hire a food truck for birthdays, anniversaries or garden parties — fresh street food right on site.',
    },
  },
  {
    id: 'festival',
    formValue: 'festival',
    slug: { de: 'festival-markt-catering', en: 'festivals-and-markets' },
    title: { de: 'Festivals & Märkte', en: 'Festivals & markets' },
    short: { de: 'Stadtfest, Streetfood-Markt, Weihnachtsmarkt', en: 'Town fairs, street food markets, Christmas markets' },
    intro: {
      de: 'Für Veranstalter: Mit mehreren Konzepten aus einer Hand bekommst du kulinarische Vielfalt mit nur einem Vertragspartner.',
      en: 'For organisers: several concepts from one company give you culinary variety with a single contract partner.',
    },
    points: [
      { de: 'Mehrere Stände, eine Abrechnung', en: 'Several stands, one invoice' },
      { de: 'Erfahrung mit großem Andrang', en: 'Used to long queues and big crowds' },
      { de: 'Konzept-spezifische Technikangaben auf Anfrage', en: 'Setup and power specs per concept on request' },
    ],
    icon: 'music',
    image: 'momolayaTrailer',
    seoTitle: { de: 'Streetfood für Festivals & Märkte', en: 'Street food for festivals & markets' },
    seoDescription: {
      de: 'Streetfood Catering für Festivals, Stadtfeste und Märkte: mehrere Foodkonzepte, ein Ansprechpartner.',
      en: 'Street food for festivals, town fairs and markets: multiple food concepts, one contact.',
    },
  },
  {
    id: 'school',
    formValue: 'school',
    slug: { de: 'schule-uni-catering', en: 'schools-and-universities' },
    title: { de: 'Schulen & Unis', en: 'Schools & universities' },
    short: { de: 'Schulfest, Campus-Tag, Abschlussfeier', en: 'School fairs, campus days, graduations' },
    intro: {
      de: 'Schulfest, Campus-Event oder Abschlussfeier: schnelle Ausgabe, faire Portionen und Gerichte, die junge Gäste wirklich mögen.',
      en: 'School fairs, campus events or graduations: fast service, fair portions and food young guests actually love.',
    },
    points: [
      { de: 'Schnelle Ausgabe bei vielen Gästen', en: 'Fast service for big numbers' },
      { de: 'Vegetarische Gerichte verfügbar', en: 'Vegetarian dishes available' },
      { de: 'Abstimmung mit Schulleitung oder Fachschaft', en: 'We coordinate with staff or student councils' },
    ],
    icon: 'graduation',
    image: 'curryTeam',
    seoTitle: { de: 'Catering für Schulfest & Uni-Event', en: 'Catering for schools & universities' },
    seoDescription: {
      de: 'Foodtruck Catering für Schulfeste, Campus-Tage und Abschlussfeiern.',
      en: 'Food truck catering for school fairs, campus days and graduations.',
    },
  },
  {
    id: 'usBase',
    formValue: 'usBase',
    slug: { de: 'us-base-events', en: 'us-base-events' },
    title: { de: 'US-Base-Events', en: 'US base events' },
    short: { de: 'Feste und Feiern auf US-Stützpunkten', en: 'Celebrations on US military bases' },
    intro: {
      de: 'Wir catern Veranstaltungen auf US-Stützpunkten — mit amerikanischen Klassikern und internationaler Küche.',
      en: 'We cater events on US military bases — with American classics and international food.',
    },
    points: [
      { de: 'Kommunikation auf Deutsch und Englisch', en: 'Communication in German and English' },
      { de: 'Wir klären Zugangsvoraussetzungen vorab mit dir', en: 'We sort out access requirements with you in advance' },
      { de: 'Amerikanische und internationale Konzepte', en: 'American and international concepts' },
    ],
    icon: 'flag',
    image: 'corndogsTeamFour',
    seoTitle: { de: 'Catering für US-Base-Events', en: 'Catering for US military base events' },
    seoDescription: {
      de: 'Foodtruck Catering für Veranstaltungen auf US-Stützpunkten in Deutschland.',
      en: 'Food truck catering for events on US military bases in Germany.',
    },
  },
];

export const getOccasionById = (id: string) => occasions.find((o) => o.id === id);
export const getOccasionBySlug = (slug: string) =>
  occasions.find((o) => o.slug.de === slug || o.slug.en === slug);
