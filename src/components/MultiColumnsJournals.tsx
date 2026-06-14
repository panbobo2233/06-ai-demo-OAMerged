/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DocumentItem, JournalItem } from '../types';

interface MultiColumnsJournalsProps {
  documents: DocumentItem[];
  journals: JournalItem[];
  onOpenModal: (title: string, category: string, body: string, stamp?: string) => void;
}

export default function MultiColumnsJournals({ documents, journals, onOpenModal }: MultiColumnsJournalsProps) {
  const [selectedJournal, setSelectedJournal] = useState<JournalItem | null>(null);

  // Filter documents by column
  const col1Docs = documents.filter(doc => doc.section === 'column1');
  const col2Docs = documents.filter(doc => doc.section === 'column2');
  const col3Docs = documents.filter(doc => doc.section === 'column3');

  const handleDocClick = (doc: DocumentItem, columnTitle: string) => {
    onOpenModal(
      doc.title,
      `行内文件 • ${columnTitle}`,
      `
      一号公事签呈通报：\n\n
      此次编发的办公业务文件：《${doc.title}》，已通过广州银行总行内控合规、财务资产和办公室综合科的联合审阅与合签流程。\n\n
      全行各网点、相关经办窗口和审批柜员要在收到此通知后：\n
      1. 全面对照政策指示，盘点本网点存量关联明细；\n
      2. 重组对应业务的签字和盖章路径，严防出现无授权放贷与违规结售汇行为；\n
      3. 有疑问的重要客户流程应向上级归口部门呈请协调说明，切实稳健守住风控网。\n\n
      本条款对本行当前年度的日常审批极具参考性，请行行通达。
      `,
      '广州银行内网资料室'
    );
  };

  const handleJournalClick = (j: JournalItem) => {
    setSelectedJournal(j);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-4.5">
      
      {/* Three Columns Side By Side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5 mb-7">
        
        {/* Column 1 Title */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1 bg-gzred h-4.5 rounded-full mr-1"></div>
                <h3 className="text-xs font-black text-slate-800 tracking-wider">规章制度</h3>
              </div>
              <button 
                onClick={() => onOpenModal('规章制度数据库', '行政库', '这里存储了广州银行自成立以来的全套人事福利政策、防尾随抢劫保卫手册、消防自护指南及廉洁自律红线规定。')}
                className="text-[10px] text-slate-400 hover:text-gzred transition-all cursor-pointer"
              >
                更多 &gt;&gt;
              </button>
            </div>

            <div className="space-y-2.5">
              {col1Docs.map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => handleDocClick(doc, '规章制度')}
                  className="flex items-center justify-between text-left group cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-all"
                >
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <Icons.Dot className="w-4 h-4 text-slate-300 group-hover:text-gzred shrink-0" />
                    <span className="text-xs text-slate-600 group-hover:text-slate-950 font-medium truncate">
                      {doc.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 select-none">{doc.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2 Title */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1 bg-gzgold h-4.5 rounded-full mr-1"></div>
                <h3 className="text-xs font-black text-slate-800 tracking-wider">工会生活</h3>
              </div>
              <button 
                onClick={() => onOpenModal('工会生活俱乐部', '活动中心', '全行行员羽毛球挑战赛、夏日送清凉、新春慰问和贫困家庭帮扶活动的实时图文公告展示区。')}
                className="text-[10px] text-slate-400 hover:text-gzred transition-all cursor-pointer"
              >
                更多 &gt;&gt;
              </button>
            </div>

            <div className="space-y-2.5">
              {col2Docs.map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => handleDocClick(doc, '工会生活')}
                  className="flex items-center justify-between text-left group cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-all"
                >
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <Icons.Dot className="w-4 h-4 text-slate-300 group-hover:text-gzred shrink-0" />
                    <span className="text-xs text-slate-600 group-hover:text-slate-950 font-medium truncate">
                      {doc.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 select-none">{doc.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3 Title */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1 bg-blue-600 h-4.5 rounded-full mr-1"></div>
                <h3 className="text-xs font-black text-slate-800 tracking-wider">合规自查</h3>
              </div>
              <button 
                onClick={() => onOpenModal('财务跟办与反洗钱自查', '风险中心', '此处汇总下发有关全生命周期反洗钱监测、对公资金临时冻结划转、财务发票联签审核合规性的常态案例提示与考卷。')}
                className="text-[10px] text-slate-400 hover:text-gzred transition-all cursor-pointer"
              >
                更多 &gt;&gt;
              </button>
            </div>

            <div className="space-y-2.5">
              {col3Docs.map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => handleDocClick(doc, '合规自查')}
                  className="flex items-center justify-between text-left group cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-all"
                >
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <Icons.Dot className="w-4 h-4 text-slate-300 group-hover:text-gzred shrink-0" />
                    <span className="text-xs text-slate-600 group-hover:text-slate-950 font-medium truncate">
                      {doc.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 select-none">{doc.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 广银期刊 Section at the Bottom */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4.5">
          <div className="flex items-center gap-2">
            <div className="w-1 bg-gzred h-4.5 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-800 tracking-wider">广银期刊</h3>
            <span className="text-xs text-slate-400 select-none">/ 运营之声</span>
          </div>
          <button 
            onClick={() => onOpenModal('广州银行《运营之声》期刊总览库', '文化沙龙', '广州银行总行内网官方唯一指定的纸质期刊电子化专栏成果。收录数年来全行运营条点改革、智能柜面创文优胜网点的精髓分享。')}
            className="text-[11px] text-slate-400 hover:text-gzred hover:underline transition-all cursor-pointer"
          >
            更多 &gt;&gt;
          </button>
        </div>

        {/* 4 Cards Grid of Journal Covers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4.5">
          {journals.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleJournalClick(item)}
              className="group cursor-pointer border border-slate-100 hover:border-slate-200 bg-slate-50 rounded-xl p-3 flex items-center gap-3.5 transition-all hover:shadow-2xs active:scale-98"
            >
              {/* Cover Book thumbnail */}
              <div className="w-14 h-20 rounded-md overflow-hidden relative shadow-3xs border border-slate-200/50 shrink-0 select-none">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Journal cover label style overlay */}
                <div className="absolute inset-0 bg-black/15 z-1 flex flex-col justify-between p-1.5 text-white font-serif">
                  <div className="text-[6px] font-mono leading-none tracking-tight">{item.year}</div>
                  <div className="text-[7px] font-medium leading-none text-right">{item.period}</div>
                </div>
              </div>

              {/* Title Metadata description column */}
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 font-mono font-bold uppercase">{item.year}年 • {item.period}</p>
                <h4 className="text-xs font-black text-slate-800 tracking-wide mt-1.5 group-hover:text-gzred transition-colors flex items-center gap-1">
                  {item.title}
                  <Icons.ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-gzred shrink-0" />
                </h4>
                <span className="text-[9px] text-slate-400 block mt-1 hover:underline">点击在线预览馆藏</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Dynamic Digital Periodical Reader Modal */}
      <AnimatePresence>
        {selectedJournal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-100 overflow-hidden text-slate-800"
            >
              {/* Header */}
              <div className="bg-gzred text-white p-4.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icons.BookOpen className="w-4.5 h-4.5 text-gzgold" />
                  <h3 className="text-sm font-bold tracking-wider">广州银行《运营之声》期刊智能阅读馆</h3>
                </div>
                <button 
                  onClick={() => setSelectedJournal(null)}
                  className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full cursor-pointer"
                >
                  <Icons.X className="w-5 h-5" />
                </button>
              </div>

              {/* Cover details layout */}
              <div className="p-5 grid grid-cols-1 sm:grid-cols-12 gap-5.5 text-left">
                
                {/* Left Thumbnail with elegant dimensions */}
                <div className="sm:col-span-4 h-48 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-sm relative">
                  <img 
                    src={selectedJournal.imageUrl} 
                    alt={selectedJournal.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/45 backdrop-blur-xs py-2 text-center text-white text-[9px] font-mono">
                    馆藏代号 GZ-{selectedJournal.year}
                  </div>
                </div>

                {/* Right Directory list */}
                <div className="sm:col-span-8 space-y-4">
                  <div>
                    <span className="px-2 py-0.5 bg-red-100 text-gzred text-[9px] font-black tracking-widest rounded-full">{selectedJournal.year}年度特别选编</span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-2">{selectedJournal.title} (总{selectedJournal.period})</h4>
                    <p className="text-[10px] text-slate-400 mt-1">编辑委员会：广州银行总行运营管理部、机关工会宣传小组室联合编印。</p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 space-y-2">
                    <p className="text-[11px] font-extrabold text-slate-700">推荐阅读目录：</p>
                    <ul className="space-y-1.5 text-[10.5px] text-slate-500 font-sans">
                      <li className="flex justify-between hover:text-slate-950 cursor-pointer">
                        <span>1. 专稿：论广州银行总行如何借助“新质绿色信贷”盘活中小企运营活性</span>
                        <span className="font-mono text-slate-400">P03</span>
                      </li>
                      <li className="flex justify-between hover:text-slate-950 cursor-pointer">
                        <span>2. 实战：新柜面系统上线：如何平顺过渡十万笔以上的并发转账校验</span>
                        <span className="font-mono text-slate-400">P12</span>
                      </li>
                      <li className="flex justify-between hover:text-slate-950 cursor-pointer">
                        <span>3. 模范：佛山、深圳两家分行推进高架设备智慧一体化网点成效纪实</span>
                        <span className="font-mono text-slate-400">P19</span>
                      </li>
                      <li className="flex justify-between hover:text-slate-950 cursor-pointer">
                        <span>4. 沙龙：午后咖啡与反洗钱考评自测——越秀网点职工轻快学习角小景</span>
                        <span className="font-mono text-slate-400">P24</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2 flex gap-2 justify-end">
                    <button 
                      onClick={() => onOpenModal(`正在下载${selectedJournal.title}`, '数字文档PDF拉取', `系统检测到行员安全权限证书已挂载。正在将《${selectedJournal.title}_${selectedJournal.year}_${selectedJournal.period}.pdf》加密发包传送至您的行内企业OA客户端或指定打印服务器上，文件大小 12.8MB 。请勿将其通过网络非法投递。`, '数智期刊管理室')}
                      className="bg-gzred hover:bg-gzred-hover text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Icons.Download className="w-3.5 h-3.5" />
                      极速下载PDF
                    </button>
                    <button 
                      onClick={() => setSelectedJournal(null)}
                      className="text-[10px] font-bold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-full cursor-pointer"
                    >
                      我知道了
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
