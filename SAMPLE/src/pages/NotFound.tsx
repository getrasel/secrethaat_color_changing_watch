import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiAlertCircle } from "react-icons/fi";

export const NotFound: React.FC = () => {
  return (
    <div className="py-20 md:py-28 bg-slate-50 min-h-[75vh] flex items-center justify-center">
      <div className="container-custom max-w-lg text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl shadow-blue-500/5">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 text-[#0068FF] mx-auto flex items-center justify-center mb-6">
            <FiAlertCircle className="w-10 h-10" />
          </div>

          <span className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#0068FF] to-blue-400 font-latin block mb-2">
            404
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            পৃষ্ঠাটি পাওয়া যায়নি
          </h1>

          <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
            আপনি যে পেজটি খুঁজছেন তা হয়তো সরানো হয়েছে বা লিংকটি ভুল। অনুগ্রহ করে
            মূল পাতায় ফিরে যান।
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-blue bg-gradient-blue-hover text-white font-bold py-3.5 px-8 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-98"
          >
            <FiHome className="w-5 h-5" />
            <span>হোমপেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
