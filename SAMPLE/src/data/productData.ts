import doubleLightImg from "../assets/images/double__flashlight/double_light.webp";
import flashlightImg from "../assets/images/double__flashlight/flashlight.webp";
import flashlightOutsideImg from "../assets/images/double__flashlight/flashlight_outside.webp";
import niceLightImg from "../assets/images/double__flashlight/nice_light.webp";

import type {
  ProductColor,
  GalleryItem,
  BenefitItem,
  FeatureSpec,
  TestimonialItem,
  FAQItem,
} from "../types";

export const PRODUCT_INFO = {
  name: "2-in-1 Rechargeable Double Light Torch & Reading Lamp",
  nameBangla: "২-ইন-১ রিচার্জেবল ডাবল লাইট টর্চ ও রিডিং ল্যাম্প",
  tagline: "যেখানেই প্রয়োজন সেখানেই আলো",
  subTagline:
    "শক্তিশালী টর্চ ও চারপাশে ছড়ানো ল্যাম্প—দুটি আলোর সুবিধা এক ডিভাইসে।",
  intro:
    "ঘরের লোডশেডিং থেকে শুরু করে পড়াশোনা, ক্যাম্পিং কিংবা ট্রাভেলিং—প্রয়োজনের মুহূর্তে নির্ভরযোগ্য আলো হাতের কাছেই।",
  offerHeadline: "প্রয়োজনের আলো থাকুক হাতের কাছেই।",
  offerSubtitle:
    "ঘর, পড়াশোনা, ক্যাম্পিং কিংবা ট্রাভেলিং—প্রয়োজনের মুহূর্তে প্রস্তুত থাকুক আপনার আলো।",
  regularPrice: 1190,
  basePrice: 720,
  discountAmount: 470,
  discountPercentage: 39,
  deliveryDhaka: 70,
  deliveryOutside: 130,
};

export const COLOR_VARIANTS: ProductColor[] = [
  {
    id: "black",
    name: "ক্ল্যাসিক ব্ল্যাক",
    nameEn: "Classic Black",
    hex: "#18181B",
    badgeBg: "bg-zinc-100 text-zinc-800 border-zinc-200",
    image: niceLightImg,
  },
  {
    id: "green",
    name: "এমারেল্ড গ্রিন",
    nameEn: "Emerald Green",
    hex: "#065F46",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
    image: flashlightOutsideImg,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "২-ইন-১ কমপ্লিট লুক",
    caption: "লং-রেঞ্জ টর্চ লাইট + চারপাশে ছড়ানো ল্যাম্প",
    image: niceLightImg,
    category: "মেইন লুক",
  },
  {
    id: "2",
    title: "লং-রেঞ্জ ফোকাসড টর্চ",
    caption:
      "শক্তিশালী Long-range Torch Light দূরের জায়গাতেও পরিষ্কার ও ফোকাসড আলো দেয়",
    image: flashlightImg,
    category: "টর্চ লাইট",
  },
  {
    id: "3",
    title: "মাল্টি-ইউজ জরুরি লাইট",
    caption:
      "Soft Camping/Lantern Mode ও ডাবল সাইড লাইট যা ঘর বা ক্যাম্পিংয়ে আলো ছড়ায়",
    image: doubleLightImg,
    category: "ডাবল লাইট",
  },
  {
    id: "4",
    title: "ইউএসবি রিচার্জেবল পোর্ট",
    caption: "Built-in Lithium Battery ও সহজ USB রিচার্জিং সুবিধা",
    image: flashlightOutsideImg,
    category: "রিচার্জেবল",
  },
];

export const PRODUCT_BENEFITS: BenefitItem[] = [
  {
    id: 1,
    title: "ডুয়েল লাইটিং",
    description:
      "ফোকাসড Long-range Torch এবং Soft Camping/Lantern Light—দুটি আলোর সুবিধা একসাথে।",
    iconName: "lamp",
    tag: "01 — ডুয়েল লাইটিং",
  },
  {
    id: 2,
    title: "বহুমুখী ব্যবহার",
    description:
      "ঘর, পড়ার টেবিল, ক্যাম্পিং কিংবা ট্রাভেলিং—বিভিন্ন পরিস্থিতিতে সহজেই ব্যবহার করা যায়।",
    iconName: "multipurpose",
    tag: "02 — বহুমুখী ব্যবহার",
  },
  {
    id: 3,
    title: "সহজ ডুয়েল কন্ট্রোল",
    description:
      "দুটি আলাদা বাটনের মাধ্যমে টর্চ ও ল্যাম্প মোড আলাদাভাবে নিয়ন্ত্রণ করুন।",
    iconName: "zap",
    tag: "03 — ডুয়েল কন্ট্রোল",
  },
  {
    id: 4,
    title: "শক্তিশালী আলো, প্রয়োজনের জায়গায়",
    description:
      "শক্তিশালী Long-range Torch Light দূরের জায়গাতেও পরিষ্কার ও ফোকাসড আলো দিতে সাহায্য করে।",
    iconName: "sparkles",
    tag: "ফোকাসড টর্চ",
  },
  {
    id: 5,
    title: "চারপাশে ছড়ানো নরম আলো",
    description:
      "Soft Camping/Lantern Mode চারপাশে আলো ছড়িয়ে দেয়, যা পড়াশোনা, ঘরের কর্নার কিংবা ক্যাম্পিংয়ের জন্য উপযোগী।",
    iconName: "home",
    tag: "ক্যাম্পিং ল্যাম্প",
  },
  {
    id: 6,
    title: "রিচার্জ করুন। বারবার ব্যবহার করুন।",
    description:
      "Built-in Lithium Battery থাকার কারণে আলাদা ব্যাটারি কেনার ঝামেলা নেই। USB Port, পাওয়ার ব্যাংক কিংবা মোবাইল চার্জার ব্যবহার করে সহজেই রিচার্জ করা যায়।",
    iconName: "battery",
    tag: "USB রিচার্জেবল",
  },
];

