import { useMemo } from 'react';
import { useI18n } from '.';
import {
  NAV_LINKS,
  SERVICE_META,
  FLEET_META,
  TRUST_ICONS,
  TESTIMONIAL_META,
  KPI_VALUES,
  HERO_IMAGES,
} from '../constants';

/** Site data (images, icons, numbers) merged with the text of the active language. */
export function useContent() {
  const { t } = useI18n();
  return useMemo(
    () => ({
      navLinks: NAV_LINKS.map((l) => ({ href: l.href, label: t.nav[l.key] })),
      services: SERVICE_META.map((m, i) => ({ ...m, ...t.services[i] })),
      fleet: FLEET_META.map((m, i) => ({ ...m, ...t.fleet[i] })),
      trust: TRUST_ICONS.map((icon, i) => ({ icon, label: t.trust[i] })),
      testimonials: TESTIMONIAL_META.map((m, i) => ({ ...m, content: t.testimonials[i] })),
      kpis: KPI_VALUES.map((k, i) => ({ ...k, label: t.kpis[i] })),
      heroSlides: HERO_IMAGES.map((src, i) => ({ src, ...t.heroSlides[i] })),
    }),
    [t]
  );
}
