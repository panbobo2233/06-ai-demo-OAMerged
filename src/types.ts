/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NewsItem {
  id: string;
  title: string;
  type: string;
  date: string;
  summary?: string;
  image?: string;
  isFeatured?: boolean;
}

export interface AnnouncementItem {
  id: string;
  day: string;
  yearMonth: string;
  title: string;
  type: string;
}

export type TodoTab = 'todo' | 'to_read' | 'done' | 'done_read';

export interface TodoItem {
  id: string;
  title: string;
  tabType: TodoTab;
  typeLabel: string;
  author: string;
  date: string;
  flowNode: string;
}

export interface QuickAccessItem {
  id: string;
  name: string;
  iconName: string;
  colorClass: string; // Tailwind colors for the icon bg
  iconColor: string; // Tailwind color for the icon glyph
  isDefault: boolean;
  enabled: boolean;
}

export interface DocumentItem {
  id: string;
  title: string;
  date: string;
  section: 'head' | 'branch' | 'column1' | 'column2' | 'column3';
}

export interface JournalItem {
  id: string;
  year: string;
  period: string; // e.g. "第X期"
  title: string; // 运营之声
  imageUrl: string;
}
