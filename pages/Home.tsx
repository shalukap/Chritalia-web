import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ArrowLeft, Star } from 'lucide-react';
import Reveal, { useInView } from '../components/Reveal';
import LiquidImage from '../components/three/LiquidImage';
import { SplitText, Magnetic, Tilt, CountUp, VelocityMarquee, ScrollScale } from '../components/motion';
import { scrollToElement } from '../lib/smoothScroll';
import { IMAGES, PROMO_VIDEO, HERO_IMAGES } from '../constants';
import { useI18n } from '../i18n';
import { useContent } from '../i18n/content';

const Eyebrow: React.FC<{ children: React.ReactNode; className?: string; light?: boolean }> = ({ children, className = '', light }) => (
  <div className={`flex items-center gap-3 mb-6 text-xs font-semibold uppercase tracking-[0.25em] ${light ? 'text-white/60' : 'text-ink-soft'} ${className}`}>
    <span className="h-px w-10 bg-accent" />
    {children}
  </div>
);

/* Hero slider: real fleet renders with a WebGL liquid transition. */
const SLIDE_MS = 6000;
const HeroSlider: React.FC = () => {
  const { t } = useI18n();
  const { heroSlides } = useContent();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, paused]);

  const go = (dir: number) => setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length);
  const slide = heroSlides[index];

  return (
    <div className="relative" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <LiquidImage
        images={HERO_IMAGES}
        index={index}
        alt={t.home.fleetAlt}
        className="aspect-[4/3.2] rounded-3xl shadow-[0_50px_100px_-50px_rgba(11,37,69,0.6)]"
      />

      {/* Caption panel */}
      <div className="absolute left-4 right-4 bottom-4 md:left-6 md:right-6 md:bottom-6 flex items-end justify-between gap-4 pointer-events-none">
        <div key={index} className="fade-up glass-strong rounded-2xl px-5 py-4 max-w-xs">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-deep mb-1">{slide.title}</div>
          <div className="text-sm font-medium text-navy">{slide.caption}</div>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto">
          <button onClick={() => go(-1)} aria-label={t.home.prev} className="w-11 h-11 rounded-full glass-strong text-navy flex items-center justify-center hover:bg-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button onClick={() => go(1)} aria-label={t.home.next} className="w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center hover:bg-navy-3 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Counter + progress */}
      <div className="mt-5 flex items-center gap-4 text-xs font-semibold text-ink-soft">
        <span className="tabular-nums text-navy">{String(index + 1).padStart(2, '0')}</span>
        <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${heroSlides.length}, 1fr)` }}>
          {heroSlides.map((s, i) => (
            <button key={s.src} onClick={() => setIndex(i)} aria-label={`${t.home.show} ${s.title}`} className="h-[3px] bg-navy/10 rounded-full overflow-hidden">
              {i < index && <span className="block h-full bg-navy" />}
              {i === index && (
                <span
                  key={`${index}-${paused}`}
                  className={`block h-full bg-accent ${paused ? '' : 'progress-line'}`}
                  style={{ animationDuration: `${SLIDE_MS}ms`, transform: paused ? 'scaleX(1)' : undefined }}
                />
              )}
            </button>
          ))}
        </div>
        <span className="tabular-nums">{String(heroSlides.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

/* Services as rows; a photo card follows the cursor while hovering. */
const ServiceList: React.FC = () => {
  const { services } = useContent();
  const [hovered, setHovered] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let lastX = 0;
    let raf = 0;
    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.1;
      pos.y += (target.y - pos.y) * 0.1;
      const vx = pos.x - lastX;
      lastX = pos.x;
      const rot = Math.max(-8, Math.min(8, vx * 0.3));
      if (preview.current) preview.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) rotate(${rot}deg)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div onPointerLeave={() => setHovered(null)} className="glass rounded-3xl px-5 md:px-10">
      {services.map((service, i) => (
        <Link
          key={service.id}
          to="/services"
          onPointerEnter={() => setHovered(i)}
          className="group relative grid grid-cols-12 items-center gap-4 py-8 md:py-10 border-b border-navy/10 last:border-b-0"
        >
          <span className="absolute inset-x-0 bottom-[-1px] h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          <span className="col-span-2 md:col-span-1 font-display text-sm font-semibold text-ink-faint group-hover:text-accent-deep transition-colors">0{i + 1}</span>
          <span className="col-span-10 md:col-span-6 font-display font-semibold text-2xl md:text-4xl tracking-tight text-navy group-hover:translate-x-2 transition-transform duration-500">
            {service.title}
          </span>
          <span className="hidden md:block md:col-span-4 text-sm text-ink-soft leading-relaxed">{service.description}</span>
          <span className="hidden md:flex col-span-1 justify-end">
            <span className="w-11 h-11 rounded-full border border-ink/15 group-hover:bg-navy group-hover:border-navy group-hover:text-white flex items-center justify-center transition-all duration-500">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </span>
        </Link>
      ))}

      <div ref={preview} className="fixed left-0 top-0 z-40 pointer-events-none hidden lg:block" aria-hidden="true">
        <div
          className={`relative w-80 h-52 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hovered !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          {services.map((s, i) => (
            <img key={s.id} src={s.image} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hovered === i ? 'opacity-100' : 'opacity-0'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* Stylised map: routes draw themselves from Verona, dots travel along them. */
type LabelSide = 'right' | 'left' | 'below';
// Positions only; names come from the active language (same order).
const CITY_POINTS: { x: number; y: number; eta: string; side?: LabelSide }[] = [
  { x: 430, y: 419, eta: '2h', side: 'below' },
  { x: 522, y: 301, eta: '5h' },
  { x: 263, y: 405, eta: '8h' },
  { x: 167, y: 270, eta: '11h' },
  { x: 160, y: 596, eta: '13h' },
  { x: 885, y: 122, eta: '16h', side: 'left' },
];
type City = (typeof CITY_POINTS)[number] & { name: string };
const VERONA = { x: 500, y: 420 };
const routePath = (c: { x: number; y: number }) => {
  const mx = (VERONA.x + c.x) / 2;
  const my = (VERONA.y + c.y) / 2 - Math.hypot(c.x - VERONA.x, c.y - VERONA.y) * 0.25;
  return `M${VERONA.x},${VERONA.y} Q${mx},${my} ${c.x},${c.y}`;
};
const labelWidth = (name: string) => name.length * 12 + 58;
const labelOffset = (c: City) => {
  const w = labelWidth(c.name);
  if (c.side === 'left') return `${c.x - 16 - w}, ${c.y - 17}`;
  if (c.side === 'below') return `${c.x - w / 2}, ${c.y + 16}`;
  return `${c.x + 16}, ${c.y - 17}`;
};

const CoverageMap: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const { t } = useI18n();
  const cities: City[] = CITY_POINTS.map((p, i) => ({ ...p, name: t.home.cities[i] }));
  const hqWidth = t.common.hq.length * 9 + 40;
  return (
    <div ref={ref} className={`relative ${inView ? 'is-visible' : ''}`}>
      <svg viewBox="0 0 1000 720" className="w-full h-auto" role="img" aria-label={t.home.mapAria}>
        <defs>
          <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="#ffffff" opacity="0.12" />
          </pattern>
        </defs>
        <rect width="1000" height="720" fill="url(#dots)" />
        {/* Routes first so every label sits above every line */}
        {cities.map((c, i) => (
          <g key={i}>
            <path d={routePath(c)} fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="8" strokeLinecap="round" />
            <path className="route" d={routePath(c)} fill="none" stroke="#c9a24d" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="900" style={{ transitionDelay: `${i * 150}ms` }} />
            {inView && (
              <circle r="6" fill="#ffffff">
                <animateMotion dur={`${3.5 + i * 0.6}s`} repeatCount="indefinite" path={routePath(c)} begin={`${1.5 + i * 0.3}s`} />
              </circle>
            )}
          </g>
        ))}
        {cities.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r="9" fill="#c9a24d" className="ping" style={{ animationDelay: `${i * 0.4}s` }} />
            <circle cx={c.x} cy={c.y} r="6" fill="#0b2545" stroke="#c9a24d" strokeWidth="2.5" />
            <g transform={`translate(${labelOffset(c)})`}>
              <rect width={labelWidth(c.name)} height="34" rx="17" fill="#ffffff" fillOpacity="0.95" />
              <text x="14" y="22" fontFamily="Montserrat, sans-serif" fontWeight="600" fontSize="15" fill="#0b2545">{c.name}</text>
              <text x={labelWidth(c.name) - 12} y="22" textAnchor="end" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="12" fill="#8f6b1f">{c.eta}</text>
            </g>
          </g>
        ))}
        <circle cx={VERONA.x} cy={VERONA.y} r="20" fill="#c9a24d" className="ping" />
        <circle cx={VERONA.x} cy={VERONA.y} r="13" fill="#c9a24d" />
        <circle cx={VERONA.x} cy={VERONA.y} r="5" fill="#0b2545" />
        <g transform={`translate(${VERONA.x + 26}, ${VERONA.y - 6})`}>
          <rect width={hqWidth} height="36" rx="18" fill="#c9a24d" />
          <text x={hqWidth / 2} y="23" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="14" fill="#0b2545">{t.common.hq}</text>
        </g>
      </svg>
    </div>
  );
};

