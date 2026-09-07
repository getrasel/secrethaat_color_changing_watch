import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { toBanglaNumber, PRODUCT_INFO } from "../data/productData";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5"
            : "bg-white/80 backdrop-blur-xs py-5"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 text-slate-900 font-bold group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-blue text-white flex items-center justify-center font-latin font-extrabold text-base shadow-sm group-hover:scale-105 transition-transform">
              2in1
            </div>
            <div className="flex flex-col">
              <span className="font-latin text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-tight">
                2-in-1 Torch & Lamp
              </span>
              <span className="text-xs sm:text-sm font-bangla font-medium text-slate-500 leading-none">
                ডাবল লাইট টর্চ ও রিডিং ল্যাম্প
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-base font-medium text-slate-600">
            <button
              type="button"
              onClick={() => scrollToSection("benefits")}
              className="hover:text-[#0068FF] transition-colors cursor-pointer"
            >
              সুবিধাসমূহ
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("gallery")}
              className="hover:text-[#0068FF] transition-colors cursor-pointer"
            >
              গ্যালারি
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("features")}
              className="hover:text-[#0068FF] transition-colors cursor-pointer"
            >
              স্পেসিফিকেশন
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("faq")}
              className="hover:text-[#0068FF] transition-colors cursor-pointer"
            >
              প্রশ্ন-উত্তর
            </button>
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("order-section")}
              className="hidden sm:inline-flex items-center gap-2.5 bg-gradient-blue bg-gradient-blue-hover text-white text-base font-bold px-6 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
            >
              <FiShoppingBag className="w-4 h-4 text-white" />
              <span>অর্ডার করুন</span>
              <span className="text-sm text-blue-100 font-normal border-l border-white/30 pl-2">
                ৳{toBanglaNumber(PRODUCT_INFO.basePrice)}
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-4 text-lg font-medium text-slate-700">
              <button
                type="button"
                onClick={() => scrollToSection("benefits")}
                className="text-left py-1 hover:text-[#0068FF] cursor-pointer"
              >
                সুবিধাসমূহ
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("gallery")}
                className="text-left py-1 hover:text-[#0068FF] cursor-pointer"
              >
                প্রোডাক্ট গ্যালারি
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("features")}
                className="text-left py-1 hover:text-[#0068FF] cursor-pointer"
              >
                স্পেসিফিকেশন ও বিবরণ
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("faq")}
                className="text-left py-1 hover:text-[#0068FF] cursor-pointer"
              >
                প্রশ্ন ও উত্তর (FAQ)
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("order-section")}
                className="mt-3 w-full flex items-center justify-center gap-2.5 bg-gradient-blue text-white font-bold py-3.5 rounded-2xl shadow-md cursor-pointer"
              >
                <FiShoppingBag className="w-5 h-5 text-white" />
                <span>
                  অর্ডার কনফার্ম করুন (৳{toBanglaNumber(PRODUCT_INFO.basePrice)}
                  )
                </span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Sticky Floating CTA Bar (Only visible if on landing page or anywhere relevant) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-5 py-3.5 shadow-[0_-4px_24px_rgba(0,104,255,0.12)] flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 line-through">
              ৳{toBanglaNumber(PRODUCT_INFO.regularPrice)}
            </span>
            <span className="text-xs bg-blue-100 text-[#0068FF] px-2 py-0.5 rounded-md font-bold">
              {toBanglaNumber(PRODUCT_INFO.discountPercentage)}% ছাড়
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-[#0068FF] leading-tight">
              ৳{toBanglaNumber(PRODUCT_INFO.basePrice)}
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              (সাশ্রয় ৳{toBanglaNumber(PRODUCT_INFO.discountAmount)})
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => scrollToSection("order-section")}
          className="flex-1 max-w-52.5 bg-gradient-blue bg-gradient-blue-hover text-white text-base font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-98 cursor-pointer"
        >
          <FiShoppingBag className="w-5 h-5" />
          <span>অর্ডার করুন</span>
        </button>
      </div>
    </>
  );
};

export default Navbar;
