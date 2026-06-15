/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  highlight: string;
  desc: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: '一起同行',
    highlight: '一起共赢',
    desc: '广州银行致力于与实体伙伴携手共创湾区繁荣，开启金融零距离、普惠全周期的高质量发展篇章。',
    image: '/images/gz_bank_banner_1781424849050.jpg',
  },
  {
    id: 2,
    title: '数字广银',
    highlight: '智享未来',
    desc: '全面打造高并发、多因子智能风控柜面系统，实现业务线上全闭环，让金融服务随手可及、极速触达。',
    image: '/images/gz_bank_tech_slide_1781424897746.jpg',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentRef = React.useRef(current);
  currentRef.current = current;

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentRef.current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 lg:px-8 py-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[240px] md:h-[300px] lg:h-[320px] w-full rounded-2xl overflow-hidden border border-red-50/50 shadow-xs bg-slate-800">

        {/* Animated Carousel Slide Background & Contents container */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* 背景图片 */}
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 遮罩层 — 底部深、顶部浅，确保文字可读 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/65 via-black/25 to-black/10"></div>

            {/* Slide info content */}
            <div className="absolute inset-0 z-10 flex items-center px-8 md:px-16 lg:px-24">
              <div className="max-w-2xl text-left">
                {/* Large styled Tagline */}
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight md:tracking-wide text-white flex flex-wrap items-baseline gap-x-3.5 gap-y-1"
                  style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                >
                  <span className="font-sans leading-tight">
                    {slides[current].title}
                  </span>
                  <span className="font-sans leading-tight drop-shadow-xs flex items-center text-amber-400">
                    {slides[current].highlight}
                    <span className="text-[20px] font-semibold ml-1.5 mb-1 select-none">✦</span>
                  </span>
                </div>

                {/* Mission Description sentence */}
                <p className="text-xs md:text-sm text-white/85 font-sans mt-3 leading-relaxed max-w-lg hidden sm:block"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                >
                  {slides[current].desc}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center border border-white/15 cursor-pointer transition-all hover:scale-105 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center border border-white/15 cursor-pointer transition-all hover:scale-105 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Sliding Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => handleDotClick(idx)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                idx === current ? 'w-6 bg-red-500' : 'w-2 bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
