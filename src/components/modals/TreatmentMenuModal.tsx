import React, { useState, useEffect } from 'react';
import { X, Clock, Sparkles, ExternalLink, ArrowUpRight, Check } from 'lucide-react';
import { SERVICES_DATA } from '../../data/services';
import { STUDIO_CONFIG } from '../../data/studio';
import { ServiceItem } from '../../types';

interface TreatmentMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookItem?: (item: ServiceItem) => void;
}

export const TreatmentMenuModal: React.FC<TreatmentMenuModalProps> = ({
  isOpen,
  onClose,
  onBookItem,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'lashes' | 'brows' | 'infills'>('all');
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');

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

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'lashes') return service.category === 'lashes' && !service.title.toLowerCase().includes('infill');
    if (activeTab === 'infills') return service.title.toLowerCase().includes('infill') || service.subtitle.toLowerCase().includes('refill');
    if (activeTab === 'brows') return service.category === 'brows';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1917]/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] rounded-none border border-[#C49A70]/30 shadow-2xl flex flex-col z-10 overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[#1C1917]/10 bg-[#FAF8F5]/90 backdrop-blur sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
                Leoessential Bespoke Studio
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C49A70]" />
              <span className="text-[10px] uppercase tracking-wider text-[#7A7267]">
                Treatment Menu & Pricing
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] font-semibold">
              Complete Treatment Atelier
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="inline-flex items-center bg-[#EFE9DF] p-0.5 text-xs font-mono border border-[#C49A70]/20">
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-2.5 py-1 transition-colors ${
                  currency === 'NGN' ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#7A7267] hover:text-[#1C1917]'
                }`}
              >
                NGN
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 transition-colors ${
                  currency === 'USD' ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#7A7267] hover:text-[#1C1917]'
                }`}
              >
                USD
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF] transition-colors focus:outline-none"
              aria-label="Close treatment menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-[#EFE9DF]/60 border-b border-[#1C1917]/5 overflow-x-auto text-xs uppercase tracking-widest font-medium text-[#7A7267]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-[#1C1917] text-[#FAF8F5]'
                : 'hover:text-[#1C1917] hover:bg-[#EFE9DF]'
            }`}
          >
            All Treatments ({SERVICES_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab('lashes')}
            className={`px-3 py-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'lashes'
                ? 'bg-[#1C1917] text-[#FAF8F5]'
                : 'hover:text-[#1C1917] hover:bg-[#EFE9DF]'
            }`}
          >
            Full Lash Sets
          </button>
          <button
            onClick={() => setActiveTab('infills')}
            className={`px-3 py-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'infills'
                ? 'bg-[#1C1917] text-[#FAF8F5]'
                : 'hover:text-[#1C1917] hover:bg-[#EFE9DF]'
            }`}
          >
            Infill Maintenance
          </button>
          <button
            onClick={() => setActiveTab('brows')}
            className={`px-3 py-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'brows'
                ? 'bg-[#1C1917] text-[#FAF8F5]'
                : 'hover:text-[#1C1917] hover:bg-[#EFE9DF]'
            }`}
          >
            Brow Artistry
          </button>
        </div>

        {/* Scrollable Services List */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white p-6 border border-[#1C1917]/10 hover:border-[#C49A70] transition-all flex flex-col justify-between relative shadow-sm"
              >
                {service.isPopular && (
                  <span className="absolute top-4 right-4 text-[9px] uppercase font-mono tracking-widest bg-[#C49A70] text-white px-2 py-0.5">
                    Signature Choice
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-2 text-xs text-[#7A7267] mb-1">
                    {service.duration && (
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#C49A70]" />
                        {service.duration}
                      </span>
                    )}
                    <span className="text-[#C49A70]">·</span>
                    <span className="uppercase tracking-widest text-[10px]">
                      {service.category === 'lashes' ? 'Lash Architecture' : 'Cosmetic Tattoo'}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl text-[#1C1917] font-semibold group-hover:text-[#C49A70] transition-colors mb-1">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs text-[#7A7267] italic mb-3">
                    {service.subtitle}
                  </p>

                  <p className="text-xs text-[#1C1917]/80 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-1.5 mb-4 border-t border-[#1C1917]/5 pt-3">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-[#7A7267]">
                          <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-[#1C1917]/10 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A7267] block">
                      Investment
                    </span>
                    <span className="font-editorial text-xl font-semibold text-[#1C1917]">
                      {currency === 'NGN'
                        ? `₦${service.priceNgn.toLocaleString()}`
                        : `$${service.priceUsd}`}
                    </span>
                  </div>

                  <a
                    href={STUDIO_CONFIG.squareBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (onBookItem) onBookItem(service);
                    }}
                    className="inline-flex items-center gap-1.5 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] px-4 py-2 text-xs uppercase tracking-widest font-medium transition-colors"
                  >
                    <span>Reserve Slot</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Refill Notice */}
          <div className="bg-[#EFE9DF]/80 border border-[#C49A70]/30 p-5 text-xs text-[#7A7267] leading-relaxed">
            <span className="font-semibold text-[#1C1917] block mb-1">
              Refill & Foreign Work Protocol:
            </span>
            All infills require a minimum of 40% retention remaining within 2 to 3 weeks. To protect the integrity and follicle health of your natural eyelashes, Leoessential adheres to a strict zero foreign fill policy.
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 sm:p-6 bg-[#FAF8F5] border-t border-[#1C1917]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A7267]">
          <span>All appointments require a non-refundable deposit credited toward your final total.</span>
          <a
            href={STUDIO_CONFIG.squareBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1C1917] font-semibold hover:text-[#C49A70] flex items-center gap-1 shrink-0"
          >
            <span>Open Square Booking Calendar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
