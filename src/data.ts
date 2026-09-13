import { Service, Package, Artist, GalleryItem, Review, Offer, Appointment, WebsiteSettings, Notification } from './types';

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 's1',
    slug: 'solah-shringar-bridal',
    name: 'Royal Solah Shringar Bridal',
    description: 'Complete royal bridal transformation capturing timeless Indian heritage. Includes traditional hand-crafted sandalwood forehead art, intricate kundan setting, and premium HD glow makeup.',
    startingPrice: 11999,
    category: 'Bridal',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    duration: 210,
    status: 'Active'
  },
  {
    id: 's2',
    slug: 'haldi-ubtan-glow',
    name: 'Haldi & Ubtan Herb Polish',
    description: 'Authentic Indian village wedding glow therapy. Features fresh, hand-crushed wild turmeric, chickpea flour, vetiver root, and pure sandalwood paste massaged in a relaxing heritage sequence.',
    startingPrice: 2499,
    category: 'Village Rituals',
    imageUrl: 'https://images.unsplash.com/photo-1583316174775-bd6dc0e9f298?w=800&auto=format&fit=crop&q=80',
    duration: 75,
    status: 'Active'
  },
  {
    id: 's3',
    slug: 'ayurvedic-eladi-facial',
    name: 'Ayurvedic Eladi Facial',
    description: 'Rejuvenating face therapy featuring traditional Kerala-origin Eladi herbal oils, organic saffron, and a refreshing facial steam using hot clay pots loaded with fresh neem and holy basil.',
    startingPrice: 1899,
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop&q=80',
    duration: 90,
    status: 'Active'
  },
  {
    id: 's4',
    slug: 'sangeet-floral-braid',
    name: 'Sangeet Jasmine Braid Art',
    description: 'Intricate traditional Indian hair weaving with fresh, fragrant local jasmine (gajra), vibrant marigold garlands, and delicate rosebuds. Crafted to match classic bridal wear.',
    startingPrice: 1500,
    category: 'Hair Art',
    imageUrl: 'https://images.unsplash.com/photo-1595475241949-c2f210f66639?w=800&auto=format&fit=crop&q=80',
    duration: 60,
    status: 'Active'
  },
  {
    id: 's5',
    slug: 'traditional-henna-mehndi',
    name: 'Heritage Henna (Mehendi) Art',
    description: 'Exquisite, full-hand traditional paisley and peacock henna designs. Uses 100% organic, hand-mixed local henna leaves infused with eucalyptus oil and rich black tea brew.',
    startingPrice: 1200,
    category: 'Bridal',
    imageUrl: 'https://images.unsplash.com/photo-1563212871-33160e909a31?w=800&auto=format&fit=crop&q=80',
    duration: 120,
    status: 'Active'
  },
  {
    id: 's6',
    slug: 'kansa-wand-massage',
    name: 'Kansa Wand Detox Massage',
    description: 'Ancient Indian wellness massage utilizing the traditional bronze-metal Kansa dome and organic cow ghee. Purifies, lifts facial muscles, and balances vital Marma energy centers.',
    startingPrice: 1699,
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80',
    duration: 60,
    status: 'Active'
  },
  {
    id: 's7',
    slug: 'handloom-saree-draping',
    name: 'Heritage Saree Pleating & Draping',
    description: 'Flawless precision pleating and draping of heavy traditional Banarasi silk, Kanjeevaram, Jamdani, or local handloom sarees. Ensures perfect security and movement.',
    startingPrice: 799,
    category: 'Bridal',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    duration: 35,
    status: 'Active'
  },
  {
    id: 's8',
    slug: 'multani-rose-scrub',
    name: 'Multani & Rose Clay Polish',
    description: 'Soothing facial scrub using organic Multani Mitti (Fuller\'s earth), hand-distilled rose water, wild village honey, and ground almonds for pristine, glowing skin.',
    startingPrice: 999,
    category: 'Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&auto=format&fit=crop&q=80',
    duration: 45,
    status: 'Active'
  }
];

