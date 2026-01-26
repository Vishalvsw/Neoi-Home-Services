
export type ServiceType = 'Cleaning' | 'Pest Control' | 'Painting' | 'Marble Polishing';

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

export type LeadStatus = 'New' | 'Contacted' | 'Site Visit' | 'Quoted' | 'Won' | 'Lost';

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Lead {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  serviceType: string;
  status: LeadStatus;
  createdAt: string;
  notes: LeadNote[];
  totalValue: number;
  address: string;
  assignedAgentId?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  activeLeads: number;
  role: string;
}
