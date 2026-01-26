
import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  ShoppingCart,
  ChevronDown,
  X,
  Trash2,
  Plus,
  ArrowLeft,
  Settings,
  Paintbrush,
  Gem,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Star,
  CheckCircle2,
  Home as HomeIcon,
  LayoutGrid,
  ClipboardList,
  User,
  MapPin,
  Calendar,
  Clock,
  Phone,
  ArrowRight,
  LogOut,
  HelpCircle,
  CreditCard,
  MessageSquare,  Zap,
  Mail,
  Linkedin, 
  Bell
  
} from 'lucide-react';
import { SERVICES, TESTIMONIALS, SERVICE_AREAS, getRecommendedForLocation, MOCK_ORDERS, MOCK_USER } from './constants';
import { CartItem, PricingPackage, ServiceDetail, PricingOption, BookingInfo, Order, UserProfile } from './types';

// --- Components ---

const MobileHeader: React.FC<{ 
  location: string;
  cartCount: number;
  onCartClick: () => void;
  onLocClick: () => void;
}> = ({ location, cartCount, onCartClick, onLocClick }) => (
  <header className="md:hidden flex bg-white px-6 py-4 justify-between items-center sticky top-0 z-[100] border-b border-slate-50">
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5">
        <Sparkles size={18} className="text-blue-600" />
        <span className="text-lg font-black tracking-tighter text-slate-900">NEOI</span>
      </div>
      <button 
        onClick={onLocClick}
        className="flex items-center gap-1 text-blue-600 mt-0.5"
      >
        <MapPin size={14} />
        <span className="text-xs font-bold">{location}</span>
        <ChevronDown size={12} />
      </button>
    </div>

    <div 
      onClick={onCartClick}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-100 text-blue-600 relative cursor-pointer"
    >
      <ShoppingCart size={18} />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
          {cartCount}
        </span>
      )}
    </div>
  </header>
);

const DesktopHeader: React.FC<{ 
  location: string;
  cartCount: number;
  onCartClick: () => void;
  onLocClick: () => void;
  onHomeClick: () => void;
  onOrdersClick: () => void;
  onAccountClick: () => void;
}> = ({ location, cartCount, onCartClick, onLocClick, onHomeClick, onOrdersClick, onAccountClick }) => (
  <header className="hidden md:flex bg-white px-10 py-5 justify-between items-center sticky top-0 z-[100] border-b border-slate-100/50 backdrop-blur-md">
    <div className="flex items-center gap-10">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={onHomeClick}>
        <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-lg shadow-blue-200">
          <Sparkles size={20} />
        </div>
        <span className="text-xl font-black tracking-tighter text-slate-900">NEOI</span>
      </div>

      <div className="flex items-center gap-1 cursor-pointer group" onClick={onLocClick}>
        <span className="text-blue-600 font-bold text-sm">{location}</span>
        <ChevronDown size={14} className="text-blue-600 transition-transform group-hover:translate-y-0.5" />
      </div>

      <nav className="flex items-center gap-8 ml-4">
        <button onClick={onHomeClick} className="text-slate-500 font-bold text-sm hover:text-blue-600 transition-colors">Home</button>
        <button onClick={() => {}} className="text-slate-500 font-bold text-sm hover:text-blue-600 transition-colors">Services</button>
        <button onClick={onOrdersClick} className="text-slate-500 font-bold text-sm hover:text-blue-600 transition-colors">My Orders</button>
        <button onClick={onAccountClick} className="text-slate-500 font-bold text-sm hover:text-blue-600 transition-colors">Account</button>
      </nav>
    </div>

    <div className="flex items-center gap-6">
      <div 
        onClick={onCartClick}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-700 relative cursor-pointer hover:bg-white border border-slate-100 transition-all"
      >
        <ShoppingCart size={18} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white">
            {cartCount}
          </span>
        )}
      </div>
      <button 
        onClick={() => alert('Admin Panel access restricted to authorized personnel.')}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest"
      >
        <Settings size={16} /> Admin
      </button>
    </div>
  </header>
);

