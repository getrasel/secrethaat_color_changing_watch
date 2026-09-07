import React, { useState, useEffect } from "react";
import {
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiZap,
  FiSun,
  FiBatteryCharging,
  FiArrowRight,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { toBanglaNumber, PRODUCT_INFO } from "../data/productData";
import doubleLightImg from "../assets/images/double__flashlight/double_light.webp";

export const OfferSection: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      targetX = normX * 16;
      targetY = normY * 12;
    };

    const renderLoop = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      setOffset({
        x: currentX,
        y: currentY,
      });

      animId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const whatsappUrl = `https://wa.me/8801746867350?text=${encodeURIComponent(
    "হ্যালো, আমি 2-in-1 Rechargeable Double Light Torch & Reading Lamp সম্পর্কে বিস্তারিত জানতে ও অর্ডার করতে চাই।"
  )}`;

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
    <section className="relative overflow-hidden pt-6 sm:pt-10 pb-12 sm:pb-20 bg-gradient-to-b from-slate-50/80 via-white to-white">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-blue-500/8 via-sky-400/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="container-custom">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Product Info & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Top Minimal Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/70 text-xs sm:text-sm font-semibold text-[#0265FF] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0265FF] animate-pulse" />
              <span>প্রিমিয়াম <span className="font-number font-bold">২-ইন-১</span> রিচার্জেবল ডাবল লাইট</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.25]">
              যেখানেই প্রয়োজন,
              <br />
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0265FF] to-[#0284C7] bg-clip-text text-transparent">
                সেখানেই নিখুঁত আলো
              </span>
            </h1>

            {/* Subtitle / Intro */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              শক্তিশালী ফোকাসড টর্চ এবং চারপাশ ছড়ানো সফট ল্যাম্প—লোডশেডিং, পড়াশোনা, ট্রাভেল কিংবা ক্যাম্পিংয়ে নির্ভরযোগ্য আলোর স্মার্ট সমাধান।
            </p>

            {/* Price Box */}
            <div className="flex items-center justify-center lg:justify-start gap-3.5 pt-1">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0265FF] font-number">
                  ৳{toBanglaNumber(PRODUCT_INFO.basePrice)}
                </span>
                <span className="text-lg sm:text-xl text-slate-400 line-through font-bold font-number">
                  ৳{toBanglaNumber(PRODUCT_INFO.regularPrice)}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-bold font-number">
                {toBanglaNumber(PRODUCT_INFO.discountPercentage)}% ছাড়
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={scrollToOrder}
                className="inline-flex items-center justify-center gap-2.5 bg-[#0265FF] hover:bg-[#0052CC] text-white text-base font-bold py-3.5 px-7 rounded-2xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-98 cursor-pointer group"
              >
                <FiShoppingBag className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                <span>এখনই অর্ডার করুন</span>
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-slate-800 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 text-base font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-xs hover:shadow-md active:scale-98 cursor-pointer"
              >
                <FaWhatsapp className="w-5 h-5 text-emerald-600" />
                <span>হোয়াটসঅ্যাপে মেসেজ</span>
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <FiTruck className="w-4 h-4 text-[#0265FF]" />
                <span>ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiZap className="w-4 h-4 text-[#0265FF]" />
                <span>USB রিচার্জেবল</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiShield className="w-4 h-4 text-[#0265FF]" />
                <span>পণ্য দেখে পেমেন্ট</span>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Product Showcase Card */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div
              style={{
                transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
              }}
              className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-square rounded-3xl bg-gradient-to-b from-white to-slate-50/90 border border-slate-200/80 p-5 sm:p-6 flex items-center justify-center shadow-2xl shadow-blue-500/8 will-change-transform group"
            >
              {/* Top Left Discount Tag */}
              <div className="absolute top-4 left-4 z-20 bg-[#0265FF] text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold font-number shadow-md shadow-blue-500/20">
                {toBanglaNumber(PRODUCT_INFO.discountPercentage)}% বিশেষ ছাড়
              </div>

              {/* Floating Feature Pill Top Right */}
              <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md border border-slate-200/80 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold text-slate-700 shadow-xs flex items-center gap-1">
                <FiBatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
                <span>লিথিয়াম ব্যাটারি</span>
              </div>

              {/* Central Product Image */}
              <div
                style={{
                  transform: `translate3d(${offset.x * 0.3}px, ${offset.y * 0.3}px, 0)`,
                }}
                className="relative z-10 w-full h-full flex items-center justify-center will-change-transform"
              >
                <img
                  src={doubleLightImg}
                  alt={PRODUCT_INFO.name}
                  className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                  draggable={false}
                />
              </div>

              {/* Bottom Floating Feature Pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[90%] bg-white/95 backdrop-blur-md border border-slate-200/90 py-2 px-3.5 rounded-2xl shadow-lg flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <FiSun className="w-4 h-4 text-amber-500" />
                  <span><span className="font-number">২-ইন-১</span> ডুয়েল লাইট</span>
                </div>
                <span className="text-[#0265FF] font-semibold text-[11px]">
                  টর্চ + ল্যাম্প
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OfferSection;
