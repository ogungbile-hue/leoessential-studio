import React, { useState, useEffect } from 'react';
import { HeroCarousel } from './components/HeroCarousel';
import {
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
  ExternalLink,
  Eye,
  GraduationCap,
  ShoppingBag,
  Award,
  AlertCircle,
  MapPin,
  Menu,
  X,
  ArrowUpRight,
  HelpCircle,
  Check,
  Copy,
  Heart,
  ChevronRight,
  Compass,
} from 'lucide-react';

// Configuration & Studio Constants
const SQUARE_BOOKING_URL = "https://square.site/book/leoessential";
const STUDIO_PHONE = "08145356053";
const STUDIO_PHONE_INTL = "+2348145356053";
const STUDIO_WHATSAPP_NUMBER = "2348145356053";
const STUDIO_EMAIL = "elegundeadedoyin@gmail.com";
const STUDIO_INSTAGRAM_HANDLE = "@Leo_essential";
const STUDIO_INSTAGRAM_URL = "https://instagram.com/Leo_essential";
const LOGO_VECTOR = `${import.meta.env.BASE_URL}logos/leoessential-vector-logo.svg`;

// Safe Image component with fail-safe fallback to prevent broken frames
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  category?: 'lash' | 'brow' | 'training' | 'product' | 'studio';
}

function ImageWithFallback({ src, alt, className = "", fallbackLabel, category = 'lash' }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#EFE9DF] via-[#FAF8F5] to-[#E5DDD0] text-[#7A7267] p-6 text-center select-none ${className}`}>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C49A70_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#C49A70]/30 flex items-center justify-center p-2 mb-2 shadow-sm">
          <img
            src={LOGO_VECTOR}
            alt="Leoessential"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="font-editorial text-lg tracking-wide text-[#1C1917] font-medium">LEOESSENTIAL</span>
        <span className="text-xs uppercase tracking-widest text-[#7A7267] mt-0.5">{fallbackLabel || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`object-cover transition-transform duration-700 ease-out hover:scale-[1.02] ${className}`}
      loading="lazy"
    />
  );
}

// Data structures
type ServiceCategory = 'lashes' | 'brows' | 'training' | 'retail';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  duration?: string;
  priceNgn: string;
  priceUsd: string;
  description: string;
  features: string[];
  recommendedFor?: string;
  category: ServiceCategory;
  isPopular?: boolean;
}

interface RetailItem {
  id: string;
  name: string;
  subtitle: string;
  size: string;
  priceNgn: string;
  priceUsd: string;
  description: string;
  benefits: string[];
  usage: string;
  image: string;
}

interface PolicyItem {
  id: number;
  title: string;
  shortDesc: string;
  fullDetails: string[];
  severity: 'vital' | 'standard';
}

