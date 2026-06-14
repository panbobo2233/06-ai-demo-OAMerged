export interface AppItem {
  id: string;
  name: string;
  iconName: string;
  hasFlow: boolean;
  isActive: boolean;
}

export type TaskType = 'todo' | 'done' | 'initiated' | 'unread';

export interface TaskItem {
  id: string;
  title: string;
  sender: string;
  date: string;
  type: TaskType;
  status: 'pending' | 'approved' | 'rejected' | 'unread' | 'read';
  priority: 'urgent' | 'normal' | 'low';
  content?: string;
  category?: string;
}

export interface ContactItem {
  id: string;
  name: string;
  department: string;
  role: string;
  email: string;
  phone: string;
  avatarColor: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  date: string; // YYYY-MM-DD
  title: string;
  location: string;
  type: 'meeting' | 'task' | 'personal';
}

export interface BannerSlide {
  id: string;
  image: string;
  subtitle: string;
  title: string;
}
