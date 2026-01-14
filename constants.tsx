
import { ServiceDetail, Testimonial, ServiceType } from './types';

export interface TrendingStory {
  id: string;
  title: string;
  image: string;
  category: string;
}

export const TRENDING_STORIES: TrendingStory[] = [
  {
    id: '1',
    title: 'Dirty home on weekends? Hard pass.',
    category: 'Water Heaters',
    image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    title: 'Professional cleaning, zero stress..',
    category: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '3',
    title: 'Deep cleaning tips for busy homeowners',
    category: 'Cleaning',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=400'
  },

  {
    id: '1',
    title: 'Dirty home on weekends? Hard pass.',
    category: 'Home Cleaning',
    image: '/images/trending/image1.jpg'
  },
  {
    id: '2',
    title: 'Professional cleaning, zero stress.',
    category: 'Home Care',
    image: '/images/trending/image2.jpg'
  },
  {
    id: '3',
    title: 'Deep cleaning for busy homeowners.',
    category: 'Cleaning',
    image: '/images/trending/image3.jpg'
  }

];




export const SERVICES: ServiceDetail[] = [
  {
    id: 'Cleaning',
    title: 'Cleaning',
    description: 'Deep cleaning for every corner of your home using premium equipment.',
    startingPrice: 1999,
    icon: 'Sparkles',
    packages: [
      { 
        id: 'cl-full', 
        name: 'Full house cleaning', 
        price: 1999, 
        image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=400',
        description: 'Complete cleaning for all rooms', 
        features: ['Kitchen degreasing', 'Bathroom disinfection', 'Floor scrubbing'] 
      },
      { 
        id: 'cl-bath', 
        name: 'Bathroom cleaning', 
        price: 499, 
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=60&w=300',
        description: 'Deep scrub and disinfection', 
        features: ['Tile scrubbing', 'Tap descaling', 'Sanitization'] 
      },
      { 
        id: 'cl-kitchen', 
        name: 'Kitchen cleaning', 
        price: 999, 
        image: 'https://images.unsplash.com/photo-1556911220-e15224bbff9f?auto=format&fit=crop&q=60&w=300',
        description: 'Removing grease and oil stains', 
        features: ['Chimney cleaning', 'Cabinet degreasing', 'Tile polishing'] 
      },
      { 
        id: 'cl-sofa', 
        name: 'Sofa, Carpet & Mattress Cleaning', 
        price: 799, 
        image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=60&w=300',
        description: 'Shampooing and sanitizing upholstery', 
        features: ['Vacuuming', 'Deep shampooing', 'Drying'] 
      },
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
        id: 'pc-gen', 
        name: 'Pest Control', 
        price: 899, 
        image: 'https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?auto=format&fit=crop&q=60&w=300',
        description: 'General pests treatment', 
        features: ['Ants', 'Spiders', 'Silverfish'] 
      },
      { 
        id: 'pc-cockroach', 
        name: 'Cockroach Control', 
        price: 899, 
        image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&q=60&w=300',
        description: 'Targeted gel treatment', 
        features: ['Gel application', 'Spray treatment'] 
      },
      { 
        id: 'pc-bedbug', 
        name: 'Bed Bug Control', 
        price: 1499, 
        image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=60&w=300',
        description: 'Two-stage thorough treatment', 
        features: ['Steam treatment', 'Chemical spray'] 
      },
      { 
        id: 'pc-rodent', 
        name: 'Rodent Control', 
        price: 1299, 
        image: 'https://images.unsplash.com/photo-1559132172-13b19089060b?auto=format&fit=crop&q=60&w=300',
        description: 'Traps and baiting', 
        features: ['Baiting stations', 'Glue traps'] 
      },
      { 
        id: 'pc-termite', 
        name: 'Termite Control', 
        price: 2499, 
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=60&w=300',
        description: 'Deep drilling protection', 
        features: ['Chemical barrier', 'Injection'] 
      },
    ]
  },
  {
    id: 'Painting',
    title: 'Painting',
    description: 'Professional finish with top-brand paints and dust-free execution.',
    startingPrice: 4999,
    icon: 'Paintbrush',
    packages: [
      { id: 'pt-fresh', name: 'Fresh Coat', price: 4999, image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&q=60&w=300', description: 'Standard repaint for walls', features: ['1 coat primer', '2 coats paint'] },
    ]
  },
  {
    id: 'Marble Polishing',
    title: 'Marble Polishing',
    description: 'Restore the mirror-like shine to your expensive flooring.',
    startingPrice: 3499,
    icon: 'Gem',
    packages: [
      { id: 'mp-basic', name: 'Standard Polish', price: 3499, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=60&w=300', description: 'Restore surface gloss', features: ['Buffing', 'Sealing'] },
    ]
  }
];




export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Ananya Sharma', location: 'Indiranagar', rating: 5, comment: 'The deep cleaning was phenomenal. Every corner sparkles!' },
  { id: 2, name: 'Rahul Verma', location: 'Koramangala', rating: 4.8, comment: 'Pest control was very professional and odorless. Highly recommended.' },
  { id: 3, name: 'Sneha Rao', location: 'Whitefield', rating: 5, comment: 'My marble floor looks brand new again. Exceptional work by the team.' },
];

export const SERVICE_AREAS = [
  'Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Jayanagar', 'MG Road', 'JP Nagar', 'Electronic City', 'Malleshwaram', 'Hebbal', 'Yelahanka', 'Bannerghatta'
];

export const LOCATION_RECOMMENDATIONS: Record<string, ServiceType[]> = {
  'Indiranagar': ['Cleaning', 'Painting'],
  'Whitefield': ['Pest Control', 'Marble Polishing'],
  'Koramangala': ['Cleaning', 'Pest Control'],
  'Electronic City': ['Pest Control', 'Cleaning'],
  'HSR Layout': ['Painting', 'Cleaning'],
  'Hebbal': ['Marble Polishing', 'Painting'],
  'Jayanagar': ['Cleaning', 'Marble Polishing']
};

export const getRecommendedForLocation = (loc: string): ServiceType[] => {
  const normalized = loc.split(',')[0].trim();
  return LOCATION_RECOMMENDATIONS[normalized] || ['Cleaning'];
};
