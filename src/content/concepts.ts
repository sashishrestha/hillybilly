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
  menuHeading?: L;
  menuFooter?: L;
  story?: { heading: L; tagline: L; paragraphs: L[]; closing: L };
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
    cuisine: { de: 'Corndogs', en: 'Corndogs' },
    tagline: { de: 'Außen knusprig, innen cheesy – Streetfood mit Wow-Effekt!', en: 'Crispy outside, cheesy inside – street food with a wow effect!' },
    pitch: {
      de: 'Frisch frittierte Corndogs mit saftiger Wurst oder geschmolzenem Mozzarella. Ob klassisch, mit Ramen, Kartoffeln oder Süßkartoffeln – kombiniert mit leckeren Saucen ganz nach deinem Geschmack.\n\nServiert aus unserem auffälligen pinken Foodtruck – ein echtes Highlight auf jedem Event!',
      en: 'Freshly fried corndogs with a juicy sausage or melted mozzarella. Classic, with ramen, potato or sweet potato – paired with tasty sauces to suit your taste.\n\nServed from our eye-catching pink food truck – a real highlight at any event!',
    },
    image: 'corndogBox',
    gallery: ['corndogInHand', 'corndogsPotatoClassic', 'corndogsTruck', 'corndogsTeamTruck', 'corndogsTeamFour'],
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
    tagline: { de: 'Himalaya Streetfood mit Herz', en: 'Himalayan street food with heart' },
    pitch: {
      de: 'Handgefaltete Momos. Junge Ideen. Echter Geschmack.\n\nMomolaya bringt die köstliche Welt der nepalesischen und tibetischen Küche direkt zu dir! Unsere saftigen, handgefalteten Momos werden frisch gedämpft und mit aromatischen Chutneys serviert – ein besonderes Streetfood-Erlebnis voller Geschmack und Tradition.',
      en: 'Hand-folded momos. Young ideas. Real flavour.\n\nMomolaya brings the delicious world of Nepali and Tibetan cuisine straight to you! Our juicy, hand-folded momos are freshly steamed and served with aromatic chutneys – a special street food experience full of flavour and tradition.',
    },
    story: {
      heading: { de: 'Von Studentinnen mit Leidenschaft betrieben', en: 'Run with passion by female students' },
      tagline: { de: 'Jung. Engagiert. Voller Ideen.', en: 'Young. Committed. Full of ideas.' },
      paragraphs: [
        { de: 'Das Besondere an Momolaya? Hinter unserem Foodkonzept stehen motivierte Studentinnen, die mit Begeisterung, Kreativität und Teamgeist ihre Leidenschaft für Streetfood leben.', en: 'What makes Momolaya special? Behind our food concept are motivated female students who live their passion for street food with enthusiasm, creativity and team spirit.' },
        { de: 'Neben ihrem Studium bringen sie frische Ideen, jede Menge Energie und ihre persönliche Note in Momolaya ein. Sie übernehmen Verantwortung und zeigen, wie viel Leidenschaft und Unternehmergeist in der jungen Generation steckt.', en: 'Alongside their studies, they bring fresh ideas, plenty of energy and their personal touch to Momolaya. They take responsibility and show how much passion and entrepreneurial spirit the younger generation has.' },
        { de: 'Momolaya verbindet traditionelle Himalaya-Küche mit jungem, modernem Streetfood-Spirit.', en: 'Momolaya combines traditional Himalayan cuisine with a young, modern street food spirit.' },
      ],
      closing: { de: 'Momolaya – Made with Passion. Powered by Students', en: 'Momolaya – Made with Passion. Powered by Students' },
    },
    image: 'momoBoat',
    logo: 'momolayaLogo',
    gallery: ['momolayaChef', 'momoPlate', 'momoBeef', 'momoVeg', 'momoTwoPlates', 'momolayaTrailer'],
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
    gallery: ['curryTeam', 'curryChaatSign', 'curryTeamSelfie', 'curryTeamKitchen', 'mangoLassi'],
    menuHeading: { de: 'Unsere Streetfood-Highlights', en: 'Our street food highlights' },
    dishes: [
      { name: { de: 'Butter Chicken mit Reis', en: 'Butter chicken with rice' }, description: { de: 'Zartes Hähnchen in einer cremigen Tomaten-Butter-Sauce, verfeinert mit aromatischen Gewürzen.', en: 'Tender chicken in a creamy tomato-butter sauce, refined with aromatic spices.' } },
      { name: { de: 'Ginger Chicken mit Reis', en: 'Ginger chicken with rice' }, description: { de: 'Zartes Hähnchen mit frischem Ingwer, Tomaten und einer würzigen, aromatischen Sauce.', en: 'Tender chicken with fresh ginger, tomatoes and a spicy, aromatic sauce.' } },
      { name: { de: 'Chicken Palak mit Reis', en: 'Chicken palak with rice' }, description: { de: 'Saftiges Hähnchen in einer cremigen, würzigen Spinatsauce.', en: 'Juicy chicken in a creamy, spiced spinach sauce.' } },
      { name: { de: 'Daal mit Reis', en: 'Daal with rice' }, description: { de: 'Traditionelles Linsencurry, langsam gekocht und mit aromatischen Gewürzen verfeinert.', en: 'Traditional lentil curry, slow-cooked and refined with aromatic spices.' }, diet: ['vegetarian'] },
      { name: { de: 'Aloo Palak mit Reis', en: 'Aloo palak with rice' }, description: { de: 'Zarte Kartoffeln in würzigem Spinat, nach traditioneller Rezeptur zubereitet.', en: 'Tender potatoes in spiced spinach, prepared to a traditional recipe.' }, diet: ['vegetarian'] },
      { name: { de: 'Channa Masala mit Reis', en: 'Channa masala with rice' }, description: { de: 'Kichererbsen in einer herzhaften Tomaten-Curry-Sauce mit orientalischen Gewürzen.', en: 'Chickpeas in a hearty tomato curry sauce with oriental spices.' }, diet: ['vegetarian'] },
      { name: { de: 'Pakoras', en: 'Pakoras' }, description: { de: 'Goldbraun frittierte Gemüsehäppchen in einem knusprigen, würzigen Kichererbsenteig.', en: 'Golden-fried vegetable bites in a crispy, spiced chickpea batter.' }, diet: ['vegetarian'] },
      { name: { de: 'Samosas', en: 'Samosas' }, description: { de: 'Knusprige, goldbraune Teigtaschen mit einer herzhaft gewürzten Kartoffelfüllung.', en: 'Crispy, golden pastry pockets with a savoury spiced potato filling.' }, diet: ['vegetarian'] },
      { name: { de: 'Samosa Chaat', en: 'Samosa chaat' }, description: { de: 'Knusprige Samosas mit Kichererbsen, cremigem Joghurt, würzigen Chutneys und frischen Toppings.', en: 'Crispy samosas with chickpeas, creamy yoghurt, spiced chutneys and fresh toppings.' }, diet: ['vegetarian'] },
      { name: { de: 'Kichererbsen-Chaat', en: 'Chickpea chaat' }, description: { de: 'Würzige Kichererbsen mit Joghurt, Chutney, Zwiebel', en: 'Spiced chickpeas with yoghurt, chutney and onion' }, diet: ['vegetarian'] },
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
    tagline: { de: 'Außen knusprig, innen fluffig – Waffelglück zum Verlieben!', en: 'Crispy outside, fluffy inside – waffle happiness to fall in love with!' },
    pitch: {
      de: 'Unsere frisch gebackenen Bubble Waffeln und Waffel am Stiel werden mit cremigen Saucen, fruchtigen Highlights und unwiderstehlichen Toppings verfeinert. Ein süßes Erlebnis für Groß und Klein!',
      en: 'Our freshly baked bubble waffles and waffles on a stick are finished with creamy sauces, fruity highlights and irresistible toppings. A sweet treat for young and old!',
    },
    image: 'waffleSticksCounter',
    gallery: ['waffleStickServer'],
    menuHeading: { de: 'Unsere Waffel-Kreationen', en: 'Our waffle creations' },
    menuFooter: { de: 'Frisch gebacken. Liebevoll getoppt. Einfach himmlisch!', en: 'Freshly baked. Lovingly topped. Simply heavenly!' },
    dishes: [
      { name: { de: 'Strawberry Dream 🍓', en: 'Strawberry Dream 🍓' }, description: { de: 'Fruchtige Erdbeersauce, weiße Schokolade, frische Erdbeeren und feine Schokoraspeln.', en: 'Fruity strawberry sauce, white chocolate, fresh strawberries and fine chocolate shavings.' }, diet: ['vegetarian'] },
      { name: { de: 'Unicorn Magic 🦄', en: 'Unicorn Magic 🦄' }, description: { de: 'Pinke Schokoladenglasur, bunte Streusel und fluffige Mini-Marshmallows.', en: 'Pink chocolate glaze, colourful sprinkles and fluffy mini marshmallows.' }, diet: ['vegetarian'] },
      { name: { de: 'Chocolate Heaven 🍫', en: 'Chocolate Heaven 🍫' }, description: { de: 'Cremige Schokoladensauce, knusprige Keksstückchen und zarte Schokoraspeln.', en: 'Creamy chocolate sauce, crunchy cookie pieces and delicate chocolate shavings.' }, diet: ['vegetarian'] },
      { name: { de: 'Bueno Love', en: 'Bueno Love' }, description: { de: 'Cremige Haselnusssauce, weiße Schokolade und knusprige Bueno-Stückchen.', en: 'Creamy hazelnut sauce, white chocolate and crunchy Bueno pieces.' }, diet: ['vegetarian'] },
      { name: { de: 'Oreo Crunch', en: 'Oreo Crunch' }, description: { de: 'Schokoladensauce, zerbröselte Oreo-Kekse und cremiges Vanille-Topping.', en: 'Chocolate sauce, crushed Oreo cookies and creamy vanilla topping.' }, diet: ['vegetarian'] },
      { name: { de: 'Lotus Dream', en: 'Lotus Dream' }, description: { de: 'Feine Karamellcreme, knuspriger Lotus-Keks-Crunch und ein Hauch Zimt.', en: 'Fine caramel cream, crunchy Lotus biscuit crumble and a hint of cinnamon.' }, diet: ['vegetarian'] },
      { name: { de: 'Classic Love', en: 'Classic Love' }, description: { de: 'Unsere goldbraune Bubble Waffel mit Puderzucker – einfach und unwiderstehlich.', en: 'Our golden-brown bubble waffle with icing sugar – simple and irresistible.' }, diet: ['vegetarian'] },
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
    tagline: { de: 'Knusprig. Würzig. Unwiderstehlich.', en: 'Crispy. Spicy. Irresistible.' },
    pitch: {
      de: 'Entdecke unsere koreanischen Streetfood-Spezialitäten – saftiges Fleisch, knuspriges Chicken, aromatische Saucen und köstliche Beilagen. Frisch zubereitet und voller Geschmack!',
      en: 'Discover our Korean street food specialities – juicy meat, crispy chicken, aromatic sauces and delicious sides. Freshly prepared and full of flavour!',
    },
    image: 'koreanBowls',
    gallery: [],
    dishes: [
      { name: { de: 'Korean Beef Bowl', en: 'Korean Beef Bowl' }, description: { de: 'Zartes, würzig mariniertes Rindfleisch auf duftendem Reis, kombiniert mit frischem Gemüse und unserer herzhaft-süßlichen Korean BBQ Sauce.', en: 'Tender, spicy marinated beef on fragrant rice, combined with fresh vegetables and our savoury-sweet Korean BBQ sauce.' } },
      { name: { de: 'Korean Fried Chicken Bowl', en: 'Korean Fried Chicken Bowl' }, description: { de: 'Goldbraun frittiertes, knuspriges Chicken in unserer süß-würzigen Korean Sauce, serviert auf duftendem Reis mit frischem Gemüse und Paprika.', en: 'Golden-fried, crispy chicken in our sweet and spicy Korean sauce, served on fragrant rice with fresh vegetables and bell pepper.' } },
      { name: { de: 'Korean Fried Chicken', en: 'Korean Fried Chicken' }, description: { de: 'Außen extra knusprig, innen herrlich saftig! Unsere goldbraun frittierten Chicken Bites werden mit unserer einzigartigen, süß-würzigen Korean Sauce glasiert.', en: 'Extra crispy outside, wonderfully juicy inside! Our golden-fried chicken bites are glazed with our unique, sweet and spicy Korean sauce.' } },
      { name: { de: 'Korean Chicken & Wilde Kartoffeln', en: 'Korean Chicken & Wild Potatoes' }, description: { de: 'Knuspriges Korean Fried Chicken trifft auf goldbraune, würzig gewürzte Wilde Kartoffeln. Dazu unsere köstliche Korean Sauce – die perfekte Kombination für echten Streetfood-Genuss!', en: 'Crispy Korean fried chicken meets golden-brown, well-seasoned wild potatoes. Served with our delicious Korean sauce – the perfect combination for real street food enjoyment!' } },
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
    image: 'burger',
    gallery: ['hotdog'],
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
    name: 'Mac & Cheese',
    status: 'new',
    accent: '#7B4FD6',
    onAccent: '#FFFFFF',
    cuisine: { de: 'American Comfort Food', en: 'American comfort food' },
    tagline: { de: 'Cremiges Mac & Cheese mit Toppings', en: 'Creamy mac & cheese with toppings' },
    pitch: {
      de: 'Amerikanisches Comfort Food: cremiges Mac & Cheese mit wechselnden Toppings — wärmend, sättigend und beliebt bei allen Altersgruppen.',
      en: 'American comfort food: creamy mac & cheese with rotating toppings — warming, filling and loved by every age group.',
    },
    image: 'macCheese',
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
