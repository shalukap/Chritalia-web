
import React from 'react';
import { Globe, MapPin, Zap, ShieldCheck, Clock, UserCheck, Activity } from 'lucide-react';
import type { Dict } from './i18n/en';

type NavKey = keyof Omit<Dict['nav'], 'quote' | 'openMenu' | 'closeMenu' | 'language'>;

export const BRAND_NAME = "Chritalia SAS";

const brand = (file: string) => `/imgs/brand/${file}.webp`;

// Photorealistic renders and photos of the Chritalia fleet (see public/imgs/brand).
export const IMAGES = {
  hubScania: brand('hub-scania'),
  volvoHighway: brand('volvo-highway'),
  volvoConvoy: brand('volvo-convoy'),
  actrosDepot: brand('actros-depot'),
  renaultDepot: brand('renault-depot'),
  scaniaTuscany: brand('scania-tuscany'),
  letteringDetail: brand('lettering-detail'),
  mixedFleetDepot: brand('mixed-fleet-depot'),
  vanLorryAlps: brand('van-lorry-alps'),
  lineupDepot: brand('lineup-depot'),
  warehouseSunset: brand('warehouse-sunset'),
  ducatoDolomites: brand('ducato-dolomites'),
  ducatoCard: brand('ducato-dolomites-card'),
  lorryAlps: brand('lorry-alps'),
  nightHighway: brand('night-highway'),
};

export const PROMO_VIDEO = '/videos/about-video.mp4';
export const LOGO_URL = '/imgs/NewLogo.png';

/** Images for the home hero slider (captions live in the translations). */
export const HERO_IMAGES = [IMAGES.volvoHighway, IMAGES.actrosDepot, IMAGES.vanLorryAlps, IMAGES.renaultDepot];

// Language-independent data. Text for each item lives in i18n/<lang>.ts at the same index.
export const NAV_LINKS: { key: NavKey; href: string }[] = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'fleet', href: '/#fleet' },
  { key: 'coverage', href: '/#coverage' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
];

export const SERVICE_META = [
  { id: 'domestic', icon: <MapPin className="w-8 h-8" />, image: IMAGES.vanLorryAlps },
  { id: 'international', icon: <Globe className="w-8 h-8" />, image: IMAGES.volvoHighway },
  { id: 'logistics', icon: <Activity className="w-8 h-8" />, image: IMAGES.mixedFleetDepot },
  { id: 'express', icon: <Zap className="w-8 h-8" />, image: IMAGES.nightHighway },
];

export const FLEET_META = [
  { id: 'trucks', image: IMAGES.actrosDepot },
  { id: 'lorries', image: IMAGES.lorryAlps },
  { id: 'vans', image: IMAGES.ducatoCard },
];

export const TRUST_ICONS = [
  <Clock className="w-5 h-5" />,
  <ShieldCheck className="w-5 h-5" />,
  <UserCheck className="w-5 h-5" />,
  <Activity className="w-5 h-5" />,
];

export const TESTIMONIAL_META = [
  { id: '1', name: 'Marco Rossi', company: 'Verona Manufacturing Ltd.', rating: 5 },
  { id: '2', name: 'Elena Bianchi', company: 'EuroDistribution GmbH', rating: 5 },
  { id: '3', name: 'Giovanni Verde', company: 'Italian Retail Solutions', rating: 4 },
];

export const KPI_VALUES = [
  { value: '4,000', suffix: '+' },
  { value: '99.8', suffix: '%' },
  { value: '24', suffix: '' },
  { value: '10', suffix: '+' },
];
