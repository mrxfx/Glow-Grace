import { useState, useEffect, lazy, Suspense } from 'react';
import { useHashRoute } from './router';
import { MockDB } from './data';
import { WebsiteSettings } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/Common';
import { ContactSection } from './components/ContactSection';

// Lazy-load the heavy administrative dashboard module to keep initial bundle ultra-light
const AdminViews = lazy(() => import('./views/AdminViews').then(m => ({ default: m.AdminViews })));

// Import all premium customer views
import { 
  HomeView, AboutView, ServicesView, ServiceDetailsView, 
  PackagesView, GalleryView, ArtistsView, ArtistDetailsView, 
  ReviewsView, BookingView, PrivacyView, TermsView 
} from './views/CustomerViews';

export default function App() {
  // 1. Initialise seed databases
  useEffect(() => {
    MockDB.init();
    
    // Lazily load and initialize Firebase Sync to keep initial bundle size extremely small!
    import('./firebaseSync').then(({ initFirebaseSync }) => {
      initFirebaseSync();
    }).catch((err) => {
      console.warn('Firebase sync delayed or offline fallback mode active:', err);
    });
    
    // Register Service Worker for PWA Offline Fallbacks
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => console.log('Glow & Grace Service Worker registered successfully:', reg.scope))
          .catch((err) => console.error('Service Worker registration failed:', err));
      });
    }
  }, []);

  // 2. Client Routing Hooks
  const { path, params, navigate } = useHashRoute();

  // 3. Global settings state linked to DB
  const [settings, setSettings] = useState<WebsiteSettings>(() => MockDB.getSettings());

  const handleSettingsUpdate = (newSet: WebsiteSettings) => {
    setSettings(newSet);
    MockDB.set('settings', newSet);
  };

  // 4. Check if we are inside the admin area
  const isAdminPath = path.startsWith('admin');

  // Helper route rendering switcher
  const renderView = () => {
    const props = { path, params, navigate, settings };

    switch (path) {
      // Core pages
      case 'home':
      case '':
        return <HomeView {...props} />;
      case 'about':
        return <AboutView {...props} />;
      case 'services':
        return <ServicesView {...props} />;
      case 'services/:slug':
        return <ServiceDetailsView {...props} />;
      case 'packages':
        return <PackagesView {...props} />;
      case 'gallery':
        return <GalleryView {...props} />;
      case 'artists':
        return <ArtistsView {...props} />;
      case 'artists/:slug':
        return <ArtistDetailsView {...props} />;
      case 'reviews':
        return <ReviewsView {...props} />;
      case 'booking':
        return <BookingView {...props} />;
      case 'contact':
        return <div className="py-12"><ContactSection settings={settings} /></div>;
      
      // Secondary legal/policy pages
      case 'privacy':
        return <PrivacyView {...props} />;
      case 'terms':
        return <TermsView {...props} />;
      
      // Fallback
      default:
        return <HomeView {...props} />;
    }
  };

  // Main UI Wrapper
  if (isAdminPath) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-stone-950 text-[#FFF9F7] flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-[#D4A373] border-t-transparent rounded-full animate-spin" />
          <span className="font-serif text-xs tracking-widest uppercase text-[#D4A373] block">Glow & Grace Secure Desk...</span>
        </div>
      }>
        <AdminViews
          path={path}
          navigate={navigate}
          settings={settings}
          onSettingsUpdate={handleSettingsUpdate}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F7] text-[#24191B] flex flex-col justify-between">
      {/* Sticky Premium Navbar */}
      <Navbar currentPath={path} navigate={navigate} />

      {/* Main Container view screen */}
      <main className="flex-grow pt-24 min-h-[60vh]">
        {renderView()}
      </main>

      {/* Render Contact block globally on Home Page to maximize engagement */}
      {(path === 'home' || path === '') && (
        <ContactSection settings={settings} />
      )}

      {/* Luxury Footer component */}
      <Footer settings={settings} navigate={navigate} />

      {/* Floating high-contrast WhatsApp CTA */}
      <WhatsAppButton number={settings.whatsappNumber} />
    </div>
  );
}

