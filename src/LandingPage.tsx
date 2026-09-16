import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSupabaseOrder } from './utils/orderStorage';
import blackWatchImg from './assets/blackwatch.webp';
import blueWatchImg from './assets/blue_watch.webp';
import grayWatchImg from './assets/gray_watch.webp';
import watchBlackSplashImg from './assets/watch_black.webp';
import watchBlueSplashImg from './assets/watch_blue.webp';
import watchColorSplashImg from './assets/watch_color.webp';

// Icons for modern, polished aesthetic matching reference
import {
  LuShoppingBag,
  LuTruck,
  LuShieldCheck,
  LuCircleCheck,
  LuChevronDown,
  LuUser,
  LuPhone,
  LuMapPin,
  LuPlus,
  LuMinus,
  LuClock,
  LuPalette,
  LuSparkles,
  LuUsers,
  LuDroplets,
  LuGift,
  LuEye,
  LuPackageCheck,
  LuArrowUp
} from 'react-icons/lu';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa6';

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; badge: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    variant: 'ব্ল্যাক (Black)',
    quantity: 1,
    deliveryZone: 'dhaka_outside' // 'dhaka_outside' (130) or 'dhaka_inside' (70)
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showMobileFloatingBar, setShowMobileFloatingBar] = useState(false);

  useEffect(() => {
    document.title = 'Charles Delon Color-Changing Watch | আলো পড়লেই রঙ বদলায়! আপনার লুক হোক আলাদা';

    // Hash scrolling if landed with #order-form or similar
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  // Control mobile floating purchase bar: visible across all sections EXCEPT Hero and Order Form
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero');
      const orderFormEl = document.getElementById('order-form');

      const scrollY = window.scrollY;
      const heroHeight = heroEl ? heroEl.offsetHeight : 450;
      const isPastHero = scrollY > (heroHeight - 120);

      let isInsideOrderForm = false;
      if (orderFormEl) {
        const rect = orderFormEl.getBoundingClientRect();
        isInsideOrderForm = rect.top < (window.innerHeight - 60) && rect.bottom > 80;
      }

      if (isPastHero && !isInsideOrderForm) {
        setShowMobileFloatingBar(true);
      } else {
        setShowMobileFloatingBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pricing configuration
  const regularPrice = 1290;
  const offerPrice = 890;
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

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    let firstErrorFieldId = '';

    if (!orderForm.name.trim()) {
      errors.name = 'অনুগ্রহ করে আপনার পুরো নাম লিখুন';
      if (!firstErrorFieldId) firstErrorFieldId = 'form-input-name';
    }

    const cleanPhone = orderForm.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      errors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)';
      if (!firstErrorFieldId) firstErrorFieldId = 'form-input-phone';
    }

    if (!orderForm.address.trim() || orderForm.address.trim().length < 8) {
      errors.address = 'অনুগ্রহ করে সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন (বাসা/রোড/এলাকা/জেলা)';
      if (!firstErrorFieldId) firstErrorFieldId = 'form-input-address';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);

      // Smoothly scroll back to the top of the missing or required area and focus it
      if (firstErrorFieldId) {
        const errorEl = document.getElementById(firstErrorFieldId);
        if (errorEl) {
          errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            errorEl.focus();
          }, 300);
        } else {
          const formTop = document.getElementById('order-form');
          if (formTop) {
            formTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      // 1. Create order in Supabase table: neworders
      const { data: createdOrder, error } = await createSupabaseOrder({
        name: orderForm.name.trim(),
        phone: orderForm.phone.trim(),
        address: orderForm.address.trim(),
        product: 'Charles Delon Color-Changing Dial Watch',
        color: orderForm.variant,
        quantity: orderForm.quantity,
        price: offerPrice,
        shipping_amount: deliveryCharge,
        total_amount: totalAmount,
        status: 'pending',
      });

      if (error) {
        console.warn('Supabase insertion notice:', error);
      }

      const fallbackId = Math.floor(100000 + Math.random() * 900000);
      const finalOrderId = createdOrder?.id
        ? `CD-${createdOrder.id}`
        : `CD-${fallbackId}`;

      // 2. Navigate to Thank You page with order details for Meta Pixel Purchase tracking
      navigate('/thank-you', {
        state: {
          order: {
            selectedColor: orderForm.variant,
            quantity: orderForm.quantity,
            customerName: orderForm.name.trim(),
            phoneNumber: orderForm.phone.trim(),
            fullAddress: orderForm.address.trim(),
            deliveryArea: orderForm.deliveryZone,
          },
          orderNumber: finalOrderId,
          grandTotal: totalAmount,
          deliveryFee: deliveryCharge,
          subtotal: subtotal,
        },
      });
    } catch (err) {
      console.error('Order submission error:', err);
      const fallbackId = `CD-${Math.floor(100000 + Math.random() * 900000)}`;
      navigate('/thank-you', {
        state: {
          order: {
            selectedColor: orderForm.variant,
            quantity: orderForm.quantity,
            customerName: orderForm.name.trim(),
            phoneNumber: orderForm.phone.trim(),
            fullAddress: orderForm.address.trim(),
            deliveryArea: orderForm.deliveryZone,
          },
          orderNumber: fallbackId,
          grandTotal: totalAmount,
          deliveryFee: deliveryCharge,
          subtotal: subtotal,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      q: '১. ঘড়িটির ডায়াল কি সত্যিই রঙ পরিবর্তন করে?',
      a: 'আলোর প্রতিফলন ও আলোর পরিবর্তনের কারণে ডায়ালের গ্রেডিয়েন্ট রঙের শেড ভিন্নভাবে দেখা যায়।'
    },
    {
      q: '২. এটি কি ছেলে ও মেয়ে উভয়েই ব্যবহার করতে পারবে?',
      a: 'হ্যাঁ, এর ইউনিসেক্স ডিজাইন পুরুষ ও নারী উভয়ের জন্য উপযোগী।'
    },
    {
      q: '৩. স্ট্র্যাপটি কেমন?',
      a: 'স্ট্র্যাপটি নরম রাবার/সিলিকন ধরনের, যা হাতে আরামদায়কভাবে পরা যায়।'
    },
    {
      q: '৪. ঘড়িটি কি পানিতে ব্যবহার করা যায়?',
      a: 'এটি ওয়াটার রেসিস্ট্যান্ট হওয়ায় হাত ধোয়া বা হালকা বৃষ্টির মতো দৈনন্দিন পরিস্থিতিতে ব্যবহার করা যায়।'
    },
    {
      q: '৫. এটি কি উপহার হিসেবে দেওয়া যাবে?',
      a: 'অবশ্যই। স্টাইলিশ ডিজাইন ও আকর্ষণীয় ডায়ালের কারণে এটি প্রিয়জনকে উপহার দেওয়ার জন্যও সুন্দর একটি পছন্দ।'
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
                CHARLES DELON
              </div>
              <span className="text-[11px] sm:text-xs text-[#64748B] font-medium tracking-normal font-bn leading-tight">
                কালার চেঞ্জিং ডায়াল ঘড়ি
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
            <button onClick={() => scrollToSection('gift')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
              উপহার দিন
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
              ফিচার্স
            </button>
            <button onClick={() => scrollToSection('gift')} className="block w-full text-left py-2 text-base font-semibold text-[#334155] hover:text-[#0284C7] border-b border-slate-100">
              উপহার দিন
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-2 text-base font-semibold text-[#334155] hover:text-[#0284C7]">
              প্রশ্নোত্তর
            </button>
          </div>
        )}
      </header>


      {/* ==================================================
          HERO SECTION
          ================================================== */}
      <section id="hero" className="relative pt-6 pb-14 md:pt-14 md:pb-24 overflow-hidden">
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
                  সীমিত স্টক • কালার চেঞ্জিং ডায়াল
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[2.85rem] font-bold tracking-tight text-[#0F172A] leading-[1.3] mb-4 md:mb-5 font-bn">
                আলো পড়লেই রঙ বদলায়! <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#2563EB] bg-clip-text text-transparent">
                  সাধারণ ঘড়ির ভিড়ে আপনার লুক হোক আলাদা
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-[#475569] leading-relaxed mb-6 font-normal">
                সাধারণ ঘড়ির বাইরে, আলোর প্রতিফলনে রঙ বদলানো নজরকাড়া ডায়াল আর স্টাইলিশ ডিজাইনে প্রতিটি মুহূর্তে আপনার লুকে যোগ করবে আলাদা আকর্ষণ।
              </p>

              {/* Price / Offer Display */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl sm:text-5xl font-black text-[#0284C7] font-num tracking-tight">
                  ৳ ৮৯০
                </span>
                <span className="text-xl sm:text-2xl text-[#94A3B8] line-through font-num font-semibold">
                  ৳ ১,২৯০
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-100 text-[#0284C7] ml-2">
                  (৳ ৪০০ ছাড়)
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
                  href="https://wa.me/8801746867350?text=Hello%2C%20I%20want%20to%20order%20Charles%20Delon%20Color-Changing%20Watch"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-base sm:text-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
                >
                  <FaWhatsapp size={22} />
                  <span>হোয়াটসঅ্যাপে মেসেজ দিন</span>
                </a>
              </div>

              {/* Trust Badges & Supporting Text */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#475569] font-medium">
                <span className="flex items-center gap-1.5 sm:gap-2 text-[#0284C7] font-semibold bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                  <LuSparkles size={16} /> ছেলে-মেয়ে সবার জন্য উপযোগী
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <LuTruck className="text-[#0284C7]" size={18} /> সারা দেশে হোম ডেলিভারি
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <LuShieldCheck className="text-[#0284C7]" size={18} /> ক্যাশ অন ডেলিভারি
                </span>
              </div>
            </div>

            {/* Hero Right Visual */}
            <div className="lg:col-span-5 relative flex justify-center items-center mt-2 lg:mt-0">
              <div className="relative w-full max-w-md lg:max-w-none rounded-3xl p-3 sm:p-4 bg-white border border-slate-200 shadow-xl group z-10">
                <img
                  src={watchBlackSplashImg}
                  alt="Charles Delon Color-Changing Dial Watch"
                  className="w-full h-auto object-cover max-h-[380px] sm:max-h-[440px] md:max-h-[480px] rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                />

                {/* Floating Feature Tags at Bottom */}
                <div className="absolute -bottom-3 left-2.5 sm:left-6 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white border border-sky-200 shadow-lg flex items-center gap-1.5 sm:gap-2 z-20">
                  <LuPalette size={16} className="text-[#0284C7] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-[#0F172A]">রঙ বদলানো ডায়াল</span>
                </div>
                <div className="absolute -bottom-3 right-2.5 sm:right-6 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white border border-sky-200 shadow-lg flex items-center gap-1.5 sm:gap-2 z-20">
                  <LuDroplets size={16} className="text-[#0284C7] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-[#0284C7]">ওয়াটার রেসিস্ট্যান্ট</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>





      {/* ==================================================
          4 CORE BENEFITS (4 Cards Grid)
          ================================================== */}
      <section id="benefits" className="py-12 md:py-16 border-t border-slate-200/80 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="mb-6 md:mb-8 text-center">
            <span className="text-xs tracking-widest text-[#0284C7] uppercase font-bold block mb-3 sm:mb-3.5">
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
                আলোতে বদলায় রঙ
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-normal">
                আলোর প্রতিফলনে ডায়ালের গ্রেডিয়েন্ট শেড ভিন্নভাবে ফুটে ওঠে, যা ঘড়িটিকে দেয় আলাদা এক আকর্ষণ।
              </p>
            </div>

            {/* Card 02 */}
            <div className="p-6 sm:p-7 rounded-2xl light-card flex flex-col justify-start group hover:border-cyan-300">
              <div className="font-num text-4xl sm:text-5xl font-black text-cyan-200 group-hover:text-cyan-600 transition-colors mb-3">
                ০২
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">
                ওয়াটার প্রুফ
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-normal">
                হাত ধোয়া, বৃষ্টির পানি কিংবা দৈনন্দিন পানির ছিটা থেকে ঘড়িটিকে রাখে সুরক্ষিত ও নিরাপদ।
              </p>
            </div>

            {/* Card 03 */}
            <div className="p-6 sm:p-7 rounded-2xl light-card flex flex-col justify-start group hover:border-blue-300">
              <div className="font-num text-4xl sm:text-5xl font-black text-blue-200 group-hover:text-blue-600 transition-colors mb-3">
                ০৩
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">
                সব পোশাকের সাথে মানানসই
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-normal">
                ক্যাজুয়াল ও ফর্মাল যেকোনো পোশাকের সাথেই নিখুঁতভাবে মানিয়ে যায় এবং ছেলে-মেয়ে উভয়ের জন্য উপযোগী।
              </p>
            </div>

            {/* Card 04 */}
            <div className="p-6 sm:p-7 rounded-2xl light-card flex flex-col justify-start group hover:border-indigo-300">
              <div className="font-num text-4xl sm:text-5xl font-black text-indigo-200 group-hover:text-indigo-500 transition-colors mb-3">
                ০৪
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">
                সারাদিন আরামদায়ক
              </h3>
              <p className="text-[#475569] text-xs sm:text-sm leading-relaxed font-normal">
                নরম রাবার/সিলিকন স্ট্র্যাপ হাতে আরামদায়ক অনুভূতি দেয় এবং দীর্ঘক্ষণ ব্যবহারের জন্য অত্যন্ত সুবিধাজনক।
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ==================================================
          PRODUCT GALLERY (6 Image Showcase with Lightbox)
          ================================================== */}
      <section id="gallery" className="py-12 md:py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <span className="text-xs tracking-widest text-[#0284C7] uppercase font-bold block mb-3 sm:mb-3.5">
              ছবিসমূহ
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] mb-2">
              প্রোডাক্ট গ্যালারি
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#475569]">
              বড় করে দেখতে যেকোনো ছবির ওপর ক্লিক করুন
            </p>
            <div className="small-design-line" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6">
            {[
              {
                src: blackWatchImg,
                title: 'ব্ল্যাক স্ট্র্যাপ চার্লস ডেলন কালার চেঞ্জিং ডায়াল ওয়াচ',
                badge: 'ব্ল্যাক স্ট্র্যাপ'
              },
              {
                src: blueWatchImg,
                title: 'ব্লু স্ট্র্যাপ চার্লস ডেলন কালার চেঞ্জিং ডায়াল ওয়াচ',
                badge: 'ব্লু স্ট্র্যাপ'
              },
              {
                src: grayWatchImg,
                title: 'গ্রে স্ট্র্যাপ চার্লস ডেলন কালার চেঞ্জিং ডায়াল ওয়াচ',
                badge: 'গ্রে স্ট্র্যাপ'
              },
              {
                src: watchBlackSplashImg,
                title: 'আলোর প্রতিফলনে ডায়ালে লুকিয়ে থাকা রঙের ম্যাজিক',
                badge: 'ম্যাজিকাল ডায়াল'
              },
              {
                src: watchBlueSplashImg,
                title: 'ক্যাজুয়াল ও ফর্মাল সব স্টাইলের সাথে মানানসই লুক',
                badge: 'স্টাইলিশ লুক'
              },
              {
                src: watchColorSplashImg,
                title: 'নিজের জন্য কিংবা প্রিয়জনকে উপহার দেওয়ার সেরা পছন্দ',
                badge: 'কালার রিফ্লেকশন'
              }
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => setPreviewImage(item)}
                className="group relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 bg-slate-50 border border-slate-200 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="aspect-square w-full rounded-xl sm:rounded-2xl bg-white border border-slate-100 overflow-hidden flex items-center justify-center p-2 mb-2 sm:mb-3 relative">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg sm:rounded-xl">
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 text-[#0284C7] font-bold text-[10px] sm:text-xs shadow-md flex items-center gap-1 sm:gap-1.5">
                      <LuEye size={13} /> বড় করে দেখুন
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-1.5 px-0.5 sm:px-1">
                  <span className="font-bold text-[11px] sm:text-xs md:text-sm text-[#0F172A] truncate">
                    {item.badge}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#0284C7] font-semibold shrink-0">
                    ভিউ 🔍
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ==================================================
          FEATURE SECTION (6 Features - Title Only)
          ================================================== */}
      <section id="features" className="py-10 md:py-14 border-t border-slate-200/80 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
            <span className="text-xs tracking-widest text-[#0284C7] uppercase font-bold block mb-3 sm:mb-3.5">
              প্রিমিয়াম ফিচারসমূহ
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
              যে কারণে ঘড়িটি আলাদা
            </h2>
            <div className="small-design-line" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-4">
            {/* Feature 01 */}
            <div className="p-3.5 sm:p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-sky-300">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center mb-2.5 sm:mb-3 border border-sky-100 group-hover:scale-110 transition-transform">
                <LuPalette size={22} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#0F172A] leading-snug">
                রঙ বদলানো ডায়াল
              </h3>
            </div>

            {/* Feature 02 */}
            <div className="p-3.5 sm:p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-purple-300">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mb-2.5 sm:mb-3 border border-purple-100 group-hover:scale-110 transition-transform">
                <LuSparkles size={22} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#0F172A] leading-snug">
                সময়ের সাথে গ্রেডিয়েন্ট কালার
              </h3>
            </div>

            {/* Feature 03 */}
            <div className="p-3.5 sm:p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-indigo-300">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center mb-2.5 sm:mb-3 border border-indigo-100 group-hover:scale-110 transition-transform">
                <LuClock size={22} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#0F172A] leading-snug">
                স্পষ্ট সময় দেখা
              </h3>
            </div>

            {/* Feature 04 */}
            <div className="p-3.5 sm:p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-emerald-300">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 text-[#059669] flex items-center justify-center mb-2.5 sm:mb-3 border border-emerald-100 group-hover:scale-110 transition-transform">
                <LuShieldCheck size={22} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#0F172A] leading-snug">
                নরম সিলিকন স্ট্র্যাপ
              </h3>
            </div>

            {/* Feature 05 */}
            <div className="p-3.5 sm:p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-amber-300">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-amber-50 text-[#D97706] flex items-center justify-center mb-2.5 sm:mb-3 border border-amber-100 group-hover:scale-110 transition-transform">
                <LuUsers size={22} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#0F172A] leading-snug">
                ইউনিসেক্স ডিজাইন
              </h3>
            </div>

            {/* Feature 06 */}
            <div className="p-3.5 sm:p-5 rounded-2xl light-card text-center flex flex-col items-center justify-center group hover:border-cyan-300">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-cyan-50 text-[#0891B2] flex items-center justify-center mb-2.5 sm:mb-3 border border-cyan-100 group-hover:scale-110 transition-transform">
                <LuDroplets size={22} className="sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#0F172A] leading-snug">
                ওয়াটার রেসিস্ট্যান্ট
              </h3>
            </div>
          </div>

        </div>
      </section>





      {/* ==================================================
          DELIVERY PACKAGE & GIFT BOX
          ================================================== */}
      <section id="gift" className="py-10 md:py-14 bg-[#F8FAFC] border-t border-slate-200/80 scroll-mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Card Box */}
          <div className="p-6 sm:p-10 md:p-12 rounded-3xl light-card border-sky-200 shadow-xl relative overflow-hidden bg-white">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Side: Gift & Self Purchase Story + Pricing + CTA */}
              <div className="lg:col-span-7 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4 sm:mb-4.5">
                  <LuGift size={14} />
                  <span>উপহারের জন্য চমৎকার পছন্দ</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mb-3 tracking-tight leading-snug">
                  নিজের জন্য, কিংবা প্রিয় কারও জন্য
                </h3>

                <p className="text-sm sm:text-base md:text-lg text-[#475569] max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed font-normal">
                  বিশেষ কাউকে খুশি করতে সবসময় বড় কিছু প্রয়োজন হয় না। আলোর প্রতিফলনে রঙ বদলানো একটি সুন্দর ও স্টাইলিশ ঘড়িও হতে পারে মনে রাখার মতো একটি সেরা উপহার।
                </p>

                {/* Action CTA */}
                <div>
                  <button
                    onClick={() => scrollToSection('order-form')}
                    className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white font-extrabold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <LuGift size={21} />
                    <span>উপহার দিতে অর্ডার করুন</span>
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
                        চার্লস ডেলন কালার চেঞ্জিং ওয়াচ
                      </span>
                    </li>
                    <li className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <LuCircleCheck className="text-[#0284C7] shrink-0" size={19} />
                      <span className="text-sm sm:text-base font-bold text-[#0F172A]">
                        আকর্ষণীয় অফিশিয়াল বক্স প্যাকেজিং
                      </span>
                    </li>
                    <li className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <LuCircleCheck className="text-[#0284C7] shrink-0" size={19} />
                      <span className="text-sm sm:text-base font-bold text-[#0F172A]">
                        নিরাপদ বাবল র‍্যাপ ডেলিভারি
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
      <section id="order-form" className="py-10 sm:py-16 md:py-24 border-t border-slate-200/80 bg-white scroll-mt-10 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center mb-6 sm:mb-10">
            <span className="text-[11px] sm:text-xs tracking-widest text-[#0284C7] uppercase font-bold block mb-2 sm:mb-3.5">
              সহজ ও দ্রুত অর্ডার
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] mb-1.5 sm:mb-2 tracking-tight">
              আপনার ঘড়িটি অর্ডার করুন
            </h2>
            <p className="text-xs sm:text-base text-[#475569] font-normal max-w-lg mx-auto">
              ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে চেক করে সম্পূর্ণ মূল্য পরিশোধ করবেন
            </p>
            <div className="small-design-line my-3 sm:my-4" />
          </div>

          <div className="p-3.5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 shadow-lg sm:shadow-xl">
            <form onSubmit={handleOrderSubmit} className="space-y-4 sm:space-y-6">

              {/* Name Field */}
              <div>
                <label htmlFor="form-input-name" className="block text-xs sm:text-sm font-bold text-[#0F172A] mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                  <LuUser className="text-[#0284C7]" size={16} />
                  <span>আপনার নাম</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-input-name"
                  type="text"
                  placeholder="আপনার পুরো নাম লিখুন"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 sm:py-3.5 rounded-xl bg-white border ${formErrors.name
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-slate-200 focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100'
                    } text-[#0F172A] placeholder-slate-400 outline-none transition-all text-sm sm:text-base font-bn`}
                />
                {formErrors.name && (
                  <p className="text-xs text-red-500 font-medium mt-1">{formErrors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="form-input-phone" className="block text-xs sm:text-sm font-bold text-[#0F172A] mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                  <LuPhone className="text-[#0284C7]" size={16} />
                  <span>মোবাইল নম্বর</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-input-phone"
                  type="tel"
                  placeholder="017XXXXXXXX"
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 sm:py-3.5 rounded-xl bg-white border ${formErrors.phone
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-slate-200 focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100'
                    } text-[#0F172A] placeholder-slate-400 outline-none transition-all text-sm sm:text-base font-en`}
                />
                {formErrors.phone && (
                  <p className="text-xs text-red-500 font-medium mt-1">{formErrors.phone}</p>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label htmlFor="form-input-address" className="block text-xs sm:text-sm font-bold text-[#0F172A] mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                  <LuMapPin className="text-[#0284C7]" size={16} />
                  <span>সম্পূর্ণ ডেলিভারি ঠিকানা</span>
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="form-input-address"
                  rows={2}
                  placeholder="বাসা নং, রোড নং, এলাকা/গ্রাম, থানা ও জেলা উল্লেখ করুন"
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                  className={`w-full px-3.5 py-2.5 sm:py-3.5 rounded-xl bg-white border ${formErrors.address
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-slate-200 focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100'
                    } text-[#0F172A] placeholder-slate-400 outline-none transition-all text-sm sm:text-base resize-none font-bn`}
                />
                {formErrors.address && (
                  <p className="text-xs text-red-500 font-medium mt-1">{formErrors.address}</p>
                )}
              </div>

              {/* Color Variant Radio Select (3 Colors) */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#0F172A] mb-2 flex items-center gap-1.5 sm:gap-2">
                  <LuPalette className="text-[#0284C7]" size={16} />
                  <span>পছন্দের কালার নির্বাচন করুন</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                  {/* Black */}
                  <label className={`p-2 sm:p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${orderForm.variant.includes('ব্ল্যাক')
                    ? 'bg-sky-50 border-[#0284C7] text-[#0F172A] shadow-xs'
                    : 'bg-white border-slate-200 text-[#475569]'
                    }`}>
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <input
                        type="radio"
                        name="colorVariant"
                        checked={orderForm.variant.includes('ব্ল্যাক')}
                        onChange={() => setOrderForm({ ...orderForm, variant: 'ব্ল্যাক (Black)' })}
                        className="accent-[#0284C7] shrink-0"
                      />
                      <span className="font-semibold text-xs sm:text-sm truncate">ব্ল্যাক</span>
                    </div>
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-slate-900 border border-white shrink-0 ml-1" />
                  </label>

                  {/* Blue */}
                  <label className={`p-2 sm:p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${orderForm.variant.includes('ব্লু')
                    ? 'bg-sky-50 border-[#0284C7] text-[#0F172A] shadow-xs'
                    : 'bg-white border-slate-200 text-[#475569]'
                    }`}>
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <input
                        type="radio"
                        name="colorVariant"
                        checked={orderForm.variant.includes('ব্লু')}
                        onChange={() => setOrderForm({ ...orderForm, variant: 'ব্লু (Blue)' })}
                        className="accent-[#0284C7] shrink-0"
                      />
                      <span className="font-semibold text-xs sm:text-sm truncate">ব্লু</span>
                    </div>
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-blue-600 border border-white shrink-0 ml-1" />
                  </label>

                  {/* Gray */}
                  <label className={`p-2 sm:p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${orderForm.variant.includes('গ্রে')
                    ? 'bg-sky-50 border-[#0284C7] text-[#0F172A] shadow-xs'
                    : 'bg-white border-slate-200 text-[#475569]'
                    }`}>
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <input
                        type="radio"
                        name="colorVariant"
                        checked={orderForm.variant.includes('গ্রে')}
                        onChange={() => setOrderForm({ ...orderForm, variant: 'গ্রে (Gray)' })}
                        className="accent-[#0284C7] shrink-0"
                      />
                      <span className="font-semibold text-xs sm:text-sm truncate">গ্রে</span>
                    </div>
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-slate-500 border border-white shrink-0 ml-1" />
                  </label>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#0F172A] mb-2 flex items-center gap-1.5 sm:gap-2">
                  <LuShoppingBag className="text-[#0284C7]" size={16} />
                  <span>পরিমাণ নির্বাচন করুন</span>
                </label>
                <div className="flex items-center justify-between gap-3 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-slate-200 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setOrderForm({ ...orderForm, quantity: Math.max(1, orderForm.quantity - 1) })}
                      disabled={orderForm.quantity <= 1}
                      className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-white hover:bg-sky-100 text-[#0284C7] disabled:opacity-30 disabled:hover:bg-white disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95 shadow-2xs"
                      aria-label="পরিমাণ কমান"
                    >
                      <LuMinus size={16} />
                    </button>
                    <div className="w-10 sm:w-12 text-center">
                      <span className="font-num text-lg sm:text-xl font-extrabold text-[#0F172A]">
                        {orderForm.quantity.toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOrderForm({ ...orderForm, quantity: orderForm.quantity + 1 })}
                      className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-white hover:bg-sky-100 text-[#0284C7] transition-all cursor-pointer active:scale-95 shadow-2xs"
                      aria-label="পরিমাণ বাড়ান"
                    >
                      <LuPlus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] sm:text-xs text-[#64748B] font-medium">প্রোডাক্ট মূল্য</div>
                    <div className="font-num text-base sm:text-lg font-black text-[#0284C7]">
                      ৳ {subtotal.toLocaleString('bn-BD')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Zone Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#0F172A] mb-2 flex items-center gap-1.5 sm:gap-2">
                  <LuTruck className="text-[#0284C7]" size={16} />
                  <span>ডেলিভারি এলাকা নির্বাচন করুন</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <label className={`p-2.5 sm:p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${orderForm.deliveryZone === 'dhaka_outside'
                    ? 'bg-sky-50 border-[#0284C7] text-[#0F172A] shadow-xs'
                    : 'bg-white border-slate-200 text-[#475569]'
                    }`}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="radio"
                        name="deliveryZone"
                        checked={orderForm.deliveryZone === 'dhaka_outside'}
                        onChange={() => setOrderForm({ ...orderForm, deliveryZone: 'dhaka_outside' })}
                        className="accent-[#0284C7]"
                      />
                      <span className="font-semibold text-xs sm:text-sm">ঢাকা সিটির বাইরে</span>
                    </div>
                    <span className="font-num font-bold text-xs sm:text-sm text-[#0284C7]">৳ ১৩০</span>
                  </label>

                  <label className={`p-2.5 sm:p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${orderForm.deliveryZone === 'dhaka_inside'
                    ? 'bg-sky-50 border-[#0284C7] text-[#0F172A] shadow-xs'
                    : 'bg-white border-slate-200 text-[#475569]'
                    }`}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <input
                        type="radio"
                        name="deliveryZone"
                        checked={orderForm.deliveryZone === 'dhaka_inside'}
                        onChange={() => setOrderForm({ ...orderForm, deliveryZone: 'dhaka_inside' })}
                        className="accent-[#0284C7]"
                      />
                      <span className="font-semibold text-xs sm:text-sm">ঢাকা সিটির ভিতরে</span>
                    </div>
                    <span className="font-num font-bold text-xs sm:text-sm text-[#0284C7]">৳ ৭০</span>
                  </label>
                </div>
              </div>

              {/* Live Order Bill Breakdown */}
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-[#475569]">
                  <span>ঘড়ির মূল্য ({orderForm.quantity.toLocaleString('bn-BD')} টি)</span>
                  <div className="flex items-center gap-1.5 sm:gap-2 font-num">
                    <span className="text-[#0F172A] font-bold">৳ {subtotal.toLocaleString('bn-BD')}</span>
                    <span className="text-[10px] sm:text-xs text-[#94A3B8] line-through font-semibold">
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

                <div className="flex justify-between text-sm sm:text-lg font-black text-[#0F172A] pt-2 sm:pt-2.5 border-t border-slate-200">
                  <span>সর্বমোট বিল</span>
                  <span className="font-num text-lg sm:text-2xl text-[#0284C7]">
                    ৳ {totalAmount.toLocaleString('bn-BD')}
                  </span>
                </div>

                <div className="text-[10px] sm:text-[11px] text-[#64748B] text-center pt-0.5 sm:pt-1">
                  পণ্য হাতে পেয়ে ডেলিভারিম্যানের কাছে সম্পূর্ণ টাকা পরিশোধ করবেন (ক্যাশ অন ডেলিভারি)
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 sm:gap-2.5 w-full py-3.5 sm:py-4 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white font-extrabold text-base sm:text-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-center disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                    <span>অর্ডার প্রক্রিয়াকরণ হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <LuShoppingBag size={20} className="shrink-0" />
                    <span className="flex items-center justify-center gap-1.5 sm:gap-2 text-center">
                      <span>অর্ডার কনফার্ম করুন</span>
                      <span className="font-num font-black text-sky-100">
                        ৳ {totalAmount.toLocaleString('bn-BD')}
                      </span>
                    </span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </section>


      {/* ==================================================
          FAQ SECTION
          ================================================== */}
      <section id="faq" className="py-12 md:py-16 border-t border-slate-200/80 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs tracking-widest text-[#0284C7] uppercase font-bold block mb-3 sm:mb-3.5">
              সচরাচর প্রশ্নাবলী
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              সচরাচর জিজ্ঞাসিত প্রশ্নাবলী
            </h2>
            <div className="small-design-line" />
          </div>

          <div className="space-y-3.5 sm:space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl light-card overflow-hidden transition-colors hover:border-sky-300 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
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
                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-base text-[#475569] leading-relaxed border-t border-slate-100 pt-3 sm:pt-4 font-normal">
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
      <section className="py-14 md:py-20 text-center relative overflow-hidden bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0F172A] leading-tight mb-4">
            সাধারণ ঘড়ির ভিড়ে <br className="hidden sm:inline" />
            <span className="text-[#0284C7]">আপনার লুক হোক আলাদা</span>
          </h2>
          <p className="text-base sm:text-lg text-[#475569] max-w-xl mx-auto mb-6 font-normal">
            আলোর প্রতিফলনে বদলে যাওয়া আকর্ষণীয় ডায়াল—আপনার প্রতিদিনের স্টাইলে যোগ করুক নতুন মাত্রা।
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
      <footer className="py-12 border-t border-slate-200 text-xs text-[#64748B] bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-en text-base font-extrabold text-[#0F172A] tracking-wider mb-0.5">
                CHARLES DELON
              </div>
              <p className="text-xs text-[#64748B] font-bn font-medium">কালার চেঞ্জিং ডায়াল ঘড়ি</p>
            </div>

            <a
              href="https://wa.me/8801746867350?text=Hello%2C%20I%20want%20to%20know%20about%20Charles%20Delon%20Color-Changing%20Watch"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
            >
              <FaWhatsapp size={19} />
              <span className="text-sm font-bold font-en">+8801746867350</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-200">
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
              <button onClick={() => scrollToSection('gift')} className="hover:text-[#0284C7] transition-colors cursor-pointer">
                উপহার দিন
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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#94A3B8] pt-4 border-t border-slate-200">
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
          MOBILE FLOATING PURCHASE BAR
          ================================================== */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200 backdrop-blur-xl px-4 py-3 safe-bottom shadow-[0_-8px_25px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out ${showMobileFloatingBar
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-emerald-600 block">৪০০ টাকা ছাড়</span>
            <span className="font-num text-xl font-black text-[#0284C7]">৳ ৮৯০</span>
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
