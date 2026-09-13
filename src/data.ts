import { Service, Package, Artist, GalleryItem, Review, Offer, Appointment, WebsiteSettings, Notification } from './types';

export const DEFAULT_SERVICES: Service[] = [
  // MAKEUP
  {
    id: 's1',
    slug: 'bridal-makeup',
    name: 'Bridal Makeup',
    description: 'Complete royal bridal makeup transformation utilizing high-definition (HD) premium styling, custom ornaments arrangement, and optional traditional hand-painted sandalwood forehead art (chandan). Designed to look stunning in photography.',
    startingPrice: 10000,
    category: 'Makeup',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    duration: 180,
    status: 'Active'
  },
  {
    id: 's2',
    slug: 'party-makeup',
    name: 'Party Makeup',
    description: 'Elegant, camera-ready lightweight makeup ideal for wedding guests, festivals, family ceremonies, and evening parties.',
    startingPrice: 2500,
    category: 'Makeup',
    imageUrl: 'https://images.unsplash.com/photo-1481501940778-c8bb63e376c5?w=800&auto=format&fit=crop&q=80',
    duration: 60,
    status: 'Active'
  },
  {
    id: 's3',
    slug: 'engagement-makeup',
    name: 'Engagement Makeup',
    description: 'A charming, dewy-glow makeup look customized for your engagement ceremony to ensure you look graceful and glowing.',
    startingPrice: 4500,
    category: 'Makeup',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    duration: 90,
    status: 'Active'
  },
  {
    id: 's4',
    slug: 'reception-makeup',
    name: 'Reception Makeup',
    description: 'Glamorous and striking bridal reception look featuring premium contouring, sparkling eye artistry, and HD finish.',
    startingPrice: 5500,
    category: 'Makeup',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
    duration: 120,
    status: 'Active'
  },
  {
    id: 's5',
    slug: 'hd-makeup',
    name: 'HD Makeup',
    description: 'High-definition photo-friendly makeup that flawlessly conceals blemishes and delivers a smooth, matte, photo-ready complexion.',
    startingPrice: 3500,
    category: 'Makeup',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
    duration: 90,
    status: 'Active'
  },
  {
    id: 's6',
    slug: 'basic-makeup',
    name: 'Basic Makeup',
    description: 'Minimalist natural makeup touch-up ideal for daytime social gatherings, casual photography, or corporate meetings.',
    startingPrice: 1500,
    category: 'Makeup',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80',
    duration: 45,
    status: 'Active'
  },

  // HAIR
  {
    id: 's7',
    slug: 'hair-cut',
    name: 'Hair Cut',
    description: 'Trendy layered cuts, step cut, classic feather cut, blunt bob, or simple trims customized by our ladies hairstylists to suit your facial structure.',
    startingPrice: 450,
    category: 'Hair',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop&q=80',
    duration: 45,
    status: 'Active'
  },
  {
    id: 's8',
    slug: 'hair-styling',
    name: 'Hair Styling',
    description: 'Premium locks styling including soft bouncy curls, sleek straightening, crimping, or beautiful classic updos.',
    startingPrice: 750,
    category: 'Hair',
    imageUrl: 'https://images.unsplash.com/photo-1595475241949-c2f210f66639?w=800&auto=format&fit=crop&q=80',
    duration: 40,
    status: 'Active'
  },
  {
    id: 's9',
    slug: 'hair-spa',
    name: 'Hair Spa',
    description: 'Deep nourishing therapy using steam and premium Argan oil masks to hydrate dry, damaged hair and control frizz.',
    startingPrice: 1200,
    category: 'Hair',
    imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80',
    duration: 60,
    status: 'Active'
  },
  {
    id: 's10',
    slug: 'hair-treatment',
    name: 'Hair Treatment',
    description: 'Intense hair care treatments including professional smoothening, keratin infusion, or cysteine therapy for sleek and smooth hair.',
    startingPrice: 2500,
    category: 'Hair',
    imageUrl: 'https://images.unsplash.com/photo-1522337060762-d41222475477?w=800&auto=format&fit=crop&q=80',
    duration: 120,
    status: 'Active'
  },
  {
    id: 's11',
    slug: 'blow-dry',
    name: 'Blow Dry',
    description: 'Professional hair wash accompanied by a gorgeous voluminous blow-out styling session to leave your hair bouncy and glossy.',
    startingPrice: 350,
    category: 'Hair',
    imageUrl: 'https://images.unsplash.com/photo-1527799841627-d11db096c759?w=800&auto=format&fit=crop&q=80',
    duration: 30,
    status: 'Active'
  },
  {
    id: 's12',
    slug: 'bridal-hairstyling',
    name: 'Bridal Hairstyling',
    description: 'Exquisite traditional bridal bun, classic braids, or half-open hairstyles embellished with fragrant jasmine gajra or floral accessories.',
    startingPrice: 1500,
    category: 'Hair',
    imageUrl: 'https://images.unsplash.com/photo-1595475241949-c2f210f66639?w=800&auto=format&fit=crop&q=80',
    duration: 60,
    status: 'Active'
  },

  // SKIN & FACIAL
  {
    id: 's13',
    slug: 'premium-facial',
    name: 'Facial',
    description: 'Rejuvenating face therapies using gold dust, pearl extract, or herbal ingredients to restore natural skin elasticity and deliver an ethereal glow.',
    startingPrice: 1500,
    category: 'Skin & Facial',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop&q=80',
    duration: 60,
    status: 'Active'
  },
  {
    id: 's14',
    slug: 'pore-cleanup',
    name: 'Cleanup',
    description: 'Standard pore cleansing sequence focused on removing blackheads, dead skin cells, and clearing excess facial oils.',
    startingPrice: 600,
    category: 'Skin & Facial',
    imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&auto=format&fit=crop&q=80',
    duration: 40,
    status: 'Active'
  },
  {
    id: 's15',
    slug: 'de-tan-treatment',
    name: 'De-Tan',
    description: 'Extremely effective tan-removal face pack enriched with milk proteins, natural active honey, and cooling agents.',
    startingPrice: 500,
    category: 'Skin & Facial',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80',
    duration: 30,
    status: 'Active'
  },
  {
    id: 's16',
    slug: 'skin-brightening-bleach',
    name: 'Bleach',
    description: 'Gentle facial bleaching treatment formulated with active oxygen to lighten facial hair and brighten skin tone.',
    startingPrice: 400,
    category: 'Skin & Facial',
    imageUrl: 'https://images.unsplash.com/photo-1516238840914-94dfc0c873ae?w=800&auto=format&fit=crop&q=80',
    duration: 30,
    status: 'Active'
  },
  {
    id: 's17',
    slug: 'skin-polishing',
    name: 'Skin Polishing',
    description: 'Luxury skin exfoliation and deep hydration sequence that targets fine lines, uneven textures, and brings out a radiant glow.',
    startingPrice: 2200,
    category: 'Skin & Facial',
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop&q=80',
    duration: 75,
    status: 'Active'
  },
  {
    id: 's18',
    slug: 'face-cleanup',
    name: 'Face Cleanup',
    description: 'Instantly refreshing cleanup using organic rose water, wild honey scrubs, and a cooling herbal clay mask.',
    startingPrice: 550,
    category: 'Skin & Facial',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
    duration: 30,
    status: 'Active'
  },

  // GROOMING
  {
    id: 's19',
    slug: 'eyebrow-threading',
    name: 'Eyebrow / Threading',
    description: 'Precise hair removal mapping using soft organic cotton thread to shape beautiful, symmetrical eyebrow arches.',
    startingPrice: 50,
    category: 'Grooming',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    duration: 15,
    status: 'Active'
  },
  {
    id: 's20',
    slug: 'upper-lip-threading',
    name: 'Upper Lip',
    description: 'Quick and hygienic threading treatment for upper lip hair removal.',
    startingPrice: 30,
    category: 'Grooming',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop&q=80',
    duration: 10,
    status: 'Active'
  },
  {
    id: 's21',
    slug: 'full-face-threading',
    name: 'Full Face Threading',
    description: 'Gentle threading removal of fine facial peach fuzz to reveal incredibly smooth skin, allowing flawless makeup adhesion.',
    startingPrice: 250,
    category: 'Grooming',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80',
    duration: 30,
    status: 'Active'
  },
  {
    id: 's22',
    slug: 'honey-rika-waxing',
    name: 'Waxing',
    description: 'Hygienic, comfortable waxing for arms, legs, or full body using organic Honey or premium Rika peel wax to minimize skin redness.',
    startingPrice: 400,
    category: 'Grooming',
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop&q=80',
    duration: 45,
    status: 'Active'
  },
  {
    id: 's23',
    slug: 'nourishing-manicure',
    name: 'Manicure',
    description: 'Soothing hand massage, nail clipping, cuticle tidying, hand scrub exfoliation, and a gorgeous nail lacquer coat.',
    startingPrice: 600,
    category: 'Grooming',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80',
    duration: 45,
    status: 'Active'
  },
  {
    id: 's24',
    slug: 'soothing-pedicure',
    name: 'Pedicure',
    description: 'Relaxing foot bath soak, heel scrubbing, cuticle grooming, skin softening massage, and expert nail polishing.',
    startingPrice: 800,
    category: 'Grooming',
    imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c9?w=800&auto=format&fit=crop&q=80',
    duration: 50,
    status: 'Active'
  },

  // BRIDAL SERVICES
  {
    id: 's25',
    slug: 'saree-draping',
    name: 'Saree Draping',
    description: 'Flawless precision pleating and secure draping of heavy traditional Banarasi silk, Kanjeevaram, Georgette, or designer sarees.',
    startingPrice: 600,
    category: 'Bridal Services',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    duration: 35,
    status: 'Active'
  },
  {
    id: 's26',
    slug: 'bridal-nail-styling',
    name: 'Nail Styling',
    description: 'Professional gel extensions, acrylic nail styling, or bespoke bridal nail art design matching your bridal attire.',
    startingPrice: 800,
    category: 'Bridal Services',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80',
    duration: 60,
    status: 'Active'
  },
  {
    id: 's27',
    slug: 'pre-bridal-package-service',
    name: 'Pre-Bridal Package',
    description: 'A multi-step holistic grooming series consisting of full skin polishing, luxury facial, body waxing, hair spa, and eyebrows threading.',
    startingPrice: 4999,
    category: 'Bridal Services',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    duration: 240,
    status: 'Active'
  }
];

