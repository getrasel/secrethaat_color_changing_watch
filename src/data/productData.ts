import blackWatchImg from '../assets/blackwatch.webp';
import blueWatchImg from '../assets/blue_watch.webp';
import grayWatchImg from '../assets/gray_watch.webp';

import type { ProductColor } from '../types';

export const PRODUCT_INFO = {
  name: "Charles Delon Color-Changing Dial Watch",
  nameBangla: "চার্লস ডেলন কালার চেঞ্জিং ডায়াল ওয়াচ",
  tagline: "আলো পড়লেই রঙ বদলায়! সাধারণ ঘড়ির ভিড়ে আপনার লুক হোক আলাদা",
  regularPrice: 1290,
  basePrice: 890,
  deliveryDhaka: 70,
  deliveryOutside: 130,
};

export const COLOR_VARIANTS: ProductColor[] = [
  {
    id: "black",
    name: "ব্ল্যাক স্ট্র্যাপ (Black Strap)",
    nameEn: "Black Strap",
    hex: "#0F172A",
    badgeBg: "bg-slate-100 text-slate-800 border-slate-300",
    image: blackWatchImg,
  },
  {
    id: "blue",
    name: "ব্লু স্ট্র্যাপ (Blue Strap)",
    nameEn: "Blue Strap",
    hex: "#2563EB",
    badgeBg: "bg-sky-100 text-sky-800 border-sky-200",
    image: blueWatchImg,
  },
  {
    id: "gray",
    name: "গ্রে স্ট্র্যাপ (Gray Strap)",
    nameEn: "Gray Strap",
    hex: "#64748B",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
    image: grayWatchImg,
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