export const DEFAULT_PACKAGES: Package[] = [
  {
    id: 'p1',
    name: 'Gramya Shringar Heritage',
    price: 3499,
    description: 'An earthy, relaxing village-style pack combining hand-crushed ubtan scrub with a traditional Ayurvedic face massage.',
    features: [
      'Haldi & Ubtan Herb Polish (60 mins)',
      'Traditional Multani clay face mask',
      'Fresh coconut milk scalp massage',
      'Warm herbal tea infusion service'
    ],
    isPopular: false,
    status: 'Active'
  },
  {
    id: 'p2',
    name: 'Parampara Sangeet Glam',
    price: 4999,
    description: 'Perfect package for pre-wedding festive ceremonies, matching authentic styling with rich, camera-ready glam.',
    features: [
      'Premium HD festive makeup base',
      'Sangeet Jasmine Braid with fresh gajra',
      'Heritage Saree/Lehenga pleating & draping',
      'Kundan jewelry setting assistance'
    ],
    isPopular: true,
    status: 'Active'
  },
  {
    id: 'p3',
    name: 'Solah Shringar Royal Bridal',
    price: 15999,
    description: 'The ultimate luxury bridal package. Complete royal custom facial, airbrush makeup, and full traditional ornaments arrangement.',
    features: [
      'Royal Solah Shringar Airbrush Makeup',
      'Exquisite sandalwood hand-drawn forehead art',
      'Detailed traditional bridal hair weaving with fresh florals',
      'Double dupatta / heavy lehenga draping',
      'Sandalwood pre-wedding facial (1 week prior)',
      'Luxury bridal touch-up keepsake kit'
    ],
    isPopular: false,
    status: 'Active'
  },
  {
    id: 'p4',
    name: 'Shanti Ayurvedic Retreat',
    price: 2999,
    description: 'Complete stress relief utilizing ancient Indian healing. Relieves tension, detoxifies the skin, and leaves a beautiful natural glow.',
    features: [
      'Ayurvedic Eladi face therapy',
      'Kansa Wand Detox face massage',
      'Clay pot herbal neem steam',
      'Aromatic warm rosewater face mist'
    ],
    isPopular: false,
    status: 'Active'
  }
];

