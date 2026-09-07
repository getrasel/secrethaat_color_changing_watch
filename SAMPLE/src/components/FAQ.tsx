import React, { useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { FAQ_ITEMS } from "../data/productData";

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-white border-t border-slate-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs sm:text-sm font-semibold text-[#0265FF] mb-3">
            <FiHelpCircle className="w-3.5 h-3.5" />
            <span>প্রশ্ন ও উত্তর</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 sm:mb-3">
            সচরাচর জিজ্ঞাসিত প্রশ্নাবলী
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            পণ্য ও ডেলিভারি সংক্রান্ত যেকোনো সাধারণ প্রশ্নের দ্রুত উত্তর জেনে নিন।
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-slate-50/80 border-blue-200/80 shadow-xs"
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 bg-[#0265FF] text-white border-[#0265FF]"
                        : "bg-slate-50 text-slate-500 border-slate-200"
                    }`}
                  >
                    <FiChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
