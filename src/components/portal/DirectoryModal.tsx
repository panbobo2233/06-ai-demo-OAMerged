import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Phone, Mail, Building, Users, BadgeCheck, PhoneCall } from 'lucide-react';
import { ContactItem } from './types';

interface DirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: ContactItem[];
}

export default function DirectoryModal({ isOpen, onClose, contacts }: DirectoryModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('全部');

  const depts = ['全部', ...Array.from(new Set(contacts.map(c => c.department)))];

  // Filter contacts by text input and department
  const filteredContacts = contacts.filter((c) => {
    const matchesQuery =
      c.name.includes(searchQuery) ||
      c.department.includes(searchQuery) ||
      c.role.includes(searchQuery) ||
      c.phone.includes(searchQuery);

    const matchesDept = selectedDept === '全部' || c.department === selectedDept;

    return matchesQuery && matchesDept;
  });

  const handleDial = (c: ContactItem) => {
    alert(`【模拟拨号】正在连接广州银行专线拨叫：${c.name} (${c.phone})...`);
  };

  const handleEmail = (c: ContactItem) => {
    alert(`【系统模拟】向电子邮箱「${c.email}」发起加密公文传递。`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 cursor-pointer"
          ></motion.div>

          {/* Modal Centered Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[8%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full z-50 border border-gray-100 overflow-hidden flex flex-col max-h-[82vh]"
            id="directory-modal-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 select-none">
              <div className="flex items-center space-x-2">
                <Users className="text-emerald-500 animate-pulse" size={18} />
                <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>
                  全行实名联络通讯录
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Filter controls row */}
            <div className="space-y-3.5 mb-5 flex-shrink-0">
              {/* Search text input */}
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-[#f2f4f7] border-0 outline-none rounded-xl py-2 pl-4 pr-10 text-xs text-gray-700 placeholder-gray-400 transition-colors focus:bg-white focus:ring-1 focus:ring-gray-200"
                  placeholder="搜索同事姓名、组织部门、座机、手机..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-3.5 top-2.5 text-gray-400">
                  <Search size={14} />
                </div>
              </div>

              {/* Department badge list select-triggers */}
              <div className="flex items-center space-x-1.5 overflow-x-auto py-1 no-scrollbar select-none">
                {depts.map((d) => {
                  const isSelected = selectedDept === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDept(d)}
                      className={`text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap font-semibold ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-sm'
                          : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Staff list grid */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {filteredContacts.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 pb-4">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col justify-between hover:shadow-md hover:border-emerald-300 transition-all duration-200"
                      id={`contact-card-${contact.id}`}
                    >
                      <div className="flex items-start space-x-3 mb-3">
                        {/* Round dynamic initials avatar */}
                        <div className={`w-10 h-10 rounded-full flex-shrink-0 ${contact.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-inner`}>
                          {contact.name[0]}
                        </div>

                        {/* Person credentials text */}
                        <div className="space-y-0.5 truncate flex-1">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs font-bold text-gray-800">{contact.name}</span>
                            <BadgeCheck size={12} className="text-emerald-500" />
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1 py-0.5 rounded width-fit">
                            {contact.department}
                          </span>
                          <p className="text-[10px] text-gray-400 font-medium">{contact.role}</p>
                        </div>
                      </div>

                      {/* Phone and Mail communication links */}
                      <div className="border-t border-gray-50 pt-3 flex items-center justify-between text-[11px] text-gray-500 font-mono select-none">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1.5">
                            <Phone size={10} className="text-gray-400" />
                            <span>{contact.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <Mail size={10} className="text-gray-400" />
                            <span className="truncate max-w-[150px]">{contact.email}</span>
                          </div>
                        </div>

                        {/* Quick call dial button */}
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleEmail(contact)}
                            className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center border border-blue-100 transition-colors cursor-pointer"
                            title="发送邮件"
                          >
                            <Mail size={11} />
                          </button>
                          <button
                            onClick={() => handleDial(contact)}
                            className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center border border-emerald-100 transition-colors cursor-pointer"
                            title="拨打座专线"
                          >
                            <PhoneCall size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-xs text-gray-400 bg-gray-50 border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center">
                  <span className="font-bold text-gray-400 block mb-1">未匹配到通讯录成员</span>
                  <span className="text-[10px] text-gray-400">请核实检索词或切换至“全部”分支类目</span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
