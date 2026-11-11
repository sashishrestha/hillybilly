import { Seo } from '@/components/layout/Seo';
import { PageHero } from '@/components/sections/Common';
import { site } from '@/content/site';
import { useT } from '@/lib/i18n';

/**
 * LEGAL PAGE TEMPLATE
 * The structure is in place; the wording MUST come from HillyBilly's lawyer or a
 * reviewed generator (e.g. eRecht24). Sections marked [ ] are to be filled in.
 * German is the legally binding version.
 */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t-2 border-cream/10 py-8">
      <h2 className="text-3xl">{title}</h2>
      <div className="mt-3 space-y-3 text-mist">{children}</div>
    </section>
  );
}

export function Imprint() {
  const t = useT();
  return (
    <>
      <Seo route="imprint" title={t({ de: 'Impressum', en: 'Legal notice' })} description={t({ de: 'Impressum von HillyBilly Foods.', en: 'Legal notice (Impressum) of HillyBilly Foods.' })} />
      <PageHero title={t({ de: 'Impressum', en: 'Legal notice' })} intro={t({ de: 'Angaben gemäß § 5 DDG', en: 'Information according to § 5 DDG (German Digital Services Act). The German version is binding.' })} />
      <div className="container-x max-w-3xl py-12 md:py-16">
        <Block title={t({ de: 'Anbieter', en: 'Provider' })}>
          <p>{site.legalName}<br />[{t({ de: 'Straße, Hausnummer', en: 'Street and number' })}]<br />[{t({ de: 'PLZ, Ort', en: 'Postcode, city' })}]</p>
          <p>{t({ de: 'Vertreten durch', en: 'Represented by' })}: [Name]</p>
        </Block>
        <Block title={t({ de: 'Kontakt', en: 'Contact' })}>
          <p>{t({ de: 'Telefon', en: 'Phone' })}: {site.phone}<br />E-Mail: {site.email}</p>
        </Block>
        <Block title={t({ de: 'Registereintrag & Umsatzsteuer', en: 'Registration & VAT' })}>
          <p>[{t({ de: 'Registergericht, Registernummer, USt-IdNr. — falls vorhanden', en: 'Register court, register number, VAT ID — if applicable' })}]</p>
        </Block>
        <Block title={t({ de: 'Verbraucherstreitbeilegung', en: 'Consumer dispute resolution' })}>
          <p>[{t({ de: 'Rechtlich geprüften Hinweis einfügen', en: 'Insert legally reviewed statement' })}]</p>
        </Block>
      </div>
    </>
  );
}

export function Privacy() {
  const t = useT();
  return (
    <>
      <Seo route="privacy" title={t({ de: 'Datenschutzerklärung', en: 'Privacy policy' })} description={t({ de: 'Wie HillyBilly Foods personenbezogene Daten verarbeitet.', en: 'How HillyBilly Foods processes personal data.' })} />
      <PageHero title={t({ de: 'Datenschutz', en: 'Privacy policy' })} intro={t({ de: 'Stand: [Datum]', en: 'Last updated: [date]. The German version is binding.' })} />
      <div className="container-x max-w-3xl py-12 md:py-16">
        <Block title={t({ de: 'Verantwortlicher', en: 'Controller' })}>
          <p>{site.legalName}, [{t({ de: 'Anschrift', en: 'address' })}], {site.email}</p>
        </Block>
        <Block title={t({ de: 'Catering-Anfrageformular', en: 'Catering request form' })}>
          <p>{t({
            de: 'Wir verarbeiten die Angaben aus dem Formular (Event-Details, Name, E-Mail, Telefon, optional Firma und Nachricht), um dein Angebot zu erstellen (Art. 6 Abs. 1 lit. b DSGVO). Speicherdauer: [Zeitraum]. Werbe-E-Mails senden wir nur mit deiner ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die du jederzeit widerrufen kannst.',
            en: 'We process the details from the form (event details, name, email, phone, optional company and message) to prepare your quote (Art. 6(1)(b) GDPR). Retention period: [period]. We only send marketing emails with your explicit consent (Art. 6(1)(a) GDPR), which you can withdraw at any time.',
          })}</p>
        </Block>
        <Block title="WhatsApp">
          <p>{t({
            de: 'Wenn du uns über WhatsApp kontaktierst, gelten zusätzlich die Datenschutzbestimmungen von WhatsApp/Meta. [Rechtlich geprüften Text einfügen]',
            en: 'If you contact us via WhatsApp, WhatsApp/Meta’s privacy terms also apply. [Insert legally reviewed text]',
          })}</p>
        </Block>
        <Block title={t({ de: 'Hosting, Schriften, Cookies', en: 'Hosting, fonts, cookies' })}>
          <p>{t({
            de: 'Schriften werden lokal ausgeliefert, es werden keine Google Fonts nachgeladen. Diese Website setzt aktuell keine Tracking-Cookies. Analyse-Tools werden nur nach Einwilligung geladen. [Hosting-Anbieter ergänzen]',
            en: 'Fonts are served locally; no Google Fonts are loaded. This website currently sets no tracking cookies. Analytics are only loaded after consent. [Add hosting provider]',
          })}</p>
        </Block>
        <Block title={t({ de: 'Deine Rechte', en: 'Your rights' })}>
          <p>[{t({ de: 'Auskunft, Berichtigung, Löschung, Widerspruch, Beschwerderecht — rechtlich geprüft einfügen', en: 'Access, rectification, erasure, objection, right to complain — insert legally reviewed text' })}]</p>
        </Block>
      </div>
    </>
  );
}
