import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Star, Calendar, Clock, Heart, Award, ShieldCheck, 
  Smile, Coins, Coffee, ArrowRight, ArrowLeft, Instagram, 
  MapPin, Phone, Mail, FileText, ChevronRight, CheckCircle2,
  Share2, Send, Copy, Check
} from 'lucide-react';
import { MockDB } from '../data';
import { Service, Package, Artist, GalleryItem, Review, Offer, WebsiteSettings, Appointment } from '../types';
import { Button, LoadingState, EmptyState, Toast } from '../components/Common';
import { ServiceCard, PackageCard, ArtistCard, ReviewCard } from '../components/Cards';
import { Lightbox, Modal, ReelModal } from '../components/Modal';
import { BookingForm, BookingConfirmation } from '../components/BookingForm';
import { ContactSection } from '../components/ContactSection';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { BridalShowcase } from '../components/BridalShowcase';
import { ReelGallery } from '../components/ReelGallery';

interface CustomerViewsProps {
  path: string;
  params: Record<string, string>;
  navigate: (path: string) => void;
  settings: WebsiteSettings;
}

// ==========================================
// 1. HOME VIEW (AUTHENTIC PARLOUR & MUA PROFILE)
// ==========================================
export const HomeView: React.FC<CustomerViewsProps> = ({ navigate, settings }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeReel, setActiveReel] = useState<GalleryItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, { count: number; liked: boolean }>>({});

  useEffect(() => {
    setServices(MockDB.getServices().filter(s => s.status === 'Active'));
    setPackages(MockDB.getPackages().filter(p => p.status === 'Active').slice(0, 3));
    setReviews(MockDB.getReviews().filter(r => r.status === 'Approved').slice(0, 3));
    setOffers(MockDB.getOffers().filter(o => o.status === 'Active'));
    const gal = MockDB.getGallery();
    setGallery(gal);

    // Initialize likes
    const initialLikes: Record<string, { count: number; liked: boolean }> = {};
    gal.forEach(item => {
      initialLikes[item.id] = { count: item.likes || Math.floor(Math.random() * 200 + 150), liked: false };
    });
    setLikesMap(initialLikes);
  }, []);

  const handleToggleLike = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setLikesMap(prev => {
      const current = prev[itemId] || { count: 100, liked: false };
      return {
        ...prev,
        [itemId]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked
        }
      };
    });
  };

  const portfolioCategories = ['All', 'Bridal', 'Makeup', 'Hair', 'Facial', 'Nails', 'Reels'];

  const filteredPortfolio = gallery.filter(item => {
    if (activePortfolioCategory === 'All') return true;
    if (activePortfolioCategory === 'Reels') return item.mediaType === 'video';
    return item.category.toLowerCase().includes(activePortfolioCategory.toLowerCase());
  });

  // Instagram-worthy visual feed posts
  const instagramFeed = [
    { id: 1, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80', likes: '243', type: 'Bridal Makeup' },
    { id: 2, img: 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?w=500&auto=format&fit=crop&q=80', likes: '189', type: 'Bridal Saree' },
    { id: 3, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80', likes: '312', type: 'Hair Styling' },
    { id: 4, img: 'https://images.unsplash.com/photo-1604654894610-df4906b197ae?w=500&auto=format&fit=crop&q=80', likes: '154', type: 'Premium Nail Art' },
    { id: 5, img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&auto=format&fit=crop&q=80', likes: '202', type: 'Facial & Glow' },
    { id: 6, img: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=500&auto=format&fit=crop&q=80', likes: '425', type: 'Salon Ambience' },
    { id: 7, img: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=500&auto=format&fit=crop&q=80', likes: '378', type: 'Traditional Makeover' },
    { id: 8, img: 'https://images.unsplash.com/photo-1610189012903-b44403845758?w=500&auto=format&fit=crop&q=80', likes: '291', type: 'Party Glamour' }
  ];

  return (
    <div className="space-y-24 pb-20 bg-[#FFFDFB]">
      
      {/* Lightbox for photo modal */}
      <Lightbox
        images={filteredPortfolio}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
        onBook={(lookName) => navigate('booking')}
      />

      {/* Reel Modal for video modal */}
      <ReelModal
        reel={activeReel}
        isOpen={activeReel !== null}
        onClose={() => setActiveReel(null)}
        onBook={(lookName) => navigate('booking')}
      />

      {/* 1A. PROFILE-STYLE ARTIST & PARLOUR HERO */}
      <section id="parlour-profile" className="relative bg-gradient-to-b from-[#FFF0F2] via-[#FAF6F0] to-[#FFFDFB] pt-32 pb-16 px-6 border-b border-[#F5DDE1]/60">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Profile Header Block (Avatar + Info + Verification) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* Circular Artist / Parlour Avatar with Gold Ring & Verified Checkmark */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#B85C72] to-[#E5C494] shadow-xl">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop&q=80"
                    alt="Glow & Grace Ladies Beauty Parlour & Makeup Artist"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              {/* Verified Badge */}
              <div 
                className="absolute -bottom-1 -right-1 bg-[#059669] text-white p-1.5 rounded-full shadow-md border-2 border-white flex items-center justify-center"
                title="Verified Ladies Beauty Parlour & Makeup Artist"
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Profile Identity Details */}
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 bg-[#B85C72]/10 border border-[#B85C72]/20 text-[#B85C72] text-[10px] uppercase font-bold tracking-widest rounded-full font-sans">
                  Verified Ladies Salon
                </span>
                <span className="px-2.5 py-1 bg-[#D4AF37]/15 text-[#802339] text-[10px] font-bold tracking-wider rounded-full font-sans flex items-center gap-1">
                  👑 100% Women-Only Sanctuary
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3B0F19] tracking-tight">
                Glow & Grace
                <span className="block text-xl sm:text-2xl font-serif text-[#B85C72] font-semibold mt-1">
                  Ladies Beauty Parlour & Makeup Artist
                </span>
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#3B0F19]/70 font-sans">
                <span className="font-semibold text-[#802339]">Makeup Artist • Hair • Skin • Bridal</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  4.9 (120+ Google Reviews)
                </span>
              </div>

              {/* Bio snippet */}
              <p className="text-xs sm:text-sm text-[#3B0F19]/80 font-sans leading-relaxed max-w-xl">
                Professional bridal makeup, hairstyling, and traditional parlour care crafted for every celebration and glowing moment. Specializing in Bengali Chandan art, royal North & South Indian bridal transformations, and authentic skin therapies.
              </p>
            </div>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-y border-[#F5DDE1]/70 py-4 bg-white/60 backdrop-blur-xs rounded-2xl px-4 border">
            <div className="text-center sm:text-left">
              <span className="block font-serif text-xl sm:text-2xl font-black text-[#B85C72]">500+</span>
              <span className="text-[11px] font-sans text-[#3B0F19]/70 font-semibold">Happy Brides & Clients</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block font-serif text-xl sm:text-2xl font-black text-[#3B0F19]">5+ Years</span>
              <span className="text-[11px] font-sans text-[#3B0F19]/70 font-semibold">Artistry Experience</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block font-serif text-xl sm:text-2xl font-black text-[#B85C72]">1000+</span>
              <span className="text-[11px] font-sans text-[#3B0F19]/70 font-semibold">Transformations</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block font-serif text-xl sm:text-2xl font-black text-[#059669]">100%</span>
              <span className="text-[11px] font-sans text-[#3B0F19]/70 font-semibold">Women Safe & Private</span>
            </div>
          </div>

          {/* Quick Action Profile Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
            <button
              onClick={() => navigate('booking')}
              className="px-6 py-3 bg-[#B85C72] hover:bg-[#802339] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              Book Appointment
            </button>
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Glow%20and%20Grace!%20I\'d%20like%20to%20inquire%20about%20booking%20a%20beauty%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-xs font-bold tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>💬</span>
              WhatsApp Us
            </a>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white hover:bg-[#FFF0F2] text-[#3B0F19] border border-[#F5DDE1] rounded-xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-[#B85C72]" />
              @glowandgrace
            </a>
          </div>

        </div>
      </section>

      {/* 1B. PORTFOLIO-FIRST: OUR WORK ✨ (IMMEDIATELY AFTER PROFILE!) */}
      <section id="portfolio-first" className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F5DDE1] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#B85C72] font-extrabold font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              PHOTO-FIRST REAL WORK
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#3B0F19]">
              Our Work ✨
            </h2>
            <p className="text-xs sm:text-sm text-[#3B0F19]/70 font-sans">
              Explore authentic bridal makeovers, party glam, hair designs, and salon transformations.
            </p>
          </div>

          {/* Category Tabs Filter */}
          <div className="flex flex-wrap gap-1.5">
            {portfolioCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActivePortfolioCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                  activePortfolioCategory === cat
                    ? 'bg-[#3B0F19] text-[#FFFDF9] shadow-sm'
                    : 'bg-[#FFF0F2] text-[#3B0F19]/70 border border-[#F5DDE1] hover:text-[#B85C72]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Masonry / Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPortfolio.slice(0, 12).map((item, index) => {
            const isVideo = item.mediaType === 'video';
            const likeInfo = likesMap[item.id] || { count: item.likes || 150, liked: false };

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isVideo) {
                    setActiveReel(item);
                  } else {
                    setLightboxIndex(index);
                  }
                }}
                className="group relative rounded-2xl overflow-hidden bg-stone-100 border border-[#F5DDE1] shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-end aspect-square"
              >
                {/* Photo / Thumbnail */}
                <img
                  src={item.imageUrl}
                  alt={item.alt || item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-sans font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/20">
                    {item.category}
                  </span>

                  {isVideo ? (
                    <span className="bg-[#B85C72] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      ▶ Reel
                    </span>
                  ) : (
                    <button
                      onClick={(e) => handleToggleLike(e, item.id)}
                      className={`p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-125 ${
                        likeInfo.liked ? 'bg-rose-600 text-white' : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                      title="Like this look"
                    >
                      <Heart className={`w-3.5 h-3.5 ${likeInfo.liked ? 'fill-white' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Bottom Details Bar */}
                <div className="relative z-10 p-3.5 space-y-1 text-white">
                  <h4 className="font-serif font-bold text-xs sm:text-sm leading-tight line-clamp-1 group-hover:text-[#E5C494] transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-white/80 font-sans">
                    <span className="line-clamp-1">{item.description}</span>
                    <span className="shrink-0 ml-2 font-semibold text-rose-300">
                      ❤️ {likeInfo.count}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Gallery Link */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigate('gallery')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#FFF0F2] text-[#B85C72] border border-[#F5DDE1] rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            View Full Portfolio & All 20+ Looks &rarr;
          </button>
        </div>
      </section>

      {/* 1C. BRIDAL LOOKS 👰 (SHOWCASE) */}
      <BridalShowcase 
        onBook={(lookName) => navigate('booking')} 
        onViewAll={() => navigate('services')}
      />

      {/* 1D. THE GLOW-UP: BEFORE & AFTER ✨ */}
      <BeforeAfterSlider onBook={(serviceName) => navigate('booking')} />

      {/* 1E. BEAUTY REELS 🎬 (VERTICAL 9:16 CARDS) */}
      <ReelGallery 
        reels={gallery.filter(g => g.mediaType === 'video')} 
        onBook={(lookName) => navigate('booking')}
      />

      {/* 1F. LIMITED TIME OFFERS */}
      {offers.length > 0 && (
        <section id="promo-banner" className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#3B0F19] via-[#4A121A] to-[#3B0F19] rounded-3xl p-8 md:p-10 text-[#FFFDF9] relative overflow-hidden border-b-4 border-[#D4AF37] shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-extrabold block">
                  ✨ LIMITED TIME FESTIVE EXCLUSIVE ✨
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#FFFDF9]">
                  {offers[0].title}
                </h3>
                <p className="text-sm text-white/80 max-w-xl font-sans">
                  {offers[0].description}
                </p>
              </div>
              <Button
                variant="accent"
                onClick={() => navigate('booking')}
                className="shrink-0 flex items-center gap-2 bg-[#D4AF37] hover:bg-[#E5C494] text-[#3B0F19] border-none font-bold"
              >
                Claim Offer / Book Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            {/* Background design elements */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/[0.03] rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-[#B85C72]/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </section>
      )}

      {/* 1G. REAL PARLOUR RATE MENU SECTION */}
      <section id="salon-menu-list" className="max-w-4xl mx-auto px-6">
        <div className="bg-[#FAF6F0] border border-[#E5C494]/40 p-8 md:p-12 rounded-[32px] shadow-sm relative overflow-hidden">
          {/* Elegant gold corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37] m-4" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AF37] m-4" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#D4AF37] m-4" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37] m-4" />

          {/* Header */}
          <div className="text-center space-y-2 mb-10">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B85C72] font-extrabold block">
              TRADITIONAL SALON CARD
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#3B0F19]">
              Signature Parlour Rate List
            </h2>
            <div className="w-12 h-px bg-[#D4AF37]/50 mx-auto" />
            <p className="text-[11px] uppercase tracking-widest text-[#3B0F19]/50 font-sans font-semibold">
              Pure Ladies Care &bull; Only Top Brands Used (MAC, L'Oréal, O3+)
            </p>
          </div>

          {/* Dotted Menu list */}
          <div className="space-y-6 md:space-y-7">
            
            {/* ITEM 1 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex-1 flex items-baseline gap-2">
                <span className="font-serif text-sm md:text-base font-bold text-[#3B0F19] tracking-wide whitespace-nowrap">
                  BRIDAL MAKEUP (HD / AIRBRUSH)
                </span>
                <span className="flex-grow border-b border-dashed border-[#3B0F19]/20 self-stretch min-w-[20px]" />
              </div>
              <div className="text-right sm:text-left shrink-0">
                <span className="text-xs text-[#3B0F19]/60 font-sans mr-2">Starting from</span>
                <span className="font-serif text-sm md:text-base font-extrabold text-[#B85C72]">₹7,999</span>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex-1 flex items-baseline gap-2">
                <span className="font-serif text-sm md:text-base font-bold text-[#3B0F19] tracking-wide whitespace-nowrap">
                  PARTY MAKEUP & BLOWOUT
                </span>
                <span className="flex-grow border-b border-dashed border-[#3B0F19]/20 self-stretch min-w-[20px]" />
              </div>
              <div className="text-right sm:text-left shrink-0">
                <span className="text-xs text-[#3B0F19]/60 font-sans mr-2">Starting from</span>
                <span className="font-serif text-sm md:text-base font-extrabold text-[#B85C72]">₹1,999</span>
              </div>
            </div>

            {/* ITEM 3 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex-1 flex items-baseline gap-2">
                <span className="font-serif text-sm md:text-base font-bold text-[#3B0F19] tracking-wide whitespace-nowrap">
                  ENGAGEMENT / SANGEET MAKEOVER
                </span>
                <span className="flex-grow border-b border-dashed border-[#3B0F19]/20 self-stretch min-w-[20px]" />
              </div>
              <div className="text-right sm:text-left shrink-0">
                <span className="text-xs text-[#3B0F19]/60 font-sans mr-2">Starting from</span>
                <span className="font-serif text-sm md:text-base font-extrabold text-[#B85C72]">₹3,999</span>
              </div>
            </div>

            {/* ITEM 4 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex-1 flex items-baseline gap-2">
                <span className="font-serif text-sm md:text-base font-bold text-[#3B0F19] tracking-wide whitespace-nowrap">
                  24K GOLD DUST FACIAL THERAPY
                </span>
                <span className="flex-grow border-b border-dashed border-[#3B0F19]/20 self-stretch min-w-[20px]" />
              </div>
              <div className="text-right sm:text-left shrink-0">
                <span className="text-xs text-[#3B0F19]/60 font-sans mr-2">Starting from</span>
                <span className="font-serif text-sm md:text-base font-extrabold text-[#B85C72]">₹699</span>
              </div>
            </div>

            {/* ITEM 5 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex-1 flex items-baseline gap-2">
                <span className="font-serif text-sm md:text-base font-bold text-[#3B0F19] tracking-wide whitespace-nowrap">
                  L'OREAL DEEP HYDRATION HAIR SPA
                </span>
                <span className="flex-grow border-b border-dashed border-[#3B0F19]/20 self-stretch min-w-[20px]" />
              </div>
              <div className="text-right sm:text-left shrink-0">
                <span className="text-xs text-[#3B0F19]/60 font-sans mr-2">Starting from</span>
                <span className="font-serif text-sm md:text-base font-extrabold text-[#B85C72]">₹799</span>
              </div>
            </div>

            {/* ITEM 6 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex-1 flex items-baseline gap-2">
                <span className="font-serif text-sm md:text-base font-bold text-[#3B0F19] tracking-wide whitespace-nowrap">
                  EYEBROW SHAPING & THREADING
                </span>
                <span className="flex-grow border-b border-dashed border-[#3B0F19]/20 self-stretch min-w-[20px]" />
              </div>
              <div className="text-right sm:text-left shrink-0">
                <span className="text-xs text-[#3B0F19]/60 font-sans mr-2">Starting from</span>
                <span className="font-serif text-sm md:text-base font-extrabold text-[#B85C72]">₹50</span>
              </div>
            </div>

            {/* ITEM 7 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex-1 flex items-baseline gap-2">
                <span className="font-serif text-sm md:text-base font-bold text-[#3B0F19] tracking-wide whitespace-nowrap">
                  NOURISHING MANICURE & HAND SPA
                </span>
                <span className="flex-grow border-b border-dashed border-[#3B0F19]/20 self-stretch min-w-[20px]" />
              </div>
              <div className="text-right sm:text-left shrink-0">
                <span className="text-xs text-[#3B0F19]/60 font-sans mr-2">Starting from</span>
                <span className="font-serif text-sm md:text-base font-extrabold text-[#B85C72]">₹399</span>
              </div>
            </div>

            {/* ITEM 8 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex-1 flex items-baseline gap-2">
                <span className="font-serif text-sm md:text-base font-bold text-[#3B0F19] tracking-wide whitespace-nowrap">
                  HAIR SMOOTHENING / KERATIN INFUSION
                </span>
                <span className="flex-grow border-b border-dashed border-[#3B0F19]/20 self-stretch min-w-[20px]" />
              </div>
              <div className="text-right sm:text-left shrink-0">
                <span className="text-xs text-[#3B0F19]/60 font-sans mr-2">Starting from</span>
                <span className="font-serif text-sm md:text-base font-extrabold text-[#B85C72]">₹2,499</span>
              </div>
            </div>

            {/* ITEM 9 */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex-1 flex items-baseline gap-2">
                <span className="font-serif text-sm md:text-base font-bold text-[#3B0F19] tracking-wide whitespace-nowrap">
                  BANARASI & SILK SAREE DRAPING
                </span>
                <span className="flex-grow border-b border-dashed border-[#3B0F19]/20 self-stretch min-w-[20px]" />
              </div>
              <div className="text-right sm:text-left shrink-0">
                <span className="text-xs text-[#3B0F19]/60 font-sans mr-2">Starting from</span>
                <span className="font-serif text-sm md:text-base font-extrabold text-[#B85C72]">₹599</span>
              </div>
            </div>
          </div>

          {/* Quick Disclaimer / Promo */}
          <div className="mt-10 pt-6 border-t border-[#D4AF37]/20 text-center space-y-3">
            <p className="text-[11px] text-[#3B0F19]/65 italic font-sans">
              * Note: Custom adjustments and package combos are fully editable inside our secure Admin system.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => navigate('services')}
                className="text-xs font-bold text-[#B85C72] hover:underline cursor-pointer"
              >
                View Full Interactive Menu &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 1H. MEET YOUR MAKEUP ARTIST & TEAM */}
      <section id="meet-artist" className="max-w-6xl mx-auto px-6">
        <div className="bg-white border border-[#F5DDE1] rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Artist Photo */}
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border-2 border-[#F5DDE1] relative bg-rose-50">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80"
                alt="Rajeshwari Devi - Lead Makeup Artist & Founder"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest block font-sans">
                  Founder & Lead MUA
                </span>
                <h3 className="font-serif text-lg font-bold">Rajeshwari Devi</h3>
              </div>
            </div>
          </div>

          {/* Artist Story & Philosophy */}
          <div className="md:col-span-7 space-y-5">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.2em] text-[#B85C72] font-extrabold font-sans block">
                MEET YOUR MAKEUP ARTIST
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3B0F19]">
                “Beauty is about feeling confident in your own skin.”
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#3B0F19]/80 font-sans leading-relaxed">
              Trained and certified by MAC and VLCC Academy with over 7 years of bridal artistry, Rajeshwari Devi brings a delicate, personalized touch to every client. Whether preparing for your royal wedding day, an anniversary party, or regular self-care, our studio promises an unhurried, hygienic, and warm experience.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#FFF0F2] rounded-xl border border-[#F5DDE1]">
                <span className="text-xs font-bold text-[#3B0F19] block">100% Original Products</span>
                <span className="text-[10px] text-[#3B0F19]/60 font-sans block">MAC, Huda Beauty, Kryolan, L'Oréal</span>
              </div>
              <div className="p-3 bg-[#FFF0F2] rounded-xl border border-[#F5DDE1]">
                <span className="text-xs font-bold text-[#3B0F19] block">Hygiene Guaranteed</span>
                <span className="text-[10px] text-[#3B0F19]/60 font-sans block">Sterilized brushes, disposable applicators</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigate('booking')}
                className="px-5 py-2.5 bg-[#B85C72] hover:bg-[#802339] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                Book with Rajeshwari
              </button>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Rajeshwari!%20I\'d%20like%20to%20consult%20with%20you%20for%20my%20upcoming%20bridal/event%20look.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-xs font-bold tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>💬</span>
                WhatsApp Artist
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 1I. INSTAGRAM INTEGRATION */}
      <section id="instagram-feed" className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF0F2] rounded-full text-[10px] font-sans font-extrabold tracking-widest text-[#B85C72]">
            <Instagram className="w-3.5 h-3.5" />
            INSTAGRAM VIBE
          </div>
          <h2 className="font-serif text-3xl font-extrabold text-[#3B0F19]">
            Follow Our Beauty Journey ✨
          </h2>
          <a 
            href={settings.instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#B85C72] hover:text-[#802339] font-sans font-bold tracking-wide text-sm block"
          >
            @glowandgrace
          </a>
        </div>

        {/* 8 Post Grid with rich hover effect */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {instagramFeed.map((post) => (
            <div 
              key={post.id} 
              className="aspect-square relative rounded-2xl overflow-hidden group border border-[#F5DDE1]/60 shadow-xs cursor-pointer bg-stone-100"
            >
              <img 
                src={post.img} 
                alt={post.type} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Instagram Hover state */}
              <div className="absolute inset-0 bg-[#3B0F19]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white space-y-1.5">
                <span className="text-xl">❤️</span>
                <span className="text-xs font-bold tracking-wider font-sans">{post.likes} Likes</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#D4AF37] block">
                  {post.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <a 
            href={settings.instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B0F19] hover:bg-[#802339] text-[#FFFDF9] rounded-full text-xs font-bold tracking-wider transition-colors shadow-md"
          >
            <Instagram className="w-4 h-4" />
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* 1J. TESTIMONIALS (WARM & LOCAL BEAUTY PORTFOLIO STORIES) */}
      <section id="home-testimonials" className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#B85C72] font-extrabold font-sans block">
            Sweet Words
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-[#3B0F19]">
            Loved By Modern Ladies
          </h2>
          <div className="w-12 h-0.5 bg-[#B85C72] mx-auto opacity-40 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              text: "“Loved my bridal look! The entire team was so friendly, professional, and took incredible care of my traditional saree pleating, mukut placement and Chandan art.”",
              author: "Priyanka Sharma",
              event: "Bridal Makeup Client",
              rating: 5
            },
            {
              text: "“Hands down the best facial skin polish I’ve ever had! The women-only space is extremely comforting, peaceful and hygienic. Highly recommend!”",
              author: "Ritu Banerjee",
              event: "Glow facial regular",
              rating: 5
            },
            {
              text: "“Got beautiful nail extensions and festive party makeup done for my cousin’s wedding. Everyone at the event complimented the clean work!”",
              author: "Ananya Deshmukh",
              event: "Party Makeup Client",
              rating: 5
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="bg-[#FFF0F2]/40 border border-[#F5DDE1] p-8 rounded-3xl space-y-5 shadow-xs relative flex flex-col justify-between"
            >
              {/* Elegant local quote symbol */}
              <span className="font-serif text-5xl text-[#B85C72]/15 absolute top-4 left-6 pointer-events-none">&ldquo;</span>
              <p className="text-[#3B0F19]/80 text-sm leading-relaxed font-sans italic relative z-10">
                {item.text}
              </p>
              <div className="flex items-center justify-between border-t border-[#F5DDE1]/40 pt-4 mt-4">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#3B0F19]">{item.author}</h4>
                  <span className="text-[10px] text-[#B85C72] uppercase font-sans font-bold block mt-0.5">{item.event}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, rIdx) => (
                    <Star key={rIdx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('reviews')}
            className="border-[#F5DDE1] text-[#3B0F19] hover:text-[#B85C72] hover:bg-[#FFF0F2]"
          >
            Read More Reviews
          </Button>
        </div>
      </section>

      {/* 1K. GLOW-UP CTA AT THE BOTTOM */}
      <section id="ready-glow" className="max-w-5xl mx-auto px-6 pt-12">
        <div className="bg-[#FFF0F2] border border-[#F5DDE1] rounded-[40px] p-8 md:p-14 text-center space-y-6 relative overflow-hidden shadow-sm">
          {/* Subtle design leaf outline or golden glow bubble */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-lg mx-auto">
            <span className="text-[11px] font-sans font-extrabold tracking-[0.25em] text-[#B85C72] uppercase block">
              YOUR TIME TO RADIATE ✨
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#3B0F19] tracking-tight">
              Ready for Your Glow-Up?
            </h2>
            <p className="text-sm text-[#3B0F19]/70 leading-relaxed font-sans font-medium">
              “Book your beauty appointment today with our certified artists.”
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto pt-2">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('booking')}
              className="w-full sm:flex-1 bg-[#B85C72] hover:bg-[#802339] border-none text-white font-bold"
            >
              Book Appointment
            </Button>
            <a 
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Glow%20and%20Grace!%20I\'d%20like%20to%20book%20a%20beauty%20parlour%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>💬</span>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON (DESKTOP & MOBILE) */}
      <a
        href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Glow%20and%20Grace!%20I\'d%20like%20to%20inquire%20about%20your%20beauty%20services%20and%20booking.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 sm:bottom-8 right-6 z-40 bg-[#059669] hover:bg-[#047857] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2.5 group cursor-pointer border-2 border-white/80"
        title="Chat with Glow & Grace on WhatsApp"
      >
        <span className="text-xl">💬</span>
        <span className="hidden sm:inline-block font-sans text-xs font-bold tracking-wide pr-1">
          WhatsApp Us
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] rounded-full animate-ping pointer-events-none" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] rounded-full border border-white" />
      </a>

      {/* MOBILE APP VIEW STICKY BOOK APPOINTMENT FOR BOTTOM DEVICE COMFORT */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-30">
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => navigate('booking')}
          className="w-full bg-[#B85C72] hover:bg-[#802339] border-none text-white font-bold text-xs py-3.5 shadow-lg flex items-center justify-center gap-2 animate-pulse-subtle"
        >
          <Calendar className="w-4 h-4" />
          Book Appointment
        </Button>
      </div>

    </div>
  );
};


// ==========================================
// 2. ABOUT VIEW
// ==========================================
export const AboutView: React.FC<CustomerViewsProps> = ({ navigate }) => {
  return (
    <div className="py-24 space-y-24">
      {/* Editorial Split layout */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Interior image */}
        <div className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-stone-100">
          <img 
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&auto=format&fit=crop&q=80" 
            alt="Warm elegant Glow & Grace ladies parlour interiors" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#24191B]/10" />
        </div>

        {/* Right content details */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B85C72] font-semibold block">
              More Than a Salon.
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#24191B] tracking-tight">
              Your Premium Parlour Space.
            </h2>
            <p className="text-sm md:text-base text-[#24191B]/70 leading-relaxed font-sans">
              Beauty is not just about how you look on the outside. It is fundamentally about the confidence and elegance you feel on the inside. Our dedicated parlour space is designed to provide a relaxing, completely private, and customized beauty experience for every woman.
            </p>
            <p className="text-xs text-[#24191B]/60 leading-relaxed font-sans">
              Whether you are preparing for your royal wedding day, getting dolled up for a family celebration, or enjoying a nourishing facial cleanup, we cater to all your requirements using premium cosmetics and sterilized equipment.
            </p>
          </div>

          {/* Stats metrics block */}
          <div className="grid grid-cols-2 gap-4 border-t border-[#F5DDE1] pt-8">
            {[
              { value: '500+ Clients', label: 'Satisfied Brides & Guests' },
              { value: '5+ Years', label: 'In Professional Beauty' },
              { value: '10+ Services', label: 'Curated Custom Menus' },
              { value: '100% Care', label: 'Personal Hygiene Focus' }
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-white border border-[#F5DDE1] rounded-2xl">
                <span className="font-serif text-lg md:text-xl font-bold text-[#B85C72] block">
                  {stat.value}
                </span>
                <span className="text-[10px] text-[#24191B]/50 block uppercase tracking-wider font-semibold font-sans">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <Button variant="primary" onClick={() => navigate('services')}>
            Discover Our Story
          </Button>
        </div>
      </section>
    </div>
  );
};


// ==========================================
// 3. SERVICES MENU VIEW
// ==========================================
export const ServicesView: React.FC<CustomerViewsProps> = ({ navigate }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setServices(MockDB.getServices().filter(s => s.status === 'Active'));
  }, []);

  const categories = ['All', 'Makeup', 'Hair', 'Skin & Facial', 'Grooming', 'Bridal Services'];

  const filteredServices = services.filter(s => {
    if (activeCategory === 'All') return true;
    return s.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-[#B85C72] font-semibold font-sans block mb-3">
          Our Curated Menu
        </span>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#24191B] mb-4">
          Beauty, Your Way.
        </h2>
        <p className="text-sm text-[#24191B]/60 leading-relaxed font-sans">
          Select from our hand-picked treatments designed to accentuate your natural charm.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-[#F5DDE1] pb-6">
        {categories.map(cat => {
          const getEmoji = (name: string) => {
            switch (name.toLowerCase()) {
              case 'makeup': return '💄';
              case 'hair': return '💇‍♀️';
              case 'skin & facial': return '🌸';
              case 'grooming': return '✨';
              case 'bridal services': return '👰';
              default: return '✨';
            }
          };
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'bg-[#B85C72] text-white shadow-md'
                  : 'text-[#24191B]/70 bg-[#FFF9F7] border border-[#F5DDE1] hover:text-[#B85C72] hover:bg-[#FFF5F5]/40'
              }`}
            >
              {cat !== 'All' && <span>{getEmoji(cat)}</span>}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {filteredServices.map(s => (
            <ServiceCard
              key={s.id}
              service={s}
              onViewDetails={(slug) => navigate(`services/${slug}`)}
              onBook={() => navigate('booking')}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No services found"
          message="We are currently revising this section. Check out our traditional Bridal Makeup packages instead."
          actionText="View Packages"
          onAction={() => navigate('packages')}
        />
      )}
    </div>
  );
};


// ==========================================
// 4. SERVICE DETAILS VIEW
// ==========================================
export const ServiceDetailsView: React.FC<CustomerViewsProps> = ({ params, navigate }) => {
  const [service, setService] = useState<Service | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const matched = MockDB.getServices().find(s => s.slug === params.slug);
    setService(matched || null);
  }, [params.slug]);

  const handleShare = async () => {
    if (!service) return;
    const shareUrl = window.location.href;
    const shareTitle = `${service.name} - Glow & Grace Sanctuary`;
    const shareText = `Discover the luxurious ${service.name} treatment at Glow & Grace! Duration: ${service.duration} mins, starting at only ₹${service.startingPrice}.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error invoking native share API:', err);
          setShowShareModal(true);
        }
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!service) {
    return <LoadingState message="Fetching treatment secrets..." />;
  }

  return (
    <div className="py-24 max-w-5xl mx-auto px-6 space-y-12">
      <button
        onClick={() => navigate('services')}
        className="inline-flex items-center gap-2 text-xs text-[#24191B]/60 hover:text-[#B85C72] font-semibold tracking-wider uppercase cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Menu
      </button>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-[#F5DDE1] p-6 md:p-10 rounded-3xl shadow-sm">
        {/* Left Side media */}
        <div className="md:col-span-5 aspect-[3/4] rounded-2xl overflow-hidden bg-rose-50 shadow-md">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Info */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#B85C72] font-bold block mb-1">
              Category: {service.category}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#24191B]">
              {service.name}
            </h2>
          </div>

          <div className="flex gap-6 items-center border-y border-[#F5DDE1]/50 py-4">
            <div>
              <span className="text-[9px] text-[#24191B]/50 uppercase tracking-widest block font-sans">
                Price starts at
              </span>
              <span className="text-2xl font-serif font-black text-[#B85C72]">
                ₹{service.startingPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="h-8 w-px bg-[#F5DDE1]" />

            <div>
              <span className="text-[9px] text-[#24191B]/50 uppercase tracking-widest block font-sans">
                Treatment Duration
              </span>
              <span className="text-base font-serif font-bold text-[#24191B] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#B85C72]" />
                {service.duration} minutes
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-[#24191B]">Treatment Overview</h3>
            <p className="text-[#24191B]/70 text-sm leading-relaxed font-sans">
              {service.description}
            </p>
          </div>

          <div className="bg-[#FFF9F7] p-5 rounded-2xl border border-[#F5DDE1] space-y-2">
            <span className="text-[9px] font-sans text-[#D4A373] uppercase tracking-widest font-bold block">
              Glow & Grace Promise
            </span>
            <p className="text-xs text-[#24191B]/70 font-sans leading-relaxed">
              We exclusively apply top-tier international beauty products. Prior to every bridal slot, a custom dermo-analysis check is included to guarantee makeup tones suit your skin barrier flawlessly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" className="flex-1" onClick={() => navigate('booking')}>
              Book Appointment
            </Button>
            <Button variant="outline" size="lg" className="flex-1" onClick={() => navigate('contact')}>
              Inquire
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="flex-1 flex items-center justify-center gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 text-[#B85C72]" />
              Share Treatment
            </Button>
          </div>
        </div>
      </div>

      {/* CUSTOM SHARE MODAL */}
      {showShareModal && (
        <Modal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          title="Share Luxury Treatment"
        >
          <div className="space-y-5">
            <p className="text-xs text-stone-500 leading-relaxed">
              Spread the elegance! Share <strong>{service.name}</strong> with friends or family via your favorite platforms:
            </p>

            <div className="grid grid-cols-3 gap-3">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `Check out this luxurious ${service.name} treatment at Glow & Grace! Starts at ₹${service.startingPrice}. ${window.location.href}`
                )}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-col items-center justify-center p-3 border border-stone-200 hover:border-[#D4A373] bg-[#FFF9F7]/40 rounded-2xl hover:bg-[#FFF9F7]/80 transition-colors group text-center"
              >
                <span className="text-xl mb-1 block">💬</span>
                <span className="text-[10px] font-bold text-stone-700 block">WhatsApp</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Looking for a premium beauty treatment? I highly recommend ${service.name} at Glow & Grace!`
                )}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-col items-center justify-center p-3 border border-stone-200 hover:border-[#D4A373] bg-[#FFF9F7]/40 rounded-2xl hover:bg-[#FFF9F7]/80 transition-colors group text-center"
              >
                <span className="text-xl mb-1 block">🐦</span>
                <span className="text-[10px] font-bold text-stone-700 block">Twitter / X</span>
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(
                  `Glow & Grace Treatment Recommendation: ${service.name}`
                )}&body=${encodeURIComponent(
                  `Hi,\n\nI wanted to share this luxurious beauty treatment with you:\n\n${service.name}\n${service.description}\n\nCheck it out here: ${window.location.href}`
                )}`}
                className="flex flex-col items-center justify-center p-3 border border-stone-200 hover:border-[#D4A373] bg-[#FFF9F7]/40 rounded-2xl hover:bg-[#FFF9F7]/80 transition-colors group text-center"
              >
                <span className="text-xl mb-1 block">✉️</span>
                <span className="text-[10px] font-bold text-stone-700 block">Email</span>
              </a>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-stone-100">
              <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest">Copy Shared Link</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-xl px-3 py-2 text-xs text-stone-600 outline-none select-all"
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-[#B85C72] hover:bg-[#a04e61] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};


// ==========================================
// 5. PACKAGES VIEW
// ==========================================
export const PackagesView: React.FC<CustomerViewsProps> = ({ navigate }) => {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    setPackages(MockDB.getPackages().filter(p => p.status === 'Active'));
  }, []);

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 space-y-16">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-[#B85C72] font-semibold font-sans block mb-3">
          Our Special Packages
        </span>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#24191B] mb-4">
          Curated Pricing
        </h2>
        <p className="text-sm text-[#24191B]/60 leading-relaxed font-sans">
          Select an comprehensive combination package designed around specific event durations. All prices are fully comprehensive.
        </p>
      </div>

      {/* Grid of pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {packages.map(p => (
          <PackageCard key={p.id} pkg={p} onBook={() => navigate('booking')} />
        ))}
      </div>
    </div>
  );
};


// ==========================================
// 6. GALLERY PORTFOLIO VIEW
// ==========================================
export const GalleryView: React.FC<CustomerViewsProps> = ({ navigate, settings }) => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeReel, setActiveReel] = useState<GalleryItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, { count: number; liked: boolean }>>({});

  useEffect(() => {
    const items = MockDB.getGallery();
    setGallery(items);

    const initialLikes: Record<string, { count: number; liked: boolean }> = {};
    items.forEach(item => {
      initialLikes[item.id] = { count: item.likes || Math.floor(Math.random() * 200 + 150), liked: false };
    });
    setLikesMap(initialLikes);
  }, []);

  const handleToggleLike = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setLikesMap(prev => {
      const current = prev[itemId] || { count: 100, liked: false };
      return {
        ...prev,
        [itemId]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked
        }
      };
    });
  };

  const categories = ['All', 'Bridal', 'Makeup', 'Hair', 'Skin & Facial', 'Nails', 'Grooming', 'Reels'];

  const filteredGallery = gallery.filter(item => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Reels') return item.mediaType === 'video';
    return item.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 space-y-12">
      {/* Lightbox component */}
      <Lightbox
        images={filteredGallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
        onBook={(lookName) => navigate('booking')}
      />

      {/* Reel Modal component */}
      <ReelModal
        reel={activeReel}
        isOpen={activeReel !== null}
        onClose={() => setActiveReel(null)}
        onBook={(lookName) => navigate('booking')}
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFF0F2] rounded-full text-[10px] font-sans font-extrabold tracking-[0.2em] text-[#B85C72] uppercase border border-[#F5DDE1]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          AUTHENTIC BEAUTY WORK
        </div>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#3B0F19]">
          Bridal & Glamour Portfolio
        </h2>
        <p className="text-sm text-[#3B0F19]/70 leading-relaxed font-sans">
          Behold our genuine customer transformations, festive saree drapings, and salon hair therapies. Every look is crafted with love and genuine international cosmetics.
        </p>
      </div>

      {/* Tabs filter */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-[#F5DDE1] pb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setLightboxIndex(null);
            }}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#3B0F19] text-white shadow-md'
                : 'text-[#3B0F19]/70 bg-[#FFF9F7] border border-[#F5DDE1] hover:text-[#B85C72]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry / Grid layout */}
      {filteredGallery.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in">
          {filteredGallery.map((item, index) => {
            const isVideo = item.mediaType === 'video';
            const likeInfo = likesMap[item.id] || { count: item.likes || 150, liked: false };

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isVideo) {
                    setActiveReel(item);
                  } else {
                    setLightboxIndex(index);
                  }
                }}
                className="group relative rounded-2xl overflow-hidden bg-stone-100 border border-[#F5DDE1] shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-end aspect-square"
              >
                <img
                  src={item.imageUrl}
                  alt={item.alt || item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-sans font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/20">
                    {item.category}
                  </span>

                  {isVideo ? (
                    <span className="bg-[#B85C72] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      ▶ Reel
                    </span>
                  ) : (
                    <button
                      onClick={(e) => handleToggleLike(e, item.id)}
                      className={`p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-125 ${
                        likeInfo.liked ? 'bg-rose-600 text-white' : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                      title="Like this look"
                    >
                      <Heart className={`w-3.5 h-3.5 ${likeInfo.liked ? 'fill-white' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Bottom details */}
                <div className="relative z-10 p-3.5 space-y-1 text-white">
                  <h4 className="font-serif font-bold text-xs sm:text-sm leading-tight line-clamp-1 group-hover:text-[#E5C494] transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-white/80 font-sans">
                    <span className="line-clamp-1">{item.description}</span>
                    <span className="shrink-0 ml-2 font-semibold text-rose-300">
                      ❤️ {likeInfo.count}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No shots uploaded yet"
          message="We are currently organizing photo sessions for this segment. Browse our other categories in the meantime."
          actionText="View All Shots"
          onAction={() => setActiveCategory('All')}
        />
      )}

      {/* Bottom Instagram CTA Banner */}
      <div className="bg-[#FFF0F2] border border-[#F5DDE1] rounded-3xl p-8 text-center space-y-4 max-w-2xl mx-auto">
        <h3 className="font-serif text-xl font-bold text-[#3B0F19]">Love what you see?</h3>
        <p className="text-xs text-[#3B0F19]/70 font-sans max-w-md mx-auto">
          We post daily transformation reels, client stories, and behind-the-scenes artistry on our Instagram profile.
        </p>
        <div className="flex justify-center gap-3 pt-1">
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#3B0F19] hover:bg-[#802339] text-[#FFFDF9] rounded-full text-xs font-bold tracking-wider transition-colors shadow-sm flex items-center gap-2"
          >
            <Instagram className="w-3.5 h-3.5" />
            Follow @glowandgrace
          </a>
          <button
            onClick={() => navigate('booking')}
            className="px-5 py-2.5 bg-[#B85C72] hover:bg-[#802339] text-white rounded-full text-xs font-bold tracking-wider transition-colors shadow-sm"
          >
            Book Your Look
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 7. ARTISTS PROFILES VIEW
// ==========================================
export const ArtistsView: React.FC<CustomerViewsProps> = ({ navigate }) => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    setArtists(MockDB.getArtists().filter(a => a.status === 'Active'));
  }, []);

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 space-y-16">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-[#B85C72] font-semibold font-sans block mb-3">
          Our Team
        </span>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#24191B] mb-4">
          Meet Our Experts
        </h2>
        <p className="text-sm text-[#24191B]/60 leading-relaxed font-sans">
          A collection of certified aesthetic experts who treat beauty as a precise, delicate visual craft.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {artists.map(a => (
          <ArtistCard key={a.id} artist={a} onViewProfile={(slug) => navigate(`artists/${slug}`)} />
        ))}
      </div>
    </div>
  );
};


// ==========================================
// 8. ARTIST PROFILE DETAILS
// ==========================================
export const ArtistDetailsView: React.FC<CustomerViewsProps> = ({ params, navigate }) => {
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    const matched = MockDB.getArtists().find(a => a.slug === params.slug);
    setArtist(matched || null);
  }, [params.slug]);

  if (!artist) {
    return <LoadingState message="Summoning our expert profile..." />;
  }

  return (
    <div className="py-24 max-w-4xl mx-auto px-6 space-y-12">
      <button
        onClick={() => navigate('artists')}
        className="inline-flex items-center gap-2 text-xs text-[#24191B]/60 hover:text-[#B85C72] font-semibold tracking-wider uppercase cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Experts
      </button>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white border border-[#F5DDE1] p-6 md:p-10 rounded-3xl shadow-sm">
        {/* Profile Image */}
        <div className="md:col-span-5 aspect-[4/5] overflow-hidden rounded-2xl bg-amber-50 relative">
          <img
            src={artist.photoUrl}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Details content */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-bold text-[#B85C72] uppercase tracking-widest block mb-1">
              {artist.role}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#24191B]">{artist.name}</h2>
          </div>

          <div className="flex gap-1 items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(artist.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                }`}
              />
            ))}
            <span className="text-xs text-[#24191B]/60 ml-2 font-semibold">
              ({artist.rating.toFixed(1)} Rating)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-[#F5DDE1]/50 py-4">
            <div>
              <span className="text-[10px] text-[#24191B]/50 block uppercase tracking-widest">Experience</span>
              <span className="text-base font-bold font-serif text-[#24191B]">{artist.experience}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#24191B]/50 block uppercase tracking-widest">Specialty</span>
              <span className="text-base font-bold font-serif text-[#B85C72]">{artist.specialty}</span>
            </div>
          </div>

          <p className="text-[#24191B]/70 text-sm leading-relaxed font-sans">
            {artist.bio}
          </p>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#24191B]/80 font-sans">
              Connect socially
            </h4>
            <div className="flex items-center gap-3">
              {artist.socialLinks.instagram && (
                <a
                  href={`https://instagram.com/${artist.socialLinks.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#B85C72] hover:underline"
                >
                  <Instagram className="w-4 h-4" />
                  {artist.socialLinks.instagram}
                </a>
              )}
            </div>
          </div>

          <Button variant="primary" className="w-full" onClick={() => navigate('booking')}>
            Book Slot with {artist.name.split(' ')[0]}
          </Button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 9. CLIENT REVIEWS & ADD FEEDBACK VIEW
// ==========================================
export const ReviewsView: React.FC<CustomerViewsProps> = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [service, setService] = useState('Bridal Makeup');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setReviews(MockDB.getReviews().filter(r => r.status === 'Approved'));
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    // Save review using MockDB
    MockDB.saveReview({
      customerName: name,
      profileImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      serviceName: service,
      rating,
      reviewContent: content
    });

    setShowToast(true);
    setName('');
    setContent('');
    setRating(5);
  };

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 space-y-16">
      {showToast && (
        <Toast
          message="Your beautiful feedback has been submitted for moderation!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-[#B85C72] font-semibold font-sans block mb-3">
          Testimonials
        </span>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#24191B] mb-4">
          Client Feedback
        </h2>
        <p className="text-sm text-[#24191B]/60 leading-relaxed font-sans">
          Check out our Google reviews score and read verified reviews written directly by clients.
        </p>
      </div>

      {/* Google Reviews rating dashboard card */}
      <div className="bg-white border border-[#F5DDE1] p-6 md:p-8 rounded-3xl max-w-md mx-auto text-center space-y-4 shadow-xs">
        <span className="text-xs uppercase tracking-widest font-bold text-[#24191B]/40">Google Verified</span>
        <div className="flex items-center justify-center gap-2">
          <span className="font-serif text-4xl font-extrabold text-[#24191B]">4.9</span>
          <span className="text-sm font-semibold text-[#24191B]/50 mt-2">/ 5.0</span>
        </div>
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
          ))}
        </div>
        <p className="text-xs text-[#24191B]/60">Based on 120+ organic client submissions</p>
      </div>

      {/* Grid reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map(r => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      {/* Post a Review panel */}
      <div className="bg-[#FFF9F7] border border-[#F5DDE1] p-8 md:p-10 rounded-3xl max-w-2xl mx-auto space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#B85C72]">Submit Feedback</span>
          <h3 className="font-serif text-2xl font-bold text-[#24191B]">Add Your Story</h3>
          <p className="text-xs text-[#24191B]/60">Loved your facial or bridal style? We would cherish your feedback.</p>
        </div>

        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label htmlFor="reviewer-name" className="block text-xs font-semibold text-[#24191B]/60 mb-1">Your Name *</label>
            <input
              id="reviewer-name"
              type="text"
              required
              placeholder="e.g. Ananya Sen"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white border border-[#F5DDE1] rounded-xl py-3 px-4 text-sm outline-none focus:ring-4 focus:ring-[#B85C72]/20 text-[#24191B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reviewer-service" className="block text-xs font-semibold text-[#24191B]/60 mb-1">Service Enjoyed *</label>
              <select
                id="reviewer-service"
                value={service}
                onChange={e => setService(e.target.value)}
                className="w-full bg-white border border-[#F5DDE1] rounded-xl py-3 px-4 text-sm outline-none cursor-pointer text-[#24191B]"
              >
                {['Bridal Makeup', 'Party Makeup', 'Engagement Makeup', 'Hair Styling', 'Facial & Skincare', 'Manicure & Pedicure'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="reviewer-rating" className="block text-xs font-semibold text-[#24191B]/60 mb-1">Star Rating *</label>
              <select
                id="reviewer-rating"
                value={rating}
                onChange={e => setRating(parseInt(e.target.value))}
                className="w-full bg-white border border-[#F5DDE1] rounded-xl py-3 px-4 text-sm outline-none cursor-pointer text-[#24191B]"
              >
                {[5, 4, 3, 2, 1].map(r => (
                  <option key={r} value={r}>{r} Stars {r === 5 ? '(Perfect!)' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="reviewer-content" className="block text-xs font-semibold text-[#24191B]/60 mb-1">Your Feedback Content *</label>
            <textarea
              id="reviewer-content"
              required
              rows={4}
              placeholder="Tell us about your experience..."
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full bg-white border border-[#F5DDE1] rounded-xl py-3 px-4 text-sm outline-none focus:ring-4 focus:ring-[#B85C72]/20 text-[#24191B]"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Submit Review for Approval
          </Button>
        </form>
      </div>
    </div>
  );
};


// ==========================================
// 10. BOOKING SCHEDULER VIEW
// ==========================================
export const BookingView: React.FC<CustomerViewsProps> = ({ settings }) => {
  const [successBooking, setSuccessBooking] = useState<Appointment | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSuccess = (booking: Appointment) => {
    setSuccessBooking(booking);
    setShowToast(true);
  };

  return (
    <div className="py-24 max-w-4xl mx-auto px-6 space-y-12 relative">
      {showToast && successBooking && (
        <Toast
          message={`Splendid! Your booking reservation #${successBooking.bookingId} was successfully submitted.`}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      {!successBooking ? (
        <>
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B85C72] font-semibold font-sans block">
              Appointment Booking
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#24191B]">
              Reserve Your Experience
            </h2>
            <p className="text-xs text-[#24191B]/60 leading-relaxed font-sans">
              Enter your details, choose your treatment category, dates, and preferred artist. We will immediately queue your reservation.
            </p>
          </div>
          <BookingForm onSuccess={handleSuccess} />
        </>
      ) : (
        <BookingConfirmation
          booking={successBooking}
          onReset={() => setSuccessBooking(null)}
          whatsappNumber={settings.whatsappNumber}
        />
      )}
    </div>
  );
};


// ==========================================
// 11. PRIVACY & TERMS
// ==========================================
export const PrivacyView: React.FC<CustomerViewsProps> = () => {
  return (
    <div className="py-24 max-w-3xl mx-auto px-6 space-y-6">
      <h2 className="font-serif text-3xl font-bold text-[#24191B]">Privacy Policy</h2>
      <p className="text-[#24191B]/70 text-sm leading-relaxed">
        At Glow & Grace, we safeguard customer phone numbers, emails, and address logs strictly for scheduler management. We never trade client records to secondary commercial agencies.
      </p>
    </div>
  );
};

export const TermsView: React.FC<CustomerViewsProps> = () => {
  return (
    <div className="py-24 max-w-3xl mx-auto px-6 space-y-6">
      <h2 className="font-serif text-3xl font-bold text-[#24191B]">Terms of Service</h2>
      <p className="text-[#24191B]/70 text-sm leading-relaxed">
        Appointments reserved at Glow & Grace remain tentative until confirmed via WhatsApp. To cancel or postpone slots, kindly notify the front desk at least 4 hours ahead.
      </p>
    </div>
  );
};
