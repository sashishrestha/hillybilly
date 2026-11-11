import type { L } from '@/lib/i18n';
import { getConcept } from '@/content/concepts';
import { occasions } from '@/content/occasions';

export type EventType = 'corporate' | 'wedding' | 'private' | 'festival' | 'school' | 'usBase' | 'other';
export type Choice3 = 'yes' | 'no' | 'unsure';

export type FormState = {
  eventType: EventType | '';
  eventTypeOther: string;
  date: string;
  startTime: string;
  duration: string;
  guestMode: 'exact' | 'estimate';
  guests: string;
  postalCode: string;
  venue: string;
  setting: 'indoor' | 'outdoor' | 'both' | 'unsure' | '';
  access: string;
  power: Choice3 | '';
  concepts: string[];
  recommend: boolean;
  diets: string[];
  dietNotes: string;
  service: 'counter' | 'staffed' | 'recommend' | '';
  name: string;
  email: string;
  phone: string;
  company: string;
  comments: string;
  privacy: boolean;
  marketing: boolean;
  /** Honeypot — real people never see or fill this */
  website: string;
};

export const emptyForm: FormState = {
  eventType: '', eventTypeOther: '', date: '', startTime: '', duration: '',
  guestMode: 'estimate', guests: '', postalCode: '', venue: '', setting: '', access: '', power: '',
  concepts: [], recommend: false, diets: [], dietNotes: '', service: '',
  name: '', email: '', phone: '', company: '', comments: '', privacy: false, marketing: false, website: '',
};

export const eventTypeOptions: { value: EventType; label: L }[] = [
  ...occasions.map((o) => ({ value: o.formValue as EventType, label: o.title })),
  { value: 'other', label: { de: 'Etwas anderes', en: 'Something else' } },
];

export const durationOptions: { value: string; label: L }[] = [
  { value: 'upTo2h', label: { de: 'Bis 2 Std.', en: 'Up to 2 hrs' } },
  { value: '2to4h', label: { de: '2–4 Std.', en: '2–4 hrs' } },
  { value: '4to6h', label: { de: '4–6 Std.', en: '4–6 hrs' } },
  { value: 'over6h', label: { de: 'Über 6 Std.', en: 'Over 6 hrs' } },
  { value: 'multiDay', label: { de: 'Mehrere Tage', en: 'Several days' } },
];

export const settingOptions: { value: FormState['setting']; label: L }[] = [
  { value: 'outdoor', label: { de: 'Draußen', en: 'Outdoors' } },
  { value: 'indoor', label: { de: 'Drinnen', en: 'Indoors' } },
  { value: 'both', label: { de: 'Beides', en: 'Both' } },
  { value: 'unsure', label: { de: 'Noch offen', en: 'Not decided' } },
];

export const powerOptions: { value: Choice3; label: L }[] = [
  { value: 'yes', label: { de: 'Ja, Strom ist da', en: 'Yes, power is available' } },
  { value: 'no', label: { de: 'Nein', en: 'No' } },
  { value: 'unsure', label: { de: 'Weiß ich nicht', en: 'Not sure' } },
];

export const dietOptions: { value: string; label: L }[] = [
  { value: 'vegetarian', label: { de: 'Vegetarisch', en: 'Vegetarian' } },
  { value: 'vegan', label: { de: 'Vegan', en: 'Vegan' } },
  { value: 'halal', label: { de: 'Halal', en: 'Halal' } },
  { value: 'glutenFree', label: { de: 'Glutenfrei', en: 'Gluten-free' } },
  { value: 'lactoseFree', label: { de: 'Laktosefrei', en: 'Lactose-free' } },
  { value: 'kids', label: { de: 'Kinderfreundlich', en: 'Child-friendly' } },
];

export const serviceOptions: { value: FormState['service']; label: L; hint: L }[] = [
  { value: 'counter', label: { de: 'Ausgabe am Truck', en: 'Served at the truck' }, hint: { de: 'Gäste holen sich ihr Essen selbst', en: 'Guests collect their food' } },
  { value: 'staffed', label: { de: 'Mit Service-Personal', en: 'With serving staff' }, hint: { de: 'Wir servieren an Tischen oder Stationen', en: 'We serve at tables or stations' } },
  { value: 'recommend', label: { de: 'Bitte empfehlen', en: 'Please recommend' }, hint: { de: 'Wir schlagen das Passende vor', en: 'We’ll suggest what fits' } },
];

