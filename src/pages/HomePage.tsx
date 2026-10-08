import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroCarousel } from '../components/HeroCarousel';
import { STUDIO_CONFIG } from '../data/studio';
import {
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Check,
  Award,
  Eye,
  GraduationCap,
  MapPin,
  Clock,
  MessageCircle,
  CreditCard,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF8F5]">
      
      {/* =========================================================================
          HERO: Cinematic 5-Slide Lash Artistry Carousel
      ========================================================================= */}
      <HeroCarousel
        onExploreClick={() => {
          const el = document.getElementById('signature');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onBookClick={() => navigate('/book')}
      />

      {/* =========================================================================
          THE PHILOSOPHY: Founder Voice & Architectural Ethos
      ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Portrait Framing */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/5 overflow-hidden shadow-xl border border-[#C49A70]/20 bg-[#EFE9DF]">
                <img
                  src="https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=1200&q=85"
                  alt="Adedoyin Elegunde practicing 1:1 bespoke lash isolation with surgical precision"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-[#FAF8F5]">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C49A70] block">
                    Lead Artist & Founder
                  </span>
                  <span className="font-editorial text-2xl font-medium block">
                    Adedoyin Elegunde
                  </span>
                  <span className="text-xs text-[#FAF8F5]/80 block">
                    Cosmetic Tattoo Specialist & Master Lash Educator
                  </span>
                </div>
              </div>

              {/* Watermark badge */}
              <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-[#FAF8F5] border border-[#C49A70]/30 p-4 shadow-lg items-center gap-3">
                <img src={STUDIO_CONFIG.logoVector} alt="Insignia" className="w-8 h-8 object-contain" />
                <div className="text-left">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#C49A70] block font-semibold">
                    Certified Precision
                  </span>
                  <span className="text-xs font-editorial font-medium text-[#1C1917]">
                    1:1 Medical Isolation
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Statement */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
                  Brand Philosophy
                </span>
                <span className="w-8 h-px bg-[#C49A70]" />
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1917] leading-tight">
                "Enhancing your natural beauty through <span className="italic font-normal text-[#C49A70]">intentional detail.</span>"
              </h2>

              <p className="text-sm sm:text-base text-[#7A7267] leading-relaxed">
                At Leoessential, lash styling is approached as an architectural practice. We reject the rushed, heavy, commercial techniques that sacrifice long-term eyelash longevity. Every silk extension is calculated to match the micro-millimeter diameter of your natural follicle.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#1C1917]/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1C1917] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C49A70]" />
                    Follicle Longevity
                  </div>
                  <p className="text-xs text-[#7A7267] leading-relaxed">
                    Zero clumping, zero adhesive residue, and weight matching to ensure natural lash health for decades.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1C1917] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C49A70]" />
                    Unhurried Sessions
                  </div>
                  <p className="text-xs text-[#7A7267] leading-relaxed">
                    A private sanctuary in Ibadan, Oyo State with generous consultation time tailored uniquely to your orbital bone.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm"
                >
                  <span>Explore Treatment Menu</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/sanctuary"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-[#7A7267] hover:text-[#1C1917] transition-colors py-3 px-2"
                >
                  <span>Studio Care & Policies</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SIGNATURE ARTISTRY: Curated 3 Core Lash Collections
      ========================================================================= */}
      <section id="signature" className="py-20 sm:py-28 bg-[#F3EFEA] border-y border-[#1C1917]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
              Curated Artistry
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1917]">
              Signature Lash Sets
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed">
              Three distinct aesthetic architectures sculpted with medical-grade isolation, featherlight silk fibers, and bespoke eye contouring.
            </p>
          </div>

          {/* 3 Core Curated Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Classic Minimalist */}
            <div className="group bg-[#FAF8F5] border border-[#1C1917]/10 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative aspect-4/3 overflow-hidden bg-[#E5DDD0]">
                <img
                  src="https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=85"
                  alt="Classic Minimalist Lash Set"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#1C1917]/80 backdrop-blur text-white text-[9px] uppercase font-mono tracking-widest px-2.5 py-1">
                  1:1 Medical Isolation
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#7A7267] mb-2">
                    <span className="font-mono">105 Mins</span>
                    <span className="font-editorial text-lg font-semibold text-[#1C1917]">₦35,000</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-semibold text-[#1C1917] mb-2 group-hover:text-[#C49A70] transition-colors">
                    Classic Minimalist
                  </h3>
                  <p className="text-xs text-[#7A7267] leading-relaxed mb-4">
                    An understated, refined set adhering a single ultra-lightweight silk extension to each mature natural lash. Mascara-like definition without artificial density.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1C1917]/10">
                  <Link
                    to="/book?service=lash-classic"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    <span>Reserve Classic Set (₦15k Deposit)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Hybrid Dimension (Signature) */}
            <div className="group bg-[#FAF8F5] border-2 border-[#C49A70] flex flex-col justify-between overflow-hidden shadow-md hover:shadow-lg transition-all relative">
              <div className="absolute top-0 right-0 z-10 bg-[#C49A70] text-white text-[9px] uppercase font-mono tracking-widest px-3 py-1 font-semibold">
                Most Requested
              </div>

              <div className="relative aspect-4/3 overflow-hidden bg-[#E5DDD0]">
                <img
                  src="https://images.unsplash.com/photo-1633346152343-5486573d3d50?auto=format&fit=crop&w=900&q=85"
                  alt="Hybrid Dimension Lash Set"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#1C1917]/80 backdrop-blur text-white text-[9px] uppercase font-mono tracking-widest px-2.5 py-1">
                  Organic Dimensional Flutter
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#7A7267] mb-2">
                    <span className="font-mono">120 Mins</span>
                    <span className="font-editorial text-lg font-semibold text-[#1C1917]">₦42,000</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-semibold text-[#1C1917] mb-2 group-hover:text-[#C49A70] transition-colors">
                    Hybrid Dimension
                  </h3>
                  <p className="text-xs text-[#7A7267] leading-relaxed mb-4">
                    Our signature balance. Seamlessly marries classic single extensions with handcrafted 3D–4D micro-fans to deliver soft, textured, everyday fullness.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1C1917]/10">
                  <Link
                    to="/book?service=lash-hybrid"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#C49A70] hover:bg-[#1C1917] text-white py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    <span>Reserve Hybrid Set (₦15k Deposit)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: Signature Volume & Wispy */}
            <div className="group bg-[#FAF8F5] border border-[#1C1917]/10 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative aspect-4/3 overflow-hidden bg-[#E5DDD0]">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85"
                  alt="Signature Volume & Wispy Lash Set"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#1C1917]/80 backdrop-blur text-white text-[9px] uppercase font-mono tracking-widest px-2.5 py-1">
                  Textured Editorial Spikes
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#7A7267] mb-2">
                    <span className="font-mono">135 Mins</span>
                    <span className="font-editorial text-lg font-semibold text-[#1C1917]">₦50,000</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-semibold text-[#1C1917] mb-2 group-hover:text-[#C49A70] transition-colors">
                    Volume & Wispy Spikes
                  </h3>
                  <p className="text-xs text-[#7A7267] leading-relaxed mb-4">
                    High-impact yet weightless. Handcrafted 4D–7D micro-fans staggered with custom Kim-K peak spikes to open the eye contour with velvety texture.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1C1917]/10">
                  <Link
                    to="/book?service=lash-volume"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    <span>Reserve Volume Set (₦15k Deposit)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Callout: Complete Menu */}
          <div className="mt-12 bg-[#FAF8F5] border border-[#C49A70]/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C49A70] block font-semibold">
                Infill Maintenance · Removals · Brow Artistry
              </span>
              <h4 className="font-editorial text-xl sm:text-2xl font-semibold text-[#1C1917] mt-0.5">
                Seeking infills, specialized curl maps, or cosmetic brows?
              </h4>
              <p className="text-xs text-[#7A7267] mt-1">
                Explore our dedicated treatment page covering infill schedules, foreign removals, and Ombré powder brow pricing.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] px-6 py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 shadow-sm"
            >
              <span>View Full Treatment Menu</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE ACADEMY: Prestige 1:1 Mentorship Teaser (Obsidian Luxury)
      ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#1C1917] text-[#FAF8F5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A70_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#C49A70]" />
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
                  Leoessential Academy
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
                Master the Architecture of Lashes through <span className="italic font-normal text-[#C49A70]">1:1 Private Mentorship.</span>
              </h2>

              <p className="text-sm text-[#EFE9DF]/80 leading-relaxed max-w-xl">
                An uncompromising immersion led personally by Adedoyin Elegunde. Learn fine tweezer mechanics, medical cyanoacrylate hygrometry, facial mapping, and high-ticket studio positioning.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/10">
                <div>
                  <span className="font-editorial text-2xl font-semibold text-[#C49A70] block">2–3 Days</span>
                  <span className="text-[10px] uppercase font-mono text-[#EFE9DF]/70">Intensive Hands-On</span>
                </div>
                <div>
                  <span className="font-editorial text-2xl font-semibold text-[#C49A70] block">Japanese Steel</span>
                  <span className="text-[10px] uppercase font-mono text-[#EFE9DF]/70">Pro Tweezer Kit</span>
                </div>
                <div>
                  <span className="font-editorial text-2xl font-semibold text-[#C49A70] block">Live Models</span>
                  <span className="text-[10px] uppercase font-mono text-[#EFE9DF]/70">Directly Supervised</span>
                </div>
                <div>
                  <span className="font-editorial text-2xl font-semibold text-[#C49A70] block">Max 2</span>
                  <span className="text-[10px] uppercase font-mono text-[#EFE9DF]/70">Students Per Month</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/academy"
                  className="inline-flex items-center gap-2 bg-[#C49A70] hover:bg-white hover:text-[#1C1917] text-white px-6 py-3.5 text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
                >
                  <span>Explore Curriculum & Student Kit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Adedoyin, I would like to inquire about enrolling in the Leoessential Academy 1:1 Mentorship.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#EFE9DF]/80 hover:text-white transition-colors py-3 px-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Inquire via WhatsApp Desk</span>
                </a>
              </div>
            </div>

            {/* Visual Box */}
            <div className="lg:col-span-5">
              <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-md space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <img src={STUDIO_CONFIG.logoVector} alt="Insignia" className="w-6 h-6 object-contain" />
                    <span className="font-editorial text-lg tracking-widest">LEOESSENTIAL ACADEMY</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono bg-[#C49A70]/20 text-[#C49A70] px-2 py-0.5">
                    Accredited
                  </span>
                </div>

                <div className="space-y-3 text-xs text-[#EFE9DF]/80">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#C49A70] shrink-0 mt-0.5" />
                    <span>Theoretical anatomy workbook & custom mapping guide</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#C49A70] shrink-0 mt-0.5" />
                    <span>Complete starter kit with medical adhesives & hygrometer</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#C49A70] shrink-0 mt-0.5" />
                    <span>Accredited certificate of completion</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#C49A70] shrink-0 mt-0.5" />
                    <span>Lifetime 1:1 WhatsApp advisory access for case reviews</span>
                  </div>
                </div>

                <div className="pt-2 text-right">
                  <Link
                    to="/academy"
                    className="text-xs uppercase font-mono tracking-widest text-[#C49A70] hover:text-white inline-flex items-center gap-1"
                  >
                    <span>Read Full Academy Prospectus</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          RESERVATION & CONTACT: Direct Fast Action
      ========================================================================= */}
      <section className="py-20 bg-[#FAF8F5] border-t border-[#1C1917]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <img src={STUDIO_CONFIG.logoVector} alt="Insignia" className="w-10 h-10 object-contain mx-auto" />
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1917]">
            Reserve Your Sanctuary Session
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7267] max-w-xl mx-auto leading-relaxed">
            Appointments require a non-refundable booking deposit settled securely via Paystack. Your deposit is immediately credited toward your final treatment balance on arrival.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
            >
              <CreditCard className="w-4 h-4 text-[#C49A70]" />
              <span>Reserve Slot with Paystack Deposit</span>
            </Link>

            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Adedoyin, I would like to inquire about booking an appointment at Leoessential Studio.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#1C1917] hover:bg-[#1C1917] hover:text-white text-[#1C1917] px-6 py-4 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Studio Concierge</span>
            </a>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#7A7267] font-mono">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C49A70]" />
              <span>Ibadan, Oyo State, Nigeria (Private Studio Sanctuary)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C49A70]" />
              <span>Tue – Sat: 9:30 AM – 6:30 PM (By Appointment)</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
