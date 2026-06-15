import React, { useState, useEffect } from 'react';
import { BannerSlide } from './types';

interface HeroSliderProps {
  slides: BannerSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIdx((prevIdx) => (prevIdx + 1) % slides.length);
        setFadeIn(true);
      }, 400);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  if (!slides.length) {
    return (
      <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-zinc-800 flex items-center justify-center">
        <p className="text-gray-400 text-sm">暂无轮播内容</p>
      </div>
    );
  }

  const currentSlide = slides[currentIdx];

  return (
    <div
      className="w-full h-full relative rounded-2xl overflow-hidden shadow-md group border border-gray-100 bg-zinc-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="hero-slider-panel"
    >
      {/* 背景图片 — 纯 img 标签，不用任何动画库 */}
      <img
        src={currentSlide.image}
        alt={currentSlide.title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: fadeIn ? 1 : 0 }}
        onError={(e) => {
          console.error('HeroSlider image failed to load:', currentSlide.image);
          // Fallback: show a gradient background
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* 底部渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/15 to-transparent pointer-events-none"></div>

      {/* 文字内容 */}
      <div className="absolute bottom-12 left-10 text-white z-10 select-none pointer-events-none max-w-lg">
        <p
          className="font-sans text-xs tracking-widest text-white font-semibold mb-2.5 flex items-center drop-shadow-md transition-all duration-500"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)', opacity: fadeIn ? 0.95 : 0, transform: fadeIn ? 'translateY(0)' : 'translateY(10px)' }}
        >
          <span className="w-4 h-[1px] bg-white opacity-80 mr-2"></span>
          {currentSlide.subtitle}
        </p>
        <h1
          className="text-4xl font-extrabold tracking-widest drop-shadow-xl font-sans transition-all duration-500"
          style={{
            textShadow: '0 4px 16px rgba(0, 0, 0, 0.7)',
            fontFamily: '"Noto Sans SC", system-ui, sans-serif',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(15px)',
          }}
        >
          {currentSlide.title}
        </h1>
      </div>

      {/* 指示器圆点 */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20 bg-black/15 backdrop-blur-[2px] py-1 px-2.5 rounded-full">
        {slides.map((_slide, idx) => (
          <button
            key={idx}
            onClick={() => {
              setFadeIn(false);
              setTimeout(() => {
                setCurrentIdx(idx);
                setFadeIn(true);
              }, 400);
            }}
            className="focus:outline-none cursor-pointer transition-all duration-300"
            aria-label={`Slide ${idx + 1}`}
          >
            {idx === currentIdx ? (
              <span className="block h-2 w-7 bg-red-500 rounded-full shadow-sm"></span>
            ) : (
              <span className="block h-2 w-2 bg-white/70 hover:bg-white rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* 左右箭头 */}
      <button
        onClick={() => {
          setFadeIn(false);
          setTimeout(() => {
            setCurrentIdx((currentIdx - 1 + slides.length) % slides.length);
            setFadeIn(true);
          }, 400);
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/25 hover:bg-black/45 text-white/80 hover:text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
        aria-label="上一张"
      >
        ‹
      </button>
      <button
        onClick={() => {
          setFadeIn(false);
          setTimeout(() => {
            setCurrentIdx((currentIdx + 1) % slides.length);
            setFadeIn(true);
          }, 400);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/25 hover:bg-black/45 text-white/80 hover:text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
        aria-label="下一张"
      >
        ›
      </button>
    </div>
  );
}
