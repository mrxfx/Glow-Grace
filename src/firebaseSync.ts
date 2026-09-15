import { 
  collection, doc, onSnapshot, setDoc, deleteDoc, getDocs, getDoc, 
  query, where, writeBatch, Unsubscribe
} from 'firebase/firestore';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { MockDB, DEFAULT_SERVICES, DEFAULT_PACKAGES, DEFAULT_ARTISTS, DEFAULT_GALLERY, DEFAULT_REVIEWS } from './data';
import { Service, Package, Artist, GalleryItem, Review, Offer, Appointment, WebsiteSettings, Notification } from './types';

// Admin email from metadata
const ADMIN_EMAIL = 'rahulhaldarx15@gmail.com';

// Active listeners tracker to prevent memory leaks or duplicate attachments
const activeListeners: Record<string, Unsubscribe> = {};

// Helper to determine if currently logged in user is admin
export function isCurrentUserAdmin(): boolean {
  return auth.currentUser?.email === ADMIN_EMAIL;
}

/**
 * Validates Firestore connection on startup (requirement from skill)
 */
export async function validateConnection(): Promise<void> {
  try {
    const testDoc = doc(db, 'settings', 'global');
    await getDoc(testDoc);
    console.log('Firebase connection verified.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('offline')) {
      console.error('Please check your Firebase configuration or internet connection.');
    }
  }
}

/**
 * Seed Firestore with default data if it is empty
 */
