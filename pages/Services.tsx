
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Package, Cpu, Factory, ShoppingBag, FlaskConical, Car, ArrowRight } from 'lucide-react';
import { IMAGES } from '../constants';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import LiquidImage from '../components/three/LiquidImage';
import { SplitText, Magnetic, Tilt } from '../components/motion';
import { useI18n } from '../i18n';
import { useContent } from '../i18n/content';

const INDUSTRY_ICONS = [Factory, ShoppingBag, Package, Car, FlaskConical, Cpu];

const Services: React.FC = () => {
  const { t } = useI18n();
  const { services, fleet } = useContent();
  const p = t.servicesPage;

  return (
    <div>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        subtitle={p.subtitle}
        image={IMAGES.renaultDepot}
        imageAlt={p.imageAlt}
        caption={p.caption}
      />

      {/* Services as alternating chapters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 space-y-24 md:space-y-32">
        {services.map((service, idx) => (
          <section key={service.id} className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal className={`lg:col-span-7 ${idx % 2 ? 'lg:order-2' : ''}`}>
              <LiquidImage images={[service.image]} alt={service.title} lens={0.7} className="aspect-[16/10] rounded-3xl" />
            </Reveal>

            <div className={`lg:col-span-5 glass rounded-3xl p-8 md:p-10 ${idx % 2 ? 'lg:order-1' : ''}`}>
              <Reveal className="flex items-center gap-4 mb-6">
                <span className="w-12 h-12 rounded-xl bg-navy text-accent flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6">
                  {service.icon}
                </span>
                <span className="font-display text-sm font-semibold text-accent-deep">0{idx + 1}</span>
              </Reveal>
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-[1.08] text-navy mb-5">
                <SplitText text={service.title} />
              </h2>
              <Reveal className="text-ink-soft leading-relaxed mb-8">
                {service.description} {p.care}
              </Reveal>
              <Reveal as="ul" className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {p.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-navy">
                    <Check className="w-4 h-4 text-accent-deep mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      {/* Fleet line-up */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.02] text-navy mb-14">
            <SplitText text={p.fleetTitle} />
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {fleet.map((v, i) => (
              <Reveal key={v.id} delay={i * 120}>
                <Tilt className="rounded-3xl overflow-hidden glass p-2 h-full" max={4}>
                  <img src={v.image} alt={v.name} className="w-full aspect-[4/3] object-cover rounded-2xl" />
                  <div className="p-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-deep mb-1">{v.tagline}</div>
                    <h3 className="font-display font-bold text-2xl text-navy tracking-tight mb-4">{v.name}</h3>
                    <div className="flex gap-6">
                      {v.specs.map((s, si) => (
                        <div key={si}>
                          <div className="text-[10px] uppercase tracking-[0.15em] text-ink-faint">{s.label}</div>
                          <div className="font-display font-semibold text-sm text-navy">{s.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries + quote */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.05] text-navy mb-10">
              <SplitText text={p.industriesTitle} />
            </h2>
            <Reveal className="grid grid-cols-2 gap-3">
              {p.industries.map((label, i) => {
                const Icon = INDUSTRY_ICONS[i];
                return (
                  <div key={label} className="flex items-center gap-3 glass rounded-xl px-4 py-4 text-sm font-medium text-navy">
                    <span className="text-accent-deep"><Icon className="w-5 h-5" /></span>
                    {label}
                  </div>
                );
              })}
            </Reveal>
          </div>

          <Reveal>
            <div className="relative rounded-3xl overflow-hidden bg-navy text-white p-5 md:p-8">
              <img src={IMAGES.warehouseSunset} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-navy/45" />
              <div className="relative glass-dark rounded-2xl p-8 md:p-10">
                <h3 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-4">{p.quoteTitle}</h3>
                <p className="text-white/70 mb-8 leading-relaxed max-w-md">{p.quoteText}</p>
                <Magnetic strength={0.25}>
                  <Link to="/contact" className="group inline-flex items-center gap-3 bg-accent text-navy px-7 py-4 rounded-full font-semibold hover:bg-white transition-colors">
                    {t.common.requestQuote} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
                <p className="text-sm text-white/50 mt-6">{t.common.respond}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Services;
