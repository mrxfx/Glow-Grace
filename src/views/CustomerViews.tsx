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
import { Lightbox, Modal } from '../components/Modal';
import { BookingForm, BookingConfirmation } from '../components/BookingForm';
import { ContactSection } from '../components/ContactSection';

interface CustomerViewsProps {
  path: string;
  params: Record<string, string>;
  navigate: (path: string) => void;
  settings: WebsiteSettings;
}

// ==========================================
// 1. HOME VIEW
// ==========================================
export const HomeView: React.FC<CustomerViewsProps> = ({ navigate, settings }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    setServices(MockDB.getServices().filter(s => s.status === 'Active').slice(0, 4));
    setPackages(MockDB.getPackages().filter(p => p.status === 'Active').slice(0, 3));
    setReviews(MockDB.getReviews().filter(r => r.status === 'Approved').slice(0, 3));
    setOffers(MockDB.getOffers().filter(o => o.status === 'Active'));
  }, []);

  return (
    <div className="space-y-24 pb-16">
      {/* 1A. HERO SECTION */}
      <section id="hero-banner" className="relative bg-[#FFF9F7] pt-32 pb-20 overflow-hidden border-b border-[#F5DDE1]/40">
        {/* Subtle decorative floral/gold circles */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#F5DDE1] rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#D4A373] rounded-full blur-3xl opacity-10 -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5DDE1] rounded-full text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-[#B85C72]">
              <Sparkles className="w-3.5 h-3.5" />
              LUXURY BEAUTY STUDIO
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#24191B] leading-[1.1] tracking-tight">
              Enhance Your <br className="hidden sm:inline" />
              <span className="text-[#B85C72] italic font-normal">Natural Glow.</span>
            </h1>

            <p className="text-sm font-sans tracking-[0.2em] text-[#D4A373] uppercase font-semibold">
              Hair &bull; Makeup &bull; Skin &bull; Self Love
            </p>

            <p className="text-[#24191B]/75 text-base md:text-lg max-w-lg mx-auto lg:mx-0 font-sans leading-relaxed">
              Step into a world of beauty, care and confidence. At Glow & Grace, we bring out the most beautiful version of you, using luxury products in a serene, hygienic space.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Button variant="primary" size="lg" onClick={() => navigate('booking')}>
                Book Appointment
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('services')}>
                Explore Services
              </Button>
            </div>
          </div>

          {/* Hero Right Media */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Bridal Graphic */}
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white relative z-10 bg-rose-50">
                <img 
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80" 
                  alt="Elegant bridal makeup work by Glow and Grace"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* FLOATING BADGES */}
              {/* Badge 1 */}
              <div className="absolute -top-4 -left-6 z-20 bg-white shadow-xl px-4 py-3 rounded-2xl flex items-center gap-3 border border-[#F5DDE1] animate-bounce-subtle">
                <div className="w-9 h-9 bg-[#FFF9F7] text-[#B85C72] border border-[#F5DDE1] rounded-full flex items-center justify-center font-bold font-serif">500+</div>
                <div>
                  <span className="text-xs font-bold text-[#24191B] block">Happy Clients</span>
                  <span className="text-[9px] text-[#24191B]/50 block font-sans">Bridal & Socials</span>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="absolute top-1/2 -right-10 z-20 bg-[#24191B] text-white shadow-xl px-4 py-3 rounded-2xl flex items-center gap-3 border border-white/10">
                <div className="w-9 h-9 bg-white/10 text-[#D4A373] rounded-full flex items-center justify-center font-serif font-bold">5+</div>
                <div>
                  <span className="text-xs font-bold text-white block">Years Exp</span>
                  <span className="text-[9px] text-white/50 block font-sans">Certified Experts</span>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="absolute -bottom-6 left-10 z-20 bg-white shadow-xl px-5 py-3.5 rounded-2xl flex items-center gap-3 border border-[#F5DDE1]">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#24191B] block">100% Care & Hygiene</span>
                  <span className="text-[9px] text-[#24191B]/50 block font-sans">Sterilized Equipment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1B. LIMITED TIME OFFERS */}
      {offers.length > 0 && (
        <section id="promo-banner" className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#24191B] to-[#3a282b] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden border-b-4 border-[#D4A373] shadow-lg">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs uppercase tracking-widest text-[#D4A373] font-bold block">
                  LIMITED TIME OFFER
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#FFF9F7]">
                  {offers[0].title}
                </h3>
                <p className="text-sm text-[#FFF9F7]/70 max-w-xl">
                  {offers[0].description}
                </p>
              </div>
              <Button
                variant="accent"
                onClick={() => navigate('booking')}
                className="shrink-0 flex items-center gap-2"
              >
                Claim Offer
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            {/* Background design elements */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
          </div>
        </section>
      )}

      {/* 1C. SERVICES HIGHLIGHT SECTION */}
      <section id="featured-services" className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B85C72] font-semibold block mb-2 font-sans">
              Discover Our Menu
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#24191B]">
              Beauty, Your Way.
            </h2>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('services')} className="group flex items-center gap-2 shrink-0">
            View All Services
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => (
            <ServiceCard 
              key={s.id} 
              service={s} 
              onViewDetails={(slug) => navigate(`services/${slug}`)} 
              onBook={() => navigate('booking')}
            />
          ))}
        </div>
      </section>

      {/* 1D. CINEMATIC BRIDAL FEATURE */}
      <section id="bridal-special" className="bg-[#24191B] text-[#FFF9F7] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Graphic Side */}
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5 bg-stone-900">
            <img 
              src="https://images.unsplash.com/photo-1615396899839-c99c121888b0?w=800&auto=format&fit=crop&q=80" 
              alt="Bridal makeup styling session Close-up"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Side */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4A373] font-bold font-sans block">
                THE SIGNATURE BRIDAL
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Your Big Day. <br />
                Your Signature Look.
              </h2>
              <p className="text-[#FFF9F7]/70 text-sm md:text-base leading-relaxed">
                Your wedding day is a collection of precious moments. We focus on curating a bespoke bridal transformation that honors your traditions, matches your dress, and ensures you feel comfortable and camera-ready.
              </p>
            </div>

            {/* Checkmark Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                '✓ Personalized consultation',
                '✓ Professional makeup artist',
                '✓ Premium products only',
                '✓ Elaborate hairstyling',
                '✓ Perfect saree/outfit draping',
                '✓ 18-hour stay-lock finish',
                '✓ Pre-event consultation'
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#FFF9F7]/85">
                  <span className="text-[#D4A373] font-extrabold">{b.slice(0, 1)}</span>
                  <span>{b.slice(2)}</span>
                </div>
              ))}
            </div>

            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate('packages')}
              className="flex items-center gap-2"
            >
              Explore Bridal Packages
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 1E. WHY CHOOSE US */}
      <section id="why-choose-glow" className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#B85C72] font-semibold font-sans block mb-2">
            Our Core Values
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#24191B] mb-4">
            Why Choose Us
          </h2>
          <p className="text-[#24191B]/60 text-sm leading-relaxed">
            We operate under strict hygiene protocols and premium aesthetics to offer the ultimate salon relaxation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Award className="w-8 h-8 text-[#B85C72]" />,
              title: 'Professional Experts',
              desc: 'Our artists are certified professionals specializing in modern beauty arts.'
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-[#B85C72]" />,
              title: 'Premium Products',
              desc: 'We select international, dermatologically safe luxury cosmetic brands.'
            },
            {
              icon: <Heart className="w-8 h-8 text-[#B85C72]" />,
              title: 'Personalized Experience',
              desc: 'We map facial angles and skin tones to formulate custom contour palettes.'
            },
            {
              icon: <Smile className="w-8 h-8 text-[#B85C72]" />,
              title: 'Hygiene First',
              desc: 'Deep sterilization of brushes, tools and counters between slot timings.'
            },
            {
              icon: <Coins className="w-8 h-8 text-[#B85C72]" />,
              title: 'Transparent Pricing',
              desc: 'Simple luxury packages without hidden taxes or surprises.'
            },
            {
              icon: <Coffee className="w-8 h-8 text-[#B85C72]" />,
              title: 'Relaxing Atmosphere',
              desc: 'Chic cream interiors and quiet ambient tunes for peaceful pampering.'
            }
          ].map((feat, i) => (
            <div key={i} className="bg-white border border-[#F5DDE1] p-8 rounded-3xl space-y-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#FFF9F7] rounded-full border border-[#F5DDE1] flex items-center justify-center">
                {feat.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#24191B]">{feat.title}</h3>
              <p className="text-xs text-[#24191B]/60 font-sans leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 1F. REVIEWS HIGHLIGHTS */}
      <section id="home-testimonials" className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#B85C72] font-semibold font-sans block mb-2">
            Client Stories
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#24191B] mb-4">
            Loved By Hundreds.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(r => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="sm" onClick={() => navigate('reviews')}>
            Read More Reviews
          </Button>
        </div>
      </section>
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
            alt="Warm elegant Glow & Grace studio lounge interiors" 
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
              It’s Your Self-Love Space.
            </h2>
            <p className="text-sm md:text-base text-[#24191B]/70 leading-relaxed font-sans">
              Beauty is not just about how you look on the outside. It is fundamentally about how you feel on the inside. Our dedicated lounge exists to create a relaxing, deeply professional, and individualized beauty haven.
            </p>
            <p className="text-xs text-[#24191B]/60 leading-relaxed font-sans">
              Whether you are gearing up to walk down the wedding aisle, stepping onto an anniversary dancefloor, or enjoying a slow Sunday facial detox, we cater personalized care using premium organic products and high-precision sterilizations.
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

  const categories = ['All', 'Bridal', 'Party', 'Engagement', 'Hair', 'Skincare', 'Nails', 'Salon'];

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
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#B85C72] text-white shadow-sm'
                : 'text-[#24191B]/70 bg-[#FFF9F7] border border-[#F5DDE1] hover:text-[#B85C72]'
            }`}
          >
            {cat}
          </button>
        ))}
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
export const GalleryView: React.FC<CustomerViewsProps> = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setGallery(MockDB.getGallery());
  }, []);

  const categories = ['All', 'Bridal', 'Party', 'Engagement', 'Hair', 'Skincare', 'Nails', 'Salon'];

  const filteredGallery = gallery.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="py-24 max-w-7xl mx-auto px-6 space-y-12">
      {/* Lightbox component */}
      <Lightbox
        images={filteredGallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-[#B85C72] font-semibold font-sans block mb-3">
          Real Salon Portfolios
        </span>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#24191B] mb-4">
          Bridal & Glamour Gallery
        </h2>
        <p className="text-sm text-[#24191B]/60 leading-relaxed font-sans">
          Behold our genuine customer glow transformations. We do not use mock stock imagery.
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
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#B85C72] text-white shadow-sm'
                : 'text-[#24191B]/70 bg-[#FFF9F7] border border-[#F5DDE1] hover:text-[#B85C72]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry image layout */}
      {filteredGallery.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 animate-fade-in">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="break-inside-avoid bg-white border border-[#F5DDE1] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer group relative"
            >
              <img
                src={item.imageUrl}
                alt={item.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transition-transform duration-750 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-[#24191B]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] text-[#D4A373] uppercase font-bold tracking-widest block font-sans">
                  {item.category}
                </span>
                <h4 className="font-serif text-white text-base font-bold">{item.title}</h4>
                <p className="text-white/70 text-xs mt-1 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No shots uploaded yet"
          message="We are currently organizing photo sessions for this segment. Browse bridal section in the meantime."
          actionText="View All Shots"
          onAction={() => setActiveCategory('All')}
        />
      )}
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
