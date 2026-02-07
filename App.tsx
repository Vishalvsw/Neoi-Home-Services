
import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ShoppingCart,
  ChevronDown,
  X,
  Trash2,
  Plus,
  ArrowLeft,
  Settings,
  Star,
  CheckCircle2,
  Home as HomeIcon,
  LayoutGrid,
  ClipboardList,
  User,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  LogOut,
  Search,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  ChevronRight,
  Paintbrush,
  Droplets,
  Gem,
  ShieldAlert,
  Palette,
  Minus,
  MessageSquare,
  BadgeCheck,
  Headphones,
  Tag
} from 'lucide-react';
import { SERVICES, SERVICE_AREAS, MOCK_ORDERS, MOCK_USER, MOST_BOOKED, TRENDING_STORIES, CLEANING_PACKAGES, PEST_PACKAGES, APARTMENT_CLEANING, BUNGALOW_CLEANING, BY_ROOM_CLEANING, FULL_HOME_PAINTING, ROOM_PAINTING, WATERPROOFING } from './constants';
import { CartItem, PricingPackage, ServiceDetail, PricingOption, BookingInfo, Order, UserProfile, Story } from './types';

// --- Sub-Category Grid Selection Modal ---
const VariantSelectionModal = ({ pkg, onClose, onSelect }: { pkg: PricingPackage; onClose: () => void; onSelect: (pkg: PricingPackage, opt: PricingOption) => void }) => {
  return (
    <div className="fixed inset-0 z-[6000] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 flex flex-col max-h-[90vh]">
        <div className="relative h-64 md:h-80 shrink-0">
          <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.name} />
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-slate-50 transition-all border border-slate-100 z-20"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>
        
        <div className="p-6 md:p-10 space-y-8 overflow-y-auto scrollbar-hide">
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
              {pkg.name}
            </h3>
            <div className="flex items-center gap-2">
              <Star size={18} className="fill-blue-600 text-blue-600" />
              <span className="text-sm font-bold text-slate-500">
                {pkg.rating} ({pkg.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {pkg.options?.map(opt => (
              <div 
                key={opt.id} 
                className="p-5 md:p-6 border border-slate-100 rounded-2xl flex flex-col items-center gap-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all group bg-white shadow-sm"
              >
                <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{opt.label}</span>
                <span className="text-xl font-bold text-slate-900">₹{opt.price.toLocaleString()}</span>
                <button 
                  onClick={() => onSelect(pkg, opt)}
                  className="w-full py-2.5 bg-white border border-blue-600 rounded-lg font-bold text-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                >
                  Add
                </button>
              </div>
            ))}
          </div>

          {pkg.includeSections?.map((section, idx) => (
            <div key={idx} className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 space-y-4">
               <h4 className="text-lg font-bold text-slate-800">{section.title}</h4>
               <ul className="space-y-3">
                 {section.items.map((item, i) => (
                   <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600 leading-relaxed">
                     <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                       <CheckCircle2 size={12} className="text-blue-600" />
                     </div>
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
          ))}
          <div className="h-4 md:h-8" />
        </div>
      </div>
    </div>
  );
};

// --- Painting Flow Component ---
const PaintingFlow = ({ 
  location,
  onClose, 
  cart, 
  onAddToCart, 
  onViewCart 
}: { 
  location: string; 
  onClose: () => void; 
  cart: CartItem[]; 
  onAddToCart: (pkg: PricingPackage, option?: PricingOption) => void;
  onViewCart: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('Full Home');
  const [activeVariantModal, setActiveVariantModal] = useState<PricingPackage | null>(null);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  const displayedPackages = useMemo(() => {
    switch (activeTab) {
      case 'Full Home': return FULL_HOME_PAINTING;
      case 'By Room': return ROOM_PAINTING;
      case 'Waterproofing': return WATERPROOFING;
      default: return [];
    }
  }, [activeTab]);

  return (
    <div className="fixed inset-0 z-[4000] bg-white overflow-y-auto animate-in slide-in-from-right duration-500">
      <div className="max-w-4xl mx-auto min-h-screen flex flex-col relative">
        <div className="p-4 flex items-center justify-between sticky top-0 bg-white z-20">
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full">
            <ArrowLeft size={24} className="text-slate-800" />
          </button>
          <button className="p-2 hover:bg-slate-50 rounded-full">
            <Search size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="px-5 space-y-6 flex-1 pb-24">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">Painting & Waterproofing in {location}</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-white bg-blue-600 rounded px-1 text-xs">
                 <Star size={10} className="fill-current" /> <span>4.9</span>
              </div>
              <span className="text-sm font-medium text-slate-400 border-b border-dashed border-slate-300">9240 reviews</span>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
            <div className="min-w-[220px] p-4 bg-white border border-slate-100 rounded-xl flex gap-3 shadow-sm shrink-0">
               <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500"><Tag size={20} /></div>
               <div>
                 <p className="text-sm font-bold text-slate-800 leading-tight">Flat 10% OFF</p>
                 <p className="text-[10px] text-slate-400 mt-0.5">On your first interior paint visit</p>
               </div>
            </div>
            <div className="min-w-[220px] p-4 bg-white border border-slate-100 rounded-xl flex gap-3 shadow-sm shrink-0">
               <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500"><Tag size={20} /></div>
               <div>
                 <p className="text-sm font-bold text-slate-800 leading-tight">Free Site Visit</p>
                 <p className="text-[10px] text-slate-400 mt-0.5">Complimentary measurements</p>
               </div>
            </div>
          </div>

          <div className="relative aspect-[16/8] rounded-2xl overflow-hidden shadow-md">
            <img src="https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center p-8 text-white">
               <h3 className="text-3xl font-black leading-tight">Dream Walls</h3>
               <p className="text-xs font-bold mt-1">Professional Finish | Color Consultation</p>
               <div className="flex items-center gap-2 mt-4 bg-white/20 backdrop-blur-md p-2 rounded-lg w-fit border border-white/40">
                 <Paintbrush size={18} />
                 <span className="text-[10px] font-bold">Execution by Trained Professionals</span>
               </div>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
            {[
              { id: 'Full Home', name: 'Full Home', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=200' },
              { id: 'By Room', name: 'By Room', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=200' },
              { id: 'Waterproofing', name: 'Waterproofing', img: 'https://images.unsplash.com/photo-1504148455328-c39695715583?auto=format&fit=crop&q=80&w=200' }
            ].map(cat => (
              <div key={cat.id} onClick={() => setActiveTab(cat.id)} className="flex flex-col items-center gap-2 cursor-pointer shrink-0">
                <div className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeTab === cat.id ? 'border-blue-600 scale-105' : 'border-white'}`}>
                  <img src={cat.img} className="w-full h-full object-cover" alt={cat.name} />
                </div>
                <span className={`text-[11px] font-bold transition-colors text-center ${activeTab === cat.id ? 'text-blue-600' : 'text-slate-400'}`}>{cat.name}</span>
              </div>
            ))}
          </div>

          <div className="space-y-12 pb-10">
            <h3 className="text-2xl font-bold text-slate-800">{activeTab}</h3>
            {displayedPackages.map(pkg => (
              <div key={pkg.id} className="flex gap-4">
                <div className="flex-1 space-y-3">
                  <h4 className="text-lg font-bold text-slate-800 leading-tight">{pkg.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span>{pkg.rating} ({pkg.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <span>₹{pkg.price.toLocaleString()}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 text-xs">{pkg.duration}</span>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-400 leading-relaxed">
                        <div className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setActiveVariantModal(pkg)} className="text-blue-600 font-bold text-xs flex items-center gap-1">Show more <ChevronRight size={14}/></button>
                </div>
                <div className="w-32 flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm"><img src={pkg.image} className="w-full h-full object-cover" alt="" /></div>
                  <button onClick={() => setActiveVariantModal(pkg)} className="w-full py-1.5 border border-blue-600 rounded-lg font-bold text-sm text-blue-600 hover:bg-blue-50 transition-colors">Add</button>
                  <span className="text-[10px] text-slate-400 font-bold">{pkg.options?.length} variants</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 px-6 flex items-center justify-between shadow-lg z-[4100]">
            <div><p className="text-lg font-bold text-slate-900">₹{cartTotal.toLocaleString()}</p><button className="text-[11px] font-bold text-blue-600 uppercase">see details</button></div>
            <button onClick={onViewCart} className="bg-blue-600 text-white px-10 py-3 rounded-lg font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all">View Cart</button>
          </div>
        )}
      </div>

      {activeVariantModal && (
        <VariantSelectionModal 
          pkg={activeVariantModal} 
          onClose={() => setActiveVariantModal(null)} 
          onSelect={(pkg, opt) => { onAddToCart(pkg, opt); setActiveVariantModal(null); }}
        />
      )}
    </div>
  );
};

// --- House Cleaning Detail Flow Component ---
const HouseCleaningFlow = ({ 
  location, 
  onClose, 
  cart, 
  onAddToCart, 
  onViewCart 
}: { 
  location: string; 
  onClose: () => void; 
  cart: CartItem[]; 
  onAddToCart: (pkg: PricingPackage, option?: PricingOption) => void;
  onViewCart: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('Apartment');
  const [activeVariantModal, setActiveVariantModal] = useState<PricingPackage | null>(null);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  const displayedPackages = useMemo(() => {
    switch (activeTab) {
      case 'Apartment': return APARTMENT_CLEANING;
      case 'Bungalow': return BUNGALOW_CLEANING;
      case 'By Room': return BY_ROOM_CLEANING;
      default: return [];
    }
  }, [activeTab]);

  return (
    <div className="fixed inset-0 z-[4000] bg-white overflow-y-auto animate-in slide-in-from-right duration-500">
      <div className="max-w-4xl mx-auto min-h-screen flex flex-col relative">
        
        {/* Header (Screenshot Match) */}
        <div className="p-4 flex items-center justify-between sticky top-0 bg-white z-20">
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full">
            <ArrowLeft size={24} className="text-slate-800" />
          </button>
          <button className="p-2 hover:bg-slate-50 rounded-full">
            <Search size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="px-5 space-y-6 flex-1 pb-24">
          {/* Title & Reviews */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">House Cleaning in {location}</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-white bg-blue-600 rounded px-1 text-xs">
                 <Star size={10} className="fill-current" /> <span>4.9</span>
              </div>
              <span className="text-sm font-medium text-slate-400 border-b border-dashed border-slate-300 leading-tight">13917 reviews</span>
            </div>
          </div>

          {/* Cashback & Offers Cards */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
            <div className="min-w-[200px] p-4 bg-white border border-slate-100 rounded-xl flex gap-3 shadow-sm shrink-0">
               <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
                 <Tag size={20} />
               </div>
               <div>
                 <p className="text-sm font-bold text-slate-800 leading-tight">Get cashback upto ₹2k</p>
                 <p className="text-[10px] text-slate-400 mt-0.5">First order via UPI</p>
               </div>
            </div>
            <div className="min-w-[200px] p-4 bg-white border border-slate-100 rounded-xl flex gap-3 shadow-sm shrink-0">
               <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                 <Tag size={20} />
               </div>
               <div>
                 <p className="text-sm font-bold text-slate-800 leading-tight">Flat 15% OFF upto ₹200</p>
                 <p className="text-[10px] text-slate-400 mt-0.5">HDFC Credit Card</p>
               </div>
            </div>
          </div>

          <div className="border-t border-slate-50 -mx-5" />

          {/* Main Hero Banner */}
          <div className="relative aspect-[16/8] rounded-2xl overflow-hidden shadow-md">
            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-white/40 flex flex-col justify-center p-8">
               <h3 className="text-3xl font-black text-slate-800 leading-tight">Spotless Homes</h3>
               <p className="text-xs font-bold text-slate-600 mt-1">Quality Cleaning | Professional Care</p>
               <div className="flex items-center gap-2 mt-4 bg-white/80 p-2 rounded-lg w-fit border border-white/40">
                 <BadgeCheck size={18} className="text-slate-900" />
                 <span className="text-[10px] font-bold">Deep Cleaning by Verified Professionals</span>
               </div>
            </div>
          </div>

          {/* Tabs / Categories */}
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
            {[
              { id: 'Apartment', name: 'Apartment', img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=200' },
              { id: 'Bungalow', name: 'Bungalow or Duplex', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200' },
              { id: 'By Room', name: 'By Room', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=200' }
            ].map(cat => (
              <div 
                key={cat.id} 
                onClick={() => setActiveTab(cat.id)}
                className="flex flex-col items-center gap-2 cursor-pointer group shrink-0"
              >
                <div className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeTab === cat.id ? 'border-blue-600 scale-105' : 'border-white'}`}>
                  <img src={cat.img} className="w-full h-full object-cover" alt={cat.name} />
                </div>
                <span className={`text-[11px] font-bold transition-colors text-center ${activeTab === cat.id ? 'text-blue-600' : 'text-slate-400'}`}>{cat.name}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-50 -mx-5" />

          {/* Service Listing Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800">{activeTab}</h3>
            <div className="space-y-12">
              {displayedPackages.map(pkg => (
                <div key={pkg.id} className="flex gap-4">
                  <div className="flex-1 space-y-3">
                    <h4 className="text-lg font-bold text-slate-800 leading-tight">{pkg.name}</h4>
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-slate-900">{pkg.rating} ({pkg.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span>₹{pkg.price.toLocaleString()}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 text-xs">{pkg.duration}</span>
                    </div>
                    <ul className="space-y-2">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-400 leading-relaxed">
                          <div className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => setActiveVariantModal(pkg)}
                      className="text-blue-600 font-bold text-xs flex items-center gap-1"
                    >
                      Show more <ChevronRight size={14}/>
                    </button>
                  </div>
                  <div className="w-32 flex flex-col items-center gap-3">
                    <div className="w-full aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                      <img src={pkg.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <button 
                      onClick={() => setActiveVariantModal(pkg)}
                      className="w-full py-1.5 border border-blue-600 rounded-lg font-bold text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Add
                    </button>
                    <span className="text-[10px] text-slate-400 font-bold">{pkg.options?.length} options</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Mobile Cart Bar (Screenshot Match) */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 px-6 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-[4100]">
            <div>
              <p className="text-lg font-bold text-slate-900">₹{cartTotal.toLocaleString()}</p>
              <button className="text-[11px] font-bold text-blue-600 uppercase">see details</button>
            </div>
            <button 
              onClick={onViewCart}
              className="bg-blue-600 text-white px-10 py-3 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors active:scale-95"
            >
              View Cart
            </button>
          </div>
        )}
      </div>

      {activeVariantModal && (
        <VariantSelectionModal 
          pkg={activeVariantModal} 
          onClose={() => setActiveVariantModal(null)} 
          onSelect={(pkg, opt) => {
            onAddToCart(pkg, opt);
            setActiveVariantModal(null);
          }}
        />
      )}
    </div>
  );
};

// --- Hero Search ---
const SearchHero = ({ location, onLocClick }: { location: string; onLocClick: () => void }) => (
  <section className="py-20 md:py-32 px-6 flex flex-col items-center text-center bg-white overflow-hidden relative">
    <div className="absolute top-10 -left-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
    <div className="absolute bottom-20 -right-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50" />
    
    <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-16 leading-[1.1]">
      Reliable professionals <br className="hidden md:block"/> for every home task
    </h1>
    
    <div className="w-full max-w-4xl flex flex-col md:flex-row gap-5 items-stretch p-2 bg-white md:bg-slate-50 rounded-[2.5rem] md:shadow-inner md:border md:border-slate-100">
      <div 
        onClick={onLocClick}
        className="flex-1 min-h-[72px] bg-white border md:border-none shadow-sm md:shadow-none rounded-2xl px-8 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><MapPin size={22} /></div>
          <div className="text-left">
            <p className="font-black text-sm text-slate-900 leading-tight">{location}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Location</p>
          </div>
        </div>
        <ChevronDown size={18} className="text-slate-300" />
      </div>

      <div className="flex-[2] min-h-[72px] bg-white border md:border-none shadow-sm md:shadow-none rounded-2xl px-8 flex items-center gap-5">
        <Search className="text-slate-300" size={24} />
        <input 
          type="text" 
          placeholder="What service do you need?" 
          className="flex-1 bg-transparent outline-none text-slate-700 font-bold text-lg placeholder:text-slate-300"
        />
      </div>
    </div>
  </section>
);

// --- Promotional Banners ---
const PromoBanners = () => {
  const banners = [
    { 
      title: "Quick Fix marble Polishing", 
      price: 199, 
      color: "bg-gradient-to-br from-emerald-600 to-teal-500", 
      img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=600"
    },
    { 
      title: "Full House Cleaning", 
      price: 2599, 
      color: "bg-gradient-to-br from-blue-700 to-indigo-600", 
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600"
    },
    { 
      title: "Painting Services", 
      price: 250, 
      color: "bg-gradient-to-br from-blue-700 to-blue-500", 
      img: "https://images.unsplash.com/photo-1504148455328-c39695715583?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
      {banners.map((b, i) => (
        <div key={i} className="h-64 rounded-[2.5rem] overflow-hidden flex relative group cursor-pointer shadow-2xl transition-all hover:scale-[1.02]">
          <div className={`${b.color} w-3/5 p-8 flex flex-col justify-between text-white z-10 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
            <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">NEOI Premium</div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black leading-tight tracking-tight">{b.title}</h3>
              <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-3 inline-flex flex-col border border-white/20">
                 <span className="text-[9px] uppercase font-black tracking-widest opacity-70 mb-1">Starting At</span>
                 <span className="font-black text-xl leading-none">₹{b.price}</span>
              </div>
            </div>
            <button className="bg-white text-slate-900 text-[11px] font-black uppercase tracking-widest px-6 py-3 rounded-xl self-start shadow-xl shadow-black/10 hover:bg-slate-50 transition-colors">Book Now</button>
          </div>
          <div className="w-2/5 h-full relative">
            <img src={b.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Category Icon Grid ---
const CategoryIconGrid = ({ onCategoryClick }: { onCategoryClick: (id: string) => void }) => {
  const categories = [
    { name: "Painting", icon: <Palette className="text-orange-500" size={44} />, id: "Painting" },
    { name: "Cleaning", icon: <Droplets className="text-blue-500" size={44} />, id: "Cleaning" },
    { name: "Marble Polishing", icon: <Gem className="text-cyan-500" size={44} />, id: "Marble Polishing" },
    { name: "Pest Control", icon: <ShieldAlert className="text-red-500" size={44} />, id: "Pest Control" },
  ];

  return (
    <div className="px-6 md:px-20 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-20">
      {categories.map((cat, i) => (
        <div 
          key={i} 
          onClick={() => onCategoryClick(cat.id)}
          className="bg-white border border-slate-100 rounded-[3rem] p-10 flex flex-col items-center justify-center gap-6 shadow-sm hover:shadow-2xl transition-all cursor-pointer group active:scale-95"
        >
           <div className="bg-slate-50 w-24 h-24 rounded-[2rem] flex items-center justify-center group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-500">
             {cat.icon}
           </div>
           <span className="text-base font-black text-slate-700 text-center leading-tight">
             {cat.name}
           </span>
        </div>
      ))}
    </div>
  );
};

// --- Sub Category Modal ---
const CleaningPestModal = ({ onClose, onSelect }: { onClose: () => void; onSelect: (pkg: PricingPackage) => void }) => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col animate-in zoom-in duration-300 max-h-[85vh]">
        <div className="p-8 border-b flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="w-full text-center">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Cleaning & Pest Services</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors absolute right-8"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-16 scrollbar-hide">
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
              <h4 className="text-2xl font-black text-slate-800">Home Cleaning</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {CLEANING_PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id} 
                  onClick={() => onSelect(pkg)}
                  className="flex flex-col items-center gap-4 group cursor-pointer"
                >
                  <div className="w-full aspect-square rounded-[2rem] overflow-hidden border border-slate-100 shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
                    <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pkg.name} />
                  </div>
                  <span className="text-xs font-black text-slate-600 text-center leading-tight uppercase tracking-tight">
                    {pkg.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-red-600 rounded-full" />
              <h4 className="text-2xl font-black text-slate-800">Pest Control</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {PEST_PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id} 
                  onClick={() => onSelect(pkg)}
                  className="flex flex-col items-center gap-4 group cursor-pointer"
                >
                  <div className="w-full aspect-square rounded-[2rem] overflow-hidden border border-slate-100 shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
                    <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={pkg.name} />
                  </div>
                  <span className="text-xs font-black text-slate-600 text-center leading-tight uppercase tracking-tight">
                    {pkg.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Service Carousel Section ---
const ServiceSection = ({ title, items, onSelect }: { title: string; items: PricingPackage[]; onSelect: (pkg: PricingPackage) => void }) => (
  <section className="px-6 md:px-20 py-10 mb-10">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
      <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-600 hover:gap-3 transition-all">
        See All <ChevronRight size={18} />
      </button>
    </div>
    <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide -mx-2 px-2">
      {items.map(item => (
        <div 
          key={item.id} 
          onClick={() => onSelect(item)}
          className="min-w-[280px] md:min-w-[320px] group cursor-pointer"
        >
          <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 relative shadow-lg group-hover:shadow-2xl transition-all">
            <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
               <span className="text-xs font-black text-slate-900">₹{item.price}</span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{item.name}</h4>
            <div className="flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-widest">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>4.9</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- Story Section ---
const StorySection = ({ stories }: { stories: Story[] }) => (
  <section className="px-6 md:px-20 py-20 bg-slate-50 mb-20">
    <h2 className="text-4xl font-black text-slate-900 mb-16 tracking-tight text-center italic">Inside Neoi Living</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {stories.map(s => (
        <div key={s.id} className="relative aspect-[3/4.5] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl">
          <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 transform group-hover:-translate-y-2 transition-transform duration-500">
              <h4 className="text-lg font-black text-white mb-2 leading-tight">{s.title}</h4>
              <p className="text-[10px] text-blue-300 font-black uppercase tracking-[0.2em]">{s.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- Header ---
const Header = ({ location, onLocClick, cartCount, onCartClick, onNav }: any) => (
  <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 md:px-12 py-5 flex justify-between items-center">
    <div className="flex items-center gap-5">
       <div 
        className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white cursor-pointer shadow-lg shadow-blue-100 hover:rotate-6 transition-all" 
        onClick={() => onNav('Home')}
       >
         <Sparkles size={28}/>
       </div>
       <div className="flex flex-col">
         <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">NEOI</span>
         <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Premium Care</span>
       </div>
    </div>

    <div className="flex items-center gap-10">
      <nav className="hidden md:flex gap-12">
         <button onClick={() => onNav('Orders')} className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors">Bookings</button>
         <button onClick={() => onNav('Account')} className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors">Concierge</button>
      </nav>
      <div 
        onClick={onCartClick}
        className="relative cursor-pointer hover:scale-110 transition-transform bg-slate-50 p-3 rounded-xl border border-slate-100"
      >
        <ShoppingCart size={24} className="text-slate-900" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full text-xs text-white flex items-center justify-center font-black border-2 border-white">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  </header>
);

// --- Footer ---
const Footer = () => (
  <footer className="bg-white pt-32 pb-16 px-6 md:px-20 border-t border-slate-50">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-20 mb-32">
        <div className="flex-[1.5] space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100"><Sparkles size={28}/></div>
            <span className="text-3xl font-black text-slate-900">NEOI</span>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed max-w-sm">Elevating home maintenance into a premium lifestyle experience. Industrial precision, domestic warmth.</p>
          <div className="flex gap-8">
            <Instagram size={22} className="text-slate-400 hover:text-pink-500 cursor-pointer transition-colors" />
            <Facebook size={22} className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
            <Twitter size={22} className="text-slate-400 hover:text-sky-500 cursor-pointer transition-colors" />
            <Linkedin size={22} className="text-slate-400 hover:text-blue-800 cursor-pointer transition-colors" />
          </div>
        </div>

        <div className="flex-[3] grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
          <div className="space-y-8">
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs border-b border-blue-600 w-fit pb-1">Services</h4>
            <ul className="space-y-5 text-sm font-bold text-slate-400">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Cleaning</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Pest Control</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Painting</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Repairs</li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs border-b border-blue-600 w-fit pb-1">Company</h4>
            <ul className="space-y-5 text-sm font-bold text-slate-400">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Our Ethos</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Partner With Us</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Newsroom</li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs border-b border-blue-600 w-fit pb-1">Support</h4>
            <ul className="space-y-5 text-sm font-bold text-slate-400">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Contact Concierge</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Feedback</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-16 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="space-y-4 text-center md:text-left">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Cities</p>
           <p className="text-xs font-bold text-slate-500 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 max-w-2xl">
              {SERVICE_AREAS.map(a => <span key={a} className="hover:text-blue-600 cursor-pointer">{a}</span>)}
           </p>
        </div>
        <div className="text-right space-y-2">
           <p className="text-xs font-bold text-slate-400">© 2025 Neoi Home Services. Handcrafted in India.</p>
           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Version 2.5 Pro</p>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---
export default function App() {
  const [location, setLocation] = useState('Bangalore');
  const [isLocPickerOpen, setIsLocPickerOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'Home' | 'Orders' | 'Account'>('Home');
  const [activePackage, setActivePackage] = useState<PricingPackage | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCleaningPestModalOpen, setIsCleaningPestModalOpen] = useState(false);
  const [isHouseCleaningFlowOpen, setIsHouseCleaningFlowOpen] = useState(false);
  const [isPaintingFlowOpen, setIsPaintingFlowOpen] = useState(false);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  const handleAddToCart = (pkg: PricingPackage, option?: PricingOption) => {
    setCart([...cart, { 
      id: Math.random().toString(36).substr(2, 9), 
      packageName: option ? `${option.label} - ${pkg.name}` : pkg.name, 
      serviceTitle: 'Service', 
      price: option ? option.price : pkg.price 
    }]);
    setIsCartOpen(true);
  };

  const handleCategoryClick = (id: string) => {
    if (id === 'Cleaning' || id === 'Pest Control') {
      setIsCleaningPestModalOpen(true);
    } else if (id === 'Painting') {
      setIsPaintingFlowOpen(true);
    }
  };

  const handleSubSelect = (pkg: PricingPackage) => {
    if (pkg.name === 'Full house cleaning') {
      setIsHouseCleaningFlowOpen(true);
      setIsCleaningPestModalOpen(false);
    } else {
      setActivePackage(pkg);
      setIsCleaningPestModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        location={location} 
        onLocClick={() => setIsLocPickerOpen(true)}
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)}
        onNav={setCurrentView}
      />

      {currentView === 'Home' && (
        <main className="animate-in fade-in duration-1000">
          <SearchHero location={location} onLocClick={() => setIsLocPickerOpen(true)} />
          <PromoBanners />
          <CategoryIconGrid onCategoryClick={handleCategoryClick} />
          
          <ServiceSection 
            title="Most Requested" 
            items={MOST_BOOKED} 
            onSelect={setActivePackage} 
          />

          <ServiceSection 
            title="Cleaning & Hygiene" 
            items={[...CLEANING_PACKAGES, ...PEST_PACKAGES]} 
            onSelect={setActivePackage} 
          />

          <StorySection stories={TRENDING_STORIES} />
          <Footer />
        </main>
      )}

      {currentView === 'Orders' && (
        <div className="max-w-4xl mx-auto p-8 md:p-20">
          <button onClick={() => setCurrentView('Home')} className="mb-12 flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest"><ArrowLeft size={20}/> Home</button>
          <h2 className="text-5xl font-black mb-16 italic tracking-tighter">Your Itinerary</h2>
          <div className="space-y-8">
            {MOCK_ORDERS.map(o => (
              <div key={o.id} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{o.id}</p>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">{o.serviceName}</h3>
                  <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                    <span className="flex items-center gap-2"><Calendar size={16}/> {o.date}</span>
                    <span className="flex items-center gap-2"><Clock size={16}/> {o.time}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                   <p className="font-black text-3xl">₹{o.price}</p>
                   <span className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'Account' && (
        <div className="max-w-4xl mx-auto p-8 md:p-20 flex flex-col items-center">
          <button onClick={() => setCurrentView('Home')} className="self-start mb-12 flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest"><ArrowLeft size={20}/> Back</button>
          <div className="w-40 h-40 bg-slate-50 rounded-[3rem] mb-8 flex items-center justify-center text-slate-300 shadow-inner">
            <User size={80} />
          </div>
          <h2 className="text-4xl font-black mb-2 tracking-tight">{MOCK_USER.name}</h2>
          <p className="text-slate-400 font-bold mb-16">{MOCK_USER.email}</p>
          
          <div className="w-full max-w-md space-y-4">
            <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-4 shadow-2xl hover:bg-black transition-all">
              Edit Profile <Settings size={20}/>
            </button>
            <button className="w-full py-5 bg-red-50 text-red-500 rounded-2xl font-black text-lg flex items-center justify-center gap-4 hover:bg-red-100 transition-colors">
              Sign Out <LogOut size={20}/>
            </button>
          </div>
        </div>
      )}

      {/* Standard Detail Modal */}
      {activePackage && (
        <div className="fixed inset-0 z-[3000] bg-white overflow-y-auto animate-in slide-in-from-bottom duration-500">
           <div className="max-w-5xl mx-auto p-8 md:p-16">
             <button onClick={() => setActivePackage(null)} className="mb-12 p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"><ArrowLeft size={28}/></button>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <div className="aspect-[4/3] md:aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-white">
                 <img src={activePackage.image} className="w-full h-full object-cover" alt="" />
               </div>
               <div className="space-y-10 py-6">
                  <div className="space-y-4">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-slate-900">{activePackage.name}</h2>
                    <div className="flex items-center gap-6">
                      <span className="text-4xl font-black text-slate-900">₹{activePackage.price.toLocaleString()}</span>
                      <div className="flex items-center gap-2 text-amber-500 font-black bg-amber-50 px-4 py-2 rounded-2xl">
                        <Star size={20} className="fill-current"/> 4.9 (12k+)
                      </div>
                    </div>
                  </div>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed">Experience a new standard of cleanliness with Neoi’s industrial-grade service. Tailored for those who demand precision and care in their sanctuary.</p>
                  <div className="pt-10">
                     <button 
                      onClick={() => { handleAddToCart(activePackage!); setActivePackage(null); }}
                      className="w-full bg-blue-600 text-white py-8 rounded-[2rem] font-black text-2xl flex items-center justify-center gap-6 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-[0.98]"
                     >
                       Express Booking <Plus size={32}/>
                     </button>
                  </div>
               </div>
             </div>
           </div>
        </div>
      )}

      {/* Service Flows */}
      {isHouseCleaningFlowOpen && (
        <HouseCleaningFlow 
          location={location} 
          onClose={() => setIsHouseCleaningFlowOpen(false)} 
          cart={cart}
          onAddToCart={handleAddToCart}
          onViewCart={() => setIsCartOpen(true)}
        />
      )}

      {isPaintingFlowOpen && (
        <PaintingFlow 
          location={location} 
          onClose={() => setIsPaintingFlowOpen(false)} 
          cart={cart}
          onAddToCart={handleAddToCart}
          onViewCart={() => setIsCartOpen(true)}
        />
      )}

      {/* Cleaning/Pest Category Selection */}
      {isCleaningPestModalOpen && (
        <CleaningPestModal 
          onClose={() => setIsCleaningPestModalOpen(false)} 
          onSelect={handleSubSelect} 
        />
      )}

      {/* Side Folio (Cart) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[5000] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-lg bg-white h-full flex flex-col animate-in slide-in-from-right duration-500 shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)]">
             <div className="p-10 border-b flex justify-between items-center bg-white sticky top-0 z-10">
               <h3 className="text-3xl font-black tracking-tight">My Folio</h3>
               <button onClick={() => setIsCartOpen(false)} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"><X size={28} /></button>
             </div>
             <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
               {cart.map(item => (
                 <div key={item.id} className="p-8 bg-slate-50 rounded-[2rem] flex justify-between items-center group transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                   <div className="space-y-2">
                     <h4 className="font-black text-slate-800 text-lg leading-tight">{item.packageName}</h4>
                     <p className="text-2xl font-black text-blue-600">₹{item.price.toLocaleString()}</p>
                   </div>
                   <button 
                     onClick={() => setCart(cart.filter(c => c.id !== item.id))}
                     className="p-4 bg-red-50 text-red-400 rounded-2xl opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"
                   >
                     <Trash2 size={24} />
                   </button>
                 </div>
               ))}
               {cart.length === 0 && (
                 <div className="flex flex-col items-center justify-center h-full space-y-6 text-slate-300">
                    <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center"><ShoppingCart size={64}/></div>
                    <p className="text-xl font-black uppercase tracking-widest">Your Folio is empty</p>
                 </div>
               )}
             </div>
             {cart.length > 0 && (
               <div className="p-10 border-t bg-white space-y-8">
                 <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Total Folio Investment</span>
                      <span className="text-5xl font-black tracking-tighter">₹{cartTotal.toLocaleString()}</span>
                    </div>
                 </div>
                 <button 
                  onClick={() => { setIsCartOpen(false); setIsBookingOpen(true); }}
                  className="w-full bg-blue-600 text-white py-8 rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all"
                 >
                   Checkout Concierge
                 </button>
               </div>
             )}
          </div>
        </div>
      )}

      {isLocPickerOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setIsLocPickerOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300">
             <div className="flex flex-col items-center text-center mb-10">
               <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-6"><MapPin size={32}/></div>
               <h3 className="text-3xl font-black tracking-tight text-slate-800">Where are you?</h3>
               <p className="text-sm font-bold text-slate-400 mt-2">Services tailored to your specific city architecture.</p>
             </div>
             <div className="grid gap-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-hide">
               {SERVICE_AREAS.map(area => (
                 <button 
                  key={area}
                  onClick={() => { setLocation(area); setIsLocPickerOpen(false); }}
                  className={`w-full p-6 rounded-2xl text-left font-black text-lg transition-all ${location === area ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-[1.02]' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                 >
                   {area}
                 </button>
               ))}
             </div>
          </div>
        </div>
      )}

      {isBookingOpen && (
        <div className="fixed inset-0 z-[6000] bg-white overflow-y-auto animate-in slide-in-from-bottom duration-500">
           <div className="max-w-3xl mx-auto p-8 md:p-20">
             <button onClick={() => setIsBookingOpen(false)} className="mb-12 p-4 bg-slate-50 rounded-2xl"><ArrowLeft size={32}/></button>
             <h2 className="text-6xl font-black mb-2 tracking-tighter italic">Finalize</h2>
             <p className="text-xl font-bold text-slate-400 mb-20 tracking-tight">Your premium session is almost confirmed.</p>
             <div className="space-y-16">
               <div className="space-y-6">
                 <label className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Target Sanctum (Address)</label>
                 <textarea className="w-full p-8 bg-slate-50 rounded-[2.5rem] outline-none font-black text-2xl border-4 border-transparent focus:border-blue-600/10 transition-all" placeholder="Your full residence coordinates..." rows={3} value={MOCK_USER.savedAddresses[0]} />
               </div>
               <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-6">
                   <label className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Appointment Date</label>
                   <div className="p-8 bg-slate-50 rounded-3xl font-black text-xl flex items-center gap-4"><Calendar size={24} className="text-blue-600"/> 25 Oct 2025</div>
                 </div>
                 <div className="space-y-6">
                   <label className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Arrival Time</label>
                   <div className="p-8 bg-slate-50 rounded-3xl font-black text-xl flex items-center gap-4"><Clock size={24} className="text-blue-600"/> 10:00 AM</div>
                 </div>
               </div>
               <button onClick={() => { setIsBookingOpen(false); setCart([]); setCurrentView('Orders'); }} className="w-full bg-blue-600 text-white py-10 rounded-[2.5rem] font-black text-3xl shadow-[0_35px_60px_-15px_rgba(37,99,235,0.4)] active:scale-95 transition-all">Confirm Session • ₹{cartTotal.toLocaleString()}</button>
             </div>
           </div>
        </div>
      )}

      {/* Mobile Sticky Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-slate-100 flex justify-around p-5 md:hidden z-[100] safe-area-bottom shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <button onClick={() => setCurrentView('Home')} className={`flex flex-col items-center gap-1.5 transition-colors ${currentView === 'Home' ? 'text-blue-600' : 'text-slate-400'}`}><HomeIcon size={24}/> <span className="text-[10px] font-black uppercase tracking-widest">Home</span></button>
        <button onClick={() => setCurrentView('Orders')} className={`flex flex-col items-center gap-1.5 transition-colors ${currentView === 'Orders' ? 'text-blue-600' : 'text-slate-400'}`}><ClipboardList size={24}/> <span className="text-[10px] font-black uppercase tracking-widest">Bookings</span></button>
        <button onClick={() => setCurrentView('Account')} className={`flex flex-col items-center gap-1.5 transition-colors ${currentView === 'Account' ? 'text-blue-600' : 'text-slate-400'}`}><User size={24}/> <span className="text-[10px] font-black uppercase tracking-widest">Account</span></button>
      </nav>
    </div>
  );
}
