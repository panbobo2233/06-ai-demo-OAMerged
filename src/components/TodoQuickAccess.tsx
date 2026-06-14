/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TodoItem, QuickAccessItem, TodoTab } from '../types';

interface TodoQuickAccessProps {
  todoItems: TodoItem[];
  quickAccessItems: QuickAccessItem[];
  onCompleteTodo: (id: string) => void;
  onSaveQuickAccess: (updated: QuickAccessItem[]) => void;
  onOpenModal: (title: string, category: string, body: string, stamp?: string) => void;
}

export default function TodoQuickAccess({
  todoItems,
  quickAccessItems,
  onCompleteTodo,
  onSaveQuickAccess,
  onOpenModal
}: TodoQuickAccessProps) {
  const [activeTab, setActiveTab] = useState<TodoTab>('todo');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [localConfig, setLocalConfig] = useState<QuickAccessItem[]>([]);

  // Count active items
  const countTodo = todoItems.filter(t => t.tabType === 'todo').length;
  const countToRead = todoItems.filter(t => t.tabType === 'to_read').length;

  // Filter items by tab
  const filteredTodos = todoItems.filter(item => item.tabType === activeTab);

  // Dynamic Lucide resolver
  const renderIcon = (iconName: string) => {
    const IconComp = (Icons as any)[iconName];
    if (IconComp) {
      return <IconComp className="w-5 h-5 select-none" />;
    }
    return <Icons.HelpCircle className="w-5 h-5" />;
  };

  const handleOpenConfig = () => {
    setLocalConfig([...quickAccessItems]);
    setShowConfigModal(true);
  };

  const handleToggleConfigItem = (id: string) => {
    setLocalConfig(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, enabled: !item.enabled };
      }
      return item;
    }));
  };

  const handleSaveConfig = () => {
    onSaveQuickAccess(localConfig);
    setShowConfigModal(false);
  };

  const handleTaskAction = (todo: TodoItem) => {
    if (todo.tabType === 'todo' || todo.tabType === 'to_read') {
      // Complete action
      onCompleteTodo(todo.id);
      
      // Let user know
      const cat = todo.tabType === 'todo' ? '待办处理完毕' : '待阅标识完成';
      const detail = `您已成功确认、审定或传阅了：《${todo.title}》。该公文已被记录系统归档，现已安全移动到后续流程链条中。`;
      onOpenModal(`事务审批通过：${todo.typeLabel}`, cat, detail, '全流程效能监控办');
    } else {
      // Just read detail 
      onOpenModal(`归档事务详情：${todo.title}`, `归档状态 • 已完成`, `该文件已由您在【${todo.date}】审定，并在OA办公网流程中通过备案。流程节点为：${todo.flowNode}。提交人：${todo.author}。`, '数字档案系统');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-4.5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6.5">
        
        {/* 待办事项 Left Grid Row (Takes 2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between">
          <div>
            {/* Header with Navigation Link Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-4.5 gap-3">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                <div className="w-1 bg-gzred h-4.5 rounded-full mr-2 shrink-0"></div>
                
                <button 
                  onClick={() => setActiveTab('todo')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
                    activeTab === 'todo' ? 'bg-gzred/5 text-gzred border border-gzred/10' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  待办({countTodo})
                </button>
                <button 
                  onClick={() => setActiveTab('to_read')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
                    activeTab === 'to_read' ? 'bg-gzred/5 text-gzred border border-gzred/10' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  待阅({countToRead})
                </button>
                <button 
                  onClick={() => setActiveTab('done')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
                    activeTab === 'done' ? 'bg-gzred/5 text-gzred border border-gzred/10' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  已办
                </button>
                <button 
                  onClick={() => setActiveTab('done_read')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
                    activeTab === 'done_read' ? 'bg-gzred/5 text-gzred border border-gzred/10' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  已阅
                </button>
              </div>

              <button 
                onClick={() => onOpenModal('广州银行流程督办和综合待办中心', '办公中心', '本模块聚合集成多端流程：HR系统、采购系统、财务报销系统、公文收发等。督办人员可通过“一键督促办理”向责任节点发出红头催办电报。')}
                className="text-[11px] text-slate-400 hover:text-gzred hover:underline transition-all cursor-pointer self-end sm:self-auto"
              >
                更多 &gt;&gt;
              </button>
            </div>

            {/* list Items in Selected Tab */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredTodos.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2"
                  >
                    <Icons.Inbox className="w-10 h-10 text-slate-200" />
                    <p className="text-xs">暂时没有需要处理的内容，行员可安心休整！</p>
                  </motion.div>
                ) : (
                  filteredTodos.map((todo) => (
                    <motion.div 
                      layout
                      key={todo.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="border border-slate-100 rounded-xl p-3.5 hover:bg-slate-50 transition-all duration-200 hover:shadow-2xs text-left relative overflow-hidden group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      {/* Left Dot bullet decoration */}
                      <div className="flex-1 flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gzred shrink-0 select-none"></div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-700 leading-snug truncate group-hover:text-slate-950 pr-4">
                            {todo.title}
                          </h4>
                          
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-400 mt-2 font-mono">
                            <span className="px-1.5 py-0.5 bg-red-50 text-gzred font-medium rounded-sm border border-red-100">
                              {todo.typeLabel}
                            </span>
                            <span className="text-slate-500">{todo.author}</span>
                            <span className="text-slate-300">|</span>
                            <span>{todo.date}</span>
                            <span className="text-slate-300">|</span>
                            <span className="text-slate-500 bg-slate-100 px-1 py-0.5 rounded-xs">{todo.flowNode}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action Trigger Box */}
                      <button
                        onClick={() => handleTaskAction(todo)}
                        className={`text-[10px] font-bold px-3.5 py-2.5 rounded-full transition-all shrink-0 cursor-pointer self-end sm:self-auto border ${
                          activeTab === 'todo' || activeTab === 'to_read'
                            ? 'bg-gzred hover:bg-gzred-hover text-white border-transparent hover:scale-103 active:scale-97 shadow-3xs'
                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        {activeTab === 'todo' ? '去处理' : activeTab === 'to_read' ? '去查阅' : activeTab === 'done' ? '已处理' : '已查阅'}
                      </button>

                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* 快捷入口 Right Grid Row (Grid of rounded colored cards) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4.5">
              <div className="flex items-center gap-2">
                <div className="w-1 bg-gzred h-4.5 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-800 tracking-wider">快捷入口</h3>
              </div>
              <button 
                onClick={handleOpenConfig}
                className="text-[11px] text-slate-400 hover:text-gzred hover:underline transition-all flex items-center gap-1 cursor-pointer"
              >
                <Icons.Settings className="w-3 h-3" />
                自定义 &gt;&gt;
              </button>
            </div>

            {/* Grid 4 Columns x 3 Rows */}
            <div className="grid grid-cols-4 gap-2.5">
              {quickAccessItems.filter(item => item.enabled).slice(0, 12).map((item) => (
                <div 
                  key={item.id}
                  onClick={() => onOpenModal(`快捷运行：${item.name}`, '内置捷径应用', `正在跳转部署并打开广银一体化企业应用子网：【${item.name}系统】。本安全沙箱将在此终端一键免登录直连。`, '内部应用一键直达中心')}
                  className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-50 cursor-pointer hover:bg-slate-50 hover:border-slate-100 hover:shadow-2xs transition-all text-center aspect-square group"
                >
                  <div className={`w-9.5 h-9.5 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 border ${item.colorClass} shadow-3xs`}>
                    {renderIcon(item.iconName)}
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium tracking-tight mt-2 select-none group-hover:text-slate-900 group-hover:font-semibold truncate w-full px-0.5">
                    {item.name}
                  </span>
                </div>
              ))}
              
              {quickAccessItems.filter(item => item.enabled).length === 0 && (
                <div className="col-span-4 py-8 text-center text-xs text-slate-400">
                  快捷入口已全部关闭，请点击右上角自定义添加。
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* 快捷入口 Customization Modal (Config Modal) */}
      <AnimatePresence>
        {showConfigModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gzred text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icons.Sliders className="w-4 h-4 text-gzgold" />
                  <h3 className="text-sm font-bold tracking-wider">自定义您的桌面快捷捷径</h3>
                </div>
                <button 
                  onClick={() => setShowConfigModal(false)}
                  className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full cursor-pointer"
                >
                  <Icons.X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid content to toggle */}
              <div className="p-4.5 max-h-96 overflow-y-auto space-y-2">
                <p className="text-[10.5px] text-slate-400 pb-2 border-b border-slate-100 text-left">
                  您可以自由启用、停用在首页桌面展示的 4x3 快捷应用矩阵。保持桌面整洁有助于更高效流转公事：
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  {localConfig.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => handleToggleConfigItem(item.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                        item.enabled 
                          ? 'bg-slate-50 border-slate-200 shadow-3xs' 
                          : 'bg-white border-slate-100 opacity-55 hover:opacity-85'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${item.colorClass}`}>
                          {renderIcon(item.iconName)}
                        </div>
                        <span className="text-11px font-bold text-slate-700 truncate">{item.name}</span>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                        item.enabled 
                          ? 'border-gzred bg-gzred text-white' 
                          : 'border-slate-300'
                      }`}>
                        {item.enabled && <Icons.Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="bg-slate-50 p-3.5 px-4.5 flex items-center justify-between border-t border-slate-100">
                <button 
                  onClick={() => setLocalConfig(localConfig.map(i => ({...i, enabled: true})))}
                  className="text-[10px] font-bold text-slate-500 hover:text-gzred cursor-pointer"
                >
                  一键全部启用
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowConfigModal(false)}
                    className="text-[11px] font-bold bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 px-3.5 py-1.5 rounded-full cursor-pointer"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleSaveConfig}
                    className="text-[11px] font-bold bg-gzred hover:bg-gzred-hover text-white px-4.5 py-1.5 rounded-full shadow-sm cursor-pointer"
                  >
                    保存设置
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
