import React, { useState } from 'react';
import Sidebar from '../components/workbench/Sidebar';
import NewTaskModal from '../components/workbench/NewTaskModal';
import CalendarPanel from '../components/workbench/CalendarPanel';

import { TaskItem, CalendarEvent } from '../components/workbench/types';
import { initialTasks, initialCalendarEvents, menuItems, quickActions } from '../components/workbench/data';
import * as Icons from 'lucide-react';

interface WorkbenchPageProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  viewMode: 'leader' | 'full';
}

export default function WorkbenchPage({ searchTerm, onSearch, viewMode }: WorkbenchPageProps) {

  // --- Workspace States ---
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(initialCalendarEvents);

  // Active filter states
  const [currentSection, setCurrentSection] = useState<'待办' | '待阅' | '已处理'>('待办');
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState<string>('全部'); // 全部, 收文, 发文, 签报, 印章, 休假
  const [currentStatusFilter, setCurrentStatusFilter] = useState<'all' | 'pending' | 'done'>('pending');
  const [processedFilter, setProcessedFilter] = useState<'已办' | '已阅'>('已办'); // 已处理Tab下的子筛选
  const [selectedSidebarMenu, setSelectedSidebarMenu] = useState<string>('flow');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Editing User / Personal info State
  const [currentUser, setCurrentUser] = useState({
    name: '郑成功',
    dept: '总行软件开发中心'
  });

  // Modal open states
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  // Refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Floating Toast Notifications List State
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' | 'error' }[]>([]);

  // Show Toast helper
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // --- Reset All Data to initial screenshot state ---
  const handleResetData = () => {
    setTasks(initialTasks);
    setCalendarEvents(initialCalendarEvents);
    setCurrentSection('待办');
    setCurrentCategoryFilter('全部');
    setCurrentStatusFilter('pending');
    setSelectedSidebarMenu('flow');
    setCurrentUser({
      name: '郑成功',
      dept: '总行软件开发中心'
    });
    addToast('已将全站业务状态与演示日程恢复为截图默认配置！', 'info');
  };

  // --- Sync & Refresh Workbench ---
  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    addToast('正在连接总行OA公文数据库，刷新最新待办流转单...', 'info');
    
    setTimeout(() => {
      setIsRefreshing(false);
      // Let's add a fresh test item to simulate a real-time incoming task if the user refreshes!
      const hasRefreshedTask = tasks.some(t => t.id === 'task-refresh-sim');
      if (!hasRefreshedTask) {
        const simulatedTask: TaskItem = {
          id: 'task-refresh-sim',
          title: '【安全提示】数据机房防汛防雷紧急部署通告',
          category: '流程管理',
          type: '收文',
          urgent: true,
          sender: '总行安全管理委员会',
          department: '信息科技部',
          time: new Date().toISOString().replace('T', ' ').substring(0, 16),
          section: '待办',
          unread: true,
          serialNumber: `GZ-AQ-${new Date().getFullYear()}-028`,
          description: '关于启动广州分行信息机房在汛期高温期间的配电安全与不间断电源（UPS）的紧急负载冗余检测。请安全处在24小时内上传勘查底稿报告。'
        };
        setTasks(prev => [simulatedTask, ...prev]);
        addToast('刷新完毕！收到 1 条全新紧急待办流程指示。', 'success');
      } else {
        addToast('所有公文及工作台代办数据已刷新。', 'success');
      }
    }, 1200);
  };

  // --- Task Approvals & Flow callbacks ---
  const handleApproveTask = (id: string, comments: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: false, section: '待阅' as const } : t))
    );
    addToast(`审批签署成功！当前公文已被归档，并附言签署意见："${comments.substring(0, 16)}..."`, 'success');
  };

  const handleRejectTask = (id: string, comments: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: false, section: '待阅' as const } : t))
    );
    addToast(`公文已安全退回到拟稿节点！已附言退回原委："${comments.substring(0, 16)}..."`, 'info');
  };

  const handleForwardTask = (id: string, assignee: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, sender: assignee, unread: true } : t))
    );
    addToast(`流转分发成功！该呈批公文的主办节点已变更为员工：[${assignee}] 协同会审。`, 'success');
  };

  // --- Create Processes & Calendar Events ---
  const handleNewTaskSubmit = (newTaskData: Omit<TaskItem, 'id' | 'time' | 'unread' | 'section'>) => {
    const formattedTask: TaskItem = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      unread: true,
      section: '待办',
      serialNumber: `GZ-${newTaskData.type === '签报' ? 'QB' : newTaskData.type === '发文' ? 'FW' : newTaskData.type === '收文' ? 'SW' : newTaskData.type === '印章' ? 'YZ' : 'XJ'}-2020-00${tasks.length + 5}`
    };
    setTasks((prev) => [formattedTask, ...prev]);
    addToast(`成功提交一份 [${newTaskData.type}] 至待办节点！主题: ${newTaskData.title.substring(0, 15)}...`, 'success');
  };

  const handleAddCalendarEvent = (newEventData: Omit<CalendarEvent, 'id'>) => {
    const formattedEvent: CalendarEvent = {
      ...newEventData,
      id: `cal-${Date.now()}`
    };
    setCalendarEvents((prev) => [...prev, formattedEvent]);
    addToast(`成功增加日程安排：[${newEventData.title}] (${newEventData.timeRange})`, 'success');
  };

  const handleDeleteCalendarEvent = (id: string) => {
    setCalendarEvents((prev) => prev.filter((event) => event.id !== id));
    addToast('已移除该项日常日程安排。', 'info');
  };

  // --- Dynamic calculations to match screenshot's static metrics ---
  // Count items under sections (Screenshot shows pending 待办: 36, and to-read 待阅: 50)
  // Let's use computed length but offset it with screenshot baseline ratios to make it fully customized yet matching
  const pendingCount = tasks.filter((t) => t.section === '待办').length;
  const toReadCount = tasks.filter((t) => t.section === '待阅').length;

  const displayPendingCount = pendingCount <= 5 ? 36 + (pendingCount - 5) : 31 + pendingCount;
  const displayToReadCount = toReadCount <= 5 ? 50 + (toReadCount - 5) : 45 + toReadCount;

  // 当前 Tab 下的子状态计数
  const sectionTasks = tasks.filter((t) => t.section === currentSection);
  const sectionPendingCount = sectionTasks.filter((t) => t.unread).length;
  const sectionDoneCount = sectionTasks.filter((t) => !t.unread).length;
  const statusLabels = currentSection === '待办'
    ? { pending: '待处理', done: '已办结' }
    : currentSection === '待阅'
    ? { pending: '未阅读', done: '已查阅' }
    : { pending: '已办', done: '已阅' }; // 已处理Tab

  // --- Filtering Task List ---
  const filteredTasks = tasks.filter((task) => {
    // 1. Matches active section tab (待办/待阅/已处理)
    if (currentSection === '已处理') {
      // 已处理：所有 unread=false 的任务
      if (task.unread) return false;
      // 按子筛选细分：已办=原待办, 已阅=原待阅
      if (processedFilter === '已办' && task.section !== '待办') return false;
      if (processedFilter === '已阅' && task.section !== '待阅') return false;
    } else {
      if (task.section !== currentSection) return false;
    }

    // 2. Matches category sub filter pills
    if (currentCategoryFilter !== '全部') {
      if (task.type !== currentCategoryFilter) return false;
    }

    // 3. Matches status sub filter (待处理/已办结 or 未阅读/已查阅)
    if (currentStatusFilter === 'pending') {
      if (!task.unread) return false;
    } else if (currentStatusFilter === 'done') {
      if (task.unread) return false;
    }

    // 4. Search box term matching
    if (searchTerm.trim() !== '') {
      const lower = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(lower) ||
        task.sender.toLowerCase().includes(lower) ||
        task.category.toLowerCase().includes(lower) ||
        (task.serialNumber && task.serialNumber.toLowerCase().includes(lower))
      );
    }

    return true;
  });

  // 按类型优先级排序：签报 > 发文 > 收文 > 其他
  const typeOrder: Record<string, number> = { '收文': 1, '发文': 2, '签报': 3, '印章': 4, '休假': 5 };
  const sortedTasks = [...filteredTasks].sort((a, b) => (typeOrder[a.type] || 5) - (typeOrder[b.type] || 5));

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans antialiased flex flex-col justify-between">
      
      {/* Main Container Layout */}
      <div className="flex flex-1 w-full max-w-[1920px] mx-auto overflow-hidden">
        
        {/* Left Sidebar */}
        <Sidebar
          menuItems={menuItems}
          currentMenu={selectedSidebarMenu}
          onSelectMenu={(menuId) => setSelectedSidebarMenu(menuId)}
          currentUser={currentUser}
          onUpdateUser={(name, dept) => {
            setCurrentUser({ name, dept });
            addToast(`主管员工信息已更新：[${name}] / [${dept}]`, 'success');
          }}
        />

        {/* 2. Main Dashboard Panel Area */}
        <main
          className="flex-1 p-6 flex flex-col space-y-6 overflow-y-auto max-h-[calc(100vh-3.5rem)] select-none"
          style={viewMode === 'leader' ? { zoom: '1.25' } : undefined}
        >
  
          {/* Middle Row Section: Left Side list (70%) + Right Side clock/calendar (30%) */}
          <div className="grid grid-cols-10 gap-6 items-start">
            
            {/* Middle left Content Container: White card with lists and filter tabs */}
            <div className="col-span-7 bg-white rounded-lg shadow-xs border border-gray-100 flex flex-col p-6 min-h-[480px]">
              
              {/* Primary Tabs block: "待办" vs "待阅" switcher */}
              <div className="flex items-center justify-between border-b border-gray-150 pb-3">
                <div className="flex items-center space-x-6">
                  {/* 待办 Tab */}
                  <button
                    onClick={() => {
                      setCurrentSection('待办');
                      setCurrentCategoryFilter('全部');
                      setCurrentStatusFilter('pending');
                      setShowCategoryDropdown(false);
                    }}
                    className={`flex items-baseline space-x-2 pb-1.5 transition-all text-left relative cursor-pointer group ${
                      currentSection === '待办' 
                        ? 'text-gray-900 font-extrabold text-[15.5px]' 
                        : 'text-gray-400 hover:text-gray-700 font-medium text-[14.5px]'
                    }`}
                  >
                    <span className="flex items-center space-x-1.5">
                      {/* Orange Dot badge to mimic orange look from screenshot */}
                      <span className="h-5 w-5 bg-amber-500 text-white rounded flex items-center justify-center text-[10.5px] font-extrabold shadow-sm">待</span>
                      <span>待办事项</span>
                    </span>
                    
                    {/* Badge */}
                    <span className={`px-1.5 py-0.5 rounded-full text-[10.5px] font-black ${
                      currentSection === '待办' 
                        ? 'bg-amber-100 text-amber-700 animate-pulse' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {displayPendingCount}
                    </span>

                    {currentSection === '待办' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-red-600 rounded-full"></span>
                    )}
                  </button>

                  {/* 待阅 Tab */}
                  <button
                    onClick={() => {
                      setCurrentSection('待阅');
                      setCurrentCategoryFilter('全部');
                      setCurrentStatusFilter('pending');
                      setShowCategoryDropdown(false);
                    }}
                    className={`flex items-baseline space-x-2 pb-1.5 transition-all text-left relative cursor-pointer group ${
                      currentSection === '待阅' 
                        ? 'text-gray-900 font-extrabold text-[15.5px]' 
                        : 'text-gray-400 hover:text-gray-700 font-medium text-[14.5px]'
                    }`}
                  >
                    <span className="flex items-center space-x-1.5">
                      <span className="h-5 w-5 bg-yellow-400 text-slate-800 rounded flex items-center justify-center text-[10.5px] font-extrabold shadow-xs">阅</span>
                      <span>待阅事项</span>
                    </span>
                    
                    {/* Badge */}
                    <span className={`px-1.5 py-0.5 rounded-full text-[10.5px] font-black ${
                      currentSection === '待阅' 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {displayToReadCount}
                    </span>

                    {currentSection === '待阅' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-red-600 rounded-full"></span>
                    )}
                  </button>

                  {/* 已处理 Tab */}
                  <button
                    onClick={() => {
                      setCurrentSection('已处理');
                      setCurrentCategoryFilter('全部');
                      setCurrentStatusFilter('pending');
                      setProcessedFilter('已办');
                      setShowCategoryDropdown(false);
                    }}
                    className={`flex items-baseline space-x-2 pb-1.5 transition-all text-left relative cursor-pointer group ${
                      currentSection === '已处理'
                        ? 'text-gray-900 font-extrabold text-[15.5px]'
                        : 'text-gray-400 hover:text-gray-700 font-medium text-[14.5px]'
                    }`}
                  >
                    <span className="flex items-center space-x-1.5">
                      <span className="h-5 w-5 bg-emerald-500 text-white rounded flex items-center justify-center text-[10.5px] font-extrabold shadow-sm">已</span>
                      <span>已处理</span>
                    </span>

                    <span className={`px-1.5 py-0.5 rounded-full text-[10.5px] font-black ${
                      currentSection === '已处理'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {tasks.filter(t => !t.unread).length}
                    </span>

                    {currentSection === '已处理' && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-red-600 rounded-full"></span>
                    )}
                  </button>
                </div>

                {/* Right side Refresh Button */}
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-[12.5px] font-bold text-slate-700 hover:text-red-650 hover:bg-slate-50 border border-slate-200 bg-white transition-all hover:border-red-400 active:scale-95 shadow-xs cursor-pointer ${
                    isRefreshing ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  title="刷新公文流转库"
                  id="btn-workbench-refresh"
                >
                  <Icons.RefreshCw className={`h-3.5 w-3.5 text-slate-500 transition-transform ${isRefreshing ? 'animate-spin text-red-600' : ''}`} />
                  <span>{isRefreshing ? '刷新中...' : '刷新'}</span>
                </button>
              </div>

              {/* Sub-status filter + 分类筛选下拉 */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-1">
                  {currentSection === '已处理' ? (
                    <>
                      <button
                        onClick={() => setProcessedFilter('已办')}
                        className={`text-[12px] px-3 py-1 rounded-full transition-all cursor-pointer ${
                          processedFilter === '已办'
                            ? 'bg-emerald-50 text-emerald-600 font-semibold border border-emerald-200'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        已办
                        <span className={`ml-1 text-[10.5px] ${
                          processedFilter === '已办' ? 'text-emerald-400' : 'text-gray-400'
                        }`}>
                          {tasks.filter(t => !t.unread && t.section === '待办').length}
                        </span>
                      </button>
                      <span className="text-gray-300 mx-1">|</span>
                      <button
                        onClick={() => setProcessedFilter('已阅')}
                        className={`text-[12px] px-3 py-1 rounded-full transition-all cursor-pointer ${
                          processedFilter === '已阅'
                            ? 'bg-emerald-50 text-emerald-600 font-semibold border border-emerald-200'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        已阅
                        <span className={`ml-1 text-[10.5px] ${
                          processedFilter === '已阅' ? 'text-emerald-400' : 'text-gray-400'
                        }`}>
                          {tasks.filter(t => !t.unread && t.section === '待阅').length}
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setCurrentStatusFilter('pending')}
                        className={`text-[12px] px-3 py-1 rounded-full transition-all cursor-pointer ${
                          currentStatusFilter === 'pending'
                            ? 'bg-red-50 text-red-600 font-semibold border border-red-200'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {statusLabels.pending}
                        <span className={`ml-1 text-[10.5px] ${
                          currentStatusFilter === 'pending' ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {sectionPendingCount}
                        </span>
                      </button>
                      <span className="text-gray-300 mx-1">|</span>
                      <button
                        onClick={() => setCurrentStatusFilter('done')}
                        className={`text-[12px] px-3 py-1 rounded-full transition-all cursor-pointer ${
                          currentStatusFilter === 'done'
                            ? 'bg-red-50 text-red-600 font-semibold border border-red-200'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {statusLabels.done}
                      </button>
                      <span className="text-gray-300 mx-1">|</span>
                      <button
                        onClick={() => setCurrentStatusFilter('all')}
                        className={`text-[12px] px-3 py-1 rounded-full transition-all cursor-pointer ${
                          currentStatusFilter === 'all'
                            ? 'bg-red-50 text-red-600 font-semibold border border-red-200'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        全部
                      </button>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  {searchTerm && (
                    <span className="text-[11px] text-gray-400 italic">
                      搜索: "{searchTerm}"
                    </span>
                  )}
                  <div className="relative">
                    <button
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className="flex items-center space-x-1 text-[11.5px] text-gray-500 hover:text-red-600 px-2.5 py-1 rounded border border-gray-200 hover:border-red-300 bg-white transition-colors cursor-pointer"
                    >
                      <Icons.Filter className="h-3 w-3" />
                      <span>{currentCategoryFilter === '全部' ? '筛选类型' : currentCategoryFilter}</span>
                      <Icons.ChevronDown className={`h-2.5 w-2.5 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showCategoryDropdown && (
                      <div className="absolute right-0 top-full mt-1 w-28 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                        {['全部', '收文', '发文', '签报', '印章', '休假'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setCurrentCategoryFilter(cat);
                              setShowCategoryDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 text-[12px] hover:bg-red-50 hover:text-red-600 transition-colors ${
                              currentCategoryFilter === cat ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-600'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* List rows */}
              <div className="flex-1 overflow-y-auto pr-1" style={{ maxHeight: viewMode === 'leader' ? '380px' : '480px', scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}>
                {isRefreshing ? (
                  <div className="flex flex-col space-y-4 py-8 animate-pulse">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="flex flex-col space-y-2 px-3 py-2.5">
                        <div className="flex items-center space-x-3">
                          <div className="h-7 w-7 bg-gray-200 rounded-full"></div>
                          <div className="h-4.5 w-14 bg-gray-200 rounded"></div>
                          <div className="h-4.5 w-3/4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-3 w-1/3 bg-gray-200 rounded ml-11 mt-1"></div>
                      </div>
                    ))}
                  </div>
                ) : sortedTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-2">
                    <Icons.Inbox className="h-10 w-10 text-gray-300 stroke-[1.5]" />
                    <p className="text-[12px] italic">没有找到符合该类别的流程条目</p>
                  </div>
                ) : (
                  sortedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="group flex flex-col justify-center py-4 px-3 hover:bg-red-50/10 border-l-2 border-transparent hover:border-red-500 rounded-xs"
                    >
                      {/* Title row */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3.5 pr-4">
                          {/* 发起人头像图标 */}
                          <Icons.UserCircle className={`h-7 w-7 shrink-0 transition-colors ${
                            task.unread ? 'text-blue-500' : 'text-gray-300'
                          }`} />

                          {/* Task category type tag — 统一蓝色 */}
                          <span className="text-[11.5px] px-2.5 py-0.5 rounded border font-medium shrink-0 bg-blue-50 text-blue-700 border-blue-200">
                            {task.type}
                          </span>

                          {/* Main Title */}
                          <h3 className="text-[13.5px] font-bold text-gray-800 group-hover:text-red-700 transition-colors line-clamp-1">
                            {task.title}
                          </h3>

                          {/* Urgent Tag Pill if true */}
                          {task.urgent && (
                            <span className="text-[10px] font-extrabold px-2 py-0.2 rounded-full bg-red-600 text-white tracking-widest border border-red-500 shrink-0">
                              紧急
                            </span>
                          )}
                        </div>

                        {/* Right chevron and mouse hover pointer */}
                        <div className="flex items-center text-gray-300 group-hover:text-red-500 transition-colors shrink-0">
                          <Icons.ChevronRight className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Subtitles metadata row */}
                      <div className="flex items-center space-x-3 text-[12px] text-gray-400 pl-10.5 mt-2">
                        <span className="text-gray-500 font-medium leading-none">
                          {task.department || '广州银行'}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-600 leading-none">
                          {task.sender}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="font-mono text-gray-400">{task.time}</span>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Middle right section: Clock & Calendar (30%) */}
            <div className="col-span-3 flex flex-col space-y-4">
              <CalendarPanel
                viewMode={viewMode}
                events={calendarEvents}
                onDeleteEvent={handleDeleteCalendarEvent}
              />

              {/* 公告栏 */}
              <div className="flex items-start space-x-2.5 bg-white border border-gray-100 rounded-lg p-3 shadow-xs select-none">
                <span className="bg-red-50 text-red-600 font-bold text-[10px] border border-red-200 py-0.5 px-2 rounded-full shrink-0 mt-0.5">
                  公告
                </span>
                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                  关于2026年夏季防台风、电气安全用能维保巡检已经开始。请各网点注意关闭下班电源，严防雨水渗入。
                </p>
              </div>

              {/* 快捷入口 — 领导视图精简、每行3个，标准视图完整 */}
              <div className="bg-white rounded-lg p-4 shadow-xs border border-gray-100 space-y-3">
                <span className="text-[12px] font-bold text-gray-500">快捷入口</span>
                <div className="grid grid-cols-3 gap-2">
                  {(viewMode === 'leader'
                    ? [
                        { id: 'directory', label: '通讯录', icon: Icons.Users },
                        { id: 'new-process', label: '新建流程', icon: Icons.PlusCircle },
                        { id: 'leave', label: '请休假申请', icon: Icons.Calendar },
                        { id: 'trip', label: '出差申请', icon: Icons.Briefcase },
                        { id: 'seal', label: '用印申请', icon: Icons.Stamp },
                        { id: 'my-initiated', label: '我发起的', icon: Icons.FolderOpen },
                      ]
                    : [
                        { id: 'directory', label: '通讯录', icon: Icons.Users },
                        { id: 'new-process', label: '新建流程', icon: Icons.PlusCircle },
                        { id: 'leave', label: '请休假申请', icon: Icons.Calendar },
                        { id: 'trip', label: '出差申请', icon: Icons.Briefcase },
                        { id: 'seal', label: '用印申请', icon: Icons.Stamp },
                        { id: 'letter', label: '联系函', icon: Icons.Mail },
                        { id: 'draft-dispatch', label: '发文拟稿', icon: Icons.FileEdit },
                        { id: 'receive-reg', label: '收文拟稿', icon: Icons.FileSymlink },
                        { id: 'draft-report', label: '签报拟稿', icon: Icons.Bookmark },
                        { id: 'my-initiated', label: '我发起的', icon: Icons.FolderOpen },
                      ]
                  ).map((action) => {
                    const ActionIcon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => {
                          if (action.id === 'new-process') {
                            setIsNewTaskOpen(true);
                          } else if (action.id === 'directory') {
                            addToast('全行智能协同通讯录加载完成！', 'info');
                          } else {
                            addToast(`已呼起：[${action.label}] 业务组件。`, 'info');
                          }
                        }}
                        className="flex flex-col items-center space-y-1 p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer group"
                      >
                        <ActionIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                        <span className="text-[10.5px] text-gray-500 group-hover:text-gray-700 leading-tight text-center">
                          {action.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* 3. Global Footer (Aligned to Bottom) */}
      <footer className="bg-[#121824] border-t border-slate-800 text-slate-400 text-center py-4 select-none flex-shrink-0">
        <p className="text-[12px] tracking-wide mb-1 opacity-90">
          为了获得最佳操作体验，建议您使用最新版本的浏览器，支持1024 X 768以上分辨率
        </p>
        <p className="text-[11px] text-slate-500 font-mono">
          Copyright © 2001-2019 深圳蓝凌软件股份有限公司 服务热线：4006-222-312
        </p>
      </footer>

      {/* --- Pop-up Modals --- */}
      {/* 1. New Process creation Form Modal */}
      {isNewTaskOpen && (
        <NewTaskModal
          onClose={() => setIsNewTaskOpen(false)}
          onSubmit={handleNewTaskSubmit}
        />
      )}

      {/* --- Floating Notifications --- */}
      <div className="fixed top-20 right-6 z-50 flex flex-col space-y-3 pointer-events-none select-none max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg border text-[12.5px] flex items-center space-x-3 pointer-events-auto animate-in slide-in-from-right-8 duration-200 ${
              toast.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : toast.type === 'info'
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {toast.type === 'success' && <Icons.CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />}
            {toast.type === 'info' && <Icons.Info className="h-5 w-5 text-blue-500 shrink-0" />}
            {toast.type === 'error' && <Icons.XCircle className="h-5 w-5 text-red-500 shrink-0" />}
            <span className="font-medium leading-normal">{toast.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
