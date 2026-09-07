import React from 'react';
import { FiShield, FiTruck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { PRODUCT_INFO } from '../data/productData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = '+8801746867350';
  const whatsappUrl = 'https://wa.me/8801746867350';

  return (
    <footer className="bg-slate-900 text-white pt-14 pb-28 sm:pb-14 border-t border-slate-800">
      <div className="container-custom">

        {/* Top Brand & Value Proposition Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">

          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-blue text-white flex items-center justify-center font-latin font-extrabold text-base shadow-sm">
                2in1
              </div>
              <span className="font-latin text-base sm:text-lg font-bold tracking-tight text-white">
                {PRODUCT_INFO.name}
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed">
              {PRODUCT_INFO.nameBangla}। {PRODUCT_INFO.intro}
            </p>

            {/* WhatsApp Direct Contact Badge (Rich Solid Green) */}
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#16A34A]/20 hover:bg-[#16A34A]/35 border border-[#16A34A]/40 text-[#4ade80] px-4 py-2 rounded-xl text-sm font-bold transition-all"
              >
                <FaWhatsapp className="w-5 h-5 text-[#4ade80]" />
                <span>হোয়াটসঅ্যাপ সাপোর্ট: {whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Value Badges */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="space-y-1.5 p-4 flex flex-col items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700">
              <FiTruck className="w-6 h-6 text-[#38BDF8]" />
              <p className="font-bold text-white text-base">দ্রুত ডেলিভারি</p>
              <p className="text-xs text-slate-400">সারা বাংলাদেশে হোম ডেলিভারি</p>
            </div>
            <div className="space-y-1.5 p-4 flex flex-col items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700">
              <FiShield className="w-6 h-6 text-[#34D399]" />
              <p className="font-bold text-white text-base">ক্যাশ অন ডেলিভারি</p>
              <p className="text-xs text-slate-400">পণ্য দেখে মূল্য পরিশোধ</p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} {PRODUCT_INFO.name}. সর্বস্বত্ব সংরক্ষিত।
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer font-medium"
          >
            উপরে ফিরে যান ↑
          </button>
        </div>

      </div>
    </footer>
  );
};
