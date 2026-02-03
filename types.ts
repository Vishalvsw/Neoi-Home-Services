
export type ServiceType = 'Cleaning' | 'Pest Control' | 'Painting' | 'Marble Polishing' | 'Salon' | 'Plumbing' | 'Repair';

export interface PricingOption {
  id: string;
  label: string;
  price: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  rating?: number;
  reviewCount?: number;
  duration?: string;
  optionsCount?: number;
  options?: PricingOption[];
  heroImage?: string;
  subCategory?: string;
  includeSections?: {
    title: string;
    items: string[];
  }[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  icon: string;
  packages: PricingPackage[];
}

export interface Story {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
}

export interface CartItem {
  id: string;
  packageName: string;
  serviceTitle: string;
  price: number;
  optionLabel?: string;
}

export interface BookingInfo {
  name: string;
  phone: string;
  location: string;
  address: string;
  date: string;
  time: string;
}

export interface Order {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  price: number;
  address: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  savedAddresses: string[];
}
