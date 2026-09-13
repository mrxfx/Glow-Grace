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
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex]);

  if (currentIndex === null) return null;

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
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#24191B]/95 text-white p-4">
      {/* Backdrop click close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Header controls */}
      <div className="relative z-10 flex items-center justify-between p-4 max-w-7xl mx-auto w-full">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#D4A373] block font-sans">
            Glow & Grace Portfolio
          </span>
          <h4 className="font-serif text-lg font-bold">{activeImage.title}</h4>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer focus:outline-none"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main viewer block */}
      <div className="relative z-10 flex items-center justify-between max-w-6xl mx-auto w-full flex-grow my-4">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-colors cursor-pointer shrink-0 mr-4 focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dynamic Image */}
        <div className="relative flex items-center justify-center max-h-[70vh] w-full overflow-hidden rounded-xl">
          <img
            src={activeImage.imageUrl}
            alt={activeImage.alt}
            className="object-contain max-h-[70vh] rounded-xl shadow-2xl animate-fade-in"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-colors cursor-pointer shrink-0 ml-4 focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Footer Details */}
      <div className="relative z-10 p-4 max-w-3xl mx-auto w-full text-center mb-4">
        <p className="text-white/70 text-sm font-sans mb-3">{activeImage.description}</p>
        <span className="inline-block bg-white/10 text-xs px-3 py-1 rounded-full text-[#D4A373] font-medium font-sans uppercase tracking-widest border border-white/5">
          {activeImage.category}
        </span>
      </div>
    </div>
  );
};
