import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Root as Progress, ProgressIndicator } from '@animate-ui/react/primitives/radix-ui/progress';
import { AnimateIcon } from '@animate-ui/react/icons';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CircleAlertIcon,
  LoaderCircleIcon,
  MessageCircleIcon,
  PlugZapIcon,
  SendIcon,
  SparklesIcon,
} from '@/components/animate-ui/icons';
import { Button } from '@/components/ui/Button';
import { Img } from '@/components/ui/Img';
import { visibleConcepts, getConcept } from '@/content/concepts';
import { site } from '@/content/site';
import { useLang, useT, type L } from '@/lib/i18n';
import { pathFor } from '@/lib/routes';
import { cn } from '@/lib/cn';
import { Check, ChoiceGroup, FieldError, TextField } from './fields';
import {
  dietOptions,
  durationOptions,
  emptyForm,
  eventTypeOptions,
  powerOptions,
  powerWarnings,
  serviceOptions,
  settingOptions,
  validateStep,
  whatsappText,
  type Errors,
  type FormState,
} from './model';
import { submitRequest } from './submit';

const STEPS: { title: L; short: L }[] = [
  { title: { de: 'Erzähl uns von deinem Event', en: 'Tell us about your event' }, short: { de: 'Event', en: 'Event' } },
  { title: { de: 'Gäste und Location', en: 'Guests and venue' }, short: { de: 'Gäste & Ort', en: 'Guests & venue' } },
  { title: { de: 'Worauf habt ihr Appetit?', en: 'What are you hungry for?' }, short: { de: 'Essen', en: 'Food' } },
  { title: { de: 'Wie erreichen wir dich?', en: 'How can we reach you?' }, short: { de: 'Kontakt', en: 'Contact' } },
];

const DRAFT_KEY = 'hb-catering-draft';

/** Names used in the error summary so every message says which question it belongs to. */
const fieldNames: Partial<Record<keyof FormState, L>> = {
  eventType: { de: 'Anlass', en: 'Occasion' },
  eventTypeOther: { de: 'Art des Events', en: 'Type of event' },
  date: { de: 'Datum', en: 'Date' },
  duration: { de: 'Dauer', en: 'Duration' },
  guests: { de: 'Gäste', en: 'Guests' },
  postalCode: { de: 'PLZ', en: 'Postcode' },
  setting: { de: 'Drinnen oder draußen', en: 'Indoors or outdoors' },
  power: { de: 'Strom', en: 'Power' },
  concepts: { de: 'Küchen', en: 'Cuisines' },
  service: { de: 'Service', en: 'Service' },
  name: { de: 'Name', en: 'Name' },
  email: { de: 'E-Mail', en: 'Email' },
  phone: { de: 'Telefon', en: 'Phone' },
  privacy: { de: 'Datenschutz', en: 'Privacy' },
};
const optional: L = { de: 'optional', en: 'optional' };

function loadDraft(): FormState | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? { ...emptyForm, ...JSON.parse(raw), privacy: false, website: '' } : null;
  } catch {
    return null;
  }
}

/** Jump from an error-summary item to the field it describes. */
function focusField(k: string) {
  const sel = `input[name="${k}"], textarea[name="${k}"], [aria-describedby="${k}-err"] input, [aria-describedby="${k}-err"] button, [aria-describedby="${k}-err"]`;
  let el = document.querySelector<HTMLElement>(sel);
  if (!el) {
    el = document.querySelector(`[data-field="${k}"]`)?.closest('fieldset')?.querySelector<HTMLElement>('button, input, [role=radio]') ?? null;
  }
  if (!el) return;
  el.scrollIntoView({ block: 'center' });
  el.focus({ preventScroll: true });
}