export async function seedFirestoreIfNeeded(): Promise<void> {
  try {
    const servicesSnap = await getDocs(collection(db, 'services'));
    if (servicesSnap.empty) {
      console.log('Seeding initial services to Firestore...');
      const batch = writeBatch(db);
      const defaults = MockDB.getServices();
      defaults.forEach((s) => {
        const img = s.image || s.imageUrl || 'https://images.unsplash.com/photo-1481501940778-c8bb63e376c5?w=800&auto=format&fit=crop&q=80';
        batch.set(doc(db, 'services', s.id), {
          ...s,
          image: img,
          imageUrl: img
        });
      });
      await batch.commit();
    }

    const packagesSnap = await getDocs(collection(db, 'packages'));
    if (packagesSnap.empty) {
      console.log('Seeding initial packages to Firestore...');
      const batch = writeBatch(db);
      const defaults = MockDB.getPackages();
      defaults.forEach((p) => {
        batch.set(doc(db, 'packages', p.id), p);
      });
      await batch.commit();
    }

    const artistsSnap = await getDocs(collection(db, 'artists'));
    if (artistsSnap.empty) {
      console.log('Seeding initial artists to Firestore...');
      const batch = writeBatch(db);
      const defaults = MockDB.getArtists();
      defaults.forEach((a) => {
        batch.set(doc(db, 'artists', a.id), a);
      });
      await batch.commit();
    }

    const gallerySnap = await getDocs(collection(db, 'gallery'));
    if (gallerySnap.empty) {
      console.log('Seeding initial gallery to Firestore...');
      const batch = writeBatch(db);
      const defaults = MockDB.getGallery();
      defaults.forEach((g) => {
        batch.set(doc(db, 'gallery', g.id), g);
      });
      await batch.commit();
    }

    const reviewsSnap = await getDocs(collection(db, 'reviews'));
    if (reviewsSnap.empty) {
      console.log('Seeding initial reviews to Firestore...');
      const batch = writeBatch(db);
      const defaults = MockDB.getReviews();
      defaults.forEach((r) => {
        batch.set(doc(db, 'reviews', r.id), r);
      });
      await batch.commit();
    }

    const offersSnap = await getDocs(collection(db, 'offers'));
    if (offersSnap.empty) {
      console.log('Seeding initial offers to Firestore...');
      const batch = writeBatch(db);
      const defaults = MockDB.getOffers();
      defaults.forEach((o) => {
        batch.set(doc(db, 'offers', o.id), o);
      });
      await batch.commit();
    }

    const settingsDoc = await getDoc(doc(db, 'settings', 'global'));
    if (!settingsDoc.exists()) {
      console.log('Seeding initial global settings to Firestore...');
      await setDoc(doc(db, 'settings', 'global'), MockDB.getSettings());
    }

    const appointmentsSnap = await getDocs(collection(db, 'appointments'));
    if (appointmentsSnap.empty) {
      console.log('Seeding initial appointments to Firestore...');
      const batch = writeBatch(db);
      const defaults = MockDB.getAppointments();
      defaults.forEach((app) => {
        batch.set(doc(db, 'appointments', app.bookingId), app);
      });
      await batch.commit();
    }

    const notificationsSnap = await getDocs(collection(db, 'notifications'));
    if (notificationsSnap.empty) {
      console.log('Seeding initial notifications to Firestore...');
      const batch = writeBatch(db);
      const defaults = MockDB.getNotifications();
      defaults.forEach((n) => {
        batch.set(doc(db, 'notifications', n.id), n);
      });
      await batch.commit();
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.warn('Seeding failed (expected if non-admin writes are blocked):', error);
  }
}

/**
 * Setup Real-time Listeners for Public collections (Available to all users)
 */
export function startPublicSyncListeners(): void {
  // 1. Services
  if (!activeListeners['services']) {
    activeListeners['services'] = onSnapshot(collection(db, 'services'), (snap) => {
      const services: Service[] = [];
      snap.forEach((d) => {
        const data = d.data() as Service;
        const img = data.image || data.imageUrl || 'https://images.unsplash.com/photo-1481501940778-c8bb63e376c5?w=800&auto=format&fit=crop&q=80';
        services.push({
          ...data,
          image: img,
          imageUrl: img
        });
      });
      localStorage.setItem('gg_services', JSON.stringify(services));
      window.dispatchEvent(new Event('gg_db_update'));
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'services');
    });
  }

  // 2. Packages
  if (!activeListeners['packages']) {
    activeListeners['packages'] = onSnapshot(collection(db, 'packages'), (snap) => {
      const packages: Package[] = [];
      snap.forEach((d) => packages.push(d.data() as Package));
      localStorage.setItem('gg_packages', JSON.stringify(packages));
      window.dispatchEvent(new Event('gg_db_update'));
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'packages');
    });
  }

  // 3. Artists
  if (!activeListeners['artists']) {
    activeListeners['artists'] = onSnapshot(collection(db, 'artists'), (snap) => {
      const artists: Artist[] = [];
      snap.forEach((d) => artists.push(d.data() as Artist));
      localStorage.setItem('gg_artists', JSON.stringify(artists));
      window.dispatchEvent(new Event('gg_db_update'));
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'artists');
    });
  }

  // 4. Gallery
  if (!activeListeners['gallery']) {
    activeListeners['gallery'] = onSnapshot(collection(db, 'gallery'), (snap) => {
      const gallery: GalleryItem[] = [];
      snap.forEach((d) => gallery.push(d.data() as GalleryItem));
      // Sort gallery by createdAt descending
      gallery.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      localStorage.setItem('gg_gallery', JSON.stringify(gallery));
      window.dispatchEvent(new Event('gg_db_update'));
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'gallery');
    });
  }

  // 5. Reviews
  if (!activeListeners['reviews']) {
    activeListeners['reviews'] = onSnapshot(collection(db, 'reviews'), (snap) => {
      const reviews: Review[] = [];
      snap.forEach((d) => reviews.push(d.data() as Review));
      // Sort reviews by createdAt descending if needed
      localStorage.setItem('gg_reviews', JSON.stringify(reviews));
      window.dispatchEvent(new Event('gg_db_update'));
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'reviews');
    });
  }

  // 6. Offers
  if (!activeListeners['offers']) {
    activeListeners['offers'] = onSnapshot(collection(db, 'offers'), (snap) => {
      const offers: Offer[] = [];
      snap.forEach((d) => offers.push(d.data() as Offer));
      localStorage.setItem('gg_offers', JSON.stringify(offers));
      window.dispatchEvent(new Event('gg_db_update'));
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'offers');
    });
  }

  // 7. Settings
  if (!activeListeners['settings']) {
    activeListeners['settings'] = onSnapshot(doc(db, 'settings', 'global'), (snap) => {
      if (snap.exists()) {
        const settings = snap.data() as WebsiteSettings;
        localStorage.setItem('gg_settings', JSON.stringify(settings));
        window.dispatchEvent(new Event('gg_db_update'));
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'settings/global');
    });
  }
}

