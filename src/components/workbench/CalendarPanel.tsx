import React, { useState, useEffect } from 'react';

interface CalendarPanelProps {
  viewMode?: 'leader' | 'full';
}

export default function CalendarPanel({ viewMode }: CalendarPanelProps) {
  const isLeader = viewMode === 'leader';
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

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
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col select-none">
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

        {isLeader && (
          <div className="flex items-center justify-end mt-1 space-x-2 text-[10px] text-gray-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>实时时钟</span>
          </div>
        )}
      </div>
    </div>
  );
}
