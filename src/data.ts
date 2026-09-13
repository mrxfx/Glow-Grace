import { Service, Package, Artist, GalleryItem, Review, Offer, Appointment, WebsiteSettings, Notification } from './types';

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 's1',
    slug: 'bridal-makeup',
    name: 'Bridal Makeup',
    description: 'Complete royal bridal transformation designed to make your wedding day absolutely magical. High-definition (HD) and airbrush finishes available.',
    startingPrice: 7999,
    category: 'Bridal',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    duration: 180,
    status: 'Active'
  },
  {
    id: 's2',
    slug: 'party-makeup',
    name: 'Party Makeup',
    description: 'Elegant, modern looks tailored specifically for cocktail parties, social events, or anniversaries. High-precision eye makeup and contouring.',
    startingPrice: 1999,
    category: 'Party',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    duration: 60,
    status: 'Active'
  },
  {
    id: 's3',
    slug: 'engagement-makeup',
    name: 'Engagement Makeup',
    description: 'A radiant, photographic and camera-ready makeup look for your engagement ceremony. Includes premium hair styling and outfit styling support.',
    startingPrice: 3999,
    category: 'Engagement',
    imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&auto=format&fit=crop&q=80',
    duration: 120,
    status: 'Active'
  },
  {
    id: 's4',
    slug: 'hair-styling',
    name: 'Hair Styling',
    description: 'Professional updos, curls, braids, or signature blowouts for any special occasion. Designed to complement your facial structure and outfit.',
    startingPrice: 1200,
    category: 'Hair',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop&q=80',
    duration: 45,
    status: 'Active'
  },
  {
    id: 's5',
    slug: 'facial-skincare',
    name: 'Facial & Skincare',
    description: 'Hydrating, brightening, and rejuvenating skin treatments to reveal your natural inner radiance. Features organic premium products.',
    startingPrice: 1500,
    category: 'Skincare',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop&q=80',
    duration: 75,
    status: 'Active'
  },
  {
    id: 's6',
    slug: 'manicure-pedicure',
    name: 'Manicure & Pedicure',
    description: 'Soothing and revitalizing care for hands and feet. Includes gentle exfoliation, massage, nail shaping, cuticle care, and professional gel polish.',
    startingPrice: 999,
    category: 'Nails',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80',
    duration: 60,
    status: 'Active'
  },
  {
    id: 's7',
    slug: 'saree-draping',
    name: 'Saree Draping',
    description: 'Flawless pleating and draping of traditional sarees (Bengali, Gujarati, South Indian, or modern styles). Long-lasting secure pinning.',
    startingPrice: 800,
    category: 'Bridal',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    duration: 30,
    status: 'Active'
  },
  {
    id: 's8',
    slug: 'threading-waxing',
    name: 'Threading & Waxing',
    description: 'Gentle, precise threading for brows and face, and hygienic waxing services for silky-smooth grooming under strict safety standards.',
    startingPrice: 300,
    category: 'Salon',
    imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&auto=format&fit=crop&q=80',
    duration: 20,
    status: 'Active'
  }
];

export const DEFAULT_PACKAGES: Package[] = [
  {
    id: 'p1',
    name: 'Basic Makeup',
    price: 999,
    description: 'Clean, radiant everyday look perfect for casual photography, dinners, or professional meetings.',
    features: [
      'Basic makeup base',
      'Simple hairstyle (straightening/waves)',
      'Basic finishing touch-up'
    ],
    isPopular: false,
    status: 'Active'
  },
  {
    id: 'p2',
    name: 'Party Makeup',
    price: 1999,
    description: 'Flawless, long-lasting premium base with specialized eye contouring and premium makeup products.',
    features: [
      'Professional HD makeup base',
      'Elegant hair styling of choice',
      'Dramatic eyes & eyelash application',
      'Long-wear setting finish'
    ],
    isPopular: true,
    status: 'Active'
  },
  {
    id: 'p3',
    name: 'Engagement Makeup',
    price: 3999,
    description: 'Exquisite, photographic, camera-ready bridal trial level makeup designed for elegant engagement ceremonies.',
    features: [
      'Premium photo-friendly HD makeup',
      'Intricate hair setting & bun styling',
      'Custom luxury eye makeup & lashes',
      'Dupatta or Saree draping support',
      'Personalized tone/style consultation'
    ],
    isPopular: false,
    status: 'Active'
  },
  {
    id: 'p4',
    name: 'Bridal Makeup',
    price: 7999,
    description: 'The ultimate royal bridal experience. Complete custom face sculpting, airbrushing, and complete styling assistance.',
    features: [
      'Royal bridal HD/Airbrush makeup',
      'Traditional or modern bridal hair styling',
      'Flawless saree or heavy lehenga draping',
      'Premium 18-hour stay-lock finish',
      'Detailed jewelry setting assistance',
      'Pre-wedding consultation & facial check',
      'Touch-up kit support'
    ],
    isPopular: false,
    status: 'Active'
  }
];

