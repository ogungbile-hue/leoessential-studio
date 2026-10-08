import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Sparkles, Check, ArrowUpRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { STUDIO_CONFIG } from '../data/studio';

export const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'lashes' | 'brows' | 'infills'>('all');
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'lashes')
      return service.category === 'lashes' && !service.title.toLowerCase().includes('infill') && !service.title.toLowerCase().includes('refill') && !service.title.toLowerCase().includes('removal');
    if (activeTab === 'infills')
      return service.title.toLowerCase().includes('infill') || service.title.toLowerCase().includes('refill') || service.title.toLowerCase().includes('removal');
    if (activeTab === 'brows') return service.category === 'brows';
    return true;
  });

  return (
    <div className="pt-24 sm:pt-32 pb-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#1C1917]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
                The Atelier Menu
              </span>
              <span className="w-6 h-px bg-[#C49A70]" />
              <span className="text-xs uppercase tracking-wider text-[#7A7267]">
                Adedoyin Elegunde
              </span>
            </div>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1917] leading-tight">
              Complete Treatment Menu & Pricing
            </h1>
            <p className="text-sm text-[#7A7267] leading-relaxed">
              Every appointment is sculpted with 1:1 medical isolation, featherlight silk fibers, and custom orbital bone mapping. Appointments require a non-refundable booking deposit settled securely via Paystack.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <span className="text-xs uppercase font-mono tracking-widest text-[#7A7267]">
              Currency:
            </span>
            <div className="inline-flex items-center bg-[#EFE9DF] p-1 text-xs font-mono border border-[#C49A70]/20">
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  currency === 'NGN' ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#7A7267] hover:text-[#1C1917]'
                }`}
              >
                NGN (₦)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  currency === 'USD' ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#7A7267] hover:text-[#1C1917]'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-3 py-6 overflow-x-auto text-xs uppercase tracking-widest font-semibold border-b border-[#1C1917]/10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF]'
            }`}
          >
            All Treatments ({SERVICES_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab('lashes')}
            className={`px-4 py-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'lashes'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF]'
            }`}
          >
            Full Lash Sets
          </button>
          <button
            onClick={() => setActiveTab('infills')}
            className={`px-4 py-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'infills'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF]'
            }`}
          >
            Infills & Maintenance
          </button>
          <button
            onClick={() => setActiveTab('brows')}
            className={`px-4 py-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'brows'
                ? 'bg-[#1C1917] text-white shadow-xs'
                : 'text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF]'
            }`}
          >
            Cosmetic Brow Artistry
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white p-8 border border-[#1C1917]/10 hover:border-[#C49A70] transition-all flex flex-col justify-between relative shadow-xs hover:shadow-md"
            >
              {service.isPopular && (
                <span className="absolute top-4 right-4 text-[9px] uppercase font-mono tracking-widest bg-[#C49A70] text-white px-2.5 py-0.5">
                  Most Requested
                </span>
              )}

              <div>
                <div className="flex items-center gap-2 text-xs text-[#7A7267] mb-2 font-mono">
                  {service.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C49A70]" />
                      {service.duration}
                    </span>
                  )}
                  <span className="text-[#C49A70]">·</span>
                  <span className="uppercase tracking-widest text-[10px]">
                    {service.category === 'lashes' ? 'Lashes' : 'Brows'}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl text-[#1C1917] font-semibold group-hover:text-[#C49A70] transition-colors mb-1.5">
                  {service.title}
                </h3>
                
                <p className="text-xs text-[#7A7267] italic mb-4 leading-normal">
                  {service.subtitle}
                </p>

                <p className="text-xs text-[#1C1917]/80 leading-relaxed mb-6">
                  {service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6 border-t border-[#1C1917]/5 pt-4">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#7A7267]">
                        <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-6 border-t border-[#1C1917]/10 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#C49A70] block font-semibold">
                      {currency === 'NGN'
                        ? `₦${(service.depositNgn || 15000).toLocaleString()} Paystack Deposit`
                        : `$${(service.depositUsd || 35)} Deposit`}
                    </span>
                    <span className="font-editorial text-2xl font-bold text-[#1C1917]">
                      {currency === 'NGN'
                        ? `₦${service.priceNgn.toLocaleString()}`
                        : `$${service.priceUsd}`}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-[#7A7267]">
                    Balance on Arrival
                  </span>
                </div>

                <Link
                  to={`/book?service=${service.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] py-3 text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm"
                >
                  <span>Reserve Set via Paystack</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Refill Notice & Care Banner */}
        <div className="mt-16 bg-[#EFE9DF]/80 border border-[#C49A70]/30 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C49A70]" />
              <h3 className="font-editorial text-xl font-semibold text-[#1C1917]">
                Refill & Foreign Work Protocol
              </h3>
            </div>
            <p className="text-xs text-[#7A7267] leading-relaxed">
              All infills require a minimum of 40% retention remaining within 18–21 days. To preserve your natural lash follicle health and maintain uncompromising ocular hygiene, Leoessential does not fill over foreign work from other technicians.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
            <Link
              to="/sanctuary"
              className="text-xs uppercase font-mono tracking-widest text-[#1C1917] hover:text-[#C49A70] underline"
            >
              Read Full Studio Etiquette & Policies
            </Link>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0"
            >
              <span>Go to Booking Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