export const DEFAULT_ARTISTS: Artist[] = [
  {
    id: 'a1',
    slug: 'rajeshwari-devi',
    name: 'Rajeshwari Devi',
    role: 'Heritage Bridal Master',
    experience: '15+ Years',
    specialty: 'Traditional Solah Shringar',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    bio: 'Rajeshwari is a legend in traditional Indian bridal grooming. Famous for her precision in drawing classic sandalwood forehead bindi patterns and draping heavy heirloom silk sarees.',
    socialLinks: { instagram: '@rajeshwari_heritage', facebook: 'rajeshwari.bridal' },
    status: 'Active',
    rating: 5.0
  },
  {
    id: 'a2',
    slug: 'aarav-nambiar',
    name: 'Aarav Nambiar',
    role: 'Ayurvedic Skin Specialist',
    experience: '10+ Years',
    specialty: 'Kansa Wand & Herbology',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    bio: 'Aarav spent years studying traditional herbology and Marma therapy in Kerala. He curates customized fresh organic ubtans and carries out healing Kansa massages.',
    socialLinks: { instagram: '@aarav_ayurveda' },
    status: 'Active',
    rating: 4.9
  },
  {
    id: 'a3',
    slug: 'kavitha-pillai',
    name: 'Kavitha Pillai',
    role: 'Traditional Hair Weaver',
    experience: '8+ Years',
    specialty: 'Gajra Braids & Floral Knots',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    bio: 'Kavitha converts hair into works of art. She is widely praised for hand-crafting intricate braids loaded with fresh, fragrant local jasmine and marigolds.',
    socialLinks: { instagram: '@kavitha_floralbraids' },
    status: 'Active',
    rating: 4.8
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop&q=80',
    alt: 'Royal Indian bridal makeup closeup with gold jewelry',
    category: 'Bridal',
    title: 'Traditional Solah Shringar',
    description: 'Sandalwood forehead art, vibrant crimson lips, and premium gold jewelry setting.',
    isFeatured: true,
    createdAt: '2026-09-01'
  },
  {
    id: 'g2',
    imageUrl: 'https://images.unsplash.com/photo-1583316174775-bd6dc0e9f298?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583316174775-bd6dc0e9f298?w=400&auto=format&fit=crop&q=80',
    alt: 'Traditional brass bowl with marigolds and turmeric ubtan paste',
    category: 'Village Rituals',
    title: 'Earthy Ubtan Ceremony',
    description: 'Authentic stone-ground turmeric and sandalwood paste used for custom haldi glow rituals.',
    isFeatured: true,
    createdAt: '2026-09-02'
  },
  {
    id: 'g3',
    imageUrl: 'https://images.unsplash.com/photo-1563212871-33160e909a31?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563212871-33160e909a31?w=400&auto=format&fit=crop&q=80',
    alt: 'Bride showing gorgeous henna paisley designs on hands',
    category: 'Bridal',
    title: 'Heritage Paisley Henna',
    description: 'Hand-mixed natural organic henna showcasing intricate peacock and vine motifs.',
    isFeatured: true,
    createdAt: '2026-09-03'
  },
  {
    id: 'g4',
    imageUrl: 'https://images.unsplash.com/photo-1595475241949-c2f210f66639?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595475241949-c2f210f66639?w=400&auto=format&fit=crop&q=80',
    alt: 'Intricate flower-woven braid with fresh white jasmine garlands',
    category: 'Hair Art',
    title: 'Royal Jasmine Gajra Braid',
    description: 'Stunning traditional hair weave structured with fragrant jasmine and marigolds.',
    isFeatured: false,
    createdAt: '2026-09-04'
  },
  {
    id: 'g5',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop&q=80',
    alt: 'Traditional handloom Banarasi silk saree pleat texture with gold threads',
    category: 'Bridal',
    title: 'Banarasi Pleating Precision',
    description: 'Expert pleating of a gorgeous red Banarasi silk saree with authentic gold zari borders.',
    isFeatured: true,
    createdAt: '2026-09-05'
  }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'r1',
    customerName: 'Devika Iyer',
    profileImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    serviceName: 'Royal Solah Shringar Bridal',
    rating: 5,
    reviewContent: 'I felt like an ancient queen! Rajeshwari\'s hand-drawn sandalwood bindi designs on my forehead were incredible. The fresh jasmine fragrance in my hair stayed sweet all night.',
    status: 'Approved',
    createdAt: '2026-09-08'
  },
  {
    id: 'r2',
    customerName: 'Sumitra Das',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    serviceName: 'Haldi & Ubtan Herb Polish',
    rating: 5,
    reviewContent: 'This Haldi & Ubtan therapy is pure village magic! They ground the wild turmeric right in a stone bowl before me. My skin emerged incredibly soft, smooth, and radiant.',
    status: 'Approved',
    createdAt: '2026-09-09'
  },
  {
    id: 'r3',
    customerName: 'Aditi Nair',
    profileImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    serviceName: 'Ayurvedic Eladi Facial',
    rating: 5,
    reviewContent: 'The Kansa wand massage and Eladi oils melted my stress away. The clay pot herbal steam with fresh neem leaves feels extremely refreshing and purifying.',
    status: 'Approved',
    createdAt: '2026-09-10'
  }
];

export const DEFAULT_OFFERS: Offer[] = [
  {
    id: 'o1',
    title: 'Bridal Makeup Package Offer',
    description: 'Book your royal bridal package today and save flat ₹1,000 off! Includes a free pre-event facial consultation.',
    code: 'BRIDAL1000',
    discountValue: 1000,
    type: 'bridal',
    status: 'Active'
  },
  {
    id: 'o2',
    title: 'Festive Season Glam',
    description: 'Get a luxurious blow-dry completely free of cost with any Party Makeup booking.',
    code: 'FESTIVEGLAM',
    type: 'festival',
    status: 'Active'
  }
];

export const DEFAULT_SETTINGS: WebsiteSettings = {
  whatsappNumber: '+919876543210',
  salonAddress: '12 Luxury Boulevard, Palace Row, Near Heritage Fountain, Agartala, Tripura - 799001',
  emailAddress: 'hello@glowandgrace.in',
  phoneNumber: '+91 98765 43210',
  openingHours: 'Monday – Sunday, 10:00 AM – 8:00 PM',
  instagramUrl: 'https://instagram.com/glowandgrace_salon',
  mapsUrl: 'https://maps.google.com/?q=Agartala+Tripura',
  iframeMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29202.836413481232!2d91.26514757317769!3d23.837375211993427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3753f3f01c8eb1db%3A0x6739920ef0d19f3c!2sAgartala%2C%20Tripura!5e0!3m2!1sen!2sin!4v1726145000000!5m2!1sen!2sin'
};

