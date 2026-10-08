import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  Check,
  ArrowUpRight,
  Award,
  MessageCircle,
  Clock,
  Users,
  CreditCard,
  Copy,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ACADEMY_COURSES } from '../../data/academy';
import { STUDIO_CONFIG } from '../../data/studio';
import { AcademyCourse } from '../../types';

interface AcademyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcademyModal: React.FC<AcademyModalProps> = ({ isOpen, onClose }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(ACADEMY_COURSES[0].id);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    courseTitle: string;
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    depositPaidNgn: number;
    tuitionTotalNgn: number;
    balanceDueNgn: number;
  } | null>(null);

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
    setShowCheckoutForm(false);
    setConfirmation(null);
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  const currentCourse =
    ACADEMY_COURSES.find((c) => c.id === selectedCourseId) || ACADEMY_COURSES[0];

  const depositNgn = currentCourse.depositNgn || STUDIO_CONFIG.academyTuitionDepositNgn;
  const balanceDueNgn = currentCourse.priceNgn - depositNgn;

  const handleCopyReference = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const generateReference = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `LEO-ACAD-${timestamp}-${random}`;
  };

  const handlePaystackEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim() || !studentPhone.trim()) {
      alert('Please enter your full name, email, and WhatsApp phone number.');
      return;
    }

    setIsProcessing(true);
    const generatedRef = generateReference();

    if (typeof window.PaystackPop !== 'undefined' && window.PaystackPop.setup) {
      const handler = window.PaystackPop.setup({
        key: STUDIO_CONFIG.paystackTestKey || STUDIO_CONFIG.paystackPublicKey,
        email: studentEmail.trim(),
        amount: depositNgn * 100, // in Kobo
        currency: 'NGN',
        ref: generatedRef,
        metadata: {
          custom_fields: [
            { display_name: 'Student Name', variable_name: 'student_name', value: studentName },
            { display_name: 'Course Title', variable_name: 'course_title', value: currentCourse.title },
            { display_name: 'WhatsApp Phone', variable_name: 'student_phone', value: studentPhone },
            { display_name: 'Balance on First Day', variable_name: 'balance_due', value: `₦${balanceDueNgn.toLocaleString()}` },
          ],
        },
        callback: (response) => {
          setIsProcessing(false);
          setShowCheckoutForm(false);
          setConfirmation({
            reference: response.reference || generatedRef,
            courseTitle: currentCourse.title,
            studentName,
            studentEmail,
            studentPhone,
            depositPaidNgn: depositNgn,
            tuitionTotalNgn: currentCourse.priceNgn,
            balanceDueNgn,
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
        setShowCheckoutForm(false);
        setConfirmation({
          reference: generatedRef,
          courseTitle: currentCourse.title,
          studentName,
          studentEmail,
          studentPhone,
          depositPaidNgn: depositNgn,
          tuitionTotalNgn: currentCourse.priceNgn,
          balanceDueNgn,
        });
      }, 700);
    }
  };

  const getWhatsAppConfirmationUrl = (conf: NonNullable<typeof confirmation>) => {
    const message = [
      `*LEOESSENTIAL ACADEMY SEAT RESERVATION*`,
      `Hello Adedoyin, I have reserved my seat in the Leoessential Academy via Paystack:`,
      ``,
      `• *Student Name:* ${conf.studentName}`,
      `• *Course:* ${conf.courseTitle}`,
      `• *WhatsApp Phone:* ${conf.studentPhone}`,
      `• *Email:* ${conf.studentEmail}`,
      `• *Paystack Ref:* ${conf.reference}`,
      `• *Seat Deposit Paid:* ₦${conf.depositPaidNgn.toLocaleString()} (Captured)`,
      `• *Balance on Day 1:* ₦${conf.balanceDueNgn.toLocaleString()}`,
      ``,
      `Kindly confirm my intake date and send over my onboarding packet. Thank you!`,
    ].join('\n');

    return `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1917]/75 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF8F5] border border-[#C49A70]/30 shadow-2xl flex flex-col z-10 overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[#1C1917]/10 bg-[#FAF8F5]/95 backdrop-blur sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
                Leoessential Academy
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C49A70]" />
              <span className="text-[10px] uppercase tracking-wider text-[#7A7267]">
                1:1 Mentorship Prospectus & Enrollment
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] font-semibold">
              {confirmation ? 'Mentorship Seat Reserved' : 'Master the Architecture of Lashes'}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF] transition-colors focus:outline-none"
            aria-label="Close academy prospectus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {confirmation ? (
            /* =========================================================================
               ACADEMY CONFIRMATION VIEW
            ========================================================================= */
            <div className="space-y-6 animate-fadeIn">
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
                      Enrollment Deposit Captured · Paystack
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl text-white font-medium">
                    Welcome to the Academy, {confirmation.studentName.split(' ')[0]}.
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#EFE9DF]/80 leading-relaxed max-w-xl">
                    Your non-refundable seat reservation deposit of <strong className="text-white">₦{confirmation.depositPaidNgn.toLocaleString()}</strong> has been captured. Your intake is secured.
                  </p>
                </div>
              </div>

              {/* Reference Box */}
              <div className="bg-white p-5 border border-[#1C1917]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#7A7267] block">
                    Paystack Enrollment Reference
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

              {/* Summary Details */}
              <div className="bg-white p-6 border border-[#1C1917]/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1C1917]/10">
                  <span className="font-editorial text-lg font-semibold text-[#1C1917]">
                    Tuition & Mentorship Summary
                  </span>
                  <span className="text-xs font-mono text-[#7A7267]">
                    1:1 Private Mentorship
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#1C1917]">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                      Enrolled Masterclass
                    </span>
                    <span className="font-medium">{confirmation.courseTitle}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                      Mentorship Location
                    </span>
                    <span className="font-medium">
                      Leoessential Private Studio, Lagos, Nigeria
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#1C1917]/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#7A7267]">
                    <span>Full Course Tuition</span>
                    <span className="font-mono">₦{confirmation.tuitionTotalNgn.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#1C1917] font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Seat Deposit Paid via Paystack</span>
                    </span>
                    <span className="font-mono text-emerald-700">
                      -₦{confirmation.depositPaidNgn.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#1C1917]/10 font-bold text-sm text-[#1C1917]">
                    <span>Balance Due on Day 1 of Class</span>
                    <span className="font-mono text-[#C49A70]">
                      ₦{confirmation.balanceDueNgn.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Concierge Button */}
              <div className="bg-[#EFE9DF]/80 border border-[#C49A70]/30 p-6 space-y-4 text-center sm:text-left">
                <div className="space-y-1">
                  <h4 className="font-editorial text-xl font-semibold text-[#1C1917]">
                    Confirm Intake Dates on WhatsApp
                  </h4>
                  <p className="text-xs text-[#7A7267] leading-relaxed">
                    Tap below to message Adedoyin with your enrollment reference code to finalize your private intake dates and receive your prep workbook.
                  </p>
                </div>

                <a
                  href={getWhatsAppConfirmationUrl(confirmation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] py-3.5 px-6 text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Send Enrollment Code to Adedoyin on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            /* =========================================================================
               PROSPECTUS & ENROLLMENT VIEW
            ========================================================================= */
            <>
              {/* Course Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#1C1917]/10 bg-[#EFE9DF]/50">
                {ACADEMY_COURSES.map((course) => {
                  const isSelected = course.id === currentCourse.id;
                  return (
                    <button
                      key={course.id}
                      onClick={() => {
                        setSelectedCourseId(course.id);
                        setShowCheckoutForm(false);
                      }}
                      className={`p-4 text-left transition-all border-b sm:border-b-0 sm:border-r border-[#1C1917]/10 last:border-r-0 ${
                        isSelected
                          ? 'bg-white shadow-sm border-t-2 border-t-[#C49A70]'
                          : 'hover:bg-[#EFE9DF] text-[#7A7267]'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-widest text-[#C49A70] block font-mono">
                        {course.duration}
                      </span>
                      <span className="font-editorial text-sm sm:text-base font-semibold text-[#1C1917] block line-clamp-1">
                        {course.title.split('(')[0]}
                      </span>
                      <span className="text-xs font-mono font-medium text-[#1C1917] block mt-1">
                        ₦{course.priceNgn.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Course Banner */}
              <div className="bg-white p-6 border border-[#1C1917]/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-[#C49A70] block">
                      Curriculum Prospectus
                    </span>
                    <h3 className="font-editorial text-2xl text-[#1C1917] font-semibold">
                      {currentCourse.title}
                    </h3>
                    <p className="text-xs text-[#7A7267] italic mt-0.5">
                      {currentCourse.subtitle}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#C49A70] block font-semibold">
                      ₦{depositNgn.toLocaleString()} Seat Deposit via Paystack
                    </span>
                    <span className="font-editorial text-2xl font-bold text-[#1C1917]">
                      ₦{currentCourse.priceNgn.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-mono text-[#7A7267] block">
                      (Balance of ₦{balanceDueNgn.toLocaleString()} on Day 1)
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#1C1917]/80 leading-relaxed border-t border-[#1C1917]/5 pt-4">
                  {currentCourse.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#7A7267]">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C49A70] shrink-0" />
                    <span><strong>Intake Capacity:</strong> {currentCourse.cohortCapacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C49A70] shrink-0" />
                    <span><strong>Instruction Time:</strong> {currentCourse.duration}</span>
                  </div>
                </div>
              </div>

              {/* Syllabus & Kit */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 border border-[#1C1917]/10">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1C1917]/10">
                    <GraduationCap className="w-4 h-4 text-[#C49A70]" />
                    <h4 className="font-editorial text-lg text-[#1C1917] font-semibold">
                      Intensive Modules
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {currentCourse.syllabus.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1C1917]/80">
                        <span className="font-mono text-[10px] bg-[#EFE9DF] text-[#7A7267] px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#EFE9DF]/60 p-6 border border-[#C49A70]/30">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C49A70]/30">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#C49A70]" />
                      <h4 className="font-editorial text-lg text-[#1C1917] font-semibold">
                        Professional Japanese Kit
                      </h4>
                    </div>
                    <img
                      src={STUDIO_CONFIG.logoVector}
                      alt="Leoessential Insignia"
                      className="w-5 h-5 object-contain opacity-80"
                    />
                  </div>
                  <ul className="space-y-2.5">
                    {currentCourse.kitIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#1C1917]/80">
                        <Check className="w-3.5 h-3.5 text-[#C49A70] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Paystack Checkout Section */}
              {showCheckoutForm ? (
                <form onSubmit={handlePaystackEnrollment} className="bg-white p-6 border-2 border-[#C49A70] space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-3">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#C49A70] block font-semibold">
                        Paystack Tuition Deposit
                      </span>
                      <h4 className="font-editorial text-xl font-semibold text-[#1C1917]">
                        Enroll in {currentCourse.title.split('(')[0]}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCheckoutForm(false)}
                      className="text-xs text-[#7A7267] hover:text-[#1C1917] underline"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-[#7A7267] block mb-1">Student Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sandra Okon"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full p-3 bg-[#FAF8F5] border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-[#7A7267] block mb-1">Email Address (for Paystack Receipt) *</label>
                        <input
                          type="email"
                          required
                          placeholder="sandra@example.com"
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          className="w-full p-3 bg-[#FAF8F5] border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#7A7267] block mb-1">WhatsApp Phone *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+234 812 345 6789"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          className="w-full p-3 bg-[#FAF8F5] border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#EFE9DF]/80 p-4 border border-[#C49A70]/30 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#7A7267] block">Seat Reservation Deposit (Due Now):</span>
                      <span className="font-editorial text-xl font-bold text-[#1C1917]">
                        ₦{depositNgn.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right text-[#7A7267]">
                      <span>Remaining Balance:</span>
                      <span className="block font-mono font-medium text-[#1C1917]">
                        ₦{balanceDueNgn.toLocaleString()} on Day 1
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] py-3.5 px-6 text-xs uppercase tracking-widest font-semibold transition-all shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-[#C49A70]" />
                    <span>
                      {isProcessing
                        ? 'Connecting to Paystack...'
                        : `Pay ₦${depositNgn.toLocaleString()} Seat Deposit via Paystack`}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="bg-[#FAF8F5] border border-[#C49A70]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C49A70] block font-semibold">
                      Limited Monthly Intake
                    </span>
                    <h4 className="font-editorial text-xl font-semibold text-[#1C1917]">
                      Reserve Your 1:1 Academy Seat with a Deposit
                    </h4>
                    <p className="text-xs text-[#7A7267] mt-0.5">
                      Pay the non-refundable seat deposit of ₦{depositNgn.toLocaleString()} via Paystack to lock in your private dates.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowCheckoutForm(true)}
                      className="inline-flex items-center gap-2 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] px-5 py-3 text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-[#C49A70]" />
                      <span>Reserve Seat via Paystack</span>
                    </button>

                    <a
                      href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello Adedoyin, I would like to inquire about enrolling in the 1:1 "${currentCourse.title}" at Leoessential Academy.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-[#1C1917] hover:bg-[#1C1917] hover:text-white text-[#1C1917] px-4 py-3 text-xs uppercase tracking-widest font-medium transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Inquire First</span>
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
