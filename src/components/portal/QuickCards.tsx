import React from 'react';
import { 
  Folder, 
  UserPlus, 
  Clock, 
  Layers, 
  FileText, 
  Mail, 
  FileCheck, 
  Plus, 
  Target 
} from 'lucide-react';
import { TaskType } from './types';

interface QuickCardItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  bgIconColor: string;
  badgeCount?: number;
  onClick: () => void;
}

interface QuickCardsProps {
  todoCount: number;
  unreadCount: number;
  onOpenDrawer: (tab: TaskType) => void;
  onOpenCalendar: () => void;
  onOpenDirectory: () => void;
  onOpenWizard: () => void;
}

export default function QuickCards({
  todoCount,
  unreadCount,
  onOpenDrawer,
  onOpenCalendar,
  onOpenDirectory,
  onOpenWizard
}: QuickCardsProps) {

  const cardItems: QuickCardItem[] = [
    {
      id: 'schedule',
      name: '我的日程',
      icon: <Folder size={24} className="text-amber-500" />,
      bgIconColor: 'bg-amber-50',
      onClick: onOpenCalendar
    },
    {
      id: 'directory',
      name: '通讯录',
      icon: <UserPlus size={24} className="text-emerald-500" />,
      bgIconColor: 'bg-emerald-50',
      onClick: onOpenDirectory
    },
    {
      id: 'emails',
      name: '未读邮件',
      icon: <Clock size={24} className="text-red-500" />,
      bgIconColor: 'bg-red-50',
      badgeCount: unreadCount,
      onClick: () => onOpenDrawer('unread')
    },
    {
      id: 'initiated',
      name: '我发起的',
      icon: <Layers size={24} className="text-blue-500" />,
      bgIconColor: 'bg-blue-55 bg-blue-50',
      onClick: () => onOpenDrawer('initiated')
    },
    {
      id: 'todo',
      name: '我的待办',
      icon: <FileText size={24} className="text-rose-500" />,
      bgIconColor: 'bg-rose-50',
      badgeCount: todoCount,
      onClick: () => onOpenDrawer('todo')
    },
    {
      id: 'completed',
      name: '我的已办',
      icon: <Mail size={24} className="text-orange-500" />,
      bgIconColor: 'bg-orange-50',
      onClick: () => onOpenDrawer('done')
    },
    {
      id: 'to-read',
      name: '待阅',
      icon: <FileCheck size={24} className="text-teal-500" />,
      bgIconColor: 'bg-teal-50',
      onClick: () => onOpenDrawer('unread')
    },
    {
      id: 'new-process',
      name: '新建流程',
      icon: <Plus size={24} className="text-indigo-500" />,
      bgIconColor: 'bg-indigo-50',
      onClick: onOpenWizard
    },
    {
      id: 'read',
      name: '已阅',
      icon: <Target size={24} className="text-pink-500" />,
      bgIconColor: 'bg-pink-50',
      onClick: () => onOpenDrawer('done')
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3.5 h-full" id="quick-cards-grid">
      {cardItems.map((card) => (
        <button
          key={card.id}
          onClick={card.onClick}
          className="bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center relative p-4 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 group text-center cursor-pointer select-none"
          id={`quick-card-${card.id}`}
        >
          {/* Badge indicator on top-right of the card */}
          {card.badgeCount !== undefined && card.badgeCount > 0 && (
            <span
              className="absolute -top-[5px] right-2.5 bg-red-650 bg-red-500 text-white text-[10px] leading-none font-bold px-1.5 py-0.5 rounded-full shadow-sm z-10 scale-90 border-2 border-white ring-red-300 ring-1"
              id={`quick-badge-${card.id}`}
            >
              {card.badgeCount}
            </span>
          )}

          {/* Icon frame inside card */}
          <div className={`w-12 h-12 rounded-xl ${card.bgIconColor} flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform duration-200 shadow-sm`}>
            {card.icon}
          </div>

          {/* Action text */}
          <span className="text-xs text-gray-700 font-medium tracking-wide">
            {card.name}
          </span>
        </button>
      ))}
    </div>
  );
}
