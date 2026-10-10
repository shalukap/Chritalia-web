
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Linkedin, Facebook, FileText, ArrowUpRight } from 'lucide-react';
import { BRAND_NAME, LOGO_URL } from '../constants';
import { useI18n } from '../i18n';
import { useContent } from '../i18n/content';

const Footer: React.FC = () => {
  const { t } = useI18n();
  const { navLinks } = useContent();
  return (
    <footer className="relative bg-navy text-white/70 pt-20 pb-10 overflow-hidden mt-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="glow w-[34rem] h-[34rem] bg-navy-3 -top-48 right-[-10rem]" />
      <div className="glow w-[26rem] h-[26rem] bg-[#3a6fc0] bottom-[-14rem] left-[-6rem]" style={{ animationDelay: '-10s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Call to action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 glass-dark rounded-3xl p-8 md:p-12">
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl tracking-tight leading-[1.05] max-w-2xl">
            {t.footer.ctaLead} <span className="text-gold-gradient">{t.footer.ctaAccent}</span>
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-accent text-navy pl-7 pr-2 py-2 rounded-full font-semibold hover:bg-white transition-colors self-start md:self-auto"
          >
            {t.common.requestQuote}
            <span className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-block bg-white rounded-2xl px-4 py-3">
              <img src={LOGO_URL} alt="Chritalia SAS" className="w-36 h-auto" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              {t.footer.about}
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-accent hover:text-navy hover:border-accent transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-accent hover:text-navy hover:border-accent transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">{t.footer.company}</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="link-underline hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
              <li><Link to="/privacy" className="link-underline hover:text-white transition-colors">{t.footer.privacy}</Link></li>
            </ul>
          </div>

          {/* Services Col */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">{t.footer.services}</h4>
            <ul className="space-y-3 text-sm">
              {t.footer.servicesList.map((s) => (
                <li key={s}><Link to="/services" className="link-underline hover:text-white transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">{t.footer.contact}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>Via della Pace 13<br />37124 Verona (VR), {t.footer.country}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="tel:+393773331089" className="hover:text-white">+39 377 333 1089</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="mailto:info@chritalia.it" className="hover:text-white">info@chritalia.it</a>
              </li>
              <li className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Codice SDI: M5UXCR1</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {BRAND_NAME} · Autotrasporti. {t.footer.rights}</p>
          <p>P.IVA 05079040233</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
