export interface ProductColor {
  id: string;
  name: string;
  nameEn: string;
  hex: string;
  badgeBg: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  category: string;
}

export interface BenefitItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export interface FeatureSpec {
  label: string;
  value: string;
  icon: string;
  highlight?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  colorPurchased: string;
  avatarColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface OrderState {
  selectedColor: string;
  quantity: number;
  customerName: string;
  phoneNumber: string;
  fullAddress: string;
  deliveryArea: 'dhaka' | 'outside';
  notes?: string;
}
