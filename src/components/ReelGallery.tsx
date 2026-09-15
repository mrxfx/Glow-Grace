import React, { useState } from 'react';
import { Play, Eye, Heart, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types';
import { ReelModal } from './Modal';

interface ReelGalleryProps {
  reels: GalleryItem[];
  onBook?: (lookName: string) => void;
}

export const ReelGallery: React.FC<ReelGalleryProps> = ({ reels, onBook }) => {
  const [selectedReel, setSelectedReel] = useState<GalleryItem | null>(null);

  // If no reels provided or empty, show 4 default authentic reel clips
  const displayReels = reels.length > 0 ? reels : [
    {
      id: 'reel-1',
      title: 'Royal Bengali Bride Transformation',
      category: 'Bridal HD',
      imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
      alt: 'Royal Bengali Bride video reel',
      description: 'Chandan forehead art & Mukut placement process. Pure traditional magic!',
      mediaType: 'video' as const,
      aspectRatio: '9:16' as const,
      likes: 642,
      viewCount: '28.4K',
      duration: '2:15',
    },
    {
      id: 'reel-2',
      title: 'HD Airbrush Makeup Glow Process',
      category: 'Makeup',
      imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80',
      alt: 'Airbrush base step by step reel',
      description: 'Zero cakeyness, flawless texture blending with international cosmetics.',
      mediaType: 'video' as const,
      aspectRatio: '9:16' as const,
      likes: 418,
      viewCount: '19.2K',
      duration: '1:40',
    },
    {
      id: 'reel-3',
      title: 'Traditional Floral Gajra Bun Art',
      category: 'Hair',
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      alt: 'Floral hairstyle reel',
      description: 'Fresh jasmine stringing and textured wedding updo technique.',
      mediaType: 'video' as const,
      aspectRatio: '9:16' as const,
      likes: 812,
      viewCount: '34.1K',
      duration: '0:58',
    },
    {
      id: 'reel-4',
      title: 'Banarasi Saree Draping Masterclass',
      category: 'Draping',
      imageUrl: 'https://images.unsplash.com/photo-1615396899839-c99c121888b0?w=800&auto=format&fit=crop&q=80',
      alt: 'Saree pleating video reel',
      description: 'Sharp pleats, comfortable pinning and zero-slip pallu arrangement.',
      mediaType: 'video' as const,
      aspectRatio: '9:16' as const,
      likes: 529,
      viewCount: '22.8K',
      duration: '1:12',
    },
  ];

  return (
    <section id="beauty-reels" className="max-w-7xl mx-auto px-6 space-y-10">
      {/* Reel Modal */}
      <ReelModal
        reel={selectedReel}
        isOpen={selectedReel !== null}
        onClose={() => setSelectedReel(null)}
        onBook={onBook}
      />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF0F2] rounded-full text-[10px] font-sans font-extrabold tracking-widest text-[#B85C72]">
          🎬 SHORT REELS & BTS
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3B0F19]">
          Beauty Reels 🎬
        </h2>
        <div className="w-16 h-0.5 bg-[#B85C72] mx-auto opacity-40 rounded-full" />
        <p className="text-sm text-[#3B0F19]/70 font-sans">
          Watch behind-the-scenes transformations, bridal prep & salon moments in real action!
        </p>
      </div>

      {/* 4 Vertical Reels Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayReels.slice(0, 4).map((reel) => (
          <div
            key={reel.id}
            onClick={() => setSelectedReel(reel)}
            className="group relative aspect-[9/16] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-[#F5DDE1] bg-stone-900 flex flex-col justify-between p-4"
          >
            {/* Reel Frame Image */}
            <img
              src={reel.imageUrl}
              alt={reel.alt || reel.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 group-hover:from-black/90 transition-all duration-300" />

            {/* Top Bar inside Card */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                {reel.category}
              </span>
              <span className="bg-[#B85C72] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                {reel.duration || '1:15'}
              </span>
            </div>

            {/* Center Play Button Overlay */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-[#B85C72] group-hover:scale-110 text-white flex items-center justify-center transition-all duration-300 shadow-xl border border-white/40">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
            </div>

            {/* Bottom Info inside Card */}
            <div className="relative z-10 space-y-1.5 text-white">
              <h4 className="font-serif font-bold text-sm leading-tight line-clamp-2 drop-shadow-sm group-hover:text-[#FAD2E1] transition-colors">
                {reel.title}
              </h4>
              <div className="flex items-center justify-between text-[11px] text-white/80 font-sans pt-1">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {reel.viewCount || '18K'}
                </span>
                <span className="flex items-center gap-1 text-rose-300">
                  <Heart className="w-3 h-3 fill-rose-300" />
                  {reel.likes || '400'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
