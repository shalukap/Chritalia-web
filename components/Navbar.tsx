
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { LOGO_URL } from '../constants';
import { useI18n } from '../i18n';
import { useContent } from '../i18n/content';
import { LanguageSwitcher, LanguagePills } from './LanguageSwitcher';
import { Magnetic } from './motion';
import { lockScroll } from '../lib/smoothScroll';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { t } = useI18n();
  const { navLinks } = useContent();

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Tuck the bar away while scrolling down, bring it back on the way up.
      setHidden(y > 300 && y > lastY);
      lastY = y;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    lockScroll(isOpen);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const isActive = (href: string) => `${location.pathname}${location.hash}` === href;

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden && !isOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div
            className={`flex justify-between items-center rounded-full pl-5 pr-2 py-2 transition-all duration-500 ${
              scrolled ? 'glass' : 'bg-white/25 backdrop-blur-md border border-white/50'
            }`}
          >
            <Link to="/" className="flex items-center relative z-[70]" onClick={closeMenu}>
              <img src={LOGO_URL} alt="Chritalia SAS" className="w-32 sm:w-36 h-auto" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    isActive(link.href) ? 'bg-navy text-white' : 'text-ink-soft hover:text-navy hover:bg-navy/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <LanguageSwitcher className="ml-2" />
              <Magnetic className="ml-1">
                <Link
                  to="/contact"
                  className="group flex items-center gap-2 bg-navy text-white pl-5 pr-2 py-2 rounded-full text-sm font-semibold hover:bg-navy-3 transition-colors duration-300"
                >
                  {t.nav.quote}
                  <span className="w-8 h-8 rounded-full bg-accent text-navy flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </Magnetic>
            </div>

            {/* Mobile: language + menu button */}
            <div className="xl:hidden flex items-center gap-1 relative z-[70]">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 rounded-full bg-navy text-white flex flex-col items-center justify-center gap-1.5"
              aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={isOpen}
            >
              <span className={`block h-0.5 w-5 bg-current transition-transform duration-500 ${isOpen ? 'translate-y-1 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 bg-current transition-transform duration-500 ${isOpen ? '-translate-y-1 -rotate-45' : ''}`} />
            </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav — circular wipe */}
      <div
        className="xl:hidden fixed inset-0 z-[55] bg-navy/80 backdrop-blur-2xl transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ clipPath: isOpen ? 'circle(150% at 90% 40px)' : 'circle(0% at 90% 40px)' }}
      >
        <div className="h-full flex flex-col justify-center px-8 gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={closeMenu}
              className={`font-display text-4xl font-bold tracking-tight text-white hover:text-accent transition-all duration-700 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${200 + i * 60}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="mt-10 block text-center bg-accent text-navy px-5 py-4 rounded-full font-semibold"
          >
            {t.nav.quote}
          </Link>
          <LanguagePills className="mt-4" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
