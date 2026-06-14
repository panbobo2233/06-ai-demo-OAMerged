import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Clock, Plus, Tag, Settings, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { ScheduleItem } from './types';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedules: ScheduleItem[];
  onAddSchedule: (newSchedule: Omit<ScheduleItem, 'id'>) => void;
}

export default function CalendarModal({
  isOpen,
  onClose,
  schedules,
  onAddSchedule
}: CalendarModalProps) {
  const [selectedDate, setSelectedDate] = useState('2026-06-14');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('09:00 - 10:30');
  const [newLocation, setNewLocation] = useState('总行大楼25F主视频厅');
  const [newType, setNewType] = useState<'meeting' | 'task' | 'personal'>('meeting');

  // Filter schedules based on selected date
  const filteredSchedules = schedules.filter(s => s.date === selectedDate);

  // Simple static June 2026 days representation
  // June 14, 2026 is Sunday, June 1st is Monday (ideal alignment)
  const juneDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const getDayClasses = (dayNum: number) => {
    const formattedDate = `2026-06-${dayNum.toString().padStart(2, '0')}`;
    const isActive = selectedDate === formattedDate;
    const hasEvents = schedules.some(s => s.date === formattedDate);

    if (isActive) {
      return 'bg-amber-500 text-white font-bold rounded-lg shadow-sm';
    }
    if (hasEvents) {
      return 'bg-amber-50 text-amber-800 border border-amber-200/60 font-semibold rounded-lg hover:bg-amber-100';
    }
    return 'text-gray-700 hover:bg-gray-100 rounded-lg hover:font-bold';
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddSchedule({
      date: selectedDate,
      time: newTime,
      title: newTitle,
      location: newLocation,
      type: newType
    });

    setNewTitle('');
    setShowAddForm(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with fade-in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 cursor-pointer"
          ></motion.div>

          {/* Centered large card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full z-50 border border-gray-100 overflow-hidden flex flex-col max-h-[80vh]"
            id="calendar-modal-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 select-none">
              <div className="flex items-center space-x-2">
                <Calendar className="text-amber-500 animate-pulse" size={18} />
                <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>
                  广银总行日程策划看板 (2026年6月)
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Split calendar and schedule listings */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Grid Calendar (md: 7 columns) */}
              <div className="md:col-span-7 flex flex-col select-none">
                <div className="flex items-center justify-between mb-4 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <div className="flex items-center text-xs font-bold text-gray-800">
                    <button className="p-1 hover:bg-gray-200 rounded cursor-pointer leading-none">‹</button>
                    <span className="mx-2.5">2026年 06月 (端午季)</span>
                    <button className="p-1 hover:bg-gray-200 rounded cursor-pointer leading-none">›</button>
                  </div>
                  <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">今天 : 06月14日</span>
                </div>

                {/* Day labels header */}
                <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 mb-2">
                  <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
                </div>

                {/* 30 grid cells representing days */}
                <div className="grid grid-cols-7 text-center text-xs gap-1.5 font-medium">
                  {juneDays.map((day) => {
                    const thisDate = `2026-06-${day.toString().padStart(2, '0')}`;
                    return (
                      <button
                        key={day}
                        onClick={() => {
                          setSelectedDate(thisDate);
                          setShowAddForm(false);
                        }}
                        className={`py-2 text-[11px] transition-all cursor-pointer select-none ${getDayClasses(day)}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Legend help info */}
                <div className="mt-4 flex items-center space-x-4 text-[10px] text-gray-400 border-t border-gray-50 pt-2.5">
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded bg-amber-500 block"></span>
                    <span>选中日期</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded bg-amber-50 border border-amber-200 block"></span>
                    <span>存在行签日程</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded hover:bg-gray-100 border border-gray-100 block"></span>
                    <span>空白日</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Schedule agenda listing for date (md: 5 columns) */}
              <div className="md:col-span-5 flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {selectedDate.split('-')[1]}月{selectedDate.split('-')[2]}日 的日程表 ({filteredSchedules.length})
                  </span>

                  {!showAddForm && (
                     <button
                       onClick={() => setShowAddForm(true)}
                       className="text-[10px] bg-amber-600 hover:bg-amber-700 font-bold text-white py-1 px-2.5 rounded-lg flex items-center space-x-0.5 cursor-pointer shadow-md shadow-amber-50"
                     >
                       <Plus size={10} /> <span>排新日程</span>
                     </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1" id="calendar-daily-list">
                  {showAddForm ? (
                    /* Embedded Add-Schedule Form */
                    <form onSubmit={handleCreateSchedule} className="space-y-3.5 p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs animate-in slide-in-from-right-3 duration-200">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-700">添加当日日程</span>
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="text-[10px] text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          取消
                        </button>
                      </div>

                      {/* Schedule subject */}
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 block mb-1">活动议程主题</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 outline-none focus:border-amber-500 text-xs text-gray-700 font-semibold"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="例如：三季度银企通部署例会"
                          required
                        />
                      </div>

                      {/* Time Slot */}
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 block mb-1">时间跨度 / 时段</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-gray-200 rounded p-1 text-xs text-gray-700 font-mono"
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          placeholder="09:30 - 11:30"
                        />
                      </div>

                      {/* Room Location */}
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 block mb-1">会议室 / 选址</label>
                        <input
                          type="text"
                          className="w-full bg-white border border-gray-200 rounded p-1 text-xs text-gray-700"
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          placeholder="大楼12层第一会议室"
                        />
                      </div>

                      {/* Type toggle */}
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 block mb-1">日程类别</label>
                        <div className="grid grid-cols-3 gap-1 grid-flow-row text-center font-bold">
                          {['meeting', 'task', 'personal'].map((ty) => {
                            const isMatch = newType === ty;
                            const labelMap = { meeting: '会议', task: '待办任务', personal: '私人备忘' };
                            return (
                              <button
                                key={ty}
                                type="button"
                                onClick={() => setNewType(ty as any)}
                                className={`py-1 text-[10px] rounded border transition-colors cursor-pointer ${
                                  isMatch
                                    ? 'bg-amber-100 border-amber-400 text-amber-800'
                                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                {labelMap[ty]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 rounded-lg flex items-center justify-center cursor-pointer shadow-inner animate-pulse-subtle"
                      >
                        <Check size={12} className="mr-1" /> 保存日程
                      </button>
                    </form>
                  ) : (
                    /* Daily schedules list details */
                    filteredSchedules.length > 0 ? (
                      filteredSchedules.map((schedule) => {
                        const styleMap = {
                          meeting: 'border-l-amber-500 bg-amber-50/30',
                          task: 'border-l-blue-500 bg-blue-50/20',
                          personal: 'border-l-emerald-500 bg-emerald-50/20'
                        };
                        return (
                          <div
                            key={schedule.id}
                            className={`border border-gray-100 border-l-4 rounded-xl p-3.5 space-y-2 relative group hover:shadow-sm transition-all ${
                              styleMap[schedule.type] || 'border-l-gray-400'
                            }`}
                          >
                            <h4 className="text-xs font-bold text-gray-800 leading-tight group-hover:text-amber-600 transition-colors">
                              {schedule.title}
                            </h4>
                            <div className="space-y-1 text-[10px] text-gray-400 leading-none">
                              <div className="flex items-center">
                                <Clock size={10} className="mr-1.5 flex-shrink-0" />
                                <span className="font-mono">{schedule.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin size={10} className="mr-1.5 flex-shrink-0" />
                                <span className="truncate">{schedule.location}</span>
                              </div>
                            </div>

                            {/* Bullet icon decoration indicating state */}
                            <span className="absolute top-1.5 right-2 bg-white/85 text-[8px] font-bold text-amber-700 border border-amber-200 px-1 py-0.5 rounded uppercase leading-none opacity-80 scale-90">
                              {schedule.type === 'meeting' ? '会议' : schedule.type === 'task' ? '代办' : '备忘'}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center space-y-2 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                        <span className="text-[11px] font-bold text-gray-400">目前暂无安排</span>
                        <p className="text-[10px] text-gray-400 px-4">
                          当天日程非常清朗，点击上方按钮添加新的会议纪要或行程安排吧。
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
