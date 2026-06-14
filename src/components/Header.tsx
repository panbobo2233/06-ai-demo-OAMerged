import React from 'react';
import { Search, ChevronDown, Crown, LayoutDashboard, Star } from 'lucide-react';

export type PortalTab = '快捷入口' | '工作台' | '信息门户';

interface HeaderProps {
  onSearch: (term: string) => void;
  searchTerm: string;
  todoCount: number;
  readCount: number;
  userEmail?: string;
  activeTab: PortalTab;
  onTabChange: (tab: PortalTab) => void;
  viewMode: 'leader' | 'full';
  onToggleViewMode: () => void;
  isDefaultTab: boolean;
  onSetDefaultTab: () => void;
}

const TABS: { key: PortalTab; label: string }[] = [
  { key: '快捷入口', label: '快捷入口' },
  { key: '工作台', label: '工作台' },
  { key: '信息门户', label: '信息门户' },
];

export default function Header({
  onSearch, searchTerm, activeTab, onTabChange,
  viewMode, onToggleViewMode, isDefaultTab, onSetDefaultTab,
  userEmail = 'panbobo2233@gmail.com'
}: HeaderProps) {

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-xs px-4 lg:px-8 py-2 md:py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gzred shadow-sm shrink-0"></div>
          <div>
            <span className="text-[1.35rem] font-bold tracking-wider text-slate-900 font-sans leading-none">广州银行</span>
            <span className="text-[0.6rem] uppercase tracking-widest text-slate-400 font-mono block mt-0.5">BANK OF GUANGZHOU</span>
          </div>
        </div>

        {/* Middle Navigation Tabs */}
        <nav className="flex items-center gap-1 md:gap-2.5 overflow-x-auto no-scrollbar py-0.5">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                activeTab === tab.key
                  ? 'font-semibold text-gzred bg-gzred/5'
                  : 'font-medium text-slate-500 hover:text-gzred hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right Side: Search & Actions */}
        <div className="flex items-center flex-wrap md:flex-nowrap gap-2 md:gap-3 justify-between md:justify-end">

          {/* Dynamic Search Box */}
          <div className="relative w-full sm:w-48 md:w-56 max-w-full">
            <input
              type="text"
              placeholder="输入搜索内容..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-8 py-2 bg-slate-50 border border-slate-200/80 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-gzred/50 focus:border-gzred/50 focus:bg-white transition-all shadow-2xs"
            />
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
            {searchTerm && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-2.5 top-2 px-1 text-[10px] text-slate-400 hover:text-gzred"
              >
                清除
              </button>
            )}
          </div>

          {/* 设为默认首页 */}
          <button
            onClick={onSetDefaultTab}
            disabled={isDefaultTab}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] rounded-full transition-all border cursor-pointer ${
              isDefaultTab
                ? 'bg-amber-50 text-amber-600 border-amber-200'
                : 'text-slate-400 border-slate-200 hover:text-amber-600 hover:border-amber-300'
            }`}
            title={isDefaultTab ? '当前已是默认首页' : '设为默认首页'}
          >
            <Star className={`w-3 h-3 ${isDefaultTab ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="hidden sm:inline">{isDefaultTab ? '默认首页' : '设为首页'}</span>
          </button>

          {/* 视图切换 — 始终占位，非工作台时隐藏但保留空间 */}
          <button
            onClick={onToggleViewMode}
            disabled={activeTab !== '工作台'}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] rounded-full font-medium transition-all border ${
              activeTab !== '工作台' ? 'invisible' : 'cursor-pointer ' + (
                viewMode === 'leader'
                  ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              )
            }`}
          >
            {viewMode === 'leader' ? (
              <><Crown className="w-3 h-3 text-amber-500" /><span className="hidden sm:inline">领导视图</span></>
            ) : (
              <><LayoutDashboard className="w-3 h-3 text-slate-500" /><span className="hidden sm:inline">标准视图</span></>
            )}
          </button>

          {/* User */}
          <div className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 p-1 pr-2 rounded-full transition-all border border-slate-100 cursor-pointer">
            <div className="w-6 h-6 bg-gzred text-white rounded-full flex items-center justify-center font-bold text-[10px]">PB</div>
            <div className="hidden lg:block text-left">
              <p className="text-[10px] text-slate-700 font-bold leading-tight truncate max-w-[80px]">{userEmail.split('@')[0]}</p>
              <p className="text-[8px] text-slate-400 leading-none">总行系统管理员</p>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

        </div>

      </div>
    </header>
  );
}
