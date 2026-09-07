import React from "react";
import { FiShoppingBag, FiTruck, FiShield, FiArrowRight } from "react-icons/fi";

export const FinalCTA: React.FC = () => {
  const scrollToOrder = () => {
    const element = document.getElementById("order-section");
    if (element) {
      const yOffset = -40;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
      <div className="container-custom text-center">
        {/* Modern Sapphire Blue Card */}
        <div className="bg-gradient-to-br from-[#0052CC] via-[#0265FF] to-[#0284C7] text-white rounded-3xl p-8 sm:p-12 md:p-14 shadow-2xl shadow-blue-500/15 space-y-5 sm:space-y-6 relative overflow-hidden">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-white/15 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
            <span>🔥 স্টক সীমিত — আজই অর্ডার করুন</span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug max-w-xl mx-auto">
            প্রয়োজনের সময় আলো খুঁজবেন না,
            <br />
            আলো রাখুন সবসময় হাতের কাছেই
          </h2>

          <p className="text-sm sm:text-base text-blue-50 max-w-lg mx-auto leading-relaxed font-normal">
            লোডশেডিং, পড়াশোনা, ক্যাম্পিং কিংবা জরুরি পরিস্থিতিতে দ্বিধাহীন আলোর অভিজ্ঞতা নিন। <span className="font-number font-bold">২-ইন-১</span> রিচার্জেবল ডাবল লাইট আজই সংগ্রহ করুন।
          </p>

          {/* CTA Button */}
          <div className="pt-2 flex items-center justify-center">
            <button
              type="button"
              onClick={scrollToOrder}
              className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-[#0052CC] text-base font-bold px-7 py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-98 cursor-pointer group"
            >
              <FiShoppingBag className="w-5 h-5 text-[#0052CC] transition-transform group-hover:-translate-y-0.5" />
              <span>এখনই অর্ডার করুন</span>
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Trust Guarantee Badges */}
          <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-100">
            <div className="flex items-center gap-1.5">
              <FiTruck className="w-4 h-4 text-white" />
              <span>সারা দেশে হোম ডেলিভারি</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiShield className="w-4 h-4 text-white" />
              <span>ক্যাশ অন ডেলিভারি (পণ্য দেখে পেমেন্ট)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
