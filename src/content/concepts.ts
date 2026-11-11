import type { L } from '@/lib/i18n';
import type { MediaKey } from './media';

/**
 * FOOD CONCEPTS — the single source of truth.
 *
 * Adding a concept here automatically adds:
 *  - a card on the homepage and the concepts overview
 *  - its own detail page (/de/foodkonzepte/<slug>, /en/food-concepts/<slug>)
 *  - an option in step 3 of the catering request form
 *  - a footer link, sitemap entry and structured data
 * No layout changes needed. Set `status: 'archived'` to hide one without deleting it.
 *
 * Dietary tags: only add a tag once the kitchen has confirmed it for that dish.
 * Prices: leave `price` empty until the basis (per person / VAT / minimum) is approved.
 */

export type Diet = 'vegetarian' | 'vegan' | 'halal' | 'glutenFree' | 'spicy';

export type Dish = {
  name: L;
  description: L;
  diet?: Diet[];
  price?: string;
};

export type Concept = {
  slug: string;
  name: string;
  status: 'active' | 'new' | 'archived';
  /** Concept accent colour — used for its card edge, tags and detail-page hero */
  accent: string;
  /** Text colour that reads on the accent (checked for 4.5:1) */
  onAccent: string;
  cuisine: L;
  tagline: L;
  pitch: L;
  image?: MediaKey;
  logo?: MediaKey;
  gallery: MediaKey[];
  dishes: Dish[];
  formats: L[];
  goodFor: L[];
  power: { amps?: 16 | 32; note: L };
  allergens: L;
  instagram?: string;
};

const allergenDefault: L = {
  de: 'Allergene und Zusatzstoffe sind pro Gericht dokumentiert. Wir schicken dir die aktuelle Liste mit dem Angebot oder du fragst direkt am Truck.',
  en: 'Allergens and additives are documented for every dish. We send the current list with your quote, or just ask at the truck.',
};

const powerToConfirm: L = {
  de: 'Der Strombedarf hängt vom Aufbau ab. Wir bestätigen ihn mit deinem Angebot.',
  en: 'Power needs depend on the setup. We confirm them with your quote.',
};

