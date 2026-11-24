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
import curryTeam from '@/assets/img/curry-on-wheels-team.jpeg';
import mangoLassi from '@/assets/img/mango-lassi.webp';
import chaatBowl from '@/assets/img/chaat-bowl.jpeg';


import corndogHero from '@/assets/img/32.jpeg';
import corndogBox from '@/assets/img/corndog.jpeg';
import corndogProcess from '@/assets/img/corndog-process.jpg';
import burger from '@/assets/img/burger.jpeg';
import hotdog from '@/assets/img/hotdog.jpeg';
import macCheese from '@/assets/img/mac & cheese.jpeg';
import koreanBowls from '@/assets/img/40.jpeg';
import curryChaatSign from '@/assets/img/curry-1.jpeg';
import curryTeamSelfie from '@/assets/img/curry-on-wheels-team-1.jpeg';
import curryTeamKitchen from '@/assets/img/curry-on-wheels-team-2.jpeg';
import momoPlate from '@/assets/img/momo.jpeg';
import momoBeef from '@/assets/img/rindfleish-momo.jpg';
import momoVeg from '@/assets/img/vegan-momo.jpg';
import curryTeamCart from '@/assets/img/curry-on-wheels-team-cart.jpeg';
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
  corndogHero: {
    src: corndogHero, w: 1536, h: 2048,
    alt: { de: 'Kartoffel-Corndog und klassischer Corndog mit Ketchup und Mayo vor der Speisekarte', en: 'Potato corndog and classic corndog with ketchup and mayo in front of the menu' },
  },
  corndogProcess: {
    src: corndogProcess, w: 821, h: 1853,
    alt: { de: 'Infografik: So baust du deinen HillyBilly Corndog in drei Schritten. Inhalt, Topping und Saucen.', en: 'Infographic: build your HillyBilly corndog in three steps. Filling, topping and sauces.' },
  },
  corndogBox: {
    src: corndogBox, w: 1086, h: 1448,
    alt: { de: 'Corndog mit Ketchup und Senf in der pinken HillyBilly-Corndogs-Box', en: 'Corndog with ketchup and mustard in the pink HillyBilly Corndogs box' },
  },
  burger: {
    src: burger, w: 1254, h: 1254,
    alt: { de: 'Saftiger Cheeseburger mit karamellisierten Zwiebeln in der pinken HillyBilly-Foods-Box', en: 'Juicy cheeseburger with caramelised onions in the pink HillyBilly Foods box' },
  },
  hotdog: {
    src: hotdog, w: 1254, h: 1254,
    alt: { de: 'Hotdog mit Käsesauce, Röstzwiebeln und Jalapeños im pinken Karo-Papier', en: 'Hot dog with cheese sauce, crispy onions and jalapeños on pink checkered paper' },
  },
  macCheese: {
    src: macCheese, w: 1199, h: 1312,
    alt: { de: 'Zwei pinke Mac-&-Cheese-Becher, einer mit Nachos und einer mit gebratenen Pilzen', en: 'Two pink mac & cheese cups, one topped with nachos and one with roasted mushrooms' },
  },
  koreanBowls: {
    src: koreanBowls, w: 1536, h: 1024,
    alt: { de: 'Korean Fried Chicken Bowl mit Reis und Edamame neben einer Portion Korean Fried Chicken', en: 'Korean fried chicken bowl with rice and edamame next to a portion of Korean fried chicken' },
  },
  curryChaatSign: {
    src: curryChaatSign, w: 1448, h: 1086,
    alt: { de: 'Kichererbsen-Chaat in der Schale vor dem Curry-on-Wheels-Schild', en: 'Chickpea chaat in a bowl in front of the Curry on Wheels sign' },
  },
  curryTeamSelfie: {
    src: curryTeamSelfie, w: 1599, h: 1200,
    alt: { de: 'Zwei lachende Mitarbeiterinnen von Curry on Wheels in blauen Shirts am Verkaufsstand', en: 'Two smiling Curry on Wheels team members in blue shirts at the stand' },
  },
  curryTeamKitchen: {
    src: curryTeamKitchen, w: 1016, h: 771,
    alt: { de: 'Lächelnde Mitarbeiterin von Curry on Wheels in der Foodtruck-Küche neben den Reiskochern', en: 'Smiling Curry on Wheels team member in the food truck kitchen next to the rice cookers' },
  },
  momoPlate: {
    src: momoPlate, w: 1254, h: 1254,
    alt: { de: 'Teller mit gedämpften Momos, Sesam und zwei Chutneys vor einer Momos-Tafel', en: 'Plate of steamed momos with sesame and two chutneys in front of a momos chalkboard' },
  },
  momoBeef: {
    src: momoBeef, w: 1079, h: 717,
    alt: { de: 'Gedämpfte Rindfleisch-Momos mit Chutney und Holzgabel', en: 'Steamed beef momos with chutney and a wooden fork' },
  },
  momoVeg: {
    src: momoVeg, w: 1136, h: 701,
    alt: { de: 'Gedämpfte vegetarische Momos mit Chili-Chutney und Holzgabel', en: 'Steamed vegetable momos with chilli chutney and a wooden fork' },
  },
  curryTeamCart: {
    src: curryTeamCart, w: 1480, h: 666,
    alt: { de: 'Türkiser Curry-on-Wheels-Verkaufsanhänger mit Speisekarten-Postern und zwei Teammitgliedern', en: 'Turquoise Curry on Wheels trailer with menu posters and two team members' },
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;
