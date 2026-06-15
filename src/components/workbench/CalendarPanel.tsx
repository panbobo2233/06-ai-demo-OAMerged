import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { CalendarEvent } from './types';

interface CalendarPanelProps {
  viewMode?: 'leader' | 'full';
  events: CalendarEvent[];
  onDeleteEvent?: (id: string) => void;
}

function getEncouragement(hour: number): string {
  if (hour >= 6 && hour < 9) {
    return '一日之计在于晨，今天也要元气满满！☀️';
  } else if (hour >= 9 && hour < 12) {
    return '专注高效，每一份努力都在成就更好的自己！💪';
  } else if (hour >= 12 && hour < 14) {
    return '午餐愉快，休息片刻再出发！🍵';
  } else if (hour >= 14 && hour < 18) {
    return '下午好，再接再厉，胜利在望！🚀';
  } else if (hour >= 18 && hour < 21) {
    return '辛苦了，今天的付出终有回报！🌟';
  } else {
    return '夜深了，注意休息，明天继续加油！🌙';
  }
}

export default function CalendarPanel({ viewMode, events, onDeleteEvent }: CalendarPanelProps) {
  const isLeader = viewMode === 'leader';
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [encouragement, setEncouragement] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hh}:${mm}:${ss}`);

      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      setDateStr(`${year}年${month}月${day}日 ${weekdays[now.getDay()]}`);

      setEncouragement(getEncouragement(now.getHours()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string) => {
    if (type === '会议安排') return Icons.Video;
    return Icons.Calendar;
  };

  return (
    <div className="w-full flex flex-col select-none space-y-3">
      {/* 时钟卡片 */}
      <div className={`bg-[#1b233a] rounded-lg text-white relative shadow-md overflow-hidden flex flex-col justify-between ${
        isLeader ? 'p-4 h-auto' : 'p-5 h-34'
      }`}>
        {!isLeader && (
          <div className="absolute right-0 top-0 h-16 w-16 bg-red-600/10 rounded-bl-full pointer-events-none"></div>
        )}

        <div className="flex items-center justify-between z-10">
          <span className={`font-medium text-gray-300 tracking-wide ${isLeader ? 'text-[14px]' : 'text-[12px]'}`}>
            {dateStr}
          </span>
        </div>

        <div className="mt-2 z-10">
          <span className={`font-mono font-light tracking-widest text-white ${isLeader ? 'text-3xl' : 'text-4xl'}`}>
            {timeStr}
          </span>
        </div>

        {/* 鸡汤鼓励语 */}
        <div className="mt-2 z-10">
          <p className={`text-amber-300/80 italic tracking-wide ${isLeader ? 'text-[11px]' : 'text-[12px]'}`}>
            {encouragement}
          </p>
        </div>

        {isLeader && (
          <div className="flex items-center justify-end mt-1 space-x-2 text-[10px] text-gray-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>实时时钟</span>
          </div>
        )}
      </div>

      {/* 日程模块 */}
      <div className="bg-white rounded-lg p-4 shadow-xs border border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold text-gray-500">今日日程</span>
          <span className="text-[10px] text-gray-400">{events.length} 项</span>
        </div>
        {events.length === 0 ? (
          <p className="text-[11px] text-gray-400 text-center py-3">今日暂无日程安排</p>
        ) : (
          <div className="space-y-2.5">
            {events.slice(0, 3).map((event) => {
              const EventIcon = getEventIcon(event.type);
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-2.5 p-2 rounded-md hover:bg-gray-50 transition-colors group"
                >
                  <div className={`shrink-0 w-6 h-6 rounded flex items-center justify-center ${
                    event.type === '会议安排' ? 'bg-blue-50 text-blue-500' : 'bg-amber-50 text-amber-500'
                  }`}>
                    <EventIcon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-gray-700 leading-tight truncate">
                      {event.title}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{event.timeRange}</p>
                  </div>
                  {onDeleteEvent && (
                    <button
                      onClick={() => onDeleteEvent(event.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all shrink-0 cursor-pointer"
                    >
                      <Icons.X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