/**
 * Setup Real-time Listeners for Admin Collections (Requires active Admin session)
 */
export function startAdminSyncListeners(): void {
  // 1. Appointments
  if (!activeListeners['appointments']) {
    activeListeners['appointments'] = onSnapshot(collection(db, 'appointments'), (snap) => {
      const appointments: Appointment[] = [];
      snap.forEach((d) => appointments.push(d.data() as Appointment));
      // Sort appointments by createdAt descending
      appointments.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      localStorage.setItem('gg_appointments', JSON.stringify(appointments));
      window.dispatchEvent(new Event('gg_db_update'));
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'appointments');
    });
  }

  // 2. Notifications
  if (!activeListeners['notifications']) {
    activeListeners['notifications'] = onSnapshot(collection(db, 'notifications'), (snap) => {
      const notifications: Notification[] = [];
      snap.forEach((d) => notifications.push(d.data() as Notification));
      // Sort notifications by createdAt descending
      notifications.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      localStorage.setItem('gg_notifications', JSON.stringify(notifications));
      window.dispatchEvent(new Event('gg_db_update'));
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'notifications');
    });
  }
}

/**
 * Detach admin listeners when signing out
 */
export function stopAdminSyncListeners(): void {
  if (activeListeners['appointments']) {
    activeListeners['appointments']();
    delete activeListeners['appointments'];
  }
  if (activeListeners['notifications']) {
    activeListeners['notifications']();
    delete activeListeners['notifications'];
  }
}

/**
 * Initialize absolute sync manager
 */
export function initFirebaseSync(): void {
  // Validate connectivity first
  validateConnection();

  // Register database mutations sync callback listener to completely decouple data modules
  MockDB.registerSyncListener(async (key, data, prevData) => {
    if (key === 'settings') {
      await dbSaveSettings(data);
      return;
    }

    if (Array.isArray(data)) {
      // 1. Handle Deletions
      if (Array.isArray(prevData)) {
        const newIds = new Set(data.map((item: any) => item.id || item.bookingId));
        const deletedItems = prevData.filter((item: any) => {
          const id = item.id || item.bookingId;
          return id && !newIds.has(id);
        });

        for (const item of deletedItems) {
          const docId = item.id || item.bookingId;
          if (key === 'services') await dbDeleteService(docId);
          else if (key === 'packages') await dbDeletePackage(docId);
          else if (key === 'artists') await dbDeleteArtist(docId);
          else if (key === 'gallery') await dbDeleteGalleryItem(docId);
          else if (key === 'reviews') await dbDeleteReview(docId);
          else if (key === 'offers') await dbDeleteOffer(docId);
          else if (key === 'appointments') await dbDeleteAppointment(docId);
          else if (key === 'notifications') await dbDeleteNotification(docId);
        }
      }

      // 2. Handle Saves (Add/Update)
      for (const item of data) {
        if (key === 'services') await dbSaveService(item);
        else if (key === 'packages') await dbSavePackage(item);
        else if (key === 'artists') await dbSaveArtist(item);
        else if (key === 'gallery') await dbSaveGalleryItem(item);
        else if (key === 'reviews') await dbSaveReview(item);
        else if (key === 'offers') await dbSaveOffer(item);
        else if (key === 'appointments') await dbSaveAppointment(item);
        else if (key === 'notifications') await dbSaveNotification(item);
      }
    }
  });

  // Listen to Auth transitions
  onAuthStateChanged(auth, async (user) => {
    if (user && user.email === ADMIN_EMAIL) {
      console.log('Firebase Admin Session started. Mounting real-time admin sync.');
      // Update session token for Admin views
      sessionStorage.setItem('gg_admin_token', 'authorized');
      window.dispatchEvent(new Event('gg_db_update'));
      
      // Seed first if required
      await seedFirestoreIfNeeded();
      
      // Listen to admin panels
      startAdminSyncListeners();
    } else {
      console.log('Firebase Public Session. Detaching admin sync and keeping public sync active.');
      stopAdminSyncListeners();
    }
  });

  // Start public listeners immediately
  startPublicSyncListeners();
}

