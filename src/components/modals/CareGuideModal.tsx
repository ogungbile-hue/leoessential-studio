import React, { useEffect } from 'react';
import { X, Sparkles, Check, HeartHandshake, Eye, AlertCircle } from 'lucide-react';
import { STUDIO_CONFIG } from '../../data/studio';

interface CareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareGuideModal: React.FC<CareGuideModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1917]/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#FAF8F5] rounded-none border border-[#C49A70]/30 shadow-2xl flex flex-col z-10 overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[#1C1917]/10 bg-[#FAF8F5]/90 backdrop-blur sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
                Leoessential Guide
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C49A70]" />
              <span className="text-[10px] uppercase tracking-wider text-[#7A7267]">
                Preparation & Aftercare Rituals
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] font-semibold">
              Preserving Follicle Longevity
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF] transition-colors focus:outline-none"
            aria-label="Close care guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Section 1: Pre-Appointment */}
          <div className="bg-white p-6 border border-[#1C1917]/10">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1C1917]/10">
              <Eye className="w-4 h-4 text-[#C49A70]" />
              <h3 className="font-editorial text-xl text-[#1C1917] font-semibold">
                Pre-Appointment Preparation Ritual
              </h3>
            </div>
            <p className="text-xs text-[#7A7267] mb-4">
              Proper preparation directly influences adhesive polymerization and retention quality.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs text-[#1C1917]/80">
                <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                <span><strong>Arrive Squeaky Clean:</strong> Remove all mascara, eyeliner, and oil-based serums at least 3 hours before your appointment. Residual oil creates a barrier between your natural lash and the medical adhesive.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[#1C1917]/80">
                <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                <span><strong>Avoid Caffeine Prior to Session:</strong> Please skip coffee or high-caffeine energy beverages 3 hours prior to your session to prevent involuntary eyelid fluttering.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[#1C1917]/80">
                <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                <span><strong>Contact Lenses:</strong> Contact lenses dry out the cornea during extended closed-eye sessions. Please wear glasses to the studio or bring your lens case.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[#1C1917]/80">
                <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                <span><strong>Comfortable Attire:</strong> You will be reclined for 90 to 135 minutes in our ergonomic suite. We recommend loose, comfortable clothing.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: Post-Appointment Aftercare */}
          <div className="bg-white p-6 border border-[#1C1917]/10">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1C1917]/10">
              <Sparkles className="w-4 h-4 text-[#C49A70]" />
              <h3 className="font-editorial text-xl text-[#1C1917] font-semibold">
                Post-Treatment Aftercare (First 48 Hours & Ongoing)
              </h3>
            </div>
            <p className="text-xs text-[#7A7267] mb-4">
              Honoring these simple daily habits guarantees lightweight, fluffy retention that lasts 3–4 weeks.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs text-[#1C1917]/80">
                <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                <span><strong>First 24 Hours:</strong> Keep lashes completely dry and avoid steam rooms, heavy sweating, hot showers, and saunas while the adhesive bond cures completely.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[#1C1917]/80">
                <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                <span><strong>Cleanse Daily with Oil-Free Foam:</strong> Wash lashes every morning using a dedicated, pH-balanced lash bath foam to remove natural sebum, dust, and blepharitis bacteria.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[#1C1917]/80">
                <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                <span><strong>Gentle Spoolie Combing:</strong> Brush your lashes downward and outward only when dry. Never pull, twist, or pick at extensions.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[#1C1917]/80">
                <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                <span><strong>Sleep on Your Back or Silk Pillowcase:</strong> Avoid friction from cotton pillowcases which can snag delicate volume fans.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#FAF8F5] border-t border-[#1C1917]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#7A7267] text-center sm:text-left">
            Need an emergency touch-up or gentle professional removal?
          </div>

          <a
            href={STUDIO_CONFIG.squareBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 shadow-sm"
          >
            <span>Book Appointment via Square</span>
          </a>
        </div>
      </div>
    </div>
  );
};
