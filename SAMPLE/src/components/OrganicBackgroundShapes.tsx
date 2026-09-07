import React from 'react';
import shapeSpiral from '../assets/images/shape/1.png';
import shapeSparkle from '../assets/images/shape/2.png';

export const OrganicBackgroundShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      
      {/* =========================================================================
          SECTION: BENEFITS — SPIRAL AIRFLOW, SPARKLE & DOT MATRIX
          ========================================================================= */}
      <div className="hidden sm:block absolute top-[820px] -left-12 w-64 sm:w-72 h-64 sm:h-72 pointer-events-none opacity-45">
        <img
          src={shapeSpiral}
          alt=""
          className="w-full h-full object-contain animate-[spin_110s_linear_infinite]"
        />
      </div>

      <div className="absolute top-[920px] left-28 w-12 h-12 pointer-events-none opacity-60">
        <img src={shapeSparkle} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="absolute top-[880px] right-6 sm:right-16 pointer-events-none opacity-30">
        <svg className="w-28 h-28 text-[#0068FF]" fill="currentColor" viewBox="0 0 100 100">
          {[0, 20, 40, 60, 80, 100].map((x) =>
            [0, 20, 40, 60, 80, 100].map((y) => (
              <circle key={`ben-${x}-${y}`} cx={x} cy={y} r="2.5" />
            ))
          )}
        </svg>
      </div>

      {/* =========================================================================
          SECTION: GALLERY — SPIRAL AIRFLOW & SPARKLE
          ========================================================================= */}
      <div className="hidden sm:block absolute top-[1620px] -right-14 w-72 sm:w-80 h-72 sm:h-80 pointer-events-none opacity-40">
        <img
          src={shapeSpiral}
          alt=""
          className="w-full h-full object-contain animate-[spin_100s_linear_infinite]"
        />
      </div>

      <div className="absolute top-[1560px] right-28 w-14 h-14 pointer-events-none opacity-65">
        <img src={shapeSparkle} alt="" className="w-full h-full object-contain" />
      </div>

      {/* =========================================================================
          SECTION: FEATURES / SPECS — SPIRAL AIRFLOW & DOTS
          ========================================================================= */}
      <div className="hidden sm:block absolute top-[2520px] -left-14 w-72 sm:w-80 h-72 sm:h-80 pointer-events-none opacity-40">
        <img
          src={shapeSpiral}
          alt=""
          className="w-full h-full object-contain animate-[spin_95s_linear_infinite]"
        />
      </div>

      <div className="absolute top-[2480px] left-24 w-12 h-12 pointer-events-none opacity-60">
        <img src={shapeSparkle} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="absolute top-[2600px] right-8 sm:right-20 pointer-events-none opacity-30">
        <svg className="w-28 h-28 text-[#0068FF]" fill="currentColor" viewBox="0 0 100 100">
          {[0, 20, 40, 60, 80, 100].map((x) =>
            [0, 20, 40, 60, 80, 100].map((y) => (
              <circle key={`feat-${x}-${y}`} cx={x} cy={y} r="2.5" />
            ))
          )}
        </svg>
      </div>

      {/* =========================================================================
          SECTION: TESTIMONIALS — SPIRAL & SPARKLE
          ========================================================================= */}
      <div className="hidden sm:block absolute top-[3350px] -right-12 w-64 sm:w-72 h-64 sm:h-72 pointer-events-none opacity-35">
        <img
          src={shapeSpiral}
          alt=""
          className="w-full h-full object-contain animate-[spin_105s_linear_infinite]"
        />
      </div>

      <div className="absolute top-[3300px] right-28 w-14 h-14 pointer-events-none opacity-65">
        <img src={shapeSparkle} alt="" className="w-full h-full object-contain" />
      </div>

      {/* =========================================================================
          SECTION: ORDER & FAQ — SPIRAL & SPARKLE
          ========================================================================= */}
      <div className="hidden sm:block absolute top-[4200px] -right-12 w-64 sm:w-72 h-64 sm:h-72 pointer-events-none opacity-40">
        <img
          src={shapeSpiral}
          alt=""
          className="w-full h-full object-contain animate-[spin_115s_linear_infinite]"
        />
      </div>

      <div className="absolute top-[4900px] left-14 w-12 h-12 pointer-events-none opacity-60">
        <img src={shapeSparkle} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="hidden sm:block absolute top-[5150px] -left-14 w-64 sm:w-72 h-64 sm:h-72 pointer-events-none opacity-35">
        <img
          src={shapeSpiral}
          alt=""
          className="w-full h-full object-contain animate-[spin_100s_linear_infinite]"
        />
      </div>

    </div>
  );
};
