import React from "react";
import {
  FiArrowDown,
  FiShield,
  FiTruck,
  FiCheck,
  FiZap,
  FiSun,
  FiSliders,
} from "react-icons/fi";
import { PRODUCT_INFO, toBanglaNumber } from "../data/productData";
import doubleLightImg from "../assets/images/double__flashlight/double_light.webp";
import flashlightImg from "../assets/images/double__flashlight/flashlight.webp";

export const Hero: React.FC = () => {
  const scrollToOrder = () => {
    const element = document.getElementById("order-section");
    if (element) {
      const yOffset = -70;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToBenefits = () => {
    const element = document.getElementById("benefits");
    if (element) {
      const yOffset = -70;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-[30px] pb-16 md:pb-24 overflow-hidden bg-linear-to-b from-zinc-100/70 via-[#FAFAFA] to-[#FAFAFA]">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-137.5 h-137.5 bg-sky-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-87.5 h-87.5 bg-pink-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Copy & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Minimal Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-subtle" />
              <span>প্রিমিয়াম ২-ইন-১ মাল্টিফাংশনাল গ্যাজেট</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-zinc-950 tracking-tight leading-[1.2]">
              যেখানেই প্রয়োজন
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-950 via-zinc-800 to-zinc-600">
                সেখানেই আলো
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed">
              <strong className="text-zinc-900 font-semibold">
                {PRODUCT_INFO.nameBangla}
              </strong>
              । {PRODUCT_INFO.subTagline}
            </p>

            {/* Core Feature Highlights Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full pt-1">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 border border-zinc-200/80 text-xs font-medium text-zinc-800">
                <FiSun className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Long-range Torch</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 border border-zinc-200/80 text-xs font-medium text-zinc-800">
                <FiZap className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Camping/Lantern</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 border border-zinc-200/80 text-xs font-medium text-zinc-800 col-span-2 sm:col-span-1">
                <FiSliders className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dual Button Control</span>
              </div>
            </div>

            {/* CTA Button Group & Price Callout */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={scrollToOrder}
                className="group inline-flex items-center justify-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-base font-bold px-7 py-3.5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <span>অর্ডার করতে নিচে ক্লিক করুন</span>
                <FiArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={scrollToBenefits}
                className="inline-flex items-center justify-center text-sm font-semibold text-zinc-700 hover:text-zinc-950 px-5 py-3.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200/80 transition-colors cursor-pointer"
              >
                বিস্তারিত দেখুন
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-zinc-500 border-t border-zinc-200/70 w-full">
              <div className="flex items-center gap-1.5">
                <FiShield className="w-3.5 h-3.5 text-zinc-700" />
                <span>ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiTruck className="w-3.5 h-3.5 text-zinc-700" />
                <span>সারা বাংলাদেশে ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>১০০% কোয়ালিটি চেকড</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Showcase Composition */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Main Product Showcase Card */}
            <div className="relative w-full max-w-105 rounded-3xl bg-white p-3 sm:p-4 border border-zinc-200 shadow-xl card-hover">
              {/* Product Visual Container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-50 flex items-center justify-center">
                <img
                  src={doubleLightImg}
                  alt="2-in-1 Rechargeable Double Light Torch & Reading Lamp"
                  className="w-full h-full object-contain object-center transform transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Floating Overlay Badge: Price & Savings */}
                <div className="absolute top-3 left-3 bg-zinc-900/95 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-2">
                  <span className="text-xs text-zinc-400 line-through">
                    ৳{toBanglaNumber(PRODUCT_INFO.regularPrice)}
                  </span>
                  <span className="text-sm text-emerald-400 font-extrabold">
                    ৳{toBanglaNumber(PRODUCT_INFO.basePrice)}
                  </span>
                  <span className="text-[10px] bg-emerald-400 text-zinc-950 font-extrabold px-1.5 py-0.5 rounded-md">
                    {toBanglaNumber(PRODUCT_INFO.discountPercentage)}% ছাড়
                  </span>
                </div>

                {/* Floating Overlay Badge: 2-in-1 Dual Function */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-zinc-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md border border-zinc-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>টর্চ + ল্যাম্প</span>
                </div>
              </div>

              {/* Product Micro-Details Card Footer */}
              <div className="mt-3.5 px-2 py-1 flex items-center justify-between">
                <div>
                  <h3 className="font-latin text-sm font-bold text-zinc-900">
                    2-in-1 Torch & Reading Lamp
                  </h3>
                  <p className="text-xs text-zinc-500 font-bangla">
                    ডুয়েল লাইটিং • USB রিচার্জেবল • লিথিয়াম ব্যাটারি
                  </p>
                </div>
                <div className="flex -space-x-1.5 overflow-hidden">
                  <span
                    className="inline-block w-4.5 h-4.5 rounded-full bg-zinc-900 border-2 border-white shadow-xs"
                    title="Classic Black"
                  />
                  <span
                    className="inline-block w-4.5 h-4.5 rounded-full bg-emerald-700 border-2 border-white shadow-xs"
                    title="Emerald Green"
                  />
                </div>
              </div>
            </div>

            {/* Subtle Floating Accessory Pill */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border border-zinc-200 p-3 rounded-2xl shadow-lg items-center gap-3 max-w-52.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-zinc-100">
                <img
                  src={flashlightImg}
                  alt="টর্চ ভিউ"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-zinc-900 leading-tight">
                  Long-range Torch
                </p>
                <p className="text-[10px] text-zinc-500 leading-tight">
                  ফোকাসড ও শক্তিশালী আলো
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
