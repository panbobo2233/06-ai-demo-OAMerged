import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowLeft, Mail, ChevronRight, CheckCircle, FileText, BadgeAlert, AlertCircle, Trash2 } from 'lucide-react';
import { TaskItem, TaskType } from './types';

interface TaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: TaskItem[];
  activeTab: TaskType;
  setActiveTab: (tab: TaskType) => void;
  onApproveTask: (taskId: string) => void;
  onRejectTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskDrawer({
  isOpen,
  onClose,
  tasks,
  activeTab,
  setActiveTab,
  onApproveTask,
  onRejectTask,
  onDeleteTask
}: TaskDrawerProps) {
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  // Filter tasks based on active category tab
  const filteredTasks = tasks.filter(t => t.type === activeTab);

  const getPriorityClasses = (p: string) => {
    switch (p) {
      case 'urgent':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'normal':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      default:
        return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const getPriorityLabel = (p: string) => {
    if (p === 'urgent') return '紧急';
    if (p === 'normal') return '常规';
    return '普通';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">已同意 (已完结)</span>;
      case 'rejected':
        return <span className="bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold">已退回 (拒绝)</span>;
      case 'unread':
        return <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[9px] font-extrabold animate-pulse">UNREAD</span>;
      case 'read':
        return <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded text-[10px] font-medium">已读</span>;
      default:
        return <span className="bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">等待审批中</span>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur with exit conditions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 cursor-pointer"
          ></motion.div>

          {/* Sliding Content Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[500px] bg-[#f8fafc] shadow-2xl z-50 flex flex-col h-full border-l border-gray-100"
            id="task-drawer-panel"
          >
            {/* Drawer Header line */}
            <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-2">
                <FileText className="text-brand-red" size={18} />
                <h2 className="text-sm font-bold text-gray-900 font-sans" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>
                  广银协同工作流中心
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* List vs Detail Switch */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {selectedTask ? (
                /* Task Detail View */
                <div className="flex-col h-full flex bg-white">
                  {/* Back to list navigation */}
                  <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center">
                    <button
                      onClick={() => setSelectedTask(null)}
                      className="flex items-center text-xs text-gray-600 hover:text-brand-red cursor-pointer pr-3"
                    >
                      <ArrowLeft size={14} className="mr-1.5" /> 返回列表
                    </button>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-xs text-gray-400 ml-3 truncate font-medium">公文精细流转详情</span>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityClasses(selectedTask.priority)}`}>
                          {getPriorityLabel(selectedTask.priority)}优先级
                        </span>
                        {getStatusBadge(selectedTask.status)}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 leading-snug">{selectedTask.title}</h3>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-xs border border-gray-100">
                      <div className="flex justify-between">
                        <span className="text-gray-400">发起人员 :</span>
                        <span className="font-semibold text-gray-700">{selectedTask.sender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">呈批日期 :</span>
                        <span className="font-mono text-gray-700">{selectedTask.date}</span>
                      </div>
                      {selectedTask.category && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">所属类别 :</span>
                          <span className="bg-blue-50 text-blue-600 px-1.5 rounded text-[10px] font-bold">{selectedTask.category}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">流申正文 (描述)</h4>
                      <div className="bg-[#fcfdfe] border border-gray-100 rounded-xl p-4 text-xs text-gray-600 leading-relaxed whitespace-pre-wrap min-h-32">
                        {selectedTask.content || '暂无流程申报具体正文说明。此申请为标准行政审批，请参阅随附纸质或电子附件。'}
                      </div>
                    </div>

                    {/* Simulation logs */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">流程电子签批轨迹</h4>
                      <div className="space-y-4 relative pl-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                        <div className="relative">
                          <span className="absolute -left-4 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-2 ring-emerald-100"></span>
                          <div className="text-xs">
                            <span className="font-bold text-gray-800">发文启始</span>
                            <p className="text-[10px] text-gray-400">{selectedTask.sender} 在 {selectedTask.date} 提请审批</p>
                          </div>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-4 w-3 h-3 bg-blue-500 rounded-full border-2 border-white ring-2 ring-blue-100"></span>
                          <div className="text-xs">
                            <span className="font-bold text-gray-800">总行运营工作台分发</span>
                            <p className="text-[10px] text-gray-400">系统于提呈0.5分钟后自动校准流向分管专席</p>
                          </div>
                        </div>
                        {selectedTask.status !== 'pending' && (
                          <div className="relative">
                            <span className={`absolute -left-4 w-3 h-3 ${selectedTask.status === 'approved' ? 'bg-emerald-500 ring-emerald-100' : 'bg-red-500 ring-rose-100'} rounded-full border-2 border-white ring-2`}></span>
                            <div className="text-xs">
                              <span className="font-bold text-gray-800">
                                {selectedTask.status === 'approved' ? '主管会签同意' : '会签退回/挂起'}
                              </span>
                              <p className="text-[10px] text-gray-400">操作人: 广州银行管理员 (我) 审定完毕</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Approve or reject pending triggers footer */}
                  {selectedTask.type === 'todo' && selectedTask.status === 'pending' && (
                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center space-x-3">
                      <button
                        onClick={() => {
                          onRejectTask(selectedTask.id);
                          setSelectedTask(null);
                        }}
                        className="flex-1 py-2 px-4 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-all active:scale-95 cursor-pointer text-center"
                      >
                        拒绝并退回
                      </button>
                      <button
                        onClick={() => {
                          onApproveTask(selectedTask.id);
                          setSelectedTask(null);
                        }}
                        className="flex-1 py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all active:scale-95 cursor-pointer text-center flex items-center justify-center space-x-1 shadow-md shadow-emerald-100"
                      >
                        <Check size={14} /> <span>核准通过</span>
                      </button>
                    </div>
                  )}

                  {/* Option to clear/delete emails or drafts */}
                  {(selectedTask.type === 'done' || selectedTask.type === 'initiated') && (
                    <div className="p-4 bg-gray-55 border-t border-gray-100 justify-end flex">
                      <button
                        onClick={() => {
                          onDeleteTask(selectedTask.id);
                          setSelectedTask(null);
                        }}
                        className="text-xs text-rose-500 hover:text-rose-700 flex items-center border border-rose-100 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 size={13} className="mr-1" /> 清理记录
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Tasks Tab List Selection */
                <div className="flex-1 flex flex-col h-full">
                  {/* Category select tab button header */}
                  <div className="bg-white border-b border-gray-100 grid grid-cols-4 select-none px-2 py-1 flex-shrink-0">
                    {(['todo', 'done', 'initiated', 'unread'] as TaskType[]).map((tab) => {
                      const labels = {
                        todo: '待审批',
                        done: '已核准',
                        initiated: '我发起的',
                        unread: '未读邮件'
                      };
                      const activeColors = {
                        todo: 'text-rose-600 border-rose-600 bg-rose-50/20',
                        done: 'text-emerald-600 border-emerald-600 bg-emerald-50/20',
                        initiated: 'text-blue-600 border-blue-600 bg-blue-50/20',
                        unread: 'text-amber-600 border-amber-600 bg-amber-50/20'
                      };
                      const isActive = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`py-2 text-xs font-semibold text-center border-b-2 transition-all cursor-pointer ${
                            isActive
                              ? `${activeColors[tab]} border-b-2 font-bold`
                              : 'text-gray-400 border-transparent hover:text-gray-700 hover:border-gray-200'
                          }`}
                        >
                          {labels[tab]}
                        </button>
                      );
                    })}
                  </div>

                  {/* List Content */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-r-4 hover:border-r-brand-red hover:shadow-red-50/35 transition-all duration-200 cursor-pointer text-left block relative group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] text-gray-400 font-medium font-mono">{task.date}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getPriorityClasses(task.priority)}`}>
                              {getPriorityLabel(task.priority)}
                            </span>
                          </div>
                          
                          <h4 className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-brand-red transition-colors pr-4">
                            {task.title}
                          </h4>
                          
                          <div className="mt-2.5 flex items-center justify-between text-[11px] text-gray-400">
                            <span className="truncate max-w-[170px]">发起: {task.sender}</span>
                            <div className="flex items-center text-brand-red text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                              <span>详情</span> <ChevronRight size={10} className="ml-0.5" />
                            </div>
                          </div>

                          {/* Quick indicators */}
                          {task.category && (
                            <span className="absolute top-4 right-1/4 bg-blue-50 text-[9px] font-semibold text-blue-600 px-1 rounded scale-90 opacity-60">
                              {task.category}
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-gray-400">
                          <CheckCircle size={22} className="text-gray-300" />
                        </div>
                        <div className="text-xs text-gray-400">
                          <p className="font-semibold text-gray-500">此页目已全部清空</p>
                          <p className="text-[10px] scale-90 text-gray-400 mt-1">
                            没有匹配该类目的工作流单据。
                          </p>
                        </div>
                      </div>
                    )}
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