const OrdersView: React.FC<{ orders: Order[]; onBack: () => void }> = ({ orders, onBack }) => (
  <div className="fixed inset-0 z-[200] bg-white overflow-y-auto animate-in slide-in-from-bottom duration-300">
    <div className="max-w-2xl mx-auto min-h-screen bg-white pb-24">
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-6 py-6 border-b border-slate-100 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-800 hover:bg-slate-50 rounded-full transition-colors"><ArrowLeft size={24}/></button>
        <h2 className="text-2xl font-black text-slate-900">My Orders</h2>
      </div>

      <div className="p-6 space-y-6">
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className="p-6 rounded-[2rem] border border-slate-100 bg-white hover:shadow-xl hover:shadow-slate-100 transition-all space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">#{order.id}</span>
                  <h3 className="text-lg font-black text-slate-900">{order.serviceName}</h3>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                  order.status === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {order.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                  <Calendar size={14} /> {order.date}
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                  <Clock size={14} /> {order.time}
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-500 font-medium text-xs leading-relaxed">
                <MapPin size={14} className="shrink-0 mt-0.5" /> {order.address}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="text-xl font-black text-slate-900">₹{order.price}</span>
                <button className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">Support</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-32 space-y-4 opacity-30">
            <ClipboardList size={80} className="mx-auto" />
            <p className="font-black text-sm uppercase tracking-widest">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const AccountView: React.FC<{ user: UserProfile; onBack: () => void }> = ({ user, onBack }) => (
  <div className="fixed inset-0 z-[200] bg-white overflow-y-auto animate-in slide-in-from-bottom duration-300">
    <div className="max-w-2xl mx-auto min-h-screen bg-white pb-24">
      <div className="px-6 py-12 space-y-10">
        <div className="flex justify-between items-start">
          <button onClick={onBack} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"><ArrowLeft size={24}/></button>
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-100">
            {user.name[0]}
          </div>
          <button className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"><Bell size={24}/></button>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-900">{user.name}</h2>
          <p className="text-slate-500 font-bold">{user.phone}</p>
          <p className="text-slate-400 font-medium text-sm">{user.email}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">Settings & Management</h3>
          <div className="bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100">
            {[
              { icon: MapPin, label: 'Saved Addresses', color: 'text-blue-600' },
              { icon: CreditCard, label: 'Payment Methods', color: 'text-emerald-600' },
              { icon: MessageSquare, label: 'Chat Support', color: 'text-amber-600' },
              { icon: HelpCircle, label: 'Help Center', color: 'text-purple-600' },
            ].map((item, i) => (
              <button key={i} className="w-full flex justify-between items-center p-6 border-b border-white last:border-0 hover:bg-white transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-white shadow-sm ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  <span className="font-bold text-slate-700">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        <button className="w-full bg-red-50 text-red-600 py-6 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-100 transition-all active:scale-[0.98]">
          <LogOut size={18} /> Logout Session
        </button>
      </div>
    </div>
  </div>
);

const BookingModal: React.FC<{
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onComplete: (info: BookingInfo) => void;
}> = ({ cart, total, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState<BookingInfo>({
    name: '',
    phone: '',
    location: '',
    address: '',
    date: '',
    time: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => {
    if (step === 2) {
      setIsSuccess(true);
      onComplete(info);
    } else {
      setStep(step + 1);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in" />
        <div className="relative w-full max-w-lg bg-white rounded-[3rem] p-12 text-center space-y-8 animate-in zoom-in duration-300">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-50">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-slate-900">Booking Confirmed!</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Your appointment has been scheduled for <span className="text-slate-900 font-black">{info.date}</span> at <span className="text-slate-900 font-black">{info.time}</span>. Our expert will call you shortly.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl shadow-2xl hover:bg-blue-600 transition-all active:scale-95"
          >
            Go to My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-black text-slate-800">Complete Booking</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X size={24}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {step === 1 ? (
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Service Summary</h4>
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <p className="font-black text-slate-800 text-sm">{item.packageName}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{item.optionLabel || 'Standard'}</p>
                      </div>
                      <span className="font-black text-slate-900">₹{item.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center px-4 pt-2">
                    <span className="text-sm font-black text-slate-400">Total</span>
                    <span className="text-2xl font-black text-slate-900">₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Personal Details</h4>
                <div className="grid gap-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-blue-600 transition-colors"
                      value={info.name}
                      onChange={(e) => setInfo({...info, name: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-blue-600 transition-colors"
                      value={info.phone}
                      onChange={(e) => setInfo({...info, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Service Schedule</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="date" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-blue-600 transition-colors"
                      value={info.date}
                      onChange={(e) => setInfo({...info, date: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-blue-600 appearance-none transition-colors"
                      value={info.time}
                      onChange={(e) => setInfo({...info, time: e.target.value})}
                    >
                      <option value="">Select Time</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Location Details</h4>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea 
                    placeholder="Full Address (House No, Building, Street...)" 
                    rows={4}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-blue-600 transition-colors"
                    value={info.address}
                    onChange={(e) => setInfo({...info, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-slate-50 flex gap-4 bg-white sticky bottom-0">
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="p-6 bg-slate-50 text-slate-900 rounded-2xl font-black border border-slate-100"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <button 
            onClick={handleNext}
            disabled={step === 1 ? (!info.name || !info.phone) : (!info.date || !info.time || !info.address)}
            className="flex-1 bg-blue-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
          >
            {step === 1 ? 'Next Details' : 'Confirm Booking'}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC<{ onAction: () => void }> = ({ onAction }) => (
  <section className="px-5 md:px-10 py-6 md:py-10">
    <div className="relative w-full h-[350px] md:h-[520px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
      <img 
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600" 
        className="w-full h-full object-cover brightness-[0.7]" 
        alt="Hero Interior" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex flex-col justify-center px-8 md:px-24">
        <div className="space-y-4 md:space-y-6 max-w-2xl">
          <span className="text-blue-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] italic">NATURALS <span className="text-white/80">@ HOME</span></span>
          <h1 className="text-3xl md:text-7xl font-black text-white leading-tight">
            Expert Home<br/>Services at your<br/>doorstep.
          </h1>
          <button 
            onClick={onAction}
            className="bg-white text-slate-900 px-8 md:px-10 py-3 md:py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest shadow-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Categories: React.FC<{ onCategoryClick: () => void }> = ({ onCategoryClick }) => (
  <section className="px-5 md:px-10 py-8">
    <div className="mb-6 md:mb-10 text-center md:text-left">
      <h2 className="text-xl md:text-3xl font-black text-slate-900">Popular Categories</h2>
      <p className="text-slate-400 font-bold text-xs md:text-sm">What are you looking for today?</p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {SERVICES.map((s) => (
        <button 
          key={s.id}
          onClick={onCategoryClick}
          className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center gap-4 md:gap-6 border border-slate-50 hover:border-blue-100 hover:bg-blue-50/10 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group"
        >
          <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-50/30 border border-blue-50/50 rounded-2xl md:rounded-3xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
            {s.id === 'Cleaning' && <Sparkles size={24} />}
            {s.id === 'Pest Control' && <ShieldCheck size={24} />}
            {s.id === 'Painting' && <Paintbrush size={24} />}
            {s.id === 'Marble Polishing' && <Gem size={24} />}
          </div>
          <span className="text-[10px] md:text-sm font-black text-slate-800 uppercase tracking-widest text-center">{s.title}</span>
        </button>
      ))}
    </div>
  </section>
);

const MobileBottomNav: React.FC<{ 
  onHome: () => void; 
  onCategories: () => void; 
  onOrders: () => void; 
  onAccount: () => void; 
}> = ({ onHome, onCategories, onOrders, onAccount }) => (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-[100] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
    <button onClick={onHome} className="flex flex-col items-center gap-1 text-blue-600">
      <HomeIcon size={20} />
      <span className="text-[10px] font-bold">Home</span>
    </button>
    <button onClick={onCategories} className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors">
      <LayoutGrid size={20} />
      <span className="text-[10px] font-bold">Categories</span>
    </button>
    <button onClick={onOrders} className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors">
      <ClipboardList size={20} />
      <span className="text-[10px] font-bold">Orders</span>
    </button>
    <button onClick={onAccount} className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition-colors">
      <User size={20} />
      <span className="text-[10px] font-bold">Account</span>
    </button>
  </nav>
);

const LocationSelector: React.FC<{
  current: string;
  onSelect: (loc: string) => void;
  onClose: () => void;
}> = ({ current, onSelect, onClose }) => (
  <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-200">
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
    <div className="relative w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl animate-in zoom-in duration-200">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-slate-900">Select Location</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {SERVICE_AREAS.map(area => (
          <button 
            key={area}
            onClick={() => onSelect(area)}
            className={`w-full text-left p-4 rounded-2xl font-bold transition-all ${current === area ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600'}`}
          >
            {area}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const DetailedServiceView: React.FC<{ 
  pkg: PricingPackage;
  onBack: () => void;
  onAdd: (pkg: PricingPackage, option?: PricingOption) => void;
}> = ({ pkg, onBack, onAdd }) => {
  const [activeCustomPkg, setActiveCustomPkg] = useState<PricingPackage | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const relatedPackages = useMemo(() => {
    const parent = SERVICES.find(s => s.packages.some(p => p.id === pkg.id));
    return parent?.packages || [pkg];
  }, [pkg]);

  return (
    <div className="fixed inset-0 z-[260] bg-white animate-in slide-in-from-right duration-400 overflow-y-auto pb-20">
      <div className="max-w-[500px] mx-auto min-h-screen bg-white relative">
        <div className="sticky top-0 bg-white z-20 px-6 py-4 flex items-center gap-4 border-b border-slate-50">
           <button onClick={onBack} className="p-2 -ml-2 text-slate-800"><ArrowLeft size={24}/></button>
           <h3 className="text-lg font-bold text-slate-800">{pkg.name}</h3>
        </div>

        <div className="relative w-full h-64 overflow-hidden px-6 pt-4">
          <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-lg">
            <img src={pkg.heroImage || pkg.image} className="w-full h-full object-cover" alt="Hero Banner" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent p-8 flex flex-col justify-center">
               <h2 className="text-2xl font-black text-white leading-tight mb-1">Fresh Bathroom</h2>
               <p className="text-white/90 text-xs font-semibold mb-3">Quality Cleaning | Professional Care</p>
               <div className="flex items-center gap-2 text-white bg-black/40 backdrop-blur-sm self-start px-2 py-1 rounded-md">
                 <CheckCircle2 size={14} className="text-white" />
                 <span className="text-[10px] font-bold">Deep Cleaning by Verified Professionals</span>
               </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-12">
          {relatedPackages.map(item => {
            const isExpanded = expandedItems[item.id];
            return (
              <div key={item.id} className="space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <h4 className="text-[17px] font-bold text-slate-800 leading-tight">{item.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-slate-700">{item.rating}</span>
                      <span className="text-sm text-slate-400">({item.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 pt-1">
                      <span>Starts at ₹{item.price}</span>
                      <span>•</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                  <div className="w-28 h-28 rounded-xl overflow-hidden border border-slate-100 shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-3">
                    <ul className="space-y-1.5 transition-all">
                      {(isExpanded ? item.features : item.features.slice(0, 2)).map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed max-w-[240px]">
                          <div className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => toggleExpand(item.id)}
                      className="text-blue-600 text-xs font-bold flex items-center gap-1 group"
                    >
                      {isExpanded ? 'Show less' : 'Show more'} 
                      <ChevronRight size={12} className={`transition-transform ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center gap-1">
                    <button 
                      onClick={() => {
                        if (item.options) setActiveCustomPkg(item);
                        else onAdd(item);
                      }}
                      className="bg-white text-blue-600 border border-blue-200 px-6 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-blue-50 active:scale-95 transition-all"
                    >
                      Add
                    </button>
                    {item.optionsCount && (
                      <span className="text-[10px] font-medium text-slate-400">{item.optionsCount} options</span>
                    )}
                  </div>
                </div>
                <div className="border-b border-slate-50 pt-2" />
              </div>
            );
          })}
        </div>
      </div>

      {activeCustomPkg && (
        <div className="fixed inset-0 z-[300] flex items-end justify-center animate-in fade-in">
          <div className="absolute inset-0 bg-black/50" onClick={() => setActiveCustomPkg(null)} />
          <div className="relative w-full max-w-xl bg-white rounded-t-[2rem] p-8 space-y-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Select Option</h3>
              <button onClick={() => setActiveCustomPkg(null)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20}/></button>
            </div>
            <div className="space-y-4">
              {activeCustomPkg.options?.map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => {
                    onAdd(activeCustomPkg, opt);
                    setActiveCustomPkg(null);
                  }}
                  className="w-full flex justify-between items-center p-6 border border-slate-100 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all group"
                >
                  <span className="font-bold text-slate-700">{opt.label}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-black text-lg">₹{opt.price}</span>
                    <div className="w-6 h-6 border-2 border-slate-200 rounded-full group-hover:border-blue-600 group-hover:bg-blue-600 flex items-center justify-center">
                      <Plus size={14} className="text-white opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [location, setLocation] = useState('Indiranagar');
  const [isLocPickerOpen, setIsLocPickerOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSubPicker, setShowSubPicker] = useState(false);
  const [activeSubDetail, setActiveSubDetail] = useState<PricingPackage | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'Home' | 'Orders' | 'Account'>('Home');

  const scrollToTop = () => {
    setCurrentView('Home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (pkg: PricingPackage, option?: PricingOption) => {
    const service = SERVICES.find(s => s.packages.some(p => p.id === pkg.id));
    setCart([...cart, { 
      id: Math.random().toString(36).substr(2, 9), 
      packageName: pkg.name, 
      serviceTitle: service?.title || 'Service', 
      price: option ? option.price : pkg.price,
      optionLabel: option?.label
    }]);
    setIsCartOpen(true);
  };

  const handleBookingComplete = (info: BookingInfo) => {
    console.log('Booking complete:', info, cart);
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);
  const recommendedIds = useMemo(() => getRecommendedForLocation(location), [location]);
  const recommendedServices = useMemo(() => SERVICES.filter(s => recommendedIds.includes(s.id)), [recommendedIds]);

  return (
    <div className="min-h-screen bg-white font-['Inter'] selection:bg-blue-100 pb-20 md:pb-0">
      <MobileHeader 
        location={location} 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)} 
        onLocClick={() => setIsLocPickerOpen(true)}
      />
      
      <DesktopHeader 
        location={location} 
        cartCount={cart.length} 
        onCartClick={() => setIsCartOpen(true)}
        onLocClick={() => setIsLocPickerOpen(true)}
        onHomeClick={scrollToTop}
        onOrdersClick={() => setCurrentView('Orders')}
        onAccountClick={() => setCurrentView('Account')}
      />
      
      <main className="max-w-[1600px] mx-auto pb-12">
        <Hero onAction={() => setShowSubPicker(true)} />
        <Categories onCategoryClick={() => setShowSubPicker(true)} />

        {/* Recommended Grid */}
        <section className="px-5 md:px-10 py-12 bg-slate-50/30">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Recommended in {location}</h2>
            <p className="text-slate-400 font-bold text-sm">Top picked services for your neighborhood</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedServices.map(service => (
              <div 
                key={service.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all group cursor-pointer"
                onClick={() => setActiveSubDetail(service.packages[0])}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={service.packages[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={service.title} />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-blue-600 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                      {service.title}
                    </span>
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-black text-slate-900">{service.packages[0].name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-slate-900">₹{service.packages[0].price}</span>
                    <button className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-5 md:px-10 py-16 md:py-24">
          <div className="bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 space-y-12 md:space-y-16 border border-slate-100 shadow-sm">
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900">What Customers Say</h2>
              <p className="text-slate-400 font-bold">Real stories from real users</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map(t => (
                <div key={t.id} className="bg-slate-50/50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 space-y-8 relative group transition-all">
                  <p className="text-base md:text-lg font-medium text-slate-600 leading-relaxed italic relative z-10">"{t.comment}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-blue-100">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{t.name}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="hidden md:block bg-slate-950 pt-32 pb-16 px-10 text-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <Sparkles size={24} className="text-blue-500" />
                <span className="text-2xl font-black tracking-tighter">NEOI</span>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed max-w-xs">Professional, reliable, and premium home services. From deep cleaning to expert marble restoration.</p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-10">
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-slate-500">Our Services</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                {['Residential Cleaning', 'Commercial Pest Control', 'Interior Painting', 'Marble Crystallization'].map(s => (
                  <li key={s}><button onClick={() => setShowSubPicker(true)} className="hover:text-blue-400 transition-colors">{s}</button></li>
                ))}
              </ul>
            </div>
            <div className="space-y-10">
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-slate-500">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                <li><button onClick={() => setShowSubPicker(true)} className="hover:text-blue-400 transition-colors">Book a Service</button></li>
                <li><button onClick={() => setCurrentView('Orders')} className="hover:text-blue-400 transition-colors">My Orders</button></li>
                <li><button onClick={() => alert('Partner dashboard restricted.')} className="hover:text-blue-400 transition-colors">Partner Dashboard</button></li>
                <li><button onClick={() => alert('FAQ section loading...')} className="hover:text-blue-400 transition-colors">Help & FAQ</button></li>
              </ul>
            </div>
            <div className="space-y-10">
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-slate-500">Stay Updated</h4>
              <div className="relative">
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 text-sm font-medium" />
                <button 
                  onClick={() => alert('Subscribed!')}
                  className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-center text-slate-600 font-bold text-xs uppercase tracking-widest">
            © 2024 Neoi Home Services India Pvt Ltd.
          </div>
        </div>
      </footer>

      <MobileBottomNav 
        onHome={scrollToTop}
        onCategories={() => setShowSubPicker(true)}
        onOrders={() => setCurrentView('Orders')}
        onAccount={() => setCurrentView('Account')}
      />

      {isLocPickerOpen && (
        <LocationSelector 
          current={location}
          onSelect={(loc) => { setLocation(loc); setIsLocPickerOpen(false); }}
          onClose={() => setIsLocPickerOpen(false)}
        />
      )}

      {showSubPicker && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => setShowSubPicker(false)} />
          <div className="relative w-full max-w-[420px] bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col animate-in zoom-in duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-center items-center relative bg-white sticky top-0 z-10">
              <h3 className="text-[17px] font-semibold text-slate-700 tracking-tight">Cleaning & Pest Control</h3>
              <button onClick={() => setShowSubPicker(false)} className="absolute right-6 p-1 text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
              {SERVICES.map(service => (
                <div key={service.id}>
                  <h4 className="font-semibold text-[14px] text-slate-800 mb-6">{service.title}</h4>
                  <div className="grid grid-cols-3 gap-y-10 gap-x-4">
                    {service.packages.map(pkg => (
                      <button key={pkg.id} onClick={() => { setActiveSubDetail(pkg); setShowSubPicker(false); }} className="flex flex-col items-center gap-3 group">
                        <div className="w-full aspect-square rounded-lg overflow-hidden border border-slate-100 group-hover:border-blue-200 transition-all">
                          <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={pkg.name} />
                        </div>
                        <span className="text-[10px] font-medium text-slate-600 text-center leading-tight">{pkg.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubDetail && (
        <DetailedServiceView 
          pkg={activeSubDetail}
          onBack={() => setActiveSubDetail(null)}
          onAdd={handleAddToCart}
        />
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-[400] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-2xl font-black">Your Cart</h3>
              <button onClick={() => setIsCartOpen(false)} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100"><X size={24}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.map(item => (
                <div key={item.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{item.serviceTitle}</p>
                    <p className="font-black text-slate-800 text-lg leading-tight">{item.packageName}</p>
                    {item.optionLabel && <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{item.optionLabel}</p>}
                    <p className="font-black text-slate-900 text-xl mt-2">₹{item.price}</p>
                  </div>
                  <button onClick={() => setCart(cart.filter(c => c.id !== item.id))} className="text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={24}/>
                  </button>
                </div>
              ))}
              {cart.length === 0 && (
                <div className="text-center py-32 opacity-20">
                  <ShoppingCart size={80} className="mx-auto mb-6" />
                  <p className="font-black text-sm uppercase tracking-widest">Cart is empty</p>
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total Payable</span>
                  <span className="text-4xl font-black">₹{cartTotal}</span>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setIsBookingOpen(true); }} 
                  className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl shadow-xl hover:bg-blue-700 active:scale-[0.98]"
                >
                  Confirm Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {isBookingOpen && (
        <BookingModal 
          cart={cart}
          total={cartTotal}
          onClose={() => {
            setIsBookingOpen(false);
            setCart([]); // Clear cart after a successful booking view closes
            setCurrentView('Orders'); // Automatically go to orders to see the new booking
          }}
          onComplete={(info) => {
            handleBookingComplete(info);
          }}
        />
      )}

      {/* Conditional View Overlays */}
      {currentView === 'Orders' && (
        <OrdersView 
          orders={MOCK_ORDERS} 
          onBack={() => setCurrentView('Home')} 
        />
      )}
      {currentView === 'Account' && (
        <AccountView 
          user={MOCK_USER} 
          onBack={() => setCurrentView('Home')} 
        />
      )}
    </div>
  );
}
