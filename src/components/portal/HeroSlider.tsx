import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BannerSlide } from './types';

interface HeroSliderProps {
  slides: BannerSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % slides.length);
    }, 4500); // Transitions every 4.5 seconds
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  return (
    <div
      className="w-full h-full relative rounded-2xl overflow-hidden shadow-md group border border-gray-100 bg-zinc-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="hero-slider-panel"
    >
      {/* Slides transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0.1, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.1, scale: 0.98 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Main Background Image - with referrerPolicy */}
          <img
            src={slides[currentIdx].image}
            alt={slides[currentIdx].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none transform transition-transform duration-10000 ease-linear scale-105 group-hover:scale-100"
          />

          {/* Vignette bottom-shadow gradient overlay to ensure text visibility */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/35 to-transparent"></div>

          {/* Overlay Text Content */}
          <div className="absolute bottom-12 left-10 text-white z-10 select-none pointer-events-none max-w-lg">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-sans text-xs tracking-widest text-gray-200 uppercase font-medium mb-2.5 flex items-center"
            >
              <span className="w-4 h-[1px] bg-white opacity-60 mr-2"></span>
              {slides[currentIdx].subtitle}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-4xl font-extrabold tracking-widest drop-shadow-xl font-sans"
              style={{
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.45)',
                fontFamily: '"Noto Sans SC", system-ui, sans-serif'
              }}
            >
              {slides[currentIdx].title}
            </motion.h1>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Slide Selector Dots (Bottom Center Left) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20 bg-black/15 backdrop-blur-[2px] py-1 px-2.5 rounded-full" id="slider-bullets">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIdx;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIdx(idx)}
              className="focus:outline-none cursor-pointer transition-all duration-300"
              aria-label={`Slide ${idx + 1}`}
            >
              {isActive ? (
                // Active red pill
                <span className="block h-2 w-7 bg-brand-red rounded-full shadow-sm animate-pulse-subtle"></span>
              ) : (
                // Inactive white circle dot
                <span className="block h-2 w-2 bg-white/70 hover:bg-white rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Manual navigational tags */}
      <button
        onClick={() => setCurrentIdx((currentIdx - 1 + slides.length) % slides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/25 hover:bg-black/45 text-white/80 hover:text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrentIdx((currentIdx + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/25 hover:bg-black/45 text-white/80 hover:text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
}
