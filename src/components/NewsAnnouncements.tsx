/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Newspaper, Award, FileSpreadsheet, FileText, CheckCircle2 } from 'lucide-react';
import { NewsItem, AnnouncementItem } from '../types';

interface NewsAnnouncementsProps {
  news: NewsItem[];
  announcements: AnnouncementItem[];
  onOpenModal: (title: string, category: string, body: string, stamp?: string) => void;
}

export default function NewsAnnouncements({ news, announcements, onOpenModal }: NewsAnnouncementsProps) {
  const featured = news.find(n => n.isFeatured) || news[0];
  const listNews = news.filter(n => n.id !== featured.id);

  const handleNewsClick = (item: NewsItem) => {
    const defaultBody = item.summary || 
      `针对行内发布的《${item.title}》，广州银行总行各部室在认真组织研读后指出：当前阶段必须要发挥普惠主力军、主力行的带头示范效应。在总行党委领导及统一部署下，结合数字银行技术改造、大渠道升级和绿色低碳减息贴息政策，全力打通金融服务实体的“最后一公里”。`;
    onOpenModal(
      item.title,
      `新闻快讯 • ${item.type}`,
      defaultBody,
      '广州银行公关宣传部'
    );
  };

  const handleAnnClick = (item: AnnouncementItem) => {
    const mockRefNumber = `穗银发〔2026〕${Math.floor(Math.random() * 80) + 10}号`;
    const defaultBody = `
      关于印发该通知的通知：\n\n
      为进一步贯彻落实监管部门有关业务指标稳健增长与合规管理细则，防范因交易断线或柜面处理迟缓引起的服务投诉，我行在此项决策中已对软硬件冗余度做好周全预设。\n\n
      各分支机构及相关业务部门必须高度重视此项政策：\n
      1. 统一组织学习指引或实操指南；\n
      2. 针对系统升级或业务窗口变动，提前做好前台导流排队演练，并设专人专职处理柜面紧急升级异常；\n
      3. 各网点要确保本细则中的核心服务准则、自查规范做到人人熟知，严禁由于指引不清或人员脱岗延误办理。\n\n
      各单位应在收到本通知起三个工作日内，向总行相关归口业务部室报备自查反馈结果与演练记录。特此通知。
    `;
    onOpenModal(
      item.title,
      `正式公文 • ${item.type}`,
      defaultBody,
      '广州银行办公室'
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6.5">
        
        {/* 重要新闻 Left Column (Takes 2/3 of space on desktop) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4.5">
              <div className="flex items-center gap-2">
                <div className="w-1 bg-gzred h-4.5 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-800 tracking-wider">重要新闻</h3>
              </div>
              <button 
                onClick={() => onOpenModal('广州银行内部重要新闻中心', '新闻合集', '这里是本行所有重要时政、党建大纪事和业务创新的集中宣传阵地。请配合企业安全自护，严禁将内部文刊及未披露新闻外发。')}
                className="text-[11px] text-slate-400 hover:text-gzred hover:underline transition-all active:scale-95 cursor-pointer"
              >
                更多 &gt;&gt;
              </button>
            </div>

            {/* Featured Major News Detail (Top Element) */}
            {featured && (
              <div 
                onClick={() => handleNewsClick(featured)}
                className="grid grid-cols-1 md:grid-cols-12 gap-5 group cursor-pointer p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-300"
              >
                <div className="md:col-span-5 h-[160px] rounded-lg overflow-hidden relative shadow-2xs">
                  <img 
                    src={featured.image} 
                    alt={featured.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-gzred/90 text-white font-bold text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Award className="w-2.5 h-2.5 text-gzgold" />
                    置顶推荐
                  </div>
                </div>
                
                <div className="md:col-span-7 flex flex-col justify-center text-left">
                  <h4 className="text-xs font-extrabold text-gzred md:text-sm group-hover:text-gzred-hover transition-colors leading-snug">
                    {featured.title}
                  </h4>
                  <p className="text-[11.5px] text-slate-500 font-sans mt-2 leading-relaxed line-clamp-4">
                    {featured.summary}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-3 font-mono">
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-sm">{featured.type}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-300" />
                      {featured.date}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Featured Sibling News List (Bottom Element of Column) */}
          <div className="mt-5 pt-3 border-t border-slate-50 space-y-2.5">
            {listNews.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                onClick={() => handleNewsClick(item)}
                className="flex items-center justify-between text-left group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-all"
              >
                <div className="flex items-start gap-2.5 max-w-[85%]">
                  <Newspaper className="w-3.5 h-3.5 mt-0.5 text-slate-400 group-hover:text-gzred shrink-0 transition-colors" />
                  <span className="text-xs text-slate-600 group-hover:text-slate-950 font-medium truncate">
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0 select-none">
                  {item.date}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* 重要公告 Right Column (Takes 1/3 of space on desktop) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4.5">
              <div className="flex items-center gap-2">
                <div className="w-1 bg-gzred h-4.5 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-800 tracking-wider">重要公告</h3>
              </div>
              <button 
                onClick={() => onOpenModal('广州银行总行最新公告汇编', '公告管理', '这里发布的是面向全行干部、行员等公开的重要行政审批通告、系统升级通告及应急指引。请全员务必按时查阅并严格落实。')}
                className="text-[11px] text-slate-400 hover:text-gzred hover:underline transition-all cursor-pointer"
              >
                更多 &gt;&gt;
              </button>
            </div>

            {/* List of stacked styled Announcement items */}
            <div className="space-y-4">
              {announcements.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleAnnClick(item)}
                  className="flex items-center gap-3.5 group cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition-all"
                >
                  {/* Left Date Block */}
                  <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200/65 flex flex-col items-center justify-center transition-colors group-hover:bg-red-50/50 group-hover:border-red-100 shrink-0">
                    <span className="text-base font-extrabold text-slate-800 group-hover:text-gzred font-mono leading-none">
                      {item.day}
                    </span>
                    <span className="text-[8px] text-slate-400 font-mono mt-1">
                      {item.yearMonth}
                    </span>
                  </div>

                  {/* Right Title + Type Info text */}
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-xs font-semibold text-slate-700 leading-snug group-hover:text-slate-950 truncate">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1 truncate">
                      {item.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
