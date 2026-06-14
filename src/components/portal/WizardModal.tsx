import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, User, HelpCircle, Calendar, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { TaskItem } from './types';

interface WizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitFlow: (newTask: Omit<TaskItem, 'id' | 'date'>) => void;
  presetCategory?: string;
}

export default function WizardModal({
  isOpen,
  onClose,
  onSubmitFlow,
  presetCategory = '出差安排'
}: WizardModalProps) {
  const [step, setStep] = useState(1);
  const [formCategory, setFormCategory] = useState(presetCategory);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'urgent' | 'normal' | 'low'>('normal');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync presetCategory whenever dynamic props trigger
  useEffect(() => {
    if (presetCategory) {
      setFormCategory(presetCategory);
      setStep(1);
      setShowSuccess(false);
      
      // Auto-populate intelligent titles relative to selection
      if (presetCategory === '请假申请') {
        setTitle('关于 申请休年假/病假的流转申请呈批');
      } else if (presetCategory === '出差安排') {
        setTitle('关于 前往广州分行进行业务核查的差旅申请签报');
      } else if (presetCategory === '会议预定') {
        setTitle('关于 组织行内部署会议多功能会议室预订签报');
      } else {
        setTitle('新建广州银行办公审批签呈');
      }
    }
  }, [presetCategory, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmitFlow({
      title,
      content: `【申请理由/时间区间】: ${startDate || '即日'} 至 ${endDate || '另行通知'}\n\n【详情备注】: ${content}`,
      sender: '管理员 (我)',
      type: 'initiated',
      status: 'pending',
      priority,
      category: formCategory
    });

    setShowSuccess(true);
    setStep(3);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setStartDate('');
    setEndDate('');
    setStep(1);
    setShowSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 cursor-pointer"
          ></motion.div>

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full z-50 border border-gray-100 overflow-hidden flex flex-col max-h-[80vh]"
            id="wizard-modal-panel"
          >
            {/* Header section */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 select-none">
              <div className="flex items-center space-x-2">
                <ClipboardCheck className="text-brand-red animate-pulse" size={18} />
                <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>
                  广银数字化流程提呈助手
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-750 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Stepper indicators header */}
            {!showSuccess && (
              <div className="flex items-center justify-center space-x-4 text-xs font-semibold text-gray-400 mb-6 bg-gray-50/70 p-2 rounded-xl border border-gray-100/50 select-none">
                <span className={`${step === 1 ? 'text-brand-red font-bold' : 'text-gray-400'}`}>1. 选拔公文类目</span>
                <span className="text-gray-300">➔</span>
                <span className={`${step === 2 ? 'text-brand-red font-bold' : 'text-gray-400'}`}>2. 编写申报属性</span>
              </div>
            )}

            {/* Step content scrollable container */}
            <div className="flex-1 overflow-y-auto pr-1">
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    请选择您要提交的流程项目:
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: '请假申请', desc: '事假、生病、年假带薪休假审批', color: 'border-rose-200 hover:bg-rose-50/50 hover:border-rose-500' },
                      { name: '出差安排', desc: '差旅报销或行外差旅报备签批', color: 'border-blue-200 hover:bg-blue-50/50 hover:border-blue-500' },
                      { name: '会议预定', desc: '总行大中型多功能学术会议室预约', color: 'border-emerald-200 hover:bg-emerald-50/50 hover:border-emerald-500' }
                    ].map((opt) => (
                      <button
                        key={opt.name}
                        onClick={() => {
                          setFormCategory(opt.name);
                          // Auto title tweak based on selection
                          if (opt.name === '请假申请') setTitle('关于 申请休年假/病假的流转申请呈批');
                          else if (opt.name === '出差安排') setTitle('关于 前往广州分行进行业务核查的差旅申请签报');
                          else if (opt.name === '会议预定') setTitle('关于 组织行内部署会议多功能会议室预订签报');
                          setStep(2);
                        }}
                        className={`p-3.5 border text-left rounded-xl transition-all hover:shadow-sm duration-200 cursor-pointer ${
                          formCategory === opt.name
                            ? 'bg-red-50/60 border-brand-red ring-1 ring-brand-red ring-opacity-20'
                            : 'bg-white ' + opt.color
                        }`}
                      >
                        <span className="text-xs font-bold text-gray-800 block mb-1">{opt.name}</span>
                        <span className="text-[10px] text-gray-400 leading-tight block">{opt.desc}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 text-[11px] text-gray-500 border border-gray-100/50 leading-relaxed">
                    <span className="font-bold text-gray-700 block mb-1">【操作贴士】</span>
                    这里对接了广州银行全行公文流管理中台（EKP）。申请提交后，会同步触发您的主管、分管副行长会签机制，请务必详实填写信息要素。
                  </div>

                  <div className="flex justify-end pt-4 select-none">
                    <button
                      onClick={() => setStep(2)}
                      className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold px-4 py-2 rounded-lg transition-transform active:scale-95 cursor-pointer shadow-md shadow-red-100"
                    >
                      下一步：填写表单
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200">
                  {/* Category confirmation status tag */}
                  <div className="flex items-center justify-between bg-red-50/30 border border-red-50 rounded-lg p-2 px-3 text-xs">
                    <span className="text-gray-500">当前流程类型 :</span>
                    <span className="font-bold text-brand-red px-2 py-0.5 bg-red-55 bg-white/70 rounded shadow-sm">
                      {formCategory}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">
                      公文呈批标题 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#f2f4f7] focus:bg-white focus:ring-2 focus:ring-brand-red border-0 outline-none rounded-lg px-3 py-2 text-xs text-gray-700 font-semibold"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="关于请假、出差报备的正式标题"
                      required
                    />
                  </div>

                  {/* Date fields row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">
                        起始日期 / 时间
                      </label>
                      <input
                        type="date"
                        className="w-full bg-[#f2f4f7] focus:bg-white border-0 outline-none rounded-lg p-2 text-xs text-gray-700"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">
                        截止日期 / 结束
                      </label>
                      <input
                        type="date"
                        className="w-full bg-[#f2f4f7] focus:bg-white border-0 outline-none rounded-lg p-2 text-xs text-gray-700"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Priority and supervisor details row */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">
                      紧急系数 (优先级)
                    </label>
                    <div className="grid grid-cols-3 gap-2 select-none">
                      {(['low', 'normal', 'urgent'] as const).map((pr) => {
                        const labels = { low: '普通', normal: '常规', urgent: '紧急加急' };
                        const styles = {
                          low: 'border-gray-200 hover:bg-gray-50 text-gray-600',
                          normal: 'border-blue-200 hover:bg-blue-50 text-blue-600',
                          urgent: 'border-red-200 hover:bg-red-50 text-red-600'
                        };
                        const activeStyles = {
                          low: 'bg-gray-100 border-gray-300 text-gray-800 font-bold',
                          normal: 'bg-blue-100/50 border-blue-500 text-blue-800 font-bold',
                          urgent: 'bg-red-100/50 border-brand-red text-brand-red font-bold animate-pulse'
                        };
                        const isMatch = priority === pr;
                        return (
                          <button
                            key={pr}
                            type="button"
                            onClick={() => setPriority(pr)}
                            className={`py-1.5 px-3 border rounded-lg text-xs transition-all pointer cursor-pointer ${
                              isMatch ? activeStyles[pr] : styles[pr]
                            }`}
                          >
                            {labels[pr]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Detailed Description content */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">
                      申报事由及详细说明 (正文) <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-[#f2f4f7] focus:bg-white focus:ring-2 focus:ring-brand-red border-0 outline-none rounded-lg px-3 py-2 text-xs text-gray-600 leading-relaxed font-sans"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="请详细叙述出差目的地、申请时间及工作AB角交接具体情况，有助于领导及合规部门极速审批。"
                      required
                    ></textarea>
                  </div>

                  {/* Action buttons footer */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2 select-none">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-gray-500 hover:text-gray-950 font-bold cursor-pointer"
                    >
                      上一步：重新选类
                    </button>
                    <button
                      type="submit"
                      className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center space-x-1 transition-transform active:scale-95 cursor-pointer shadow-md shadow-red-100"
                    >
                      <Send size={12} className="mr-1" />
                      <span>送领导签批</span>
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && showSuccess && (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in-95 duration-300">
                  <motion.div
                    initial={{ scale: 0.8, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200 shadow-lg shadow-emerald-50"
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1 font-sans">
                    全行公文流分流提呈成功！
                  </h4>
                  <p className="text-xs text-gray-400 max-w-sm mb-6 leading-relaxed">
                    您的“{formCategory}”流程单据已经成功分流至中台，对应编号为 <strong>GZ-{Math.floor(100000 + Math.random() * 900000)}</strong>。领导审批通过或退回后，您将在“我发起的”中收到即时微流状态通知。
                  </p>
                  <div className="flex space-x-3 select-none">
                    <button
                      onClick={resetForm}
                      className="border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer"
                    >
                      再开一单
                    </button>
                    <button
                      onClick={onClose}
                      className="bg-brand-red hover:bg-brand-red-hover text-white px-5 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md shadow-red-100"
                    >
                      完成并返回
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
