export interface TaskItem {
  id: string;
  title: string;
  category: string; // e.g. "会议安排", "公文管理", "流程管理"
  type: '签报' | '发文' | '收文' | '印章' | '休假';
  urgent: boolean;
  sender: string;
  department?: string; // 发起部门
  time: string;
  section: '待办' | '待阅';
  unread: boolean;
  description?: string; // details for approval slip
  serialNumber?: string; // OA serial number e.g. GZ-OA-2020-0728
}

export interface CalendarEvent {
  id: string;
  timeRange: string;
  title: string;
  type: '会议安排' | '我的日历';
  description?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  iconName: string;
  badge?: number;
}
