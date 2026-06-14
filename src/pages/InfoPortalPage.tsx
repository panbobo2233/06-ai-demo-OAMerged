/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';

import HeroCarousel from '../components/HeroCarousel';
import NewsAnnouncements from '../components/NewsAnnouncements';
import TodoQuickAccess from '../components/TodoQuickAccess';
import StatusDirectCar from '../components/StatusDirectCar';
import StudyBanner from '../components/StudyBanner';
import MultiColumnsJournals from '../components/MultiColumnsJournals';

import {
  mockNews,
  mockAnnouncements,
  mockTodoItems,
  defaultQuickAccess,
  mockDocuments,
  mockJournals
} from '../data';
import { TodoItem, QuickAccessItem, TodoTab } from '../types';

interface InfoPortalPageProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export default function InfoPortalPage({ searchTerm, onSearch }: InfoPortalPageProps) {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(mockTodoItems);
  const [quickAccessItems, setQuickAccessItems] = useState<QuickAccessItem[]>(defaultQuickAccess);
  
  // Custom document details modal state
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    title: string;
    category: string;
    body: string;
    stamp?: string;
  }>({
    isOpen: false,
    title: '',
    category: '',
    body: '',
    stamp: ''
  });

  // Calculate pending counts for header indicators
  const activeTodoCount = todoItems.filter(t => t.tabType === 'todo').length;
  const activeReadCount = todoItems.filter(t => t.tabType === 'to_read').length;

  const handleOpenDocModal = (title: string, category: string, body: string, stamp?: string) => {
    setModalData({
      isOpen: true,
      title,
      category,
      body,
      stamp
    });
  };

  const handleCloseDocModal = () => {
    setModalData(prev => ({ ...prev, isOpen: false }));
  };

  // Move todo from pending/toread to done/doneread on approval button check
  const handleCompleteTodoItem = (id: string) => {
    setTodoItems(prev => prev.map(item => {
      if (item.id === id) {
        let newTab: TodoTab = 'done';
        if (item.tabType === 'to_read') {
          newTab = 'done_read';
        }
        return { ...item, tabType: newTab };
      }
      return item;
    }));
  };

  // Custom quicklinks save callback
  const handleSaveQuickAccess = (updatedItems: QuickAccessItem[]) => {
    setQuickAccessItems(updatedItems);
  };

  // Smart Search logic
  const isSearching = searchTerm.trim().length > 0;
  
  const searchResultsNews = mockNews.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (n.summary && n.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const searchResultsAnn = mockAnnouncements.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchResultsDocs = mockDocuments.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalResults = searchResultsNews.length + searchResultsAnn.length + searchResultsDocs.length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-gzred/15 selection:text-gzred antialiased">
      
      <main className="flex-1 pb-12">
        <AnimatePresence mode="wait">
          {isSearching ? (
            
            // 2. Intelligent Search Results Area (Toggled when search value entered)
            <motion.div 
              key="search-results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-7xl mx-auto px-4 lg:px-8 py-8 text-left"
            >
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-md p-6.5">
                
                {/* Search result label metadata */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Icons.Cpu className="w-5 h-5 text-gzred animate-pulse" />
                    <h3 className="text-base font-extrabold text-slate-800">
                      广州银行智能云检索联想结果
                    </h3>
                  </div>
                  <button 
                    onClick={() => onSearch('')}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-gzred"
                  >
                    <span>退出检索</span>
                    <Icons.XCircle className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-400 mb-6.5">
                  已在重要时政新闻、下达红头公告及行内工作报告文档库中发现共计 <b className="text-gzred font-mono font-bold text-sm">{totalResults}</b> 个与您键入的词汇 “<span className="text-slate-900 font-bold underline decoration-gzgold decoration-2 bg-amber-50 px-1 py-0.5 rounded-sm">{searchTerm}</span>” 相关的备案条目：
                </p>

                {totalResults === 0 ? (
                  <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3.5">
                    <Icons.HelpCircle className="w-12 h-12 text-slate-200" />
                    <div>
                      <p className="text-xs font-bold text-slate-500">没有查找到任何匹配的文案记录</p>
                      <p className="text-[11px] text-slate-400 mt-1">请尝试精简查询词，如“公告”、“社会组织”、“不良资产”、“招标”等。</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6.5">
                    
                    {/* News items matching */}
                    {searchResultsNews.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-black text-gzred tracking-widest uppercase flex items-center gap-2">
                          <Icons.Newspaper className="w-4 h-4 shrink-0" />
                          筛选匹配的新闻快讯 ({searchResultsNews.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {searchResultsNews.map((n) => (
                            <div 
                              key={n.id}
                              onClick={() => handleOpenDocModal(n.title, `搜索反馈 • ${n.type}`, n.summary || '详细信息说明稿件备忘。')}
                              className="border border-slate-150 bg-slate-50/50 hover:bg-white rounded-xl p-3.5 hover:shadow-xs transition-all cursor-pointer text-left"
                            >
                              <h5 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-gzred">{n.title}</h5>
                              <p className="text-[10.5px] text-slate-400 mt-1.5">类别: {n.type} | 刊发期: {n.date}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Announcement items matching */}
                    {searchResultsAnn.length > 0 && (
                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <h4 className="text-xs font-black text-gzred tracking-widest uppercase flex items-center gap-2">
                          <Icons.BadgeAlert className="w-4 h-4 shrink-0" />
                          筛选匹配的重要公告 ({searchResultsAnn.length})
                        </h4>
                        <div className="space-y-2.5">
                          {searchResultsAnn.map((a) => (
                            <div 
                              key={a.id}
                              onClick={() => handleOpenDocModal(a.title, `公文搜索 • ${a.type}`, '关于本项公告的合规性实施与执行预案文件，可通过双击公文索引流阅办栏调阅全篇红头公文正本。')}
                              className="border border-slate-150 bg-slate-50/50 hover:bg-white rounded-xl p-3 flex justify-between items-center cursor-pointer transition-all hover:shadow-xs text-xs text-slate-600"
                            >
                              <span className="font-bold text-slate-700 truncate max-w-[80%]">{a.title}</span>
                              <span className="text-[10px] text-slate-400 font-mono shrink-0 bg-slate-100 px-2 py-0.5 rounded-md">{a.type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Documents matching */}
                    {searchResultsDocs.length > 0 && (
                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <h4 className="text-xs font-black text-gzred tracking-widest uppercase flex items-center gap-2">
                          <Icons.FileText className="w-4 h-4 shrink-0" />
                          筛选匹配的工作动态与栏目公文 ({searchResultsDocs.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                          {searchResultsDocs.map((d) => (
                            <div 
                              key={d.id}
                              onClick={() => handleOpenDocModal(d.title, '工作简报搜索匹配', '该规章或公文经由广州银行总行内审办审查下达，全篇包含具体的实施排表与考核准则。')}
                              className="border border-slate-100 p-3 rounded-xl bg-slate-100/50 hover:bg-white cursor-pointer hover:shadow-3xs"
                            >
                              <span className="text-[11px] font-bold text-slate-700 line-clamp-2 leading-relaxed">{d.title}</span>
                              <span className="text-[9px] text-slate-400 block mt-2 font-mono">{d.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            </motion.div>
          ) : (
            
            // 3. Main Dashboard Elements (Displayed under standard state)
            <motion.div 
              key="main-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1.5"
            >
              {/* Core Hero Carousel */}
              <HeroCarousel />

              {/* Major News and Date-coded Bulletin Board */}
              <NewsAnnouncements 
                news={mockNews} 
                announcements={mockAnnouncements.slice(0, 4)} 
                onOpenModal={handleOpenDocModal}
              />

              {/* Active Inbox Workflow Tasks vs Interactive Quick Access Board */}
              <TodoQuickAccess 
                todoItems={todoItems} 
                quickAccessItems={quickAccessItems}
                onCompleteTodo={handleCompleteTodoItem}
                onSaveQuickAccess={handleSaveQuickAccess}
                onOpenModal={handleOpenDocModal}
              />

              {/* Head-Branch Work status logs & Booking Lobbies */}
              <StatusDirectCar 
                documents={mockDocuments} 
                onOpenModal={handleOpenDocModal}
              />

              {/* Thematic Education transition banner requested by the user */}
              <StudyBanner />

              {/* 3 Columns detailed files list & Digital Magazines Periodical sliders */}
              <MultiColumnsJournals 
                documents={mockDocuments} 
                journals={mockJournals}
                onOpenModal={handleOpenDocModal}
              />

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 5. Majestic Bank of Guangzhou Official Document / News Reader Modal Backplate */}
      <AnimatePresence>
        {modalData.isOpen && (
          <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <motion.div 
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200/50 overflow-hidden"
            >
              {/* Document Header Panel with closing trigger */}
              <div className="bg-slate-50 px-6 py-4.5 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-gzred uppercase bg-red-50 px-2 py-0.5 rounded-sm border border-red-100/50">
                  {modalData.category}
                </span>
                
                <button 
                  onClick={handleCloseDocModal}
                  className="text-slate-400 hover:text-gzred bg-slate-100 hover:bg-red-50 p-1.5 rounded-full cursor-pointer transition-all duration-150"
                  aria-label="Close document"
                >
                  <Icons.X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Official Red-Letterhead letter frame (广州银行红头公文风格) */}
              <div className="p-8 max-h-[500px] overflow-y-auto font-sans leading-relaxed text-slate-800 text-left space-y-6">
                
                {/* Visual red letterhead divider */}
                <div className="text-center space-y-2 select-none">
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-widest text-gzred flex items-center justify-center gap-2">
                    广州银行股份有限公司公文函
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-gzred font-mono">
                    BANK OF GUANGZHOU OFFICIAL INTERNAL DISPATCH
                  </div>
                  <div className="relative h-1.5 flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-500 h-0.5"></div>
                    <div className="absolute bg-white px-3 text-red-500 font-serif text-[10px] font-bold">★ 机密 • 行内阅办 ★</div>
                  </div>
                </div>

                {/* Subtitle block with file indices metadata */}
                <div className="border-b border-slate-100 pb-4 text-xs font-mono text-slate-400 flex flex-wrap justify-between gap-2">
                  <span>编号/发文: 穗银发〔2026〕特级号</span>
                  <span>承办部门: {modalData.stamp || '总行董事会办公室'}</span>
                  <span>密级: 行内公开</span>
                </div>

                {/* Actual title in bold corporate header typography */}
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-wide text-center leading-normal pt-1 px-2">
                  {modalData.title}
                </h2>

                {/* Bullet text paragraphs */}
                <div className="text-xs sm:text-sm text-slate-600 space-y-4 font-sans leading-relaxed px-1">
                  {modalData.body.split('\n').map((para, index) => {
                    const trimmed = para.trim();
                    if (!trimmed) return null;
                    return (
                      <p key={index} className="indent-6 text-slate-700 font-sans tracking-wide">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>

                {/* Realistic red stamp and signage layout */}
                <div className="pt-8 border-t border-slate-100/60 flex justify-between items-center select-none">
                  <div className="text-[10px] text-slate-400 space-y-1">
                    <p>系统签定：全流程审计数字安全证书已挂载</p>
                    <p>打印限制：禁止网络二次外发或投递截图</p>
                  </div>

                  {/* Red Bank Stamp representation */}
                  <div className="relative text-center shrink-0 pr-6">
                    <p className="text-xs font-bold text-slate-700 font-sans">{modalData.stamp || '广州银行办公室'}</p>
                    <p className="text-[10.5px] font-mono text-slate-400 mt-1">2026年06月10日</p>
                    
                    {/* Stylized CSS circular stamp representation */}
                    <div className="absolute top-[-10px] right-[10px] w-12 h-12 rounded-full border-2 border-red-500/35 flex items-center justify-center rotate-12 select-none pointer-events-none">
                      <div className="text-[6px] font-bold text-red-500/75 scale-85 text-center leading-tight tracking-tighter">
                        审批核准章
                        <br />
                        ★ 
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Close Button footer bar */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-end">
                <button 
                  onClick={handleCloseDocModal}
                  className="bg-gzred hover:bg-gzred-hover text-white text-xs font-bold px-5 py-2 rounded-full shadow-sm hover:shadow-md cursor-pointer transition-all active:scale-95"
                >
                  确认查阅并关闭
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

