import spaceBlueImg from '../assets/astronaut_clock.jpg';
import cuteOrangeImg from '../assets/clock_lamp.jpg';
import snowWhiteImg from '../assets/white_clock.jpg';

import type { ProductColor } from '../types';

export const PRODUCT_INFO = {
  name: "2-in-1 Astronaut Reading Lamp & Alarm Clock",
  nameBangla: "২-ইন-১ অ্যাস্ট্রোনাট রিডিং ল্যাম্প ও অ্যালার্ম ঘড়ি",
  tagline: "পড়ার টেবিলে মহাকাশের ছোঁয়া",
  regularPrice: 1150,
  basePrice: 830,
  deliveryDhaka: 70,
  deliveryOutside: 130,
};

export const COLOR_VARIANTS: ProductColor[] = [
  {
    id: "blue",
    name: "স্পেস ব্লু (Space Blue)",
    nameEn: "Space Blue",
    hex: "#0284C7",
    badgeBg: "bg-sky-100 text-sky-800 border-sky-200",
    image: spaceBlueImg,
  },
  {
    id: "orange",
    name: "কিউট অরেঞ্জ (Cute Orange)",
    nameEn: "Cute Orange",
    hex: "#EA580C",
    badgeBg: "bg-orange-100 text-orange-800 border-orange-200",
    image: cuteOrangeImg,
  },
  {
    id: "white",
    name: "স্নো হোয়াইট (Snow White)",
    nameEn: "Snow White",
    hex: "#E2E8F0",
    badgeBg: "bg-slate-100 text-slate-800 border-slate-200",
    image: snowWhiteImg,
  },
];

// Helper to convert English numbers to Bangla digits
export const toBanglaNumber = (num: number | string): string => {
  const banglaDigits: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };
  return String(num).replace(/[0-9]/g, (match) => banglaDigits[match] || match);
};