export const DEFAULT_PACKAGES: Package[] = [
  {
    id: 'p1',
    name: 'Basic Beauty Package',
    price: 1499,
    description: 'An essential and affordable package designed for routine beauty preservation.',
    features: [
      'Face Cleanup (30 mins)',
      'Eyebrow Threading & Upper Lip',
      'Half Arms Honey Waxing',
      'Basic Hair Trim & Blow Dry'
    ],
    isPopular: false,
    status: 'Active'
  },
  {
    id: 'p2',
    name: 'Party Ready Package',
    price: 2999,
    description: 'Get perfectly dolled up for wedding parties, festive family functions, or receptions.',
    features: [
      'Party Makeup (HD Finish)',
      'Elegant Hair Styling / Classic Soft Curls',
      'Professional Saree or Lehenga Draping',
      'Glossy Nail Polish Coat'
    ],
    isPopular: true,
    status: 'Active'
  },
  {
    id: 'p3',
    name: 'Bridal Package',
    price: 12499,
    description: 'The ultimate royal makeover for your special day. Crafted with premium, luxury materials.',
    features: [
      'Royal Bridal HD or Airbrush Makeup',
      'Bridal Hairstyling with fresh jasmine gajra',
      'Heavy Double Dupatta & Saree Draping',
      'Skin Brightening Gold Face Polish (1 day prior)',
      'Luxury Bridal Touch-Up Keep-Safe Kit'
    ],
    isPopular: false,
    status: 'Active'
  },
  {
    id: 'p4',
    name: 'Pre-Bridal Package',
    price: 5999,
    description: 'A luxury pre-wedding full grooming routine to revitalize your hair, body, and facial skin.',
    features: [
      'Gold Glow Facial & Oxygen Face Bleach',
      'L\'Oreal Professional Nourishing Hair Spa',
      'Full Arms & Full Legs Rika Waxing',
      'Luxurious Rose Pedicure & Manicure',
      'Eyebrow shaping and Face Threading'
    ],
    isPopular: false,
    status: 'Active'
  },
  {
    id: 'p5',
    name: 'Hair & Skin Care Package',
    price: 2499,
    description: 'Revitalizing deep moisture and cell regeneration package to soothe and replenish your skin and locks.',
    features: [
      'Deep Pore Skin Facial (60 mins)',
      'Keratin Hydration Hair Spa & Blow Dry',
      'Relaxing Shoulder & Neck Massage',
      'Hand Polishing Herbal Exfoliation'
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
    role: 'Senior Bridal Makeup Specialist',
    experience: '15+ Years',
    specialty: 'Traditional & HD Bridal Makeup',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    bio: 'Rajeshwari is a legend in Indian bridal cosmetics and saree draping. Famous for her precision in drawing classic forehead patterns and pleating heavy silk sarees flawlessly.',
    socialLinks: { instagram: '@rajeshwari_bridals', facebook: 'rajeshwari.parlour' },
    status: 'Active',
    rating: 5.0
  },
  {
    id: 'a2',
    slug: 'riya-sharma',
    name: 'Riya Sharma',
    role: 'Senior Hair Stylist & Skin Expert',
    experience: '10+ Years',
    specialty: 'Hair Treatments & Gold Facials',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    bio: 'Riya holds multiple certifications in hair smoothening, keratin infusion, and luxury facial cleanup therapies. She designs customized skin regimens.',
    socialLinks: { instagram: '@riya_hairstyles' },
    status: 'Active',
    rating: 4.9
  },
  {
    id: 'a3',
    slug: 'kavitha-pillai',
    name: 'Kavitha Pillai',
    role: 'Traditional Hair Stylist',
    experience: '8+ Years',
    specialty: 'Bridal Buns & Flower Braiding',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    bio: 'Kavitha specializes in styling traditional buns and braids embellished with fresh jasmine gajras and roses to complement bridal attire.',
    socialLinks: { instagram: '@kavitha_hairweaving' },
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
    category: 'Bridal Services',
    title: 'Royal Bridal Glow',
    description: 'Chandan forehead art, gorgeous crimson lips, and heavy Kanjeevaram saree styling.',
    isFeatured: true,
    createdAt: '2026-09-01'
  },
  {
    id: 'g2',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&auto=format&fit=crop&q=80',
    alt: 'Cream skin facial cleanup session',
    category: 'Skin & Facial',
    title: 'Premium Glow Facial',
    description: 'Deep skin polishing scrub and gold foil facial mask to unlock natural radiance.',
    isFeatured: true,
    createdAt: '2026-09-02'
  },
  {
    id: 'g3',
    imageUrl: 'https://images.unsplash.com/photo-1563212871-33160e909a31?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563212871-33160e909a31?w=400&auto=format&fit=crop&q=80',
    alt: 'Bride showing gorgeous henna paisley designs on hands',
    category: 'Bridal Services',
    title: 'Exquisite Bridal Henna',
    description: 'Organic hand-applied mehendi showcasing intricate traditional motifs.',
    isFeatured: true,
    createdAt: '2026-09-03'
  },
  {
    id: 'g4',
    imageUrl: 'https://images.unsplash.com/photo-1595475241949-c2f210f66639?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595475241949-c2f210f66639?w=400&auto=format&fit=crop&q=80',
    alt: 'Intricate flower-woven braid with fresh white jasmine garlands',
    category: 'Hair',
    title: 'Bridal Gajra Hairstyling',
    description: 'Elegant hair weave structured with fresh fragrant jasmine garlands.',
    isFeatured: false,
    createdAt: '2026-09-04'
  },
  {
    id: 'g5',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop&q=80',
    alt: 'Traditional handloom silk saree pleat texture with gold threads',
    category: 'Bridal Services',
    title: 'Saree Draping Precision',
    description: 'Expert pleating and securing of a gorgeous Banarasi silk saree with gold zari.',
    isFeatured: true,
    createdAt: '2026-09-05'
  }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'r1',
    customerName: 'Devika Iyer',
    profileImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    serviceName: 'Bridal Makeup',
    rating: 5,
    reviewContent: 'I felt like an absolute queen! Rajeshwari\'s hand-drawn sandalwood bindi designs on my forehead were incredible. The fresh jasmine fragrance in my hair stayed sweet all night.',
    status: 'Approved',
    createdAt: '2026-09-08'
  },
  {
    id: 'r2',
    customerName: 'Sumitra Das',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    serviceName: 'Facial',
    rating: 5,
    reviewContent: 'The facial treatment is pure magic! My skin emerged incredibly soft, smooth, and radiant. Highly recommend the Glow and Grace parlour.',
    status: 'Approved',
    createdAt: '2026-09-09'
  },
  {
    id: 'r3',
    customerName: 'Aditi Nair',
    profileImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    serviceName: 'Hair Spa',
    rating: 5,
    reviewContent: 'The hair spa treatment and scalp massage melted my stress away. My hair feels extremely silky and frizz-free now!',
    status: 'Approved',
    createdAt: '2026-09-10'
  }
];