export const DEFAULT_ARTISTS: Artist[] = [
  {
    id: 'a1',
    slug: 'riya-sharma',
    name: 'Riya Sharma',
    role: 'Senior Makeup Artist',
    experience: '8+ Years',
    specialty: 'Bridal HD & Airbrush',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    bio: 'Riya has styled over 300+ brides and is renowned for her sophisticated touch, enhancing natural features without ever overdoing it.',
    socialLinks: { instagram: '@riya_glowandgrace', facebook: 'riya.sharma.beauty' },
    status: 'Active',
    rating: 4.9
  },
  {
    id: 'a2',
    slug: 'neha-sen',
    name: 'Neha Sen',
    role: 'Hair Specialist',
    experience: '5+ Years',
    specialty: 'Creative Updos & Extensions',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    bio: 'Neha is our visionary stylist who treats hair like fine sculpture. Whether traditional flower braids or chic celebrity updos, she crafts masterpieces.',
    socialLinks: { instagram: '@neha_hairstyles' },
    status: 'Active',
    rating: 4.8
  },
  {
    id: 'a3',
    slug: 'pooja-mehta',
    name: 'Pooja Mehta',
    role: 'Skin Expert',
    experience: '6+ Years',
    specialty: 'Advanced Hydration Facials',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    bio: 'Pooja believes healthy skin is the ultimate canvas for makeup. She provides deeply relaxing, medically-informed treatments for ultimate glow.',
    socialLinks: { instagram: '@pooja_skinbeauty', facebook: 'pooja.mehta.skin' },
    status: 'Active',
    rating: 5.0
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    imageUrl: 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?w=400&auto=format&fit=crop&q=80',
    alt: 'Bridal makeup close up with premium jewelry',
    category: 'Bridal',
    title: 'Royal Indian Bridal Glow',
    description: 'Flawless airbrush base with custom rose-gold eyes and bold traditional lips.',
    isFeatured: true,
    createdAt: '2026-09-01'
  },
  {
    id: 'g2',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&auto=format&fit=crop&q=80',
    alt: 'Cocktail party elegant look',
    category: 'Party',
    title: 'Modern Cocktail Look',
    description: 'Sleek glass skin effect with a soft smokey eye and nude satin lip finish.',
    isFeatured: true,
    createdAt: '2026-09-02'
  },
  {
    id: 'g3',
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&auto=format&fit=crop&q=80',
    alt: 'Stunning engagement makeup look',
    category: 'Engagement',
    title: 'Pastel Engagement Glow',
    description: 'Soft-matte base paired with shimmering eyes to capture perfect stage lighting.',
    isFeatured: true,
    createdAt: '2026-09-03'
  },
  {
    id: 'g4',
    imageUrl: 'https://images.unsplash.com/photo-1595475241949-c2f210f66639?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595475241949-c2f210f66639?w=400&auto=format&fit=crop&q=80',
    alt: 'Intricate floral braid hair style',
    category: 'Hair',
    title: 'Signature Rose Braid',
    description: 'Detailed traditional hair weave styled with fresh baby-breath blooms.',
    isFeatured: false,
    createdAt: '2026-09-04'
  },
  {
    id: 'g5',
    imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&auto=format&fit=crop&q=80',
    alt: 'Premium skincare facial session',
    category: 'Skincare',
    title: 'Absolute Hydration Therapy',
    description: 'Clients skin glowing post our gold-dust collagen facial massage.',
    isFeatured: false,
    createdAt: '2026-09-05'
  },
  {
    id: 'g6',
    imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&auto=format&fit=crop&q=80',
    alt: 'Delicate nail art with gold leaf',
    category: 'Nails',
    title: 'Champagne Gold Nail Art',
    description: 'Hand-crafted premium extensions featuring marble swirls and real gold flakes.',
    isFeatured: true,
    createdAt: '2026-09-06'
  },
  {
    id: 'g7',
    imageUrl: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400&auto=format&fit=crop&q=80',
    alt: 'Luxurious salon interior',
    category: 'Salon',
    title: 'Glow & Grace Studio Lounge',
    description: 'Our luxurious space designed to offer pure relaxation and VIP pampering.',
    isFeatured: false,
    createdAt: '2026-09-07'
  }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'r1',
    customerName: 'Ananya Ray',
    profileImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    serviceName: 'Bridal Makeup',
    rating: 5,
    reviewContent: 'Absolutely loved the makeup! The team made my special day even more beautiful. Riya is a true magician — she kept me calm, drape was flawless, and the makeup stayed completely fresh for 14 hours!',
    status: 'Approved',
    createdAt: '2026-09-08'
  },
  {
    id: 'r2',
    customerName: 'Priya Das',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    serviceName: 'Hair Styling',
    rating: 5,
    reviewContent: 'The hair styling was super elegant and stayed perfect all night. Highly recommend Neha! She worked with my fine hair and styled a voluminous braid that drew so many compliments.',
    status: 'Approved',
    createdAt: '2026-09-09'
  },
  {
    id: 'r3',
    customerName: 'Sneha Sen',
    profileImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    serviceName: 'Facial & Skincare',
    rating: 5,
    reviewContent: 'Very professional and hygienic environment. My facial was so relaxing and Pooja gave great skin advice. My face is literally beaming!',
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