export const PRODUCT_SPECS: FeatureSpec[] = [
  {
    label: "পণ্যের নাম",
    value: "2-in-1 Rechargeable Double Light Torch & Reading Lamp",
    icon: "tag",
    highlight: true,
  },
  {
    label: "পণ্যের ধরন",
    value: "2-in-1 Rechargeable Torch & Lamp",
    icon: "layers",
    highlight: true,
  },
  {
    label: "লাইটিং মোড",
    value: "Long-range Torch + Camping/Lantern",
    icon: "zap",
    highlight: true,
  },
  {
    label: "কন্ট্রোল",
    value: "Dual Button Control",
    icon: "sliders",
    highlight: true,
  },
  {
    label: "ব্যাটারি",
    value: "Built-in Lithium Battery",
    icon: "battery",
  },
  {
    label: "চার্জিং",
    value: "USB Charging",
    icon: "zap",
  },
  {
    label: "ব্যবহার",
    value: "ঘর, পড়াশোনা, ক্যাম্পিং ও ট্রাভেলিং",
    icon: "home",
  },
  {
    label: "প্যাকেজে যা থাকছে",
    value:
      "১ × 2-in-1 Rechargeable Double Light Torch & Lamp, ১ × USB Charging Cable",
    icon: "box",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "ফারহানা ইসলাম",
    location: "মিরপুর, ঢাকা",
    rating: 5,
    date: "৩ দিন আগে",
    comment:
      "লোডশেডিংয়ের সময় ও পড়ার টেবিলে ব্যবহারের জন্য নিয়েছিলাম। টর্চের আলো বেশ দূরের জায়গাতেও স্পষ্ট আলো দেয় এবং ল্যাম্পের নরম আলো পড়ার জন্য আরামদায়ক।",
    colorPurchased: "ক্ল্যাসিক ব্ল্যাক (Classic Black)",
    avatarColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "t2",
    name: "তানভীর আহমেদ",
    location: "উত্তরা, ঢাকা",
    rating: 5,
    date: "১ সপ্তাহ আগে",
    comment:
      "এক ডিভাইসেই লং-রেঞ্জ টর্চ এবং ক্যাম্পিং ল্যাম্পের সুবিধা। আলাদা ব্যাটারির কোনো ঝামেলা নেই, ইউএসবি কেবল দিয়ে মোবাইল চার্জার বা পাওয়ার ব্যাংক থেকেই চার্জ দেওয়া যায়।",
    colorPurchased: "এমারেল্ড গ্রিন (Emerald Green)",
    avatarColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "t3",
    name: "নুসরাত জাহান",
    location: "জিইসি, চট্টগ্রাম",
    rating: 5,
    date: "২ সপ্তাহ আগে",
    comment:
      "দুটি আলাদা বাটনের মাধ্যমে টর্চ ও ল্যাম্প মোড আলাদাভাবে নিয়ন্ত্রণ করা যায়—এই ফিচারটা খুবই সহজ ও চমৎকার। ট্রাভেল ও ঘরের ব্যবহারের জন্য দারুণ!",
    colorPurchased: "ক্ল্যাসিক ব্ল্যাক (Classic Black)",
    avatarColor: "bg-amber-100 text-amber-700",
  },
  {
    id: "t4",
    name: "মাহমুদুল হাসান",
    location: "ধানমন্ডি, ঢাকা",
    rating: 5,
    date: "২ সপ্তাহ আগে",
    comment:
      "বিল্ট-ইন লিথিয়াম ব্যাটারি এবং ফোকাসড আলো। হঠাৎ বিদ্যুৎ চলে গেলে ঘরের চারপাশ আলোকিত করতে ল্যাম্প মোডটি দারুণ কাজ করে। ধন্যবাদ!",
    colorPurchased: "এমারেল্ড গ্রিন (Emerald Green)",
    avatarColor: "bg-zinc-100 text-zinc-700",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq1",
    question: "এই লাইটে কয়টি লাইটিং মোড রয়েছে?",
    answer: "দুটি—Long-range Torch এবং Soft Camping/Lantern Mode।",
  },
  {
    id: "faq2",
    question: "টর্চ ও ল্যাম্প কি আলাদাভাবে ব্যবহার করা যায়?",
    answer:
      "হ্যাঁ, দুটি আলাদা বাটনের মাধ্যমে টর্চ ও ল্যাম্প আলাদাভাবে নিয়ন্ত্রণ করা যায়।",
  },
  {
    id: "faq3",
    question: "কীভাবে চার্জ করতে হবে?",
    answer:
      "USB Port-এর মাধ্যমে মোবাইল চার্জার বা পাওয়ার ব্যাংক দিয়ে রিচার্জ করা যায়।",
  },
  {
    id: "faq4",
    question: "আলাদা ব্যাটারি লাগবে কি?",
    answer: "না, এতে Built-in Lithium Battery রয়েছে।",
  },
  {
    id: "faq5",
    question: "প্যাকেজে কী কী থাকছে?",
    answer:
      "একটি ২-ইন-১ রিচার্জেবল ডাবল লাইট টর্চ ও ল্যাম্প এবং একটি USB Charging Cable।",
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

