import { Seo } from '@/components/layout/Seo';
import { Img } from '@/components/ui/Img';
import { CtaBand, Halftone, PageHero, Scribble } from '@/components/sections/Common';
import { media } from '@/content/media';
import { useT } from '@/lib/i18n';

export default function About() {
  const t = useT();
  return (
    <>
      <Seo
        route="about"
        title={t({ de: 'Über uns – das Team hinter HillyBilly Foods', en: 'About us – the team behind HillyBilly Foods' })}
        description={t({
          de: 'Wie aus einem pinken Corndog-Truck eine wachsende Familie an Foodkonzepten wurde — und wer dahintersteht.',
          en: 'How a pink corndog truck grew into a family of food concepts — and the people behind it.',
        })}
        image={media.corndogsTeamFour.src}
      />
      <PageHero
        title={t({ de: 'Unsere Geschichte', en: 'Our story' })}
        intro={t({
          de: 'Von einem pinken Foodtruck zu einer bunten Streetfood-Welt',
          en: 'From a pink food truck to a colourful street food world',
        })}
      />
      <section aria-labelledby="story-heading" className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="story-heading" className="text-display-2">{t({ de: 'Alles begann mit einer Idee', en: 'It all began with an idea' })}</h2>
            <Scribble className="mt-3" />
            <div className="mt-6 space-y-4 text-lg text-mist">
              <p className="font-semibold">
                {t({
                  de: 'Alles begann mit einer Idee, einem pinken Foodtruck und der Leidenschaft für außergewöhnliches Essen.',
                  en: 'It all began with an idea, a pink food truck and a passion for extraordinary food.',
                })}
              </p>
              <p>
                {t({
                  de: 'Als HillyBilly mit Corndogs an den Start ging, wollten wir mehr als nur Fast Food anbieten. Wir wollten ein Erlebnis schaffen – mit auffälligen Farben, einem einzigartigen Look, frisch zubereitetem Streetfood und einem Team, das mit Begeisterung dabei ist.',
                  en: 'When HillyBilly launched with corndogs, we wanted to offer more than just fast food. We wanted to create an experience – with eye-catching colours, a unique look, freshly prepared street food and a team that brings real enthusiasm.',
                })}
              </p>
              <p>
                {t({
                  de: 'Unser knallpinker Foodtruck, unser Fifties-Diner-Style und unsere ausgefallenen Corndogs sorgten schnell für Aufmerksamkeit. Doch was uns wirklich antrieb, war die Freude unserer Gäste.',
                  en: 'Our bright pink food truck, our 1950s diner style and our unusual corndogs quickly drew attention. But what really drove us was our guests’ joy.',
                })}
              </p>
              <p>
                {t({
                  de: 'Aus einer Idee wurde eine Leidenschaft. Und aus einem Foodtruck entwickelte sich HillyBilly Foods.',
                  en: 'An idea became a passion. And one food truck grew into HillyBilly Foods.',
                })}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[4/5] -rotate-2 overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[8px_8px_0_0_rgba(247,37,133,0.9)] transition-transform duration-500 hover:rotate-0"><Img k="corndogsTruck" /></div>
            <div className="mt-10 aspect-[4/5] rotate-2 overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[8px_8px_0_0_rgba(255,190,11,0.9)] transition-transform duration-500 hover:rotate-0"><Img k="waffleStickServer" /></div>
          </div>
        </div>
      </section>
      <section aria-labelledby="family-heading" className="theme-dark relative overflow-hidden bg-navy py-16 text-cream md:py-24">
        <Halftone />
        <div className="container-x relative max-w-4xl">
          <h2 id="family-heading" className="text-display-2">{t({ de: 'Viele Kulturen. Viele Geschmäcker. Eine Leidenschaft.', en: 'Many cultures. Many flavours. One passion.' })}</h2>
          <Scribble className="mt-3" />
          <div className="mt-6 space-y-4 text-lg text-mist">
            <p>
              {t({
                de: 'Heute ist HillyBilly Foods eine wachsende Streetfood-Familie mit ganz unterschiedlichen Foodkonzepten.',
                en: 'Today, HillyBilly Foods is a growing street food family with very different food concepts.',
              })}
            </p>
            <p>
              {t({
                de: 'Von unseren beliebten Corndogs über saftige American Burgers und cremiges Mac & Cheese bis hin zu aromatischen Currys, koreanischen Spezialitäten und süßen Waffeln – jedes Konzept hat seinen eigenen Charakter.',
                en: 'From our popular corndogs to juicy American burgers and creamy mac & cheese, and on to aromatic curries, Korean specialities and sweet waffles – every concept has its own character.',
              })}
            </p>
            <p>
              {t({
                de: 'Was alle verbindet? Unsere Liebe zu gutem Essen, kreativen Ideen und besonderen Geschmackserlebnissen.',
                en: 'What connects them all? Our love of good food, creative ideas and special flavour experiences.',
              })}
            </p>
            <p>
              {t({
                de: 'Wir lassen uns von verschiedenen Küchen und Kulturen inspirieren und bringen ihre Vielfalt auf Festivals, Firmenfeiern, Märkte und private Veranstaltungen.',
                en: 'We draw inspiration from different cuisines and cultures and bring their variety to festivals, company parties, markets and private events.',
              })}
            </p>
          </div>
        </div>
      </section>
      <section aria-labelledby="momolaya-heading" className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="momolaya-heading" className="text-display-2">{t({ de: 'Momolaya – Junge Frauen. Große Ideen. Himalaya-Flair.', en: 'Momolaya – Young women. Big ideas. Himalayan flair.' })}</h2>
            <Scribble className="mt-3" />
            <div className="mt-6 space-y-4 text-lg text-mist">
              <p>
                {t({
                  de: 'Ein ganz besonderes Mitglied unserer Streetfood-Familie ist Momolaya.',
                  en: 'A very special member of our street food family is Momolaya.',
                })}
              </p>
              <p>
                {t({
                  de: 'Momolaya wird von engagierten Studentinnen mit viel Leidenschaft, Energie und Kreativität umgesetzt.',
                  en: 'Momolaya is run by dedicated female students with plenty of passion, energy and creativity.',
                })}
              </p>
              <p>
                {t({
                  de: 'Mit ihren nepalesischen und tibetisch inspirierten Momos bringen sie ein Stück Himalaya-Streetfood zu unseren Gästen. Die köstlichen, gefüllten Teigtaschen werden mit aromatischen Chutneys serviert und stehen für eine Küche, die Tradition und modernen Streetfood-Genuss verbindet.',
                  en: 'With their Nepali and Tibetan-inspired momos, they bring a piece of Himalayan street food to our guests. The delicious filled dumplings are served with aromatic chutneys and stand for a cuisine that combines tradition with modern street food enjoyment.',
                })}
              </p>
              <p>
                {t({
                  de: 'Momolaya ist für uns mehr als ein weiteres Foodkonzept. Es steht für junge Menschen, die eigene Ideen einbringen, Verantwortung übernehmen und gemeinsam etwas Besonderes aufbauen.',
                  en: 'To us, Momolaya is more than just another food concept. It stands for young people who contribute their own ideas, take responsibility and build something special together.',
                })}
              </p>
              <p className="font-brush text-2xl text-pink">
                {t({ de: 'Jung. Kreativ. Voller Geschmack. Das ist Momolaya.', en: 'Young. Creative. Full of flavour. That is Momolaya.' })}
              </p>
            </div>
          </div>
          <div className="aspect-[4/5] max-w-md rotate-2 overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[8px_8px_0_0_rgba(255,190,11,0.9)] transition-transform duration-500 hover:rotate-0 lg:justify-self-center"><Img k="momolayaChef" /></div>
        </div>
      </section>
      <section aria-labelledby="teams-heading" className="theme-dark relative overflow-hidden bg-navy py-16 text-cream md:py-24">
        <Halftone />
        <div className="container-x relative">
          <h2 id="teams-heading" className="text-display-2">{t({ de: 'Die Menschen hinter HillyBilly Foods', en: 'The people behind HillyBilly Foods' })}</h2>
          <Scribble className="mt-3" />
          <div className="mt-6 max-w-[62ch] space-y-4 text-lg text-mist">
            <p>
              {t({
                de: 'Hinter unseren Foodtrucks stehen Menschen mit unterschiedlichen Geschichten, Kulturen und Talenten.',
                en: 'Behind our food trucks are people with different stories, cultures and talents.',
              })}
            </p>
            <p>
              {t({
                de: 'Wir glauben daran, dass gutes Essen Menschen verbindet – unabhängig davon, woher sie kommen oder welche Sprache sie sprechen.',
                en: 'We believe that good food connects people – no matter where they come from or what language they speak.',
              })}
            </p>
            <p>
              {t({
                de: 'Unser Team ist das Herz von HillyBilly Foods. Mit Kreativität, Teamgeist und viel Engagement arbeiten wir daran, unseren Gästen nicht nur leckeres Essen, sondern auch ein schönes Erlebnis zu bieten.',
                en: 'Our team is the heart of HillyBilly Foods. With creativity, team spirit and plenty of commitment, we work to give our guests not just tasty food but a great experience.',
              })}
            </p>
            <p>
              {t({
                de: 'Denn für uns geht es nicht nur darum, Essen zu verkaufen. Es geht um Begegnungen, gemeinsame Momente und die Freude, Menschen glücklich zu machen.',
                en: 'For us, it is not only about selling food. It is about encounters, shared moments and the joy of making people happy.',
              })}
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <figure className="-rotate-1 transition-transform duration-500 hover:rotate-0">
              <div className="overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[8px_8px_0_0_rgba(0,0,0,0.4)]"><Img k="corndogsTeamFour" className="aspect-[16/9]" /></div>
              <figcaption className="mt-4 font-brush text-2xl text-mango">HillyBilly Corndogs</figcaption>
            </figure>
            <figure className="rotate-1 transition-transform duration-500 hover:rotate-0">
              <div className="overflow-hidden rounded-[var(--radius-card)] border-[6px] border-[#fff7ec] shadow-[8px_8px_0_0_rgba(0,0,0,0.4)]"><Img k="curryTeam" className="aspect-[16/9]" /></div>
              <figcaption className="mt-4 font-brush text-2xl text-mango">Curry on Wheels</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section aria-labelledby="journey-heading" className="py-16 md:py-24">
        <div className="container-x max-w-4xl">
          <h2 id="journey-heading" className="text-display-2">{t({ de: 'Unsere Reise geht weiter', en: 'Our journey continues' })}</h2>
          <Scribble className="mt-3" />
          <div className="mt-6 space-y-4 text-lg text-mist">
            <p>
              {t({
                de: 'Was mit einem pinken Foodtruck begann, ist heute eine vielseitige Streetfood-Marke mit immer neuen Ideen.',
                en: 'What began with a pink food truck is now a versatile street food brand with new ideas all the time.',
              })}
            </p>
            <p className="font-semibold">{t({ de: 'Und wir haben noch viel vor!', en: 'And we have big plans!' })}</p>
            <p>
              {t({
                de: 'Wir entwickeln neue Konzepte, entdecken spannende Geschmacksrichtungen und freuen uns darauf, mit unseren Foodtrucks noch mehr Menschen zu erreichen.',
                en: 'We are developing new concepts, discovering exciting flavours and look forward to reaching even more people with our food trucks.',
              })}
            </p>
            <p>
              {t({
                de: 'Ob auf einem großen Festival, einer Firmenfeier, einem Streetfood-Markt oder bei einem privaten Event – wir bringen unsere Leidenschaft direkt zu euch.',
                en: 'Whether at a big festival, a company party, a street food market or a private event – we bring our passion straight to you.',
              })}
            </p>
          </div>
          <p className="mt-8 text-2xl font-bold">HillyBilly Foods – Different Cultures. Bold Flavours. One Big Family.</p>
          <p className="mt-2 font-brush text-3xl text-pink">{t({ de: 'Gutes Essen bringt Menschen zusammen.', en: 'Good food brings people together.' })}</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
