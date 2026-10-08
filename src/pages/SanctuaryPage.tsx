import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Sparkles,
  Eye,
  Check,
  Clock,
  HeartHandshake,
  ArrowUpRight,
  AlertCircle,
} from 'lucide-react';
import { POLICIES_DATA } from '../data/policies';
import { STUDIO_CONFIG } from '../data/studio';

export const SanctuaryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sanctuary' | 'care' | 'policies'>('sanctuary');

  return (
    <div className="pt-24 sm:pt-32 pb-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl pb-10 border-b border-[#1C1917]/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C49A70]" />
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
              The Sanctuary
            </span>
            <span className="w-6 h-px bg-[#C49A70]" />
            <span className="text-xs uppercase tracking-wider text-[#7A7267]">
              Ibadan, Oyo State
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1917] leading-tight">
            Sanctuary Atmosphere, Care & Policies
          </h1>

          <p className="text-sm sm:text-base text-[#7A7267] leading-relaxed">
            Our private studio operates as an undisturbed beauty sanctuary. Here you will find our clinical hygiene standards, preparation instructions, aftercare rituals, and studio etiquette.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 py-6 overflow-x-auto text-xs uppercase tracking-widest font-semibold border-b border-[#1C1917]/10">
          <button
            onClick={() => setActiveTab('sanctuary')}
            className={`px-5 py-2.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'sanctuary'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF]'
            }`}
          >
            The Studio Sanctuary
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`px-5 py-2.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'care'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF]'
            }`}
          >
            Prep & Aftercare Rituals
          </button>
          <button
            onClick={() => setActiveTab('policies')}
            className={`px-5 py-2.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'policies'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF]'
            }`}
          >
            Studio Etiquette & Policies
          </button>
        </div>

        {/* Tab 1: Sanctuary Environment */}
        {activeTab === 'sanctuary' && (
          <div className="pt-10 space-y-12 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 border border-[#1C1917]/10 hover:border-[#C49A70]/60 transition-colors shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#C49A70]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-[#1C1917]">
                  Clinical Sterilization
                </h3>
                <p className="text-xs text-[#7A7267] leading-relaxed">
                  Autoclave tweezer sterilization, medical-grade air filtration, and strict single-use disposables for every guest. We maintain uncompromising ophthalmic hygiene.
                </p>
              </div>

              <div className="bg-white p-8 border border-[#1C1917]/10 hover:border-[#C49A70]/60 transition-colors shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#C49A70]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-[#1C1917]">
                  Solo Sanctuary Stillness
                </h3>
                <p className="text-xs text-[#7A7267] leading-relaxed">
                  An intimate private space free of salon commotion. Ergonomic memory foam suites let you rest undisturbed while your lashes are sculpted.
                </p>
              </div>

              <div className="bg-white p-8 border border-[#1C1917]/10 hover:border-[#C49A70]/60 transition-colors shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#C49A70]">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-[#1C1917]">
                  Architectural Mapping
                </h3>
                <p className="text-xs text-[#7A7267] leading-relaxed">
                  No copy-paste templates. Curl, length, and fan weight are tailored directly to your orbital shape, natural follicle diameter, and facial bone structure.
                </p>
              </div>
            </div>

            {/* Studio Hours & Location Card */}
            <div className="bg-white p-8 sm:p-10 border border-[#1C1917]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xs">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C49A70] block font-semibold">
                  Private Sanctuary Location & Diary Hours
                </span>
                <h3 className="font-editorial text-3xl font-semibold text-[#1C1917]">
                  Ibadan, Oyo State (By Appointment Only)
                </h3>
                <p className="text-xs text-[#7A7267] max-w-lg leading-relaxed">
                  Exact sanctuary address directions are dispatched via WhatsApp following your Paystack deposit confirmation.
                </p>
              </div>

              <div className="space-y-2 border-l border-[#1C1917]/10 pl-6 text-xs text-[#1C1917]">
                {STUDIO_CONFIG.hours.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-6">
                    <span className="font-medium">{h.days}:</span>
                    <span className="font-mono text-[#7A7267]">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Prep & Aftercare */}
        {activeTab === 'care' && (
          <div className="pt-10 space-y-10 animate-fadeIn">
            {/* Section 1: Pre-Appointment */}
            <div className="bg-white p-8 sm:p-10 border border-[#1C1917]/10 shadow-xs space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-[#1C1917]/10">
                <Eye className="w-5 h-5 text-[#C49A70]" />
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] font-semibold">
                  Pre-Appointment Preparation Checklist
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed">
                Proper preparation directly influences adhesive polymerization and retention quality.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#FAF8F5] p-6 border border-[#1C1917]/10 space-y-2">
                  <span className="font-mono text-xs text-[#C49A70] font-semibold block">01 · CLEANSE THOROUGHLY</span>
                  <h4 className="font-editorial text-lg font-semibold text-[#1C1917]">Arrive Squeaky Clean</h4>
                  <p className="text-xs text-[#7A7267] leading-relaxed">
                    Remove all mascara, eyeliner, and oil-based face creams at least 3 hours prior to your session. Residual oils create a barrier that prevents the medical adhesive from locking to your natural hair follicle.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-6 border border-[#1C1917]/10 space-y-2">
                  <span className="font-mono text-xs text-[#C49A70] font-semibold block">02 · AVOID CAFFEINE</span>
                  <h4 className="font-editorial text-lg font-semibold text-[#1C1917]">Skip Coffee 3 Hours Prior</h4>
                  <p className="text-xs text-[#7A7267] leading-relaxed">
                    Please avoid coffee, energy drinks, and high-caffeine beverages before your appointment. Caffeine causes involuntary eyelid fluttering, which interferes with micro-millimeter follicle isolation.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-6 border border-[#1C1917]/10 space-y-2">
                  <span className="font-mono text-xs text-[#C49A70] font-semibold block">03 · CONTACT LENSES</span>
                  <h4 className="font-editorial text-lg font-semibold text-[#1C1917]">Wear Glasses to Studio</h4>
                  <p className="text-xs text-[#7A7267] leading-relaxed">
                    Contact lenses cause corneal dryness during extended closed-eye procedures. Please wear eyeglasses to the studio or bring your contact lens case and solution to remove them before we start.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-6 border border-[#1C1917]/10 space-y-2">
                  <span className="font-mono text-xs text-[#C49A70] font-semibold block">04 · COMFORTABLE ATTIRE</span>
                  <h4 className="font-editorial text-lg font-semibold text-[#1C1917]">Dress in Cozy Layers</h4>
                  <p className="text-xs text-[#7A7267] leading-relaxed">
                    You will be reclined for 90 to 135 minutes in our ergonomic memory foam suite. Wear comfortable clothing so you can relax undisturbed into our calm beauty sanctuary.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Post-Treatment Aftercare */}
            <div className="bg-white p-8 sm:p-10 border border-[#1C1917]/10 shadow-xs space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-[#1C1917]/10">
                <Sparkles className="w-5 h-5 text-[#C49A70]" />
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] font-semibold">
                  Post-Treatment Aftercare (First 48 Hours & Daily Hygiene)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#7A7267] leading-relaxed">
                Adhering to these daily rituals guarantees lightweight, fluffy retention that lasts 3–4 weeks.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-[#FAF8F5] border border-[#1C1917]/5">
                  <Check className="w-4 h-4 text-[#C49A70] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#1C1917] leading-relaxed">
                    <strong>First 24 Hours:</strong> Keep lashes completely dry. Avoid hot steam showers, saunas, heavy workouts, and facial steamers while the adhesive bond cures completely.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#FAF8F5] border border-[#1C1917]/5">
                  <Check className="w-4 h-4 text-[#C49A70] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#1C1917] leading-relaxed">
                    <strong>Daily Foam Cleansing:</strong> Cleanse your lash line every morning using an oil-free foaming lash cleanser. Daily washing removes natural sebum, dust, and blepharitis bacteria, actually improving retention.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#FAF8F5] border border-[#1C1917]/5">
                  <Check className="w-4 h-4 text-[#C49A70] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#1C1917] leading-relaxed">
                    <strong>Gentle Spoolie Combing:</strong> Brush your lashes downward and outward only when completely dry. Never pull, twist, or pick at your extensions.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#FAF8F5] border border-[#1C1917]/5">
                  <Check className="w-4 h-4 text-[#C49A70] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#1C1917] leading-relaxed">
                    <strong>Sleep Position:</strong> Sleep on your back or use a silk/satin pillowcase. Cotton pillowcases create micro-friction that snags handmade volume fans.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Studio Policies */}
        {activeTab === 'policies' && (
          <div className="pt-10 space-y-6 animate-fadeIn">
            <div className="p-6 bg-[#EFE9DF]/60 border border-[#C49A70]/30 text-xs sm:text-sm text-[#7A7267] leading-relaxed mb-6">
              To honor the quiet luxury atmosphere of our private studio sanctuary, preserve the health of your natural eyelashes, and protect each guest's reserved time, all studio appointments are governed by the following policies.
            </div>

            <div className="space-y-6">
              {POLICIES_DATA.map((policy) => (
                <div
                  key={policy.id}
                  className="bg-white p-8 border border-[#1C1917]/10 hover:border-[#C49A70]/50 transition-colors shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#1C1917]/10">
                    <h3 className="font-editorial text-2xl text-[#1C1917] font-semibold">
                      {policy.title}
                    </h3>
                    {policy.severity === 'vital' && (
                      <span className="text-[9px] uppercase font-mono tracking-widest bg-[#1C1917] text-[#FAF8F5] px-2.5 py-1">
                        Vital Policy
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#7A7267] italic">
                    {policy.shortDesc}
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    {policy.fullDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1C1917]/85 leading-relaxed">
                        <span className="text-[#C49A70] font-bold text-base leading-none shrink-0">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Booking CTA */}
        <div className="mt-16 bg-[#1C1917] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-editorial text-2xl sm:text-3xl font-medium">
              Ready to Reserve Your Sanctuary Appointment?
            </h3>
            <p className="text-xs text-[#EFE9DF]/80">
              Select your set, pick your date, and settle your deposit securely via Paystack.
            </p>
          </div>

          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-[#C49A70] hover:bg-white hover:text-[#1C1917] text-white py-3.5 px-8 text-xs uppercase tracking-widest font-semibold transition-all shrink-0"
          >
            <span>Proceed to Booking Desk</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
