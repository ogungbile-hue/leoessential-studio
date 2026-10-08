import React, { useState } from 'react';
import {
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
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { ACADEMY_COURSES } from '../data/academy';
import { STUDIO_CONFIG } from '../data/studio';

export const AcademyPage: React.FC = () => {
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
            { display_name: 'Balance on Day 1', variable_name: 'balance_due', value: `₦${balanceDueNgn.toLocaleString()}` },
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
    <div className="pt-24 sm:pt-32 pb-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl pb-12 border-b border-[#1C1917]/10">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#C49A70]" />
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
              The Academy
            </span>
            <span className="w-6 h-px bg-[#C49A70]" />
            <span className="text-xs uppercase tracking-wider text-[#7A7267]">
              Adedoyin Elegunde Mentorship
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1917] leading-tight">
            Master the Architecture of Lashes
          </h1>

          <p className="text-sm sm:text-base text-[#7A7267] leading-relaxed">
            An uncompromising, hands-on masterclass led directly by Adedoyin Elegunde in our private Ibadan studio. Strictly limited to 2 students per month to guarantee undivided mentor attention.
          </p>
        </div>

        {confirmation ? (
          /* Confirmation Card */
          <div className="mt-10 max-w-3xl mx-auto space-y-6">
            <div className="bg-[#1C1917] text-[#FAF8F5] p-8 border border-[#C49A70]/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 select-none pointer-events-none">
                <Sparkles className="w-40 h-40 text-[#C49A70]" />
              </div>

              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#C49A70] flex items-center justify-center text-white">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-xs uppercase font-mono tracking-[0.2em] text-[#C49A70] font-semibold">
                    Enrollment Deposit Captured via Paystack
                  </span>
                </div>

                <h3 className="font-editorial text-3xl text-white font-medium">
                  Welcome to the Academy, {confirmation.studentName.split(' ')[0]}.
                </h3>
                
                <p className="text-xs sm:text-sm text-[#EFE9DF]/80 leading-relaxed max-w-xl">
                  Your non-refundable seat reservation deposit of <strong className="text-white">₦{confirmation.depositPaidNgn.toLocaleString()}</strong> has been captured. Your intake is secured.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 border border-[#1C1917]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#7A7267] block">
                  Paystack Enrollment Reference Code
                </span>
                <div className="font-mono text-base font-bold text-[#1C1917] tracking-wider select-all">
                  {confirmation.reference}
                </div>
              </div>

              <button
                onClick={() => handleCopyReference(confirmation.reference)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EFE9DF] hover:bg-[#C49A70] hover:text-white text-[#1C1917] text-xs uppercase font-mono tracking-wider transition-colors shrink-0 cursor-pointer"
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

            <div className="bg-white p-6 border border-[#1C1917]/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C1917]/10">
                <span className="font-editorial text-lg font-semibold text-[#1C1917]">
                  Mentorship Course Summary
                </span>
                <span className="text-xs font-mono text-[#7A7267]">
                  Private 1:1 Instruction
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#1C1917]">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                    Enrolled Program
                  </span>
                  <span className="font-medium">{confirmation.courseTitle}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#7A7267] block">
                    Mentorship Location
                  </span>
                  <span className="font-medium">Private Studio Sanctuary, Ibadan, Oyo State, Nigeria</span>
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

            <div className="bg-[#EFE9DF]/80 border border-[#C49A70]/30 p-8 space-y-4 text-center sm:text-left shadow-xs">
              <div className="space-y-1">
                <h4 className="font-editorial text-2xl font-semibold text-[#1C1917]">
                  Finalize Your Calendar Slot on WhatsApp
                </h4>
                <p className="text-xs text-[#7A7267] leading-relaxed">
                  Click the button below to message Adedoyin with your enrollment reference code to finalize your private intake dates and receive your prep workbook.
                </p>
              </div>

              <a
                href={getWhatsAppConfirmationUrl(confirmation)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Send Enrollment Code to Adedoyin on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setConfirmation(null)}
                className="text-xs uppercase font-mono tracking-widest text-[#7A7267] hover:text-[#1C1917] underline cursor-pointer"
              >
                Return to Course Prospectus
              </button>
            </div>
          </div>
        ) : (
          /* Prospectus & Course Details */
          <div className="pt-10 space-y-10">
            {/* Course Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#1C1917]/10 bg-[#EFE9DF]/50 shadow-xs">
              {ACADEMY_COURSES.map((course) => {
                const isSelected = course.id === currentCourse.id;
                return (
                  <button
                    key={course.id}
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      setShowCheckoutForm(false);
                    }}
                    className={`p-6 text-left transition-all border-b sm:border-b-0 sm:border-r border-[#1C1917]/10 last:border-r-0 cursor-pointer ${
                      isSelected
                        ? 'bg-white shadow-sm border-t-4 border-t-[#C49A70]'
                        : 'hover:bg-[#EFE9DF] text-[#7A7267]'
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-widest text-[#C49A70] block font-mono font-semibold">
                      {course.duration}
                    </span>
                    <span className="font-editorial text-lg sm:text-xl font-semibold text-[#1C1917] block line-clamp-1 mt-1">
                      {course.title.split('(')[0]}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#1C1917] block mt-1.5">
                      ₦{course.priceNgn.toLocaleString()} Tuition
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Course Overview Banner */}
            <div className="bg-white p-8 sm:p-10 border border-[#1C1917]/10 space-y-6 shadow-xs">
              <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-[#1C1917]/10">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-[#C49A70] block font-semibold">
                    1:1 Mentorship Curriculum
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl text-[#1C1917] font-semibold mt-1">
                    {currentCourse.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7A7267] italic mt-1">
                    {currentCourse.subtitle}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#C49A70] block font-semibold">
                    ₦{depositNgn.toLocaleString()} Seat Deposit via Paystack
                  </span>
                  <span className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1917]">
                    ₦{currentCourse.priceNgn.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-[#7A7267] block mt-0.5">
                    (Balance of ₦{balanceDueNgn.toLocaleString()} on Day 1)
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#1C1917]/80 leading-relaxed">
                {currentCourse.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#7A7267]">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#C49A70] shrink-0" />
                  <span><strong>Cohort Limit:</strong> {currentCourse.cohortCapacity}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C49A70] shrink-0" />
                  <span><strong>Instruction Hours:</strong> {currentCourse.duration}</span>
                </div>
              </div>
            </div>

            {/* 2-Column: Modules & Student Kit */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Modules */}
              <div className="bg-white p-8 border border-[#1C1917]/10 shadow-xs">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#1C1917]/10">
                  <GraduationCap className="w-5 h-5 text-[#C49A70]" />
                  <h3 className="font-editorial text-2xl text-[#1C1917] font-semibold">
                    Intensive Modules
                  </h3>
                </div>
                <ul className="space-y-4">
                  {currentCourse.syllabus.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1C1917]/80">
                      <span className="font-mono text-xs bg-[#EFE9DF] text-[#7A7267] px-2 py-0.5 font-semibold shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Included Student Toolkit */}
              <div className="bg-[#EFE9DF]/60 p-8 border border-[#C49A70]/30 shadow-xs">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#C49A70]/30">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#C49A70]" />
                    <h3 className="font-editorial text-2xl text-[#1C1917] font-semibold">
                      Included Professional Toolkit
                    </h3>
                  </div>
                  <img
                    src={STUDIO_CONFIG.logoVector}
                    alt="Leoessential Emblem"
                    className="w-6 h-6 object-contain opacity-80"
                  />
                </div>
                <p className="text-xs text-[#7A7267] mb-4 italic">
                  Equipped with the exact surgical Japanese tools and medical formulations used daily by Adedoyin:
                </p>
                <ul className="space-y-3">
                  {currentCourse.kitIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1C1917]/80">
                      <Check className="w-4 h-4 text-[#C49A70] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Paystack Checkout Section */}
            {showCheckoutForm ? (
              <form onSubmit={handlePaystackEnrollment} className="bg-white p-8 sm:p-10 border-2 border-[#C49A70] space-y-6 shadow-md animate-fadeIn">
                <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C49A70] block font-semibold">
                      Paystack Tuition Settlement
                    </span>
                    <h3 className="font-editorial text-2xl font-semibold text-[#1C1917]">
                      Reserve Seat: {currentCourse.title.split('(')[0]}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="text-xs text-[#7A7267] hover:text-[#1C1917] underline cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-[#7A7267] block mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sandra Okon"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-3.5 bg-[#FAF8F5] border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-[#7A7267] block mb-1">
                        Email Address (for Paystack Receipt) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sandra@example.com"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className="w-full p-3.5 bg-[#FAF8F5] border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono uppercase tracking-widest text-[#7A7267] block mb-1">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 812 345 6789"
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        className="w-full p-3.5 bg-[#FAF8F5] border border-[#1C1917]/15 text-sm text-[#1C1917] focus:outline-none focus:border-[#C49A70]"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#EFE9DF]/80 p-5 border border-[#C49A70]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[#7A7267] block">Seat Reservation Deposit (Due Now via Paystack):</span>
                    <span className="font-editorial text-2xl font-bold text-[#1C1917]">
                      ₦{depositNgn.toLocaleString()}
                    </span>
                  </div>
                  <div className="sm:text-right text-[#7A7267]">
                    <span>Remaining Balance:</span>
                    <span className="block font-mono font-medium text-[#1C1917]">
                      ₦{balanceDueNgn.toLocaleString()} on Day 1
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] py-4 px-6 text-xs uppercase tracking-widest font-semibold transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-[#C49A70]" />
                  <span>
                    {isProcessing
                      ? 'Connecting to Paystack Secure Checkout...'
                      : `Pay ₦${depositNgn.toLocaleString()} Seat Deposit via Paystack`}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="bg-[#EFE9DF]/80 border border-[#C49A70]/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C49A70] block font-semibold">
                    Admissions Open · Strictly 2 Students / Month
                  </span>
                  <h3 className="font-editorial text-2xl font-semibold text-[#1C1917]">
                    Reserve Your Seat with a Non-Refundable Deposit
                  </h3>
                  <p className="text-xs text-[#7A7267] max-w-xl">
                    Settle your ₦{depositNgn.toLocaleString()} tuition reservation fee via Paystack. Your private dates will be locked into Adedoyin's masterclass diary.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 shrink-0">
                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="inline-flex items-center gap-2 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] px-6 py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-[#C49A70]" />
                    <span>Reserve Seat via Paystack</span>
                  </button>

                  <a
                    href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello Adedoyin, I would like to inquire about enrolling in the 1:1 "${currentCourse.title}" at Leoessential Academy.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[#1C1917] hover:bg-[#1C1917] hover:text-white text-[#1C1917] px-5 py-3.5 text-xs uppercase tracking-widest font-medium transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
