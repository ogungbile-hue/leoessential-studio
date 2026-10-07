import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Check, ArrowUpRight, Award, MessageCircle, Clock, Users } from 'lucide-react';
import { ACADEMY_COURSES } from '../../data/academy';
import { STUDIO_CONFIG } from '../../data/studio';

interface AcademyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcademyModal: React.FC<AcademyModalProps> = ({ isOpen, onClose }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(ACADEMY_COURSES[0].id);

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

  const currentCourse = ACADEMY_COURSES.find((c) => c.id === selectedCourseId) || ACADEMY_COURSES[0];

  const getWhatsAppEnrollUrl = (courseTitle: string) => {
    const text = encodeURIComponent(
      `Hello Adedoyin, I would like to inquire about enrolling in the 1:1 "${courseTitle}" at Leoessential Academy.`
    );
    return `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1917]/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] rounded-none border border-[#C49A70]/30 shadow-2xl flex flex-col z-10 overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[#1C1917]/10 bg-[#FAF8F5]/90 backdrop-blur sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C49A70] font-semibold">
                Leoessential Academy
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C49A70]" />
              <span className="text-[10px] uppercase tracking-wider text-[#7A7267]">
                1:1 Private Mentorship Prospectus
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#1C1917] font-semibold">
              Master the Architecture of Lashes
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7A7267] hover:text-[#1C1917] hover:bg-[#EFE9DF] transition-colors focus:outline-none"
            aria-label="Close academy prospectus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Course Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-[#1C1917]/10 bg-[#EFE9DF]/50">
          {ACADEMY_COURSES.map((course) => {
            const isSelected = course.id === currentCourse.id;
            return (
              <button
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
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

        {/* Scrollable Course Details */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Overview Banner */}
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
                <span className="text-[10px] uppercase tracking-wider text-[#7A7267] block">
                  Tuition Investment
                </span>
                <span className="font-editorial text-2xl font-bold text-[#1C1917]">
                  ₦{currentCourse.priceNgn.toLocaleString()}
                </span>
                <span className="text-[11px] font-mono text-[#7A7267] block">
                  (or approx ${currentCourse.priceUsd} USD)
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

          {/* 2-Column: Modules & Student Kit */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Modules */}
            <div className="bg-white p-6 border border-[#1C1917]/10">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1C1917]/10">
                <GraduationCap className="w-4 h-4 text-[#C49A70]" />
                <h4 className="font-editorial text-lg text-[#1C1917] font-semibold">
                  Intensive Syllabus & Modules
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

            {/* Included Toolkit */}
            <div className="bg-[#EFE9DF]/60 p-6 border border-[#C49A70]/30">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C49A70]/30">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C49A70]" />
                  <h4 className="font-editorial text-lg text-[#1C1917] font-semibold">
                    Comprehensive Professional Kit
                  </h4>
                </div>
                <img
                  src={STUDIO_CONFIG.logoVector}
                  alt="Leoessential Insignia"
                  className="w-5 h-5 object-contain opacity-80"
                />
              </div>
              <p className="text-[11px] text-[#7A7267] mb-3 italic">
                Fully equipped with the exact surgical tools used daily by Adedoyin Elegunde:
              </p>
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
        </div>

        {/* Footer Action */}
        <div className="p-6 bg-[#FAF8F5] border-t border-[#1C1917]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#7A7267] text-center sm:text-left">
            <span className="font-semibold text-[#1C1917] block">Admissions by Application Only</span>
            Strictly limited to 2 students per month to guarantee undivided mentor attention.
          </div>

          <a
            href={getWhatsAppEnrollUrl(currentCourse.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1C1917] hover:bg-[#C49A70] text-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors shrink-0 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Apply via WhatsApp Mentorship Desk</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
