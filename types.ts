
export type ServiceType = 'Cleaning' | 'Pest Control' | 'Painting' | 'Marble Polishing';

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  image?: string; // Image for the sub-service representation
}

export interface ServiceDetail {
  id: ServiceType;
  title: string;
  description: string;
  startingPrice: number;
  icon: string;
  packages: PricingPackage[];
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
}

export interface BookingInfo {
  name: string;
  phone: string;
  location: string;
  address: string;
  date: string;
  time: string;
}
