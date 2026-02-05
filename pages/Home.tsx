import React from 'react';
import { Link } from 'react-router-dom';
// Added Globe to the lucide-react imports to resolve the missing component error
import { ArrowRight, ChevronRight, Star, Globe } from 'lucide-react';
import { 
  SERVICES, 
  TRUST_BADGES, 
  TESTIMONIALS, 
  ABOUT_TEXT, 
  BRAND_LOCATION 
} from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/191/1920/1080" 
            alt="Logistic Trucks" 
            className="w-full h-full object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/10 via-slate-900/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6 animate-fade-in">
              Premium Logistics in {BRAND_LOCATION}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Road Transport Services <span className="text-amber-500">Across Italy</span> & Europe
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Reliable domestic and international road transportation across Italy and Europe—on time, every time. Trusted partner for SMEs and enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="px-8 py-4 bg-amber-600 text-white rounded-xl font-bold text-lg hover:bg-amber-700 transition-all shadow-xl shadow-amber-900/30 flex items-center justify-center">
                Request a Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/about" className="px-8 py-4 bg-white/10 text-white backdrop-blur-md border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center">
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST_BADGES.map((badge, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-slate-300">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                  {badge.icon}
                </div>
                <span className="text-sm font-medium tracking-wide uppercase">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4">Our Expertise</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6">Comprehensive Logistics Solutions</h3>
          <p className="max-w-2xl mx-auto text-slate-600">
            Tailored road transport services designed for efficiency, safety, and operational excellence across the continent.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="group p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-600 mb-6 shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
              <p className="text-slate-600 mb-6 line-clamp-2">{service.description}</p>
              <Link to="/services" className="text-amber-600 font-bold flex items-center group-hover:gap-2 transition-all">
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us / About Brief */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
          <video
  src="https://res.cloudinary.com/di3ia3coc/video/upload/v1770309045/about-video_hgjmtq.mp4"
  autoPlay
  muted
  loop
  playsInline
 
/>



            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-600 rounded-[2.5rem] z-0 hidden lg:block"></div>
          </div>
          <div>
            <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4">Why Chritalia SAS</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">Your Trusted Logistics Partner in the Heart of Italy</h3>
            <p className="text-slate-600 mb-8 leading-relaxed whitespace-pre-line">
              {ABOUT_TEXT.split('\n\n')[0]}
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Experienced drivers and organized processes',
                'Optimized routes to reduce time and costs',
                'Continuous monitoring and operational control',
                'Maximum safety, flexibility, and accessibility'
              ].map((point, i) => (
                <li key={i} className="flex items-center space-x-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="inline-flex items-center text-slate-900 font-bold border-b-2 border-amber-600 pb-1 hover:text-amber-600 transition-colors">
              Read Our Full Story <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section id="coverage" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           {/* Decorative SVG pattern representing connectivity */}
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">European Coverage</h2>
              <h3 className="text-4xl font-bold mb-4">Based in Verona, Delivering Across Italy and Europe</h3>
              <p className="text-slate-400">Our strategic location allows for rapid dispatch across the entire EU network within 24-48 hours.</p>
            </div>
            <div className="flex-shrink-0 bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center">
              <div className="text-5xl font-black text-amber-500 mb-1">20+</div>
              <div className="text-sm font-semibold uppercase tracking-widest text-slate-300">Target Countries</div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-[3rem] p-12 aspect-[16/9] flex items-center justify-center border border-white/5 overflow-hidden">
             {/* Map Placeholder */}
             <div className="text-center">
                <img 
                  src="https://picsum.photos/id/122/1200/800?blur=5" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" 
                  alt="" 
                />
                <Globe className="w-32 h-32 text-amber-500 mx-auto mb-8 animate-pulse" />
                <h4 className="text-2xl font-bold mb-4">Interactive Coverage Map</h4>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto">Connecting Verona with major industrial hubs in Germany, France, Poland, Spain, and more.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {['Verona', 'Milan', 'Munich', 'Paris', 'Barcelona', 'Lyon'].map(city => (
                    <span key={city} className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold tracking-wider">{city}</span>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
           <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4">How We Work</h2>
           <h3 className="text-4xl font-bold text-slate-900">Five Simple Steps to Delivery</h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
          {[
            { title: 'Request Details', icon: '1', desc: 'Send us your freight specs' },
            { title: 'Optimization', icon: '2', desc: 'Route & cost analysis' },
            { title: 'Pickup', icon: '3', desc: 'Secure loading & transport' },
            { title: 'Live Tracking', icon: '4', desc: 'Continuous monitoring' },
            { title: 'Confirmation', icon: '5', desc: 'On-time delivery' }
          ].map((step, i) => (
            <div key={i} className="relative text-center">
              {i < 4 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-100 z-0"></div>
              )}
              <div className="relative z-10 w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black text-amber-600 border-4 border-white shadow-xl">
                {step.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
              <p className="text-sm text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-gray-100">
              <div className="flex text-amber-400 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg text-slate-700 italic mb-8 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">{t.name}</h5>
                  <p className="text-sm text-slate-500">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-amber-900/40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Need a reliable transport partner?</h2>
              <p className="text-xl text-amber-100 mb-12 max-w-2xl mx-auto">
                Join hundreds of businesses that trust Chritalia SAS for their critical road transport needs across Italy and Europe.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/contact" className="px-10 py-5 bg-white text-amber-600 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all shadow-xl">
                  Request a Quote
                </Link>
                <a href="tel:+390451234567" className="px-10 py-5 border-2 border-white/30 text-white rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;