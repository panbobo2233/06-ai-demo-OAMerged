/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';

interface SpecialZonesProps {
  onOpenModal: (title: string, category: string, body: string, stamp?: string) => void;
}

const zones = [
  {
    id: 'zone-1',
    title: '网点直通车',
    subtitle: '服务网点 · 直达一线',
    bg: 'bg-gradient-to-br from-red-50/90 to-rose-100/40 border border-red-100/20',
    titleColor: 'text-red-650',
    btnBorder: 'border-red-200/50',
    btnText: 'text-red-650 hover:bg-red-600 hover:text-white',
    desc: '广州银行智能网点直通车服务：一键查阅、预约行内业务网点排号，实时分流。本系统支持对全省数十个大厅大容量业务进行智能化精准引导及零延时行政通道派发。',
    tag: '智能柜面'
  },
  {
    id: 'zone-2',
    title: '制度助手',
    subtitle: '制度查询 · 一键直达',
    bg: 'bg-gradient-to-br from-blue-50/90 to-indigo-100/45 border border-blue-100/20',
    titleColor: 'text-blue-800',
    btnBorder: 'border-blue-200/50',
    btnText: 'text-blue-800 hover:bg-blue-700 hover:text-white',
    desc: '全行行政制度、办事指南、差旅经费报销细则及核心合规说明一站式全文索引数据库。内嵌高精度业务条线搜索引擎，为全行干部职工提供秒级检索。',
    tag: '条线规章'
  },
  {
    id: 'zone-3',
    title: '广银清风',
    subtitle: '清风护航 · 廉洁从政',
    bg: 'bg-gradient-to-br from-emerald-50/90 to-green-100/40 border border-emerald-100/20',
    titleColor: 'text-emerald-800',
    btnBorder: 'border-emerald-200/50',
    btnText: 'text-emerald-800 hover:bg-emerald-600 hover:text-white',
    desc: '廉洁金融文化阵地与风控底线大讲堂。提供党风廉政自律通报、清廉广银风向标、廉政教育微课堂、不合规信访举报安全专属信箱等一揽子服务。',
    tag: '廉政宣传'
  },
  {
    id: 'zone-4',
    title: '合规专栏',
    subtitle: '合规为本 · 稳健前行',
    bg: 'bg-gradient-to-br from-teal-50/90 to-emerald-100/30 border border-teal-100/20',
    titleColor: 'text-teal-800',
    btnBorder: 'border-teal-200/50',
    btnText: 'text-teal-800 hover:bg-teal-600 hover:text-white',
    desc: '反洗钱、反诈及行内日常账目穿透性自查、高风险案例通报、合规知识比武互动专题栏目。定期推送自查合规考试通告及考纲，夯实审慎根基。',
    tag: '内防风险'
  },
  {
    id: 'zone-5',
    title: '党政风采',
    subtitle: '党建引领 · 先锋风采',
    bg: 'bg-gradient-to-br from-rose-50/95 to-amber-50/20 border border-rose-100/20',
    titleColor: 'text-rose-700',
    btnBorder: 'border-rose-200/50',
    btnText: 'text-rose-700 hover:bg-rose-600 hover:text-white',
    desc: '聚焦本行基层党组织及先锋职工模范的评优事迹、最新党建学习任务。汇编总行党委对二十大战略部署落地转型的实践成果展厅。',
    tag: '党建堡垒'
  }
];

