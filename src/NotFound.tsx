import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuHouse, LuSearchX } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa6';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'পৃষ্ঠাটি পাওয়া যায়নি (404) | Astronaut Lamp & Alarm Clock';
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between text-[#0F172A] selection:bg-[#0284C7] selection:text-white relative font-bn bg-[#F8FAFC]">

      {/* 404 Main Section */}
      <main className="flex-1 py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
        {/* Soft Ambient Background Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        <div className="w-full max-w-lg text-center relative z-10 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl shadow-sky-500/5 backdrop-blur-sm">
            {/* Search Icon Badge */}
            <div className="w-20 h-20 rounded-2xl bg-sky-50 text-[#0284C7] mx-auto flex items-center justify-center mb-6 border border-sky-100 shadow-inner">
              <LuSearchX className="w-10 h-10" />
            </div>

            {/* 404 Code */}
            <span className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#2563EB] font-en block mb-2 tracking-tight">
              404
            </span>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-3">
              পৃষ্ঠাটি পাওয়া যায়নি
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#475569] mb-8 leading-relaxed font-normal">
              আপনি যে পেজটি খুঁজছেন তা হয়তো সরানো হয়েছে বা লিংকটি ভুল। অনুগ্রহ করে মূল পাতায় ফিরে যান।
            </p>

            {/* Back to Home CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white font-extrabold py-3.5 px-8 rounded-2xl shadow-md hover:shadow-xl hover:shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-base"
              >
                <LuHouse className="w-5 h-5" />
                <span>হোমপেজে ফিরে যান</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/8801746867350?text=Hello%2C%20I%20want%20to%20know%20about%20Astronaut%20Reading%20Lamp"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer group"
        aria-label="হোয়াটসঅ্যাপে যোগাযোগ করুন"
      >
        <FaWhatsapp className="text-2xl sm:text-3xl group-hover:rotate-12 transition-transform duration-300" />
      </a>

    </div>
  );
}
