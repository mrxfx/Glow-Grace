import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Users, Scissors, Gift, Image, 
  Star, Settings, LogOut, Search, Filter, Check, X, 
  Trash2, Plus, Edit, ShieldAlert, Sparkles, Phone, MessageCircle, AlertCircle, Bell
} from 'lucide-react';
import { MockDB } from '../data';
import { Service, Package, Artist, GalleryItem, Review, Offer, Appointment, WebsiteSettings, Notification } from '../types';
import { Button, StatusBadge, EmptyState, Toast } from '../components/Common';
import { Modal } from '../components/Modal';
import { signInAdminWithGoogle, signOutAdmin, isCurrentUserAdmin } from '../firebaseSync';
import { auth } from '../firebase';

interface AdminViewsProps {
  path: string;
  navigate: (path: string) => void;
  settings: WebsiteSettings;
  onSettingsUpdate: (set: WebsiteSettings) => void;
}

export const AdminViews: React.FC<AdminViewsProps> = ({ path, navigate, settings, onSettingsUpdate }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('gg_admin_token') === 'authorized';
  });
  const [isFirebaseSynced, setIsFirebaseSynced] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // General state variables linked to DB
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active view inside dashboard
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Search & Filters states
  const [appSearch, setAppSearch] = useState('');
  const [appFilterStatus, setAppFilterStatus] = useState('All');
  const [appFilterService, setAppFilterService] = useState('All');

  // Interactive Form Dialog structures
  const [activeFormType, setActiveFormType] = useState<'service' | 'package' | 'artist' | 'gallery' | 'offer' | null>(null);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  // Reusable Form Data holders
  const [serviceForm, setServiceForm] = useState({ name: '', description: '', startingPrice: 0, category: 'Bridal', duration: 60, status: 'Active' as const, imageUrl: '' });
  const [packageForm, setPackageForm] = useState({ name: '', price: 0, description: '', features: '', isPopular: false, status: 'Active' as const });
  const [artistForm, setArtistForm] = useState({ name: '', role: 'Senior Makeup Artist', experience: '5+ Years', specialty: '', bio: '', photoUrl: '', status: 'Active' as const, rating: 5 });
  const [galleryForm, setGalleryForm] = useState({ title: '', category: 'Bridal', description: '', isFeatured: false, imageUrl: '' });
  const [offerForm, setOfferForm] = useState({ title: '', description: '', code: '', discountValue: 0, type: 'discount' as const, status: 'Active' as const });
  const [apptNotes, setApptNotes] = useState<Record<string, string>>({});

  // Sync data from local-storage / DB on mount or update event
  const refreshAllData = () => {
    setAppointments(MockDB.getAppointments());
    setServices(MockDB.getServices());
    setPackages(MockDB.getPackages());
    setArtists(MockDB.getArtists());
    setGallery(MockDB.getGallery());
    setReviews(MockDB.getReviews());
    setOffers(MockDB.getOffers());
    setNotifications(MockDB.getNotifications());
    setIsFirebaseSynced(isCurrentUserAdmin());
  };

  useEffect(() => {
    refreshAllData();
    window.addEventListener('gg_db_update', refreshAllData);
    return () => window.removeEventListener('gg_db_update', refreshAllData);
  }, []);

  // Sync state tab from route path
  useEffect(() => {
    const segments = path.split('/');
    if (segments[1] === 'dashboard') setActiveTab('dashboard');
    else if (segments[1]) setActiveTab(segments[1]);
  }, [path]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  // --- 1. LOGIN HANDLING ---
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'grace2026') {
      sessionStorage.setItem('gg_admin_token', 'authorized');
      setIsAuthenticated(true);
      setLoginError('');
      triggerToast('Welcome back, Admin!');
    } else {
      setLoginError('Incorrect credentials. Please verify username and passcode.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoginError('');
      await signInAdminWithGoogle();
      setIsAuthenticated(true);
      triggerToast('Authenticated successfully with Google cloud sync!');
    } catch (err: any) {
      setLoginError(err.message || 'Google authentication failed.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOutAdmin();
    } catch (e) {
      console.warn('Signout failed:', e);
    }
    sessionStorage.removeItem('gg_admin_token');
    setIsAuthenticated(false);
    navigate('home');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#24191B] text-[#FFF9F7] px-6 py-12 relative overflow-hidden">
        {/* Background gradient design */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B85C72]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-stone-900 border border-[#F5DDE1]/15 p-8 md:p-10 rounded-3xl space-y-8 shadow-2xl relative z-10 animate-scale-up">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4A373] block">Glow & Grace Secure Desk</span>
            <h2 className="font-serif text-3xl font-extrabold text-[#FFF9F7]">Admin Login</h2>
            <p className="text-xs text-[#FFF9F7]/60">Enter credentials or use Google auth for real-time cloud sync.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {loginError && (
              <div className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded-xl flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <p>{loginError}</p>
              </div>
            )}

            <div>
              <label htmlFor="admin-username" className="block text-[10px] uppercase tracking-widest font-bold text-[#FFF9F7]/60 mb-2">
                Desk Username
              </label>
              <input
                id="admin-username"
                type="text"
                required
                placeholder="e.g. admin"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-stone-950 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#D4A373] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="admin-passcode" className="block text-[10px] uppercase tracking-widest font-bold text-[#FFF9F7]/60 mb-2">
                Desk Passcode
              </label>
              <input
                id="admin-passcode"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-stone-950 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#D4A373] transition-colors"
              />
            </div>

            <Button type="submit" variant="accent" className="w-full font-bold">
              Unlock Terminal
            </Button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-[10px] text-white/40 uppercase tracking-widest font-semibold">Or cloud sync option</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2.5 bg-[#4285F4] hover:bg-[#357AE8] text-white font-sans font-semibold text-xs py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-500/10 cursor-pointer"
          >
            <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" stroke="none" />
            </svg>
            Sign In with Google
          </button>

          <div className="text-center">
            <button onClick={() => navigate('home')} className="text-xs text-white/50 hover:text-white underline cursor-pointer">
              Return to Website homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Key Dashboard Overview metrics
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const uniqueCustomersCount = new Set(appointments.map(a => a.phone)).size;
  const activeServicesCount = services.filter(s => s.status === 'Active').length;
  
  const estimatedRevenue = appointments
    .filter(a => a.status === 'Confirmed' || a.status === 'Completed')
    .reduce((sum, appt) => {
      // Find starting price for the service or pricing packages
      const matched = services.find(s => s.id === appt.serviceId);
      return sum + (matched ? matched.startingPrice : 1500); // fallback price
    }, 0);

  // Appt filters implementation
  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.customerName.toLowerCase().includes(appSearch.toLowerCase()) || 
                          app.phone.includes(appSearch) || 
                          app.bookingId.toLowerCase().includes(appSearch.toLowerCase());
    const matchesStatus = appFilterStatus === 'All' || app.status === appFilterStatus;
    const matchesService = appFilterService === 'All' || app.serviceId === appFilterService;
    return matchesSearch && matchesStatus && matchesService;
  });

  // --- ACTIONS HANDLERS ---
  const handleApptAction = (id: string, action: Appointment['status']) => {
    MockDB.updateAppointmentStatus(id, action, apptNotes[id]);
    triggerToast(`Appointment ${id} status modified to ${action}`);
  };

  const handleApptNotesChange = (id: string, text: string) => {
    setApptNotes(p => ({ ...p, [id]: text }));
  };

  const deleteEntity = (key: string, id: string) => {
    if (confirm('Are you absolutely sure you want to delete this resource?')) {
      const list = MockDB.get<any[]>(key);
      const filtered = list.filter(item => item.id !== id);
      MockDB.set(key, filtered);
      triggerToast('Resource deleted successfully.');
    }
  };

  // Create or Update entity handlers
  const handleServiceFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const list = MockDB.getServices();
    if (selectedFormId) {
      const idx = list.findIndex(s => s.id === selectedFormId);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...serviceForm, slug: serviceForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
        MockDB.set('services', list);
        triggerToast('Service details updated.');
      }
    } else {
      const newS: Service = {
        id: `s-${Date.now()}`,
        slug: serviceForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        ...serviceForm
      };
      list.push(newS);
      MockDB.set('services', list);
      triggerToast('New Service added successfully.');
    }
    setActiveFormType(null);
    setSelectedFormId(null);
  };

  const handlePackageFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const list = MockDB.getPackages();
    const featuresArr = packageForm.features.split('\n').filter(f => f.trim() !== '');
    if (selectedFormId) {
      const idx = list.findIndex(p => p.id === selectedFormId);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...packageForm, features: featuresArr };
        MockDB.set('packages', list);
        triggerToast('Package details updated.');
      }
    } else {
      const newP: Package = {
        id: `p-${Date.now()}`,
        ...packageForm,
        features: featuresArr
      };
      list.push(newP);
      MockDB.set('packages', list);
      triggerToast('New pricing package added.');
    }
    setActiveFormType(null);
    setSelectedFormId(null);
  };

  const handleArtistFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const list = MockDB.getArtists();
    if (selectedFormId) {
      const idx = list.findIndex(a => a.id === selectedFormId);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...artistForm, slug: artistForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
        MockDB.set('artists', list);
        triggerToast('Artist profile updated.');
      }
    } else {
      const newA: Artist = {
        id: `a-${Date.now()}`,
        slug: artistForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        ...artistForm,
        socialLinks: { instagram: '@instagram' }
      };
      list.push(newA);
      MockDB.set('artists', list);
      triggerToast('New expert profile added.');
    }
    setActiveFormType(null);
    setSelectedFormId(null);
  };

  const handleGalleryFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const list = MockDB.getGallery();
    const newG: GalleryItem = {
      id: `g-${Date.now()}`,
      imageUrl: galleryForm.imageUrl || 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?w=800',
      thumbnailUrl: galleryForm.imageUrl || 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?w=400',
      alt: galleryForm.title,
      createdAt: new Date().toISOString().split('T')[0],
      ...galleryForm
    };
    list.unshift(newG);
    MockDB.set('gallery', list);
    triggerToast('New gallery portfolio item uploaded.');
    setActiveFormType(null);
  };

  const handleOfferFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const list = MockDB.getOffers();
    if (selectedFormId) {
      const idx = list.findIndex(o => o.id === selectedFormId);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...offerForm };
        MockDB.set('offers', list);
        triggerToast('Offer details modified.');
      }
    } else {
      const newO: Offer = {
        id: `o-${Date.now()}`,
        ...offerForm
      };
      list.push(newO);
      MockDB.set('offers', list);
      triggerToast('New promotional offer created.');
    }
    setActiveFormType(null);
    setSelectedFormId(null);
  };

  const approveReview = (id: string) => {
    const list = MockDB.getReviews();
    const idx = list.findIndex(r => r.id === id);
    if (idx !== -1) {
      list[idx].status = 'Approved';
      MockDB.set('reviews', list);
      triggerToast('Review approved successfully!');
    }
  };

  const markAllNotifRead = () => {
    const list = MockDB.getNotifications();
    list.forEach(n => n.isRead = true);
    MockDB.set('notifications', list);
    triggerToast('All notifications marked as read.');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col lg:flex-row">
      {toastMessage && (
        <Toast message={toastMessage} type="info" onClose={() => setToastMessage(null)} />
      )}

      {/* --- SIDEBAR --- */}
      <aside className="w-full lg:w-64 bg-stone-900 border-b lg:border-b-0 lg:border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Header title */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#D4A373]" />
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-[#FFF9F7] block">Glow & Grace</span>
                <span className="text-[8px] font-sans tracking-[0.2em] text-[#D4A373] block uppercase">Admin Console</span>
              </div>
            </div>

            {/* Cloud Sync Status Badge */}
            <div className="mt-4 p-2 bg-stone-950 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isFirebaseSynced ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">Cloud Sync</span>
              </div>
              <span className={`text-[9px] font-sans px-1.5 py-0.5 rounded font-semibold ${
                isFirebaseSynced 
                  ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-500/15' 
                  : 'bg-amber-950/30 text-amber-400 border border-amber-500/15'
              }`}>
                {isFirebaseSynced ? 'Active' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-4 h-4" />, count: pendingCount },
              { id: 'services', label: 'Services', icon: <Scissors className="w-4 h-4" /> },
              { id: 'packages', label: 'Packages', icon: <Gift className="w-4 h-4" /> },
              { id: 'gallery', label: 'Gallery', icon: <Image className="w-4 h-4" /> },
              { id: 'artists', label: 'Artists', icon: <Users className="w-4 h-4" /> },
              { id: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4" />, count: reviews.filter(r => r.status === 'Pending').length },
              { id: 'offers', label: 'Offers & Promos', icon: <Gift className="w-4 h-4" /> },
              { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  navigate(`admin/${tab.id}`);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-[#B85C72] text-white' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="bg-[#D4A373] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer logout button */}
        <div className="pt-6 border-t border-white/5 mt-8 lg:mt-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN WORKSPACE --- */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto space-y-8">
        
        {/* --- HEADER DESK BAR --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-6 gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4A373]">Workspace</span>
            <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#FFF9F7] capitalize">
              {activeTab === 'dashboard' ? 'Overview Dashboard' : `${activeTab} Management`}
            </h2>
          </div>

          {/* Notifications Bell indicator overlay */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={markAllNotifRead}
                className="p-2.5 bg-stone-900 rounded-full border border-white/10 hover:border-white/25 text-white/80 transition-colors cursor-pointer relative"
                title="Mark all as read"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => !n.isRead) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#B85C72] rounded-full border-2 border-stone-900" />
                )}
              </button>
            </div>

            <div className="bg-stone-900 px-4 py-2 rounded-xl border border-white/10 text-xs">
              <span className="text-white/40 block">Desk Operator</span>
              <span className="text-white font-bold font-mono">rahulhaldarx15</span>
            </div>
          </div>
        </div>

        {/* --- DYNAMIC TABS PANEL CONTROLLER --- */}
        
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10 animate-fade-in">
            {/* Cards widgets grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Estimated Revenue', val: `₹${estimatedRevenue.toLocaleString('en-IN')}`, desc: 'Confirmed & Completed' },
                { label: 'Pending Bookings', val: pendingCount, desc: 'Requires confirmation', highlight: pendingCount > 0 },
                { label: 'Confirmed Bookings', val: confirmedCount, desc: 'Scheduled slots' },
                { label: 'Unique Customers', val: uniqueCustomersCount, desc: 'Logged on desk' }
              ].map((m, i) => (
                <div key={i} className={`p-6 rounded-2xl border ${
                  m.highlight ? 'bg-[#B85C72]/10 border-[#B85C72]' : 'bg-stone-900 border-white/10'
                }`}>
                  <span className="text-[10px] uppercase text-white/40 block font-bold mb-1">{m.label}</span>
                  <span className="text-2xl md:text-3xl font-serif font-extrabold text-[#FFF9F7] block">{m.val}</span>
                  <span className="text-xs text-white/50 mt-1 block">{m.desc}</span>
                </div>
              ))}
            </div>

            {/* Notifications Activity logs */}
            {notifications.length > 0 && (
              <div className="bg-stone-900 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <h3 className="font-serif text-lg font-bold">🔔 New Notifications</h3>
                  <button onClick={markAllNotifRead} className="text-xs text-[#D4A373] hover:underline cursor-pointer">
                    Mark all read
                  </button>
                </div>
                <div className="divide-y divide-white/5 max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="py-3.5 flex items-start gap-3.5">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${n.isRead ? 'bg-white/10' : 'bg-[#B85C72]'}`} />
                      <div>
                        <p className="text-xs font-bold text-white/90">{n.title}</p>
                        <p className="text-xs text-white/60 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: APPOINTMENTS PANEL */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-fade-in">
            {/* Search and Filters headers */}
            <div className="bg-stone-900 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search bookings by ID, client name, or phone..."
                  value={appSearch}
                  onChange={e => setAppSearch(e.target.value)}
                  className="w-full bg-stone-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs text-white outline-none focus:border-[#D4A373]"
                />
              </div>

              <div className="flex gap-3 w-full md:w-auto shrink-0">
                {/* Status Selector */}
                <select
                  value={appFilterStatus}
                  onChange={e => setAppFilterStatus(e.target.value)}
                  className="bg-stone-950 border border-white/10 text-white text-xs px-4 py-3 rounded-xl outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {/* Service Selector */}
                <select
                  value={appFilterService}
                  onChange={e => setAppFilterService(e.target.value)}
                  className="bg-stone-950 border border-white/10 text-white text-xs px-4 py-3 rounded-xl outline-none cursor-pointer max-w-[180px]"
                >
                  <option value="All">All Services</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* List Table of appointments */}
            {filteredAppointments.length > 0 ? (
              <div className="bg-stone-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="bg-stone-950 text-white/50 border-b border-white/10 uppercase tracking-widest font-sans font-bold">
                        <th className="p-4">ID</th>
                        <th className="p-4">Customer Details</th>
                        <th className="p-4">Service</th>
                        <th className="p-4">Date/Time</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Desk Notes / Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredAppointments.map(appt => (
                        <tr key={appt.bookingId} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-mono font-bold text-[#D4A373]">{appt.bookingId}</td>
                          <td className="p-4 space-y-0.5">
                            <span className="font-bold text-white block">{appt.customerName}</span>
                            <span className="text-white/60 block">{appt.phone}</span>
                            <span className="text-white/40 block break-all">{appt.email}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-white block">{appt.serviceName}</span>
                            {appt.artistName && <span className="text-[10px] text-white/50">Artist: {appt.artistName}</span>}
                          </td>
                          <td className="p-4 space-y-0.5">
                            <span className="font-semibold text-white block">{appt.date}</span>
                            <span className="text-white/60 block">{appt.time}</span>
                          </td>
                          <td className="p-4">
                            <StatusBadge status={appt.status} />
                          </td>
                          <td className="p-4 space-y-3 max-w-[280px]">
                            {/* Notes update area */}
                            <input
                              type="text"
                              placeholder="Desk logs (e.g. skin analysis clear)"
                              value={apptNotes[appt.bookingId] ?? appt.adminNotes ?? ''}
                              onChange={e => handleApptNotesChange(appt.bookingId, e.target.value)}
                              className="w-full bg-stone-950 border border-white/10 rounded-md py-1.5 px-3 text-[11px]"
                            />

                            {/* Active operations buttons */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {appt.status === 'Pending' && (
                                <>
                                  <button
                                    onClick={() => handleApptAction(appt.bookingId, 'Confirmed')}
                                    className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md font-bold cursor-pointer"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => handleApptAction(appt.bookingId, 'Cancelled')}
                                    className="px-2.5 py-1.5 bg-rose-950/40 border border-rose-500/30 hover:bg-rose-900 text-rose-300 rounded-md font-bold cursor-pointer"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}

                              {appt.status === 'Confirmed' && (
                                <button
                                  onClick={() => handleApptAction(appt.bookingId, 'Completed')}
                                  className="px-2.5 py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-md font-bold cursor-pointer"
                                >
                                  Complete Session
                                </button>
                              )}

                              {/* WhatsApp Direct Chat with pre-filled status update text */}
                              <a
                                href={`https://wa.me/${appt.phone.replace(/[^0-9]/g, '')}?text=Hi%20${appt.customerName},%20Glow%20Grace%20here%20regarding%20appt%20${appt.bookingId}.%20Status:%20${appt.status}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 bg-[#25D366] text-white hover:bg-[#20ba59] rounded-md font-bold flex items-center gap-1 shrink-0"
                              >
                                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                                Chat
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <EmptyState title="No bookings matched" message="Try relaxing your search terms or changing your filters." />
            )}
          </div>
        )}

        {/* TAB 3: SERVICES MENU CRUD */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-end">
              <Button
                variant="accent"
                onClick={() => {
                  setSelectedFormId(null);
                  setServiceForm({ name: '', description: '', startingPrice: 999, category: 'Bridal', duration: 60, status: 'Active', imageUrl: '' });
                  setActiveFormType('service');
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Service
              </Button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(s => (
                <div key={s.id} className="bg-stone-900 border border-white/10 rounded-2xl overflow-hidden p-5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-[#D4A373] uppercase tracking-widest">{s.category}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        s.status === 'Active' ? 'bg-emerald-950 border border-emerald-500/30 text-emerald-300' : 'bg-red-950 border border-red-500/30 text-red-300'
                      }`}>
                        {s.status}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-bold">{s.name}</h4>
                    <p className="text-xs text-white/60 line-clamp-2">{s.description}</p>
                    <span className="text-base font-serif font-extrabold text-[#B85C72] block">₹{s.startingPrice}</span>
                  </div>

                  <div className="flex gap-2 border-t border-white/5 pt-4 mt-4">
                    <button
                      onClick={() => {
                        setSelectedFormId(s.id);
                        setServiceForm({ name: s.name, description: s.description, startingPrice: s.startingPrice, category: s.category, duration: s.duration, status: s.status, imageUrl: s.imageUrl });
                        setActiveFormType('service');
                      }}
                      className="flex-1 py-2 bg-stone-950 hover:bg-white/5 rounded-lg border border-white/10 text-xs font-semibold cursor-pointer text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEntity('services', s.id)}
                      className="p-2 border border-red-500/20 text-red-400 hover:bg-red-950/20 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PACKAGES */}
        {activeTab === 'packages' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-end">
              <Button
                variant="accent"
                onClick={() => {
                  setSelectedFormId(null);
                  setPackageForm({ name: '', price: 999, description: '', features: '', isPopular: false, status: 'Active' });
                  setActiveFormType('package');
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Create Package
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map(p => (
                <div key={p.id} className="bg-stone-900 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif text-xl font-bold">{p.name}</h4>
                      {p.isPopular && <span className="bg-[#D4A373] text-black text-[9px] px-2 py-0.5 rounded-full font-bold">POPULAR</span>}
                    </div>
                    <p className="text-xs text-white/60">{p.description}</p>
                    <span className="text-2xl font-serif text-[#B85C72] block">₹{p.price}</span>
                    
                    <ul className="space-y-1.5 text-xs text-white/80 pt-2 border-t border-white/5">
                      {p.features.map((f, i) => (
                        <li key={i}>&bull; {f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 border-t border-white/5 pt-4 mt-6">
                    <button
                      onClick={() => {
                        setSelectedFormId(p.id);
                        setPackageForm({ name: p.name, price: p.price, description: p.description, features: p.features.join('\n'), isPopular: p.isPopular, status: p.status });
                        setActiveFormType('package');
                      }}
                      className="flex-1 py-2 bg-stone-950 hover:bg-white/5 rounded-lg border border-white/10 text-xs font-semibold cursor-pointer text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEntity('packages', p.id)}
                      className="p-2 border border-red-500/20 text-red-400 hover:bg-red-950/20 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-end">
              <Button
                variant="accent"
                onClick={() => {
                  setGalleryForm({ title: '', category: 'Bridal', description: '', isFeatured: false, imageUrl: '' });
                  setActiveFormType('gallery');
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Gallery Shot
              </Button>
            </div>

            <div className="columns-1 sm:columns-3 gap-6 space-y-6">
              {gallery.map(g => (
                <div key={g.id} className="break-inside-avoid bg-stone-900 border border-white/10 rounded-2xl overflow-hidden p-4 space-y-3">
                  <img src={g.imageUrl} alt={g.alt} className="w-full h-auto rounded-xl" />
                  <div>
                    <span className="text-[9px] text-[#D4A373] uppercase font-bold tracking-widest block">{g.category}</span>
                    <h5 className="font-serif text-sm font-bold text-white mt-1">{g.title}</h5>
                  </div>
                  <button
                    onClick={() => deleteEntity('gallery', g.id)}
                    className="w-full py-2 border border-red-500/20 text-red-400 hover:bg-red-950/20 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Shot
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ARTISTS */}
        {activeTab === 'artists' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-end">
              <Button
                variant="accent"
                onClick={() => {
                  setSelectedFormId(null);
                  setArtistForm({ name: '', role: 'Senior Makeup Artist', experience: '5+ Years', specialty: '', bio: '', photoUrl: '', status: 'Active', rating: 5 });
                  setActiveFormType('artist');
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Team Expert
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artists.map(a => (
                <div key={a.id} className="bg-stone-900 border border-white/10 rounded-2xl overflow-hidden p-5 space-y-4">
                  <div className="aspect-square w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-[#D4A373]">
                    <img src={a.photoUrl} alt={a.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="text-center space-y-1">
                    <h4 className="font-serif text-lg font-bold">{a.name}</h4>
                    <span className="text-xs text-[#D4A373] font-semibold block">{a.role}</span>
                  </div>

                  <div className="border-t border-white/5 pt-3 space-y-1.5 text-xs text-white/70">
                    <div className="flex justify-between">
                      <span>Experience:</span>
                      <span className="font-bold text-white">{a.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Specialty:</span>
                      <span className="font-bold text-white">{a.specialty}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 border-t border-white/5 pt-4">
                    <button
                      onClick={() => {
                        setSelectedFormId(a.id);
                        setArtistForm({ name: a.name, role: a.role, experience: a.experience, specialty: a.specialty, bio: a.bio, photoUrl: a.photoUrl, status: a.status, rating: a.rating });
                        setActiveFormType('artist');
                      }}
                      className="flex-1 py-2 bg-stone-950 hover:bg-white/5 rounded-lg border border-white/10 text-xs font-semibold cursor-pointer text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEntity('artists', a.id)}
                      className="p-2 border border-red-500/20 text-red-400 hover:bg-red-950/20 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map(r => (
                <div key={r.id} className="bg-stone-900 border border-white/10 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <img src={r.profileImageUrl} alt={r.customerName} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <h5 className="font-bold text-sm text-white">{r.customerName}</h5>
                        <span className="text-[10px] text-white/50">{r.serviceName}</span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      r.status === 'Approved' ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' : 'bg-amber-950/40 border-amber-500/30 text-amber-400'
                    }`}>
                      {r.status}
                    </span>
                  </div>

                  <p className="text-xs text-white/70 italic leading-relaxed">&ldquo;{r.reviewContent}&rdquo;</p>

                  <div className="flex gap-2 pt-2 border-t border-white/5">
                    {r.status === 'Pending' && (
                      <button
                        onClick={() => approveReview(r.id)}
                        className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-4 h-4" /> Approve Feedback
                      </button>
                    )}
                    <button
                      onClick={() => deleteEntity('reviews', r.id)}
                      className="py-2 px-3 border border-red-500/20 text-red-400 hover:bg-red-950/20 rounded-lg cursor-pointer text-xs font-semibold flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: OFFERS */}
        {activeTab === 'offers' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-end">
              <Button
                variant="accent"
                onClick={() => {
                  setSelectedFormId(null);
                  setOfferForm({ title: '', description: '', code: '', discountValue: 500, type: 'discount', status: 'Active' });
                  setActiveFormType('offer');
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Create Offer
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map(o => (
                <div key={o.id} className="bg-stone-900 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[10px] text-[#D4A373] uppercase font-bold tracking-widest">{o.type} offer</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        o.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'bg-red-950 text-red-400 border border-red-500/20'
                      }`}>
                        {o.status}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold">{o.title}</h4>
                    <p className="text-xs text-white/60">{o.description}</p>
                    {o.code && (
                      <span className="inline-block bg-white/5 border border-white/10 font-mono text-xs px-3 py-1 rounded text-[#D4A373]">
                        CODE: {o.code}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 border-t border-white/5 pt-4 mt-6">
                    <button
                      onClick={() => {
                        setSelectedFormId(o.id);
                        setOfferForm({ title: o.title, description: o.description, code: o.code || '', discountValue: o.discountValue || 0, type: o.type, status: o.status });
                        setActiveFormType('offer');
                      }}
                      className="flex-1 py-2 bg-stone-950 hover:bg-white/5 rounded-lg border border-white/10 text-xs font-semibold cursor-pointer text-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEntity('offers', o.id)}
                      className="p-2 border border-red-500/20 text-red-400 hover:bg-red-950/20 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: WEBSITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-stone-900 border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 animate-fade-in max-w-2xl">
            <h3 className="font-serif text-xl font-bold mb-4">Website Global Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 mb-1 font-semibold uppercase tracking-wider">WhatsApp Number *</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={e => onSettingsUpdate({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full bg-stone-950 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#D4A373] text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-1 font-semibold uppercase tracking-wider">Desk Phone Number *</label>
                <input
                  type="text"
                  value={settings.phoneNumber}
                  onChange={e => onSettingsUpdate({ ...settings, phoneNumber: e.target.value })}
                  className="w-full bg-stone-950 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#D4A373] text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-1 font-semibold uppercase tracking-wider">Public Address *</label>
                <input
                  type="text"
                  value={settings.salonAddress}
                  onChange={e => onSettingsUpdate({ ...settings, salonAddress: e.target.value })}
                  className="w-full bg-stone-950 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#D4A373] text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-1 font-semibold uppercase tracking-wider">Lounge Email *</label>
                <input
                  type="text"
                  value={settings.emailAddress}
                  onChange={e => onSettingsUpdate({ ...settings, emailAddress: e.target.value })}
                  className="w-full bg-stone-950 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#D4A373] text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-1 font-semibold uppercase tracking-wider">Opening Timings *</label>
                <input
                  type="text"
                  value={settings.openingHours}
                  onChange={e => onSettingsUpdate({ ...settings, openingHours: e.target.value })}
                  className="w-full bg-stone-950 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#D4A373] text-white"
                />
              </div>
            </div>

            <Button variant="accent" className="w-full mt-4" onClick={() => triggerToast('Global Settings synchronized.')}>
              Confirm Global Synchronization
            </Button>
          </div>
        )}

      </main>

      {/* --- FORM DIALOG MODALS POPUPS --- */}
      
      {/* 1. SERVICE FORM DIALOG */}
      <Modal isOpen={activeFormType === 'service'} onClose={() => setActiveFormType(null)} title={selectedFormId ? "Edit Service" : "Add Service"}>
        <form onSubmit={handleServiceFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Service Name *</label>
            <input type="text" required value={serviceForm.name} onChange={e => setServiceForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Category *</label>
            <select value={serviceForm.category} onChange={e => setServiceForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]">
              {['Bridal', 'Party', 'Engagement', 'Hair', 'Skincare', 'Nails', 'Salon'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Starting Price (₹) *</label>
              <input type="number" required value={serviceForm.startingPrice} onChange={e => setServiceForm(p => ({ ...p, startingPrice: parseInt(e.target.value) || 0 }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
            </div>
            <div>
              <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Duration (mins) *</label>
              <input type="number" required value={serviceForm.duration} onChange={e => setServiceForm(p => ({ ...p, duration: parseInt(e.target.value) || 0 }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Description *</label>
            <textarea required rows={3} value={serviceForm.description} onChange={e => setServiceForm(p => ({ ...p, description: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Service Image URL (Optional)</label>
            <input type="text" value={serviceForm.imageUrl} onChange={e => setServiceForm(p => ({ ...p, imageUrl: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" placeholder="Leave empty for default" />
          </div>
          <Button type="submit" variant="primary" className="w-full">Save Changes</Button>
        </form>
      </Modal>

      {/* 2. PACKAGE FORM DIALOG */}
      <Modal isOpen={activeFormType === 'package'} onClose={() => setActiveFormType(null)} title={selectedFormId ? "Edit Package" : "Create Package"}>
        <form onSubmit={handlePackageFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Package Name *</label>
            <input type="text" required value={packageForm.name} onChange={e => setPackageForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Investment Price (₹) *</label>
            <input type="number" required value={packageForm.price} onChange={e => setPackageForm(p => ({ ...p, price: parseInt(e.target.value) || 0 }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Description *</label>
            <textarea required rows={2} value={packageForm.description} onChange={e => setPackageForm(p => ({ ...p, description: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Features list (One per line) *</label>
            <textarea required rows={4} placeholder="HD base finishing&#10;Lash application&#10;Traditional draping" value={packageForm.features} onChange={e => setPackageForm(p => ({ ...p, features: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div className="flex items-center gap-2 py-2">
            <input type="checkbox" id="pkg-popular" checked={packageForm.isPopular} onChange={e => setPackageForm(p => ({ ...p, isPopular: e.target.checked }))} className="cursor-pointer" />
            <label htmlFor="pkg-popular" className="text-xs text-[#24191B] font-bold cursor-pointer">Mark as Most Popular package</label>
          </div>
          <Button type="submit" variant="primary" className="w-full">Save Package</Button>
        </form>
      </Modal>

      {/* 3. ARTIST FORM DIALOG */}
      <Modal isOpen={activeFormType === 'artist'} onClose={() => setActiveFormType(null)} title={selectedFormId ? "Edit Artist" : "Add Expert"}>
        <form onSubmit={handleArtistFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Artist Name *</label>
            <input type="text" required value={artistForm.name} onChange={e => setArtistForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Role *</label>
              <select value={artistForm.role} onChange={e => setArtistForm(p => ({ ...p, role: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]">
                <option value="Senior Makeup Artist">Senior Makeup Artist</option>
                <option value="Hair Specialist">Hair Specialist</option>
                <option value="Skin Expert">Skin Expert</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Experience *</label>
              <input type="text" required value={artistForm.experience} onChange={e => setArtistForm(p => ({ ...p, experience: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Specialty *</label>
            <input type="text" required value={artistForm.specialty} onChange={e => setArtistForm(p => ({ ...p, specialty: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Bio Details *</label>
            <textarea required rows={3} value={artistForm.bio} onChange={e => setArtistForm(p => ({ ...p, bio: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Photo URL *</label>
            <input type="text" required value={artistForm.photoUrl} onChange={e => setArtistForm(p => ({ ...p, photoUrl: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <Button type="submit" variant="primary" className="w-full">Save Expert</Button>
        </form>
      </Modal>

      {/* 4. GALLERY SHOT DIALOG */}
      <Modal isOpen={activeFormType === 'gallery'} onClose={() => setActiveFormType(null)} title="Upload Gallery Shot">
        <form onSubmit={handleGalleryFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Shot Title *</label>
            <input type="text" required value={galleryForm.title} onChange={e => setGalleryForm(p => ({ ...p, title: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Category *</label>
            <select value={galleryForm.category} onChange={e => setGalleryForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]">
              {['Bridal', 'Party', 'Engagement', 'Hair', 'Skincare', 'Nails', 'Salon'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Description *</label>
            <textarea required rows={2} value={galleryForm.description} onChange={e => setGalleryForm(p => ({ ...p, description: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Direct Image URL *</label>
            <input type="text" required value={galleryForm.imageUrl} onChange={e => setGalleryForm(p => ({ ...p, imageUrl: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <Button type="submit" variant="primary" className="w-full">Upload Shot</Button>
        </form>
      </Modal>

      {/* 5. OFFER FORM DIALOG */}
      <Modal isOpen={activeFormType === 'offer'} onClose={() => setActiveFormType(null)} title={selectedFormId ? "Edit Offer" : "Create Offer"}>
        <form onSubmit={handleOfferFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Offer Title *</label>
            <input type="text" required value={offerForm.title} onChange={e => setOfferForm(p => ({ ...p, title: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div>
            <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Description *</label>
            <textarea required rows={2} value={offerForm.description} onChange={e => setOfferForm(p => ({ ...p, description: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Promo Code (Optional)</label>
              <input type="text" value={offerForm.code} onChange={e => setOfferForm(p => ({ ...p, code: e.target.value }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" placeholder="e.g. BRIDAL1000" />
            </div>
            <div>
              <label className="block text-xs text-[#24191B]/60 mb-1 font-bold">Discount value (₹) *</label>
              <input type="number" value={offerForm.discountValue} onChange={e => setOfferForm(p => ({ ...p, discountValue: parseInt(e.target.value) || 0 }))} className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl py-2.5 px-3 text-sm text-[#24191B]" />
            </div>
          </div>
          <Button type="submit" variant="primary" className="w-full">Confirm Offer</Button>
        </form>
      </Modal>

    </div>
  );
};
