import React from 'react';

export default function StudyBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-red-700 via-red-600 to-amber-600 py-6 select-none relative overflow-hidden border-y border-amber-500/20 shadow-sm my-6">
      
      {/* Elegant vector/background details characteristic of official bank portal themes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full border border-yellow-300 pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full border-2 border-yellow-400 pointer-events-none" />
        
        {/* Wave decorative patterns */}
        <svg className="absolute bottom-0 right-0 w-[45%] h-full text-yellow-300 opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 C30,40 70,60 100,100 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Centered Slogan */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-lg sm:text-xl md:text-2xl font-black tracking-widest text-[#FFFEE6] font-sans drop-shadow-md">
          学习贯彻习近平新时代中国特色社会主义思想主题教育
        </h3>
      </div>

    </div>
  );
}
