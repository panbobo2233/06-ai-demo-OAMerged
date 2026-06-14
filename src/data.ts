/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NewsItem, AnnouncementItem, TodoItem, QuickAccessItem, DocumentItem, JournalItem } from './types';

export const mockNews: NewsItem[] = [
  {
    id: 'news-1',
    title: '全国人民代表大会常务委员会工作报告',
    type: '重要时政',
    date: '2026-06-08',
    summary: '详细文本信息：报告全面回顾了过去一年的法治建设、立法规划和重点监督工作。会议听取并审议了关于深化金融体制改革、优化实体经济融资环境、推动粤港澳大湾区金融创新发展的专项报告，明确促进金融资本高效融通与实体产业深度耦合的战略路径。',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=800',
    isFeatured: true
  },
  {
    id: 'news-2',
    title: '广州银行党委召开2026年度党的建设暨纪检监察工作会议',
    type: '党建风采',
    date: '2026-06-09',
    isFeatured: false
  },
  {
    id: 'news-3',
    title: '重磅！广州银行获批筹建广东省低碳环保金融实验室试点',
    type: '业务创新',
    date: '2026-06-07',
    isFeatured: false
  },
  {
    id: 'news-4',
    title: '总行小微金融部：多举措实现“普惠金融直通车”网点全覆盖',
    type: '普惠工作',
    date: '2026-06-06',
    isFeatured: false
  },
  {
    id: 'news-5',
    title: '广州银行多渠道支持粤港澳大湾区实体产业提质增效深度调研报告',
    type: '深度调研',
    date: '2026-06-05',
    isFeatured: false
  }
];

export const mockAnnouncements: AnnouncementItem[] = [
  {
    id: 'ann-1',
    day: '01',
    yearMonth: '2026-05',
    title: '关于升级下发新版智能集成化核心柜面交易系统的预告通知',
    type: '系统升级通知'
  },
  {
    id: 'ann-2',
    day: '12',
    yearMonth: '2026-04',
    title: '广州银行2026年度支持粤港澳小微商户“减息让利”政策指引',
    type: '普惠金融政策'
  },
  {
    id: 'ann-3',
    day: '22',
    yearMonth: '2026-03',
    title: '关于总行珠江新城大厦B座机房精密空调维护更换期间部分业务暂时离线的通告',
    type: '后勤维护通告'
  },
  {
    id: 'ann-4',
    day: '27',
    yearMonth: '2026-01',
    title: '广州银行关于印发《基层网点标准化建设与文明规范服务指南》的决定',
    type: '标准化准则'
  }
];

export const mockTodoItems: TodoItem[] = [
  // 待办 (todo)
  {
    id: 'todo-1',
    title: '待办事项：阅核《每周一规》社会组织新闻宣传专栏项目首期款拨付申请',
    tabType: 'todo',
    typeLabel: '款项拨付',
    author: '张晓明',
    date: '2026-06-10 10:30:15',
    flowNode: '三级节点事项处理流程'
  },
  {
    id: 'todo-2',
    title: '待办事项：审阅资产管理部报送的《2026下半年不良资产包打包处置方案》',
    tabType: 'todo',
    typeLabel: '方案资产',
    author: '李丽华',
    date: '2026-06-09 14:12:00',
    flowNode: '部门联合会签流程'
  },
  {
    id: 'todo-3',
    title: '待办事项：批核广州分行天河支行“银发绿色驿站”便民改造追加预算方案',
    tabType: 'todo',
    typeLabel: '基建采购',
    author: '王建国',
    date: '2026-06-08 09:05:32',
    flowNode: '支行日常审批流'
  },
  {
    id: 'todo-4',
    title: '待办事项：签发合规管理部编发的《关于在全行开展存贷款利率自律排查的通知》',
    tabType: 'todo',
    typeLabel: '制度合规',
    author: '张晓明',
    date: '2026-06-08 17:45:00',
    flowNode: '行长办公会决议流程'
  },

  // 待阅 (to_read)
  {
    id: 'toread-1',
    title: '待阅：省地方金融监督管理局关于转发防范非法集资宣传月活动要求的公文',
    tabType: 'to_read',
    typeLabel: '外部来文',
    author: '局办公室',
    date: '2026-06-10 09:00:22',
    flowNode: '部门传阅登记'
  },
  {
    id: 'toread-2',
    title: '待阅：2026世界金融论坛暨数智化银行创新转型分论坛主旨演讲PPT共享汇编',
    tabType: 'to_read',
    typeLabel: '行业动态',
    author: '战略规划部',
    date: '2026-06-09 16:30:11',
    flowNode: '全行学习交流'
  },
  {
    id: 'toread-3',
    title: '待阅：关于本周日上午开展核心网络高可用主备冗余切换实战演练的技术白皮书',
    tabType: 'to_read',
    typeLabel: '安全生产',
    author: '信息技术部',
    date: '2026-06-08 11:20:00',
    flowNode: '技术条线知悉'
  },

  // 已办 (done)
  {
    id: 'done-1',
    title: '已办：关于越秀支行申请冠名“2026广州半程马拉松金融跑团”专项物资经费的请示',
    tabType: 'done',
    typeLabel: '品牌宣传',
    author: '林海燕',
    date: '2026-06-07 14:20:10',
    flowNode: '已归档'
  },
  {
    id: 'done-2',
    title: '已办：信用卡中心关于对违规分期付款账户执行提前核销的批量呈批件',
    tabType: 'done',
    typeLabel: '授信风控',
    author: '卡中心审批岗',
    date: '2026-06-06 18:02:44',
    flowNode: '已发放文号'
  },

  // 已阅 (done_read)
  {
    id: 'doneread-1',
    title: '已阅：《广州银行基层网点文明示范服务二十条禁令》全行宣导H5微课学习率通报',
    tabType: 'done_read',
    typeLabel: '培训反馈',
    author: '人力资源部',
    date: '2026-06-05 10:11:55',
    flowNode: '传阅完成'
  }
];

