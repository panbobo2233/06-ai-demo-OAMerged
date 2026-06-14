import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders, ToggleLeft, Check, LayoutGrid, Info } from 'lucide-react';
import { AppItem } from './types';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  onToggleApp: (appId: string) => void;
  onRestoreDefaults: () => void;
}

export default function CustomizeModal({
  isOpen,
  onClose,
  apps,
  onToggleApp,
  onRestoreDefaults
}: CustomizeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 cursor-pointer"
          ></motion.div>

          {/* Centered card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 max-w-xl w-full z-50 border border-gray-100 overflow-hidden flex flex-col max-h-[80vh]"
            id="customize-modal-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 select-none">
              <div className="flex items-center space-x-2">
                <Sliders className="text-brand-red animate-pulse" size={17} />
                <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>
                  应用快捷入口个性化定制门户
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Sub-label banner */}
            <div className="bg-blue-50/50 border border-blue-100/60 rounded-xl p-3 mb-4 flex items-start space-x-2 text-[11px] text-blue-800 leading-relaxed">
              <Info size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <span>在这里定制您在广州银行工作台首页展示的快捷应用。勾选的应用将显示在主网格中，取消勾选则会收纳到「查看全部」快捷区中。</span>
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-2.5 pb-4">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => onToggleApp(app.id)}
                    className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer select-none transition-all duration-200 ${
                      app.isActive
                        ? 'border-brand-red bg-red-50/20 shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        app.isActive ? 'bg-brand-red text-white shadow-sm shadow-red-50' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <LayoutGrid size={15} />
                      </div>
                      <span className="text-xs font-bold text-gray-800 truncate">{app.name}</span>
                    </div>

                    {/* Custom toggle button */}
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                      app.isActive
                        ? 'border-brand-red bg-brand-red text-white'
                        : 'border-gray-200 bg-white'
                    }`}>
                      {app.isActive && <Check size={11} strokeWidth={3} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer triggers */}
            <div className="border-t border-gray-100 pt-4 mt-2 flex items-center justify-between select-none">
              <button
                onClick={onRestoreDefaults}
                className="text-xs text-gray-500 hover:text-brand-red font-bold flex items-center cursor-pointer"
              >
                <ToggleLeft size={14} className="mr-1.5" /> 恢复系统出厂应用配置
              </button>
              
              <button
                onClick={onClose}
                className="bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold px-5 py-2 rounded-lg transition-transform active:scale-95 cursor-pointer shadow-md shadow-red-100"
              >
                保存我的桌面
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
