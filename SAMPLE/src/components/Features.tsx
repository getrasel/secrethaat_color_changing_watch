import React from "react";
import {
  FiCheckCircle,
  FiSun,
  FiSliders,
  FiBatteryCharging,
  FiZap,
  FiPackage,
} from "react-icons/fi";

export const Features: React.FC = () => {
  const specs = [
    {
      title: "ব্যবহারের ক্ষেত্র",
      icon: <FiCheckCircle className="w-5 h-5 text-[#0265FF]" />,
      items: ["ঘর ও রিডিং টেবিল", "ক্যাম্পিং ও হাইকিং", "ট্রাভেলিং", "জরুরি লোডশেডিং"],
    },
    {
      title: "লাইটিং মোড",
      icon: <FiSun className="w-5 h-5 text-amber-500" />,
      items: ["লং-রেঞ্জ ফোকাসড টর্চ", "সফট অ্যাম্বিয়েন্ট ল্যাম্প"],
    },
    {
      title: "কন্ট্রোল সিস্টেম",
      icon: <FiSliders className="w-5 h-5 text-indigo-500" />,
      items: ["আলাদা ডুয়েল বাটন সুইচ", "সহজ ও ওয়ান-টাচ অপারেশন"],
    },
    {
      title: "ব্যাটারি ও ব্যাকআপ",
      icon: <FiBatteryCharging className="w-5 h-5 text-emerald-500" />,
      items: ["ইনবিল্ট রিচার্জেবল লিথিয়াম ব্যাটারি", "দীর্ঘস্থায়ী ব্যাকআপ"],
    },
    {
      title: "চার্জিং পদ্ধতি",
      icon: <FiZap className="w-5 h-5 text-sky-500" />,
      items: ["স্ট্যান্ডার্ড USB চার্জিং পোর্ট", "মোবাইল চার্জার / পাওয়ার ব্যাংক সাপোর্টেড"],
    },
    {
      title: "প্যাকেজে যা থাকছে",
      icon: <FiPackage className="w-5 h-5 text-violet-500" />,
      items: [
        <span key="item1">
          <span className="font-number font-bold text-slate-900">১</span> × <span className="font-number font-bold text-slate-900">২-ইন-১</span> রিচার্জেবল ডাবল লাইট
        </span>,
        <span key="item2">
          <span className="font-number font-bold text-slate-900">১</span> × ফাস্ট USB চার্জিং কেবল
        </span>,
      ],
    },
  ];

  return (
    <section id="features" className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs sm:text-sm font-semibold text-[#0265FF] mb-3">
            <span>স্পেসিফিকেশন ও বিবরণ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 sm:mb-3">
            প্রোডাক্টের কারিগরি বৈশিষ্ট্য
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            যেকোনো সিদ্ধান্ত নেওয়ার আগে বিস্তারিত স্পেক্স জেনে নিন।
          </p>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-xs">
                    {spec.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {spec.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {spec.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white border border-slate-200/80 rounded-xl text-slate-700 font-medium text-xs sm:text-sm shadow-2xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