/**
 * GOOGLE LOGIN TRIGGER (for admin authentication popups)
 */
export async function signInAdminWithGoogle(): Promise<void> {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user.email !== ADMIN_EMAIL) {
      await signOut(auth);
      sessionStorage.removeItem('gg_admin_token');
      window.dispatchEvent(new Event('gg_db_update'));
      throw new Error(`Unauthorized access. Only ${ADMIN_EMAIL} is approved.`);
    }
  } catch (error: any) {
    console.error('Google Sign-in failed:', error);
    if (error?.code === 'auth/unauthorized-domain') {
      throw new Error(`Firebase Auth Error (auth/unauthorized-domain): This preview domain is not listed under Authorized Domains in your Firebase Console for project 'glowgracev0'. Please add this domain in Firebase Console > Authentication > Settings > Authorized Domains, or sign in using the Admin Passcode (admin / grace2026).`);
    }
    throw error;
  }
}

export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
  sessionStorage.removeItem('gg_admin_token');
  window.dispatchEvent(new Event('gg_db_update'));
}

/**
 * -------------------------------------------------------------
 * FIRESTORE WRITE OPERATIONS REPLICATORS (DIRECT REPLICATION ENGINE)
 * -------------------------------------------------------------
 */

// Services
export async function dbSaveService(service: Service): Promise<void> {
  try {
    const imgUrl = service.image || service.imageUrl || '';
    const payload: Service = {
      ...service,
      image: imgUrl,
      imageUrl: imgUrl,
    };
    await setDoc(doc(db, 'services', service.id), payload, { merge: true });
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `services/${service.id}`);
  }
}

export async function dbDeleteService(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'services', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `services/${id}`);
  }
}

// Packages
export async function dbSavePackage(pkg: Package): Promise<void> {
  try {
    await setDoc(doc(db, 'packages', pkg.id), pkg);
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `packages/${pkg.id}`);
  }
}

export async function dbDeletePackage(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'packages', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `packages/${id}`);
  }
}

// Artists
export async function dbSaveArtist(artist: Artist): Promise<void> {
  try {
    await setDoc(doc(db, 'artists', artist.id), artist);
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `artists/${artist.id}`);
  }
}

export async function dbDeleteArtist(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'artists', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `artists/${id}`);
  }
}

// Gallery Item
export async function dbSaveGalleryItem(item: GalleryItem): Promise<void> {
  try {
    await setDoc(doc(db, 'gallery', item.id), item);
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `gallery/${item.id}`);
  }
}

export async function dbDeleteGalleryItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'gallery', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `gallery/${id}`);
  }
}

// Reviews
export async function dbSaveReview(review: Review): Promise<void> {
  try {
    await setDoc(doc(db, 'reviews', review.id), review);
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `reviews/${review.id}`);
  }
}

export async function dbDeleteReview(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'reviews', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `reviews/${id}`);
  }
}

// Offers
export async function dbSaveOffer(offer: Offer): Promise<void> {
  try {
    await setDoc(doc(db, 'offers', offer.id), offer);
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `offers/${offer.id}`);
  }
}

export async function dbDeleteOffer(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'offers', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `offers/${id}`);
  }
}

// Website Settings
export async function dbSaveSettings(settings: WebsiteSettings): Promise<void> {
  try {
    await setDoc(doc(db, 'settings', 'global'), settings);
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, 'settings/global');
  }
}

// Appointment Bookings
export async function dbSaveAppointment(appt: Appointment): Promise<void> {
  try {
    await setDoc(doc(db, 'appointments', appt.bookingId), appt);
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `appointments/${appt.bookingId}`);
  }
}

export async function dbDeleteAppointment(bookingId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'appointments', bookingId));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `appointments/${bookingId}`);
  }
}

