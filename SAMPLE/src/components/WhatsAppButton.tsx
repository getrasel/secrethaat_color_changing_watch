import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = "8801746867350";
  const displayPhone = "+8801746867350";
  const message =
    "হ্যালো, আমি 2-in-1 Rechargeable Double Light Torch & Reading Lamp সম্পর্কে বিস্তারিত জানতে ও অর্ডার করতে চাই।";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <aside
      aria-label="হোয়াটসঅ্যাপে যোগাযোগ"
      className="fixed bottom-[84px] md:bottom-6 right-4 sm:right-6 z-40 transition-all duration-300"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 transition-all duration-300 transform hover:scale-105 active:scale-95"
        aria-label={`হোয়াটসঅ্যাপে যোগাযোগ করুন: ${displayPhone}`}
      >
        <FaWhatsapp className="w-7 h-7 text-white" />

        {/* Live Notification Indicator Pulse */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-white rounded-full border-2 border-[#25D366] flex items-center justify-center">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
        </span>
      </a>
    </aside>
  );
};

export default WhatsAppButton;
