
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import { initSmoothScroll, scrollToElement, scrollToTop } from './lib/smoothScroll';
import { LanguageProvider, useI18n } from './i18n';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) scrollToElement(el);
    } else {
      scrollToTop();
    }
  }, [pathname, hash]);
  return null;
};

// Page content cross-fades briefly when the language changes.
const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { switching } = useI18n();
  return (
    <main className={`flex-grow transition-opacity duration-200 ${switching ? 'opacity-0' : 'opacity-100'}`}>{children}</main>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <LanguageProvider>
    <Router>
      <ScrollToTop />
      <Cursor />
      {/* Colour field behind the frosted-glass panels */}
      <div className="aurora" aria-hidden="true">
        <span style={{ width: '46vw', height: '46vw', background: '#e7cf93', top: '-12vw', right: '-10vw' }} />
        <span style={{ width: '40vw', height: '40vw', background: '#c3d3ee', top: '30vh', left: '-14vw', animationDelay: '-9s' }} />
        <span style={{ width: '34vw', height: '34vw', background: '#9db4dc', bottom: '-12vw', right: '18vw', animationDelay: '-17s' }} />
        <span style={{ width: '26vw', height: '26vw', background: '#f2e2bd', bottom: '10vh', left: '30vw', animationDelay: '-4s' }} />
      </div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Main>
        <Footer />
      </div>
    </Router>
    </LanguageProvider>
  );
};

export default App;
