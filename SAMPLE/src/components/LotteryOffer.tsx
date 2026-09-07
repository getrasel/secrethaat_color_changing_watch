import React from 'react';
import { FiShoppingBag, FiCheckCircle, FiGift, FiStar } from 'react-icons/fi';
import { RiMotorbikeFill } from 'react-icons/ri';
import shapeSpiral from '../assets/images/shape/1.png';
import shapeSparkle from '../assets/images/shape/2.png';

export const LotteryOffer: React.FC = () => {
  const scrollToOrder = () => {
    const element = document.getElementById('order-section');
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="lottery-offer" className="relative overflow-hidden py-10 sm:py-20 md:py-24 bg-white border-t border-slate-100">
      
      {/* Decorative Background Shapes */}
      <div className="hidden sm:block absolute -top-10 -left-12 w-64 sm:w-80 h-64 sm:h-80 pointer-events-none opacity-50 z-0">
        <img
          src={shapeSpiral}
          alt=""
          className="w-full h-full object-contain animate-[spin_120s_linear_infinite]"
        />
      </div>

      <div className="absolute top-10 right-10 sm:right-24 w-12 sm:w-16 h-12 sm:h-16 pointer-events-none opacity-85 z-0">
        <img src={shapeSparkle} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="container-custom relative z-10">
        
        {/* Main Showcase Banner Card with Sapphire-Cyan Accent */}
        <div 
          style={{ background: 'linear-gradient(135deg, #eef5ff 0%, #e2eeff 50%, #d8e9ff 100%)' }}
          className="relative rounded-2xl sm:rounded-[32px] p-4 sm:p-10 md:p-12 border border-blue-200/80 shadow-md overflow-hidden"
        >

          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-[#0068FF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-[#06B6D4]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-5 text-center lg:text-left">
              
              {/* Top Tag */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white border border-blue-200 text-xs sm:text-sm font-bold text-[#0068FF] shadow-2xs">
                <FiGift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0068FF]" />
                <span>বিশেষ মেগা ক্যাম্পেইন ও মেগা অফার</span>
              </div>

              {/* Main Heading (Prominent & Clean 2 Lines) */}
              <h2 className="text-[21px] sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.25]">
                <span className="inline-block">অর্ডার করলেই পাচ্ছেন ফ্রি লটারি,</span><br />
                <span className="inline-block bg-[linear-gradient(90deg,#0A58CA_0%,#0068FF_35%,#0284C7_70%,#06B6D4_100%)] bg-clip-text text-transparent">
                  জিতে নিন স্বপ্নের আকর্ষণীয় বাইক!
                </span>
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-base lg:text-lg text-slate-700 leading-normal sm:leading-relaxed font-medium">
                2-in-1 Rechargeable Double Light Torch & Reading Lamp অর্ডার করলেই প্রতিটি অর্ডারের সাথে নিশ্চিতভাবে পেয়ে যাবেন ১টি ইউনিক মেগা লটারি কুপন। লাকি ড্র-এর মাধ্যমে বিজয়ী পাবেন আকর্ষণীয় নতুন বাইক!
              </p>

              {/* 3 Step Simple Process */}
              <div className="pt-1 sm:pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 text-left">
                
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-blue-100 shadow-2xs">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-[#0068FF] font-extrabold text-xs flex items-center justify-center mb-1.5 sm:mb-2">
                    ১
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5 sm:mb-1">অর্ডার সম্পন্ন করুন</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600">পছন্দের কালার সিলেক্ট করে অর্ডার কনফার্ম করুন</p>
                </div>

                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-blue-100 shadow-2xs">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-50 text-[#0284C7] font-extrabold text-xs flex items-center justify-center mb-1.5 sm:mb-2">
                    ২
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5 sm:mb-1">লটারি কুপন পান</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600">অর্ডারের সাথে নিশ্চিত ডিজিটাল কুপন নম্বর বুঝে নিন</p>
                </div>

                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-blue-100 shadow-2xs">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-50 text-amber-600 font-extrabold text-xs flex items-center justify-center mb-1.5 sm:mb-2">
                    ৩
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5 sm:mb-1">বাইক বিজয়ী হোন</h4>
                  <p className="text-[11px] sm:text-xs text-slate-600">মেগা লাকি ড্র-তে জিতে নিন আপনার স্বপ্নের বাইক</p>
                </div>

              </div>

              {/* CTA Button */}
              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={scrollToOrder}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-blue bg-gradient-blue-hover text-white text-xs sm:text-base font-bold py-3 px-5 sm:py-3.5 sm:px-8 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                >
                  <FiShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
                  <span>এখনই অর্ডার করে কুপন বুঝে নিন</span>
                </button>
              </div>

            </div>

            {/* Right Column: Ticket / Prize Showcase Card */}
            <div className="lg:col-span-5 flex justify-center items-center">
              
              {/* Professional Lottery Ticket Card */}
              <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 border border-blue-200/90 shadow-xl relative overflow-hidden text-center space-y-4">
                
                {/* Ribbon Tag */}
                <div className="inline-flex items-center gap-1.5 bg-gradient-blue text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-sm">
                  <FiStar className="w-3.5 h-3.5 fill-white text-white" />
                  <span>গ্র্যান্ড প্রাইজ — মেগা লাকি ড্র</span>
                </div>

                {/* Bike Icon Showcase Circle */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-tr from-[#0068FF] to-[#06B6D4] text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <RiMotorbikeFill className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-md" />
                </div>

                {/* Prize Title */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                    স্বপ্নের নতুন বাইক
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                    ১০০% স্বচ্ছ ও লাইভ লাকি ড্র
                  </p>
                </div>

                {/* Perforated Coupon Box */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-dashed border-blue-200 text-slate-700 text-xs space-y-1">
                  <p className="font-bold text-[#0068FF]">🎟️ প্রতিটি অর্ডারে ১টি নিশ্চিত কুপন</p>
                  <p className="text-[11px] text-slate-500">অর্ডার কনফার্মেশনের সাথে ইউনিক কোড যুক্ত হবে</p>
                </div>

                {/* Guarantee Note */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium pt-1">
                  <FiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>সকল ডেলিভারিকৃত অর্ডারে প্রযোজ্য</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