export const defaultQuickAccess: QuickAccessItem[] = [
  { id: 'qa-1', name: '流程管理', iconName: 'Workflow', colorClass: 'bg-violet-50 text-violet-600 border-violet-100', iconColor: '#7c3aed', isDefault: true, enabled: true },
  { id: 'qa-2', name: '通讯录', iconName: 'Users', colorClass: 'bg-rose-50 text-rose-600 border-rose-100', iconColor: '#e11d48', isDefault: true, enabled: true },
  { id: 'qa-3', name: '用品管理', iconName: 'Layers', colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100', iconColor: '#059669', isDefault: true, enabled: true },
  { id: 'qa-4', name: '用车管理', iconName: 'Car', colorClass: 'bg-blue-50 text-blue-600 border-blue-100', iconColor: '#2563eb', isDefault: true, enabled: true },
  
  { id: 'qa-5', name: '我参与的会议', iconName: 'Volume2', colorClass: 'bg-amber-50 text-amber-600 border-amber-100', iconColor: '#d97706', isDefault: true, enabled: true },
  { id: 'qa-6', name: '日程管理', iconName: 'Calendar', colorClass: 'bg-sky-50 text-sky-600 border-sky-100', iconColor: '#0284c7', isDefault: true, enabled: true },
  { id: 'qa-7', name: '任务管理', iconName: 'ClipboardList', colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-100', iconColor: '#4f46e5', isDefault: true, enabled: true },
  { id: 'qa-8', name: '新闻管理', iconName: 'Newspaper', colorClass: 'bg-teal-50 text-teal-600 border-teal-100', iconColor: '#0d9488', isDefault: true, enabled: true },
  
  { id: 'qa-9', name: '制度管理', iconName: 'ShieldAlert', colorClass: 'bg-cyan-50 text-cyan-600 border-cyan-100', iconColor: '#0891b2', isDefault: true, enabled: true },
  { id: 'qa-10', name: '公文管理', iconName: 'FileText', colorClass: 'bg-red-50 text-red-600 border-red-100', iconColor: '#dc2626', isDefault: true, enabled: true },
  { id: 'qa-11', name: '档案借阅', iconName: 'FolderClosed', colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100', iconColor: '#059669', isDefault: true, enabled: true },
  { id: 'qa-12', name: '议题管理', iconName: 'Hash', colorClass: 'bg-pink-50 text-pink-600 border-pink-100', iconColor: '#db2777', isDefault: true, enabled: true }
];

export const mockDocuments: DocumentItem[] = [
  // 总行工作动态
  { id: 'doc-h-1', title: '《每周一规》社会组织新闻宣传专栏项目招标公告', date: '2026-06-10', section: 'head' },
  { id: 'doc-h-2', title: '关于全行常态化开展个人金融账户全生命周期反洗钱监测的通知', date: '2026-06-09', section: 'head' },
  { id: 'doc-h-3', title: '广州银行总行资产负债管理委员会议事制度规程(2026修订本)', date: '2026-06-08', section: 'head' },
  { id: 'doc-h-4', title: '总行小微贷业务条线：数字化征信白名单核准及尽职免责细则通知', date: '2026-06-07', section: 'head' },
  { id: 'doc-h-5', title: '总行营业部关于优化天河主大厅社保制卡专窗排队动线的通报', date: '2026-06-05', section: 'head' },

  // 分行工作动态
  { id: 'doc-b-1', title: '深圳分行：联袂前海深港现代服务业合作区管理局落地科技科创贷', date: '2026-06-10', section: 'branch' },
  { id: 'doc-b-2', title: '佛山分行：关于向粤港澳大湾区智能智造基地投放2.5亿元中长期设备贷的快讯', date: '2026-06-09', section: 'branch' },
  { id: 'doc-b-3', title: '东莞分行：举行2026年度基层党支部精细化管理经验交流圆桌会', date: '2026-06-07', section: 'branch' },
  { id: 'doc-b-4', title: '惠州分行：积极推进“社保经办网点进银行”首批五家智慧网点名单落地', date: '2026-06-06', section: 'branch' },
  { id: 'doc-b-5', title: '中山分行：关于进一步强化消保宣导切实根治高收益理财陷阱的自查通告', date: '2026-06-04', section: 'branch' },

  // 栏目一
  { id: 'doc-c1-1', title: '《每周一规》社会组织新闻宣传专栏项目招标公告', date: '2026-06-10', section: 'column1' },
  { id: 'doc-c1-2', title: '关于印发《广州银行2026年夏季高温防暑劳动保护福利发放细则》的通知', date: '2026-06-09', section: 'column1' },
  { id: 'doc-c1-3', title: '广州银行党委关于对优秀基层服务团队授旗表彰的通报决定', date: '2026-06-08', section: 'column1' },
  { id: 'doc-c1-4', title: '总行工会联合会关于举办广州银行2026年“青春追梦，羽你同行”羽毛球比赛的通知', date: '2026-06-07', section: 'column1' },
  { id: 'doc-c1-5', title: '办公室：关于在夏季安全生产排查中杜绝高楼室外机支架松动风险的温馨提示', date: '2026-06-06', section: 'column1' },

  // 栏目二
  { id: 'doc-c2-1', title: '《每周一规》社会组织新闻宣传专栏项目招标公告', date: '2026-06-10', section: 'column2' },
  { id: 'doc-c2-2', title: '广州银行金融大厦配电房变压器负荷平衡切换及夜间断电调试公告', date: '2026-06-09', section: 'column2' },
  { id: 'doc-c2-3', title: '信息技术部：关于优化行内OA移动端应用免密登录指纹核验体验的通知', date: '2026-06-08', section: 'column2' },
  { id: 'doc-c2-4', title: '零售银行部：下发《2026年度广州银行“广银红”社福理财客户权益体系升级公告》', date: '2026-06-07', section: 'column2' },
  { id: 'doc-c2-5', title: '后勤保卫部：组织全行针对主楼高层消防联动疏散及防火门闭合气密性的常规自查', date: '2026-06-06', section: 'column2' },
  { id: 'doc-c2-6', title: '财务会计部：关于报送各条点、营业网点外汇资金存管备用额度清算账单的温馨备忘', date: '2026-06-05', section: 'column2' },

  // 栏目三
  { id: 'doc-c3-1', title: '《每周一规》社会组织新闻宣传专栏项目招标公告', date: '2026-06-10', section: 'column3' },
  { id: 'doc-c3-2', title: '总行审计部：关于开展2026年中期二级分行同业存放业务专项审计的下达函', date: '2026-06-09', section: 'column3' },
  { id: 'doc-c3-3', title: '广州银行关于做好极端汛期雷暴天气下防汛抗台专项自护救援物资常备的倡议书', date: '2026-06-08', section: 'column3' },
  { id: 'doc-c3-4', title: '合规管理部：关于编发《银行业反不正当竞争警示教育典型案例十则》的工作汇编', date: '2026-06-07', section: 'column3' },
  { id: 'doc-c3-5', title: '网络金融部：关于升级广银智付（广银POS）聚合条码支付终端离线扫码响应速率的公告', date: '2026-06-06', section: 'column3' },
  { id: 'doc-c3-6', title: '关于全大楼楼层公共饮水机净化滤芯季度更换名单及监测水质合格等级的公示反馈', date: '2026-06-05', section: 'column3' }
];

export const mockJournals: JournalItem[] = [
  {
    id: 'jou-1',
    year: '2026',
    period: '第三期',
    title: '运营之声',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'jou-2',
    year: '2026',
    period: '第二期',
    title: '运营之声',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'jou-3',
    year: '2026',
    period: '第一期',
    title: '运营之声',
    imageUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'jou-4',
    year: '2025',
    period: '第四期',
    title: '运营之声',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=200'
  }
];
