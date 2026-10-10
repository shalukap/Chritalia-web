import React from 'react';
import LiquidImage from './three/LiquidImage';
import { SplitText } from './motion';
import { useI18n } from '../i18n';

interface PageHeroProps {
  eyebrow: string;
  /** Use \n for line breaks and *word* for accent words. */
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  caption?: string;
}

// Shared hero for inner pages: headline on the left, interactive brand image on the right.
const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, subtitle, image, imageAlt, caption }) => {
  const { t } = useI18n();
  return (
  <section className="relative pt-36 md:pt-44 pb-16 md:pb-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
      <div className="lg:col-span-6">
        <div className="fade-up flex items-center gap-3 mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft" style={{ animationDelay: '0.1s' }}>
          <span className="h-px w-10 bg-accent" />
          {eyebrow}
        </div>
        <h1 className="font-display font-bold text-navy tracking-tight leading-[1.02] text-[11vw] sm:text-6xl lg:text-7xl">
          <SplitText text={title} immediate delay={200} stagger={70} />
        </h1>
        <p className="fade-up mt-8 text-lg text-ink-soft max-w-lg leading-relaxed" style={{ animationDelay: '0.8s' }}>
          {subtitle}
        </p>
      </div>

      <div className="lg:col-span-6 fade-up" style={{ animationDelay: '0.4s' }}>
        <div className="relative">
          <LiquidImage images={[image]} alt={imageAlt} className="aspect-[4/3] rounded-3xl shadow-[0_40px_80px_-40px_rgba(11,37,69,0.45)]" />
          <div className="hidden md:flex absolute -top-5 -right-3 glass-strong rounded-2xl px-5 py-4 items-center gap-3 pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_0_6px_rgba(201,162,77,0.2)]" />
            <span className="text-xs font-semibold text-navy leading-tight">{t.common.hq}<br /><span className="font-medium text-ink-soft">{t.common.italyEurope}</span></span>
          </div>
          {caption && (
            <div className="absolute left-5 bottom-5 glass rounded-full px-4 py-2 text-xs font-semibold text-navy pointer-events-none">
              {caption}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
  );
};

export default PageHero;
