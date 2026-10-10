import React, { useEffect, useRef, useState } from 'react';
import { useInView } from './Reveal';
import { useI18n } from '../i18n';

/* ── SplitText ──────────────────────────────────────────────
   Words slide up out of a mask one after another. Wrap a word
   in *asterisks* to colour it with the accent. */
export const SplitText: React.FC<{
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}> = ({ text, className = '', delay = 0, stagger = 60, immediate = false }) => {
  const [ref, inView] = useInView<HTMLSpanElement>(0.2);
  const show = immediate || inView;
  const lines = text.split('\n');
  let index = 0;
  let inAccent = false;
  return (
    <span ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((raw, wi) => {
            let word = raw;
            if (word.startsWith('*')) {
              inAccent = true;
              word = word.slice(1);
            }
            const accent = inAccent;
            if (word.endsWith('*')) {
              inAccent = false;
              word = word.slice(0, -1);
            }
            const i = index++;
            // The space sits outside the masked word so long words can wrap (and hyphenate) cleanly.
            return (
              <React.Fragment key={wi}>
                <span className="split-word">
                  <span
                    className={`split-inner ${show ? 'is-in' : ''} ${accent ? 'text-accent' : ''}`}
                    style={{ transitionDelay: `${delay + i * stagger}ms` }}
                  >
                    {word}
                  </span>
                </span>{' '}
              </React.Fragment>
            );
          })}
        </span>
      ))}
    </span>
  );
};

/* ── Magnetic ───────────────────────────────────────────────
   Element leans toward the cursor while hovered. */
export const Magnetic: React.FC<{ children: React.ReactNode; strength?: number; className?: string }> = ({
  children,
  strength = 0.35,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`magnetic inline-block ${className}`}>
      {children}
    </span>
  );
};

/* ── Tilt ───────────────────────────────────────────────────
   Card tilts in 3D toward the cursor with a moving highlight. */
export const Tilt: React.FC<{ children: React.ReactNode; className?: string; max?: number; style?: React.CSSProperties }> = ({
  children,
  className = '',
  max = 8,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`;
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`tilt ${className}`} style={style}>
      {children}
    </div>
  );
};

/* ── CountUp ────────────────────────────────────────────────
   Animates a number like "4,000" or "99.8" from zero. */
export const CountUp: React.FC<{ value: string; className?: string }> = ({ value, className = '' }) => {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const { locale } = useI18n();
  const target = parseFloat(value.replace(/,/g, ''));
  const decimals = value.includes('.') ? value.split('.')[1].length : 0;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(2, -10 * p);
      setCurrent(target * (p === 1 ? 1 : eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className={className}>
      {current.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
};

/* ── VelocityMarquee ────────────────────────────────────────
   Endless strip that speeds up, flips direction and skews with scroll. */
export const VelocityMarquee: React.FC<{ children: React.ReactNode; speed?: number; className?: string }> = ({
  children,
  speed = 60,
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let x = 0;
    let lastY = window.scrollY;
    let velocity = 0;
    let direction = -1;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (dy !== 0) direction = dy > 0 ? -1 : 1;
      velocity += (dy - velocity) * 0.1;
      const half = track.scrollWidth / 2;
      x += direction * (speed + Math.abs(velocity) * 40) * dt;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      const skew = Math.max(-10, Math.min(10, velocity * -0.4));
      track.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

/* ── ScrollScale ────────────────────────────────────────────
   Media grows from an inset rounded card to full width as it scrolls in. */
export const ScrollScale: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const o = outer.current;
      const i = inner.current;
      if (!o || !i) return;
      const r = o.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight * 0.9)));
      i.style.transform = `scale(${0.82 + 0.18 * p})`;
      i.style.borderRadius = `${48 - 28 * p}px`;
      i.style.setProperty('--parallax', `${(1 - p) * 60}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="scroll-scale relative overflow-hidden origin-center will-change-transform">
        {children}
      </div>
    </div>
  );
};