const SERVICES_DATA: ServiceItem[] = [
  // LASHES
  {
    id: 'lash-classic',
    category: 'lashes',
    title: 'Classic Minimalist Set',
    subtitle: '1:1 Single Lash Isolation for Timeless Soft Definition',
    duration: '105 Mins',
    priceNgn: '₦35,000',
    priceUsd: '$85',
    description: 'An understated, refined set where a single ultra-lightweight synthetic silk extension is adhered to each mature natural lash. Designed for clients desiring mascara-like perfection without clumping or artificial density.',
    features: [
      '1:1 medical-grade isolation guarantee',
      'Weight matched precisely to natural lash diameter (.10mm - .12mm)',
      'Custom curl mapping (C, CC, or D Curl)',
      'Complimentary botanical lash bath pre-treatment',
    ],
    recommendedFor: 'First-time lash clients, corporate professionals, and lovers of effortless minimalist beauty.',
  },
  {
    id: 'lash-hybrid',
    category: 'lashes',
    title: 'Hybrid Dimension Set',
    subtitle: 'Curated Interplay of Classic Single Lashes & Featherlight Fans',
    duration: '120 Mins',
    priceNgn: '₦42,000',
    priceUsd: '$105',
    isPopular: true,
    description: 'Our most requested signature balance. Seamlessly marries classic single extensions with 3D–4D handcrafted volume fans to fill sparse lash lines with delicate texture and gentle, airy fluffiness.',
    features: [
      'Handmade lightweight Russian volume fans blended with classics',
      'Custom staggered lengths for an organic, textured appearance',
      'Flattering staggered graduation from inner to outer eye',
      'Ocular-safe weight distribution protecting root strength',
    ],
    recommendedFor: 'Clients with uneven natural lash densities wanting dimension, lift, and soft everyday fullness.',
  },
  {
    id: 'lash-volume',
    category: 'lashes',
    title: 'Signature Volume & Wispy Set',
    subtitle: 'Layered Multi-Dimensional Bouquet with Editorial Kim-K Spikes',
    duration: '135 Mins',
    priceNgn: '₦50,000',
    priceUsd: '$125',
    description: 'High-impact yet weightless. Handcrafted fans of 4D–7D ultra-fine extensions (.05mm) mapped with architectural peak spikes. Delivers a soft, velvety lash line with striking, eye-opening contour.',
    features: [
      'Bespoke Kim-K / Wispy mapping sculpted to orbital bone structure',
      'Zero pre-made fans — 100% custom pinched during session',
      'Dense velvety lash baseline with fluttering textured peaks',
      'Superior retention engineered with precision adhesive curing',
    ],
    recommendedFor: 'Special occasions, brides, photo shoots, or clients who adore glamorous, head-turning elegance.',
  },
  {
    id: 'lash-refill',
    category: 'lashes',
    title: 'Lash Maintenance & Refill',
    subtitle: 'Fortify Retention, Remove Grown-Outs & Restore 90%+ Fullness',
    duration: '75 Mins',
    priceNgn: '₦22,000',
    priceUsd: '$55',
    description: 'Essential bi-weekly ritual to maintain flawless lash architecture. Grown-out extensions are gently peeled away with sterile micro-tweezers, followed by a clarifying lash bath and meticulous replenishment.',
    features: [
      'Required every 2 to 3 weeks (must have 40%+ existing extensions)',
      'Thorough removal of outgrown, twisted, or displaced extensions',
      'Gentle deep foam cleansing to eliminate sebum and debris',
      'Adhesive retention check and root re-alignment',
    ],
    recommendedFor: 'Dedicated Leoessential clients committed to perpetual lash health and continuous grooming.',
  },
  {
    id: 'lash-removal',
    category: 'lashes',
    title: 'Gentle Lash Removal & Keratin Conditioning',
    subtitle: 'Solvent-Free Safe Extraction & Peptide Follicular Nourishment',
    duration: '40 Mins',
    priceNgn: '₦10,000',
    priceUsd: '$25',
    description: 'Professional cream-dissolving treatment that gently breaks down adhesive cyanoacrylate without pulling or snapping natural hairs. Completed with a fortifying botanical keratin glaze.',
    features: [
      'Zero mechanical pulling — solvent-softened gentle slide',
      'Ophthalmic cream formulation preventing corneal irritation',
      'Deep peptide lash bath restoration',
      'Complimentary consultation for future set planning',
    ],
    recommendedFor: 'Taking a seasonal lash break or preparing for a fresh Leoessential full set.',
  },

  // BROWS
  {
    id: 'brow-ombre',
    category: 'brows',
    title: 'Semi-Permanent Brow Artistry (Ombré / Microshading)',
    subtitle: 'Airbrushed Powder Gradient lasting 18–24 Months',
    duration: '150 Mins',
    priceNgn: '₦75,000',
    priceUsd: '$180',
    isPopular: true,
    description: 'Adedoyin’s premier semi-permanent cosmetic tattooing procedure. Utilizes a fine single-needle rotary device to deposit organic pigment in a delicate pixelated gradient — soft at the bulb, crisply tailored at the tail.',
    features: [
      'Golden Ratio architectural brow mapping tailored to facial symmetry',
      'Topical anesthetic applied for maximum comfort throughout',
      'Custom organic pigment mixing matching skin undertones',
      'Includes sterile aftercare balm & detailed healing instruction kit',
    ],
    recommendedFor: 'Clients with sparse, asymmetrical, or overplucked brows seeking waterproof, makeup-free daily perfection.',
  },
  {
    id: 'brow-sculpt',
    category: 'brows',
    title: 'Precision Brow Tint & Sculpt',
    subtitle: 'Custom Color Formulation, Anatomical Waxing & Tweeze Finishing',
    duration: '45 Mins',
    priceNgn: '₦15,000',
    priceUsd: '$40',
    description: 'An editorial brow refresh. We formulate a bespoke semi-permanent dye tailored to your hair undertones, sculpt the contours using gentle strip-free wax, and hand-tweeze stray stragglers to crisp perfection.',
    features: [
      'Color chemistry matched precisely to hair and skin complexion',
      'Gentle sensitive-skin wax formula minimizing redness',
      'Architectural scissor trimming and bone-structure alignment',
      'Nourishing castor-argan finishing conditioning gloss',
    ],
    recommendedFor: 'Regular 3-week maintenance or an immediate non-invasive brow lift before events.',
  },
  {
    id: 'brow-lamination',
    category: 'brows',
    title: 'Brow Lamination & Keratin Glaze',
    subtitle: 'Keratin Perming for Full, Feathered, Fluffy Direction',
    duration: '60 Mins',
    priceNgn: '₦25,000',
    priceUsd: '$60',
    description: 'Non-invasive restructuring of brow hairs using a gentle keratin-infused solution. Straightens and redirects coarse, unruly, or downward-growing hairs for a sleek, brushed-up editorial look lasting up to 7 weeks.',
    features: [
      'Gentle cysteamine bond-breaking formulation respecting follicle integrity',
      'Includes precision sculpting and custom tint enhancement',
      'Instant illusion of 30% fuller brow density',
      'Hydrating botanical keratin lock to retain hair silkiness',
    ],
    recommendedFor: 'Clients with downward-pointing, stiff, or curly brow hair desiring runway-ready brushed architecture.',
  },
  {
    id: 'brow-touchup',
    category: 'brows',
    title: 'Semi-Permanent Brow Perfecting Touch-Up',
    subtitle: '4–6 Week Color Reinforcement & Shape Refinement',
    duration: '90 Mins',
    priceNgn: '₦30,000',
    priceUsd: '$75',
    description: 'The mandatory perfecting session following initial Ombré shading. Once the epidermal skin has completely healed, we evaluate pigment retention, intensify areas that shed lighter, and lock in long-term permanence.',
    features: [
      'Detailed evaluation of pigment absorption and healing tone',
      'Precise micro-shading passes to reinforce arch sharpness',
      'Topical numbing for seamless client ease',
      'Extends the life of your brows to 18-24 months',
    ],
    recommendedFor: 'Existing Leoessential Ombré clients 4 to 8 weeks after their initial procedure.',
  },

  // TRAINING
  {
    id: 'training-beginner',
    category: 'training',
    title: 'Beginner Lash Extension Masterclass (2-Day Intensive)',
    subtitle: '1:1 Private Mentorship Covering Classical Engineering to Business Setup',
    duration: '2 Full Days',
    priceNgn: '₦180,000',
    priceUsd: '$420',
    isPopular: true,
    description: 'An uncompromising, hands-on masterclass led directly by Adedoyin Elegunde. You will learn the science, ergonomics, and ocular hygiene necessary to build a high-ticket lash practice from the ground up.',
    features: [
      'Comprehensive Pro Starter Kit (valued at ₦65,000 / $150)',
      'Ocular Anatomy, Cyanoacrylate Polymerization & Hygrometry Science',
      '1:1 Ergonomics, Fine Tweezer Dexterity & Perfect Isolation',
      'Live Model Mentorship supervised step-by-step by Adedoyin',
      'Leoessential Accredited Certificate of Professional Artistry',
      'Lifetime 1:1 WhatsApp advisory access for case reviews',
    ],
    recommendedFor: 'Aspiring lash technicians, beauty therapists, and ambitious entrepreneurs wanting an elite foundation.',
  },
  {
    id: 'training-mastery',
    category: 'training',
    title: 'Combined Lash & Brow Artistry Mastery (3-Day Elite)',
    subtitle: 'Dual-Discipline Academy: Classic & Volume Lashes + Ombré Microshading',
    duration: '3 Full Days',
    priceNgn: '₦280,000',
    priceUsd: '$650',
    description: 'Our most comprehensive mentorship immersion. Master both lash extension artistry (Classic & Handcrafted Volume) as well as semi-permanent Ombré Powder Brow rotary machine pigmentation in one seamless program.',
    features: [
      'Complete Pro Rotary Tattoo Device, Power Supply & Lash Kit',
      'Latex skin mapping, needle depth calibration & pigment color theory',
      'Volume fan pinching mechanics & speed optimization protocols',
      'Two (2) live supervised practical client models',
      'Business blueprint: Square setup, pricing strategy, client waivers & luxury branding',
      'Priority ongoing mentorship & refresher studio access',
    ],
    recommendedFor: 'Practitioners wanting to offer full-suite high-revenue eye enhancement services immediately.',
  },
  {
    id: 'training-refinement',
    category: 'training',
    title: 'Speed & Retention Refinement Clinic (1-Day Master)',
    subtitle: 'Advanced Clinic for Certified Artists Seeking Speed & 6-Week Retention',
    duration: '1 Full Day',
    priceNgn: '₦95,000',
    priceUsd: '$225',
    description: 'A dedicated diagnostic clinic for practicing lash artists. We dismantle your current workstation, correct muscle ergonomics, solve elusive adhesive shock polymerization, and teach narrow fan pinching.',
    features: [
      'Deep diagnostic review of your current application time & retention rate',
      'Adhesive chemistry deep-dive (temperature, humidity, pH balancing)',
      'Wispy styling, Kim-K spike engineering & layered mapping',
      'Hands-on live model session with immediate corrective feedback',
    ],
    recommendedFor: 'Certified technicians struggling with application speed under 2 hours or inconsistent 3-week retention.',
  },
];

