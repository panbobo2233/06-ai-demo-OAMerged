import { AppItem, TaskItem, ContactItem, ScheduleItem, BannerSlide } from './types.ts';

export const INITIAL_SLIDES: BannerSlide[] = [
  {
    id: 'slide-1',
    image: '/images/gz_bank_banner_1781424849050.jpg',
    subtitle: '广州银行企业文化理念 | 价值主张',
    title: '一起同行 一起共赢'
  },
  {
    id: 'slide-2',
    image: '/images/gz_bank_tech_slide_1781424897746.jpg',
    subtitle: '广州银行数字科技赋能 | 金融创新',
    title: '智数创新 臻微至远'
  }
];

export const INITIAL_APPS: AppItem[] = [
  { id: 'app-attendance', name: '考勤记录', iconName: 'SquareCheck', hasFlow: false, isActive: true },
  { id: 'app-business-trip', name: '出差安排', iconName: 'Briefcase', hasFlow: true, isActive: true },
  { id: 'app-expense', name: '费用管控', iconName: 'CircleDollarSign', hasFlow: false, isActive: true },
  { id: 'app-leave', name: '请假申请', iconName: 'UserPen', hasFlow: true, isActive: true },
  { id: 'app-meeting', name: '会议预定', iconName: 'Users', hasFlow: true, isActive: true },
  { id: 'app-party', name: '智慧党建', iconName: 'Shield', hasFlow: false, isActive: true },
  { id: 'app-crm', name: 'CRM系统', iconName: 'ShoppingCart', hasFlow: false, isActive: true },
  { id: 'app-credit-card', name: '信用卡管理系统', iconName: 'CreditCard', hasFlow: false, isActive: true },
  { id: 'app-public-info', name: '公共信息', iconName: 'FileText', hasFlow: false, isActive: true },
  { id: 'app-voucher', name: '凭证系统', iconName: 'BookOpen', hasFlow: false, isActive: true },
  { id: 'app-merchant', name: '商户管理系统', iconName: 'Store', hasFlow: false, isActive: true },
  { id: 'app-general-ledger', name: '大总账管理系统', iconName: 'Wallet', hasFlow: false, isActive: true },
  { id: 'app-cash-position', name: '头寸系统', iconName: 'Database', hasFlow: false, isActive: true },
  { id: 'app-credit-investigation', name: '征信系统', iconName: 'ShieldCheck', hasFlow: false, isActive: true },
  { id: 'app-collateral', name: '押品系统', iconName: 'UserCog', hasFlow: false, isActive: true },
];

