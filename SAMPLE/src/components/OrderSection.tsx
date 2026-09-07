import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiPlus,
  FiMinus,
  FiCheck,
  FiAlertCircle,
  FiMapPin,
  FiUser,
  FiPhone,
  FiShield,
  FiPackage,
} from "react-icons/fi";
import {
  PRODUCT_INFO,
  COLOR_VARIANTS,
  toBanglaNumber,
} from "../data/productData";
import type { OrderState } from "../types";
import { createSupabaseOrder } from "../utils/orderStorage";

export const OrderSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryArea, setDeliveryArea] = useState<"dhaka" | "outside">(
    "dhaka",
  );

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  // Validation & Submit State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Dynamic Calculations
  const unitPrice = PRODUCT_INFO.basePrice;
  const regularUnitPrice = PRODUCT_INFO.regularPrice;
  const regularTotal = regularUnitPrice * quantity;
  const itemsTotal = unitPrice * quantity;
  const deliveryCharge =
    deliveryArea === "dhaka"
      ? PRODUCT_INFO.deliveryDhaka
      : PRODUCT_INFO.deliveryOutside;
  const grandTotal = itemsTotal + deliveryCharge;

  const currentColor =
    COLOR_VARIANTS.find((c) => c.id === selectedColor) || COLOR_VARIANTS[0];

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newQty = prev + delta;
      return newQty >= 1 ? newQty : 1;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "অনুগ্রহ করে আপনার নাম লিখুন";
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (!cleanPhone) {
      newErrors.phone = "অনুগ্রহ করে আপনার মোবাইল নম্বর লিখুন";
    } else if (cleanPhone.length < 11) {
      newErrors.phone = "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "অনুগ্রহ করে আপনার সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && !isSubmitting) {
      setIsSubmitting(true);
      const fallbackId = Math.floor(10000 + Math.random() * 90000);
      const orderPayload: OrderState = {
        selectedColor: currentColor.name,
        quantity,
        customerName: formData.name.trim(),
        phoneNumber: formData.phone.trim(),
        fullAddress: formData.address.trim(),
        deliveryArea,
        notes: formData.notes.trim() || undefined,
      };

      // Store in Supabase
      const { data: createdOrder } = await createSupabaseOrder({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        product: PRODUCT_INFO.name,
        color: currentColor.name,
        quantity,
        price: unitPrice,
        shipping_amount: deliveryCharge,
        total_amount: grandTotal,
        status: "pending",
      });

      const finalOrderId = createdOrder?.id
        ? `SH-${createdOrder.id}`
        : `SH-${fallbackId}`;

      setIsSubmitting(false);

      navigate("/thank-you", {
        state: {
          order: orderPayload,
          orderNumber: finalOrderId,
          grandTotal,
          deliveryFee: deliveryCharge,
          subtotal: itemsTotal,
        },
      });
    }
  };

  return (
    <section
      id="order-section"
      className="py-14 sm:py-20 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 border-y border-slate-100"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs sm:text-sm font-semibold text-[#0265FF] mb-3">
            <FiShoppingBag className="w-3.5 h-3.5" />
            <span>সহজ ও দ্রুত অর্ডার</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 sm:mb-3">
            পছন্দের রঙ নির্বাচন ও অর্ডার সম্পন্ন করুন
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            ক্যাশ অন ডেলিভারিতে সম্পূর্ণ নিশ্চিন্তে অর্ডার করুন—পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা।
          </p>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: Product Options & Summary */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* 1. Color Selector Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-[#0265FF] text-xs flex items-center justify-center font-bold font-number">১</span>
                  <span>রঙ নির্বাচন করুন</span>
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                  {currentColor.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {COLOR_VARIANTS.map((variant) => {
                  const isSelected = variant.id === selectedColor;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedColor(variant.id)}
                      className={`relative flex flex-col items-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer bg-white text-center ${
                        isSelected
                          ? "border-[#0265FF] ring-3 ring-blue-500/10 shadow-md scale-[1.01]"
                          : "border-slate-200/80 hover:border-slate-300"
                      }`}
                    >
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden mb-2.5 bg-slate-50 p-1 flex items-center justify-center">
                        <img
                          src={variant.image}
                          alt={variant.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: variant.hex }}
                        />
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {variant.name}
                        </span>
                      </div>

                      {isSelected && (
                        <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#0265FF] text-white flex items-center justify-center shadow-xs">
                          <FiCheck className="w-3 h-3 stroke-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quantity Stepper */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    পরিমাণ (Quantity)
                  </h4>
                  <p className="text-xs text-slate-500">
                    কত পিস নিতে চান?
                  </p>
                </div>

                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white transition-colors cursor-pointer"
                    aria-label="পরিমাণ কমান"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>

                  <span className="w-10 text-center font-number font-bold text-base text-slate-900">
                    {toBanglaNumber(quantity)}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-white transition-colors cursor-pointer"
                    aria-label="পরিমাণ বাড়ান"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Delivery Area Selector & Price Summary Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-[#0265FF] text-xs flex items-center justify-center font-bold font-number">২</span>
                  <span>ডেলিভারি এলাকা</span>
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-blue-50 text-[#0265FF] border border-blue-100">
                  {deliveryArea === "dhaka" ? "ঢাকা ভেতরে" : "ঢাকার বাইরে"}
                </span>
              </div>

              {/* Delivery Area Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Dhaka */}
                <button
                  type="button"
                  onClick={() => setDeliveryArea("dhaka")}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    deliveryArea === "dhaka"
                      ? "bg-blue-50/50 border-[#0265FF] shadow-xs"
                      : "bg-white border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                        deliveryArea === "dhaka"
                          ? "border-[#0265FF] bg-[#0265FF] text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {deliveryArea === "dhaka" && (
                        <FiCheck className="w-3 h-3 stroke-3" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        ঢাকা ভেতরে
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0265FF] bg-white px-2 py-1 rounded-lg border border-blue-200/70 font-number">
                    ৳{toBanglaNumber(PRODUCT_INFO.deliveryDhaka)}
                  </span>
                </button>

                {/* Outside Dhaka */}
                <button
                  type="button"
                  onClick={() => setDeliveryArea("outside")}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    deliveryArea === "outside"
                      ? "bg-blue-50/50 border-[#0265FF] shadow-xs"
                      : "bg-white border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                        deliveryArea === "outside"
                          ? "border-[#0265FF] bg-[#0265FF] text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {deliveryArea === "outside" && (
                        <FiCheck className="w-3 h-3 stroke-3" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        ঢাকার বাইরে
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0265FF] bg-white px-2 py-1 rounded-lg border border-blue-200/70 font-number">
                    ৳{toBanglaNumber(PRODUCT_INFO.deliveryOutside)}
                  </span>
                </button>
              </div>

              {/* Order Summary Calculations */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-sm">
                <div className="flex justify-between items-center text-slate-600">
                  <span>পণ্যের মূল্য (<span className="font-number">{toBanglaNumber(quantity)}</span> পিস):</span>
                  <div className="flex items-center gap-2 font-number">
                    <span className="text-xs text-slate-400 line-through">
                      ৳{toBanglaNumber(regularTotal)}
                    </span>
                    <span className="font-bold text-slate-900">
                      ৳{toBanglaNumber(itemsTotal)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-slate-600">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-semibold text-slate-900 font-number">
                    ৳{toBanglaNumber(deliveryCharge)}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex justify-between items-center text-base sm:text-lg font-bold text-slate-900">
                  <span>সর্বমোট প্রদেয় বিল:</span>
                  <span className="text-xl sm:text-2xl font-black text-[#0265FF] font-number">
                    ৳{toBanglaNumber(grandTotal)}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Bangla Checkout Form */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <div className="mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-[#0265FF] text-xs flex items-center justify-center font-bold font-number">৩</span>
                  <span>ডেলিভারি তথ্য দিন</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  সঠিক নাম, মোবাইল নম্বর ও ঠিকানা পূরণ করুন
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="customer-name"
                    className="block text-xs sm:text-sm font-bold text-slate-800"
                  >
                    আপনার নাম <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <FiUser className="w-4 h-4" />
                    </div>
                    <input
                      id="customer-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="যেমন: মোঃ সাকিব হাসান"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50/50 border text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0265FF] focus:bg-white transition-all ${
                        errors.name
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-slate-200/90"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <FiAlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="customer-phone"
                    className="block text-xs sm:text-sm font-bold text-slate-800"
                  >
                    মোবাইল নম্বর <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <FiPhone className="w-4 h-4" />
                    </div>
                    <input
                      id="customer-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="১১ ডিজিটের নম্বর (যেমন: 017XXXXXXXX)"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50/50 border text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0265FF] focus:bg-white transition-all ${
                        errors.phone
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-slate-200/90"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <FiAlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="customer-address"
                    className="block text-xs sm:text-sm font-bold text-slate-800"
                  >
                    সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 flex items-center pointer-events-none text-slate-400">
                      <FiMapPin className="w-4 h-4" />
                    </div>
                    <textarea
                      id="customer-address"
                      name="address"
                      rows={2}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="জেলা, থানা, রোড নং ও বাসার নম্বর লিখুন"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50/50 border text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0265FF] focus:bg-white transition-all resize-none ${
                        errors.address
                          ? "border-red-500 ring-1 ring-red-500"
                          : "border-slate-200/90"
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <FiAlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.address}</span>
                    </p>
                  )}
                </div>

                {/* Submit CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0265FF] hover:bg-[#0052CC] disabled:opacity-75 text-white text-base sm:text-lg font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                        <span>অর্ডার প্রসেস হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <FiShoppingBag className="w-5 h-5" />
                        <span>
                          অর্ডার কনফার্ম করুন — <span className="font-number">৳{toBanglaNumber(grandTotal)}</span>
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Security Guarantee Strip */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-500 text-center">
                  <span className="flex items-center gap-1">
                    <FiShield className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-number font-bold">১০০%</span> নিরাপদ ক্যাশ অন ডেলিভারি
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <FiPackage className="w-3.5 h-3.5 text-[#0265FF]" />
                    পণ্য দেখে মূল্য পরিশোধ
                  </span>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OrderSection;