const Home: React.FC = () => {
  const { t } = useI18n();
  const { fleet, trust, testimonials, kpis } = useContent();
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveQuote((q) => (q + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="fade-up" style={{ animationDelay: '0.1s' }}>
              <Eyebrow>{t.home.eyebrow}</Eyebrow>
            </div>
            <h1 className="font-display font-bold text-navy tracking-tight leading-[1.02] text-[11vw] sm:text-6xl xl:text-[4.1rem]">
              <SplitText text={t.home.title} immediate delay={200} stagger={80} />
            </h1>
            <p className="fade-up mt-8 text-lg text-ink-soft max-w-md leading-relaxed" style={{ animationDelay: '0.9s' }}>
              {t.home.lead}
            </p>
            <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: '1.1s' }}>
              <Magnetic strength={0.25}>
                <Link to="/contact" className="group inline-flex items-center gap-3 bg-navy text-white pl-7 pr-2 py-2 rounded-full font-semibold hover:bg-navy-3 transition-colors">
                  {t.common.requestQuote}
                  <span className="w-10 h-10 rounded-full bg-accent text-navy flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </Magnetic>
              <button
                onClick={() => { const el = document.getElementById('fleet'); if (el) scrollToElement(el); }}
                className="inline-flex items-center px-7 py-4 rounded-full font-semibold text-navy border border-navy/15 hover:border-navy hover:bg-white transition-colors"
              >
                {t.home.exploreFleet}
              </button>
            </div>

            <div className="fade-up mt-12 grid grid-cols-3 gap-4 max-w-md glass rounded-2xl p-5" style={{ animationDelay: '1.3s' }}>
              {[
                { value: '4,000', suffix: '+', label: t.home.stats[0] },
                { value: '99.8', suffix: '%', label: t.home.stats[1] },
                { value: '20', suffix: '+', label: t.home.stats[2] },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-display font-bold text-2xl md:text-3xl text-navy tracking-tight">
                    <CountUp value={s.value} />
                    <span className="text-accent">{s.suffix}</span>
                  </div>
                  <div className="text-xs text-ink-soft mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 fade-up" style={{ animationDelay: '0.4s' }}>
            <HeroSlider />
          </div>
        </div>
      </section>

      {/* ── Cities marquee ───────────────────────────────── */}
      <VelocityMarquee className="py-8 border-y border-ink/10" speed={40}>
        {['Verona', 'Milano', 'München', 'Lyon', 'Paris', 'Barcelona', 'Warszawa', 'Wien', 'Zürich'].map((city) => (
          <span key={city} className="flex items-center font-display font-semibold text-4xl md:text-6xl tracking-tight text-navy/85 px-6 md:px-10 whitespace-nowrap">
            {city}
            <span className="ml-12 md:ml-20 inline-block w-2.5 h-2.5 rounded-full bg-accent" />
          </span>
        ))}
      </VelocityMarquee>

      {/* ── Intro ────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Eyebrow>{t.home.introEyebrow}</Eyebrow>
            <h2 className="font-display font-semibold text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.18] tracking-tight text-navy">
              <SplitText text={t.home.intro} stagger={22} />
            </h2>
            <Reveal className="mt-10 grid sm:grid-cols-2 gap-3">
              {trust.map((badge, i) => (
                <div key={i} className="flex items-center gap-3 glass rounded-xl px-4 py-3.5 text-sm font-medium text-navy">
                  <span className="text-accent-deep">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-6 grid grid-cols-5 gap-4 items-end">
            <Reveal className="col-span-3">
              <Tilt className="rounded-3xl overflow-hidden" max={5}>
                <img src={IMAGES.hubScania} alt={t.home.hubAlt} className="w-full aspect-[3/4] object-cover" />
              </Tilt>
            </Reveal>
            <div className="col-span-2 space-y-4">
              <Reveal delay={120}>
                <Tilt className="rounded-3xl overflow-hidden" max={6}>
                  <img src={IMAGES.letteringDetail} alt={t.home.letteringAlt} className="w-full aspect-square object-cover" />
                </Tilt>
              </Reveal>
              <Reveal delay={220} className="rounded-3xl bg-navy text-white p-6">
                <div className="font-display font-bold text-4xl tracking-tight"><CountUp value="10" /><span className="text-accent">+</span></div>
                <div className="text-sm text-white/70 mt-1">{t.home.drivers}</div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fleet ────────────────────────────────────────── */}
      <section id="fleet" className="py-20 md:py-28 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <Eyebrow>{t.home.fleetEyebrow}</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.02] text-navy">
                <SplitText text={t.home.fleetTitle} />
              </h2>
            </div>
            <Reveal className="max-w-sm text-ink-soft leading-relaxed">
              {t.home.fleetLead}
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {fleet.map((v, i) => (
              <Reveal key={v.id} delay={i * 120}>
                <article className="group glass rounded-3xl p-3 h-full">
                  <div className="relative">
                    <LiquidImage images={[v.image]} alt={v.name} lens={0.8} className="aspect-[4/3] rounded-2xl" />
                    <span className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[11px] font-semibold text-navy pointer-events-none">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="pt-6 px-3 pb-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-deep mb-2">{v.tagline}</div>
                    <h3 className="font-display font-bold text-2xl text-navy tracking-tight mb-3">{v.name}</h3>
                    <p className="text-sm text-ink-soft leading-relaxed mb-5">{v.description}</p>
                    <dl className="grid grid-cols-3 border-t border-ink/10">
                      {v.specs.map((s, si) => (
                        <div key={si} className="pt-4 pr-2">
                          <dt className="text-[10px] uppercase tracking-[0.15em] text-ink-faint">{s.label}</dt>
                          <dd className="font-display font-semibold text-sm text-navy mt-1">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Eyebrow>{t.home.servicesEyebrow}</Eyebrow>
              <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.02] text-navy">
                <SplitText text={t.home.servicesTitle} />
              </h2>
            </div>
            <Reveal>
              <Link to="/services" className="inline-flex items-center gap-2 font-semibold text-navy border-b border-accent pb-1 hover:gap-4 transition-all">
                {t.home.allServices} <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
          <ServiceList />
        </div>
      </section>

      {/* ── On the road (uploaded video) + numbers ───────── */}
      <section className="relative py-20 md:py-28 bg-navy text-white overflow-hidden">
        <div className="glow w-[36rem] h-[36rem] bg-navy-3 -top-40 -left-40" />
        <div className="glow w-[28rem] h-[28rem] bg-[#3a6fc0] -bottom-48 -right-24" style={{ animationDelay: '-8s' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <Tilt className="relative mx-auto max-w-[340px] rounded-[2.25rem] overflow-hidden bg-black ring-1 ring-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]" max={6}>
              <div className="aspect-[9/16]">
                <video src={PROMO_VIDEO} poster={IMAGES.ducatoDolomites} autoPlay muted loop playsInline className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-black/40 backdrop-blur rounded-full px-3 py-1.5 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> {t.home.onTheRoad}
              </div>
            </Tilt>
          </Reveal>

          <div className="lg:col-span-7">
            <Eyebrow light>{t.home.whyEyebrow}</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.05] mb-8">
              <SplitText text={t.home.whyTitle} />
            </h2>
            <Reveal className="text-white/70 leading-relaxed mb-12 max-w-xl">
              {t.home.whyText}
            </Reveal>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {kpis.map((kpi, i) => (
                <Reveal key={i} delay={i * 100} className="glass-dark rounded-2xl p-6 md:p-8">
                  <div className="font-display font-bold text-4xl md:text-5xl tracking-tight">
                    <CountUp value={kpi.value} />
                    <span className="text-accent">{kpi.suffix}</span>
                  </div>
                  <div className="text-sm text-white/60 mt-2">{kpi.label}</div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <Link to="/about" className="inline-flex items-center gap-2 font-semibold border-b border-accent pb-1 hover:gap-4 transition-all">
                {t.home.readStory} <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Coverage ─────────────────────────────────────── */}
      <section id="coverage" className="py-20 md:py-28 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-4 glass rounded-3xl p-8">
            <Eyebrow>{t.home.coverageEyebrow}</Eyebrow>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-[1.05] text-navy mb-6">
              <SplitText text={t.home.coverageTitle} />
            </h2>
            <Reveal className="text-ink-soft leading-relaxed mb-8">
              {t.home.coverageText}
            </Reveal>
            <Reveal className="flex items-end gap-4">
              <span className="font-display font-bold text-6xl tracking-tight text-navy">
                <CountUp value="20" /><span className="text-accent">+</span>
              </span>
              <span className="text-sm text-ink-soft pb-2 max-w-[6rem] leading-snug">{t.home.targetCountries}</span>
            </Reveal>
            <p className="text-xs text-ink-faint mt-6">{t.home.indicative}</p>
          </div>
          <Reveal className="lg:col-span-8 rounded-3xl bg-navy overflow-hidden">
            <CoverageMap />
          </Reveal>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>{t.home.processEyebrow}</Eyebrow>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-[1.02] text-navy mb-16">
            <SplitText text={t.home.processTitle} />
          </h2>

          <div className="grid md:grid-cols-5 gap-4">
            {t.home.steps.map((step, i) => (
              <Reveal key={i} delay={i * 100} className="group relative glass rounded-2xl p-6 h-full overflow-hidden">
                <span className="absolute top-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-700" />
                <div className="font-display text-sm font-semibold text-accent-deep mb-10">0{i + 1}</div>
                <h3 className="font-display font-bold text-xl text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand banner ─────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollScale>
            <div className="relative">
              <img src={IMAGES.volvoConvoy} alt={t.home.bannerAlt} className="w-full h-[52vh] md:h-[70vh] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/50 via-navy/10 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="mx-5 md:mx-12 max-w-xl glass-dark rounded-3xl p-7 md:p-10">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-5">Insieme più lontano</div>
                  <h2 className="font-display font-bold text-white text-4xl md:text-6xl tracking-tight leading-[1.02]">
                    {t.home.bannerTitle}
                  </h2>
                  <p className="text-white/75 mt-6 max-w-md leading-relaxed">
                    {t.home.bannerText}
                  </p>
                </div>
              </div>
            </div>
          </ScrollScale>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-4 sm:mx-6 lg:mx-auto text-center glass rounded-[2rem] px-6 py-12 md:px-14 md:py-16">
          <Eyebrow className="justify-center">{t.home.testimonialsEyebrow}</Eyebrow>
          <div className="relative min-h-[340px] md:min-h-[250px]">
            {testimonials.map((q, i) => (
              <figure
                key={q.id}
                className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === activeQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
                }`}
              >
                <div className="flex justify-center gap-1 text-accent mb-6">
                  {[...Array(q.rating)].map((_, s) => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <blockquote className="font-display font-medium text-xl md:text-3xl tracking-tight leading-snug text-navy mb-8">
                  “{q.content}”
                </blockquote>
                <figcaption>
                  <span className="block font-semibold text-navy">{q.name}</span>
                  <span className="block text-sm text-ink-soft">{q.company}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setActiveQuote(i)}
                aria-label={`${t.home.showTestimonial} ${q.name}`}
                className={`h-[3px] rounded-full transition-all duration-500 ${i === activeQuote ? 'w-10 bg-navy' : 'w-5 bg-navy/20 hover:bg-navy/40'}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