export default function SpecialZones({ onOpenModal }: SpecialZonesProps) {
  const handleClick = (zone: typeof zones[number]) => {
    onOpenModal(
      zone.title,
      `${zone.tag} • 特色专区`,
      zone.desc,
      '总行融媒体及综合保障中心'
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 text-left mt-8">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4.5">
        <div className="flex items-center gap-2">
          <div className="w-1 bg-gzred h-4.5 rounded-full"></div>
          <h3 className="text-sm font-bold text-slate-800 tracking-wider font-sans">特色专区</h3>
        </div>
        <button 
          onClick={() => onOpenModal('特色专区综合大厅', '特色服务', '广州银行专门打造的综合业务特色模块专区：包含网点直通车预约、制度助手政策一键直查、广银清风廉政微讲堂、合规风控答题考核、以及党政先锋模范风采展播。')}
          className="text-[11px] text-slate-400 hover:text-gzred transition-all cursor-pointer"
        >
          更多专区 &gt;&gt;
        </button>
      </div>

      {/* 5 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5">
        {zones.map((zone, index) => (
          <div
            key={zone.id}
            onClick={() => handleClick(zone)}
            className={`group relative overflow-hidden rounded-xl p-4.5 min-h-[125px] flex flex-col justify-between transition-all hover:shadow-sm cursor-pointer select-none active:scale-98 ${zone.bg}`}
          >
            {/* Vector Graphics / Imagery based on Zone ID */}
            {zone.id === 'zone-1' && (
              <div className="absolute right-0 bottom-0 w-[44%] h-[72%] select-none pointer-events-none opacity-95 group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80" 
                  alt="High speed train"
                  className="w-full h-full object-cover object-left-bottom mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {zone.id === 'zone-2' && (
              <div className="absolute right-2 bottom-3 w-[40%] h-[55%] opacity-40 group-hover:translate-x-1.5 transition-transform duration-500 select-none pointer-events-none text-blue-400">
                <svg viewBox="0 0 100 60" className="w-full h-full fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M10,12 C30,12 40,2 60,2 C80,2 90,12 100,12" />
                  <path d="M0,25 C25,25 35,15 65,15 C85,15 90,25 100,25" strokeWidth="3" opacity="0.8" />
                  <path d="M20,38 C35,38 45,30 70,30 C85,30 90,38 100,38" opacity="0.6" />
                  <path d="M5,50 C20,50 30,42 55,42 C75,42 85,50 95,50" strokeWidth="1.5" opacity="0.4" />
                </svg>
              </div>
            )}

            {zone.id === 'zone-3' && (
              <div className="absolute right-1 bottom-0 w-[36%] h-[82%] opacity-85 group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none text-emerald-600/80">
                <svg viewBox="0 0 80 120" className="w-full h-full fill-current">
                  {/* Stem segments */}
                  <rect x="52" y="10" width="3" height="25" rx="1" />
                  <rect x="51" y="37" width="3" height="28" rx="1" />
                  <rect x="50" y="67" width="3" height="30" rx="1" />
                  <rect x="49" y="99" width="3" height="21" rx="1" />
                  <rect x="65" y="25" width="2" height="20" rx="1" />
                  <rect x="64" y="47" width="2" height="25" rx="1" />
                  <rect x="63" y="74" width="2" height="25" rx="1" />
                  {/* Leaves */}
                  <path d="M51 37 C42 30, 30 32, 22 36 C30 38, 42 38, 51 37 Z" />
                  <path d="M50 67 C38 60, 24 64, 15 72 C25 72, 38 72, 50 67 Z" />
                  <path d="M49 99 C39 90, 25 96, 18 105 C28 104, 38 102, 49 99 Z" />
                  <path d="M64 47 C72 40, 82 42, 90 46 C82 48, 72 48, 64 47 Z" />
                  <path d="M63 74 C71 67, 81 70, 89 75 C81 77, 71 77, 63 74 Z" />
                </svg>
              </div>
            )}

            {zone.id === 'zone-4' && (
              <div className="absolute right-3.5 bottom-3.5 w-[33%] h-[55%] opacity-85 group-hover:scale-108 transition-transform duration-500 select-none pointer-events-none text-teal-600">
                <svg viewBox="0 0 64 64" className="w-full h-full fill-current">
                  <path d="M32 4 L54 10 C54 30, 48 48, 32 58 C16 48, 10 30, 10 10 L32 4 Z" fill="currentColor" opacity="0.2" />
                  <path d="M32 8 L50 13.5 C50 31, 45 46, 32 54 C19 46, 14 31, 14 13.5 L32 8 Z" fill="currentColor" opacity="0.8" />
                  <path d="M26 31 L30 35 L39 24" fill="none" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}

            {zone.id === 'zone-5' && (
              <div className="absolute right-3 bottom-2 w-[34%] h-[68%] opacity-85 group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 select-none pointer-events-none text-rose-600">
                <svg viewBox="0 0 64 64" className="w-full h-full fill-current">
                  <rect x="18" y="8" width="3" height="48" rx="1.5" fill="#94a3b8" />
                  <path d="M21 12 C30 9, 34 16, 45 13 C52 11, 56 14, 56 14 L56 31 C56 31, 52 28, 45 30 C34 33, 30 26, 21 29 Z" fill="currentColor" />
                  <path d="M21 21 C30 18, 34 25, 45 22 L45 30 C34 33, 30 26, 21 29 Z" fill="black" opacity="0.1" />
                </svg>
              </div>
            )}

            {/* Title & Subtitle */}
            <div className="relative z-10 text-left">
              <h4 className={`text-base font-black tracking-wide ${zone.titleColor}`}>
                {zone.title}
              </h4>
              <p className="text-[10px] text-slate-500 font-semibold mt-1">
                {zone.subtitle}
              </p>
            </div>

            {/* Action pill button */}
            <div className="relative z-10 pt-4.5 text-left">
              <button
                className={`bg-white/90 border ${zone.btnBorder} ${zone.btnText} text-[10px] font-bold px-3 py-1.5 rounded-full shadow-3xs transition-all duration-150 flex items-center justify-center gap-1.5 w-fit shrink-0 cursor-pointer`}
              >
                <span>立即查看</span>
                <Icons.ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
