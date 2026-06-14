import React, { useState } from 'react';
import { 
  SquareCheck, 
  Briefcase, 
  CircleDollarSign, 
  UserPen, 
  Users, 
  Shield, 
  ShoppingCart, 
  CreditCard, 
  FileText, 
  BookOpen, 
  Store, 
  Wallet, 
  Database, 
  ShieldCheck, 
  UserCog, 
  List, 
  Search,
  PenLine
} from 'lucide-react';
import { AppItem } from './types';

const ICON_MAP: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
  SquareCheck,
  Briefcase,
  CircleDollarSign,
  UserPen,
  Users,
  Shield,
  ShoppingCart,
  CreditCard,
  FileText,
  BookOpen,
  Store,
  Wallet,
  Database,
  ShieldCheck,
  UserCog,
  List
};

interface AppGridProps {
  apps: AppItem[];
  onOpenCustomizer: () => void;
  onOpenWizard: (flowType?: string) => void;
  onOpenAllApps: () => void;
}

export default function AppGrid({
  apps,
  onOpenCustomizer,
  onOpenWizard,
  onOpenAllApps
}: AppGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Only display active applications from customizer
  const activeApps = apps.filter(app => app.isActive);

  // Filter application list in real time
  const filteredApps = searchQuery.trim()
    ? activeApps.filter(app => app.name.includes(searchQuery))
    : activeApps;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6" id="app-grid-container">
      {/* Search and customization top panel */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-50" id="app-control-bar">
        {/* Real-time search */}
        <div className="relative w-72" id="app-search-input-frame">
          <input
            type="text"
            className="w-full bg-white border border-gray-200 focus:border-brand-red outline-none rounded-md py-1.5 pl-3 pr-10 text-xs text-gray-700 placeholder-gray-400 transition-colors"
            placeholder="请输入关键词搜索应用"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute right-3 top-2.5 text-gray-400">
            <Search size={13} />
          </div>
        </div>

        {/* Customization Button Customizer trigger */}
        <button
          onClick={onOpenCustomizer}
          className="flex items-center text-xs text-gray-500 hover:text-brand-red transition-colors focus:outline-none cursor-pointer group font-medium"
          id="btn-customize-app"
        >
          <PenLine size={13} className="mr-1 group-hover:rotate-12 transition-transform duration-200 text-gray-400 group-hover:text-brand-red" />
          <span>定制入口</span>
        </button>
      </div>

      {/* Grid of applications */}
      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-8 gap-y-7 gap-x-4 text-center" id="applications-layout-grid">
          {filteredApps.map((app) => {
            const IconComponent = ICON_MAP[app.iconName] || SquareCheck;
            return (
              <div
                key={app.id}
                onClick={() => {
                  if (app.hasFlow) {
                    onOpenWizard(app.name);
                  } else {
                    alert(`【系统模拟】启动「${app.name}」系统，目前此环境处于演示模式。`);
                  }
                }}
                className="flex flex-col items-center group cursor-pointer"
                id={`app-item-${app.id}`}
              >
                {/* Red Circular Icon with absolute layout inside */}
                <div className="relative w-14 h-14 bg-brand-red group-hover:bg-brand-red-hover rounded-2xl flex items-center justify-center shadow-md shadow-red-100 transition-all duration-200 select-none group-active:scale-95 group-hover:-translate-y-1">
                  <IconComponent size={24} className="text-white" />

                  {/* Flow badge Tag "流" */}
                  {app.hasFlow && (
                    <span 
                      className="absolute -top-[5px] -right-2 bg-blue-100 border border-blue-200 text-blue-600 text-[10px] leading-none font-bold px-1.5 py-0.5 rounded shadow-sm scale-90"
                      style={{ fontFamily: '"Noto Sans SC", sans-serif' }}
                    >
                      流
                    </span>
                  )}
                </div>

                {/* Subtitle wording */}
                <span className="text-[12px] text-gray-600 font-medium tracking-wide mt-3 truncate w-full max-w-[85px] leading-tight group-hover:text-brand-red transition-colors">
                  {app.name}
                </span>
              </div>
            );
          })}

          {/* VIEW ALL static button (rendered on the 16th cell) */}
          <div
            onClick={onOpenAllApps}
            className="flex flex-col items-center group cursor-pointer"
            id="app-item-view-all"
          >
            {/* Gray circular container */}
            <div className="relative w-14 h-14 bg-[#f2f4f7] border border-gray-200/50 group-hover:bg-[#e4e7ec] rounded-2xl flex items-center justify-center transition-all duration-200 group-active:scale-95 group-hover:-translate-y-1 shadow-inner">
              <List size={24} className="text-gray-500 group-hover:text-gray-700" />
            </div>

            {/* Title wording */}
            <span className="text-[12px] text-gray-500 font-medium tracking-wide mt-3 leading-tight group-hover:text-brand-red transition-colors">
              查看全部
            </span>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-gray-400 bg-gray-50/50 rounded-xl" id="apps-empty-state">
          没有找到与“{searchQuery}”相匹配的定制应用。
        </div>
      )}
    </div>
  );
}