// Notifications
export async function dbSaveNotification(notif: Notification): Promise<void> {
  try {
    await setDoc(doc(db, 'notifications', notif.id), notif);
  } catch (e) {
    handleFirestoreError(e, OperationType.WRITE, `notifications/${notif.id}`);
  }
}

export async function dbDeleteNotification(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'notifications', id));
  } catch (e) {
    handleFirestoreError(e, OperationType.DELETE, `notifications/${id}`);
  }
}

/**
 * Force Overwrites Firestore collections with the Traditional Indian Heritage Theme default presets
 */
export async function forceSeedIndianHeritageTheme(): Promise<void> {
  try {
    console.log('Force seeding Indian Heritage Theme to Firestore...');
    
    // 1. Seed Services
    const sBatch = writeBatch(db);
    DEFAULT_SERVICES.forEach((s) => {
      const img = s.image || s.imageUrl || 'https://images.unsplash.com/photo-1481501940778-c8bb63e376c5?w=800&auto=format&fit=crop&q=80';
      sBatch.set(doc(db, 'services', s.id), {
        ...s,
        image: img,
        imageUrl: img
      });
    });
    await sBatch.commit();

    // 2. Seed Packages
    const pBatch = writeBatch(db);
    DEFAULT_PACKAGES.forEach((p) => {
      pBatch.set(doc(db, 'packages', p.id), p);
    });
    await pBatch.commit();

    // 3. Seed Artists
    const aBatch = writeBatch(db);
    DEFAULT_ARTISTS.forEach((a) => {
      aBatch.set(doc(db, 'artists', a.id), a);
    });
    await aBatch.commit();

    // 4. Seed Gallery
    const gBatch = writeBatch(db);
    DEFAULT_GALLERY.forEach((g) => {
      gBatch.set(doc(db, 'gallery', g.id), g);
    });
    await gBatch.commit();

    // 5. Seed Reviews
    const rBatch = writeBatch(db);
    DEFAULT_REVIEWS.forEach((r) => {
      rBatch.set(doc(db, 'reviews', r.id), r);
    });
    await rBatch.commit();

    console.log('Indian Heritage Theme force seeded to Firestore successfully.');
  } catch (error) {
    console.error('Failed to force seed Indian Heritage Theme to Firestore:', error);
    throw error;
  }
}

/**
 * Ensures the Service object schema in Firestore includes an 'image' field (URL).
 * Scans all documents in the 'services' collection in Firestore, identifies any documents
 * missing the 'image' field, resolves the image URL from 'image' or 'imageUrl', and updates
 * the Firestore document so that the schema includes 'image'.
 */
export async function ensureServiceSchemaIncludesImage(): Promise<{
  updatedCount: number;
  totalCount: number;
  services: { id: string; name: string; image: string }[];
}> {
  try {
    console.log('Auditing Firestore services schema for "image" field...');
    const servicesRef = collection(db, 'services');
    const snap = await getDocs(servicesRef);
    let updatedCount = 0;
    const servicesSummary: { id: string; name: string; image: string }[] = [];

    if (snap.empty) {
      // Seed from local MockDB ensuring image field is present on every service
      const defaults = MockDB.getServices();
      const batch = writeBatch(db);
      defaults.forEach((s) => {
        const resolved = s.image || s.imageUrl || 'https://images.unsplash.com/photo-1481501940778-c8bb63e376c5?w=800&auto=format&fit=crop&q=80';
        batch.set(doc(db, 'services', s.id), {
          ...s,
          image: resolved,
          imageUrl: resolved,
        }, { merge: true });
        servicesSummary.push({ id: s.id, name: s.name, image: resolved });
        updatedCount++;
      });
      await batch.commit();
      console.log(`Initialized and verified 'image' field on ${updatedCount} services in Firestore.`);
      return { updatedCount, totalCount: defaults.length, services: servicesSummary };
    }

    const batch = writeBatch(db);
    snap.forEach((docSnap) => {
      const data = docSnap.data() as Service;
      const resolved = data.image || data.imageUrl || 'https://images.unsplash.com/photo-1481501940778-c8bb63e376c5?w=800&auto=format&fit=crop&q=80';
      servicesSummary.push({ id: docSnap.id, name: data.name || docSnap.id, image: resolved });

      // If 'image' is missing, empty, or differs from resolved URL, or 'imageUrl' is missing
      if (!data.image || data.image !== resolved || !data.imageUrl) {
        batch.set(docSnap.ref, {
          image: resolved,
          imageUrl: resolved,
        }, { merge: true });
        updatedCount++;
      }
    });

    if (updatedCount > 0) {
      await batch.commit();
    }

    console.log(`ensureServiceSchemaIncludesImage completed. Updated ${updatedCount} of ${snap.size} service documents in Firestore.`);
    return { updatedCount, totalCount: snap.size, services: servicesSummary };
  } catch (error) {
    console.error('Failed to ensure Service schema includes image field in Firestore:', error);
    throw error;
  }
}

