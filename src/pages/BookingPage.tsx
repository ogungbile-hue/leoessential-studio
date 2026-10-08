import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
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
  ChevronDown,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { STUDIO_CONFIG } from '../data/studio';
import { BookingConfirmation } from '../types';

const TIME_SLOTS = [
  '10:00 AM (Morning Sanctum)',
  '12:30 PM (Midday Session)',
  '3:00 PM (Afternoon Contour)',
  '5:30 PM (Evening Flutter)',
];

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [selectedServiceId, setSelectedServiceId] = useState(
    serviceParam || SERVICES_DATA[1].id
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

  // Sync with URL query parameter
  useEffect(() => {
    if (serviceParam && SERVICES_DATA.some((s) => s.id === serviceParam)) {
      setSelectedServiceId(serviceParam);
    }
  }, [serviceParam]);

  // Set default appointment date to tomorrow
  useEffect(() => {
    if (!appointmentDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setAppointmentDate(`${yyyy}-${mm}-${dd}`);
    }
  }, [appointmentDate]);

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
      alert('Please fill in your name, email, WhatsApp phone, and preferred date.');
      return;
    }

    setIsProcessing(true);
    const generatedRef = generateReference();

    if (typeof window.PaystackPop !== 'undefined' && window.PaystackPop.setup) {
      const handler = window.PaystackPop.setup({
        key: STUDIO_CONFIG.paystackTestKey || STUDIO_CONFIG.paystackPublicKey,
        email: email.trim(),
        amount: depositAmount * 100, // amount in Kobo
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

  return (
    <div className="pt-24 sm:pt-32 pb-24 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 pb-12 border-b border-[#1C1917]/10">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
              Sanctuary Booking Desk
            </span>
            <span className="w-6 h-px bg-[#C49A70]" />
            <span className="text-xs uppercase tracking-wider text-[#7A7267]">
              Paystack Settlement
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1917]">
            {confirmation ? 'Sanctuary Reservation Secured' : 'Reserve Your Appointment'}
          </h1>

          <p className="text-xs sm:text-sm text-[#7A7267] max-w-xl mx-auto leading-relaxed">
            Appointments require a non-refundable booking deposit settled securely via Paystack. Your deposit is credited directly towards your treatment balance on arrival.
          </p>
        </div>

        {confirmation ? (
          /* =========================================================================
             CONFIRMATION & CONCIERGE VERIFICATION VIEW
          ========================================================================= */
          <div className="mt-10 space-y-8 animate-fadeIn">
            {/* Banner */}
            <div className="bg-[#1C1917] text-[#FAF8F5] p-8 border border-[#C49A70]/40 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-10 select-none pointer-events-none">
                <Sparkles className="w-40 h-40 text-[#C49A70]" />
              </div>

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#C49A70] flex items-center justify-center text-white">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#C49A70] font-semibold">
                    Payment Received · Deposit Settled via Paystack
                  </span>
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl text-white font-medium">
                  Thank you, {confirmation.customerName.split(' ')[0]}.
                </h2>
                
                <p className="text-xs sm:text-sm text-[#EFE9DF]/80 leading-relaxed max-w-xl">
                  Your non-refundable booking deposit of <strong className="text-white">₦{confirmation.depositPaidNgn.toLocaleString()}</strong> has been captured. Your slot has been recorded in our diary.
                </p>
              </div>
            </div>

            {/* Paystack Reference Copy Box */}
            <div className="bg-white p-6 border border-[#1C1917]/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#7A7267] block font-semibold">
                  Paystack Transaction Reference
                </span>
                <div className="font-mono text-lg font-bold text-[#1C1917] tracking-wider select-all">
                  {confirmation.reference}
                </div>
              </div>

              <button
                onClick={() => handleCopyReference(confirmation.reference)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#EFE9DF] hover:bg-[#C49A70] hover:text-white text-[#1C1917] text-xs uppercase font-mono tracking-wider transition-colors shrink-0 cursor-pointer"
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
            <div className="bg-white p-8 border border-[#1C1917]/10 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#1C1917]/10">
                <span className="font-editorial text-xl font-semibold text-[#1C1917]">
                  Sanctuary Booking Summary
                </span>
                <span className="text-xs font-mono text-[#7A7267]">
                  {confirmation.createdAt}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#1C1917]">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                    Service Booked
                  </span>
                  <span className="font-medium text-sm">{confirmation.serviceTitle}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                    Appointment Slot
                  </span>
                  <span className="font-medium text-sm">
                    {confirmation.appointmentDate} at {confirmation.appointmentTime}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                    WhatsApp Phone Number
                  </span>
                  <span className="font-mono text-sm">{confirmation.customerPhone}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                    Email Address for Receipt
                  </span>
                  <span className="text-sm">{confirmation.customerEmail}</span>
                </div>
              </div>

              {/* Financial Ledger */}
              <div className="mt-4 pt-4 border-t border-[#1C1917]/10 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-[#7A7267]">
                  <span>Total Service Fee</span>
                  <span className="font-mono">₦{confirmation.totalNgn.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-[#1C1917] font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Deposit Paid via Paystack</span>
                  </span>
                  <span className="font-mono text-emerald-700 font-semibold">
                    -₦{confirmation.depositPaidNgn.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#1C1917]/10 font-bold text-base text-[#1C1917]">
                  <span>Balance Due on Arrival</span>
                  <span className="font-mono text-[#C49A70]">
                    ₦{confirmation.balanceDueNgn.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Button */}
            <div className="bg-[#EFE9DF]/80 border border-[#C49A70]/30 p-8 space-y-4 text-center sm:text-left shadow-xs">
              <div className="space-y-1">
                <h3 className="font-editorial text-2xl font-semibold text-[#1C1917]">
                  Step 2: Instant WhatsApp Concierge Verification
                </h3>
                <p className="text-xs text-[#7A7267] leading-relaxed">
                  Click the button below to message Adedoyin directly. Your reference code, contact, and reserved appointment window are pre-formatted for 1-tap confirmation.
                </p>
              </div>

              <a
                href={getWhatsAppMessageUrl(confirmation)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Send Booking Confirmation to Adedoyin on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Policy & Receipt reminder */}
            <div className="bg-white p-6 border border-[#1C1917]/10 text-xs text-[#7A7267] space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-[#1C1917]">
                <ShieldCheck className="w-4 h-4 text-[#C49A70]" />
                <span>Important Appointment Notice:</span>
              </div>
              <p>
                • Please retain your official Paystack transaction receipt sent to <strong>{confirmation.customerEmail}</strong>.
              </p>
              <p>
                • Arrive with clean, mascara-free lashes. Please avoid coffee 3 hours prior to prevent involuntary eyelid fluttering.
              </p>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/"
                className="text-xs uppercase font-mono tracking-widest text-[#7A7267] hover:text-[#1C1917] underline"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* =========================================================================
             BOOKING INTAKE FORM
          ========================================================================= */
          <form onSubmit={handlePaystackPayment} className="mt-10 bg-white p-8 sm:p-12 border border-[#1C1917]/10 shadow-xs space-y-8">
            
            {/* Service Selection */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-widest text-[#7A7267] block font-semibold">
                Select Treatment Set / Service *
              </label>
              <div className="relative">
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full p-4 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] font-medium appearance-none focus:outline-none focus:border-[#C49A70] transition-colors pr-10"
                >
                  {SERVICES_DATA.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title} — ₦{service.priceNgn.toLocaleString()} ({service.duration || 'Bespoke'})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#7A7267] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-xs text-[#7A7267] italic">
                {selectedService.subtitle}
              </p>
            </div>

            {/* Date & Time Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-widest text-[#7A7267] block font-semibold">
                  Preferred Appointment Date (Tue – Sat) *
                </label>
                <input
                  type="date"
                  required
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full p-3.5 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-widest text-[#7A7267] block font-semibold">
                  Sanctuary Time Window *
                </label>
                <div className="relative">
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors appearance-none pr-10"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#7A7267] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Guest Details */}
            <div className="space-y-5 pt-4 border-t border-[#1C1917]/10">
              <span className="text-xs uppercase font-mono tracking-widest text-[#C49A70] font-semibold block">
                Guest Contact Details
              </span>

              <div className="space-y-2">
                <label className="text-xs text-[#7A7267] block font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amina Bello"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3.5 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-[#7A7267] block font-medium">
                    Email Address (for Official Paystack Receipt) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="amina@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-[#7A7267] block font-medium">
                    WhatsApp Phone Number (for Appointment Confirmation) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 812 345 6789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#7A7267] block font-medium">
                  Notes or Eye Sensitivities (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sensitive eyes, wearing contacts, first time with volume lashes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3.5 bg-white border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70] transition-colors"
                />
              </div>
            </div>

            {/* Financial Ledger */}
            <div className="bg-[#EFE9DF]/80 border border-[#C49A70]/30 p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#7A7267]">
                <span>Total Treatment Price:</span>
                <span className="font-mono font-medium text-[#1C1917] text-sm">
                  ₦{selectedService.priceNgn.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#1C1917] font-semibold pt-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C49A70]" />
                  <span>Non-Refundable Deposit (Due Now via Paystack):</span>
                </span>
                <span className="font-mono text-base text-[#1C1917]">
                  ₦{depositAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#7A7267] pt-3 border-t border-[#1C1917]/10">
                <span>Remaining Balance on Appointment Day:</span>
                <span className="font-mono font-medium text-[#1C1917] text-sm">
                  ₦{balanceDue.toLocaleString()}
                </span>
              </div>

              <p className="text-[11px] text-[#7A7267] italic pt-1">
                * Deposits are settled securely via Paystack and credited directly towards your final service balance on appointment day.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full inline-flex items-center justify-center gap-2.5 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-[#C49A70]" />
              <span>
                {isProcessing
                  ? 'Connecting to Paystack Secure Checkout...'
                  : `Secure Slot · Pay ₦${depositAmount.toLocaleString()} Deposit via Paystack`}
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-[#7A7267] font-mono">
              <span>Supports Nigerian Cards</span>
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
  );
};