export const concepts: Concept[] = [
  {
    slug: 'hillybilly-corndogs',
    name: 'HillyBilly Corndogs',
    status: 'active',
    accent: '#B0127E',
    onAccent: '#FFFFFF',
    cuisine: { de: 'Korean Corndogs', en: 'Korean corndogs' },
    tagline: { de: 'Knusprige Korean Corndogs, frisch frittiert', en: 'Crispy Korean corndogs, fried to order' },
    pitch: {
      de: 'Unser Original im pinken Truck: Korean Corndogs mit knuspriger Panade, dazu Saucen zum Selbstwählen und Waffelpommes. Serviert von unserem Team im Fifties-Diner-Look — ein Hingucker auf jedem Event.',
      en: 'Where it all started, in the pink truck: Korean corndogs in a crunchy coating, a choice of sauces and waffle fries. Served by our team in 1950s diner style — a crowd magnet at any event.',
    },
    image: 'corndogInHand',
    gallery: ['corndogsPotatoClassic', 'corndogsTruck', 'corndogsTeamTruck', 'corndogsTeamFour'],
    dishes: [
      { name: { de: 'Classic Corndog', en: 'Classic corndog' }, description: { de: 'Würstchen im Teigmantel mit Panko-Kruste, Ketchup und Mayo.', en: 'Sausage in batter with a panko crust, ketchup and mayo.' } },
      { name: { de: 'Potato Corndog', en: 'Potato corndog' }, description: { de: 'Mit Kartoffelwürfeln ummantelt, extra knusprig.', en: 'Coated in diced potato for extra crunch.' } },
      { name: { de: 'Gitter-Pommes', en: 'Waffle fries' }, description: { de: 'Die perfekte Beilage zum Teilen.', en: 'The perfect side to share.' } },
      { name: { de: 'Mexican Nachos', en: 'Mexican nachos' }, description: { de: 'Mit Salsa oder Guacamole.', en: 'With salsa or guacamole.' } },
    ],
    formats: [
      { de: 'Foodtruck vor Ort', en: 'Food truck on site' },
      { de: 'Service im Fifties-Look', en: '1950s-style service' },
    ],
    goodFor: [
      { de: 'Festivals und Stadtfeste', en: 'Festivals and town fairs' },
      { de: 'Firmenfeiern', en: 'Company parties' },
      { de: 'Geburtstage und Jubiläen', en: 'Birthdays and anniversaries' },
    ],
    power: {
      amps: 32,
      note: { de: 'Der Corndogs-Truck braucht einen 32A-CEE-Anschluss.', en: 'The Corndogs truck needs a 32A CEE connection.' },
    },
    allergens: allergenDefault,
    instagram: 'https://www.instagram.com/hillybillycorndogs/',
  },
  {
    slug: 'momolaya',
    name: 'Momolaya',
    status: 'active',
    accent: '#7A1F2B',
    onAccent: '#FFFFFF',
    cuisine: { de: 'Nepalesische Momos', en: 'Nepali momos' },
    tagline: { de: 'Handgefaltete Momos aus dem Himalaya', en: 'Hand-folded momos from the Himalayas' },
    pitch: {
      de: 'Momolaya bringt nepalesisches Streetfood auf dein Event: gedämpfte Teigtaschen, jede einzeln von Hand gefaltet, mit hausgemachten Chutneys von mild bis richtig scharf.',
      en: 'Momolaya brings Nepali street food to your event: steamed dumplings, each one folded by hand, with homemade chutneys from mild to properly hot.',
    },
    image: 'momoBoat',
    logo: 'momolayaLogo',
    gallery: ['momolayaChef', 'momoTwoPlates', 'momolayaTrailer'],
    dishes: [
      { name: { de: 'Hähnchen-Momo', en: 'Chicken momo' }, description: { de: 'Saftiges Hähnchen mit nepalesischen Masalas, gedämpft.', en: 'Juicy chicken with Nepali masalas, steamed.' } },
      { name: { de: 'Rindfleisch-Momo', en: 'Beef momo' }, description: { de: 'Würziges Rinderhack, von Hand gefaltet.', en: 'Spiced minced beef, folded by hand.' } },
      { name: { de: 'Vegetarische Momo', en: 'Vegetable momo' }, description: { de: 'Gartenfrisches Gemüse und Kräuter.', en: 'Fresh vegetables and herbs.' }, diet: ['vegetarian'] },
      { name: { de: 'Tomaten-Chutney', en: 'Tomato chutney' }, description: { de: 'Über offener Flamme geröstete Tomaten mit Sesam. Mild.', en: 'Fire-roasted tomatoes with sesame. Mild.' } },
      { name: { de: 'Chili-Knoblauch-Chutney', en: 'Chilli garlic chutney' }, description: { de: 'Rauchig, kräftig, mit ordentlich Schärfe.', en: 'Smoky and punchy, with real heat.' }, diet: ['spicy'] },
    ],
    formats: [
      { de: 'Verkaufsanhänger vor Ort', en: 'Food trailer on site' },
      { de: 'Frisch gedämpft in Portionen', en: 'Steamed fresh in portions' },
    ],
    goodFor: [
      { de: 'Straßenfeste und Märkte', en: 'Street fairs and markets' },
      { de: 'Firmen-Lunch', en: 'Company lunches' },
      { de: 'Hochzeiten mit internationalen Gästen', en: 'Weddings with international guests' },
    ],
    power: { note: powerToConfirm },
    allergens: allergenDefault,
  },
  {
    slug: 'curry-on-wheels',
    name: 'Curry on Wheels',
    status: 'active',
    accent: '#16BFA8',
    onAccent: '#101B33',
    cuisine: { de: 'Indisch & Pakistanisch', en: 'Indian & Pakistani' },
    tagline: { de: 'Currys, Chaat und Mango Lassi', en: 'Curries, chaat and mango lassi' },
    pitch: {
      de: 'Curry on Wheels kocht indische und pakistanische Klassiker: cremiges Butter Chicken, Daal, knusprige Pakoras und frischen Kichererbsen-Chaat — dazu Mango Lassi.',
      en: 'Curry on Wheels cooks Indian and Pakistani classics: creamy butter chicken, daal, crispy pakoras and fresh chickpea chaat — with mango lassi on the side.',
    },
    image: 'chaatBowl',
    logo: 'curryLogo',
    gallery: ['curryTeam', 'mangoLassi'],
    dishes: [
      { name: { de: 'Butter Chicken mit Reis', en: 'Butter chicken with rice' }, description: { de: 'Zartes Hähnchen in cremiger Tomaten-Butter-Sauce.', en: 'Tender chicken in a creamy tomato-butter sauce.' } },
      { name: { de: 'Daal mit Reis', en: 'Daal with rice' }, description: { de: 'Linsen-Curry, langsam gekocht.', en: 'Slow-cooked lentil curry.' }, diet: ['vegetarian'] },
      { name: { de: 'Pakoras', en: 'Pakoras' }, description: { de: 'Knuspriges Gemüse im Kichererbsen-Teig.', en: 'Crispy vegetables in chickpea batter.' }, diet: ['vegetarian'] },
      { name: { de: 'Kichererbsen-Chaat', en: 'Chickpea chaat' }, description: { de: 'Mit Joghurt, Chutney, Zwiebeln und Sev.', en: 'With yoghurt, chutney, onion and sev.' }, diet: ['vegetarian'] },
      { name: { de: 'Mango Lassi', en: 'Mango lassi' }, description: { de: 'Joghurtgetränk mit Mango.', en: 'Mango yoghurt drink.' }, diet: ['vegetarian'] },
    ],
    formats: [
      { de: 'Verkaufsanhänger vor Ort', en: 'Food trailer on site' },
      { de: 'Mittagsservice', en: 'Lunch service' },
    ],
    goodFor: [
      { de: 'Firmen-Lunch und Kantinen-Tage', en: 'Company lunches and canteen days' },
      { de: 'Hochzeiten', en: 'Weddings' },
      { de: 'Schul- und Uni-Events', en: 'School and university events' },
    ],
    power: { note: powerToConfirm },
    allergens: allergenDefault,
    instagram: 'https://www.instagram.com/curry_on_wheels/',
  },
  {
    slug: 'hillybilly-waffles',
    name: 'HillyBilly Waffles',
    status: 'active',
    accent: '#FFBE0B',
    onAccent: '#101B33',
    cuisine: { de: 'Waffeln am Stiel', en: 'Waffles on a stick' },
    tagline: { de: 'Süße Waffeln am Stiel mit Toppings', en: 'Sweet waffles on a stick, loaded with toppings' },
    pitch: {
      de: 'Frisch gebackene Waffeln am Stiel — mit Erdbeersauce und weißer Schokolade, pinker Glasur und Marshmallows oder Schoko-Crunch. Der süße Abschluss für jedes Event.',
      en: 'Freshly baked waffles on a stick — with strawberry sauce and white chocolate, pink glaze and marshmallows, or chocolate crunch. The sweet finish for any event.',
    },
    image: 'waffleSticksCounter',
    gallery: ['waffleStickServer'],
    dishes: [
      { name: { de: 'Erdbeer & weiße Schokolade', en: 'Strawberry & white chocolate' }, description: { de: 'Mit Erdbeersauce, Schokosplittern und Kokos.', en: 'With strawberry sauce, chocolate shavings and coconut.' }, diet: ['vegetarian'] },
      { name: { de: 'Unicorn', en: 'Unicorn' }, description: { de: 'Pinke Glasur und bunte Mini-Marshmallows.', en: 'Pink glaze and colourful mini marshmallows.' }, diet: ['vegetarian'] },
      { name: { de: 'Schoko-Crunch', en: 'Chocolate crunch' }, description: { de: 'Schokolade und Keks-Crumble.', en: 'Chocolate and cookie crumble.' }, diet: ['vegetarian'] },
    ],
    formats: [{ de: 'Dessert-Station vor Ort', en: 'Dessert station on site' }],
    goodFor: [
      { de: 'Kindergeburtstage', en: "Children's birthdays" },
      { de: 'Hochzeiten als Dessert', en: 'Weddings, as dessert' },
      { de: 'Weihnachtsmärkte', en: 'Christmas markets' },
    ],
    power: { note: powerToConfirm },
    allergens: allergenDefault,
  },
  {
    slug: 'korean-streetfood',
    name: 'Korean Streetfood',
    status: 'new',
    accent: '#C62834',
    onAccent: '#FFFFFF',
    cuisine: { de: 'Koreanisch', en: 'Korean' },
    tagline: { de: 'Korean Fried Chicken, Bowls und Spezialitäten', en: 'Korean fried chicken, bowls and specialities' },
    pitch: {
      de: 'Knuspriges Korean Fried Chicken, Bowls und weitere koreanische Spezialitäten — ideal in Kombination mit unseren Corndogs.',
      en: 'Crispy Korean fried chicken, bowls and more Korean specialities — a natural pairing with our corndogs.',
    },
    gallery: [],
    dishes: [
      { name: { de: 'Korean Fried Chicken', en: 'Korean fried chicken' }, description: { de: 'Doppelt frittiert, glasiert.', en: 'Double-fried and glazed.' } },
      { name: { de: 'Korean Bowls', en: 'Korean bowls' }, description: { de: 'Reis, Gemüse und Toppings.', en: 'Rice, vegetables and toppings.' } },
    ],
    formats: [{ de: 'Auf Anfrage', en: 'On request' }],
    goodFor: [{ de: 'Festivals', en: 'Festivals' }, { de: 'Firmenfeiern', en: 'Company parties' }],
    power: { note: powerToConfirm },
    allergens: allergenDefault,
  },
  {
    slug: 'american-burgers',
    name: 'American Burgers',
    status: 'new',
    accent: '#F4A100',
    onAccent: '#101B33',
    cuisine: { de: 'Amerikanisch', en: 'American' },
    tagline: { de: 'Burger, Hotdogs und Pommes', en: 'Burgers, hot dogs and fries' },
    pitch: {
      de: 'Amerikanische Klassiker frisch vom Grill: Burger, Hotdogs und Pommes für große Gästezahlen.',
      en: 'American classics fresh off the grill: burgers, hot dogs and fries for big crowds.',
    },
    gallery: [],
    dishes: [
      { name: { de: 'Burger', en: 'Burgers' }, description: { de: 'Frisch gegrillt.', en: 'Grilled to order.' } },
      { name: { de: 'Hotdogs', en: 'Hot dogs' }, description: { de: 'Mit klassischen Toppings.', en: 'With classic toppings.' } },
      { name: { de: 'Pommes', en: 'Fries' }, description: { de: 'Knusprig, zum Teilen.', en: 'Crispy, for sharing.' } },
    ],
    formats: [{ de: 'Auf Anfrage', en: 'On request' }],
    goodFor: [{ de: 'US-Base-Events', en: 'US base events' }, { de: 'Festivals', en: 'Festivals' }],
    power: { note: powerToConfirm },
    allergens: allergenDefault,
  },
  {
    slug: 'mac-and-cheese',
    name: 'Mac & Cheese Foodtruck',
    status: 'new',
    accent: '#7B4FD6',
    onAccent: '#FFFFFF',
    cuisine: { de: 'American Comfort Food', en: 'American comfort food' },
    tagline: { de: 'Cremiges Mac & Cheese mit Toppings', en: 'Creamy mac & cheese with toppings' },
    pitch: {
      de: 'Amerikanisches Comfort Food: cremiges Mac & Cheese mit wechselnden Toppings — wärmend, sättigend und beliebt bei allen Altersgruppen.',
      en: 'American comfort food: creamy mac & cheese with rotating toppings — warming, filling and loved by every age group.',
    },
    gallery: [],
    dishes: [
      { name: { de: 'Mac & Cheese Classic', en: 'Classic mac & cheese' }, description: { de: 'Mit Käsekruste.', en: 'With a cheese crust.' } },
      { name: { de: 'Mac & Cheese mit Toppings', en: 'Loaded mac & cheese' }, description: { de: 'Wechselnde Toppings.', en: 'Rotating toppings.' } },
    ],
    formats: [{ de: 'Foodtruck vor Ort', en: 'Food truck on site' }],
    goodFor: [{ de: 'Weihnachtsmärkte', en: 'Christmas markets' }, { de: 'Schul-Events', en: 'School events' }],
    power: { note: powerToConfirm },
    allergens: allergenDefault,
  },
];

export const visibleConcepts = concepts.filter((c) => c.status !== 'archived');
export const getConcept = (slug: string) => visibleConcepts.find((c) => c.slug === slug);
