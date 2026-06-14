import React, { useState } from 'react';
import {
  AppItem, TaskItem, BannerSlide
} from '../components/portal/types';
import {
  INITIAL_SLIDES, INITIAL_APPS, INITIAL_TASKS
} from '../components/portal/data';

import HeroSlider from '../components/portal/HeroSlider';
import QuickCards from '../components/portal/QuickCards';
import AppGrid from '../components/portal/AppGrid';

interface PortalPageProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export default function PortalPage({ searchTerm, onSearch }: PortalPageProps) {
  const [apps, setApps] = useState<AppItem[]>(INITIAL_APPS);
  const [tasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [slides] = useState<BannerSlide[]>(INITIAL_SLIDES);

  const todoCount = tasks.filter(t => t.type === 'todo' && t.status === 'pending').length;
  const unreadCount = tasks.filter(t => t.type === 'unread' && t.status === 'unread').length;

  // Customizer: Toggles specific applications in the main interface
  const handleToggleApp = (appId: string) => {
    setApps(prev =>
      prev.map(a => (a.id === appId ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const handleRestoreDefaults = () => {
    setApps(INITIAL_APPS);
  };

  return (
    <div className="min-h-screen bg-[#edf1f5] flex flex-col font-sans antialiased">
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-6 space-y-6">
        {/* Row 1: Left Hero Banner & Right 3x3 Card Cluster */}
        <div className="grid grid-cols-12 gap-6 items-stretch">
          <div className="col-span-12 lg:col-span-7 xl:col-span-8 min-h-[340px] h-[340px]">
            <HeroSlider slides={slides} />
          </div>
          <div className="col-span-12 lg:col-span-5 xl:col-span-4 h-[340px]">
            <QuickCards
              todoCount={todoCount}
              unreadCount={unreadCount}
              onOpenDrawer={() => {}}
              onOpenCalendar={() => {}}
              onOpenDirectory={() => {}}
              onOpenWizard={() => {}}
            />
          </div>
        </div>

        {/* Row 2: Bottom Application List */}
        <AppGrid
          apps={apps}
          onOpenCustomizer={() => {}}
          onOpenWizard={() => {}}
          onOpenAllApps={() => {}}
        />

        {/* Alert bulletin */}
        <div className="flex items-center space-x-3 bg-white border border-gray-100 rounded-xl p-3 px-4 shadow-sm select-none">
          <span className="bg-red-50 text-brand-red font-bold text-[10px] uppercase border border-red-200 py-0.5 px-2 rounded-full">
            【公告】
          </span>
          <p className="text-[11px] text-gray-500 truncate flex-1 font-medium">
            关于2026年夏季防台风、电气安全用能维保巡检已经开始。请各网点注意关闭下班电源，严防雨水渗入。
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#1c2438] text-gray-400 text-center py-6 select-none mt-auto">
        <div className="max-w-[1280px] w-full mx-auto px-6 space-y-1.5">
          <p className="text-xs tracking-wider">
            为了获得最佳操作体验，建议您使用最新版本的浏览器，支持1024 X 768以上分辨率
          </p>
          <p className="text-[11px] text-gray-500 font-mono tracking-wide">
            Copyright © 2001-2019 深圳蓝凌软件股份有限公司 服务热线：4006-222-312
          </p>
        </div>
      </footer>
    </div>
  );
}
