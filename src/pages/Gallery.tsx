import { Seo } from '@/components/layout/Seo';
import { LightboxGrid } from '@/components/ui/Lightbox';
import { CtaBand, PageHero } from '@/components/sections/Common';
import { Testimonials } from '@/components/sections/Testimonials';
import { media, type MediaKey } from '@/content/media';
import { useT } from '@/lib/i18n';

const ORDER: MediaKey[] = [
  'corndogsTeamTruck', 'burger', 'momoBoat', 'corndogBox', 'chaatBowl', 'macCheese',
  'waffleStickServer', 'koreanBowls', 'corndogsTruck', 'momoPlate', 'momolayaChef', 'hotdog',
  'corndogInHand', 'curryChaatSign', 'curryTeam', 'momoBeef', 'momoTwoPlates', 'waffleSticksCounter',
  'curryTeamSelfie', 'momoVeg', 'momolayaTrailer', 'curryTeamKitchen', 'mangoLassi',
  'corndogsPotatoClassic', 'corndogsTeamFour',
];

export default function Gallery() {
  const t = useT();
  return (
    <>
      <Seo
        route="gallery"
        title={t({ de: 'Galerie – Foodtrucks, Essen & Events', en: 'Gallery – food trucks, food & events' })}
        description={t({ de: 'Echte Fotos von unseren Foodtrucks, Gerichten und Teams.', en: 'Real photos of our food trucks, dishes and teams.' })}
        image={media.corndogsTeamTruck.src}
      />
      <PageHero
        title={t({ de: 'Echte Events. Echtes Essen.', en: 'Real events. Real food.' })}
        intro={t({ de: 'Alle Fotos zeigen unsere eigenen Trucks, Teams und Gerichte.', en: 'Every photo shows our own trucks, teams and dishes.' })}
      />
      <section aria-label={t({ de: 'Fotogalerie', en: 'Photo gallery' })} className="py-16 md:py-24">
        <LightboxGrid items={ORDER} className="container-x columns-2 gap-3 md:columns-3 lg:columns-4 [&>li]:mb-3" />
        <div className="container-x"><Testimonials /></div>
      </section>
      <CtaBand />
    </>
  );
}
