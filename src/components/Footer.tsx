import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Phone, Mail } from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studio';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={STUDIO_CONFIG.logoVector}
                alt="Leoessential Insignia"
                className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
              />
              <span className="font-editorial text-2xl font-semibold tracking-[0.25em]">
                LEOESSENTIAL
              </span>
            </Link>
            <p className="text-xs text-[#EFE9DF]/70 max-w-sm leading-relaxed">
              Founded and artistically directed by Adedoyin Elegunde. Bespoke lash architecture, semi-permanent brow artistry, and accredited 1:1 professional masterclasses in Lagos.
            </p>
            <div className="text-[11px] font-mono text-[#C49A70]">
              Enhancing your natural beauty through intentional detail.
            </div>
          </div>

          {/* Navigation Pages */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C49A70] block font-semibold">
              Explore The Studio
            </span>
            <ul className="space-y-2 text-xs text-[#EFE9DF]/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home Editorial
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Complete Treatment Menu & Pricing
                </Link>
              </li>
              <li>
                <Link to="/academy" className="hover:text-white transition-colors">
                  The Academy (1:1 Mentorship Prospectus)
                </Link>
              </li>
              <li>
                <Link to="/sanctuary" className="hover:text-white transition-colors">
                  Sanctuary, Care Guides & Policies
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-white transition-colors text-[#C49A70] font-semibold">
                  Reserve Appointment with Paystack
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C49A70] block font-semibold">
              Connect Directly
            </span>
            <ul className="space-y-2 text-xs text-[#EFE9DF]/80">
              <li>
                <a
                  href={STUDIO_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#C49A70] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#C49A70]" />
                  <span>Instagram {STUDIO_CONFIG.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#C49A70] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Concierge Desk</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${STUDIO_CONFIG.phoneIntl}`}
                  className="flex items-center gap-2 hover:text-[#C49A70] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C49A70]" />
                  <span>{STUDIO_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STUDIO_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-[#C49A70] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C49A70]" />
                  <span>{STUDIO_CONFIG.email}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EFE9DF]/60">
          <span>© {new Date().getFullYear()} Leoessential Studio & Academy. All Rights Reserved.</span>
          <span className="font-mono text-[11px]">Private Sanctuary · Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
};
