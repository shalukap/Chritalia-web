import React, { useEffect, useRef, useState } from 'react';

// Soft follower ring that trails the pointer, swells over links and
// shows a label (e.g. "Drag") over elements with a data-cursor attribute.
const Cursor: React.FC = () => {
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(fine.matches);
    if (!fine.matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let shown = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown && ring.current) {
        pos.x = target.x;
        pos.y = target.y;
        ring.current.style.opacity = '1';
        shown = true;
      }
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button, input, textarea, label');
      setLabel(el?.dataset.cursor ?? '');
      setActive(!!el);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      if (ring.current) ring.current.style.opacity = '0';
      shown = false;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  if (!enabled) return null;

  const size = label ? 88 : active ? 48 : 18;
  return (
    <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0 transition-opacity duration-300" aria-hidden="true">
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
          label ? 'bg-navy text-white' : active ? 'bg-accent/15 border border-accent' : 'border border-navy/40'
        }`}
        style={{ width: size, height: size, transform: `translate(-50%, -50%) scale(${pressed ? 0.8 : 1})` }}
      >
        {label && <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{label}</span>}
      </div>
    </div>
  );
};

export default Cursor;