export const DEFAULT_OFFERS: Offer[] = [
  {
    id: 'o1',
    title: 'Bridal Makeup Package Offer',
    description: 'Book your bridal package today and save flat ₹1,000 off! Includes a free pre-event facial consultation.',
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
  whatsappNumber: '+916033271400',
  salonAddress: '12 Luxury Boulevard, Palace Row, Near Heritage Fountain, Agartala, Tripura - 799001',
  emailAddress: 'hello@glowandgrace.in',
  phoneNumber: '+91 60332 71400',
  openingHours: 'Monday – Sunday, 10:00 AM – 8:00 PM',
  instagramUrl: 'https://instagram.com/glowandgrace_salon',
  mapsUrl: 'https://maps.google.com/?q=Agartala+Tripura',
  iframeMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29202.836413481232!2d91.26514757317769!3d23.837375211993427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3753f3f01c8eb1db%3A0x6739920ef0d19f3c!2sAgartala%2C%20Tripura!5e0!3m2!1sen!2sin!4v1726145000000!5m2!1sen!2sin'
};

export const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    bookingId: 'GG-2026-00125',
    customerName: 'Pooja Roy',
    phone: '6033271400',
    email: 'pooja.roy@example.com',
    serviceId: 's2',
    serviceName: 'Party Makeup',
    artistId: 'a2',
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
    artistName: 'Rajeshwari Devi',
    date: '2026-10-18',
    time: '11:00',
    specialRequest: 'Traditional Bengali bridal styling with elaborate forehead patterns.',
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
      const cachedSettings = localStorage.getItem('gg_settings');
      if (!cachedSettings || cachedSettings.includes('9876543210')) {
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
      
      const cachedSettings = localStorage.getItem('gg_settings');
      if (!cachedSettings || cachedSettings.includes('9876543210')) {
        localStorage.setItem('gg_settings', JSON.stringify(DEFAULT_SETTINGS));
      } else {
        localStorage.setItem('gg_settings', JSON.stringify(DEFAULT_SETTINGS)); // Force overwrite to always keep up to date
      }
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
