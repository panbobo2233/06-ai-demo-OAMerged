import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { MenuItem } from './types';

interface SidebarProps {
  menuItems: MenuItem[];
  currentMenu: string;
  onSelectMenu: (menuId: string) => void;
  currentUser: { name: string; dept: string };
  onUpdateUser: (name: string, dept: string) => void;
}

export default function Sidebar({
  menuItems,
  currentMenu,
  onSelectMenu,
  currentUser,
  onUpdateUser
}: SidebarProps) {
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [pinned, setPinned] = useState(false);

  const isExpanded = hoverExpanded || pinned;
  // Toggle states for sidebar expandable sections
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'flow': true, // Keep some open by default
    'meeting1': false,
    'calendar1': false
  });

  const [isEditingUser, setIsEditingUser] = useState(false);
  const [tempName, setTempName] = useState(currentUser.name);
  const [tempDept, setTempDept] = useState(currentUser.dept);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSaveUser = () => {
    onUpdateUser(tempName, tempDept);
    setIsEditingUser(false);
  };

  // Submenus to simulate full fidelity enterprise setup
  const getSubmenus = (id: string) => {
    switch (id) {
      case 'flow':
        return ['流程发起', '我的待办', '我解决的', '流程监控'];
      case 'archive':
        return ['收文管理', '发文登记', '签报汇签', '归档库'];
      case 'announcement':
        return ['通知公告', '政策法规', '内刊精选'];
      case 'rule':
        return ['全行规章', '部门细则', '业务指引'];
      case 'meeting1':
        return ['会议室发布', '预订审批', '历史回溯', '会议室平面图'];
      case 'calendar1':
        return ['月度工作历', '团队周历', '日程分享'];
      case 'attend1':
        return ['日常打卡', '请假销假', '加班申请', '出差报备'];
      case 'news':
        return ['行内头条', '行业快报', '媒体聚焦'];
      case 'knowledge':
        return ['技术文档', '业务百科', '优秀案例', '智能问答'];
      case 'oversight':
        return ['督办立项', '节点汇报', '超时警告'];
      default:
        return [];
    }
  };

  return (
    <aside
      onMouseEnter={() => !pinned && setHoverExpanded(true)}
      onMouseLeave={() => !pinned && setHoverExpanded(false)}
      className={`${
        isExpanded ? 'w-64' : 'w-16'
      } bg-[#1b233a] flex flex-col text-gray-300 h-[calc(100vh-3.5rem)] flex-shrink-0 select-none overflow-y-auto overflow-x-hidden transition-all duration-200 ease-out relative z-30`}
    >
      {/* Profile Section */}
      <div className={`p-6 flex flex-col items-center justify-center border-b border-[#27324f]/60 relative group bg-[#161c2e] ${isExpanded ? '' : 'px-2 py-4'}`}>
        {/* Profile Circle Icon placeholder */}
        <div className={`relative mb-3 flex items-center justify-center rounded-full bg-gray-500/35 overflow-hidden ring-2 ring-[#2e3b5e] group-hover:ring-red-400/60 transition-all cursor-pointer ${
          isExpanded ? 'h-14 w-14' : 'h-9 w-9 mb-0'
        }`}>
          {/* Subtle user symbol */}
          <Icons.User className={`text-gray-300 group-hover:scale-105 transition-transform ${isExpanded ? 'h-8 w-8' : 'h-5 w-5'}`} />

          {isExpanded && (
            <div
              onClick={() => {
                setTempName(currentUser.name);
                setTempDept(currentUser.dept);
                setIsEditingUser(true);
              }}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[11px] text-white transition-opacity font-medium"
            >
              编辑信息
            </div>
          )}
        </div>

        {isEditingUser ? (
          <div className="w-full flex flex-col space-y-2 bg-[#212a45] p-3 rounded mt-2 border border-blue-500/30">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="px-2 py-1 text-xs bg-slate-800 text-white border border-slate-600 rounded focus:outline-none"
              placeholder="姓名"
            />
            <input
              type="text"
              value={tempDept}
              onChange={(e) => setTempDept(e.target.value)}
              className="px-2 py-1 text-xs bg-slate-800 text-white border border-slate-600 rounded focus:outline-none"
              placeholder="部门"
            />
            <div className="flex space-x-2 justify-end">
              <button
                onClick={() => setIsEditingUser(false)}
                className="px-2 py-0.5 text-[10px] bg-slate-600 rounded text-gray-200"
              >
                取消
              </button>
              <button
                onClick={handleSaveUser}
                className="px-2 py-0.5 text-[10px] bg-red-600 hover:bg-red-500 text-white rounded"
              >
                确定
              </button>
            </div>
          </div>
        ) : (
          isExpanded && (
            <div className="text-center">
              <h3 className="text-[15px] font-semibold text-white tracking-wide">
                {currentUser.name}
              </h3>
              <p className="text-[12px] text-gray-400 mt-1">
                {currentUser.dept}
              </p>
            </div>
          )
        )}
      </div>

      {/* Menu List */}
      <nav className="flex-1 py-4 space-y-[2px]">
        {menuItems.map((item) => {
          // Dynamic icon retrieval
          const IconComponent = (Icons as any)[item.iconName] || Icons.File;
          const isSelected = currentMenu === item.id;
          const isMenuExpanded = !!expandedMenus[item.id] && isExpanded;
          const submenus = getSubmenus(item.id);

          return (
            <div key={item.id} className="group">
              {/* Menu heading button */}
              <div
                onClick={() => onSelectMenu(item.id)}
                title={!isExpanded ? item.label : undefined}
                className={`w-full flex items-center justify-between cursor-pointer text-[13.5px] transition-all hover:text-white hover:bg-[#232d46] ${
                  isSelected ? 'bg-[#2b3754] text-white shadow-xs font-semibold' : 'text-gray-400'
                } ${isExpanded ? 'px-6 py-3' : 'px-2 py-3 flex-col'}`}
              >
                <div className={`flex items-center ${isExpanded ? 'space-x-3.5' : 'justify-center'}`}>
                  <IconComponent className={`${isSelected ? 'text-red-400' : 'text-gray-400'} ${isExpanded ? 'h-[15px] w-[15px]' : 'h-[18px] w-[18px]'}`} />
                  {isExpanded && <span>{item.label}</span>}
                </div>

                {/* Arrow or Arrow collapse toggle — 仅在展开时显示 */}
                {isExpanded && (
                  <div className="flex items-center space-x-2">
                    {item.badge && item.badge > 0 && (
                      <span className="bg-orange-500 text-white text-[10px] font-bold px-[5px] py-[1px] rounded-full leading-none">
                        {item.badge}
                      </span>
                    )}
                    <button
                      onClick={(e) => toggleExpand(item.id, e)}
                      className="p-1 rounded-sm hover:bg-[#344265] text-gray-500 hover:text-white transition-colors"
                    >
                      <Icons.ChevronDown
                        className={`h-3 w-3 transform transition-transform duration-200 ${
                          isMenuExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>
                  </div>
                )}

                {/* 收起时显示 badge 小圆点 */}
                {!isExpanded && item.badge && item.badge > 0 && (
                  <span className="bg-orange-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none mt-0.5">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Collapsible Submenus — 仅在展开时显示 */}
              {isMenuExpanded && submenus.length > 0 && (
                <div className="bg-[#131a2c]/50 pl-14 pr-4 py-1.5 space-y-1">
                  {submenus.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="py-1.5 text-[12.5px] text-gray-500 hover:text-red-400 cursor-pointer transition-colors"
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom area */}
      <div className="border-t border-[#232c45]/30">
        {isExpanded && (
          <div className="p-3 text-[10.5px] text-gray-600 text-center">
            广州分行技术后台
          </div>
        )}
        <button
          onClick={() => setPinned(!pinned)}
          className={`w-full flex items-center justify-center py-2 text-gray-500 hover:text-white hover:bg-[#232d46] transition-colors cursor-pointer ${
            pinned ? 'text-red-400' : ''
          }`}
          title={pinned ? '取消固定' : '固定导航栏'}
        >
          <Icons.Pin className={`h-3.5 w-3.5 transition-transform ${pinned ? 'rotate-45' : ''}`} />
        </button>
      </div>
    </aside>
  );
}