/**
 * Full Website Synchronization Engine for Admin Panel
 * Synchronizes all website modules (Services with 'image' field URL, Packages, Artists, Gallery, Reviews, Offers, Website Settings)
 * directly to Firebase Firestore, ensuring full real-time cloud persistence across the entire website.
 */
export async function fullWebsiteSyncToFirestore(): Promise<{
  success: boolean;
  servicesCount: number;
  packagesCount: number;
  artistsCount: number;
  galleryCount: number;
  reviewsCount: number;
  offersCount: number;
  settingsSynced: boolean;
  timestamp: string;
}> {
  try {
    console.log('Initiating Full Website Sync to Firestore...');
    
    // 1. Sync Services with enforced 'image' (URL) and 'imageUrl'
    const services = MockDB.getServices();
    const sBatch = writeBatch(db);
    services.forEach((s) => {
      const imgUrl = s.image || s.imageUrl || 'https://images.unsplash.com/photo-1481501940778-c8bb63e376c5?w=800&auto=format&fit=crop&q=80';
      sBatch.set(doc(db, 'services', s.id), {
        ...s,
        image: imgUrl,
        imageUrl: imgUrl
      }, { merge: true });
    });
    await sBatch.commit();

    // 2. Sync Packages
    const packages = MockDB.getPackages();
    const pBatch = writeBatch(db);
    packages.forEach((p) => {
      pBatch.set(doc(db, 'packages', p.id), p, { merge: true });
    });
    await pBatch.commit();

    // 3. Sync Artists
    const artists = MockDB.getArtists();
    const aBatch = writeBatch(db);
    artists.forEach((a) => {
      aBatch.set(doc(db, 'artists', a.id), a, { merge: true });
    });
    await aBatch.commit();

    // 4. Sync Gallery
    const gallery = MockDB.getGallery();
    const gBatch = writeBatch(db);
    gallery.forEach((g) => {
      gBatch.set(doc(db, 'gallery', g.id), g, { merge: true });
    });
    await gBatch.commit();

    // 5. Sync Reviews
    const reviews = MockDB.getReviews();
    const rBatch = writeBatch(db);
    reviews.forEach((r) => {
      rBatch.set(doc(db, 'reviews', r.id), r, { merge: true });
    });
    await rBatch.commit();

    // 6. Sync Offers
    const offers = MockDB.getOffers();
    const oBatch = writeBatch(db);
    offers.forEach((o) => {
      oBatch.set(doc(db, 'offers', o.id), o, { merge: true });
    });
    await oBatch.commit();

    // 7. Sync Global Website Settings
    const settings = MockDB.getSettings();
    await setDoc(doc(db, 'settings', 'global'), settings, { merge: true });

    // 8. Run schema validation on services to guarantee 'image' field on all documents
    await ensureServiceSchemaIncludesImage();

    // Dispatch update event so any active local listeners refresh
    window.dispatchEvent(new Event('gg_db_update'));

    const result = {
      success: true,
      servicesCount: services.length,
      packagesCount: packages.length,
      artistsCount: artists.length,
      galleryCount: gallery.length,
      reviewsCount: reviews.length,
      offersCount: offers.length,
      settingsSynced: true,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    console.log('Full Website Sync to Firestore completed successfully:', result);
    return result;
  } catch (error) {
    console.error('Full Website Sync to Firestore failed:', error);
    throw error;
  }
}