export const INITIAL_TASKS: TaskItem[] = [
  // 我的待办 - 10 tasks initially
  {
    id: 'todo-1',
    title: '关于2026年第二季度零售金融业务报告审批',
    sender: '张晓明 (零售金融部)',
    date: '2026-06-13 15:30',
    type: 'todo',
    status: 'pending',
    priority: 'urgent',
    category: '出差安排',
    content: '请审批零售金融部提交的Q2业务拓展报告及预算分配草案，共计20页，涉及多网点运营支持。'
  },
  {
    id: 'todo-2',
    title: '零售贷款中心李伟的请假审批申请',
    sender: '李伟 (零售贷款中心)',
    date: '2026-06-14 09:00',
    type: 'todo',
    status: 'pending',
    priority: 'normal',
    category: '请假申请',
    content: '李伟因家庭私事申请年假5天，时间2026-06-16至2026-06-20。部门AB角已完成AB角色交接。'
  },
  {
    id: 'todo-3',
    title: '行内半年度党建工作总结大会会议室预订审批',
    sender: '刘艳 (党委办公室)',
    date: '2026-06-13 18:22',
    type: 'todo',
    status: 'pending',
    priority: 'low',
    category: '会议预定',
    content: '刘艳申请于2026-06-20 14:00预订总行1号多功能厅，召开半年度党建报告大会，参会人数约80人。'
  },
  {
    id: 'todo-4',
    title: '关于信息技术部外包服务商入场安全审批',
    sender: '陈刚 (信息技术部)',
    date: '2026-06-13 14:10',
    type: 'todo',
    status: 'pending',
    priority: 'urgent',
    content: '申请两名云技术外包项目经理入场安全白名单权限，并签发临时研发权限门禁。'
  },
  {
    id: 'todo-5',
    title: '广州分行营业部差旅差预算超标审批递呈',
    sender: '王晶晶 (广州分行)',
    date: '2026-06-13 11:45',
    type: 'todo',
    status: 'pending',
    priority: 'normal',
    content: '广州分行营业部提交前往深圳参加联行清算研讨会超标差旅费申请表，原因为展会周边酒店溢价。'
  },
  {
    id: 'todo-6',
    title: '关于更新广州银行手机银行APP V6.8安全合规报告',
    sender: '合规与风控部',
    date: '2026-06-12 17:00',
    type: 'todo',
    status: 'pending',
    priority: 'urgent',
    content: '手机银行新版本上线安全评测，需分管领导在2日内会签并盖公章。'
  },
  {
    id: 'todo-7',
    title: '授信审批部关于大型集团客户授信重组会商单',
    sender: '赵天宇 (授信审批部)',
    date: '2026-06-12 15:45',
    type: 'todo',
    status: 'pending',
    priority: 'normal',
    content: '对某城投集团新增3亿元授信额度方案的跨部门审核意见书。'
  },
  {
    id: 'todo-8',
    title: '商户收单系统API接口改造专项资金预算审批',
    sender: '孙力 (网络金融部)',
    date: '2026-06-12 10:30',
    type: 'todo',
    status: 'pending',
    priority: 'low',
    content: '商户收单改造追加20万元专项资金支持，用于联合第三方安全加固审计。'
  },
  {
    id: 'todo-9',
    title: '天河支行关于2026年夏季招聘岗位编制申请表',
    sender: '周梅 (人力资源部)',
    date: '2026-06-12 09:20',
    type: 'todo',
    status: 'pending',
    priority: 'normal',
    content: '天河支行申请增加两名资深理财经理编制，以应对周边社区旺盛的一手理财咨询需求。'
  },
  {
    id: 'todo-10',
    title: '总行大楼安保系统弱电间维保签报单',
    sender: '后勤保障部',
    date: '2026-06-11 16:30',
    type: 'todo',
    status: 'pending',
    priority: 'low',
    content: '例行防雷防静电装置、UPS电源季度安全监测服务合同会签。'
  },

  // 未读邮件 - 22 unread mails initially
  {
    id: 'mail-1',
    title: '【通知】关于2026年度广州银行端午节放假安排的通知及安全提示',
    sender: '办公室',
    date: '2026-06-14 01:00',
    type: 'unread',
    status: 'unread',
    priority: 'normal',
    content: '各位同事：端午节期间请按规定停机断电，加强各支行安全排查，值班人员须保持电话24小时畅通。'
  },
  {
    id: 'mail-2',
    title: '【重要】反洗钱合规自查与全系统风险点穿透式审计填报指导手册',
    sender: '法律合规部',
    date: '2025-06-13 16:00',
    type: 'unread',
    status: 'unread',
    priority: 'urgent',
    content: '根据监管最新要求，请于本周五下班前完成各支行网点的业务穿透合规自查表格填报。'
  },
  {
    id: 'mail-3',
    title: '【党建】广州银行“红动广银”优秀党日主题活动竞赛结果公示',
    sender: '党委组织部',
    date: '2026-06-13 14:00',
    type: 'unread',
    status: 'unread',
    priority: 'normal',
    content: '恭喜东山支行、黄埔支行党支部在此次红色微短视频和红色阅读分享中荣获一等奖。'
  },
  {
    id: 'mail-4',
    title: '【系统提示】总账大集中系统版本V4.2补丁升级停机通告',
    sender: '系统运行维护中心',
    date: '2026-06-13 12:00',
    type: 'unread',
    status: 'unread',
    priority: 'low',
    content: '本周六凌晨2:00-5:00将进行支付清算总账系统例行补丁升级，届时跨行交易可能出现短暂延时。'
  },

  // 我发起的
  {
    id: 'init-1',
    title: '关于2026年广州银行信息安全演练专项经费申报',
    sender: '管理员 (我)',
    date: '2026-06-12 11:20',
    type: 'initiated',
    status: 'pending',
    priority: 'normal',
    content: '申请演练专款5万元，用于聘请红蓝对抗渗透测试外包服务。'
  },
  {
    id: 'init-2',
    title: '2026年半年度工作计划会议差旅报销单',
    sender: '管理员 (我)',
    date: '2026-06-10 14:05',
    type: 'initiated',
    status: 'approved',
    priority: 'low',
    content: '深圳联络差旅费报销审批，共计850元（高铁往返+协议酒店一晚），已附发票照片。'
  },

  // 我的已办
  {
    id: 'done-1',
    title: '关于2026年新设珠江新城特色智慧支行选址报告审批',
    sender: '规划建设部',
    date: '2026-06-11 10:00',
    type: 'done',
    status: 'approved',
    priority: 'urgent',
    content: '同意该新网点规划、设计草案，后续递案提交至董事会审议。'
  },
  {
    id: 'done-2',
    title: '天河分行客户经理请假3天审批申请',
    sender: '张静静 (天河分行)',
    date: '2026-06-10 09:30',
    type: 'done',
    status: 'approved',
    priority: 'normal',
    content: '客户经理张静静因病请假3天，已附二级甲等医院医生开具的电子诊断证明。'
  }
];

