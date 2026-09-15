export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  startingPrice: number;
  originalPrice?: number;
  discount?: number;
  price?: number;
  category: string;
  imageUrl: string;
  image?: string; // Explicit URL/path field in Firestore
  duration: number; // in minutes
  status: 'Active' | 'Inactive';
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular: boolean;
  status: 'Active' | 'Inactive';
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  photoUrl: string;
  bio: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
  };
  status: 'Active' | 'Inactive';
  rating: number;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  isFeatured: boolean;
  createdAt: string;
  mediaType?: 'image' | 'video';
  videoUrl?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'reel';
  likes?: number;
  viewCount?: string;
  duration?: string;
  soundTitle?: string;
  beforeImageUrl?: string;
  tags?: string[];
  comments?: { id: string; user: string; text: string; time: string; avatar?: string }[];
  startingPrice?: number;
}

export interface Review {
  id: string;
  customerName: string;
  profileImageUrl: string;
  serviceName: string;
  rating: number;
  reviewContent: string;
  status: 'Pending' | 'Approved';
  createdAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code?: string;
  discountValue?: number;
  type: 'discount' | 'coupon' | 'seasonal' | 'bridal' | 'festival';
  status: 'Active' | 'Inactive';
}

export interface Appointment {
  bookingId: string;
  customerName: string;
  phone: string;
  email: string;
  serviceId: string;
  serviceName: string;
  artistId: string;
  artistName?: string;
  date: string;
  time: string;
  specialRequest?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  adminNotes?: string;
  createdAt: string;
}

export interface WebsiteSettings {
  whatsappNumber: string;
  salonAddress: string;
  emailAddress: string;
  phoneNumber: string;
  openingHours: string;
  instagramUrl: string;
  mapsUrl: string;
  iframeMapsUrl: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  keywords?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  bookingId?: string;
}