const RETAIL_PRODUCTS: RetailItem[] = [
  {
    id: 'retail-cleanser',
    name: 'Foaming Botanical Lash Cleanser',
    subtitle: 'Oil-Free Ophthalmic Wash for Daily Follicle Care',
    size: '60ml / 2.0 fl oz',
    priceNgn: '₦9,500',
    priceUsd: '$22',
    description: 'Formulated with tea tree extracts and soothing chamomile to dissolve atmospheric dust, sebum, and dead skin cells without weakening medical-grade adhesive bonds. Prevents blepharitis and maintains optimal retention.',
    benefits: [
      '100% Oil-free & sulfate-free formulation',
      'pH balanced (6.8–7.2) for zero eye stinging',
      'Extends lash extension retention by up to 35%',
      'Gentle enough for daily morning and night cleansing',
    ],
    usage: 'Dispense 1 pump onto closed lids, swirl gently using the Leoessential Cleansing Brush, and rinse with lukewarm water. Pat dry.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'retail-mask',
    name: 'Silk Contour Protective Sleep Mask',
    subtitle: '100% 22-Momme Mulberry Silk with Deep Orbital Domes',
    size: 'One Size / Adjustable Band',
    priceNgn: '₦14,000',
    priceUsd: '$34',
    description: 'Engineered specifically for eyelash extension wearers. Features deep ergonomic molded eye contours that sit entirely away from your lash extensions, eliminating friction and crushing while sleeping.',
    benefits: [
      'Zero contact pressure on lash tips or volume fans',
      'Grade 6A pure organic Mulberry silk prevents skin wrinkles',
      '100% blackout capability for restorative deep sleep',
      'Gentle snag-free elastic headband suitable for all hair types',
    ],
    usage: 'Wear every night over lash extensions to protect delicate fans from side-sleeping compression.',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'retail-brush',
    name: 'Micro-Bristle Fluffy Cleansing Brush Set',
    subtitle: 'Ultra-Dense Vegan Fibers for Gentle Lash Line Purification',
    size: 'Set of 2 Ergonomic Brushes',
    priceNgn: '₦5,500',
    priceUsd: '$14',
    description: 'Composed of 120,000 micro-fine velvety synthetic bristles engineered to slide between individual lash extensions without catching or pulling. Delivers a cloud-like wash experience.',
    benefits: [
      'Zero-snag tapered bristle head',
      'Cruelty-free antibacterial synthetic fibers',
      'Sleek water-resistant matte tan wooden handle',
      'Includes hygienic protective travel cap',
    ],
    usage: 'Pair with the Leoessential Foaming Lash Cleanser in downward sweeping motions along the natural lash grain.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'retail-sealer',
    name: 'Barrier Defense Lash Sealing Glaze',
    subtitle: 'Transparent Botanical Membrane Shielding from Humidity & Sebum',
    size: '10ml Precision Wand',
    priceNgn: '₦11,000',
    priceUsd: '$26',
    description: 'A breathable protective topcoat that coats the adhesive bond point in a flexible invisible micro-shield. Repels perspiration, gym humidity, natural facial oils, and pollution particles.',
    benefits: [
      'Enriched with hydrolyzed keratin and provitamin B5',
      'Enhances lash gloss and keeps volume fans neatly fanned',
      'Locks bonds without adding crunchy weight or stiffness',
      'Applies effortlessly via a fine spiral wand',
    ],
    usage: 'Apply lightly to the base of extensions 2–3 times weekly after washing and drying your lashes.',
    image: 'https://images.unsplash.com/photo-1608248597359-bb5b6bbf2002?auto=format&fit=crop&w=600&q=80',
  },
];