export function CateringForm() {
  const lang = useLang();
  const t = useT();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [waDetails, setWaDetails] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Restore an unfinished draft, then apply ?concept= / ?event= from the page that linked here.
  useEffect(() => {
    const draft = loadDraft() ?? emptyForm;
    const concept = params.get('concept');
    const event = params.get('event');
    const guests = params.get('guests');
    setForm({
      ...draft,
      ...(guests && /^\d{1,5}$/.test(guests) && !draft.guests ? { guests, guestMode: 'estimate' as const } : {}),
      concepts: concept && getConcept(concept) && !draft.concepts.includes(concept) ? [...draft.concepts, concept] : draft.concepts,
      eventType: event && eventTypeOptions.some((o) => o.value === event) ? (event as FormState['eventType']) : draft.eventType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const keep: Partial<FormState> = { ...form };
      delete keep.privacy;
      delete keep.website;
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(keep));
    } catch {
      /* storage unavailable — the form still works */
    }
  }, [form]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const err = (k: keyof FormState) => (errors[k] ? t(errors[k]!) : undefined);
  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof FormState, L][];
  const warnings = useMemo(() => powerWarnings(form), [form]);

  const next = () => {
    const e = validateStep(step, form);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (next()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) return goNext();
    if (!next()) return;
    setStatus('sending');
    const res = await submitRequest(form, lang);
    if (res.ok) {
      try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      navigate(pathFor('sent', lang), { state: { demo: res.demo, name: form.name.split(' ')[0] } });
    } else {
      setStatus('error');
    }
  };

  const toggleConcept = (slug: string, on: boolean) =>
    set('concepts', on ? [...form.concepts, slug] : form.concepts.filter((s) => s !== slug));
  const toggleDiet = (v: string, on: boolean) => set('diets', on ? [...form.diets, v] : form.diets.filter((d) => d !== v));

  const label = (opts: { value: string; label: L }[], v: string) => t(opts.find((o) => o.value === v)?.label ?? { de: '—', en: '—' });
  const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(whatsappText(form, lang, waDetails))}`;

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="form-step-heading" className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-10">
        <ol className="grid grid-cols-4 gap-2 text-sm font-semibold">
          {STEPS.map((s, i) => (
            <li
              key={i}
              aria-current={i === step ? 'step' : undefined}
              className={cn('flex flex-col gap-1 transition-colors duration-300', i <= step ? 'text-cream' : 'text-mist')}
            >
              <span>
                <span className="sr-only">{t({ de: 'Schritt', en: 'Step' })} </span>
                {i + 1}
                <span className="hidden sm:inline">. {t(s.short)}</span>
                {i < step && <span className="sr-only"> – {t({ de: 'erledigt', en: 'done' })}</span>}
              </span>
            </li>
          ))}
        </ol>
        <Progress value={((step + 1) / STEPS.length) * 100} className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-cream/10" aria-label={t({ de: 'Fortschritt', en: 'Progress' })}>
          <ProgressIndicator className="h-full w-full rounded-full bg-pink transition-transform duration-500 ease-[var(--ease-out-expo)]" style={{ transform: `translateX(-${100 - ((step + 1) / STEPS.length) * 100}%)` }} />
        </Progress>
      </div>

      <h2 id="form-step-heading" ref={headingRef} tabIndex={-1} className="text-display-2 outline-none">
        <span className="sr-only">{t({ de: `Schritt ${step + 1} von 4: `, en: `Step ${step + 1} of 4: ` })}</span>
        {t(STEPS[step].title)}
      </h2>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="animate-shake mt-6 rounded-2xl border-2 border-pink bg-navy-2 p-5 outline-none">
          <p className="flex items-center gap-2 font-bold text-pink">
            <CircleAlertIcon size={20} aria-hidden />
            {t({ de: 'Bitte prüfe diese Angaben:', en: 'Please check these details:' })}
          </p>
          <ul className="mt-2 list-disc pl-6 text-cream">
            {errorList.map(([k, v]) => (
              <li key={k}>
                <button type="button" onClick={() => focusField(k)} className="text-left underline decoration-pink decoration-2 underline-offset-4 transition-colors hover:text-pink">
                  {fieldNames[k] && <strong>{t(fieldNames[k]!)}: </strong>}
                  {t(v)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot: hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} />
        </label>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22 }}
          className="mt-10 space-y-9"
        >
          {step === 0 && (
            <>
              <ChoiceGroup
                legend={t({ de: 'Was feierst du?', en: 'What’s the occasion?' })}
                name="eventType"
                value={form.eventType}
                onChange={(v) => set('eventType', v)}
                options={eventTypeOptions.map((o) => ({ value: o.value, label: t(o.label) }))}
                error={err('eventType')}
              />
              {form.eventType === 'other' && (
                <TextField name="eventTypeOther" label={t({ de: 'Welche Art von Event?', en: 'What kind of event?' })} value={form.eventTypeOther} onChange={(v) => set('eventTypeOther', v)} error={err('eventTypeOther')} />
              )}
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField
                  name="date"
                  type="date"
                  label={t({ de: 'Datum', en: 'Date' })}
                  min={new Date().toISOString().slice(0, 10)}
                  value={form.date}
                  onChange={(v) => set('date', v)}
                  error={err('date')}
                />
                <TextField
                  name="startTime"
                  type="time"
                  label={t({ de: 'Startzeit', en: 'Start time' })}
                  optional={t(optional)}
                  value={form.startTime}
                  onChange={(v) => set('startTime', v)}
                />
              </div>
              <ChoiceGroup
                legend={t({ de: 'Wie lange sollen wir servieren?', en: 'How long should we serve for?' })}
                name="duration"
                value={form.duration}
                onChange={(v) => set('duration', v)}
                options={durationOptions.map((o) => ({ value: o.value, label: t(o.label) }))}
                error={err('duration')}
              />
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
                <TextField
                  name="guests"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  label={t({ de: 'Anzahl Gäste', en: 'Number of guests' })}
                  value={form.guests}
                  onChange={(v) => set('guests', v)}
                  error={err('guests')}
                />
                <ChoiceGroup
                  legend={t({ de: 'Die Zahl ist…', en: 'This number is…' })}
                  name="guestMode"
                  value={form.guestMode}
                  onChange={(v) => set('guestMode', v)}
                  options={[
                    { value: 'estimate', label: t({ de: 'geschätzt', en: 'an estimate' }) },
                    { value: 'exact', label: t({ de: 'genau', en: 'exact' }) },
                  ]}
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-[12rem_1fr]">
                <TextField
                  name="postalCode"
                  autoComplete="postal-code"
                  label={t({ de: 'PLZ des Events', en: 'Event postcode' })}
                  value={form.postalCode}
                  onChange={(v) => set('postalCode', v)}
                  error={err('postalCode')}
                />
                <TextField
                  name="venue"
                  label={t({ de: 'Location', en: 'Venue' })}
                  optional={t(optional)}
                  placeholder={t({ de: 'z. B. Firmengelände, Festhalle, Garten', en: 'e.g. company site, hall, garden' })}
                  value={form.venue}
                  onChange={(v) => set('venue', v)}
                />
              </div>
              <ChoiceGroup
                legend={t({ de: 'Drinnen oder draußen?', en: 'Indoors or outdoors?' })}
                name="setting"
                value={form.setting}
                onChange={(v) => set('setting', v)}
                options={settingOptions.map((o) => ({ value: o.value, label: t(o.label) }))}
                error={err('setting')}
              />
              <ChoiceGroup
                legend={t({ de: 'Gibt es Strom vor Ort?', en: 'Is there power on site?' })}
                name="power"
                value={form.power}
                onChange={(v) => set('power', v)}
                options={powerOptions.map((o) => ({ value: o.value, label: t(o.label) }))}
                error={err('power')}
              />
              <p className="-mt-5 flex gap-2 text-mist">
                <PlugZapIcon size={18} className="mt-1 shrink-0" aria-hidden />
                {t({
                  de: 'Kein Problem, wenn du es nicht weißt — der Bedarf hängt vom Konzept ab und wir klären ihn mit dir oder der Location.',
                  en: 'No problem if you don’t know — needs depend on the concept, and we’ll sort it out with you or the venue.',
                })}
              </p>
              <TextField
                name="access"
                multiline
                label={t({ de: 'Zufahrt & Stellfläche', en: 'Access & parking space' })}
                optional={t(optional)}
                hint={t({ de: 'Schmale Einfahrt, Rasen, Treppen, Zufahrtszeiten…', en: 'Narrow entrance, grass, steps, access times…' })}
                value={form.access}
                onChange={(v) => set('access', v)}
              />
            </>
          )}

          {step === 2 && (
            <>
              <fieldset aria-describedby={errors.concepts ? 'concepts-err' : undefined}>
                <legend className="font-bold">{t({ de: 'Welche Küchen möchtest du? Mehrfachauswahl möglich.', en: 'Which cuisines would you like? Choose as many as you like.' })}</legend>
                <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {visibleConcepts.map((c) => (
                    <li key={c.slug}>
                      <Check variant="card" checked={form.concepts.includes(c.slug)} onChange={(v) => toggleConcept(c.slug, v)}>
                        <span className="block aspect-[4/3] w-full overflow-hidden" style={{ background: c.accent }}>
                          {c.image ? (
                            <Img k={c.image} decorative />
                          ) : (
                            <span className="display grid h-full place-items-center p-3 text-center text-2xl" style={{ color: c.onAccent }}>
                              {t(c.cuisine)}
                            </span>
                          )}
                        </span>
                        <span className="block p-3">
                          <span className="block font-bold leading-tight">{c.name}</span>
                          <span className="block text-sm text-mist">{t(c.cuisine)}</span>
                        </span>
                      </Check>
                    </li>
                  ))}
                  <li>
                    <Check variant="card" checked={form.recommend} onChange={(v) => set('recommend', v)}>
                      <span className="grid aspect-[4/3] w-full place-items-center bg-mango text-navy">
                        <SparklesIcon size={44} aria-hidden />
                      </span>
                      <span className="block p-3">
                        <span className="block font-bold leading-tight">{t({ de: 'Bitte empfehlen', en: 'Please recommend' })}</span>
                        <span className="block text-sm text-mist">{t({ de: 'Wir stellen etwas zusammen', en: 'We’ll put a mix together' })}</span>
                      </span>
                    </Check>
                  </li>
                </ul>
                <FieldError id="concepts-err">{err('concepts')}</FieldError>
              </fieldset>

              {warnings.length > 0 && (
                <div role="status" className="flex gap-3 rounded-2xl bg-mango/30 p-5">
                  <PlugZapIcon size={22} className="mt-0.5 shrink-0" aria-hidden />
                  <div>
                    {warnings.map((c) => (
                      <p key={c.slug} className="font-semibold">{t(c.power.note)}</p>
                    ))}
                    <p className="mt-1 text-cream/80">
                      {form.power === 'no'
                        ? t({ de: 'Ohne Strom vor Ort klären wir mit dir eine Lösung, z. B. einen Generator.', en: 'With no power on site, we’ll work out a solution with you, such as a generator.' })
                        : t({ de: 'Wir prüfen das gemeinsam mit dir oder der Location.', en: 'We’ll check this with you or the venue.' })}
                    </p>
                  </div>
                </div>
              )}

              <fieldset>
                <legend className="font-bold">
                  {t({ de: 'Ernährungswünsche', en: 'Dietary needs' })} <span className="font-normal text-mist">({t(optional)})</span>
                </legend>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {dietOptions.map((d) => (
                    <Check key={d.value} checked={form.diets.includes(d.value)} onChange={(v) => toggleDiet(d.value, v)}>
                      {t(d.label)}
                    </Check>
                  ))}
                </div>
              </fieldset>
              <TextField
                name="dietNotes"
                label={t({ de: 'Allergien oder weitere Wünsche', en: 'Allergies or other requests' })}
                optional={t(optional)}
                value={form.dietNotes}
                onChange={(v) => set('dietNotes', v)}
              />
              <ChoiceGroup
                legend={t({ de: 'Wie soll serviert werden?', en: 'How should we serve?' })}
                name="service"
                columns="stack"
                value={form.service}
                onChange={(v) => set('service', v)}
                options={serviceOptions.map((o) => ({ value: o.value, label: t(o.label), hint: t(o.hint) }))}
                error={err('service')}
              />
            </>
          )}

          {step === 3 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField name="name" autoComplete="name" label={t({ de: 'Name', en: 'Name' })} value={form.name} onChange={(v) => set('name', v)} error={err('name')} />
                <TextField name="company" autoComplete="organization" label={t({ de: 'Firma', en: 'Company' })} optional={t(optional)} value={form.company} onChange={(v) => set('company', v)} />
                <TextField name="email" type="email" autoComplete="email" label={t({ de: 'E-Mail', en: 'Email' })} value={form.email} onChange={(v) => set('email', v)} error={err('email')} />
                <TextField name="phone" type="tel" autoComplete="tel" label={t({ de: 'Telefon', en: 'Phone' })} value={form.phone} onChange={(v) => set('phone', v)} error={err('phone')} />
              </div>
              <TextField
                name="comments"
                multiline
                label={t({ de: 'Noch etwas, das wir wissen sollten?', en: 'Anything else we should know?' })}
                optional={t(optional)}
                value={form.comments}
                onChange={(v) => set('comments', v)}
              />

              <section aria-labelledby="summary-heading" className="rounded-[var(--radius-card)] bg-navy-2 p-6 ring-1 ring-cream/10">
                <h3 id="summary-heading" className="text-3xl">{t({ de: 'Deine Angaben', en: 'Your details' })}</h3>
                <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-[11rem_1fr]">
                  {[
                    [t({ de: 'Anlass', en: 'Occasion' }), form.eventType === 'other' ? form.eventTypeOther : label(eventTypeOptions, form.eventType), 0],
                    [t({ de: 'Datum & Dauer', en: 'Date & duration' }), `${form.date ? new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(form.date + 'T12:00')) : '—'}${form.startTime ? `, ${form.startTime}` : ''} · ${label(durationOptions, form.duration)}`, 0],
                    [t({ de: 'Gäste', en: 'Guests' }), `${form.guestMode === 'estimate' ? t({ de: 'ca. ', en: 'approx. ' }) : ''}${form.guests}`, 1],
                    [t({ de: 'Ort', en: 'Location' }), [form.postalCode, form.venue, label(settingOptions, form.setting)].filter(Boolean).join(' · '), 1],
                    [t({ de: 'Strom', en: 'Power' }), label(powerOptions, form.power), 1],
                    [
                      t({ de: 'Konzepte', en: 'Concepts' }),
                      [...form.concepts.map((s) => getConcept(s)?.name ?? s), form.recommend ? t({ de: 'Bitte empfehlen', en: 'Please recommend' }) : ''].filter(Boolean).join(', '),
                      2,
                    ],
                    [t({ de: 'Ernährung', en: 'Dietary' }), [...form.diets.map((d) => label(dietOptions, d)), form.dietNotes].filter(Boolean).join(', ') || '—', 2],
                    [t({ de: 'Service', en: 'Service' }), label(serviceOptions, form.service), 2],
                  ].map(([k, v, s]) => (
                    <div key={k as string} className="contents">
                      <dt className="font-bold">{k}</dt>
                      <dd className="flex items-start justify-between gap-4 text-mist">
                        <span>{v}</span>
                        <button type="button" onClick={() => { setErrors({}); setStep(s as number); }} className="shrink-0 font-semibold text-cream underline underline-offset-4">
                          {t({ de: 'Ändern', en: 'Change' })}
                          <span className="sr-only"> {k}</span>
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <div className="space-y-4">
                <Check
                  variant="plain"
                  checked={form.privacy}
                  onChange={(v) => set('privacy', v)}
                  invalid={!!errors.privacy}
                  describedBy={errors.privacy ? 'privacy-err' : undefined}
                >
                  {t({ de: 'Ich bin einverstanden, dass HillyBilly Foods meine Angaben zur Bearbeitung dieser Anfrage verarbeitet. Details in der ', en: 'I agree that HillyBilly Foods may process my details to handle this request. Details in the ' })}
                  <Link to={pathFor('privacy', lang)} target="_blank" className="font-semibold underline underline-offset-4" onClick={(e) => e.stopPropagation()}>
                    {t({ de: 'Datenschutzerklärung', en: 'privacy policy' })}
                  </Link>
                  .
                </Check>
                <FieldError id="privacy-err">{err('privacy')}</FieldError>
                <Check variant="plain" checked={form.marketing} onChange={(v) => set('marketing', v)}>
                  {t({ de: 'Ich möchte gelegentlich News zu neuen Foodkonzepten und Terminen per E-Mail erhalten (optional, jederzeit abbestellbar).', en: 'I’d like occasional emails about new food concepts and dates (optional, unsubscribe any time).' })}
                </Check>
              </div>

              {status === 'error' && (
                <p role="alert" className="flex gap-2 rounded-2xl bg-pink/10 p-4 font-semibold text-pink">
                  <CircleAlertIcon size={20} className="mt-0.5 shrink-0" aria-hidden />
                  {t({
                    de: `Die Anfrage konnte nicht gesendet werden. Deine Angaben sind gespeichert — versuch es noch einmal oder ruf uns an: ${site.phone}.`,
                    en: `Your request couldn’t be sent. Your details are saved — try again, or call us on ${site.phone}.`,
                  })}
                </p>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex flex-col-reverse gap-4 border-t-2 border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={goBack}>
            <ArrowLeftIcon size={18} aria-hidden /> {t({ de: 'Zurück', en: 'Back' })}
          </Button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <AnimateIcon animateOnHover asChild>
            <Button type="submit" size="lg">
              {t({ de: 'Weiter', en: 'Continue' })}: {t(STEPS[step + 1].short)}
              <ArrowRightIcon size={20} aria-hidden />
            </Button>
          </AnimateIcon>
        ) : (
          <Button type="submit" size="lg" disabled={status === 'sending'} aria-busy={status === 'sending'}>
            {status === 'sending' ? (
              <>
                <LoaderCircleIcon size={20} animate loop aria-hidden /> {t({ de: 'Wird gesendet…', en: 'Sending…' })}
              </>
            ) : (
              <>
                <SendIcon size={20} aria-hidden /> {t({ de: 'Anfrage senden', en: 'Send request' })}
              </>
            )}
          </Button>
        )}
      </div>

      {step === STEPS.length - 1 && (
        <aside aria-labelledby="wa-heading" className="mt-10 rounded-[var(--radius-card)] bg-alt p-6">
          <h3 id="wa-heading" className="text-2xl">{t({ de: 'Lieber per WhatsApp?', en: 'Prefer WhatsApp?' })}</h3>
          <p className="mt-1 text-mist">
            {t({ de: 'Wir teilen nur, was du erlaubst. Name und Telefonnummer werden nie eingefügt.', en: 'We only share what you allow. Your name and phone number are never included.' })}
          </p>
          <div className="mt-4">
            <Check variant="plain" checked={waDetails} onChange={setWaDetails}>
              {t({ de: 'Event-Details (Anlass, Datum, Gäste, PLZ, Konzepte) in die Nachricht einfügen', en: 'Add event details (occasion, date, guests, postcode, concepts) to the message' })}
            </Check>
          </div>
          <Button asChild variant="navy" className="mt-5">
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              <MessageCircleIcon size={20} aria-hidden /> {t({ de: 'WhatsApp öffnen', en: 'Open WhatsApp' })}
            </a>
          </Button>
        </aside>
      )}
    </form>
  );
}
