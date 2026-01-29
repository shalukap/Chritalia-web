
import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, MapPin, Phone, Mail, Linkedin, Facebook,Home  } from 'lucide-react';
import { BRAND_NAME, BRAND_LOCATION, NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img src="https://res.cloudinary.com/dy3myxhnf/image/upload/v1767808979/NewLogo_ctgxys.png" height={100} width={150} alt="" />
              
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Professional road transport and logistics solutions based in Verona. 
              Your reliable partner for shipments across Italy and Europe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-amber-600 transition-colors text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-amber-600 transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-amber-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li><Link to="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services Col */}
          <div>
            <h4 className="text-white font-semibold mb-6">Our Services</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Domestic Transport</Link></li>
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">International Transport</Link></li>
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Logistics Optimization</Link></li>
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Express Delivery</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <span>VIA DELLA PACE 13<br />37124, VERONA (VR), Italy</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>+39 377 333 1089</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>info@chritalia.it</span>
              </li>
              <li className="flex items-center space-x-3">
                <Home className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>Codice SDI : M5UXCR1</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {BRAND_NAME} SAS. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Professional P.IVA: 05079040233</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
