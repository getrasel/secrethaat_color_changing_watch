import React from "react";
import { FiStar, FiCheckCircle, FiMessageSquare } from "react-icons/fi";
import { TESTIMONIALS } from "../data/productData";

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-14 sm:py-20 bg-slate-50/70 border-t border-slate-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs sm:text-sm font-semibold text-[#0265FF] mb-3">
            <FiMessageSquare className="w-3.5 h-3.5" />
            <span>গ্রাহক মতামত ও রিভিউ</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2 sm:mb-3">
            ক্রেতাদের বাস্তব অভিজ্ঞতা
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            আমাদের ২-ইন-১ রিচার্জেবল ডাবল লাইট ব্যবহারকারী গ্রাহকদের সৎ প্রতিক্রিয়া।
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium font-number">
                    {review.date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-5">
                  "{review.comment}"
                </p>
              </div>

              {/* User Info Bar */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${review.avatarColor}`}
                >
                  {review.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900 truncate">
                      {review.name}
                    </span>
                    <FiCheckCircle
                      className="w-3.5 h-3.5 text-emerald-600 shrink-0"
                      title="যাচাইকৃত ক্রেতা"
                    />
                  </div>
                  <p className="text-xs text-slate-500 truncate font-medium">
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
