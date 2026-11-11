import type { L } from '@/lib/i18n';

import corndogsTeamTruck from '@/assets/img/corndogs-team-truck.webp';
import corndogsPotatoClassic from '@/assets/img/corndogs-potato-classic.webp';
import corndogInHand from '@/assets/img/corndog-in-hand.webp';
import waffleSticksCounter from '@/assets/img/waffle-sticks-counter.webp';
import waffleStickServer from '@/assets/img/waffle-stick-server.webp';
import corndogsTeamFour from '@/assets/img/corndogs-team-four.webp';
import corndogsTruck from '@/assets/img/corndogs-truck.webp';
import momolayaLogo from '@/assets/img/momolaya-logo.webp';
import curryLogo from '@/assets/img/curry-on-wheels-logo.webp';
import momolayaTrailer from '@/assets/img/momolaya-trailer.webp';
import momoBoat from '@/assets/img/momo-boat.webp';
import momolayaChef from '@/assets/img/momolaya-chef.webp';
import momoTwoPlates from '@/assets/img/momo-two-plates.webp';
import curryTeam from '@/assets/img/curry-on-wheels-team.webp';
import mangoLassi from '@/assets/img/mango-lassi.webp';
import chaatBowl from '@/assets/img/chaat-bowl.webp';

export type Media = { src: string; alt: L; w: number; h: number };

/**
 * Every image on the site, with alt text in both languages.
 * All photos are HillyBilly's own — no stock or AI images.
 * To add one: drop the .webp into src/assets/img and register it here.
 */
export const media = {
  corndogsTeamTruck: {
    src: corndogsTeamTruck, w: 1280, h: 960,
    alt: { de: 'Drei Mitarbeiterinnen in pinken Fifties-Kleidern vor dem HillyBilly-Corndogs-Foodtruck', en: 'Three team members in pink 1950s diner outfits in front of the HillyBilly Corndogs food truck' },
  },
  corndogsPotatoClassic: {
    src: corndogsPotatoClassic, w: 960, h: 1280,
    alt: { de: 'Kartoffel-Corndog und klassischer Corndog mit Ketchup und Mayo', en: 'Potato corndog and classic corndog topped with ketchup and mayo' },
  },
  corndogInHand: {
    src: corndogInHand, w: 960, h: 1280,
    alt: { de: 'Knuspriger Korean Corndog mit Ketchup und Mayo in der Hand vor dem pinken Truck', en: 'Crispy Korean corndog with ketchup and mayo held in front of the pink truck' },
  },
  waffleSticksCounter: {
    src: waffleSticksCounter, w: 960, h: 1280,
    alt: { de: 'Reihe von Waffeln am Stiel mit weißer Schokolade, Erdbeersauce und Kokos', en: 'Row of waffles on a stick with white chocolate, strawberry sauce and coconut' },
  },
  waffleStickServer: {
    src: waffleStickServer, w: 960, h: 1280,
    alt: { de: 'Lachende Mitarbeiterin reicht eine Waffel am Stiel mit pinker Glasur und Marshmallows', en: 'Smiling team member serving a waffle on a stick with pink glaze and marshmallows' },
  },
  corndogsTeamFour: {
    src: corndogsTeamFour, w: 1280, h: 576,
    alt: { de: 'Das HillyBilly-Team vor dem Corndogs-Foodtruck bei einem Event', en: 'The HillyBilly team in front of the Corndogs food truck at an event' },
  },
  corndogsTruck: {
    src: corndogsTruck, w: 1280, h: 927,
    alt: { de: 'Pinker HillyBilly-Corndogs-Foodtruck mit Comic-Logo', en: 'Pink HillyBilly Corndogs food truck with its cartoon logo' },
  },
  momolayaLogo: {
    src: momolayaLogo, w: 1024, h: 1024,
    alt: { de: 'Momolaya Logo', en: 'Momolaya logo' },
  },
  curryLogo: {
    src: curryLogo, w: 1280, h: 1280,
    alt: { de: 'Curry on Wheels Logo', en: 'Curry on Wheels logo' },
  },
  momolayaTrailer: {
    src: momolayaTrailer, w: 960, h: 1280,
    alt: { de: 'Momolaya-Verkaufsanhänger mit Gebetsfahnen auf einem Straßenfest', en: 'Momolaya food trailer with prayer flags at a street festival' },
  },
  momoBoat: {
    src: momoBoat, w: 960, h: 1280,
    alt: { de: 'Gedämpfte Momos in einem Holzschiffchen mit zwei Chutneys', en: 'Steamed momos in a wooden boat with two chutneys' },
  },
  momolayaChef: {
    src: momolayaChef, w: 960, h: 1280,
    alt: { de: 'Momolaya-Köchin mit nepalesischer Dhaka-Topi-Mütze zeigt frische Momos', en: 'Momolaya cook in a Nepali dhaka topi holding fresh momos' },
  },
  momoTwoPlates: {
    src: momoTwoPlates, w: 960, h: 1280,
    alt: { de: 'Zwei Portionen handgefaltete Momos mit Sesam und Tomaten-Chutney', en: 'Two plates of hand-folded momos with sesame and tomato chutney' },
  },
  curryTeam: {
    src: curryTeam, w: 1280, h: 576,
    alt: { de: 'Das Curry-on-Wheels-Team vor dem türkisen Verkaufsanhänger', en: 'The Curry on Wheels team in front of their turquoise trailer' },
  },
  mangoLassi: {
    src: mangoLassi, w: 1280, h: 1186,
    alt: { de: 'Mango Lassi im Curry-on-Wheels-Becher', en: 'Mango lassi in a Curry on Wheels cup' },
  },
  chaatBowl: {
    src: chaatBowl, w: 960, h: 1280,
    alt: { de: 'Kichererbsen-Chaat mit Joghurt, Koriander und Sev vor dem Curry-on-Wheels-Schriftzug', en: 'Chickpea chaat with yoghurt, coriander and sev in front of the Curry on Wheels sign' },
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;
