import { TaskItem, CalendarEvent, MenuItem } from './types';

export const initialTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: '信息技术部第二团队周会',
    category: '会议安排',
    type: '签报',
    urgent: true,
    sender: '郑成功',
    department: '金融科技部',
    time: '2020-07-29 15:00',
    section: '待办',
    unread: true,
    serialNumber: 'GZ-QB-2020-0041',
    description: '审阅信息技术部第二团队2020年第三季度软件开发进度成果及生产环境部署规划。请各项目负责人提前准备汇报PPT材料。'
  },
  {
    id: 'task-2',
    title: '新OA测试sit合同模块001',
    category: '公文管理',
    type: '签报',
    urgent: false,
    sender: '李白',
    department: '零售金融管理部',
    time: '2020-07-28 14:10',
    section: '待办',
    unread: true,
    serialNumber: 'GZ-OA-SIT-001',
    description: '关于广州银行新一代数字化协同办公系统（OA）SIT测试合同审批及服务交付商准入资格审查报告。'
  },
  {
    id: 'task-3',
    title: '新OA测试sit合同模块002',
    category: '公文管理',
    type: '收文',
    urgent: false,
    sender: '李白',
    department: '零售金融管理部',
    time: '2020-07-28 10:20',
    section: '待办',
    unread: true,
    serialNumber: 'GZ-SW-SIT-002',
    description: '广东省政务服务数据管理局关于推广数字化办公系统对接标准技术指南的通知收文登记审批。'
  },
  {
    id: 'task-4',
    title: '新OA测试sit合同模块003',
    category: '流程管理',
    type: '其他', // 休假审批 is classified as '其他' or process
    urgent: false,
    sender: '郑成功',
    department: '金融科技部',
    time: '2020-07-28 09:30',
    section: '待办',
    unread: true,
    serialNumber: 'GZ-LC-VAC-003',
    description: '总行软件开发中心郑成功关于2020年暑期带薪年休假申请流程。共计5个工作日。'
  },
  {
    id: 'task-5',
    title: '新OA测试sit合同模块004',
    category: '流程管理',
    type: '收文',
    urgent: false,
    sender: '李白',
    department: '零售金融管理部',
    time: '2020-07-28 10:27',
    section: '待办',
    unread: true,
    serialNumber: 'GZ-SW-SIT-004',
    description: '软件外包开发服务框架协议（sit环境第三方对接模块）的技术说明材料及收签发。'
  },
  // Additional Mock Data to show interactive tab filters
  {
    id: 'task-6',
    title: '关于2020年度软件著作权申报流程的审核',
    category: '流程管理',
    type: '发文',
    urgent: true,
    sender: '杜甫',
    department: '公司金融部',
    time: '2020-07-27 16:30',
    section: '待办',
    unread: false,
    serialNumber: 'GZ-FW-2020-0112',
    description: '关于广州银行分布式账本关键技术专利与软件著作权申请流程。'
  },
  {
    id: 'task-7',
    title: '广州银行数据中心机房升级预算签报',
    category: '公文管理',
    type: '签报',
    urgent: false,
    sender: '白居易',
    department: '金融科技部',
    time: '2020-07-27 11:00',
    section: '待办',
    unread: false,
    serialNumber: 'GZ-QB-2020-0039',
    description: '关于天河数据中心B区高密机柜供电与智能冷却系统升级改造追加预算的申报意见。'
  },
  // To-Read Section Items (待阅) - Total 50 items represented
  {
    id: 'read-1',
    title: '【重要通知】关于全行部署网络安全防护演练的通知',
    category: '信息公告',
    type: '其他',
    urgent: true,
    sender: '系统管理员',
    department: '信息科技部',
    time: '2020-07-29 09:00',
    section: '待阅',
    unread: true,
    serialNumber: 'GZ-GG-2020-089',
    description: '根据监管部门关于提升金融信息系统网络对抗防御水平的要求，我行将于本周五晚开展蓝军渗透对抗实战模拟。请各系统运维保障人员到岗值班。'
  },
  {
    id: 'read-2',
    title: '2020年第二季度软件开发中心绩效优秀员工表彰决定',
    category: '信息公告',
    type: '其他',
    urgent: false,
    sender: '人力资源部',
    department: '人力资源部',
    time: '2020-07-28 17:00',
    section: '待阅',
    unread: true,
    serialNumber: 'GZ-RS-2020-045',
    description: '表彰在二季度全行核心业务群组敏捷迭代开发、零风险上线中做出突出贡献的一线软件工程师名单。'
  },
  {
    id: 'read-3',
    title: '信息技术规章：分行科技项目立项与采购审批指南',
    category: '规章制度',
    type: '签报',
    urgent: false,
    sender: '规章管理处',
    department: '合规管理部',
    time: '2020-07-28 10:15',
    section: '待阅',
    unread: true,
    serialNumber: 'GZ-GZ-2020-012',
    description: '针对各分行级自研或采购的中小科技项目，进一步规范审批额度流程及风险合规红线规范。'
  },
  {
    id: 'read-4',
    title: '关于印发《广州银行知识产权资产管理办法(暂行)》的通知',
    category: '规章制度',
    type: '发文',
    urgent: false,
    sender: '总行办公室',
    department: '总行办公室',
    time: '2020-07-26 14:00',
    section: '待阅',
    unread: false,
    serialNumber: 'GZ-FW-2020-0098',
    description: '明确各科技中心、创新实验室所沉淀的软件代码、发明专利、原型设计的归属、估值及授权标准。'
  },
  {
    id: 'read-5',
    title: '广州银行科技大楼食堂满意度调查结果汇总之阅处',
    category: '流程管理',
    type: '收文',
    urgent: false,
    sender: '行政后勤部',
    department: '行政后勤部',
    time: '2020-07-25 15:30',
    section: '待阅',
    unread: false,
    serialNumber: 'GZ-SW-2020-154',
    description: '2020年上半年度科技开发中心大楼食堂窗口及服务保障满意度调查反馈结果与后续改良举措说明。'
  }
];

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'cal-1',
    timeRange: '10:00-11:00',
    title: '会议安排 会议一',
    type: '会议安排',
    description: '讨论新OA办公协作系统的视觉还原与界面动效还原，确定第一期上线核心清单。'
  },
  {
    id: 'cal-2',
    timeRange: '12:00-13:00',
    title: '我的日历 需求说明书',
    type: '我的日历',
    description: '审核交付关于《广州银行数据可视化决策白皮书设计说明》的草稿规范与接口契约。'
  }
];

