import React, { useState } from 'react';
import { Search, ChevronDown, Settings, User, LogOut, Check, Sliders, RefreshCw } from 'lucide-react';
import { ContactItem, TaskItem } from './types';

interface HeaderProps {
  currentPortal: string;
  setCurrentPortal: (portal: string) => void;
  contacts: ContactItem[];
  tasks: TaskItem[];
  userName: string;
  setUserName: (name: string) => void;
  onOpenCalendar: () => void;
  onOpenDirectory: () => void;
}

export default function Header({
  currentPortal,
  setCurrentPortal,
  contacts,
  tasks,
  userName,
  setUserName,
  onOpenCalendar,
  onOpenDirectory
}: HeaderProps) {
  const [globalSearch, setGlobalSearch] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showPortalDropdown, setShowPortalDropdown] = useState(false);
  const [isDefaultHome, setIsDefaultHome] = useState(true);

  // Filter global index data
  const filteredContacts = globalSearch.trim()
    ? contacts.filter(
        c =>
          c.name.includes(globalSearch) ||
          c.department.includes(globalSearch) ||
          c.role.includes(globalSearch)
      )
    : [];

  const filteredTasks = globalSearch.trim()
    ? tasks.filter(t => t.title.includes(globalSearch) || t.sender.includes(globalSearch))
    : [];

  const hasResults = filteredContacts.length > 0 || filteredTasks.length > 0;

  return (
    <header className="w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm" id="portal-header">
      {/* Brand Section */}
      <div className="flex items-center space-x-6">
        {/* Bank of Guangzhou Logo */}
        <div className="flex items-center space-x-2" id="brand-logo">
          <svg viewBox="0 0 100 100" className="w-8 h-8 flex-shrink-0 animate-pulse">
            {/* Outer red boundary coin circle */}
            <circle cx="50" cy="50" r="46" fill="#b50e18" />
            {/* White coin square inner cutout shape and traditional coin rims */}
            <circle cx="50" cy="50" r="28" fill="none" stroke="white" strokeWidth="6" />
            <rect x="37" y="37" width="26" height="26" fill="white" rx="3" />
            {/* Guangzhou "G" branding overlay inside square */}
            <path d="M 43 50 L 57 50" stroke="#b50e18" strokeWidth="5" strokeLinecap="round" />
            <path d="M 50 43 L 50 57" stroke="#b50e18" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col leading-tight select-none">
            <span className="font-sans font-bold text-gray-900 tracking-wider text-lg">广州银行</span>
            <span className="text-[10px] text-brand-red font-medium tracking-tighter">BANK OF GUANGZHOU</span>
          </div>
        </div>

        {/* 统一入口 (Active Red Box Frame) */}
        <div className="border border-brand-red px-4 py-1.5 rounded-sm select-none transition-transform active:scale-95 cursor-pointer" id="unified-btn">
          <span className="text-brand-red text-sm font-medium tracking-wider">统一入口</span>
        </div>

        {/* Navigation Menus */}
        <nav className="flex space-x-6 text-sm font-medium" id="main-nav">
          <button className="text-gray-900 border-b-2 border-brand-red h-16 px-1 flex items-center cursor-pointer">
            工作台
          </button>
          <button className="text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-gray-300 h-16 px-1 flex items-center transition-colors cursor-pointer">
            信息门户
          </button>
        </nav>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-sm mx-8 relative" id="header-search-container">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-[#f2f4f7] border-0 outline-none rounded-full py-1.5 pl-4 pr-10 text-xs text-gray-700 placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-200 transition-all shadow-inner"
            placeholder="找人、查公文、查知识库"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
          <div className="absolute right-3.5 top-2 text-gray-400">
            <Search size={14} className="hover:text-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Live Search Overlays */}
        {globalSearch.trim() !== '' && (
          <div className="absolute top-10 left-0 right-0 bg-white rounded-lg shadow-xl border border-gray-100 max-h-96 overflow-y-auto p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                站内智能搜索结果
              </span>
              <button
                onClick={() => setGlobalSearch('')}
                className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                清除
              </button>
            </div>

            {hasResults ? (
              <div className="space-y-4">
                {/* Matched Contacts */}
                {filteredContacts.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 block px-1.5 py-0.5 bg-emerald-50 rounded mb-1.5 width-fit">
                      联系人 / 通讯录
                    </span>
                    <div className="space-y-1">
                      {filteredContacts.map(c => (
                        <div
                          key={c.id}
                          className="flex items-center justify-between p-1.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
                          onClick={() => {
                            onOpenDirectory();
                            setGlobalSearch('');
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-6 h-6 rounded-full ${c.avatarColor} text-white flex items-center justify-center text-[10px] font-bold`}>
                              {c.name[0]}
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-gray-800">{c.name}</span>
                              <span className="text-[10px] text-gray-400 ml-1.5">
                                ({c.department} - {c.role})
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-gray-500">{c.phone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Tasks/Approval docs */}
                {filteredTasks.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-red-600 block px-1.5 py-0.5 bg-red-50 rounded mb-1.5 width-fit">
                      公文待办 / 审批流程
                    </span>
                    <div className="space-y-1">
                      {filteredTasks.map(t => (
                        <div
                          key={t.id}
                          className="p-1.5 hover:bg-gray-50 rounded-md cursor-pointer transition-colors block text-left"
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-semibold text-gray-800 truncate block max-w-[200px]">
                              {t.title}
                            </span>
                            <span className="text-[9px] text-gray-400">{t.date.split(' ')[0]}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 line-clamp-1">{t.sender}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-gray-400">
                暂无匹配的“{globalSearch}”数据。
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Control Actions */}
      <div className="flex items-center space-x-6 text-xs text-gray-600" id="header-controls">
        {/* Switch Portal Selector */}
        <div className="relative">
          <button
            onClick={() => setShowPortalDropdown(!showPortalDropdown)}
            onBlur={() => setTimeout(() => setShowPortalDropdown(false), 200)}
            className="flex items-center space-x-1 hover:text-brand-red cursor-pointer py-2 focus:outline-none select-none font-medium text-gray-700"
            id="btn-switch-portal"
          >
            <span>切换门户: <span className="font-semibold text-brand-red">{currentPortal}</span></span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${showPortalDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showPortalDropdown && (
            <div className="absolute right-0 mt-1.5 bg-white border border-gray-100 rounded-lg shadow-xl w-40 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
              {['管理决策门户', '总行工作门户', '前台业务门户', '审计专用门户'].map((p) => (
                <button
                  key={p}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs text-gray-700 flex items-center justify-between cursor-pointer"
                  onClick={() => {
                    setCurrentPortal(p);
                    setShowPortalDropdown(false);
                  }}
                >
                  <span className={currentPortal === p ? 'text-brand-red font-medium' : ''}>{p}</span>
                  {currentPortal === p && <Check size={12} className="text-brand-red" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Info & Settings Panel */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            onBlur={() => setTimeout(() => setShowUserDropdown(false), 200)}
            className="flex items-center space-x-1 hover:text-brand-red cursor-pointer py-2 focus:outline-none select-none font-medium text-gray-700"
            id="btn-welcome-user"
          >
            <span>欢迎您 <span className="font-semibold">{userName}</span></span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-1.5 bg-white border border-gray-100 rounded-lg shadow-xl w-52 p-3.5 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center font-bold">
                  管
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{userName}</h4>
                  <p className="text-[10px] text-gray-400">总行管理员运营专席</p>
                </div>
              </div>

              {/* Editable Name option */}
              <div className="mb-3.5">
                <label className="text-[9px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">
                  修改显示姓名
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-[#f2f4f7] rounded px-2 py-1 text-xs text-gray-700 focus:bg-white focus:ring-1 focus:ring-brand-red outline-none border-0"
                />
              </div>

              <div className="space-y-1">
                <button
                  onClick={onOpenDirectory}
                  className="w-full text-left text-xs px-2 py-1.5 rounded hover:bg-gray-50 flex items-center text-gray-600 cursor-pointer"
                >
                  <User size={13} className="mr-2" /> 通讯中心
                </button>
                <button
                  onClick={() => setIsDefaultHome(!isDefaultHome)}
                  className="w-full text-left text-xs px-2 py-1.5 rounded hover:bg-gray-50 flex items-center text-gray-600 justify-between cursor-pointer"
                >
                  <div className="flex items-center">
                    <Sliders size={13} className="mr-2" /> 首页类型
                  </div>
                  <span className="text-[9px] bg-red-50 text-brand-red font-semibold px-1 rounded">
                    {isDefaultHome ? '默认' : '协作'}
                  </span>
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => setUserName('管理员')}
                  className="w-full text-left text-xs px-2 py-1.5 rounded hover:bg-gray-50 flex items-center text-brand-red font-medium cursor-pointer"
                >
                  <LogOut size={13} className="mr-2" /> 重置账户
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Set default landing page Settings button */}
        <button
          onClick={() => setIsDefaultHome(!isDefaultHome)}
          className={`flex items-center space-x-1 py-1 px-2.5 rounded-full border transition-all cursor-pointer ${
            isDefaultHome
              ? 'border-brand-red bg-red-50/50 text-brand-red shadow-sm'
              : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
          id="btn-default-home"
        >
          <Settings size={12} className={`${isDefaultHome ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span className="font-medium">默认首页设置</span>
        </button>
      </div>
    </header>
  );
}
