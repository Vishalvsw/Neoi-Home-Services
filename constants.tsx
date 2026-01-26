
import { ServiceDetail, Testimonial, Order, UserProfile } from './types';

export const SERVICES: ServiceDetail[] = [
  {
    id: 'Cleaning',
    title: 'Cleaning',
    description: 'Deep cleaning for every corner of your home using premium equipment.',
    startingPrice: 1999,
    icon: 'Sparkles',
    packages: [
      { 
        id: 'cl-bath-std', 
        name: 'Bathroom Cleaning Services', 
        price: 599, 
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=60&w=400',
        heroImage: 'https://images.unsplash.com/photo-1620626011761-9963d7b69763?auto=format&fit=crop&q=80&w=1000',
        description: 'Quality Cleaning | Professional Care', 
        features: ['Perfect for removing stains, dirt & hard water marks.', 'Deep cleaning of floor & tiles for a fresh, shiny look'],
        rating: 4.6,
        reviewCount: 2081,
        duration: '60 mins',
        optionsCount: 5,
        options: [
          { id: 'opt1', label: '1 Bathroom', price: 599 },
          { id: 'opt2', label: '2 Bathrooms', price: 1099 },
          { id: 'opt3', label: '3 Bathrooms', price: 1599 }
        ]
      },
      { 
        id: 'cl-bath-move', 
        name: 'Move-in/Move-out Bathroom Cleaning', 
        price: 749, 
        image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=60&w=400',
        description: 'Extra-deep scrubbing for spotless tiles, fittings, and floors.', 
        features: ['Best before moving into a new home or vacating your old one', 'High-pressure steam cleaning included'],
        rating: 4.6,
        reviewCount: 2020,
        duration: '1 hr 30 mins',
        optionsCount: 5,
        options: [
          { id: 'opt1', label: '1 Bathroom', price: 749 },
          { id: 'opt2', label: '2 Bathrooms', price: 1399 }
        ]
      },
      { 
        id: 'cl-full', 
        name: 'Full house cleaning', 
        price: 1999, 
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=60&w=400',
        description: 'Complete cleaning for all rooms', 
        features: ['Kitchen degreasing', 'Bathroom disinfection', 'Floor scrubbing'],
        rating: 4.8,
        reviewCount: 5420,
        duration: '4-6 hours'
      }
    ]
  },
  {
    id: 'Pest Control',
    title: 'Pest Control',
    description: 'Eco-friendly and odorless solutions for a pest-free environment.',
    startingPrice: 899,
    icon: 'ShieldCheck',
    packages: [
      { 
        id: 'pc-cockroach', 
        name: 'Cockroach Control', 
        price: 899, 
        image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&q=60&w=400', 
        description: 'Targeted gel treatment', 
        features: ['Gel application', 'Spray treatment'],
        rating: 4.7,
        reviewCount: 1240,
        duration: '45 mins'
      }
    ]
  },
  {
    id: 'Painting',
    title: 'Painting',
    description: 'Professional finish with top-brand paints and dust-free execution.',
    startingPrice: 4999,
    icon: 'Paintbrush',
    packages: [
      { 
        id: 'pt-fresh', 
        name: 'Fresh Coat', 
        price: 4999, 
        image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&q=60&w=400', 
        description: 'Standard repaint for walls', 
        features: ['1 coat primer', '2 coats paint'],
        rating: 4.9,
        reviewCount: 850,
        duration: '2-3 days'
      }
    ]
  },
  {
    id: 'Marble Polishing',
    title: 'Marble Polishing',
    description: 'Restore the mirror-like shine to your expensive flooring.',
    startingPrice: 3499,
    icon: 'Gem',
    packages: [
      { 
        id: 'mp-basic', 
        name: 'Standard Polish', 
        price: 3499, 
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=60&w=400', 
        description: 'Restore surface gloss', 
        features: ['Buffing', 'Sealing'],
        rating: 4.8,
        reviewCount: 320,
        duration: '5 hours'
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Aditi Nair', location: 'Indiranagar', rating: 5, comment: 'Exceptional services. The team was punctual and very thorough.' },
  { id: 2, name: 'Vikram Joshi', location: 'Whitefield', rating: 5, comment: 'Professional repairs. Best in Bangalore.' },
  { id: 3, name: 'Sanya Mirza', location: 'HSR Layout', rating: 4, comment: 'Very effective and safe. My home is now perfect.' },
];

export const SERVICE_AREAS = [
  'Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Jayanagar', 'MG Road', 'JP Nagar', 'Electronic City'
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    serviceName: 'Bathroom Cleaning',
    date: '2024-11-25',
    time: '10:00 AM',
    status: 'Confirmed',
    price: 599,
    address: 'Flat 402, Sunshine Apartments, Indiranagar'
  },
  {
    id: 'ORD-1002',
    serviceName: 'Full House Cleaning',
    date: '2024-11-10',
    time: '09:00 AM',
    status: 'Completed',
    price: 1999,
    address: 'Flat 402, Sunshine Apartments, Indiranagar'
  }
];

export const MOCK_USER: UserProfile = {
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  email: 'rahul.sharma@example.com',
  savedAddresses: [
    'Flat 402, Sunshine Apartments, Indiranagar, Bangalore - 560038',
    'Office 12, Tech Park, Whitefield, Bangalore - 560066'
  ]
};

export const getRecommendedForLocation = (location: string) => {
  if (location.includes('Indiranagar')) return ['Cleaning', 'Marble Polishing'];
  if (location.includes('Whitefield')) return ['Painting', 'Pest Control'];
  return ['Cleaning', 'Pest Control'];
};