export const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    bookingId: 'GG-2026-00125',
    customerName: 'Pooja Roy',
    phone: '9876543210',
    email: 'pooja.roy@example.com',
    serviceId: 's2',
    serviceName: 'Party Makeup',
    artistId: 'a1',
    artistName: 'Riya Sharma',
    date: '2026-09-12',
    time: '16:00',
    specialRequest: 'Elegant look for a golden lehenga outfit.',
    status: 'Pending',
    createdAt: '2026-09-11T14:30:00.000Z'
  },
  {
    bookingId: 'GG-2026-00126',
    customerName: 'Meghna Chatterjee',
    phone: '9432165432',
    email: 'meghna@example.com',
    serviceId: 's1',
    serviceName: 'Bridal Makeup',
    artistId: 'a1',
    artistName: 'Riya Sharma',
    date: '2026-10-18',
    time: '11:00',
    specialRequest: 'Traditional Bengali bridal styling with elaborate skin bindi.',
    status: 'Confirmed',
    createdAt: '2026-09-10T10:00:00.000Z'
  }
];

export const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'New appointment request',
    message: 'Pooja Roy requested an appointment for Party Makeup on 12 Sep 2026',
    isRead: false,
    createdAt: '2026-09-11T14:30:00.000Z',
    bookingId: 'GG-2026-00125'
  }
];

type SyncListener = (key: string, data: any, prevData: any) => Promise<void> | void;
let syncListener: SyncListener | null = null;

// Helper database engine that syncs with LocalStorage
export class MockDB {
  static registerSyncListener(listener: SyncListener) {
    syncListener = listener;
  }

