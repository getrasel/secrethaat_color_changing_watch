import React, { useState, useEffect } from 'react';
import astronautClockSpaceImg from './assets/astronaut_clock.jpg';
import astronautBoxImg from './assets/astronaut_clock_lamp.jpg';
import orangeLampImg from './assets/clock_lamp.jpg';
import blueLampImg from './assets/white_clock.jpg';

// Premium React Icons for modern, polished aesthetic
import {
  LuShoppingBag,
  LuTruck,
  LuShieldCheck,
  LuCheck,
  LuCircleCheck,
  LuChevronDown,
  LuUser,
  LuPhone,
  LuMapPin,
  LuPlus,
  LuMinus,
  LuClock,
  LuAlarmClock,
  LuLampDesk,
  LuMoonStar,
  LuBatteryCharging,
  LuPalette,
  LuZap,
  LuCable,
  LuEye,
  LuPackageCheck,
  LuArrowUp
} from 'react-icons/lu';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';
import { TbRotate360 } from 'react-icons/tb';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; badge: string } | null>(null);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    variant: 'স্পেস ব্লু (Space Blue)',
    quantity: 1,
    deliveryZone: 'dhaka_inside' // 'dhaka_inside' (70) or 'dhaka_outside' (130)
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pricing configuration
  const regularPrice = 1150;
  const offerPrice = 790;
  const deliveryCharge = orderForm.deliveryZone === 'dhaka_inside' ? 70 : 130;
  const subtotal = orderForm.quantity * offerPrice;
  const totalAmount = subtotal + deliveryCharge;
  const totalSavings = (orderForm.quantity * regularPrice) - subtotal;

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!orderForm.name.trim()) {
      errors.name = 'অনুগ্রহ করে আপনার পুরো নাম লিখুন';
    }

    const cleanPhone = orderForm.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      errors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)';
    }

    if (!orderForm.address.trim() || orderForm.address.trim().length < 8) {
      errors.address = 'অনুগ্রহ করে সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন (বাসা/রোড/এলাকা/জেলা)';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const randomId = `AST-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(randomId);
    setOrderSuccess(true);
  };

  const faqItems = [
    {
      q: '১. এটি কী কী কাজে ব্যবহার করা যায়?',
      a: 'এটি রিডিং ল্যাম্প, নাইট লাইট এবং অ্যালার্ম ঘড়ি—তিনভাবেই ব্যবহার করা যায়।'
    },
    {
      q: '২. ল্যাম্পটির নেক কি ঘোরানো যায়?',
      a: 'হ্যাঁ, ৩৬০° ফ্লেক্সিবল নেক প্রয়োজন অনুযায়ী যেকোনো দিকে ঘুরিয়ে আলো ফোকাস করা যায়।'
    },
    {
      q: '৩. এটি কি রিচার্জেবল?',
      a: 'হ্যাঁ, এতে শক্তিশালী রিচার্জেবল ব্যাটারি রয়েছে যা তার ছাড়াই ব্যবহারযোগ্য।'
    },
    {
      q: '৪. এতে কি অ্যালার্ম ঘড়ি আছে?',
      a: 'হ্যাঁ, মাঝখানে একটি নির্ভুল ও প্রিমিয়াম এনালগ ঘড়ি রয়েছে।'
    },
    {
      q: '৫. বাচ্চাদের জন্য এটি কেন ভালো?',
      a: 'কিউট স্পেস ডিজাইন, রিডিং লাইট এবং ঘড়ির সুবিধা একসাথে থাকায় এটি বাচ্চার পড়ার টেবিলের জন্য একটি আকর্ষণীয় ও সময় সচেতনতার গ্যাজেট।'
    },
    {
      q: '৬. এটি কি গিফট হিসেবে দেওয়া যাবে?',
      a: 'অবশ্যই। জন্মদিন বা বিশেষ দিনে উপহার দেওয়ার জন্য এটি আকর্ষণীয় কালারফুল বক্স প্যাকেজিংসহ আসে।'
    }
  ];

  return (
    <div className="min-h-screen text-[#0F172A] selection:bg-[#0284C7] selection:text-white relative font-bn bg-[#F8FAFC]">

      {/* ==================================================
          STICKY HEADER / NAVIGATION
          ================================================== */}
      <header className="sticky top-0 z-50 frosted-menu transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">

          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0284C7] shadow-[0_0_12px_rgba(2,132,199,0.7)] animate-pulse shrink-0" />
            <a href="#" className="flex flex-col text-left group">
              <div className="font-en text-base sm:text-lg font-extrabold tracking-wider text-[#0F172A] group-hover:text-[#0284C7] transition-colors leading-tight">
                ASTRONAUT <span className="text-[#0284C7] font-bold text-xs sm:text-sm">2-in-1</span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#64748B] font-medium tracking-normal font-bn leading-tight">
                অ্যালার্ম ও ল্যাম্প
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#475569]">
            <button onClick={() => scrollToSection('benefits')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
              মূল সুবিধা
            </button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
              গ্যালারি
            </button>
            <button onClick={() => scrollToSection('features')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
              ফিচার্স
            </button>
            <button onClick={() => scrollToSection('offer')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
              অফার
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
              প্রশ্নোত্তর
            </button>
          </nav>

          {/* Header Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('order-form')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white font-bold text-sm shadow-md hover:shadow-lg hover:shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <LuShoppingBag size={17} />
              <span>এখনই অর্ডার করুন</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              onClick={() => scrollToSection('order-form')}
              className="px-4 py-1.5 rounded-full bg-[#0284C7] text-white text-xs font-bold shadow-sm cursor-pointer"
            >
              অর্ডার করুন
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#334155] hover:text-[#0F172A] transition-colors rounded-lg bg-slate-100/80 cursor-pointer"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <HiXMark size={22} /> : <HiBars3 size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 border-b border-slate-200 px-5 py-5 space-y-3 backdrop-blur-2xl shadow-xl">
            <button onClick={() => scrollToSection('benefits')} className="block w-full text-left py-2 text-base font-semibold text-[#334155] hover:text-[#0284C7] border-b border-slate-100">
              মূল সুবিধা
            </button>
            <button onClick={() => scrollToSection('gallery')} className="block w-full text-left py-2 text-base font-semibold text-[#334155] hover:text-[#0284C7] border-b border-slate-100">
              প্রোডাক্ট গ্যালারি
            </button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-base font-semibold text-[#334155] hover:text-[#0284C7] border-b border-slate-100">
              ডিভাইস সুবিধা
            </button>
            <button onClick={() => scrollToSection('offer')} className="block w-full text-left py-2 text-base font-semibold text-[#334155] hover:text-[#0284C7] border-b border-slate-100">
              বিশেষ অফার
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 text-base font-semibold text-[#334155] hover:text-[#0284C7]">
              সচরাচর প্রশ্নাবলী
            </button>
          </div>
        )}
      </header>


      {/* ==================================================
          HERO SECTION (Using astronaut_clock.jpg)
          ================================================== */}
      <section className="relative pt-6 pb-14 md:pt-14 md:pb-24 overflow-hidden">
        {/* Light ambient subtle orbs */}
        <div className="hidden lg:block absolute -top-10 -right-10 w-72 h-72 eclipse-orb opacity-60 z-0" />
        <div className="hidden lg:block absolute bottom-0 left-10 w-80 h-80 eclipse-orb opacity-40 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">

              {/* Top Tag / Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 w-fit mb-4 md:mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-[#0284C7] font-bold">
                  সীমিত স্টক • পছন্দের কালার বেছে নিন
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold tracking-tight text-[#0F172A] leading-[1.25] mb-4 md:mb-5 font-bn">
                পড়ার টেবিল, রুম কিংবা গিফটের জন্য <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#2563EB] bg-clip-text text-transparent">
                  কিউট Astronaut Lamp
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-[#475569] leading-relaxed mb-6 font-normal">
                সোনামণির পড়ার সময় বাড়াবে মনোযোগ, আর ডেস্কে যোগ করবে দারুণ এক স্পেস-থিমের সৌন্দর্য। আলো, ঘড়ি ও আরামের জন্য প্রয়োজনীয় সুবিধা—একটি ছোট্ট গ্যাজেটেই।
              </p>

              {/* Price / Offer Display */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl sm:text-5xl font-black text-[#0284C7] font-num tracking-tight">
                  ৳ ৭৯০
                </span>
                <span className="text-xl sm:text-2xl text-[#94A3B8] line-through font-num font-semibold">
                  ৳ ১,১৫০
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-100 text-[#0284C7] ml-2">
                  (৳ ৩৬০ ছাড়)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6 max-w-xl">
                <button
                  onClick={() => scrollToSection('order-form')}
                  className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <LuShoppingBag size={21} />
                  <span>এখনই অর্ডার করুন</span>
                </button>
                <a
                  href="https://wa.me/8801746867350?text=Hello%2C%20I%20want%20to%20order%20Astronaut%20Reading%20Lamp"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-base sm:text-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
                >
                  <FaWhatsapp size={22} />
                  <span>হোয়াটসঅ্যাপে মেসেজ দিন</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-sm text-[#475569] font-medium">
                <span className="flex items-center gap-2">
                  <LuTruck className="text-[#0284C7]" size={19} /> সারা দেশে হোম ডেলিভারি
                </span>
                <span className="flex items-center gap-2">
                  <LuShieldCheck className="text-[#0284C7]" size={19} /> ক্যাশ অন ডেলিভারি
                </span>
              </div>
            </div>

            {/* Hero Right Visual: Using astronaut_clock.jpg */}
            <div className="lg:col-span-5 relative flex justify-center items-center mt-2 lg:mt-0">
              <div className="relative w-full max-w-md lg:max-w-none rounded-3xl p-3 sm:p-4 bg-white border border-slate-200 shadow-xl group z-10">
                <img
                  src={astronautClockSpaceImg}
                  alt="2-in-1 Astronaut Reading Lamp & Alarm Clock"
                  className="w-full h-auto object-cover max-h-[380px] sm:max-h-[440px] md:max-h-[480px] rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                />

                {/* Floating Feature Tags */}
                <div className="absolute -bottom-3 left-4 sm:left-6 px-3.5 py-2 rounded-xl bg-white border border-sky-200 shadow-lg flex items-center gap-2">
                  <TbRotate360 size={18} className="text-[#0284C7]" />
                  <span className="text-xs font-semibold text-[#0F172A]">৩৬০° ফ্লেক্সিবল নেক</span>
                </div>
                <div className="absolute top-4 right-4 sm:right-6 px-3.5 py-2 rounded-xl bg-white border border-sky-200 shadow-lg flex items-center gap-2">
                  <LuClock size={16} className="text-[#0284C7]" />
                  <span className="text-xs font-semibold text-[#0284C7]">এনালগ অ্যালার্ম ঘড়ি</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ==================================================
          CORE BENEFITS (4 Cards)
          ================================================== */}
      <section id="benefits" className="py-12 md:py-16 border-t border-slate-200/80 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="mb-6 md:mb-8 text-center">
            <span className="text-xs tracking-widest text-[#0284C7] uppercase font-bold block mb-1.5">
              মূল বৈশিষ্ট্যসমূহ
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
              ৪টি প্রধান সুবিধা
            </h2>
            <div className="small-design-line" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {/* Card 01 */}
            <div className="p-6 sm:p-7 rounded-2xl light-card flex flex-col justify-start group hover:border-sky-300">
              <div className="font-num text-4xl sm:text-5xl font-black text-sky-200 group-hover:text-[#0284C7] transition-colors mb-3">
                ০১
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">
                রিডিং ল্যাম্প
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-normal">
                পড়াশোনার সময় প্রয়োজনীয় চোখ-বান্ধব আলো পেতে ব্যবহার করুন রিডিং ল্যাম্প হিসেবে।
              </p>
            </div>

            {/* Card 02 */}
            <div className="p-6 sm:p-7 rounded-2xl light-card flex flex-col justify-start group hover:border-amber-300">
              <div className="font-num text-4xl sm:text-5xl font-black text-amber-200 group-hover:text-amber-500 transition-colors mb-3">
                ০২
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">
                অ্যালার্ম ঘড়ি
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-normal">
                সকালে সময়মতো ঘুম থেকে ওঠা এবং পড়ার রুটিন সঠিকভাবে বজায় রাখতে সাহায্য করে।
              </p>
            </div>

            {/* Card 03 */}
            <div className="p-6 sm:p-7 rounded-2xl light-card flex flex-col justify-start group hover:border-indigo-300">
              <div className="font-num text-4xl sm:text-5xl font-black text-indigo-200 group-hover:text-indigo-500 transition-colors mb-3">
                ০৩
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">
                নাইট ল্যাম্প
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-normal">
                ঘুমানোর আগে বা বিশ্রামের সময় আরামদায়ক ও মৃদু আলো হিসেবে ব্যবহারের চমৎকার সুবিধা।
              </p>
            </div>

            {/* Card 04 */}
            <div className="p-6 sm:p-7 rounded-2xl light-card flex flex-col justify-start group hover:border-emerald-300">
              <div className="font-num text-4xl sm:text-5xl font-black text-emerald-200 group-hover:text-emerald-500 transition-colors mb-3">
                ০৪
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">
                সময় ও অভ্যাস
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-normal">
                মাঝখানের এনালগ ঘড়ির মাধ্যমে ছোটবেলা থেকেই সময় মেনে চলার অভ্যাস তৈরি করতে সাহায্য করুন।
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ==================================================
          PRODUCT GALLERY (4 Image Gallery with Lightbox)
          ================================================== */}
      <section id="gallery" className="py-14 md:py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="text-xs tracking-widest text-[#0284C7] uppercase font-bold block mb-2">
              ছবিসমূহ
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-3">
              প্রোডাক্ট গ্যালারি
            </h2>
            <p className="text-sm sm:text-base text-[#475569]">
              বড় করে দেখতে যেকোনো ছবির ওপর ক্লিক করুন
            </p>
            <div className="small-design-line" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                src: astronautClockSpaceImg,
                title: 'স্পেস ব্লু ও স্পেস অরেঞ্জ কালার ভ্যারিয়েন্ট',
                badge: 'কালার অপশন'
              },
              {
                src: blueLampImg,
                title: 'স্পেস ব্লু অ্যাস্ট্রোনাট রিডিং ল্যাম্প ও ঘড়ি',
                badge: 'স্পেস ব্লু'
              },
              {
                src: orangeLampImg,
                title: 'স্পেস অরেঞ্জ অ্যাস্ট্রোনাট রিডিং ল্যাম্প ও ঘড়ি',
                badge: 'স্পেস অরেঞ্জ'
              },
              {
                src: astronautBoxImg,
                title: 'আকর্ষণীয় অফিশিয়াল বক্স প্যাকেজিং',
                badge: 'গিফট বক্স'
              }
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => setPreviewImage(item)}
                className="group relative rounded-3xl p-3 sm:p-4 bg-slate-50 border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="aspect-square w-full rounded-2xl bg-white border border-slate-100 overflow-hidden flex items-center justify-center p-2 mb-3 relative">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <span className="px-3 py-1.5 rounded-full bg-white/95 text-[#0284C7] font-bold text-xs shadow-md flex items-center gap-1.5">
                      <LuEye size={14} /> বড় করে দেখুন
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 px-1">
                  <span className="font-bold text-xs sm:text-sm text-[#0F172A] truncate">
                    {item.badge}
                  </span>
                  <span className="text-[11px] text-[#0284C7] font-semibold shrink-0">
                    ভিউ 🔍
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ==================================================
          FEATURE SECTION (5 Features - Clean Title Only)
          ================================================== */}
      <section id="features" className="py-16 md:py-24 border-t border-slate-200/80 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="text-xs tracking-widest text-[#0284C7] uppercase font-bold block mb-2">
              অল-ইন-ওয়ান গ্যাজেট
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-4">
              একটি ছোট্ট ডিভাইসে <br className="hidden sm:inline" />
              <span className="text-[#0284C7]">অনেক সুবিধা</span>
            </h2>
            <div className="small-design-line" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3.5 sm:gap-4">
            {/* Feature 01 */}
            <div className="p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-sky-300">
              <div className="w-13 h-13 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center mb-3 border border-sky-100 group-hover:scale-110 transition-transform">
                <LuLampDesk size={25} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">রিডিং ল্যাম্প</h3>
            </div>

            {/* Feature 02 */}
            <div className="p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-indigo-300">
              <div className="w-13 h-13 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center mb-3 border border-indigo-100 group-hover:scale-110 transition-transform">
                <LuMoonStar size={25} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">নাইট লাইট</h3>
            </div>

            {/* Feature 03 */}
            <div className="p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-amber-300">
              <div className="w-13 h-13 rounded-2xl bg-amber-50 text-[#D97706] flex items-center justify-center mb-3 border border-amber-100 group-hover:scale-110 transition-transform">
                <LuAlarmClock size={25} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">অ্যালার্ম ঘড়ি</h3>
            </div>

            {/* Feature 04 */}
            <div className="p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-cyan-300">
              <div className="w-13 h-13 rounded-2xl bg-cyan-50 text-[#0891B2] flex items-center justify-center mb-3 border border-cyan-100 group-hover:scale-110 transition-transform">
                <TbRotate360 size={25} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">ফ্লেক্সিবল নেক</h3>
            </div>

            {/* Feature 05 */}
            <div className="p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-emerald-300">
              <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-3 border border-emerald-100 group-hover:scale-110 transition-transform">
                <LuZap size={25} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">রিচার্জেবল</h3>
            </div>

            {/* Feature 06 */}
            <div className="p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-teal-300">
              <div className="w-13 h-13 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center mb-3 border border-teal-100 group-hover:scale-110 transition-transform">
                <LuBatteryCharging size={25} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">৩-৫ ঘণ্টা ব্যাকআপ</h3>
            </div>

            {/* Feature 07 */}
            <div className="p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center col-span-2 sm:col-span-1 group hover:border-blue-300">
              <div className="w-13 h-13 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-3 border border-blue-100 group-hover:scale-110 transition-transform">
                <LuCable size={25} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">USB চার্জিং ক্যাবল</h3>
            </div>
          </div>

        </div>
      </section>


      {/* ==================================================
          OFFER SECTION WITH DELIVERY LIST BOX
          ================================================== */}
      <section id="offer" className="py-16 md:py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header on Top Side */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="text-xs tracking-widest text-[#0284C7] uppercase font-bold block mb-2">
              রিচার্জেবল ব্যাকআপ
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-3">
              তার ছাড়াই আলো থাকুক সঙ্গে
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              শক্তিশালী রিচার্জেবল ব্যাটারির কারণে তারের ঝামেলা ছাড়াই ব্যবহার করা যায়। একবার চার্জ করে প্রয়োজন অনুযায়ী ব্যবহার করুন, এমনকি লোডশেডিংয়ের সময়ও।
            </p>
            <div className="small-design-line" />
          </div>

          {/* Main Offer Card Box */}
          <div className="p-8 sm:p-12 md:p-14 rounded-3xl light-card border-sky-200 shadow-xl relative overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Side: Offer Title, Pricing & CTA */}
              <div className="lg:col-span-7 text-center lg:text-left">
                <div className="inline-block px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
                  সীমিত সময়ের স্পেশাল অফার
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] mb-3 tracking-tight leading-snug">
                  সোনামণির টেবিলে <br className="hidden sm:inline" />
                  যোগ হোক নতুন আনন্দ
                </h3>

                <p className="text-base sm:text-lg text-[#475569] max-w-xl mx-auto lg:mx-0 mb-6 font-normal">
                  কিউট ডিজাইন, প্রয়োজনীয় আলো এবং সময়ের সুবিধা—সব একসাথে।
                </p>

                {/* Price Pill */}
                <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 sm:px-6 sm:py-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 mb-6">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-xs text-[#64748B] font-semibold">অফার মূল্য:</span>
                    <span className="text-3xl sm:text-4xl font-black text-[#0284C7] font-num">
                      ৳ ৭৯০
                    </span>
                    <span className="text-base text-[#94A3B8] line-through font-num font-semibold">
                      ৳ ১,১৫০
                    </span>
                  </div>
                  <span className="text-xs text-[#0284C7] font-bold px-2.5 py-0.5 rounded-full bg-sky-100">
                    (৳ ৩৬০ ছাড়)
                  </span>
                </div>

                {/* Action CTA */}
                <div>
                  <button
                    onClick={() => scrollToSection('order-form')}
                    className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white font-extrabold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <LuShoppingBag size={21} />
                    <span>এখনই অর্ডার করুন</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Delivery Package List Box */}
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border-2 border-sky-200 shadow-md flex flex-col justify-between text-left">

                  {/* Header */}
                  <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                      <LuPackageCheck size={22} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                        ডেলিভারিতে যা যা পাচ্ছেনঃ
                      </h4>
                      <p className="text-xs text-[#64748B]">অরিজিনাল প্যাকেজ বক্স সেট</p>
                    </div>
                  </div>

                  {/* List Items */}
                  <ul className="space-y-3 mb-5">
                    <li className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <LuCircleCheck className="text-[#0284C7] shrink-0" size={19} />
                      <span className="text-sm sm:text-base font-bold text-[#0F172A]">
                        অ্যাস্ট্রোনট অ্যালার্ম ক্লক
                      </span>
                    </li>
                    <li className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <LuCircleCheck className="text-[#0284C7] shrink-0" size={19} />
                      <span className="text-sm sm:text-base font-bold text-[#0F172A]">
                        গিফট বক্স প্যাকেজিং
                      </span>
                    </li>
                    <li className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <LuCircleCheck className="text-[#0284C7] shrink-0" size={19} />
                      <span className="text-sm sm:text-base font-bold text-[#0F172A]">
                        চার্জিং ক্যাবল
                      </span>
                    </li>
                  </ul>

                  {/* Note box */}
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs sm:text-sm text-emerald-800 font-bold flex items-center justify-center gap-2">
                    <LuShieldCheck size={17} className="text-emerald-600 shrink-0" />
                    <span>note: পণ্য হাতে পেয়ে টাকা দিবেন</span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ==================================================
          ORDER FORM SECTION
          ================================================== */}
      <section id="order-form" className="py-16 md:py-24 border-t border-slate-200/80 bg-[#F8FAFC] scroll-mt-10 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center mb-10">
            <span className="text-xs tracking-widest text-[#0284C7] uppercase font-bold block mb-2">
              সহজ ও দ্রুত অর্ডার
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0F172A] mb-2 tracking-tight">
              অর্ডার করতে নিচের ফর্মটি পূরণ করুন
            </h2>
            <p className="text-sm sm:text-base text-[#475569] font-normal">
              ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে চেক করে সম্পূর্ণ মূল্য পরিশোধ করবেন
            </p>
            <div className="small-design-line" />
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <form onSubmit={handleOrderSubmit} className="space-y-6">

              {/* Name Field */}
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2 flex items-center gap-2">
                  <LuUser className="text-[#0284C7]" size={17} />
                  <span>আপনার নাম</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার পুরো নাম লিখুন"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:bg-white focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100 outline-none transition-all text-base font-bn"
                />
                {formErrors.name && (
                  <p className="text-xs text-red-500 font-medium mt-1.5">{formErrors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2 flex items-center gap-2">
                  <LuPhone className="text-[#0284C7]" size={17} />
                  <span>মোবাইল নম্বর</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="017XXXXXXXX"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:bg-white focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100 outline-none transition-all text-base font-en"
                />
                {formErrors.phone && (
                  <p className="text-xs text-red-500 font-medium mt-1.5">{formErrors.phone}</p>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2 flex items-center gap-2">
                  <LuMapPin className="text-[#0284C7]" size={17} />
                  <span>সম্পূর্ণ ডেলিভারি ঠিকানা</span>
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="বাসা নং, রোড নং, এলাকা/গ্রাম, থানা ও জেলা উল্লেখ করুন"
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:bg-white focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100 outline-none transition-all text-base resize-none font-bn"
                />
                {formErrors.address && (
                  <p className="text-xs text-red-500 font-medium mt-1.5">{formErrors.address}</p>
                )}
              </div>

              {/* Color Variant Radio Select */}
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2.5 flex items-center gap-2">
                  <LuPalette className="text-[#0284C7]" size={17} />
                  <span>পছন্দের রঙ নির্বাচন করুন</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${orderForm.variant.includes('স্পেস ব্লু')
                    ? 'bg-sky-50 border-[#0284C7] text-[#0F172A] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-[#475569]'
                    }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="colorVariant"
                        checked={orderForm.variant.includes('স্পেস ব্লু')}
                        onChange={() => setOrderForm({ ...orderForm, variant: 'স্পেস ব্লু (Space Blue)' })}
                        className="accent-[#0284C7]"
                      />
                      <span className="font-semibold text-sm">স্পেস ব্লু (Space Blue)</span>
                    </div>
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-400 border border-white" />
                  </label>

                  <label className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${orderForm.variant.includes('স্পেস অরেঞ্জ')
                    ? 'bg-orange-50 border-orange-500 text-[#0F172A] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-[#475569]'
                    }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="colorVariant"
                        checked={orderForm.variant.includes('স্পেস অরেঞ্জ')}
                        onChange={() => setOrderForm({ ...orderForm, variant: 'স্পেস অরেঞ্জ (Space Orange)' })}
                        className="accent-orange-500"
                      />
                      <span className="font-semibold text-sm">স্পেস অরেঞ্জ (Space Orange)</span>
                    </div>
                    <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-white" />
                  </label>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2.5 flex items-center gap-2">
                  <LuShoppingBag className="text-[#0284C7]" size={17} />
                  <span>পরিমাণ নির্বাচন করুন</span>
                </label>
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setOrderForm({ ...orderForm, quantity: Math.max(1, orderForm.quantity - 1) })}
                      disabled={orderForm.quantity <= 1}
                      className="w-11 h-11 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-sky-100 text-[#0284C7] disabled:opacity-30 disabled:hover:bg-slate-100 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95"
                      aria-label="পরিমাণ কমান"
                    >
                      <LuMinus size={18} />
                    </button>
                    <div className="w-12 text-center">
                      <span className="font-num text-xl font-extrabold text-[#0F172A]">
                        {orderForm.quantity.toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOrderForm({ ...orderForm, quantity: orderForm.quantity + 1 })}
                      className="w-11 h-11 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-sky-100 text-[#0284C7] transition-all cursor-pointer active:scale-95"
                      aria-label="পরিমাণ বাড়ান"
                    >
                      <LuPlus size={18} />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-[#64748B] font-medium">প্রোডাক্ট মূল্য</div>
                    <div className="font-num text-lg font-black text-[#0284C7]">
                      ৳ {subtotal.toLocaleString('bn-BD')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Zone Selector */}
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2.5 flex items-center gap-2">
                  <LuTruck className="text-[#0284C7]" size={17} />
                  <span>ডেলিভারি এলাকা নির্বাচন করুন</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${orderForm.deliveryZone === 'dhaka_inside'
                    ? 'bg-sky-50 border-[#0284C7] text-[#0F172A] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-[#475569]'
                    }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryZone"
                        checked={orderForm.deliveryZone === 'dhaka_inside'}
                        onChange={() => setOrderForm({ ...orderForm, deliveryZone: 'dhaka_inside' })}
                        className="accent-[#0284C7]"
                      />
                      <span className="font-semibold text-sm">ঢাকা সিটির ভিতরে</span>
                    </div>
                    <span className="font-num font-bold text-[#0284C7]">৳ ৭০</span>
                  </label>

                  <label className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${orderForm.deliveryZone === 'dhaka_outside'
                    ? 'bg-sky-50 border-[#0284C7] text-[#0F172A] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-[#475569]'
                    }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryZone"
                        checked={orderForm.deliveryZone === 'dhaka_outside'}
                        onChange={() => setOrderForm({ ...orderForm, deliveryZone: 'dhaka_outside' })}
                        className="accent-[#0284C7]"
                      />
                      <span className="font-semibold text-sm">ঢাকা সিটির বাইরে</span>
                    </div>
                    <span className="font-num font-bold text-[#0284C7]">৳ ১৩০</span>
                  </label>
                </div>
              </div>

              {/* Live Order Bill Breakdown */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-sm">
                <div className="flex justify-between items-center text-[#475569]">
                  <span>ল্যাম্পের মূল্য ({orderForm.quantity.toLocaleString('bn-BD')} টি)</span>
                  <div className="flex items-center gap-2 font-num">
                    <span className="text-[#0F172A] font-bold">৳ {subtotal.toLocaleString('bn-BD')}</span>
                    <span className="text-xs text-[#94A3B8] line-through font-semibold">
                      ৳ {(orderForm.quantity * regularPrice).toLocaleString('bn-BD')}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-[#475569]">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="font-num text-[#0F172A] font-bold">৳ {deliveryCharge.toLocaleString('bn-BD')}</span>
                </div>

                <div className="flex justify-between text-emerald-600 text-xs sm:text-sm font-bold">
                  <span>মোট সাশ্রয়</span>
                  <span className="font-num">- ৳ {totalSavings.toLocaleString('bn-BD')}</span>
                </div>

                <div className="flex justify-between text-base sm:text-lg font-black text-[#0F172A] pt-2.5 border-t border-slate-200">
                  <span>সর্বমোট বিল</span>
                  <span className="font-num text-xl sm:text-2xl text-[#0284C7]">
                    ৳ {totalAmount.toLocaleString('bn-BD')}
                  </span>
                </div>

                <div className="text-[11px] text-[#64748B] text-center pt-1">
                  পণ্য হাতে পেয়ে ডেলিভারিম্যানের কাছে সম্পূর্ণ টাকা পরিশোধ করবেন (ক্যাশ অন ডেলিভারি)
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white font-extrabold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-center"
              >
                <LuShoppingBag size={22} />
                <span className="sm:hidden">অর্ডার কনফার্ম করুন</span>
                <span className="hidden sm:inline">
                  অর্ডার কনফার্ম করুন (সর্বমোট বিল: ৳ {totalAmount.toLocaleString('bn-BD')})
                </span>
              </button>

            </form>
          </div>

        </div>
      </section>


      {/* ==================================================
          FAQ SECTION
          ================================================== */}
      <section id="faq" className="py-16 md:py-24 border-t border-slate-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10 sm:mb-14">
            <span className="text-xs tracking-widest text-[#0284C7] uppercase font-bold block mb-2">
              সচরাচর প্রশ্নাবলী
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0F172A] tracking-tight">
              সচরাচর জিজ্ঞাসিত প্রশ্নাবলী
            </h2>
            <div className="small-design-line" />
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl light-card overflow-hidden transition-colors hover:border-sky-300"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-[#0F172A]">
                    {item.q}
                  </span>
                  <LuChevronDown
                    className={`text-[#0284C7] shrink-0 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''
                      }`}
                    size={20}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-[#475569] leading-relaxed border-t border-slate-100 pt-4 font-normal">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ==================================================
          FINAL CTA SECTION
          ================================================== */}
      <section className="py-20 md:py-28 text-center relative overflow-hidden bg-[#F8FAFC] border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0F172A] leading-tight mb-4">
            পড়ার টেবিলে <br className="hidden sm:inline" />
            <span className="text-[#0284C7]">মহাকাশের নতুন গল্প</span>
          </h2>
          <p className="text-base sm:text-lg text-[#475569] max-w-xl mx-auto mb-6 font-normal">
            আপনার সোনামণির জন্য কিউট, ব্যবহারিক ও আকর্ষণীয় একটি ডেস্ক সঙ্গী।
          </p>
          <div className="small-design-line" />
          <button
            onClick={() => scrollToSection('order-form')}
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white font-extrabold text-lg sm:text-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <LuShoppingBag size={22} />
            <span>এখনই অর্ডার করুন</span>
          </button>
        </div>
      </section>


      {/* ==================================================
          FOOTER
          ================================================== */}
      <footer className="py-12 border-t border-slate-200 text-xs text-[#64748B] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-en text-base font-extrabold text-[#0F172A] tracking-wider mb-0.5">
                ASTRONAUT <span className="text-[#0284C7]">2-in-1</span>
              </div>
              <p className="text-xs text-[#64748B] font-bn font-medium">অ্যালার্ম ও ল্যাম্প</p>
            </div>

            <a
              href="https://wa.me/8801746867350?text=Hello%2C%20I%20want%20to%20know%20about%20Astronaut%20Reading%20Lamp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
            >
              <FaWhatsapp size={19} />
              <span className="text-sm font-bold font-en">+8801746867350</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5 sm:gap-6 text-sm text-[#475569]">
              <button onClick={() => scrollToSection('benefits')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
                মূল সুবিধা
              </button>
              <button onClick={() => scrollToSection('gallery')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
                গ্যালারি
              </button>
              <button onClick={() => scrollToSection('features')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
                ফিচার্স
              </button>
              <button onClick={() => scrollToSection('offer')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
                অফার
              </button>
              <button onClick={() => scrollToSection('order-form')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
                অর্ডার ফর্ম
              </button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
                প্রশ্নোত্তর
              </button>
            </div>

            {/* Dedicated Footer Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-50 hover:bg-[#0284C7] text-[#0284C7] hover:text-white border border-sky-200 hover:border-[#0284C7] transition-all font-bold text-xs sm:text-sm cursor-pointer shadow-xs hover:shadow-md group shrink-0"
              aria-label="পৃষ্ঠার উপরে ফিরে যান"
            >
              <LuArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
              <span>উপরে চলে যান</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#94A3B8] pt-4 border-t border-slate-100">
            <div>
              সরাসরি যোগাযোগ ও সহায়তা: <span className="font-en text-[#0F172A] font-semibold">+8801746867350</span>
            </div>
            <div className="font-num">
              © 2026 সকল স্বত্ব সংরক্ষিত।
            </div>
          </div>

        </div>
      </footer>


      {/* ==================================================
          FLOATING SCROLL TO TOP & WHATSAPP BUTTONS
          ================================================== */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-36 md:bottom-24 right-4 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-[#0284C7] border border-slate-200 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer group animate-in fade-in"
          aria-label="উপরে চলে যান"
          title="উপরে চলে যান"
        >
          <LuArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      <a
        href="https://wa.me/8801746867350?text=Hello%2C%20I%20want%20to%20know%20about%20Astronaut%20Reading%20Lamp"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 md:bottom-8 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer group"
        aria-label="হোয়াটসঅ্যাপে যোগাযোগ করুন"
      >
        <FaWhatsapp className="text-2xl sm:text-3xl group-hover:rotate-12 transition-transform duration-300" />
      </a>


      {/* ==================================================
          MOBILE FLOATING PURCHASE BAR
          ================================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200 backdrop-blur-xl px-4 py-3 safe-bottom shadow-[0_-8px_25px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[#64748B] block font-medium">বিশেষ অফার</span>
            <span className="font-num text-xl font-black text-[#0284C7]">৳ ৭৯০</span>
          </div>
          <button
            onClick={() => scrollToSection('order-form')}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white font-bold text-sm text-center shadow-md active:scale-[0.98] transition-transform cursor-pointer"
          >
            এখনই অর্ডার করুন
          </button>
        </div>
      </div>


      {/* ==================================================
          ORDER SUCCESS MODAL
          ================================================== */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center mx-auto mb-4 border border-sky-200">
              <LuCheck size={32} />
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
              অভিনন্দন! আপনার অর্ডার সফল হয়েছে
            </h3>
            <p className="text-sm text-[#475569] mb-4">
              অর্ডার ট্র্যাকিং আইডি: <span className="font-en text-[#0284C7] font-bold">{orderId}</span>
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-3 mb-6 divide-y divide-slate-200/70">
              <div className="space-y-2.5 pb-2.5">
                <div className="flex justify-between items-start gap-3 text-[#475569]">
                  <span className="shrink-0 font-medium">গ্রাহকের নাম:</span>
                  <span className="text-[#0F172A] font-bold text-right break-words">{orderForm.name}</span>
                </div>
                <div className="flex justify-between items-center gap-3 text-[#475569]">
                  <span className="shrink-0 font-medium">মোবাইল নম্বর:</span>
                  <span className="font-en text-[#0F172A] font-bold text-right">{orderForm.phone}</span>
                </div>
                <div className="flex justify-between items-start gap-3 text-[#475569]">
                  <span className="shrink-0 font-medium">ডেলিভারি ঠিকানা:</span>
                  <span className="text-[#0F172A] font-medium text-right break-words max-w-[200px] leading-relaxed">
                    {orderForm.address}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-3 text-[#475569]">
                  <span className="shrink-0 font-medium">নির্বাচিত কালার:</span>
                  <span className="text-[#0284C7] font-bold text-right">{orderForm.variant}</span>
                </div>
                <div className="flex justify-between items-center gap-3 text-[#475569]">
                  <span className="shrink-0 font-medium">পরিমাণ:</span>
                  <span className="text-[#0F172A] font-bold font-num text-right">
                    {orderForm.quantity.toLocaleString('bn-BD')} টি
                  </span>
                </div>
                <div className="flex justify-between items-center gap-3 text-[#475569]">
                  <span className="shrink-0 font-medium">ডেলিভারি এলাকা:</span>
                  <span className="text-[#0F172A] font-medium text-right">
                    {orderForm.deliveryZone === 'dhaka_inside' ? 'ঢাকা সিটির ভিতরে (৳ ৭০)' : 'ঢাকা সিটির বাইরে (৳ ১৩০)'}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3">
                <span className="text-sm font-bold text-[#0F172A]">সর্বমোট বিল:</span>
                <div className="text-right flex flex-col items-end">
                  <span className="font-num text-[#0284C7] text-lg font-black">
                    ৳ {totalAmount.toLocaleString('bn-BD')}
                  </span>
                  <span className="text-[11px] text-[#64748B] font-normal">(ক্যাশ অন ডেলিভারি)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#64748B] mb-6">
              খুব দ্রুত আমাদের প্রতিনিধি আপনার সাথে কল করে অর্ডার নিশ্চিত করবে এবং পার্সেল পাঠিয়ে দেওয়া হবে।
            </p>

            <button
              type="button"
              onClick={() => {
                setOrderSuccess(false);
                setOrderForm({
                  name: '',
                  phone: '',
                  address: '',
                  variant: 'স্পেস ব্লু (Space Blue)',
                  quantity: 1,
                  deliveryZone: 'dhaka_inside'
                });
              }}
              className="w-full py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369a1] text-white font-bold text-sm cursor-pointer transition-colors"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          IMAGE LIGHTBOX MODAL (Click to enlarge)
          ================================================== */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200 cursor-default"
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0F172A] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
              aria-label="বন্ধ করুন"
            >
              <HiXMark size={22} />
            </button>

            {/* Enlarge Image */}
            <div className="w-full max-h-[68vh] sm:max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden bg-slate-50 p-2 sm:p-4">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="max-w-full max-h-[62vh] sm:max-h-[70vh] object-contain rounded-xl shadow-xs"
              />
            </div>

            {/* Caption */}
            <div className="mt-3 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-[#0284C7] font-bold text-xs mb-1">
                {previewImage.badge}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-[#0F172A]">
                {previewImage.title}
              </h4>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