export const menuItems: MenuItem[] = [
  { id: 'flow', label: '流程管理', iconName: 'Workflow', badge: 36 },
  { id: 'archive', label: '公文管理', iconName: 'FileText' },
  { id: 'announcement', label: '信息公告', iconName: 'Volume2' },
  { id: 'rule', label: '规章制度', iconName: 'ShieldAlert' },
  { id: 'meeting1', label: '会议管理', iconName: 'Video' },
  { id: 'calendar1', label: '日程管理', iconName: 'Calendar' },
  { id: 'attend1', label: '考勤管理', iconName: 'UserCheck' },
  { id: 'news', label: '新闻管理', iconName: 'Globe' },
  { id: 'knowledge', label: '知识仓库', iconName: 'BookOpen' },
  { id: 'oversight', label: '督办管理', iconName: 'ClipboardCheck' }
];

export const quickActions = [
  { id: 'directory', label: '通讯录', iconName: 'Users', color: 'bg-indigo-600' },
  { id: 'email', label: '邮箱', iconName: 'Mail', color: 'bg-sky-600', badge: 5 },
  { id: 'new-process', label: '新建流程', iconName: 'PlusCircle', color: 'bg-emerald-600' },
  { id: 'draft-dispatch', label: '发文拟稿', iconName: 'FileEdit', color: 'bg-teal-600' },
  { id: 'receive-reg', label: '收文登记', iconName: 'FileSymlink', color: 'bg-amber-600' },
  { id: 'draft-report', label: '签报拟稿', iconName: 'Bookmark', color: 'bg-cyan-600' },
  { id: 'more', label: '更多', iconName: 'Grid', color: 'bg-slate-600' }
];