  static init() {
    const isAdmin = typeof window !== 'undefined' && (window.location.hash.includes('admin') || sessionStorage.getItem('gg_admin_token') === 'authorized');
    
    if (isAdmin) {
      // Admin dashboard strictly shows Firebase database content. Clear local seed/demo fallback if present.
      const services = localStorage.getItem('gg_services');
      if (!services || services.includes('bridal-makeup') || services.includes('party-makeup')) {
        localStorage.setItem('gg_services', '[]');
      }
      const packages = localStorage.getItem('gg_packages');
      if (!packages || packages.includes('Basic Makeup') || packages.includes('Party Makeup')) {
        localStorage.setItem('gg_packages', '[]');
      }
      const artists = localStorage.getItem('gg_artists');
      if (!artists || artists.includes('Riya Sharma') || artists.includes('riya-sharma')) {
        localStorage.setItem('gg_artists', '[]');
      }
      const gallery = localStorage.getItem('gg_gallery');
      if (!gallery || gallery.includes('Classic Bridal Glow') || gallery.includes('Bridal Glamour')) {
        localStorage.setItem('gg_gallery', '[]');
      }
      const reviews = localStorage.getItem('gg_reviews');
      if (!reviews || reviews.includes('Deepika') || reviews.includes('Sushmita')) {
        localStorage.setItem('gg_reviews', '[]');
      }
      const offers = localStorage.getItem('gg_offers');
      if (!offers || offers.includes('BRIDAL1000') || offers.includes('PARTY500')) {
        localStorage.setItem('gg_offers', '[]');
      }
      const appointments = localStorage.getItem('gg_appointments');
      if (!appointments || appointments.includes('Meghna Chatterjee') || appointments.includes('Pooja Roy')) {
        localStorage.setItem('gg_appointments', '[]');
      }
      const notifications = localStorage.getItem('gg_notifications');
      if (!notifications || notifications.includes('Pooja Roy')) {
        localStorage.setItem('gg_notifications', '[]');
      }
      if (!localStorage.getItem('gg_settings')) {
        localStorage.setItem('gg_settings', JSON.stringify(DEFAULT_SETTINGS));
      }
    } else {
      // Customer view fallback
      if (!localStorage.getItem('gg_services')) localStorage.setItem('gg_services', JSON.stringify(DEFAULT_SERVICES));
      if (!localStorage.getItem('gg_packages')) localStorage.setItem('gg_packages', JSON.stringify(DEFAULT_PACKAGES));
      if (!localStorage.getItem('gg_artists')) localStorage.setItem('gg_artists', JSON.stringify(DEFAULT_ARTISTS));
      if (!localStorage.getItem('gg_gallery')) localStorage.setItem('gg_gallery', JSON.stringify(DEFAULT_GALLERY));
      if (!localStorage.getItem('gg_reviews')) localStorage.setItem('gg_reviews', JSON.stringify(DEFAULT_REVIEWS));
      if (!localStorage.getItem('gg_offers')) localStorage.setItem('gg_offers', JSON.stringify(DEFAULT_OFFERS));
      if (!localStorage.getItem('gg_settings')) localStorage.setItem('gg_settings', JSON.stringify(DEFAULT_SETTINGS));
      if (!localStorage.getItem('gg_appointments')) localStorage.setItem('gg_appointments', JSON.stringify(DEFAULT_APPOINTMENTS));
      if (!localStorage.getItem('gg_notifications')) localStorage.setItem('gg_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
    }
  }

  static get<T>(key: string): T {
    this.init();
    const data = localStorage.getItem(`gg_${key}`);
    return data ? JSON.parse(data) : [] as unknown as T;
  }

  static async set(key: string, data: any) {
    // Get previous state from localStorage to find deletions
    const prevDataStr = localStorage.getItem(`gg_${key}`);
    const prevData = prevDataStr ? JSON.parse(prevDataStr) : null;

    // Save to local state instantly for extreme responsiveness
    localStorage.setItem(`gg_${key}`, JSON.stringify(data));
    window.dispatchEvent(new Event('gg_db_update'));

    if (syncListener) {
      try {
        await syncListener(key, data, prevData);
      } catch (e) {
        console.warn('Real-time replication to Firestore was intercepted or offline:', e);
      }
    }
  }

  // Generic lists
  static getServices() { return this.get<Service[]>('services'); }
  static getPackages() { return this.get<Package[]>('packages'); }
  static getArtists() { return this.get<Artist[]>('artists'); }
  static getGallery() { return this.get<GalleryItem[]>('gallery'); }
  static getReviews() { return this.get<Review[]>('reviews'); }
  static getOffers() { return this.get<Offer[]>('offers'); }
  static getSettings() { return this.get<WebsiteSettings>('settings'); }
  static getAppointments() { return this.get<Appointment[]>('appointments'); }
  static getNotifications() { return this.get<Notification[]>('notifications'); }

  // Appends/Updates
  static saveAppointment(app: Omit<Appointment, 'bookingId' | 'status' | 'createdAt'>) {
    const list = this.getAppointments();
    const prefix = 'GG-2026-';
    const randNum = Math.floor(10000 + Math.random() * 90000); // Unique 5 digits
    const bookingId = `${prefix}${randNum}`;
    
    const newApp: Appointment = {
      ...app,
      bookingId,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    list.unshift(newApp);
    this.set('appointments', list);

    // Add a notification
    const notifications = this.getNotifications();
    const newNotif: Notification = {
      id: `n-${Date.now()}`,
      title: 'New appointment request',
      message: `${newApp.customerName} requested an appointment for ${newApp.serviceName}`,
      isRead: false,
      createdAt: new Date().toISOString(),
      bookingId
    };
    notifications.unshift(newNotif);
    this.set('notifications', notifications);

    return newApp;
  }

  static updateAppointmentStatus(bookingId: string, status: Appointment['status'], notes?: string) {
    const list = this.getAppointments();
    const idx = list.findIndex(a => a.bookingId === bookingId);
    if (idx !== -1) {
      list[idx].status = status;
      if (notes !== undefined) {
        list[idx].adminNotes = notes;
      }
      this.set('appointments', list);
    }
  }

  static saveReview(rev: Omit<Review, 'id' | 'status' | 'createdAt'>) {
    const list = this.getReviews();
    const newRev: Review = {
      ...rev,
      id: `r-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    list.unshift(newRev);
    this.set('reviews', list);
    return newRev;
  }
}
