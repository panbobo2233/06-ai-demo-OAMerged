/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DocumentItem } from '../types';
import SpecialZones from './SpecialZones';
import wangdianImg from '@/wangdian.png';

const directCarSlides = [
  {
    id: 1,
    imageUrl: wangdianImg,
  },
  {
    id: 2,
    imageUrl: wangdianImg,
  },
  {
    id: 3,
    imageUrl: wangdianImg,
  }
];

interface StatusDirectCarProps {
  documents: DocumentItem[];
  onOpenModal: (title: string, category: string, body: string, stamp?: string) => void;
}

interface Branch {
  id: string;
  name: string;
  district: string;
  queueCount: number;
  openWindows: number;
  waitTime: number;
}

export default function StatusDirectCar({ documents, onOpenModal }: StatusDirectCarProps) {
  const [activeTab, setActiveTab] = useState<'head' | 'branch'>('head');
  const [showDirectCardModal, setShowDirectCardModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [queueCounter, setQueueCounter] = useState(4);
  const [slideIndex, setSlideIndex] = useState(0);

  // Auto-play interval for the Branch Direct Door
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % directCarSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Filter documents
  const filteredDocs = documents.filter(doc => doc.section === activeTab);

  // Realistic bank branches to reserve a ticket online
  const [branches, setBranches] = useState<Branch[]>([
    { id: 'br-1', name: '总行营业部（珠江新城总行大厦）', district: '天河区', queueCount: 2, openWindows: 5, waitTime: 3 },
    { id: 'br-2', name: '天河体育东路支行', district: '天河区', queueCount: 8, openWindows: 2, waitTime: 14 },
    { id: 'br-3', name: '越秀山森林特色绿色支行', district: '越秀区', queueCount: 1, openWindows: 3, waitTime: 1 },
    { id: 'br-4', name: '海珠江南大道财富中心', district: '海珠区', queueCount: 11, openWindows: 3, waitTime: 18 },
    { id: 'br-5', name: '荔湾西关历史风貌金融驿站', district: '荔湾区', queueCount: 4, openWindows: 2, waitTime: 6 }
  ]);

  const handleDocClick = (doc: DocumentItem) => {
    const isHead = doc.section === 'head';
    onOpenModal(
      doc.title,
      isHead ? '工作报告 • 总行工作动态' : '分行动态 • 分行工作动态',
      `关于广州银行发布《${doc.title}》的说明稿：\n\n为了贯彻落实本行2026年高质量转型发展工作，增强集团多层级条线的行政业务穿透力，总行特编发此工作指导意见。要求各级单位、办事处和各直属支行深入跟进其中提及的各项具体要求，并由分管行长亲自带组执行定期落实通报。\n\n详情可联系内部办公系统内线网络或对应的业务部门进行垂询。刊发时间为【${doc.date}】。`,
      isHead ? '总行办公室运营科' : '分行工会事务督办协调处'
    );
  };

  const handleBookTicket = (branchId: string) => {
    const branch = branches.find(b => b.id === branchId);
    if (!branch) return;

    setSelectedBranch(branchId);
    const code = `A0${Math.floor(Math.random() * 80) + 10}`;
    setTicketNumber(code);

    // Update wait list count
    setBranches(prev => prev.map(b => {
      if (b.id === branchId) {
        return {
          ...b,
          queueCount: b.queueCount + 1,
          waitTime: b.waitTime + 2
        };
      }
      return b;
    }));
  };

  const handleResetTicket = () => {
    setSelectedBranch(null);
    setTicketNumber(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6.5">
        
        {/* Work Status Left Side (Takes 2/3 space) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between">
          <div>
            {/* Header Switcher Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4.5">
              <div className="flex items-center gap-1.5">
                <div className="w-1 bg-gzred h-4.5 rounded-full mr-1"></div>
                
                <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-200/50">
                  <button 
                    onClick={() => setActiveTab('head')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      activeTab === 'head' ? 'bg-white text-gzred shadow-3xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    总行工作动态
                  </button>
                  <button 
                    onClick={() => setActiveTab('branch')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      activeTab === 'branch' ? 'bg-white text-gzred shadow-3xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    分行工作动态
                  </button>
                </div>
              </div>

              <button 
                onClick={() => onOpenModal('广州银行总行及直属分行工作周报看板', '机构状态库', '此处汇总了总行全部18个职能部门、全省十三个地级市二级分行报送的实时经营、党建、安全自查工作周报，方便业务协同共享。')}
                className="text-[11px] text-slate-400 hover:text-gzred hover:underline transition-all cursor-pointer"
              >
                更多 &gt;&gt;
              </button>
            </div>

            {/* list Items block */}
            <div className="space-y-2.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.16 }}
                  className="space-y-3"
                >
                  {filteredDocs.map((doc) => (
                    <div 
                      key={doc.id}
                      onClick={() => handleDocClick(doc)}
                      className="flex items-center justify-between text-left group cursor-pointer hover:bg-slate-50 p-2 rounded-xl border border-transparent hover:border-slate-100/60 transition-all"
                    >
                      <div className="flex items-start gap-2.5 max-w-[85%]">
                        <Icons.Compass className="w-3.5 h-3.5 mt-0.5 text-slate-300 group-hover:text-gzred shrink-0 transition-colors" />
                        <span className="text-xs text-slate-600 group-hover:text-slate-950 font-medium truncate">
                          {doc.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {doc.date}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* 网点直通车 Right (Interactive image-driven slider) */}
        <div className="relative rounded-2xl overflow-hidden shadow-xs border border-slate-100 flex flex-col justify-between h-[250px] lg:h-auto min-h-[250px] group select-none">
          {/* Animated Background Slide */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={directCarSlides[slideIndex].imageUrl}
                  alt={`Guangzhou Bank Direct Car ${slideIndex + 1}`}
                  className="w-full h-full object-cover object-left select-none"
                  referrerPolicy="no-referrer"
                />
                {/* Elegant dark/gradient overlay for high legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-slate-900/15" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Top Floating Badge */}

          {/* Bottom Controls Overlay */}
          <div className="relative z-10 p-5 mt-auto flex items-end justify-between gap-4 bg-gradient-to-t from-slate-950/85 to-transparent">
            {/* Slide Pagination Dots */}
            <div className="flex gap-1.5 py-2">
              {directCarSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    slideIndex === idx ? 'w-4 bg-gzred' : 'w-1.5 bg-white/45 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Jump Button only */}
            <button 
              onClick={() => setShowDirectCardModal(true)}
              className="bg-white hover:bg-gzgold text-gzred hover:text-slate-950 font-black text-xs px-4.5 py-2.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              立即跳转
              <Icons.ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 特色专区 */}
      <SpecialZones onOpenModal={onOpenModal} />

      {/* Dynamic O2O Appointment Booking Modal */}
      <AnimatePresence>
        {showDirectCardModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-100 overflow-hidden text-slate-800"
            >
              {/* Header */}
              <div className="bg-gzred text-white p-4.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icons.MapPin className="w-4.5 h-4.5 text-gzgold" />
                  <h3 className="text-sm font-bold tracking-wider">广州银行智能柜面网点排号预约机</h3>
                </div>
                <button 
                  onClick={() => { setShowDirectCardModal(false); handleResetTicket(); }}
                  className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full cursor-pointer"
                >
                  <Icons.X className="w-5 h-5" />
                </button>
              </div>

              {/* Booking flow */}
              <div className="p-5 text-left">
                {ticketNumber ? (
                  // Reservation ticket display card
                  <div className="text-center py-6 px-1.5 space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                      <Icons.CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-800">在线排号办理成功</h4>
                      <p className="text-[11px] text-slate-400 mt-1">您已建立实名排号索引号，届时凭此电子票至营业厅柜位办理。</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4.5 max-w-sm mx-auto shadow-2xs font-mono relative">
                      <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none border-t-2 border-b-2 border-slate-200/50 border-dashed m-1.5 rounded-lg"></div>
                      
                      <div className="text-slate-400 text-[10px] tracking-widest uppercase">预约业务票据 (GZ-BANK)</div>
                      <div className="text-3xl font-extrabold text-gzred my-3 tracking-widest">{ticketNumber}</div>
                      
                      <div className="border-t border-slate-200 border-dashed pt-3.5 space-y-1.5 text-left text-xs text-slate-500">
                        <div className="flex justify-between">
                          <span>预约门店:</span>
                          <span className="font-bold text-slate-800">{branches.find(b => b.id === selectedBranch)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>待办事半:</span>
                          <span className="text-slate-800">行员综合行政业务（绿色通道）</span>
                        </div>
                        <div className="flex justify-between">
                          <span>前序等待:</span>
                          <span className="text-gzred font-bold font-sans">
                            {branches.find(b => b.id === selectedBranch)?.queueCount} 人在排队
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>建议到店:</span>
                          <span className="text-slate-800">预计等待十分钟内，请携带身份证件</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center pt-3">
                      <button 
                        onClick={handleResetTicket}
                        className="text-[11px] font-bold bg-white text-slate-600 border border-slate-200 px-4.5 py-1.5 rounded-full cursor-pointer"
                      >
                        重新排其他网点
                      </button>
                      <button 
                        onClick={() => { setShowDirectCardModal(false); handleResetTicket(); }}
                        className="text-[11px] font-bold bg-gzred text-white hover:bg-gzred-hover px-5 py-1.5 rounded-full cursor-pointer"
                      >
                        确定完成
                      </button>
                    </div>
                  </div>
                ) : (
                  // list Branches
                  <div className="space-y-4">
                    <p className="text-[11px] text-slate-500 border-b border-slate-100 pb-2">
                      系统正在查询附近的营业厅。作为内部行员，您可以享受绿色行政专号免排队服务，极大缩短到前台签字审核的等待时间。请在下方门店选择并点击预约：
                    </p>

                    <div className="space-y-3 max-h-68 overflow-y-auto pr-1">
                      {branches.map((b) => (
                        <div 
                          key={b.id}
                          className="border border-slate-100 rounded-xl p-3 flex.col sm:flex sm:items-center sm:justify-between bg-slate-50/50 hover:bg-slate-50 transition-all gap-4 text-xs font-sans text-slate-600"
                        >
                          <div className="space-y-1 text-left">
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded-xs text-[9px] font-bold font-mono">{b.district}</span>
                              <h5 className="font-bold text-slate-800">{b.name}</h5>
                            </div>
                            <p className="text-[10px] text-slate-400">当前排位情况：共有 <b className="text-slate-500">{b.queueCount}</b> 人在排位，开通窗口 {b.openWindows} 个人员</p>
                          </div>

                          <div className="flex items-center gap-3.5 justify-between sm:justify-end shrink-0 mt-3 sm:mt-0">
                            <div className="text-right">
                              <span className="block text-[10px] text-slate-400">估计排队</span>
                              <span className="text-gzred font-extrabold font-mono text-sm">{b.waitTime} 分钟</span>
                            </div>
                            <button
                              onClick={() => handleBookTicket(b.id)}
                              className="bg-gzred hover:bg-gzred-hover text-white font-bold text-[10px] px-3.5 py-2 rounded-full cursor-pointer transition-all"
                            >
                              一键取号
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