export type Errors = Partial<Record<keyof FormState, L>>;

const req: L = { de: 'Bitte ausfüllen.', en: 'Please fill this in.' };
const choose: L = { de: 'Bitte eine Option wählen.', en: 'Please choose an option.' };

export function validateStep(step: number, f: FormState): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!f.eventType) e.eventType = choose;
    if (f.eventType === 'other' && !f.eventTypeOther.trim()) e.eventTypeOther = { de: 'Welche Art von Event?', en: 'What kind of event?' };
    if (!f.date) e.date = { de: 'Bitte ein Datum wählen.', en: 'Please pick a date.' };
    else if (f.date < new Date().toISOString().slice(0, 10)) e.date = { de: 'Das Datum liegt in der Vergangenheit.', en: 'This date is in the past.' };
    if (!f.duration) e.duration = choose;
  }
  if (step === 1) {
    const n = Number(f.guests);
    if (!f.guests) e.guests = { de: 'Wie viele Gäste ungefähr?', en: 'Roughly how many guests?' };
    else if (!Number.isFinite(n) || n < 1) e.guests = { de: 'Bitte eine Zahl ab 1 eingeben.', en: 'Please enter a number of 1 or more.' };
    if (!/^[A-Za-z0-9 -]{4,10}$/.test(f.postalCode.trim())) e.postalCode = { de: 'Bitte eine gültige Postleitzahl eingeben, z. B. 70173.', en: 'Please enter a valid postcode, e.g. 70173.' };
    if (!f.setting) e.setting = choose;
    if (!f.power) e.power = choose;
  }
  if (step === 2) {
    if (!f.concepts.length && !f.recommend) e.concepts = { de: 'Wähle mindestens ein Konzept oder „Bitte empfehlen“.', en: 'Choose at least one concept, or “Please recommend”.' };
    if (!f.service) e.service = choose;
  }
  if (step === 3) {
    if (!f.name.trim()) e.name = req;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = { de: 'Bitte eine gültige E-Mail-Adresse eingeben, z. B. name@firma.de.', en: 'Please enter a valid email, e.g. name@company.com.' };
    if (f.phone.replace(/\D/g, '').length < 6) e.phone = { de: 'Bitte eine Telefonnummer eingeben, damit wir Rückfragen klären können.', en: 'Please add a phone number so we can check details with you.' };
    if (!f.privacy) e.privacy = { de: 'Bitte stimme der Datenverarbeitung zu, damit wir antworten können.', en: 'Please agree to data processing so we can reply.' };
  }
  return e;
}

/** Concepts that need a power check given the answers so far. */
export function powerWarnings(f: FormState) {
  return f.concepts
    .map((slug) => getConcept(slug))
    .filter((c): c is NonNullable<typeof c> => !!c && !!c.power.amps)
    .filter(() => f.power !== 'yes');
}

export function whatsappText(f: FormState, lang: 'de' | 'en', includeDetails: boolean) {
  const intro = lang === 'de' ? 'Hallo HillyBilly Foods, ich interessiere mich für ein Catering.' : 'Hi HillyBilly Foods, I’m interested in catering.';
  if (!includeDetails) return intro;
  const ev = eventTypeOptions.find((o) => o.value === f.eventType);
  const names = f.concepts.map((s) => getConcept(s)?.name).filter(Boolean);
  const lines = [
    intro,
    ev && `${lang === 'de' ? 'Anlass' : 'Event'}: ${f.eventType === 'other' ? f.eventTypeOther : ev.label[lang]}`,
    f.date && `${lang === 'de' ? 'Datum' : 'Date'}: ${f.date}`,
    f.guests && `${lang === 'de' ? 'Gäste' : 'Guests'}: ${f.guestMode === 'estimate' ? 'ca. ' : ''}${f.guests}`,
    f.postalCode && `${lang === 'de' ? 'PLZ' : 'Postcode'}: ${f.postalCode}`,
    (names.length || f.recommend) && `${lang === 'de' ? 'Konzepte' : 'Concepts'}: ${[...names, f.recommend ? (lang === 'de' ? 'bitte empfehlen' : 'please recommend') : ''].filter(Boolean).join(', ')}`,
  ].filter(Boolean);
  return lines.join('\n');
}
