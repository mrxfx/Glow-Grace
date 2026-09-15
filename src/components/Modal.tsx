import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-[#24191B]/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Dialog container */}
      <div className="relative bg-[#FFF9F7] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#F5DDE1] animate-scale-up z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F5DDE1] shrink-0">
          <h3 className="font-serif text-lg font-bold text-[#24191B]">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#24191B]/50 hover:text-[#B85C72] hover:bg-[#F5DDE1]/30 transition-colors cursor-pointer focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-grow">{children}</div>
      </div>
    </div>
  );
};

// Lightbox for Gallery Image Viewer
interface LightboxProps {
  images: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onBook?: (serviceName?: string) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
  onBook
}) => {
  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
        if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (currentIndex === null || !images[currentIndex]) return null;

  const activeImage = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(prevIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(nextIndex);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#1F080E]/95 backdrop-blur-md text-white p-4">
      {/* Backdrop click close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Header controls */}
      <div className="relative z-10 flex items-center justify-between p-4 max-w-7xl mx-auto w-full">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] block font-sans font-bold">
              Glow & Grace Portfolio
            </span>
            <span className="text-xs text-white/50 font-sans">
              ({currentIndex + 1} of {images.length})
            </span>
          </div>
          <h4 className="font-serif text-lg md:text-xl font-bold text-white mt-0.5">{activeImage.title}</h4>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer focus:outline-none"
          aria-label="Close viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main viewer block */}
      <div className="relative z-10 flex items-center justify-between max-w-6xl mx-auto w-full flex-grow my-2">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="p-3.5 rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/80 hover:scale-105 transition-all cursor-pointer shrink-0 mr-4 focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dynamic Image */}
        <div className="relative flex items-center justify-center max-h-[65vh] md:max-h-[70vh] w-full overflow-hidden rounded-2xl">
          <img
            src={activeImage.imageUrl}
            alt={activeImage.alt}
            className="object-contain max-h-[65vh] md:max-h-[70vh] rounded-2xl shadow-2xl animate-fade-in"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="p-3.5 rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/80 hover:scale-105 transition-all cursor-pointer shrink-0 ml-4 focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Footer Details */}
      <div className="relative z-10 p-4 max-w-2xl mx-auto w-full text-center mb-2 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="bg-[#B85C72]/30 text-xs px-3.5 py-1 rounded-full text-[#FAD2E1] font-semibold font-sans uppercase tracking-widest border border-[#B85C72]/40">
            {activeImage.category}
          </span>
          {activeImage.likes && (
            <span className="text-xs text-rose-300 font-sans flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              ❤️ {activeImage.likes} Likes
            </span>
          )}
        </div>
        
        <p className="text-white/80 text-sm font-sans leading-relaxed">{activeImage.description}</p>
        
        {onBook && (
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onBook(activeImage.category === 'Bridal' ? 'Bridal Makeup' : activeImage.title);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#B85C72] hover:bg-[#802339] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:scale-102 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Book This Look / Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Vertical Reel Player Modal (9:16 aspect ratio viewer)
interface ReelModalProps {
  reel: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBook?: (lookName: string) => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({ reel, isOpen, onClose, onBook }) => {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isLiked, setIsLiked] = React.useState(false);
  const [progress, setProgress] = React.useState(25);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 300);
      return () => {
        document.body.style.overflow = 'unset';
        clearInterval(timer);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen || !reel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      {/* Reel Phone Container (9:16 aspect ratio) */}
      <div className="relative w-full max-w-[360px] h-[85vh] max-h-[720px] rounded-[36px] overflow-hidden shadow-2xl border-2 border-white/20 bg-stone-900 flex flex-col justify-between z-10 select-none">
        
        {/* Background Image / Reel Frame */}
        <img
          src={reel.imageUrl}
          alt={reel.title}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

        {/* Top bar: progress & close */}
        <div className="relative z-10 p-4 space-y-3">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#B85C72] flex items-center justify-center font-bold text-xs border border-white/40">
                GG
              </div>
              <div>
                <span className="text-xs font-bold font-serif block">Glow & Grace Parlour</span>
                <span className="text-[10px] text-white/70 block font-sans">Agartala, Tripura</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center click to toggle play/pause */}
        <div
          className="relative z-10 flex-grow flex items-center justify-center cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying && (
            <div className="w-16 h-16 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs shadow-xl animate-scale-up">
              ▶
            </div>
          )}
        </div>

        {/* Right side engagement buttons */}
        <div className="absolute right-4 bottom-24 z-10 flex flex-col items-center gap-4 text-white">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center cursor-pointer transition-transform active:scale-125"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md ${isLiked ? 'bg-rose-600 text-white' : 'bg-black/40 text-white'}`}>
              ❤️
            </div>
            <span className="text-[11px] font-sans font-bold mt-1 drop-shadow-md">
              {(reel.likes || 450) + (isLiked ? 1 : 0)}
            </span>
          </button>

          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md">
              👁️
            </div>
            <span className="text-[11px] font-sans font-bold mt-1 drop-shadow-md">
              {reel.viewCount || '15.4K'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md">
              ✨
            </div>
            <span className="text-[10px] font-sans text-[#D4AF37] font-bold mt-1">Reel</span>
          </div>
        </div>

        {/* Bottom details & action */}
        <div className="relative z-10 p-5 space-y-3">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-[#B85C72] text-white text-[10px] rounded-full font-bold uppercase tracking-wider mb-1">
              {reel.category}
            </span>
            <h3 className="text-white font-serif font-bold text-base leading-tight">
              {reel.title}
            </h3>
            <p className="text-white/80 text-xs font-sans mt-1 line-clamp-2">
              {reel.description}
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                onClose();
                if (onBook) onBook(reel.title);
              }}
              className="flex-1 py-2.5 bg-[#D4AF37] hover:bg-[#E5C494] text-[#3B0F19] text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md text-center"
            >
              Book This Look ✨
            </button>
            <a
              href="https://api.whatsapp.com/send?phone=916033271400&text=Hi%20Glow%20and%20Grace,%20I%20saw%20your%20reel%20and%20want%20to%20know%20more!"
              target="_blank"
              rel="noreferrer noopener"
              className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center justify-center text-xs font-bold cursor-pointer"
            >
              💬
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
