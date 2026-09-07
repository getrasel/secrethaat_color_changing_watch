export interface ProductColor {
  id: string;
  name: string;
  nameEn: string;
  hex: string;
  badgeBg: string;
  image: string;
}

export interface OrderState {
  selectedColor: string;
  quantity: number;
  customerName: string;
  phoneNumber: string;
  fullAddress: string;
  deliveryArea: 'dhaka' | 'outside' | 'dhaka_inside' | 'dhaka_outside';
  notes?: string;
}
