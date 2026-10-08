import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, X } from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studio';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  // If not on homepage, navbar has solid frosted background
  const hasDarkText = !isHomePage || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        hasDarkText
          ? 'bg-[#FAF8F5]/92 backdrop-blur-xl border-b border-[#1C1917]/10 py-3 shadow-xs'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Wordmark */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
        >
          <img
            src={STUDIO_CONFIG.logoVector}
            alt="Leoessential Insignia"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`text-xl sm:text-2xl font-editorial tracking-[0.2em] sm:tracking-[0.25em] font-semibold transition-colors ${
              hasDarkText
                ? 'text-[#1C1917] group-hover:text-[#C49A70]'
                : 'text-[#FAF8F5] group-hover:text-[#C49A70]'
            }`}
          >
            LEOESSENTIAL
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium">
          <Link
            to="/"
            className={`transition-colors hover:text-[#C49A70] ${
              location.pathname === '/' ? 'text-[#C49A70] font-semibold' : hasDarkText ? 'text-[#1C1917]' : 'text-[#FAF8F5]/90'
            }`}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={`transition-colors hover:text-[#C49A70] ${
              location.pathname === '/services' ? 'text-[#C49A70] font-semibold' : hasDarkText ? 'text-[#1C1917]' : 'text-[#FAF8F5]/90'
            }`}
          >
            Treatment Menu
          </Link>
          <Link
            to="/academy"
            className={`transition-colors hover:text-[#C49A70] ${
              location.pathname === '/academy' ? 'text-[#C49A70] font-semibold' : hasDarkText ? 'text-[#1C1917]' : 'text-[#FAF8F5]/90'
            }`}
          >
            The Academy
          </Link>
          <Link
            to="/sanctuary"
            className={`transition-colors hover:text-[#C49A70] ${
              location.pathname === '/sanctuary' ? 'text-[#C49A70] font-semibold' : hasDarkText ? 'text-[#1C1917]' : 'text-[#FAF8F5]/90'
            }`}
          >
            Sanctuary & Care
          </Link>
        </nav>

        {/* Primary Reserve Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/book"
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-medium transition-all duration-300 shadow-sm ${
              hasDarkText
                ? 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#C49A70]'
                : 'bg-[#FAF8F5] text-[#1C1917] hover:bg-[#C49A70] hover:text-[#FAF8F5]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#C49A70]" />
            <span>Reserve Appointment</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors ${
              hasDarkText ? 'text-[#1C1917]' : 'text-[#FAF8F5]'
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-6 space-y-4 text-center transition-all ${
            hasDarkText
              ? 'border-[#1C1917]/10 bg-[#FAF8F5]/98 backdrop-blur-xl text-[#1C1917]'
              : 'border-white/10 bg-[#1C1917]/95 backdrop-blur-xl text-white'
          }`}
        >
          <div className="flex items-center justify-center gap-2.5 pb-3 border-b border-inherit">
            <img src={STUDIO_CONFIG.logoVector} alt="Leoessential Insignia" className="w-7 h-7 object-contain" />
            <span className="font-editorial text-xl tracking-[0.2em] font-semibold">
              LEOESSENTIAL
            </span>
          </div>

          <div className="flex flex-col space-y-3 uppercase tracking-widest text-xs font-medium">
            <Link
              to="/"
              onClick={closeMenu}
              className={`py-2 hover:text-[#C49A70] ${location.pathname === '/' ? 'text-[#C49A70] font-semibold' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/services"
              onClick={closeMenu}
              className={`py-2 hover:text-[#C49A70] ${location.pathname === '/services' ? 'text-[#C49A70] font-semibold' : ''}`}
            >
              Treatment Menu & Pricing
            </Link>
            <Link
              to="/academy"
              onClick={closeMenu}
              className={`py-2 hover:text-[#C49A70] ${location.pathname === '/academy' ? 'text-[#C49A70] font-semibold' : ''}`}
            >
              The Academy (1:1 Mentorship)
            </Link>
            <Link
              to="/sanctuary"
              onClick={closeMenu}
              className={`py-2 hover:text-[#C49A70] ${location.pathname === '/sanctuary' ? 'text-[#C49A70] font-semibold' : ''}`}
            >
              Sanctuary, Policies & Care
            </Link>
          </div>

          <div className="pt-2">
            <Link
              to="/book"
              onClick={closeMenu}
              className="block w-full py-3 bg-[#C49A70] hover:bg-[#1C1917] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Reserve Your Appointment (Paystack)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
