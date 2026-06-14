/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  mission: string;
  title: string;
  highlight: string;
  desc: string;
  bgGradient: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  textColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    mission: '企业使命',
    title: '一起同行',
    highlight: '一起共赢',
    desc: '广州银行致力于与实体伙伴携手共创湾区繁荣，开启金融零距离、普惠全周期的高质量发展篇章。',
    bgGradient: 'from-red-50/90 via-white to-red-100/60',
    accentColor: 'text-gzred',
    badgeBg: 'bg-gzred/5',
    badgeBorder: 'border-gzred/20',
    badgeText: 'text-gzred',
    textColor: 'text-red-500/10'
  },
  {
    id: 2,
    mission: '科技战略',
    title: '数字广银',
    highlight: '智享未来',
    desc: '全面打造高并发、多因子智能风控柜面系统，实现业务线上全闭环，让金融服务随手可及、极速触达。',
    bgGradient: 'from-blue-50/90 via-white to-cyan-100/60',
    accentColor: 'text-blue-600',
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-blue-200/50',
    badgeText: 'text-blue-600',
    textColor: 'text-blue-500/10'
  },
  {
    id: 3,
    mission: '发展愿景',
    title: '红动大湾',
    highlight: '绿色领航',
    desc: '践行ESG绿色金融理念，创新碳抵押信贷工具，全力支持广东省制造强省和双碳示范项目低息授信。',
    bgGradient: 'from-emerald-50/90 via-white to-teal-100/60',
    accentColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200/50',
    badgeText: 'text-emerald-600',
    textColor: 'text-emerald-500/10'
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);

  // 存储 current 到 ref，供定时器使用（避免 effect 依赖 current 导致频繁重建）
  const currentRef = React.useRef(current);
  currentRef.current = current;

  // Auto-slide effect（只依赖 isHovered，不再因 current 变化而重建计时器）
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
      <div className="relative h-[240px] md:h-[300px] lg:h-[320px] w-full rounded-2xl overflow-hidden border border-red-50/50 shadow-xs bg-slate-50">
        
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
            className={`absolute inset-0 w-full h-full flex items-center px-8 md:px-16 lg:px-24 bg-gradient-to-r ${slides[current].bgGradient}`}
          >
            {/* Elegant vector/background details that move with the slide */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
              {/* Modern elegant abstract ripples */}
              <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border border-slate-900/5 opacity-10" />
              <div className="absolute -right-32 -bottom-32 w-[420px] h-[420px] rounded-full border-2 border-slate-900/5 opacity-5" />
              
              {/* Dynamic decorative backdrop circles with slide-specific shades */}
              <div className="absolute top-[15%] right-[20%] w-3.5 h-3.5 rounded-full bg-amber-400/20 blur-[1px] animate-pulse" />
              <div className="absolute bottom-[25%] right-[35%] w-2 h-2 rounded-full bg-slate-400/30" />
              
              {/* Stylish numeric backplate */}
              <div className={`absolute right-[8%] bottom-[5%] font-mono text-[140px] md:text-[200px] ${slides[current].textColor} leading-none font-bold select-none`}>
                0{slides[current].id}
              </div>
            </div>

            {/* Slide info content */}
            <div className="relative z-10 max-w-2xl text-left">
              {/* Mission Label Indicator */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border mb-3.5 ${slides[current].badgeBg} ${slides[current].badgeBorder}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse bg-current ${slides[current].badgeText}`}></span>
                <span className={`text-[11px] font-bold tracking-widest uppercase ${slides[current].badgeText}`}>{slides[current].mission}</span>
              </div>

              {/* Large styled Tagline matching exactly the typography feeling */}
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight md:tracking-wide text-slate-800 flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
                <span className="font-sans leading-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {slides[current].title}
                </span>
                <span className={`font-sans leading-tight drop-shadow-xs flex items-center ${slides[current].accentColor}`}>
                  {slides[current].highlight}
                  <span className="text-[20px] text-amber-500 font-semibold ml-1.5 mb-1 select-none">✦</span>
                </span>
              </div>

              {/* Mission Description sentence */}
              <p className="text-xs md:text-sm text-slate-500 font-sans mt-3 leading-relaxed max-w-lg hidden sm:block">
                {slides[current].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-gzred flex items-center justify-center border border-slate-100 shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-gzred flex items-center justify-center border border-slate-100 shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
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
                idx === current ? 'w-6 bg-gzred' : 'w-2 bg-slate-300/85 hover:bg-slate-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
