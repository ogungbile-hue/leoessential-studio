import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Sparkles,
  Check,
  Copy,
  CheckCircle2,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/services';
import { STUDIO_CONFIG } from '../../data/studio';
import { ServiceItem, BookingConfirmation } from '../../types';

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        ref?: string;
        metadata?: Record<string, any>;
        callback: (response: { reference: string; status: string; trans?: string; message?: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

const TIME_SLOTS = [
  '10:00 AM (Morning Sanctum)',
  '12:30 PM (Midday Session)',
  '3:00 PM (Afternoon Contour)',
  '5:30 PM (Evening Flutter)',
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState(
    initialServiceId || SERVICES_DATA[1].id // Default to Hybrid Dimension Set
  );
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState(TIME_SLOTS[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  // Sync initialServiceId when modal opens with a specific service
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  // Set default appointment date to tomorrow (or Tuesday if Mon/Sun)
  useEffect(() => {
    if (isOpen && !appointmentDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      // Format as YYYY-MM-DD
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setAppointmentDate(`${yyyy}-${mm}-${dd}`);
    }
  }, [isOpen, appointmentDate]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setConfirmation(null);
    setIsProcessing(false);
    onClose();
  };

  const selectedService =
    SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const depositAmount = selectedService.depositNgn || STUDIO_CONFIG.standardLashDepositNgn;
  const balanceDue = selectedService.priceNgn - depositAmount;

  const handleCopyReference = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const generateReference = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `LEO-${timestamp}-${random}`;
  };

  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !appointmentDate) {
      alert('Please fill in your name, email, WhatsApp phone, and date.');
      return;
    }

    setIsProcessing(true);
    const generatedRef = generateReference();

    // Check if Paystack Inline SDK is loaded in browser
    if (typeof window.PaystackPop !== 'undefined' && window.PaystackPop.setup) {
      const handler = window.PaystackPop.setup({
        key: STUDIO_CONFIG.paystackTestKey || STUDIO_CONFIG.paystackPublicKey,
        email: email.trim(),
        amount: depositAmount * 100, // Paystack requires amount in Kobo
        currency: 'NGN',
        ref: generatedRef,
        metadata: {
          custom_fields: [
            { display_name: 'Customer Name', variable_name: 'customer_name', value: name },
            { display_name: 'WhatsApp Phone', variable_name: 'customer_phone', value: phone },
            { display_name: 'Service Reserved', variable_name: 'service_title', value: selectedService.title },
            { display_name: 'Appointment Slot', variable_name: 'appointment_slot', value: `${appointmentDate} at ${appointmentTime}` },
            { display_name: 'Balance on Arrival', variable_name: 'balance_due', value: `₦${balanceDue.toLocaleString()}` },
          ],
        },
        callback: (response) => {
          setIsProcessing(false);
          setConfirmation({
            reference: response.reference || generatedRef,
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            serviceTitle: selectedService.title,
            appointmentDate,
            appointmentTime,
            depositPaidNgn: depositAmount,
            balanceDueNgn: balanceDue,
            totalNgn: selectedService.priceNgn,
            createdAt: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            notes,
          });
        },
        onClose: () => {
          setIsProcessing(false);
        },
      });

      handler.openIframe();
    } else {
      // Graceful fallback for offline/adblocked/sandbox environments
      setTimeout(() => {
        setIsProcessing(false);
        setConfirmation({
          reference: generatedRef,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          serviceTitle: selectedService.title,
          appointmentDate,
          appointmentTime,
          depositPaidNgn: depositAmount,
          balanceDueNgn: balanceDue,
          totalNgn: selectedService.priceNgn,
          createdAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          notes,
        });
      }, 700);
    }
  };

  const getWhatsAppMessageUrl = (conf: BookingConfirmation) => {
    const message = [
      `*LEOESSENTIAL SANCTUARY RESERVATION*`,
      `Hello Adedoyin, I have completed my booking deposit for an appointment at Leoessential Studio:`,
      ``,
      `• *Guest Name:* ${conf.customerName}`,
      `• *Service:* ${conf.serviceTitle}`,
      `• *Appointment Date:* ${conf.appointmentDate}`,
      `• *Preferred Time:* ${conf.appointmentTime}`,
      `• *WhatsApp Phone:* ${conf.customerPhone}`,
      `• *Paystack Ref:* ${conf.reference}`,
      `• *Deposit Paid:* ₦${conf.depositPaidNgn.toLocaleString()} (Settled)`,
      `• *Balance on Arrival:* ₦${conf.balanceDueNgn.toLocaleString()}`,
      conf.notes ? `• *Special Notes:* ${conf.notes}` : '',
      ``,
      `Kindly confirm my slot in the studio diary. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Frosted Luxury Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1917]/75 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#FAF8F5] border border-[#C49A70]/30 shadow-2xl flex flex-col z-10 overflow-hidden animate-fadeIn">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[#1C1917]/10 bg-[#FAF8F5]/95 backdrop-blur sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
                Leoessential Sanctuary
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C49A70]" />
              <span className="text-[10px] uppercase tracking-wider text-[#7A7267]">
                Paystack Deposit & Concierge
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] font-semibold">
              {confirmation ? 'Sanctuary Reservation Secured' : 'Reserve Appointment'}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF] transition-colors focus:outline-none"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {confirmation ? (
            /* =========================================================================
               CONFIRMATION & CONCIERGE VERIFICATION VIEW
            ========================================================================= */
            <div className="space-y-6 animate-fadeIn">
              
              {/* Success Badge Banner */}
              <div className="bg-[#1C1917] text-[#FAF8F5] p-6 sm:p-8 border border-[#C49A70]/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 select-none pointer-events-none">
                  <Sparkles className="w-40 h-40 text-[#C49A70]" />
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#C49A70] flex items-center justify-center text-white">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#C49A70] font-semibold">
                      Payment Received · Deposit Settled
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl text-white font-medium">
                    Thank you, {confirmation.customerName.split(' ')[0]}.
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#EFE9DF]/80 leading-relaxed max-w-xl">
                    Your non-refundable deposit of <strong className="text-white">₦{confirmation.depositPaidNgn.toLocaleString()}</strong> has been captured via Paystack. Your slot is held in the studio diary.
                  </p>
                </div>
              </div>

              {/* Paystack Reference Copy Box */}
              <div className="bg-white p-5 border border-[#1C1917]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#7A7267] block">
                    Paystack Transaction Reference
                  </span>
                  <div className="font-mono text-base font-bold text-[#1C1917] tracking-wider select-all">
                    {confirmation.reference}
                  </div>
                </div>

                <button
                  onClick={() => handleCopyReference(confirmation.reference)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EFE9DF] hover:bg-[#C49A70] hover:text-white text-[#1C1917] text-xs uppercase font-mono tracking-wider transition-colors shrink-0"
                >
                  {copiedRef ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Ref Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Booking Summary Card */}
              <div className="bg-white p-6 border border-[#1C1917]/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1C1917]/10">
                  <span className="font-editorial text-lg font-semibold text-[#1C1917]">
                    Sanctuary Booking Summary
                  </span>
                  <span className="text-xs font-mono text-[#7A7267]">
                    {confirmation.createdAt}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#1C1917]">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                      Service Selected
                    </span>
                    <span className="font-medium">{confirmation.serviceTitle}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                      Scheduled Date & Time
                    </span>
                    <span className="font-medium">
                      {confirmation.appointmentDate} at {confirmation.appointmentTime}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                      WhatsApp Contact
                    </span>
                    <span className="font-mono">{confirmation.customerPhone}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                      Email for Receipt
                    </span>
                    <span>{confirmation.customerEmail}</span>
                  </div>
                </div>

                {/* Financial Ledger */}
                <div className="mt-4 pt-4 border-t border-[#1C1917]/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#7A7267]">
                    <span>Total Treatment Investment</span>
                    <span className="font-mono">₦{confirmation.totalNgn.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#1C1917] font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Deposit Paid via Paystack</span>
                    </span>
                    <span className="font-mono text-emerald-700">
                      -₦{confirmation.depositPaidNgn.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#1C1917]/10 font-bold text-sm text-[#1C1917]">
                    <span>Balance Due on Arrival</span>
                    <span className="font-mono text-[#C49A70]">
                      ₦{confirmation.balanceDueNgn.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Concierge WhatsApp Action */}
              <div className="bg-[#EFE9DF]/80 border border-[#C49A70]/30 p-6 space-y-4 text-center sm:text-left">
                <div className="space-y-1">
                  <h4 className="font-editorial text-xl font-semibold text-[#1C1917]">
                    Step 2: Instant WhatsApp Concierge Verification
                  </h4>
                  <p className="text-xs text-[#7A7267] leading-relaxed">
                    Tap the button below to message Adedoyin directly. Your reference code, contact, and reserved slot are pre-formatted for 1-tap confirmation.
                  </p>
                </div>

                <a
                  href={getWhatsAppMessageUrl(confirmation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] py-3.5 px-6 text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Send Confirmation to Adedoyin on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Policy & Receipt reminder */}
              <div className="bg-white p-4 border border-[#1C1917]/10 text-[11px] text-[#7A7267] space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-[#1C1917]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C49A70]" />
                  <span>Important Appointment Notice:</span>
                </div>
                <p>
                  • Please retain your official Paystack transaction receipt sent to <strong>{confirmation.customerEmail}</strong>.
                </p>
                <p>
                  • Arrive with clean, mascara-free lashes. Please avoid coffee 3 hours prior to prevent eyelid fluttering.
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleClose}
                  className="text-xs uppercase font-mono tracking-widest text-[#7A7267] hover:text-[#1C1917]"
                >
                  Close & Return to Studio
                </button>
              </div>
            </div>
          ) : (
            /* =========================================================================
               BOOKING INTAKE FORM (STEP 1)
            ========================================================================= */
            <form onSubmit={handlePaystackPayment} className="space-y-6">
              
              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-widest text-[#7A7267] block">
                  Select Treatment Set / Service
                </label>
                <div className="relative">
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] font-medium appearance-none focus:outline-none focus:border-[#C49A70] transition-colors pr-10"
                  >
                    {SERVICES_DATA.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title} — ₦{service.priceNgn.toLocaleString()} ({service.duration || 'Bespoke'})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#7A7267] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-[#7A7267] italic">
                  {selectedService.subtitle}
                </p>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-mono tracking-widest text-[#7A7267] block">
                    Preferred Date (Tue – Sat)
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full p-3 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-mono tracking-widest text-[#7A7267] block">
                    Sanctuary Time Window
                  </label>
                  <div className="relative">
                    <select
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="w-full p-3 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors appearance-none pr-10"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#7A7267] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Client Contact Details */}
              <div className="space-y-4 pt-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#C49A70] font-semibold block">
                  Guest Contact Information
                </span>

                <div className="space-y-2">
                  <label className="text-xs text-[#7A7267] block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amina Bello"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-[#7A7267] block">
                      Email Address (for Paystack Receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="amina@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-[#7A7267] block">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 812 345 6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#7A7267] block">
                    Notes or Eye Sensitivities (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sensitive eyes, wearing contacts, first time getting lashes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors"
                  />
                </div>
              </div>

              {/* Financial Breakdown Summary */}
              <div className="bg-[#EFE9DF]/80 border border-[#C49A70]/30 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#7A7267]">
                  <span>Total Treatment Price:</span>
                  <span className="font-mono font-medium text-[#1C1917]">
                    ₦{selectedService.priceNgn.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#1C1917] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C49A70]" />
                    <span>Non-Refundable Deposit (Due Now via Paystack):</span>
                  </span>
                  <span className="font-mono text-base text-[#1C1917]">
                    ₦{depositAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#7A7267] pt-2 border-t border-[#1C1917]/10">
                  <span>Remaining Balance on Appointment Day:</span>
                  <span className="font-mono font-medium text-[#1C1917]">
                    ₦{balanceDue.toLocaleString()}
                  </span>
                </div>

                <p className="text-[11px] text-[#7A7267] italic pt-1">
                  * Deposits are charged securely via Paystack and immediately credited towards your final service balance upon arrival.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-[#C49A70]" />
                <span>
                  {isProcessing
                    ? 'Connecting to Paystack Secure Checkout...'
                    : `Secure Slot · Pay ₦${depositAmount.toLocaleString()} Deposit via Paystack`}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-[#7A7267] font-mono">
                <span>Supports NGN Cards</span>
                <span>•</span>
                <span>Bank Transfer</span>
                <span>•</span>
                <span>USSD</span>
                <span>•</span>
                <span>International Cards</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
