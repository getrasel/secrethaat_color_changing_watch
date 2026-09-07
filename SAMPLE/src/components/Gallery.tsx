import React, { useState, useEffect, useCallback } from "react";
import {
  FiMaximize2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
} from "react-icons/fi";
import { GALLERY_ITEMS, toBanglaNumber } from "../data/productData";

export const Gallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const activeItem = GALLERY_ITEMS[activeIndex];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1
    );
  }, []);

  // Keyboard navigation for accessibility and lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, isModalOpen]);

  // Mouse move for interactive zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <section id="gallery" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs sm:text-sm font-semibold text-[#0265FF] mb-3">
            <FiEye className="w-3.5 h-3.5" />
            <span>প্রোডাক্ট গ্যালারি</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 sm:mb-3">
            বাস্তব ছবি ও প্রিমিয়াম ফিনিশিং
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            প্রতিটি অ্যাঙ্গেল ও বাস্তব ছবি কাছ থেকে দেখে নিন।
          </p>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-6 sm:mb-8">
          {GALLERY_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0265FF] text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {item.category}
              </button>
            );
          })}
        </div>

        {/* Gallery Showcase Card */}
        <div className="w-full bg-white rounded-3xl p-4 sm:p-7 border border-slate-200/80 shadow-sm">
          {/* Main Showcase Image Viewport with Fixed Taller Height */}
          <div
            className="relative w-full h-[420px] sm:h-[520px] md:h-[580px] lg:h-[620px] rounded-2xl overflow-hidden bg-slate-50/80 flex items-center justify-center border border-slate-100 p-4 sm:p-8 group select-none cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Top Left: Category Badge */}
            <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 text-xs sm:text-sm font-bold text-slate-900 shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0265FF]" />
              <span>{activeItem.category}</span>
            </div>

            {/* Top Right: Image Counter & Lightbox Button */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 text-xs font-bold text-slate-700 shadow-xs font-number">
                {toBanglaNumber(activeIndex + 1)} / {toBanglaNumber(GALLERY_ITEMS.length)}
              </span>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-slate-900/80 hover:bg-[#0265FF] text-white p-2 sm:p-2.5 rounded-xl backdrop-blur-md shadow-xs transition-colors cursor-pointer"
                title="বড় করে দেখুন"
                aria-label="বড় করে দেখুন"
              >
                <FiMaximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Main Interactive Product Image */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                style={
                  isHovered
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transform: "scale(1.4)",
                      }
                    : {
                        transformOrigin: "center center",
                        transform: "scale(1)",
                      }
                }
                className="w-full h-full object-contain transition-transform duration-200 will-change-transform"
                loading="lazy"
                draggable={false}
              />
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer z-20 hover:text-[#0265FF]"
              aria-label="পূর্ববর্তী ছবি"
            >
              <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer z-20 hover:text-[#0265FF]"
              aria-label="পরবর্তী ছবি"
            >
              <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Thumbnails Strip */}
          <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
            {GALLERY_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative p-2.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer bg-slate-50 flex items-center gap-3 text-left ${
                    isActive
                      ? "border-[#0265FF] ring-3 ring-[#0265FF]/15 shadow-sm bg-blue-50/30 scale-[1.01]"
                      : "border-slate-200/80 hover:border-slate-300 opacity-80 hover:opacity-100 hover:bg-slate-100/50"
                  }`}
                  aria-label={`ছবি ${index + 1}: ${item.title}`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-white border border-slate-200/70 p-1 shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0 pr-1">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {item.category}
                    </p>
                  </div>

                  {isActive && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0265FF]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="বড় ছবি প্রদর্শনী"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="w-full flex items-center justify-between text-white pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span>{activeItem.category}</span>
                <span>•</span>
                <span className="font-number text-blue-400 font-bold">
                  {toBanglaNumber(activeIndex + 1)} / {toBanglaNumber(GALLERY_ITEMS.length)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white/80 hover:text-white p-1 text-2xl cursor-pointer transition-colors"
                aria-label="বন্ধ করুন"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image with Navigation Arrows */}
            <div className="relative w-full flex items-center justify-center">
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer z-10"
                aria-label="পূর্ববর্তী ছবি"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>

              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl select-none"
              />

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer z-10"
                aria-label="পরবর্তী ছবি"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
