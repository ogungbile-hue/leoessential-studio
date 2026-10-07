import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { HERO_SLIDES } from '../data/carousel';
import { STUDIO_CONFIG } from '../data/studio';

interface HeroCarouselProps {
  onExploreClick?: () => void;
}

const AUTOPLAY_INTERVAL = 6000; // 6 seconds matching Bidelat Couture standard

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onExploreClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Touch tracking for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Listen to prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = window.setInterval(goToNext, AUTOPLAY_INTERVAL);
    }
  };

  // Autoplay loop with pause-on-hover & reduced-motion respect
  useEffect(() => {
    if (prefersReducedMotion || !isPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, prefersReducedMotion, goToNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      goToPrev();
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      aria-label="Editorial Showcase Hero"
      className="relative flex-grow flex items-center justify-center min-h-[92vh] lg:min-h-screen w-full p-3 sm:p-5 md:p-8 pt-24 md:pt-28 select-none overflow-hidden bg-[#FAF8F5]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 
        CINEMATIC FLOATING INSET CANVAS 
        Exact Bidelat Couture architectural width & margin:
        absolute inset-4 md:inset-8 mt-20 md:mt-24 rounded-2xl md:rounded-3xl overflow-hidden
      */}
      <div className="absolute inset-3 sm:inset-5 md:inset-8 mt-20 sm:mt-24 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-[#1C1917]">
        
        {/* Cinematic dark luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/95 via-[#1C1917]/30 to-[#1C1917]/55 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(28,25,23,0.45)_100%)] z-10 pointer-events-none" />

        {/* 
          ANIMATION ENGINE:
          AnimatePresence with motion.img executing the exact Bidelat Couture transition:
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        */}
        <AnimatePresence initial={false}>
          <motion.img
            key={currentSlide.id}
            src={currentSlide.imageUrl}
            alt={currentSlide.alt}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ objectPosition: currentSlide.focalPoint || 'center center' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* 
        CENTERED EDITORIAL CONTENT OVERLAY:
        Matching Bidelat Couture's centered composition with luxury typography
      */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl px-4 sm:px-6 my-auto mt-20 sm:mt-24 md:mt-16">
        
        {/* Category kicker with ultra-wide tracking */}
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.45em] sm:tracking-[0.55em] mb-4 sm:mb-6 text-[#C49A70] font-semibold drop-shadow-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C49A70] animate-pulse" />
          <span>{currentSlide.category}</span>
        </span>

        {/* Grand editorial serif heading with line break and italic accent */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-editorial mb-6 sm:mb-8 leading-[1.08] text-[#FAF8F5] drop-shadow-md tracking-tight">
          {currentSlide.headline}{' '}
          <br className="hidden sm:inline" />
          <span className="italic font-light text-[#EFE9DF]">
            {currentSlide.highlightPhrase}
          </span>
        </h1>

        {/* Narrative description */}
        <p className="text-xs sm:text-sm md:text-base text-[#FAF8F5]/85 max-w-2xl mb-8 sm:mb-10 leading-relaxed font-normal drop-shadow-sm px-2">
          {currentSlide.description}
        </p>

        {/* 
          FROSTED GLASS SEGMENTED PILL CTA:
          Direct adaptation of Bidelat Couture's glass px-8 py-5 rounded-full
        */}
        <div className="glass px-6 sm:px-9 py-3.5 sm:py-4 rounded-full flex gap-6 sm:gap-10 items-center shadow-2xl backdrop-blur-md border border-white/20">
          <a
            href={STUDIO_CONFIG.squareBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-white hover:text-[#C49A70] transition-colors flex items-center gap-2 group cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C49A70]" />
            <span>Book Appointment</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover:text-[#C49A70] transition-colors" />
          </a>

          {/* Vertical subtle divider line */}
          <div className="w-[1px] h-4 bg-white/25" />

          <a
            href="#services"
            onClick={onExploreClick}
            className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-white/90 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore Services</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/70" />
          </a>
        </div>

      </div>

      {/* 
        VERTICAL NAVIGATION LINE INDICATORS ON RIGHT:
        Signature Bidelat Couture vertical selector
        absolute right-8 md:right-16 top-1/2 -translate-y-1/2
      */}
      <div className="absolute right-4 sm:right-7 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-3 z-20">
        {HERO_SLIDES.map((slide, u) => {
          const isActive = u === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(u)}
              aria-label={`Jump to slide ${u + 1}: ${slide.category}`}
              className="py-1.5 px-2 flex items-center justify-center cursor-pointer group focus:outline-none"
            >
              <span
                className={`w-[2.5px] transition-all duration-500 rounded-full block ${
                  isActive
                    ? 'h-10 md:h-12 bg-[#C49A70] shadow-[0_0_12px_rgba(196,154,112,0.85)]'
                    : 'h-5 md:h-6 bg-white/35 group-hover:bg-white/80 group-hover:h-8'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* 
        BOTTOM CORNER FOOTER OVERLAYS INSIDE HERO:
        Bottom-left: Sanctuary status & credentials
        Bottom-right: Numerical counter & arrow controls
      */}
      <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 z-20 hidden sm:flex items-center gap-3 text-white/80">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] uppercase font-mono tracking-widest text-[#EFE9DF]">
          Lagos Studio Sanctuary · By Appointment
        </span>
      </div>

      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 z-20 hidden sm:flex items-center gap-3">
        <span className="text-[11px] font-mono text-white/80 tracking-widest">
          0{currentIndex + 1} / 0{HERO_SLIDES.length}
        </span>
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm p-1 rounded-full border border-white/15">
          <button
            onClick={goToPrev}
            aria-label="Previous slide"
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={goToNext}
            aria-label="Next slide"
            className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </section>
  );
};
