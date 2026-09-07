import React, { useState, useEffect } from "react";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { PRODUCT_INFO, toBanglaNumber } from "../data/productData";

export const MobileStickyOrderBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOrderSectionInView, setIsOrderSectionInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling down past the top header
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Check if user is currently inside the order checkout form section
    const orderElem = document.getElementById("order-section");
    let observer: IntersectionObserver | null = null;

    if (orderElem && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsOrderSectionInView(entry.isIntersecting);
          });
        },
        {
          rootMargin: "-10% 0px -10% 0px",
          threshold: 0.1,
        }
      );
      observer.observe(orderElem);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observer && orderElem) {
        observer.unobserve(orderElem);
      }
    };
  }, []);

  const scrollToOrder = () => {
    const element = document.getElementById("order-section");
    if (element) {
      const yOffset = -20;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Only render on mobile/tablet viewports (< 768px: md:hidden)
  const shouldShow = isVisible && !isOrderSectionInView;

  return (
    <div
      aria-label="মোবাইল অর্ডার বার"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-out transform ${
        shouldShow
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          {/* Minimal Price Info */}
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-xl sm:text-2xl font-black text-[#0265FF] font-number leading-none">
              ৳{toBanglaNumber(PRODUCT_INFO.basePrice)}
            </span>
            <span className="text-xs text-slate-400 line-through font-number font-medium">
              ৳{toBanglaNumber(PRODUCT_INFO.regularPrice)}
            </span>
          </div>

          {/* Minimal Action Button */}
          <button
            type="button"
            onClick={scrollToOrder}
            className="flex-1 max-w-[190px] bg-[#0265FF] hover:bg-[#0052CC] text-white text-sm sm:text-base font-bold py-2.5 px-4 rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer group"
          >
            <FiShoppingBag className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-y-0.5" />
            <span className="whitespace-nowrap">অর্ডার করুন</span>
            <FiArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyOrderBar;