export const INITIAL_CONTACTS: ContactItem[] = [
  { id: 'c-1', name: '张晓明', department: '零售金融部', role: '总经理', email: 'zhangxm@gzcb.com.cn', phone: '138-0020-1122', avatarColor: 'bg-red-500' },
  { id: 'c-2', name: '陈刚', department: '信息技术部', role: '资深系统架构师', email: 'chengang@gzcb.com.cn', phone: '139-2211-3344', avatarColor: 'bg-blue-500' },
  { id: 'c-3', name: '刘艳', department: '党委办公室', role: '副主任', email: 'liuyan@gzcb.com.cn', phone: '136-1234-5678', avatarColor: 'bg-emerald-500' },
  { id: 'c-4', name: '赵天宇', department: '授信审批部', role: '审贷官', email: 'zhaoty@gzcb.com.cn', phone: '135-9000-8888', avatarColor: 'bg-amber-500' },
  { id: 'c-5', name: '周梅', department: '人力资源局', role: '招聘部总监', email: 'zhoumei@gzcb.com.cn', phone: '186-8888-9999', avatarColor: 'bg-violet-500' },
  { id: 'c-6', name: '王晶晶', department: '广州分行营业部', role: '负责人', email: 'wangjj@gzcb.com.cn', phone: '137-0023-4567', avatarColor: 'bg-fuchsia-500' }
];

export const INITIAL_SCHEDULES: ScheduleItem[] = [
  { id: 's-1', date: '2026-06-14', time: '10:00 - 11:30', title: '零售金融业务二季度经营情况通报会', location: '总行大楼2501会议室', type: 'meeting' },
  { id: 's-2', date: '2026-06-14', time: '14:30 - 15:30', title: '与手机银行安全团队商量V6.8上线发布会', location: '线上视频会议系统', type: 'meeting' },
  { id: 's-3', date: '2026-06-14', time: '17:00 - 18:00', title: '检查反洗钱穿透审计上报进度', location: '总经理办公室', type: 'task' },
  { id: 's-4', date: '2026-06-15', time: '09:30 - 11:30', title: '新行员迎新致辞及职业规划分享', location: '总行多功能报告厅', type: 'meeting' },
  { id: 's-5', date: '2026-06-16', time: '14:00 - 16:30', title: '天河分行年度业务网点视察', location: '沙河街道天河东支行', type: 'meeting' }
];
