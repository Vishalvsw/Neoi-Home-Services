
import { ServiceDetail, Testimonial, Order, UserProfile, PricingPackage, Story, PricingOption } from './types';

export const MOST_BOOKED: PricingPackage[] = [
  { id: 'mb-1', name: 'Painting', price: 250, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400', description: '', features: [] },
  { id: 'mb-2', name: 'Bathroom Cleaning', price: 499, image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=400', description: '', features: [] },
  { id: 'mb-3', name: 'Pest control', price: 299, image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400', description: '', features: [] },
  { id: 'mb-4', name: 'Marble Polishing', price: 350, image: 'https://images.unsplash.com/photo-1504148455328-c39695715583?auto=format&fit=crop&q=80&w=400', description: '', features: [] },
];

export const TRENDING_STORIES: Story[] = [
  { id: 'st-1', title: 'Cold showers in winter? Hard pass', category: 'Home Maintenance & Repair', image: 'https://images.unsplash.com/photo-1585129777188-94600bc7b4b3?auto=format&fit=crop&q=80&w=400' },
  { id: 'st-2', title: 'Winter Home Repairs & Waterproofing', category: 'Home Maintenance & Repair', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400' },
  { id: 'st-3', title: 'Top 7 Signs Your Electrical Wiring Needs Attention', category: 'Electronic & Appliance Services', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400' },
  { id: 'st-4', title: 'Festive Home Facts You Didn\'t Know', category: 'Interior Design, Painting & Decor', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400' },
];

const APARTMENT_OPTIONS: PricingOption[] = [
  { id: 'opt-1', label: '1 BHK', price: 3699 },
  { id: 'opt-2', label: '2 BHK', price: 4199 },
  { id: 'opt-3', label: '3 BHK', price: 5199 },
  { id: 'opt-4', label: '4 BHK', price: 6199 },
  { id: 'opt-5', label: '5 BHK', price: 7199 },
];

const BUNGALOW_OPTIONS: PricingOption[] = [
  { id: 'bopt-1', label: 'Small Villa (2 BHK)', price: 5499 },
  { id: 'bopt-2', label: 'Medium Villa (3 BHK)', price: 7499 },
  { id: 'bopt-3', label: 'Large Villa (4 BHK)', price: 9499 },
  { id: 'bopt-4', label: 'Ultra Villa (5+ BHK)', price: 12499 },
];

// Re-using the same options structure for consistent pricing
const ROOM_OPTIONS = [{ id: 'rb-1', label: '1 Room', price: 899 }, { id: 'rb-2', label: '2 Rooms', price: 1599 }];
const LIVING_OPTIONS = [{ id: 'lr-1', label: 'Standard', price: 1299 }, { id: 'lr-2', label: 'Large', price: 1999 }];
const BATHROOM_OPTIONS = [{ id: 'bt-1', label: '1 Bathroom', price: 499 }, { id: 'bt-2', label: '2 Bathrooms', price: 899 }, { id: 'bt-3', label: '3 Bathrooms', price: 1199 }];

export const APARTMENT_CLEANING: PricingPackage[] = [
  { 
    id: 'apt-1', 
    name: 'Furnished Apartment - Full Home Cleaning', 
    price: 3699, 
    duration: '3 hrs 45 mins',
    rating: 4.9,
    reviewCount: 1192,
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=600', 
    description: '', 
    features: ['Deep cleaning for all rooms, kitchen & bathrooms', 'Machine floor scrubbing + wall dusting'],
    options: APARTMENT_OPTIONS,
    includeSections: [{ title: "What's Included", items: ["Deep cleaning of all furniture surfaces", "Machine floor scrubbing and polishing", "Bathroom deep cleaning (taps, tiles, WC)", "Kitchen degreasing and external cabinet cleaning", "Window panes, meshes, and channels cleaning"] }]
  },
  { 
    id: 'apt-2', 
    name: 'Unfurnished Apartment - Full Home Cleaning', 
    price: 3499, 
    duration: '3 hrs',
    rating: 4.9,
    reviewCount: 1066,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600', 
    description: '', 
    features: ['Full home cleaning with machine scrubbing', 'Perfect for move-in, move-out & pre-occupancy'],
    options: APARTMENT_OPTIONS.map(o => ({...o, price: o.price - 200})),
    includeSections: [{ title: "Highlights", items: ["Intensive floor scrubbing", "Wall & ceiling dusting", "Window track cleaning", "Sanitization of empty spaces"] }]
  },
  { 
    id: 'bung-1', 
    name: 'Furnished Bungalow/Duplex - Full Home Cleaning', 
    price: 5499, 
    duration: '6 hrs',
    rating: 4.8,
    reviewCount: 845,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', 
    description: '', 
    features: ['Multi-level deep cleaning', 'Exterior patio and balcony sweeping included'],
    options: BUNGALOW_OPTIONS,
    includeSections: [{ title: "Deep Care", items: ["Staircase deep scrubbing", "Railing polishing", "Upholstery vacuuming", "Exhaust & fan cleaning"] }]
  },
  { 
    id: 'bung-2', 
    name: 'Unfurnished Bungalow/Duplex - Full Home Cleaning', 
    price: 4999, 
    duration: '5 hrs',
    rating: 4.7,
    reviewCount: 612,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=600', 
    description: '', 
    features: ['Intensive floor scrubbing', 'Ideal for renovation cleanup'],
    options: BUNGALOW_OPTIONS.map(o => ({...o, price: o.price - 500})),
    includeSections: [{ title: "What’s Included", items: ['Intensive floor scrubbing for all rooms', 'Dusting of all surfaces and fixtures', 'Window pane cleaning', 'Deep cleaning of bathrooms', 'Kitchen sanitization and degreasing'] }]
  },
  { 
    id: 'room-1', 
    name: 'Furnished Bedroom Cleaning', 
    price: 899, 
    duration: '1 hr',
    rating: 4.9,
    reviewCount: 2450,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600', 
    description: '', 
    features: ['Furniture dusting & polishing', 'Mattress vacuuming', 'Floor mopping'],
    options: ROOM_OPTIONS,
    includeSections: [{ title: "Bedroom Focus", items: ["Bed frame wiping", "Wardrobe exterior cleaning", "Fan & light fixture dusting", "Mirror polishing"] }]
  },
  { 
    id: 'room-2', 
    name: 'Unfurnished Bedroom Cleaning', 
    price: 699, 
    duration: '45 mins',
    rating: 4.8,
    reviewCount: 1890,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600', 
    description: '', 
    features: ['Complete floor and wall dusting', 'Window cleaning'],
    options: ROOM_OPTIONS.map(o => ({...o, price: o.price - 200})),
    includeSections: [{ title: "Essentials", items: ["Deep floor scrubbing", "Window track cleaning", "Cobweb removal"] }]
  },
  { 
    id: 'room-3', 
    name: 'Furnished Living Room Cleaning', 
    price: 1299, 
    duration: '1.5 hrs',
    rating: 4.9,
    reviewCount: 3200,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600', 
    description: '', 
    features: ['Sofa & upholstery vacuuming', 'Entertainment unit cleaning', 'Floor scrubbing'],
    options: LIVING_OPTIONS,
    includeSections: [{ title: "Lounge Care", items: ["Sofa dry vacuuming", "Carpet cleaning", "TV unit dusting", "Floor buffing"] }]
  },
  { 
    id: 'room-4', 
    name: 'Unfurnished Living Room Cleaning', 
    price: 999, 
    duration: '1 hr',
    rating: 4.8,
    reviewCount: 1450,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600', 
    description: '', 
    features: ['Deep floor cleaning', 'Baseboard wiping'],
    options: LIVING_OPTIONS.map(o => ({...o, price: o.price - 300})),
    includeSections: [{ title: "Space Prep", items: ["Mechanical floor scrubbing", "Window & balcony cleaning", "Switchboard wiping"] }]
  },
  { 
    id: 'room-5', 
    name: 'Bathroom Cleaning', 
    price: 499, 
    duration: '1 hr',
    rating: 4.9,
    reviewCount: 15600,
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=600', 
    description: '', 
    features: ['Wet cleaning fixtures', 'Stain removal on fittings', 'Deep tile cleaning', 'Surface sanitization'],
    options: BATHROOM_OPTIONS,
    includeSections: [
      {
        title: "What's Included",
        items: [
          "Wet cleaning fixtures",
          "Stain removal on fittings",
          "Deep tile cleaning",
          "Surface sanitization"
        ]
      }
    ]
  },
];

export const BUNGALOW_CLEANING: PricingPackage[] = [
  APARTMENT_CLEANING[2], // Furnished Bungalow
  APARTMENT_CLEANING[3], // Unfurnished Bungalow
];

export const BY_ROOM_CLEANING: PricingPackage[] = [
  APARTMENT_CLEANING[4], // Furnished Bedroom
  APARTMENT_CLEANING[5], // Unfurnished Bedroom
  APARTMENT_CLEANING[6], // Furnished Living Room
  APARTMENT_CLEANING[7], // Unfurnished Living Room
  APARTMENT_CLEANING[8], // Bathroom Cleaning
];

// --- Painting Service Data ---
const PAINTING_SIZE_OPTIONS: PricingOption[] = [
  { id: 'p-1bhk', label: '1 BHK', price: 8999 },
  { id: 'p-2bhk', label: '2 BHK', price: 15999 },
  { id: 'p-3bhk', label: '3 BHK', price: 22999 },
  { id: 'p-4bhk', label: '4 BHK', price: 29999 },
];

export const FULL_HOME_PAINTING: PricingPackage[] = [
  { 
    id: 'paint-1', 
    name: 'Standard Interior Painting', 
    price: 8999, 
    duration: '3-4 Days',
    rating: 4.9,
    reviewCount: 840,
    image: 'https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=600', 
    description: 'Reliable interior painting with standard emulsion.', 
    features: ['Double coat of premium emulsion', 'Basic crack filling & wall sanding', 'Protection for furniture & flooring'],
    options: PAINTING_SIZE_OPTIONS,
    includeSections: [{ title: "Process", items: ["Furniture masking", "Sanding & putty work", "Primer application", "Double coat paint", "Final cleanup"] }]
  },
  { 
    id: 'paint-2', 
    name: 'Luxury Interior Painting', 
    price: 12999, 
    duration: '5-6 Days',
    rating: 4.9,
    reviewCount: 520,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600', 
    description: 'High-end finish with luxury silk emulsion.', 
    features: ['Luxury silk/stain-resistant finish', 'Precision masking & detailing', 'Complimentary site measurement'],
    options: PAINTING_SIZE_OPTIONS.map(o => ({...o, price: Math.round(o.price * 1.5)})),
    includeSections: [{ title: "Benefits", items: ["Ultra-smooth finish", "Stain resistant walls", "5-year warranty on workmanship"] }]
  },
];

export const ROOM_PAINTING: PricingPackage[] = [
  { 
    id: 'rpaint-1', 
    name: 'Single Room Painting', 
    price: 3499, 
    duration: '1 Day',
    rating: 4.8,
    reviewCount: 1250,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600', 
    description: 'Quick refresh for any single room.', 
    features: ['All 4 walls + Ceiling included', 'Fast 1-day completion'],
    options: [{ id: 'rp-1', label: 'Small Room', price: 3499 }, { id: 'rp-2', label: 'Standard Room', price: 4499 }, { id: 'rp-3', label: 'Master Suite', price: 5999 }]
  },
];

export const WATERPROOFING: PricingPackage[] = [
  { 
    id: 'wp-1', 
    name: 'Terrace Waterproofing', 
    price: 7999, 
    duration: '2-3 Days',
    rating: 4.7,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1504148455328-c39695715583?auto=format&fit=crop&q=80&w=600', 
    description: 'Stop leaks before they start.', 
    features: ['Crack filling with fiber mesh', 'Triple coat of elastic membrane', 'UV resistant finish'],
    options: [{ id: 'wp-t1', label: 'Small Terrace', price: 7999 }, { id: 'wp-t2', label: 'Full Terrace', price: 14999 }]
  },
];

export const CLEANING_PACKAGES: PricingPackage[] = [
  { id: 'cp-1', name: 'Full house cleaning', price: 2599, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400', description: 'Deep cleaning for the entire residence.', features: [] },
  { id: 'cp-2', name: 'Bathroom cleaning', price: 499, image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=400', description: 'Anti-bacterial cleaning for restrooms.', features: [] },
  { id: 'cp-3', name: 'Kitchen cleaning', price: 799, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400', description: 'Degreasing and surface sanitization.', features: [] },
  { id: 'cp-4', name: 'Sofa, Carpet & Mattress Cleaning', price: 999, image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=400', description: 'Fabric shampooing and vacuuming.', features: [] },
];

export const PEST_PACKAGES: PricingPackage[] = [
  { id: 'pc-1', name: 'Pest Control', price: 799, image: 'https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=400', description: 'General pest management.', features: [] },
  { id: 'pc-2', name: 'Cockroach Control', price: 899, image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=400', description: 'Gel-based cockroach treatment.', features: [] },
  { id: 'pc-3', name: 'Bed Bug Control', price: 1299, image: 'https://images.unsplash.com/photo-1620311394132-211514757530?auto=format&fit=crop&q=80&w=400', description: 'Intensive bed bug extermination.', features: [] },
  { id: 'pc-4', name: 'Rodent Control', price: 1099, image: 'https://images.unsplash.com/photo-1602492233682-108a78635447?auto=format&fit=crop&q=80&w=400', description: 'Trap and bait solution for rats.', features: [] },
  { id: 'pc-5', name: 'Termite Control', price: 2499, image: 'https://images.unsplash.com/photo-1610444583737-9f13fc60b08d?auto=format&fit=crop&q=80&w=400', description: 'Wall injection termite protection.', features: [] },
];

export const SERVICES: ServiceDetail[] = [
  {
    id: 'Cleaning',
    title: 'Cleaning & Pest Services',
    description: 'Industrial-grade hygiene solutions.',
    startingPrice: 599,
    icon: 'Sparkles',
    packages: [...CLEANING_PACKAGES, ...PEST_PACKAGES]
  }
];

export const SERVICE_AREAS = [
  'Bangalore', 'Chennai', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi', 'Ahmedabad', 'Kolkata', 'Coimbatore', 'Gurgaon', 'Jaipur', 'Kochi'
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    serviceName: 'Full Home Cleaning',
    date: '2024-11-25',
    time: '10:00 AM',
    status: 'Confirmed',
    price: 3499,
    address: 'Flat 402, Sunshine Apartments, Indiranagar'
  }
];

export const MOCK_USER: UserProfile = {
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  email: 'rahul.sharma@example.com',
  savedAddresses: [
    'Flat 402, Sunshine Apartments, Indiranagar, Bangalore - 560038'
  ]
};
