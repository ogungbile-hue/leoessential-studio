import React, { useEffect } from 'react';
import { X, ShieldCheck, AlertCircle, Clock, HeartHandshake, Eye } from 'lucide-react';
import { POLICIES_DATA } from '../../data/policies';
import { STUDIO_CONFIG } from '../../data/studio';

interface PoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PoliciesModal: React.FC<PoliciesModalProps> = ({ isOpen, onClose }) => {
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
                Leoessential Sanctuary
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C49A70]" />
              <span className="text-[10px] uppercase tracking-wider text-[#7A7267]">
                Studio Etiquette & Policies
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] font-semibold">
              Commitment to Excellence
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF] transition-colors focus:outline-none"
            aria-label="Close policies modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Introduction note */}
        <div className="p-6 bg-[#EFE9DF]/60 border-b border-[#1C1917]/10 text-xs sm:text-sm text-[#7A7267] leading-relaxed">
          To protect the tranquil atmosphere of our private studio sanctuary, preserve the ocular health of your natural eyelashes, and honor each client's dedicated appointment window, we ask all guests to review our studio policies prior to reserving.
        </div>

        {/* Scrollable Policies */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {POLICIES_DATA.map((policy) => (
            <div
              key={policy.id}
              className="bg-white p-6 border border-[#1C1917]/10 hover:border-[#C49A70]/50 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-editorial text-xl text-[#1C1917] font-semibold">
                  {policy.title}
                </h3>
                {policy.severity === 'vital' && (
                  <span className="text-[9px] uppercase font-mono tracking-widest bg-[#1C1917] text-[#FAF8F5] px-2 py-0.5">
                    Vital Policy
                  </span>
                )}
              </div>

              <p className="text-xs text-[#7A7267] italic mb-3">
                {policy.shortDesc}
              </p>

              <ul className="space-y-2 border-t border-[#1C1917]/5 pt-3">
                {policy.fullDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1C1917]/80 leading-relaxed">
                    <span className="text-[#C49A70] text-sm leading-none shrink-0">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#FAF8F5] border-t border-[#1C1917]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#7A7267] text-center sm:text-left">
            Have questions regarding allergies, pre-treatment disclosures, or booking questions?
          </div>

          <a
            href={STUDIO_CONFIG.squareBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 shadow-sm"
          >
            <span>Acknowledge & Book via Square</span>
          </a>
        </div>
      </div>
    </div>
  );
};
