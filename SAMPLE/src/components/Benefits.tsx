import React from "react";
import {
  FiLayers,
  FiZap,
  FiSliders,
  FiSun,
  FiBatteryCharging,
  FiHome,
} from "react-icons/fi";
import { PRODUCT_BENEFITS } from "../data/productData";

export const Benefits: React.FC = () => {
  const getBenefitMeta = (iconName: string) => {
    switch (iconName) {
      case "lamp":
        return {
          icon: <FiSun className="w-6 h-6 text-[#0265FF]" />,
          bg: "bg-blue-50 text-[#0265FF] border-blue-100",
          accent: "from-blue-500/20 to-transparent",
        };
      case "multipurpose":
        return {
          icon: <FiLayers className="w-6 h-6 text-[#0284C7]" />,
          bg: "bg-sky-50 text-[#0284C7] border-sky-100",
          accent: "from-sky-500/20 to-transparent",
        };
      case "zap":
        return {
          icon: <FiSliders className="w-6 h-6 text-[#4F46E5]" />,
          bg: "bg-indigo-50 text-[#4F46E5] border-indigo-100",
          accent: "from-indigo-500/20 to-transparent",
        };
      case "sparkles":
        return {
          icon: <FiZap className="w-6 h-6 text-[#D97706]" />,
          bg: "bg-amber-50 text-[#D97706] border-amber-100",
          accent: "from-amber-500/20 to-transparent",
        };
      case "home":
        return {
          icon: <FiHome className="w-6 h-6 text-[#0D9488]" />,
          bg: "bg-teal-50 text-[#0D9488] border-teal-100",
          accent: "from-teal-500/20 to-transparent",
        };
      case "battery":
        return {
          icon: <FiBatteryCharging className="w-6 h-6 text-[#16A34A]" />,
          bg: "bg-emerald-50 text-[#16A34A] border-emerald-100",
          accent: "from-emerald-500/20 to-transparent",
        };
      default:
        return {
          icon: <FiZap className="w-6 h-6 text-[#0265FF]" />,
          bg: "bg-blue-50 text-[#0265FF] border-blue-100",
          accent: "from-blue-500/20 to-transparent",
        };
    }
  };

  return (
    <section id="benefits" className="py-14 sm:py-20 bg-white border-y border-slate-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs sm:text-sm font-semibold text-[#0265FF] mb-3">
            <span>প্রধান বৈশিষ্ট্যসমূহ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            কেন এই <span className="font-number">২-ইন-১</span> লাইট আপনার প্রয়োজন?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            ঘরের জরুরি লোডশেডিং থেকে শুরু করে ক্যাম্পিং ও ভ্রমণ—সব পরিস্থিতিতে নির্ভরযোগ্য সঙ্গী।
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PRODUCT_BENEFITS.map((benefit, index) => {
            const meta = getBenefitMeta(benefit.iconName);
            const banglaStep = ["০১", "০২", "০৩", "০৪", "০৫", "০৬"][index] || "০১";
            return (
              <div
                key={benefit.id}
                className="relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                {/* Subtle top gradient glow on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${meta.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    {/* Squircle Icon Container */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs group-hover:scale-105 transition-transform duration-300 ${meta.bg}`}
                    >
                      {meta.icon}
                    </div>

                    {/* Numeric Step Badge */}
                    <span className="text-xs font-bold text-slate-600 font-number px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/70">
                      {banglaStep}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-snug">
                    {benefit.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
