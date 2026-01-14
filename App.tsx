
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  Star, 
  Phone, 
  CheckCircle2, 
  MessageSquare, 
  ShoppingCart,
  ChevronDown,
  Home,
  ClipboardList,
  User,
  Loader2,
  Menu,
  X,
  Trash2,
  Calendar,
  Plus,
  Receipt,
  MapIcon,
  AlertCircle,
  MousePointerClick,
  Smile,
  Instagram,
  Facebook,
  Twitter,
  ArrowLeft,
  Paintbrush,
  Gem,
  ExternalLink,
  Mail,
  LocateFixed,
  LayoutGrid,
  FileText,
  Scissors,
  Droplets,
  Wrench,
  Brush
} from 'lucide-react';
import { SERVICES, TESTIMONIALS, SERVICE_AREAS, getRecommendedForLocation, TRENDING_STORIES } from './constants';
import { CartItem, BookingInfo, PricingPackage, ServiceDetail, ServiceType } from './types';

// --- Global Components ---

const LocationSelector: React.FC<{ 
  current: string; 
  onSelect: (loc: string) => void;
  isOpen: boolean;
  onClose: () => void;
}> = ({ current, onSelect, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-black flex items-center gap-2">
            <MapPin className="text-blue-600" /> Select Location
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
        </div>
        <p className="text-slate-500 mb-6 font-medium text-sm">Please select your area to see available slots and customized pricing.</p>
        <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
          {SERVICE_AREAS.map(area => (
            <button 
              key={area}
              onClick={() => { onSelect(area); onClose(); }}
              className={`p-4 rounded-2xl border-2 text-left transition-all font-bold text-sm ${
                current.includes(area) 
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg shadow-blue-100' 
                  : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Header: React.FC<{ 
  selectedLocation: string; 
  cartCount: number; 
  onCartClick: () => void;
  onLocClick: () => void;
  onHomeClick: () => void;
}> = ({ selectedLocation, cartCount, onCartClick, onLocClick, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 md:px-8 py-3 md:py-4 border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
            <div className="bg-blue-600 text-white p-1.5 md:p-2 rounded-xl shadow-lg shadow-blue-200">
              <Sparkles size={18} className="md:w-5 md:h-5" />
            </div>
            <span className="text-lg md:text-xl font-black tracking-tight text-slate-900 hidden sm:block">Neoi</span>
          </div>

          <div className="flex flex-col cursor-pointer group" onClick={onLocClick}>
            <div className="flex items-center gap-1 text-blue-600 font-bold text-xs md:text-base">
              {selectedLocation} <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
            </div>
            <span className="text-[8px] md:text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Location</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-10 text-sm font-bold text-slate-500">
          <button onClick={onHomeClick} className="hover:text-blue-600 transition-colors">Home</button>
          <a href="#services-grid" className="hover:text-blue-600 transition-colors">Services</a>
          <a href="#footer" className="hover:text-blue-600 transition-colors">Areas</a>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={() => { onHomeClick(); window.location.hash = "services-grid"; }} className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
            Book Now
          </button>
          <div 
            onClick={onCartClick}
            className="w-10 h-10 md:w-11 md:h-11 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 border border-slate-100 relative cursor-pointer hover:bg-white transition-colors"
          >
            <ShoppingCart size={18} className="md:w-5 md:h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-1.5 text-slate-600">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <button onClick={() => { onHomeClick(); setIsMenuOpen(false); }} className="flex items-center gap-3 text-slate-700 font-bold p-2 text-sm"><Home size={18} /> Home</button>
          <a href="#services-grid" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-slate-700 font-bold p-2 text-sm"><ClipboardList size={18} /> Services</a>
          <a href="#footer" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-slate-700 font-bold p-2 text-sm"><MapPin size={18} /> Service Areas</a>
        </div>
      )}
    </header>
  );
};

const CartSidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}> = ({ isOpen, onClose, items, onRemove, onCheckout }) => {
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-md:max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-black tracking-tight">Your Selection ({items.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingCart size={48} className="text-slate-300" />
              <p className="font-bold text-slate-500 text-sm">Your selection is empty</p>
              <button onClick={onClose} className="text-blue-600 font-black uppercase text-xs">Browse Services</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 items-center animate-in slide-in-from-right">
                <div className="flex-1">
                  <span className="text-[8px] font-black uppercase text-blue-600 tracking-wider">{item.serviceTitle}</span>
                  <h4 className="font-black text-slate-800 text-sm">{item.packageName}</h4>
                  <span className="text-xs font-bold text-slate-500">₹{item.price}</span>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-bold text-sm">Total Payable</span>
              <span className="text-xl font-black text-slate-900">₹{total}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-base shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              Continue to Schedule <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const BookingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingInfo) => void;
  location: string;
  cartItems: CartItem[];
  totalPrice: number;
}> = ({ isOpen, onClose, onSubmit, location, cartItems, totalPrice }) => {
  const [formData, setFormData] = useState<BookingInfo>({
    name: '',
    phone: '',
    location: location,
    address: '',
    date: '',
    time: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  
  const timeSlots = [
    { label: '08:00 AM - 10:00 AM', value: '08:00 AM - 10:00 AM', hour: 8 },
    { label: '10:00 AM - 12:00 PM', value: '10:00 AM - 12:00 PM', hour: 10 },
    { label: '12:00 PM - 02:00 PM', value: '12:00 PM - 02:00 PM', hour: 12 },
    { label: '02:00 PM - 04:00 PM', value: '02:00 PM - 04:00 PM', hour: 14 },
    { label: '04:00 PM - 06:00 PM', value: '04:00 PM - 06:00 PM', hour: 16 },
  ];

  const availableSlots = useMemo(() => {
    if (formData.date !== today) return timeSlots;
    const currentHour = new Date().getHours();
    return timeSlots.filter(slot => slot.hour > currentHour + 1);
  }, [formData.date, today]);

  const isFormValid = useMemo(() => {
    return formData.name.trim().length >= 2 &&
           formData.phone.trim().length === 10 &&
           formData.address.trim().length >= 10 &&
           formData.date !== '' &&
           formData.time !== '';
  }, [formData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setErrorMsg("Please ensure Name (2+ chars), Phone (10 digits) and Address (10+ chars) are filled correctly.");
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    setTimeout(() => {
      onSubmit(formData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 overflow-y-auto py-10">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-[2rem] p-5 md:p-10 shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"><X size={20} /></button>
        
        <div className="space-y-6">
          <div className="text-center space-y-1.5">
            <div className="inline-block bg-blue-600 text-white p-2.5 rounded-2xl mb-1">
              <Calendar size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">Finalize Booking</h2>
            <p className="text-slate-500 font-medium text-xs">Schedule your session at {location}.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-start gap-2 text-xs font-medium animate-in slide-in-from-top-1">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-400 transition-all font-medium text-sm" 
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  maxLength={10}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-400 transition-all font-medium text-sm" 
                  placeholder="10-digit mobile"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Preferred Date</label>
                <input 
                  required
                  type="date" 
                  min={today}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-400 transition-all font-medium text-sm" 
                  value={formData.date}
                  onChange={e => {
                    setFormData({...formData, date: e.target.value, time: ''});
                  }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Preferred Time</label>
                <select 
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-400 transition-all font-medium text-sm disabled:opacity-50"
                  value={formData.time}
                  disabled={!formData.date}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                >
                  <option value="">Time Slot</option>
                  {availableSlots.length > 0 ? (
                    availableSlots.map(slot => (
                      <option key={slot.value} value={slot.value}>{slot.label}</option>
                    ))
                  ) : (
                    <option disabled>No slots available</option>
                  )}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Service Address</label>
              <textarea 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-400 transition-all font-medium min-h-[70px] text-sm" 
                placeholder="Full address..."
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 md:p-6 space-y-3 border border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Receipt size={16} className="text-blue-600" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Summary</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{cartItems.length} Item(s)</span>
              </div>
              <div className="max-h-[100px] overflow-y-auto space-y-2 pr-1 scrollbar-hide">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">{item.packageName}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">{item.serviceTitle}</span>
                    </div>
                    <span className="font-black text-slate-900">₹{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                <span className="font-black text-slate-500 text-xs">Total</span>
                <span className="text-lg font-black text-blue-600">₹{totalPrice}</span>
              </div>
            </div>
            
            <button 
              disabled={loading || !isFormValid}
              className={`w-full py-4 rounded-xl font-black text-base shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                isFormValid 
                  ? 'bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700' 
                  : 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed'
              } disabled:opacity-50`}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-[320px] bg-white rounded-[2rem] p-8 text-center space-y-5 shadow-2xl animate-in zoom-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={32} />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-black tracking-tight">Success!</h2>
          <p className="text-slate-500 font-medium text-xs leading-relaxed">Booking confirmed. Check your messages for details.</p>
        </div>
        <button 
          onClick={onClose}
          className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-black text-sm"
        >
          Excellent
        </button>
      </div>
    </div>
  );
};

// --- Page Sections ---

const BannerAdsSection: React.FC = () => {
  const banners = [
    {
      title: "Monsoon Deep Clean",
      desc: "Up to 25% OFF on full house packages.",
      image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=1200",
      cta: "Book Now",
      badge: "LATEST OFFER"
    },
    {
      title: "Mirror Shine Marble",
      desc: "Restore flooring shine at just ₹3499.",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
      cta: "View Plans",
      badge: "NEW SERVICE"
    },
    {
      title: "Pest-Free Shield",
      desc: "Safe & Odorless treatment for kids & pets.",
      image: "https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?auto=format&fit=crop&q=80&w=1200",
      cta: "Claim 15% Off",
      badge: "LIMITED TIME"
    }
  ];

  return (
    <section className="px-6 md:px-8 -mt-6 md:-mt-16 mb-12 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {banners.map((b, i) => (
            <div key={i} className="flex-shrink-0 w-[82vw] md:w-[480px] h-[160px] md:h-[220px] rounded-[2rem] overflow-hidden relative shadow-xl snap-center group">
              <img src={b.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={b.title} />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent flex flex-col justify-center p-6 md:p-10 text-white">
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-blue-400 mb-1.5 md:mb-2 bg-blue-500/10 w-fit px-2 py-0.5 rounded-full border border-blue-500/20">
                  {b.badge}
                </span>
                <h3 className="text-lg md:text-2xl font-black mb-1 leading-tight">{b.title}</h3>
                <p className="text-[10px] md:text-sm font-medium text-slate-300 mb-4 line-clamp-2 max-w-[200px] md:max-w-xs">{b.desc}</p>
                <button className="bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] md:text-xs font-black w-fit hover:bg-blue-600 hover:text-white transition-all transform active:scale-95">
                  {b.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrendingStoriesSection: React.FC = () => {
  const getCategorySign = (category: string) => {
    switch(category.toLowerCase()) {
      case 'water heaters': return <Droplets size={10} />;
      case 'maintenance': return <Wrench size={10} />;
      case 'cleaning': return <Brush size={10} />;
      default: return <Sparkles size={10} />;
    }
  };

  const marqueeItems = [...TRENDING_STORIES, ...TRENDING_STORIES];

  return (
    <section className="py-10 bg-white border-t-8 border-slate-100 lg:hidden mb-16 overflow-hidden">
      <div className="px-6 mb-8 flex justify-between items-center">
        <h3 className="text-lg font-black tracking-tight text-[#2d2d2d]">Trending Stories</h3>
        <button className="text-blue-600 text-[11px] font-black uppercase tracking-wider">See More</button>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee gap-6 px-6">
          {marqueeItems.map((story, index) => (
            <div 
              key={`${story.id}-${index}`} 
              className="flex-shrink-0 w-[240px] flex flex-col relative"
            >
              <div className="w-full aspect-[4/4.6] rounded-[24px] overflow-hidden shadow-md relative z-0">
                 <img 
                  src={story.image} 
                  className="w-full h-full object-cover" 
                  alt={story.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </div>

              <div className="mx-3.5 -mt-12 bg-white rounded-[20px] p-4 shadow-[0_10px_35px_rgba(0,0,0,0.08)] relative z-10 border border-slate-50">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5 bg-blue-50/80 text-blue-600 px-2.5 py-1 rounded-lg w-fit">
                    <div className="bg-blue-600 text-white p-0.5 rounded-sm">
                      {getCategorySign(story.category)}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest">{story.category}</span>
                  </div>
                  
                  <p className="text-sm font-black text-[#2d2d2d] leading-[1.3] line-clamp-2 min-h-[36px]">
                    {story.title}
                  </p>

                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
                    <span className="flex items-center gap-1"><Smile size={12} className="text-amber-400" /> 12.4k</span>
                    <span className="w-0.5 h-0.5 bg-slate-200 rounded-full" />
                    <span>5m read</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SubServicePicker: React.FC<{ 
  onBack: () => void;
  onSelect: (pkg: PricingPackage) => void;
}> = ({ onBack, onSelect }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onBack} />
      <div className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h3 className="text-base font-black text-slate-800 tracking-tight">Cleaning & Pest Control</h3>
          <button onClick={onBack} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-8 scrollbar-hide">
          <div>
            <h4 className="text-blue-600 font-black text-[10px] mb-5 uppercase tracking-widest">Cleaning</h4>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {SERVICES.find(s => s.id === 'Cleaning')?.packages.map(pkg => (
                <button 
                  key={pkg.id} 
                  onClick={() => onSelect(pkg)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all border border-slate-100 group-hover:border-blue-200">
                    <img src={pkg.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={pkg.name} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 text-center leading-tight group-hover:text-blue-600">
                    {pkg.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-emerald-600 font-black text-[10px] mb-5 uppercase tracking-widest">Pest Control</h4>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {SERVICES.find(s => s.id === 'Pest Control')?.packages.map(pkg => (
                <button 
                  key={pkg.id} 
                  onClick={() => onSelect(pkg)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all border border-slate-100 group-hover:border-emerald-200">
                    <img src={pkg.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={pkg.name} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 text-center leading-tight group-hover:text-emerald-600">
                    {pkg.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PackageDetailView: React.FC<{ 
  service: ServiceDetail;
  pkg: PricingPackage;
  onAdd: (pkg: PricingPackage, title: string) => void;
  onBack: () => void;
}> = ({ service, pkg, onAdd, onBack }) => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-white scroll-mt-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors group text-sm"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-2">
          <div className="aspect-video md:aspect-square rounded-[2rem] overflow-hidden shadow-xl border-2 border-slate-50">
            <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.name} />
          </div>
          <div className="space-y-6 md:space-y-8 flex flex-col justify-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                {service.title}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">{pkg.name}</h2>
              <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">{pkg.description}</p>
            </div>

            <div className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] border border-slate-100 space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Estimated Cost</span>
                  <span className="text-3xl md:text-4xl font-black text-blue-600">₹{pkg.price}</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                    <ShieldCheck size={14} /> Verified
                  </div>
                </div>
              </div>
              
              <div className="space-y-2.5">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Included Features</p>
                {pkg.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-slate-700 font-bold text-sm">
                    <div className="w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 size={10} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onAdd(pkg, service.title)}
              className="w-full bg-slate-900 text-white py-4.5 md:py-5 rounded-xl font-black text-base md:text-lg shadow-2xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              Add to Booking <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const BottomNav: React.FC<{ 
  onCartClick: () => void;
  cartCount: number;
  onHomeClick: () => void;
}> = ({ onCartClick, cartCount, onHomeClick }) => (
  <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-slate-100 px-1 py-3 flex justify-around items-end z-50 shadow-[0_-2px_15px_rgba(0,0,0,0.03)]">
    <button onClick={onHomeClick} className="flex flex-col items-center gap-1 text-blue-600 group">
      <div className="p-0.5"><Home size={20} fill="currentColor" fillOpacity={0.1} /></div>
      <span className="text-[10px] font-bold">Home</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-slate-400 group">
      <div className="p-0.5"><LayoutGrid size={20} /></div>
      <span className="text-[10px] font-bold">Categories</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-slate-400 group">
      <div className="p-0.5"><FileText size={20} /></div>
      <span className="text-[10px] font-bold">My Orders</span>
    </button>
    <button className="flex flex-col items-center gap-1 text-slate-400 group">
      <div className="p-0.5"><User size={20} /></div>
      <span className="text-[10px] font-bold">Account</span>
    </button>
  </nav>
);

const Footer: React.FC<{
  onLocationSelect: (loc: string) => void;
  currentLoc: string;
  onHomeClick: () => void;
}> = ({ onLocationSelect, currentLoc, onHomeClick }) => {
  return (
    <footer id="footer" className="bg-slate-950 pt-16 pb-32 md:pb-16 px-6 md:px-12 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={onHomeClick}>
              <div className="bg-blue-600 text-white p-2 md:p-3 rounded-2xl shadow-xl shadow-blue-900/40">
                <Sparkles size={20} className="md:w-6 md:h-6" />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tight">Neoi</span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed text-sm">
              Premium home care services delivered with precision. Bengaluru's highest-rated cleaning and maintenance platform.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all text-slate-400 hover:text-white"><Instagram size={16} /></a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all text-slate-400 hover:text-white"><Twitter size={16} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all text-slate-400 hover:text-white"><Facebook size={16} /></a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500">Company</h4>
            <ul className="space-y-3 md:space-y-4 text-slate-400 font-bold text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Neoi</a></li>
              <li><a href="#services-grid" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner with Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500">Serviceable Areas in Bengaluru</h4>
              <LocateFixed size={12} className="text-blue-500" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-6">
              {SERVICE_AREAS.map(area => (
                <button 
                  key={area}
                  onClick={() => {
                    onLocationSelect(area);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-left text-xs font-bold transition-all flex items-center gap-2 group ${
                    currentLoc.includes(area) ? 'text-blue-500' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MapPin size={10} className={currentLoc.includes(area) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />
                  {area}
                </button>
              ))}
            </div>
            <p className="pt-6 text-[10px] text-slate-500 font-medium">
              * Services availability and slots might vary based on neighborhood. Select your area to get precise scheduling.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 py-8 md:py-10 border-y border-white/5 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-blue-500"><Phone size={18} /></div>
            <div>
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Call Us</p>
              <p className="font-black text-xs md:text-sm">1800-NEOI-CARE</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-blue-500"><Mail size={18} /></div>
            <div>
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Email Support</p>
              <p className="font-black text-xs md:text-sm">hello@neoi.in</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-blue-500"><MessageSquare size={18} /></div>
            <div>
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">WhatsApp</p>
              <p className="font-black text-xs md:text-sm">+91 99887 76655</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:row items-center justify-between text-slate-500 text-[10px] font-medium">
          <p>© 2024 Neoi Home Services India Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [location, setLocation] = useState('Indiranagar, Bangalore');
  const [isLocModalOpen, setIsLocModalOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [showSubPicker, setShowSubPicker] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<PricingPackage | null>(null);

  const recommendedServices = useMemo(() => getRecommendedForLocation(location), [location]);
  const activeCategory = useMemo(() => SERVICES.find(s => s.id === activeCategoryId), [activeCategoryId]);

  const addToCart = (pkg: PricingPackage, serviceTitle: string) => {
    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      packageName: pkg.name,
      serviceTitle: serviceTitle,
      price: pkg.price
    };
    setCart([...cart, newItem]);
    setIsCartOpen(true);
    setSelectedPkg(null);
    setShowSubPicker(false);
  };

  const removeFromCart = (id: string) => setCart(cart.filter(item => item.id !== id));
  const handleCheckout = () => { setIsCartOpen(false); setIsBookingModalOpen(true); };
  const handleBookingSubmit = (data: BookingInfo) => { setIsBookingModalOpen(false); setCart([]); setIsSuccessModalOpen(true); };
  const resetToHome = () => { setActiveCategoryId(null); setShowSubPicker(false); setSelectedPkg(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleLocationUpdate = (area: string) => setLocation(`${area}, Bangalore`);
  const cartTotalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter'] text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Header 
        selectedLocation={location} 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)}
        onLocClick={() => setIsLocModalOpen(true)}
        onHomeClick={resetToHome}
      />
      
      <main className="pb-32 lg:pb-0 scrollbar-hide">
        {!selectedPkg ? (
          <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="bg-white border-b border-slate-100 py-10 md:py-32 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/30 rounded-l-[10rem] -z-0 translate-x-20"></div>
              <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center text-center lg:text-left">
                  <div className="space-y-6 md:space-y-10">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest border border-blue-100">
                      <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-blue-600 animate-pulse"></span>
                      Bangalore's #1 Platform
                    </div>
                    <h1 className="text-4xl md:text-8xl font-black tracking-tight text-slate-900 leading-tight md:leading-[1.05]">
                      Professional <br/>
                      <span className="text-blue-600">Home Care,</span><br/>
                      Simplified.
                    </h1>
                    <p className="text-base md:text-2xl text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                      Book premium Cleaning, Pest Control & Painting in <span className="text-blue-600 font-bold">{location.split(',')[0]}</span>.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center pt-2">
                      <a href="#services-grid" className="w-full sm:w-auto bg-slate-900 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-[2.5rem] font-black text-sm md:text-lg shadow-xl shadow-slate-100 hover:bg-blue-600 transition-all flex items-center justify-center gap-3">
                        See Services <ChevronRight size={18} />
                      </a>
                    </div>
                  </div>
                  <div className="relative hidden lg:block">
                    <div className="relative z-10 w-full aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white">
                      <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Home Care" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Banner Ads Section - NEW */}
            <BannerAdsSection />

            <div id="services-grid" className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-20 scroll-mt-24">
              <div className="text-center mb-12 md:mb-16 space-y-3">
                 <h3 className="text-2xl md:text-5xl font-black tracking-tight text-slate-900">Choose Service</h3>
                 <p className="text-slate-500 font-medium text-xs md:text-base">View specialized plans for {location.split(',')[0]}.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-8">
                {SERVICES.map((service) => {
                  const isRecommended = recommendedServices.includes(service.id as ServiceType);
                  return (
                    <button 
                      key={service.id} 
                      onClick={() => { setActiveCategoryId(service.id); setShowSubPicker(true); }}
                      className={`flex flex-col items-center gap-3.5 group transition-all p-5 rounded-[2.5rem] bg-white border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 hover:-translate-y-1 relative overflow-hidden ${isRecommended ? 'ring-1 ring-blue-500/10 shadow-lg shadow-blue-500/5' : ''}`}
                    >
                      {isRecommended && <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-tighter">Popular</div>}
                      <div className="w-full aspect-square max-w-[120px] bg-slate-50 rounded-[2rem] flex items-center justify-center border border-slate-100 group-hover:bg-white transition-all shadow-sm">
                        {service.id === 'Cleaning' && <Sparkles size={32} className="text-blue-500 md:w-10 md:h-10" />}
                        {service.id === 'Pest Control' && <ShieldCheck size={32} className="text-emerald-500 md:w-10 md:h-10" />}
                        {service.id === 'Painting' && <Paintbrush size={32} className="text-amber-500 md:w-10 md:h-10" />}
                        {service.id === 'Marble Polishing' && <Gem size={32} className="text-purple-500 md:w-10 md:h-10" />}
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="text-base font-black text-slate-800 leading-tight">{service.title}</span>
                        <span className="text-[9px] text-blue-600 font-black mt-2 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">View</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <TrendingStoriesSection />

            <section className="py-16 md:py-24 px-6 md:px-8 bg-slate-900 text-white rounded-[2rem] md:rounded-[3rem] mx-6 md:mx-8 mb-20 overflow-hidden relative">
              <div className="max-w-7xl mx-auto relative z-10 space-y-12 md:space-y-20">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-black mb-3">Trusted in Bengaluru</h3>
                  <p className="text-slate-400 font-medium text-xs md:text-base">10k+ satisfied customers across the city.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  {TESTIMONIALS.map(t => (
                    <div key={t.id} className="bg-white/5 border border-white/10 p-7 md:p-10 rounded-[2rem] space-y-4 md:space-y-6 hover:bg-white/10 transition-colors">
                      <div className="flex gap-0.5 text-blue-500">
                        {Array.from({length: 5}).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                      <p className="text-sm md:text-lg italic font-medium leading-relaxed">"{t.comment}"</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                        <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 font-black text-xs">{t.name[0]}</div>
                        <div>
                          <h5 className="font-black text-xs">{t.name}</h5>
                          <span className="text-[10px] text-slate-500 font-bold">{t.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : (
          <PackageDetailView 
            service={activeCategory!} 
            pkg={selectedPkg} 
            onAdd={addToCart}
            onBack={() => setSelectedPkg(null)}
          />
        )}

        <Footer 
          onLocationSelect={handleLocationUpdate} 
          currentLoc={location}
          onHomeClick={resetToHome}
        />
      </main>

      {showSubPicker && <SubServicePicker onBack={() => setShowSubPicker(false)} onSelect={(pkg) => { setSelectedPkg(pkg); setShowSubPicker(false); }} />}
      <LocationSelector current={location} onSelect={handleLocationUpdate} isOpen={isLocModalOpen} onClose={() => setIsLocModalOpen(false)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={removeFromCart} onCheckout={handleCheckout} />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} onSubmit={handleBookingSubmit} location={location} cartItems={cart} totalPrice={cartTotalPrice} />
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
      <BottomNav onCartClick={() => setIsCartOpen(true)} cartCount={cart.length} onHomeClick={resetToHome} />
    </div>
  );
}
