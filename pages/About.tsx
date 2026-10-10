
import React from 'react';
import { ShieldCheck, Users, Target, Award } from 'lucide-react';
import { IMAGES } from '../constants';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { SplitText, Tilt, CountUp, ScrollScale } from '../components/motion';
import { useI18n } from '../i18n';
import { useContent } from '../i18n/content';

const VALUE_ICONS = [ShieldCheck, Users, Target];
const GALLERY = [IMAGES.scaniaTuscany, IMAGES.ducatoDolomites, IMAGES.lineupDepot, IMAGES.mixedFleetDepot];

const About: React.FC = () => {
  const { t } = useI18n();
  const { kpis } = useContent();
  const p = t.aboutPage;

  return (
    <div>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        subtitle={p.subtitle}
        image={IMAGES.hubScania}
        imageAlt={p.imageAlt}
        caption={p.caption}
      />

      {/* Narrative */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.05] text-navy mb-10">
              <SplitText text={p.narrativeTitle} />
            </h2>
            <Reveal className="flex items-center gap-4 glass rounded-2xl p-5">
              <span className="w-12 h-12 rounded-xl bg-navy text-accent flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6" />
              </span>
              <span>
                <span className="block font-display font-semibold text-navy">{p.certTitle}</span>
                <span className="block text-sm text-ink-soft">{p.certText}</span>
              </span>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-6 text-ink-soft leading-relaxed">
            <p className="font-display font-medium text-xl md:text-2xl text-navy leading-snug tracking-tight">
              <SplitText text={p.paragraphs[0]} stagger={16} />
            </p>
            {p.paragraphs.slice(1).map((para, i) => (
              <Reveal key={i} delay={i * 100}>{para}</Reveal>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, i) => (
              <Reveal key={i} delay={i * 100} className="glass rounded-2xl p-7 md:p-9">
                <div className="font-display font-bold text-4xl md:text-5xl tracking-tight text-navy">
                  <CountUp value={kpi.value} /><span className="text-accent">{kpi.suffix}</span>
                </div>
                <div className="text-sm text-ink-soft mt-2">{kpi.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollScale>
            <img src={IMAGES.volvoHighway} alt={p.bannerAlt} className="w-full h-[50vh] md:h-[68vh] object-cover" />
          </ScrollScale>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 md:py-28 bg-navy text-white overflow-hidden">
        <div className="glow w-[36rem] h-[36rem] bg-navy-3 -top-40 -left-40" />
        <div className="glow w-[28rem] h-[28rem] bg-[#3a6fc0] -bottom-48 -right-24" style={{ animationDelay: '-8s' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.02] mb-14">
            <SplitText text={p.pillarsTitle} />
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {p.values.map((val, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <Reveal key={i} delay={i * 120} className="group glass-dark rounded-2xl p-9 md:p-10 hover:bg-white/10 transition-colors duration-500">
                  <div className="w-12 h-12 rounded-xl border border-accent/40 text-accent flex items-center justify-center mb-14">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-2xl tracking-tight mb-3">{val.title}</h3>
                  <p className="text-white/65 leading-relaxed">{val.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-navy mb-12">
            <SplitText text={p.galleryTitle} />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((src, i) => (
              <Reveal key={src} delay={i * 100} className={i % 2 ? 'md:mt-14' : ''}>
                <Tilt className="group rounded-2xl overflow-hidden" max={6}>
                  <img src={src} alt={p.gallery[i]} className="w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <span className="absolute bottom-4 left-4 glass rounded-full px-3.5 py-1.5 text-xs font-semibold text-navy">{p.gallery[i]}</span>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