const POLICIES_DATA: PolicyItem[] = [
  {
    id: 1,
    title: '1. Non-Refundable Booking Deposit via Square',
    shortDesc: 'A mandatory deposit is required to lock in your appointment slot.',
    severity: 'vital',
    fullDetails: [
      'To honor the deliberate preparation and 1:1 dedication required for each bespoke session, all appointments require a non-refundable booking deposit charged securely via Square.',
      'This deposit is immediately credited towards your final service balance on appointment day.',
      'Appointments are held for a maximum of 30 minutes pending deposit payment before releasing back into public studio availability.',
      'Deposits are strictly non-refundable in the event of client cancellation or failure to attend.',
    ],
  },
  {
    id: 2,
    title: '2. Punctuality & 10–15 Minute Grace Period',
    shortDesc: 'Respecting the architectural precision schedule of each studio guest.',
    severity: 'standard',
    fullDetails: [
      'Please arrive 5 to 10 minutes prior to your scheduled time to settle into the studio and complete your pre-treatment consultation.',
      'We observe a strict 10-minute grace period for standard appointments and 15 minutes for extended full sets.',
      'Late arrivals beyond 15 minutes may experience a shortened service time (to prevent delays for subsequent guests) while still incurring the full service fee, or appointment cancellation forfeiting deposit.',
    ],
  },
  {
    id: 3,
    title: '3. Strict Foreign Work Policy (No Outside Fills)',
    shortDesc: 'We do not fill over work executed by other lash technicians.',
    severity: 'vital',
    fullDetails: [
      'To guarantee our uncompromising safety standards, ocular hygiene, and structural lash health, Leoessential does NOT perform refills over foreign work applied elsewhere.',
      'Variations in adhesive formulations, isolation quality, lash diameters, and technique prevent us from guaranteeing retention or natural lash preservation.',
      'If you currently wear extensions from another salon, kindly book a "Gentle Lash Removal" alongside your "Full Set" of choice.',
    ],
  },
  {
    id: 4,
    title: '4. Solo Sanctuary Rule (Strictly No Guests or Children)',
    shortDesc: 'A tranquil, sterile environment dedicated exclusively to your relaxation.',
    severity: 'vital',
    fullDetails: [
      'Leoessential operates as an intimate private beauty sanctuary. In adherence to strict clinical sanitization guidelines and liability insurance policies, additional guests, friends, partners, or children are strictly prohibited inside the procedure area.',
      'Your procedure requires your eyes to remain completely closed in undisturbed stillness for 60 to 150 minutes.',
      'Arriving with unauthorized companions will result in service refusal and forfeiture of your deposit.',
    ],
  },
  {
    id: 5,
    title: '5. Health, Sensitive Disclosures & Ocular Suitability',
    shortDesc: 'Pre-existing ophthalmic conditions, patch testing, and contraindications.',
    severity: 'standard',
    fullDetails: [
      'Please notify Adedoyin prior to booking if you have a history of ocular allergies, recent eye surgeries (LASIK/cataracts within 6 months), blepharitis, active styes, or skin sensitivities.',
      'Complimentary 48-hour patch tests are gladly accommodated for clients with hyper-sensitive skin upon request.',
      'Contact lens wearers must arrive wearing glasses or remove contact lenses prior to procedure start.',
      'For semi-permanent brows, clients must not be pregnant, nursing, or undergoing active chemotherapy treatments.',
    ],
  },
  {
    id: 6,
    title: '6. Studio Conduct, Rescheduling & 48-Hour Cancellation Terms',
    shortDesc: 'Transparent terms governing reschedules, no-shows, and studio mutual respect.',
    severity: 'standard',
    fullDetails: [
      'Rescheduling requests must be communicated at least 48 hours prior to your scheduled booking via Square or direct WhatsApp to transfer your deposit to a new date.',
      'Only one (1) reschedule transfer is permitted per booking deposit within a 30-day window.',
      'Cancellations made within 24 hours of appointment time or "No-Shows" forfeit the deposit and will require 100% prepayment before scheduling any future services.',
      'Kindly ensure cell phones are placed on silent upon entering the studio to maintain a deeply restorative sanctuary atmosphere.',
    ],
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('lashes');
  const [openPolicyId, setOpenPolicyId] = useState<number | null>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track page scroll to dynamically adapt navbar blur & theme
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quick toast banner notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const copyContact = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    triggerToast(`Copied ${label} to clipboard: ${text}`);
  };

  const handlePolicyToggle = (id: number) => {
    setOpenPolicyId(prev => (prev === id ? null : id));
  };

  // WhatsApp reserve retail link generator
  const getReserveWhatsAppUrl = (productName: string) => {
    const encodedText = encodeURIComponent(
      `Hi Adedoyin, I would like to reserve ${productName} for my upcoming appointment at Leoessential.`
    );
    return `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodedText}`;
  };

  // WhatsApp mentorship application link generator
  const getMentorshipWhatsAppUrl = (courseTitle: string = "1:1 Professional Masterclass") => {
    const encodedText = encodeURIComponent(
      `Hi Adedoyin, I would like to apply for the Leoessential ${courseTitle}. Could you share the upcoming cohort schedule and intake requirements?`
    );
    return `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodedText}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#C49A70]/20 selection:text-[#1C1917] flex flex-col font-sans-studio">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#1C1917] text-[#FAF8F5] px-5 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-medium flex items-center gap-3 border border-[#C49A70]/30 transition-all duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#C49A70] shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-[#FAF8F5]/60 hover:text-[#FAF8F5]">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* TOP BAR / NAVIGATION (Fixed in carousel with premium blur & persistent scroll position) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav-scrolled text-[#1C1917]'
            : 'glass-nav-top text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Luxury Monogram & Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
          >
            <img
              src={LOGO_VECTOR}
              alt="Leoessential Insignia"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <span
              className={`text-xl sm:text-2xl font-editorial tracking-[0.2em] sm:tracking-[0.25em] font-semibold transition-colors ${
                isScrolled ? 'text-[#1C1917] group-hover:text-[#C49A70]' : 'text-[#FAF8F5] group-hover:text-[#C49A70]'
              }`}
            >
              LEOESSENTIAL
            </span>
          </a>

          {/* Zone 2: 4–6 clean text navigation links */}
          <nav
            className={`hidden lg:flex items-center gap-6 xl:gap-8 text-xs lg:text-sm tracking-wider uppercase font-medium transition-colors ${
              isScrolled ? 'text-[#7A7267]' : 'text-white/80'
            }`}
          >
            <a
              href="#services"
              className={`transition-colors ${
                isScrolled ? 'hover:text-[#1C1917]' : 'hover:text-white'
              }`}
            >
              Services
            </a>
            <a
              href="#philosophy"
              className={`transition-colors ${
                isScrolled ? 'hover:text-[#1C1917]' : 'hover:text-white'
              }`}
            >
              Philosophy
            </a>
            <a
              href="#training"
              className={`transition-colors ${
                isScrolled ? 'hover:text-[#1C1917]' : 'hover:text-white'
              }`}
            >
              Training
            </a>
            <a
              href="#policies"
              className={`transition-colors ${
                isScrolled ? 'hover:text-[#1C1917]' : 'hover:text-white'
              }`}
            >
              Policies
            </a>
            <a
              href="#contact"
              className={`transition-colors ${
                isScrolled ? 'hover:text-[#1C1917]' : 'hover:text-white'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1–2 primary actions */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={SQUARE_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C49A70] hover:bg-[#b0855c] active:scale-[0.98] rounded-none transition-all shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </a>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 focus:outline-none transition-colors ${
                isScrolled ? 'text-[#1C1917] hover:text-[#C49A70]' : 'text-white hover:text-[#C49A70]'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border-b px-6 py-6 space-y-4 text-center transition-all ${
              isScrolled
                ? 'border-[#1C1917]/10 bg-[#FAF8F5]/98 backdrop-blur-xl text-[#1C1917]'
                : 'border-white/10 bg-[#1C1917]/95 backdrop-blur-xl text-white'
            }`}
          >
            {/* Brand Monogram in Mobile Drawer */}
            <div className="flex items-center justify-center gap-2.5 pb-3 border-b border-inherit">
              <img
                src={LOGO_VECTOR}
                alt="Leoessential Insignia"
                className="w-7 h-7 object-contain"
              />
              <span className="font-editorial text-xl tracking-[0.2em] font-semibold">
                LEOESSENTIAL
              </span>
            </div>

            <div
              className={`flex flex-col space-y-3 uppercase tracking-widest text-xs font-medium ${
                isScrolled ? 'text-[#7A7267]' : 'text-white/80'
              }`}
            >
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b ${
                  isScrolled
                    ? 'hover:text-[#1C1917] border-[#EFE9DF]'
                    : 'hover:text-white border-white/10'
                }`}
              >
                Services Menu
              </a>
              <a
                href="#philosophy"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b ${
                  isScrolled
                    ? 'hover:text-[#1C1917] border-[#EFE9DF]'
                    : 'hover:text-white border-white/10'
                }`}
              >
                Philosophy & Hygiene
              </a>
              <a
                href="#training"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b ${
                  isScrolled
                    ? 'hover:text-[#1C1917] border-[#EFE9DF]'
                    : 'hover:text-white border-white/10'
                }`}
              >
                1:1 Training Academy
              </a>
              <a
                href="#policies"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b ${
                  isScrolled
                    ? 'hover:text-[#1C1917] border-[#EFE9DF]'
                    : 'hover:text-white border-white/10'
                }`}
              >
                Studio Policies
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 ${
                  isScrolled ? 'hover:text-[#1C1917]' : 'hover:text-white'
                }`}
              >
                Contact & Studio Info
              </a>
            </div>
            <div className="pt-2">
              <a
                href={SQUARE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 text-xs uppercase tracking-widest font-semibold text-white bg-[#C49A70] hover:bg-[#b0855c]"
              >
                Book via Square
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        
        {/* HERO EDITORIAL SHOWCASE CAROUSEL (BESPOKE LASH ARTISTRY) */}
        <HeroCarousel />

        {/* PHILOSOPHY & SAFETY PROTOCOL SECTION */}
        <section id="philosophy" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#1C1917]/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header with human editorial numbering */}
            <div className="max-w-2xl mb-16 space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C49A70]">
                01. The Philosophy & Safety Charter
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial font-light text-[#1C1917] leading-tight">
                Beauty without compromise, built on clinical restraint.
              </h2>
              <p className="text-sm sm:text-base text-[#7A7267] leading-relaxed">
                At Leoessential, lash extensions and brow enhancements are approached not as temporary accessories, but as delicate extensions of your natural ocular anatomy. Every protocol honors long-term preservation over fleeting drama.
              </p>
            </div>

            {/* 3 Pillars of Adedoyin's Standards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Pillar 1 */}
              <div className="bg-[#FAF8F5] border border-[#1C1917]/10 p-8 space-y-4 hover:border-[#C49A70]/60 transition-colors">
                <div className="w-12 h-12 bg-[#EFE9DF] border border-[#C49A70]/30 flex items-center justify-center text-[#C49A70]">
                  <Eye className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-editorial font-medium text-[#1C1917]">
                  Natural Lash Preservation
                </h3>
                <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed">
                  We calculate exact weight and diameter allowances for every natural lash. By strictly refusing to apply extensions heavier than your hair follicle can comfortably bear, we prevent premature shedding and ensure you can wear extensions indefinitely without damage.
                </p>
                <div className="pt-2 text-xs uppercase tracking-wider text-[#C49A70] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Zero Overloading Rule</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#FAF8F5] border border-[#1C1917]/10 p-8 space-y-4 hover:border-[#C49A70]/60 transition-colors">
                <div className="w-12 h-12 bg-[#EFE9DF] border border-[#C49A70]/30 flex items-center justify-center text-[#C49A70]">
                  <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-editorial font-medium text-[#1C1917]">
                  Hospital-Grade Sanitization
                </h3>
                <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed">
                  Your ocular health is paramount. Instruments undergo multi-stage ultrasonic and medical autoclave sterilization between each guest. All eye pads, micro-brushes, glue rings, and mascara wands are strictly 100% single-use disposables opened right in front of you.
                </p>
                <div className="pt-2 text-xs uppercase tracking-wider text-[#C49A70] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Clinical Sterilization Cycle</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#FAF8F5] border border-[#1C1917]/10 p-8 space-y-4 hover:border-[#C49A70]/60 transition-colors">
                <div className="w-12 h-12 bg-[#EFE9DF] border border-[#C49A70]/30 flex items-center justify-center text-[#C49A70]">
                  <Compass className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-editorial font-medium text-[#1C1917]">
                  Tailored Eye Mapping
                </h3>
                <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed">
                  We never use generic or one-size-fits-all lash patterns. Every set is individually mapped prior to application based on orbital depth, natural brow curvature, eyelid symmetry, and face shape to create a bespoke aesthetic that truly elevates your features.
                </p>
                <div className="pt-2 text-xs uppercase tracking-wider text-[#C49A70] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Architectural Symmetry</span>
                </div>
              </div>

            </div>

            {/* Editorial Quote Box */}
            <div className="mt-12 bg-[#EFE9DF] border border-[#C49A70]/30 p-8 sm:p-12 relative overflow-hidden">
              {/* Background watermark seal */}
              <div className="absolute right-[-20px] sm:right-6 -bottom-10 sm:-bottom-12 opacity-[0.07] pointer-events-none select-none">
                <img
                  src={LOGO_VECTOR}
                  alt=""
                  className="w-56 h-56 sm:w-72 sm:h-72 object-contain"
                />
              </div>

              <div className="max-w-3xl space-y-4 relative z-10">
                <div className="flex items-center gap-2">
                  <img
                    src={LOGO_VECTOR}
                    alt="Leoessential Emblem"
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C49A70]">
                    From The Founder & Master Artist
                  </span>
                </div>
                <blockquote className="font-editorial text-2xl sm:text-3xl font-light text-[#1C1917] italic leading-snug">
                  "Lash artistry is an architectural practice. When we honor the millimeter and respect the follicle, the result is effortless elegance that feels like your own."
                </blockquote>
                <div className="pt-2 flex items-center gap-3">
                  <div className="w-8 h-px bg-[#C49A70]" />
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#1C1917]">
                    Adedoyin Elegunde
                  </span>
                  <span className="text-xs text-[#7A7267]">· Owner & Master Artist, Leoessential</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* INTERACTIVE SERVICE MENU & CATALOG */}
        <section id="services" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#1C1917]/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C49A70]">
                  02. Curated Menu & Offerings
                </span>
                <h2 className="text-3xl sm:text-4xl font-editorial font-light text-[#1C1917]">
                  The Service & Retail Catalog
                </h2>
                <p className="text-xs sm:text-sm text-[#7A7267] max-w-xl">
                  Filter by category below to discover our lash sets, brow microshading, professional academy training, and studio-exclusive retail care.
                </p>
              </div>

              {/* Square Booking Direct Header Anchor */}
              <div className="shrink-0">
                <a
                  href={SQUARE_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[#1C1917]/20 hover:border-[#1C1917] text-xs uppercase tracking-wider font-semibold text-[#1C1917] hover:bg-[#EFE9DF] transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C49A70]" />
                  <span>Check Real-Time Availability on Square</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#7A7267]" />
                </a>
              </div>
            </div>

            {/* Interactive Tab Segmented Control */}
            <div className="flex items-center overflow-x-auto pb-2 border-b border-[#1C1917]/10 mb-10 gap-2 sm:gap-4 no-scrollbar">
              <button
                onClick={() => setActiveTab('lashes')}
                className={`px-5 py-3 text-xs sm:text-sm uppercase tracking-wider font-medium whitespace-nowrap transition-all border-b-2 -mb-[2px] ${
                  activeTab === 'lashes'
                    ? 'border-[#C49A70] text-[#1C1917] font-semibold bg-[#EFE9DF]/40'
                    : 'border-transparent text-[#7A7267] hover:text-[#1C1917]'
                }`}
              >
                Lashes <span className="text-[11px] opacity-60 ml-1 font-mono">(5)</span>
              </button>

              <button
                onClick={() => setActiveTab('brows')}
                className={`px-5 py-3 text-xs sm:text-sm uppercase tracking-wider font-medium whitespace-nowrap transition-all border-b-2 -mb-[2px] ${
                  activeTab === 'brows'
                    ? 'border-[#C49A70] text-[#1C1917] font-semibold bg-[#EFE9DF]/40'
                    : 'border-transparent text-[#7A7267] hover:text-[#1C1917]'
                }`}
              >
                Brows <span className="text-[11px] opacity-60 ml-1 font-mono">(4)</span>
              </button>

              <button
                onClick={() => setActiveTab('training')}
                className={`px-5 py-3 text-xs sm:text-sm uppercase tracking-wider font-medium whitespace-nowrap transition-all border-b-2 -mb-[2px] ${
                  activeTab === 'training'
                    ? 'border-[#C49A70] text-[#1C1917] font-semibold bg-[#EFE9DF]/40'
                    : 'border-transparent text-[#7A7267] hover:text-[#1C1917]'
                }`}
              >
                1:1 Training Academy <span className="text-[11px] opacity-60 ml-1 font-mono">(3)</span>
              </button>

              <button
                onClick={() => setActiveTab('retail')}
                className={`px-5 py-3 text-xs sm:text-sm uppercase tracking-wider font-medium whitespace-nowrap transition-all border-b-2 -mb-[2px] ${
                  activeTab === 'retail'
                    ? 'border-[#C49A70] text-[#1C1917] font-semibold bg-[#EFE9DF]/40'
                    : 'border-transparent text-[#7A7267] hover:text-[#1C1917]'
                }`}
              >
                Studio Retail <span className="text-[11px] opacity-60 ml-1 font-mono">(Pickup Only)</span>
              </button>
            </div>

            {/* TAB CONTENT: SERVICES (Lashes, Brows, Training) */}
            {activeTab !== 'retail' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SERVICES_DATA.filter(item => item.category === activeTab).map((service) => (
                  <div
                    key={service.id}
                    className="group bg-[#FAF8F5] border border-[#1C1917]/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#C49A70] transition-all hover:shadow-sm relative"
                  >
                    <div>
                      {/* Top Meta Header */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="space-y-1">
                          {service.isPopular && (
                            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C49A70]">
                              Studio Signature Choice
                            </span>
                          )}
                          <h3 className="text-xl sm:text-2xl font-editorial font-medium text-[#1C1917] group-hover:text-[#C49A70] transition-colors">
                            {service.title}
                          </h3>
                        </div>

                        {/* Price Badge */}
                        <div className="text-right shrink-0">
                          <div className="text-lg font-mono font-semibold text-[#1C1917]">
                            {service.priceNgn}
                          </div>
                          <div className="text-[11px] font-mono text-[#7A7267]">
                            approx. {service.priceUsd}
                          </div>
                        </div>
                      </div>

                      {/* Subtitle / Kicker */}
                      <p className="text-xs uppercase tracking-wider text-[#7A7267] font-medium mb-4">
                        {service.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Feature Bulletpoints */}
                      <div className="space-y-2 mb-6 border-t border-[#1C1917]/5 pt-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#1C1917]/80">
                            <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Best for recommendation */}
                      {service.recommendedFor && (
                        <div className="text-[11px] text-[#7A7267] bg-[#EFE9DF]/60 p-3 mb-6 border-l-2 border-[#C49A70]">
                          <span className="font-semibold text-[#1C1917]">Recommended for: </span>
                          {service.recommendedFor}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 border-t border-[#1C1917]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      {service.duration && (
                        <div className="flex items-center gap-1.5 text-xs text-[#7A7267] font-mono">
                          <Clock className="w-3.5 h-3.5 text-[#C49A70]" />
                          <span>{service.duration}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {service.category === 'training' ? (
                          <a
                            href={getMentorshipWhatsAppUrl(service.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C49A70] hover:bg-[#b0855c] text-white text-xs uppercase tracking-wider font-semibold transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Apply for Intake</span>
                          </a>
                        ) : (
                          <a
                            href={SQUARE_BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1C1917] hover:bg-[#C49A70] text-white text-xs uppercase tracking-wider font-semibold transition-all"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Book on Square</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: STUDIO RETAIL (In-Studio Pickup Only) */}
            {activeTab === 'retail' && (
              <div>
                <div className="mb-8 p-4 bg-[#EFE9DF] border border-[#C49A70]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-[#C49A70] shrink-0" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1C1917]">
                        In-Studio Pickup Only Notice
                      </h4>
                      <p className="text-xs text-[#7A7267]">
                        Reserve your retail items now to ensure guaranteed stock during your upcoming appointment or collection visit.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#1C1917] uppercase tracking-wider whitespace-nowrap bg-[#FAF8F5] px-3 py-1 border border-[#1C1917]/10">
                    No Shipping Delay
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {RETAIL_PRODUCTS.map((product) => (
                    <div
                      key={product.id}
                      className="bg-[#FAF8F5] border border-[#1C1917]/10 flex flex-col justify-between hover:border-[#C49A70] transition-all p-5"
                    >
                      <div>
                        {/* Product Image */}
                        <div className="aspect-square bg-[#EFE9DF] overflow-hidden mb-4 border border-[#1C1917]/5 relative">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            fallbackLabel={product.name}
                            category="product"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-2 left-2 text-[10px] uppercase font-mono tracking-wider bg-[#FAF8F5]/90 backdrop-blur-sm px-2 py-0.5 text-[#1C1917] border border-[#1C1917]/10">
                            {product.size}
                          </span>
                        </div>

                        {/* Title & Price */}
                        <div className="mb-2">
                          <h4 className="font-editorial text-lg text-[#1C1917] font-medium leading-snug">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-[#7A7267] uppercase tracking-wide mt-0.5">
                            {product.subtitle}
                          </p>
                        </div>

                        {/* Price Display */}
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="font-mono font-semibold text-[#1C1917] text-base">
                            {product.priceNgn}
                          </span>
                          <span className="font-mono text-xs text-[#7A7267]">
                            ({product.priceUsd})
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[#7A7267] leading-relaxed mb-4">
                          {product.description}
                        </p>

                        {/* Benefits list */}
                        <div className="space-y-1.5 mb-4 text-[11px] text-[#1C1917]/80">
                          {product.benefits.slice(0, 3).map((benefit, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <Check className="w-3 h-3 text-[#C49A70] shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Reserve for Pickup Button (Triggers direct WhatsApp message) */}
                      <div className="pt-4 border-t border-[#1C1917]/10">
                        <a
                          href={getReserveWhatsAppUrl(product.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C49A70] hover:bg-[#b0855c] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Reserve for Pickup</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* 1:1 TRAINING ACADEMY SPOTLIGHT */}
        <section id="training" className="py-20 sm:py-28 bg-[#EFE9DF] border-b border-[#1C1917]/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Academy Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C49A70]">
                  03. Professional Mastery
                </span>
                
                <h2 className="text-3xl sm:text-5xl font-editorial font-light text-[#1C1917] leading-tight">
                  The Leoessential <span className="italic">1:1 Mentorship Academy.</span>
                </h2>

                <p className="text-sm sm:text-base text-[#7A7267] leading-relaxed">
                  The Nigerian and global beauty industry demands more than 2-hour crash courses. Adedoyin Elegunde conducts private, uncompromising 1:1 masterclasses teaching exact micro-mechanics, hygrometry science, and luxury client experience.
                </p>

                {/* Curriculum Pillars Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#FAF8F5] border border-[#1C1917]/10 space-y-1">
                    <span className="font-editorial text-base text-[#1C1917] font-semibold">Anatomy & Ocular Safety</span>
                    <p className="text-xs text-[#7A7267]">Corneal protection, adhesive chemistry & cyanoacrylate fumes management.</p>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border border-[#1C1917]/10 space-y-1">
                    <span className="font-editorial text-base text-[#1C1917] font-semibold">Micrometric Isolation</span>
                    <p className="text-xs text-[#7A7267]">Ergonomic tweezer tension, wrist posture & zero stickies tolerance.</p>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border border-[#1C1917]/10 space-y-1">
                    <span className="font-editorial text-base text-[#1C1917] font-semibold">Live Model Supervision</span>
                    <p className="text-xs text-[#7A7267]">Real-time correction under Adedoyin’s personal side-by-side guidance.</p>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border border-[#1C1917]/10 space-y-1">
                    <span className="font-editorial text-base text-[#1C1917] font-semibold">Business & Square Architecture</span>
                    <p className="text-xs text-[#7A7267]">Deposit policy setup, luxury client retention & pricing psychology.</p>
                  </div>
                </div>

                {/* Academy CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                  <a
                    href={getMentorshipWhatsAppUrl("1:1 Lash & Brow Mentorship")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1C1917] hover:bg-[#C49A70] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-[#C49A70]" />
                    <span>Apply for 1:1 Mentorship</span>
                  </a>

                  <a
                    href={`tel:${STUDIO_PHONE}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#1C1917]/20 hover:border-[#1C1917] bg-[#FAF8F5] text-[#1C1917] text-xs uppercase tracking-wider font-medium transition-all text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C49A70]" />
                    <span>Speak with Adedoyin ({STUDIO_PHONE})</span>
                  </a>
                </div>

              </div>

              {/* Right Column: Visual Academy Kit */}
              <div className="lg:col-span-5">
                <div className="bg-[#FAF8F5] border border-[#1C1917]/10 p-6 sm:p-8 space-y-6">
                  <div className="aspect-[4/3] bg-[#EFE9DF] overflow-hidden relative border border-[#1C1917]/10">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80"
                      alt="Leoessential Professional Lash and Brow Masterclass Kit"
                      fallbackLabel="Professional Academy Kit"
                      category="training"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#1C1917] text-white px-2.5 py-1 text-[10px] uppercase font-mono tracking-widest">
                      Kit Valued at ₦65,000 Included
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-editorial text-2xl text-[#1C1917] font-medium">
                        What Every Student Receives
                      </h4>
                      <img
                        src={LOGO_VECTOR}
                        alt="Accredited Leoessential Certificate"
                        className="w-7 h-7 object-contain opacity-90"
                      />
                    </div>
                    <ul className="space-y-2 text-xs text-[#7A7267]">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0" />
                        <span>2 Precision Japanese Steel Hand-Tested Tweezers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0" />
                        <span>Professional Humidity Gauge & Medical Cyanoacrylate Adhesive</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0" />
                        <span>6 Mixed Trays of Premium Faux-Mink Silk Extensions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0" />
                        <span>Printed Leoessential Anatomy & Eye Mapping Workbook</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0" />
                        <span>Accredited Leoessential Certificate of Completion</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 bg-[#EFE9DF] text-[11px] text-[#1C1917] font-mono flex items-center justify-between">
                    <span>Intake Cohorts:</span>
                    <span className="font-semibold text-[#C49A70]">Limited to 2 Students / Month</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STUDIO POLICIES & BOUNDARIES (Interactive Accordion) */}
        <section id="policies" className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#1C1917]/10 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C49A70]">
                04. Mutual Respect & Studio Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial font-light text-[#1C1917]">
                Studio Policies & Boundaries
              </h2>
              <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed">
                To guarantee unhurried precision, immaculate sanitization, and a tranquil sanctuary for every client, all appointments are governed by the following six studio guidelines.
              </p>
            </div>

            {/* Accordion Container */}
            <div className="space-y-4">
              {POLICIES_DATA.map((policy) => {
                const isOpen = openPolicyId === policy.id;
                return (
                  <div
                    key={policy.id}
                    className={`border transition-all duration-200 ${
                      isOpen
                        ? 'border-[#C49A70] bg-[#FAF8F5] shadow-sm'
                        : 'border-[#1C1917]/10 bg-[#FAF8F5] hover:border-[#1C1917]/30'
                    }`}
                  >
                    <button
                      onClick={() => handlePolicyToggle(policy.id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 pr-4">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${policy.severity === 'vital' ? 'bg-[#C49A70]' : 'bg-[#7A7267]'}`} />
                        <div>
                          <h3 className="font-editorial text-lg sm:text-xl font-medium text-[#1C1917]">
                            {policy.title}
                          </h3>
                          <p className="text-xs text-[#7A7267] mt-0.5 line-clamp-1">
                            {policy.shortDesc}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#1C1917]">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {/* Accordion Expanded Body */}
                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 border-t border-[#1C1917]/5 space-y-3">
                        {policy.fullDetails.map((para, i) => (
                          <p key={i} className="text-xs sm:text-sm text-[#7A7267] leading-relaxed flex items-start gap-2">
                            <span className="text-[#C49A70] font-mono text-xs mt-0.5">·</span>
                            <span>{para}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Reassurance Note */}
            <div className="mt-10 p-6 bg-[#EFE9DF] border border-[#C49A70]/30 text-center space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                Questions regarding our policies prior to booking?
              </p>
              <p className="text-xs text-[#7A7267]">
                We are always happy to assist with sensitive ocular inquiries or scheduling accommodations.
              </p>
              <div className="pt-2 flex items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${STUDIO_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wider font-semibold text-[#C49A70] hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Message Adedoyin on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* CLIENT PRAISE & SOCIAL PROOF */}
        <section className="py-20 sm:py-24 bg-[#FAF8F5] border-b border-[#1C1917]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C49A70]">
                Client Experience
              </span>
              <h2 className="text-3xl font-editorial font-light text-[#1C1917]">
                Praise from the Sanctuary
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[#FAF8F5] border border-[#1C1917]/10 space-y-4">
                <div className="flex gap-1 text-[#C49A70]">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-3.5 h-3.5 fill-[#C49A70]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed italic">
                  "Adedoyin is a true artisan. My hybrid set lasted four full weeks without a single natural lash pulling. The studio is pristine, quiet, and deeply soothing. I will never go anywhere else."
                </p>
                <div className="pt-2 border-t border-[#1C1917]/5 text-xs">
                  <div className="font-semibold text-[#1C1917]">Oluwatosin B.</div>
                  <div className="text-[#7A7267]">Hybrid Dimension Client</div>
                </div>
              </div>

              <div className="p-8 bg-[#FAF8F5] border border-[#1C1917]/10 space-y-4">
                <div className="flex gap-1 text-[#C49A70]">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-3.5 h-3.5 fill-[#C49A70]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed italic">
                  "The Ombré powder brow transformation was beyond what I imagined. No harsh edges, just a soft airbrushed shadow that makes me look polished the second I wake up. Zero discomfort during the process."
                </p>
                <div className="pt-2 border-t border-[#1C1917]/5 text-xs">
                  <div className="font-semibold text-[#1C1917]">Chioma A.</div>
                  <div className="text-[#7A7267]">Semi-Permanent Brow Client</div>
                </div>
              </div>

              <div className="p-8 bg-[#FAF8F5] border border-[#1C1917]/10 space-y-4">
                <div className="flex gap-1 text-[#C49A70]">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-3.5 h-3.5 fill-[#C49A70]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed italic">
                  "Taking the 2-Day intensive masterclass with Adedoyin changed my entire career. Her explanation of adhesive hygrometry and tweezer angles solved every retention issue I previously had. Worth every naira."
                </p>
                <div className="pt-2 border-t border-[#1C1917]/5 text-xs">
                  <div className="font-semibold text-[#1C1917]">Temilade K.</div>
                  <div className="text-[#7A7267]">Academy Graduate & Studio Owner</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION, BOOKING & CONTACT */}
        <section id="contact" className="py-20 sm:py-28 bg-[#EFE9DF] border-b border-[#1C1917]/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Studio Direct Info */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C49A70]">
                    05. Connect & Visit
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-editorial font-light text-[#1C1917]">
                    Begin your personalized transformation.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed">
                    All appointments must be confirmed via Square in advance. For special event accommodations, bridal parties, or private academy dates, contact Adedoyin directly.
                  </p>
                </div>

                {/* Direct Action Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div className="bg-[#FAF8F5] p-5 border border-[#1C1917]/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-[#7A7267] font-semibold">Direct Call</span>
                      <Phone className="w-4 h-4 text-[#C49A70]" />
                    </div>
                    <a
                      href={`tel:${STUDIO_PHONE}`}
                      className="block font-mono text-base font-semibold text-[#1C1917] hover:text-[#C49A70]"
                    >
                      {STUDIO_PHONE}
                    </a>
                    <button
                      onClick={() => copyContact(STUDIO_PHONE, 'Phone Number')}
                      className="text-[11px] text-[#C49A70] hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy number</span>
                    </button>
                  </div>

                  {/* WhatsApp */}
                  <div className="bg-[#FAF8F5] p-5 border border-[#1C1917]/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-[#7A7267] font-semibold">Instant WhatsApp</span>
                      <MessageCircle className="w-4 h-4 text-[#C49A70]" />
                    </div>
                    <a
                      href={`https://wa.me/${STUDIO_WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-mono text-base font-semibold text-[#1C1917] hover:text-[#C49A70]"
                    >
                      {STUDIO_PHONE_INTL}
                    </a>
                    <a
                      href={`https://wa.me/${STUDIO_WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#C49A70] hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Start direct chat</span>
                    </a>
                  </div>

                  {/* Email */}
                  <div className="bg-[#FAF8F5] p-5 border border-[#1C1917]/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-[#7A7267] font-semibold">Direct Email</span>
                      <Mail className="w-4 h-4 text-[#C49A70]" />
                    </div>
                    <a
                      href={`mailto:${STUDIO_EMAIL}`}
                      className="block text-xs font-mono font-medium text-[#1C1917] hover:text-[#C49A70] truncate"
                      title={STUDIO_EMAIL}
                    >
                      {STUDIO_EMAIL}
                    </a>
                    <button
                      onClick={() => copyContact(STUDIO_EMAIL, 'Email Address')}
                      className="text-[11px] text-[#C49A70] hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy email</span>
                    </button>
                  </div>

                  {/* Instagram */}
                  <div className="bg-[#FAF8F5] p-5 border border-[#1C1917]/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-[#7A7267] font-semibold">Instagram Portfolio</span>
                      <Instagram className="w-4 h-4 text-[#C49A70]" />
                    </div>
                    <a
                      href={STUDIO_INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-semibold text-[#1C1917] hover:text-[#C49A70]"
                    >
                      {STUDIO_INSTAGRAM_HANDLE}
                    </a>
                    <a
                      href={STUDIO_INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#C49A70] hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View recent sets</span>
                    </a>
                  </div>

                </div>

                {/* Hours table */}
                <div className="bg-[#FAF8F5] p-6 border border-[#1C1917]/10 space-y-3">
                  <div className="text-xs uppercase tracking-widest font-semibold text-[#1C1917] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C49A70]" />
                    <span>Studio Operating Hours</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#7A7267] font-mono">
                    <div className="flex justify-between py-1 border-b border-[#1C1917]/5">
                      <span>Tuesday – Friday:</span>
                      <span className="text-[#1C1917] font-medium">9:30 AM – 6:30 PM</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1C1917]/5">
                      <span>Saturday:</span>
                      <span className="text-[#1C1917] font-medium">10:00 AM – 7:00 PM</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1C1917]/5">
                      <span>Sunday:</span>
                      <span className="text-[#C49A70] font-medium">By Special VIP Appointment</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Monday:</span>
                      <span className="text-[#7A7267]">Closed (Dedicated 1:1 Academy Days)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Square Booking Card */}
              <div className="lg:col-span-6 bg-[#FAF8F5] border border-[#C49A70]/40 p-8 sm:p-10 shadow-lg relative">
                <div className="space-y-6">
                  
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#C49A70]">
                      Instant Reservation
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-[#1C1917]">
                      Secure Your Appointment on Square
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed">
                      Select your desired service, date, and preferred time slot directly on our verified Square Appointments portal. Instant confirmation and automatic calendar synchronization.
                    </p>
                  </div>

                  <div className="p-4 bg-[#EFE9DF] border-l-2 border-[#C49A70] space-y-1">
                    <div className="text-xs font-semibold text-[#1C1917]">
                      Booking Checklist Reminder:
                    </div>
                    <ul className="text-xs text-[#7A7267] space-y-1 list-disc list-inside">
                      <li>Arrive completely free of eye makeup or mascara.</li>
                      <li>Remove contact lenses prior to procedure start.</li>
                      <li>Foreign fills require a Lash Removal + Full Set booking.</li>
                      <li>Solo Sanctuary rule applies (no extra companions).</li>
                    </ul>
                  </div>

                  <a
                    href={SQUARE_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#C49A70] hover:bg-[#b0855c] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md active:scale-[0.99]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Proceed to Square Booking</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <div className="text-center text-[11px] text-[#7A7267]">
                    Encrypted 256-bit payment processing provided by Square · Instant receipt issued
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#FAF8F5] border-t border-[#1C1917]/10 py-12 text-[#1C1917]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#1C1917]/10">
            
            {/* Brand column */}
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 group focus:outline-none">
                <img
                  src={LOGO_VECTOR}
                  alt="Leoessential Insignia"
                  className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <span className="font-editorial text-2xl font-semibold tracking-[0.25em] text-[#1C1917] group-hover:text-[#C49A70] transition-colors">
                  LEOESSENTIAL
                </span>
              </a>
              <p className="text-xs text-[#7A7267] max-w-sm">
                Owned and artistically directed by Adedoyin Elegunde. Bespoke lash architecture, semi-permanent brow artistry, and professional mentorship.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-wider text-[#7A7267]">
              <a href="#services" className="hover:text-[#1C1917]">Services</a>
              <a href="#philosophy" className="hover:text-[#1C1917]">Philosophy</a>
              <a href="#training" className="hover:text-[#1C1917]">1:1 Academy</a>
              <a href="#policies" className="hover:text-[#1C1917]">Policies</a>
              <a href="#contact" className="hover:text-[#1C1917]">Contact</a>
              <a
                href={STUDIO_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C49A70] flex items-center gap-1"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{STUDIO_INSTAGRAM_HANDLE}</span>
              </a>
            </div>

          </div>

          {/* Copyright & Micro info */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7267]">
            <p>
              © {new Date().getFullYear()} Leoessential by Adedoyin Elegunde. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span>"Enhancing your natural beauty through intentional detail."</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING STICKY BOOKING BAR FOR MOBILE (md:hidden) */}
      {/* Capped to < 15% mobile viewport height per design system */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#1C1917]/15 p-3 px-4 shadow-[0_-8px_20px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <a
            href={`tel:${STUDIO_PHONE}`}
            className="w-10 h-10 rounded-none bg-[#EFE9DF] border border-[#1C1917]/10 flex items-center justify-center text-[#1C1917] active:bg-[#C49A70] active:text-white transition-colors"
            aria-label="Direct Phone Call"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={`https://wa.me/${STUDIO_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-none bg-[#EFE9DF] border border-[#1C1917]/10 flex items-center justify-center text-[#1C1917] active:bg-[#C49A70] active:text-white transition-colors"
            aria-label="WhatsApp Message"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        <a
          href={SQUARE_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-4 bg-[#C49A70] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm text-center active:scale-[0.98]"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book with Adedoyin</span>
        </a>
      </div>

    </div>
  );
}
